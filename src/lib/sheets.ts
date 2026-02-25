/**
 * Google Sheets data fetcher for Prism AI pSEO pages.
 * Reads from the "pSEO Matrix" and "Content Blocks" tabs at build time.
 */

interface SheetRow {
  [key: string]: string;
}

export interface PseoEntry {
  slug: string;
  head_term: string;
  industry: string;
  location: string;
  integration: string;
  meta_title: string;
  meta_description: string;
  hero_headline: string;
  hero_subline: string;
  pain_point: string;
  solution_paragraph: string;
  stat_value: string;
  stat_label: string;
  faq_1_q: string;
  faq_1_a: string;
  faq_2_q: string;
  faq_2_a: string;
  faq_3_q: string;
  faq_3_a: string;
  cta_text: string;
  status: string;
  last_updated: string;
}

export interface ContentBlock {
  block_type: string;
  block_key: string;
  block_title: string;
  block_content: string;
  industry: string;
  location: string;
  notes: string;
}

const SHEET_ID = import.meta.env.GOOGLE_SHEET_ID || '1-WSX43qvTGYFWOrfIGCTA8SzUdWzq3K7Kvz7IdZpFVo';

/**
 * Fetch rows from a Google Sheet tab using the Sheets API v4 (public or service account).
 * For public sheets, no auth is needed — just use an API key.
 * For private sheets, uses service account credentials.
 */
async function fetchSheetData(tabName: string): Promise<SheetRow[]> {
  const serviceEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = import.meta.env.GOOGLE_PRIVATE_KEY;

  let url: string;
  let headers: Record<string, string> = {};

  if (serviceEmail && privateKey) {
    // Service account auth via googleapis
    const { google } = await import('googleapis');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${tabName}!A:Z`,
    });
    const rows = response.data.values || [];
    if (rows.length < 2) return [];
    const headerRow = rows[0];
    return rows.slice(1).map((row) => {
      const obj: SheetRow = {};
      headerRow.forEach((h: string, i: number) => {
        obj[h] = row[i] || '';
      });
      return obj;
    });
  } else {
    // Fallback: public sheet via CSV export
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    return parseCSV(csvText);
  }
}

function parseCSV(csv: string): SheetRow[] {
  const lines = csv.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj: SheetRow = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || '';
    });
    return obj;
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result.map(v => v.replace(/^"|"$/g, ''));
}

/**
 * Get all published pSEO entries (status != "archived")
 */
export async function getPseoEntries(): Promise<PseoEntry[]> {
  const rows = await fetchSheetData('pSEO Matrix');
  return rows
    .filter(r => r.status !== 'archived' && r.slug)
    .map(r => r as unknown as PseoEntry);
}

/**
 * Get a single pSEO entry by slug
 */
export async function getPseoEntry(slug: string): Promise<PseoEntry | undefined> {
  const entries = await getPseoEntries();
  return entries.find(e => e.slug === slug);
}

/**
 * Get content blocks, optionally filtered by type, industry, and/or location
 */
export async function getContentBlocks(filters?: {
  block_type?: string;
  industry?: string;
  location?: string;
}): Promise<ContentBlock[]> {
  const rows = await fetchSheetData('Content Blocks');
  let blocks = rows.map(r => r as unknown as ContentBlock);

  if (filters?.block_type) {
    blocks = blocks.filter(b => b.block_type === filters.block_type);
  }
  if (filters?.industry) {
    blocks = blocks.filter(b => b.industry === filters.industry || !b.industry);
  }
  if (filters?.location) {
    blocks = blocks.filter(b => b.location === filters.location || !b.location);
  }

  return blocks;
}

/**
 * Get a specific content block by type and key
 */
export async function getContentBlock(blockType: string, blockKey: string): Promise<ContentBlock | undefined> {
  const blocks = await getContentBlocks({ block_type: blockType });
  return blocks.find(b => b.block_key === blockKey);
}
