import { marked } from 'marked';

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  slug: string;
  date: string; // ISO YYYY-MM-DD
  category: string;
  readTime?: string;
  color?: string; // CSS variable like 'var(--spec-indigo)'
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
};

export type Post = Required<Omit<PostFrontmatter, 'metaDescription' | 'keywords' | 'ogImage'>> & {
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  body: string; // raw markdown
  html: string; // rendered HTML
};

// Vite-only: load all .md files in src/content/blog/ at build time as raw strings.
const modules = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const ACCENT_COLORS = [
  'var(--spec-indigo)',
  'var(--spec-cyan)',
  'var(--spec-amber)',
  'var(--spec-rose)',
  'var(--spec-green)',
  'var(--spec-violet)',
];

// Minimal YAML-ish frontmatter parser. Supports string values, ISO dates,
// and JSON-style string arrays on a single line. We control authoring (the
// automation script writes the frontmatter), so we don't need full YAML.
function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const fmText = match[1];
  const body = match[2];
  const meta: Record<string, unknown> = {};

  for (const line of fmText.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let raw = line.slice(idx + 1).trim();

    let value: string | string[] = raw;
    if (raw.startsWith('[') && raw.endsWith(']')) {
      try {
        value = JSON.parse(raw) as string[];
      } catch {
        value = raw
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          .filter(Boolean);
      }
    } else if (
      (raw.startsWith('"') && raw.endsWith('"')) ||
      (raw.startsWith("'") && raw.endsWith("'"))
    ) {
      value = raw.slice(1, -1);
    }

    meta[key] = value;
  }

  return { meta, body };
}

function readTimeFor(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

let cachedPosts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  const out: Post[] = [];
  for (const [path, raw] of Object.entries(modules)) {
    const { meta, body } = parseFrontmatter(raw);
    const slugFromFile = path.split('/').pop()!.replace(/\.md$/, '');
    const slug = (meta.slug as string) ?? slugFromFile;

    const post: Post = {
      title: (meta.title as string) ?? slug,
      excerpt: (meta.excerpt as string) ?? '',
      slug,
      date: (meta.date as string) ?? '',
      category: (meta.category as string) ?? 'Insights',
      readTime: (meta.readTime as string) ?? readTimeFor(body),
      color: (meta.color as string) ?? '',
      metaDescription: meta.metaDescription as string | undefined,
      keywords: meta.keywords as string[] | undefined,
      ogImage: meta.ogImage as string | undefined,
      body,
      html: marked.parse(body, { async: false, gfm: true, breaks: false }) as string,
    };
    out.push(post);
  }

  // Sort newest first by date string (ISO YYYY-MM-DD sorts lexicographically)
  out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  // Round-robin accent colour for any post that didn't specify one.
  for (let i = 0; i < out.length; i++) {
    if (!out[i].color) out[i].color = ACCENT_COLORS[i % ACCENT_COLORS.length];
  }

  cachedPosts = out;
  return out;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDateLabel(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
