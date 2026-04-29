#!/usr/bin/env node
/**
 * Prism AI blog automation — single-shot generator.
 *
 * Run from repo root. Reads the master prompt and project context, calls the
 * Anthropic API with web search enabled, parses the structured response, writes
 * the new post + updates the topic backlog + writes a PR body file for the
 * workflow to use when opening the pull request.
 *
 * Required env: ANTHROPIC_API_KEY
 * Optional env: ANTHROPIC_MODEL (defaults to claude-sonnet-4-5)
 *
 * Outputs (when running under GitHub Actions):
 *   slug=<post-slug>
 *   title=<post title>
 *   branch=blog/YYYY-MM-DD-<slug>
 *   pr_body_path=.github/blog-pr-body.md
 */

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import process from 'node:process';
import Anthropic from '@anthropic-ai/sdk';

const REPO_ROOT = resolve(process.cwd());
const POSTS_DIR = join(REPO_ROOT, 'src/content/blog');
const BACKLOG_PATH = join(REPO_ROOT, 'content/topic-backlog.md');
const PROMPT_PATH = join(REPO_ROOT, '.github/scripts/blog-prompt.md');
const PRICING_PATH = join(REPO_ROOT, 'src/pages/PricingPage.tsx');
const WEBSITES_PATH = join(REPO_ROOT, 'src/pages/WebsitesPage.tsx');
const CLAUDE_MD_PATH = join(REPO_ROOT, 'CLAUDE.md');
const PR_BODY_PATH = join(REPO_ROOT, '.github/blog-pr-body.md');

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5';
const MAX_TOKENS = 12000;
const MAX_WEB_SEARCHES = 8;

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('FATAL: ANTHROPIC_API_KEY env var is not set.');
    process.exit(1);
  }

  console.log('=== Prism AI blog automation ===');
  console.log(`Model: ${MODEL}`);
  console.log(`Repo root: ${REPO_ROOT}`);

  console.log('Loading context…');
  const [masterPrompt, backlog, claudeMd, pricingPage, websitesPage] = await Promise.all([
    readFile(PROMPT_PATH, 'utf8'),
    readFile(BACKLOG_PATH, 'utf8'),
    safeRead(CLAUDE_MD_PATH),
    safeRead(PRICING_PATH),
    safeRead(WEBSITES_PATH),
  ]);

  if (!existsSync(POSTS_DIR)) {
    await mkdir(POSTS_DIR, { recursive: true });
  }

  const allPostFiles = (await readdir(POSTS_DIR))
    .filter((f) => f.endsWith('.md'))
    .sort();

  // Load most recent 3 posts for style reference
  const recentPosts = await Promise.all(
    allPostFiles.slice(-3).map(async (name) => ({
      name,
      content: await readFile(join(POSTS_DIR, name), 'utf8'),
    }))
  );

  const today = new Date().toISOString().split('T')[0];

  const userMessage = buildUserMessage({
    today,
    allPostFiles,
    backlog,
    claudeMd,
    pricingPage,
    websitesPage,
    recentPosts,
  });

  console.log(`Calling Anthropic API with web search (max ${MAX_WEB_SEARCHES} searches)…`);
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: masterPrompt,
    messages: [{ role: 'user', content: userMessage }],
    tools: [
      {
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: MAX_WEB_SEARCHES,
      },
    ],
  });

  const finalText = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n');

  if (!finalText) {
    console.error('FATAL: model returned no text response.');
    console.error('Stop reason:', response.stop_reason);
    console.error('Content blocks:', JSON.stringify(response.content, null, 2));
    process.exit(1);
  }

  console.log(`Response received (${finalText.length} chars). Parsing…`);

  const postFileSection = extractSection(finalText, 'POST_FILE');
  const prMetadataSection = extractSection(finalText, 'PR_METADATA');
  const backlogUpdateSection = extractSection(finalText, 'BACKLOG_UPDATE');

  if (!postFileSection || !prMetadataSection || !backlogUpdateSection) {
    console.error('FATAL: response missing required sections.');
    console.error('  POST_FILE present:', !!postFileSection);
    console.error('  PR_METADATA present:', !!prMetadataSection);
    console.error('  BACKLOG_UPDATE present:', !!backlogUpdateSection);
    console.error('--- response excerpt ---');
    console.error(finalText.slice(0, 4000));
    process.exit(1);
  }

  let metadata;
  try {
    const jsonMatch = prMetadataSection.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('no JSON object found');
    metadata = JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error('FATAL: failed to parse PR metadata JSON:', e.message);
    console.error(prMetadataSection);
    process.exit(1);
  }

  const slug = extractFrontmatterField(postFileSection, 'slug');
  if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    console.error(`FATAL: invalid or missing slug: "${slug}"`);
    console.error(postFileSection.slice(0, 1000));
    process.exit(1);
  }

  if (allPostFiles.includes(`${slug}.md`)) {
    console.error(`FATAL: slug collision — ${slug}.md already exists in src/content/blog/`);
    process.exit(1);
  }

  const title = extractFrontmatterField(postFileSection, 'title') ?? 'Untitled';

  const postPath = join(POSTS_DIR, `${slug}.md`);
  console.log(`Writing post: ${postPath}`);
  await writeFile(postPath, postFileSection.trim() + '\n', 'utf8');

  console.log(`Updating topic backlog: ${BACKLOG_PATH}`);
  await writeFile(BACKLOG_PATH, backlogUpdateSection.trim() + '\n', 'utf8');

  console.log(`Writing PR body: ${PR_BODY_PATH}`);
  await writeFile(PR_BODY_PATH, renderPrBody(metadata, slug, title), 'utf8');

  // Emit GitHub Actions outputs
  const ghOutput = process.env.GITHUB_OUTPUT;
  if (ghOutput) {
    const branch = `blog/${today}-${slug}`;
    const out =
      [
        `slug=${slug}`,
        `title=${escapeForGhOutput(title)}`,
        `branch=${branch}`,
        `pr_body_path=.github/blog-pr-body.md`,
      ].join('\n') + '\n';
    await writeFile(ghOutput, out, { flag: 'a' });
    console.log(`Emitted GitHub Actions outputs (slug=${slug}, branch=${branch}).`);
  }

  console.log('=== Done ===');
  console.log(`  Title: ${title}`);
  console.log(`  Slug: ${slug}`);
  console.log(`  Word count: ${metadata.word_count ?? '?'}`);
  console.log(`  Em-dash count: ${metadata.em_dash_count ?? '?'}`);
  console.log(`  Pillar: ${metadata.pillar ?? '?'}`);
}

function buildUserMessage({
  today,
  allPostFiles,
  backlog,
  claudeMd,
  pricingPage,
  websitesPage,
  recentPosts,
}) {
  return [
    `Today is ${today}.`,
    '',
    `Existing post filenames in src/content/blog/ — your slug must not collide with any of these:`,
    allPostFiles.length ? allPostFiles.map((f) => `- ${f}`).join('\n') : '(no posts yet)',
    '',
    '# Current content/topic-backlog.md',
    '',
    '```markdown',
    backlog,
    '```',
    '',
    '# Project notes from CLAUDE.md (locked rules and context)',
    '',
    '```',
    truncate(claudeMd, 6000),
    '```',
    '',
    '# Most recent posts (use for voice and style reference; do not duplicate topics)',
    '',
    ...recentPosts.flatMap((p) => [
      `## ${p.name}`,
      '',
      '```markdown',
      truncate(p.content, 4000),
      '```',
      '',
    ]),
    '# Service page excerpt — Pricing',
    '',
    '```tsx',
    truncate(pricingPage, 4000),
    '```',
    '',
    '# Service page excerpt — Websites',
    '',
    '```tsx',
    truncate(websitesPage, 4000),
    '```',
    '',
    '---',
    '',
    'Now execute the workflow described in the system prompt. Use web_search to research current AI/automation news, verify product capabilities, and source statistics.',
    '',
    'Output your final response in EXACTLY this format. The markers must appear as literal text on their own lines:',
    '',
    '=== BEGIN_POST_FILE ===',
    '---',
    '(YAML frontmatter — see schema in system prompt)',
    '---',
    '',
    '(post body in GitHub-flavoured Markdown — no leading H1, frontmatter title is the H1)',
    '=== END_POST_FILE ===',
    '',
    '=== BEGIN_PR_METADATA ===',
    '{',
    '  "pillar": "Cost & ROI",',
    '  "primary_keyword": "...",',
    '  "scoring_breakdown": "Why this topic scored highest — 2–4 sentences",',
    '  "runner_up_topics": ["topic 1", "topic 2", "topic 3", "topic 4"],',
    '  "sources_to_verify": ["any source you flagged for human verification"],',
    '  "word_count": 1234,',
    '  "em_dash_count": 1',
    '}',
    '=== END_PR_METADATA ===',
    '',
    '=== BEGIN_BACKLOG_UPDATE ===',
    '(the FULL updated content of content/topic-backlog.md — mark the chosen topic covered with today\'s date, append two fresh runner-up topics under the relevant pillars)',
    '=== END_BACKLOG_UPDATE ===',
    '',
    'Each marker must be on its own line and exactly as shown.',
  ].join('\n');
}

function extractSection(text, name) {
  const re = new RegExp(`=== BEGIN_${name} ===\\s*\\n([\\s\\S]*?)\\n=== END_${name} ===`);
  const match = text.match(re);
  return match ? match[1] : null;
}

function extractFrontmatterField(postFile, field) {
  const re = new RegExp(`^${field}:\\s*"?([^"\\n]+?)"?\\s*$`, 'm');
  const match = postFile.match(re);
  return match ? match[1].trim() : null;
}

function escapeForGhOutput(s) {
  return s.replace(/\r?\n/g, ' ').replace(/"/g, '\\"');
}

function truncate(s, max) {
  if (!s) return '';
  if (s.length <= max) return s;
  return s.slice(0, max) + '\n\n…[truncated]';
}

function renderPrBody(meta, slug, title) {
  const runners = (meta.runner_up_topics ?? [])
    .map((t, i) => `${i + 1}. ${t}`)
    .join('\n');
  const sourcesToVerify =
    (meta.sources_to_verify ?? []).length === 0
      ? '_None flagged. The bot is confident in every cited source._'
      : (meta.sources_to_verify ?? []).map((s) => `- ${s}`).join('\n');

  return `## New blog post — ${title}

**Pillar:** ${meta.pillar ?? 'unknown'}
**Primary keyword:** ${meta.primary_keyword ?? 'unknown'}
**Word count:** ${meta.word_count ?? 'unknown'}
**Em-dash count:** ${meta.em_dash_count ?? 'unknown'}
**Slug:** \`${slug}\`

### Why this topic
${meta.scoring_breakdown ?? '_(not provided)_'}

### Runner-up topics queued for future weeks
${runners || '_(none)_'}

### Sources to verify before merging
${sourcesToVerify}

---

**Netlify will post a deploy preview link as a comment on this PR within ~2 minutes.** Open that link to review the post in full site styling before merging. Tap **Merge pull request** to publish.

To reject: just close the PR. The bot will draft a different topic next week.

---

_Generated by \`.github/workflows/blog-automation.yml\` on ${new Date().toISOString()}._
`;
}

async function safeRead(path) {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return '';
  }
}

main().catch((err) => {
  console.error('FATAL:', err);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
