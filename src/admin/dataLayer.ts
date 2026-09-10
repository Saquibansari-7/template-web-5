import { DEFAULT_CONTENT, type WeddingContent } from './content';
import { loadContent as loadFromSupabase } from '../services/loadContent';
import { saveContent as saveToSupabase } from '../services/saveContent';
import { resolveSite, type SiteRow } from '../lib/siteResolver';

/**
 * Data layer — backed by Supabase.
 *
 * Default site: one row in `site_content` (site_id = 'default') holds the
 * entire WeddingContent jsonb. loadContent falls back to DEFAULT_CONTENT when
 * Supabase is not configured or the row is missing, so the public site always
 * renders. saveContent throws a clear error if Supabase is not configured
 * (the admin panel surfaces it).
 *
 * Multi-tenant: when ?customer=<subdomain> is present, loadContentByCustomer
 * reads from the `sites` table instead.
 *
 * Images are uploaded to Supabase Storage via `uploadImage` and stored as
 * public URLs inside WeddingContent.images / gallery.
 */

const CONFIG_ERROR =
  'Supabase not configured — add VITE_PUBLIC_SUPABASE_URL and VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env';

export async function loadContent(): Promise<WeddingContent> {
  try {
    return await loadFromSupabase();
  } catch (err) {
    if (import.meta.env.DEV) console.error('[dataLayer] loadContent failed, using defaults:', err);
    return structuredClone(DEFAULT_CONTENT);
  }
}

export interface CustomerSiteResult {
  site: SiteRow;
  content: WeddingContent;
}

/**
 * Defensive merge of a `sites.data` row onto DEFAULT_CONTENT. Mirrors the
 * normalization in services/loadContent.ts so a partial/older row never
 * crashes the UI.
 */
function mergeSiteRow(raw: Partial<WeddingContent>): WeddingContent {
  const isArr = (v: unknown): v is unknown[] => Array.isArray(v);
  const isObj = (v: unknown): v is Record<string, unknown> =>
    typeof v === 'object' && v !== null && !Array.isArray(v);

  return {
    ...structuredClone(DEFAULT_CONTENT),
    ...raw,
    sections: isObj(raw.sections) ? { ...DEFAULT_CONTENT.sections, ...raw.sections } : DEFAULT_CONTENT.sections,
    images: isObj(raw.images) ? { ...DEFAULT_CONTENT.images, ...raw.images } : DEFAULT_CONTENT.images,
    storyParagraphs: isArr(raw.storyParagraphs) ? (raw.storyParagraphs as string[]) : DEFAULT_CONTENT.storyParagraphs,
    gallery: isArr(raw.gallery) ? (raw.gallery as WeddingContent['gallery']) : DEFAULT_CONTENT.gallery,
    events: isArr(raw.events) ? (raw.events as WeddingContent['events']) : DEFAULT_CONTENT.events,
    travelInfo: isArr(raw.travelInfo) ? (raw.travelInfo as WeddingContent['travelInfo']) : DEFAULT_CONTENT.travelInfo,
    hotels: isArr(raw.hotels) ? (raw.hotels as WeddingContent['hotels']) : DEFAULT_CONTENT.hotels,
    blessings: isArr(raw.blessings) ? (raw.blessings as WeddingContent['blessings']) : DEFAULT_CONTENT.blessings,
  };
}

/**
 * Load a customer's wedding site from the `sites` table.
 *
 * Returns both the raw site row (needed for write-back in admin) and the
 * merged WeddingContent (needed for rendering). Returns `null` on any
 * failure so callers can fall back to the default site.
 */
export async function loadContentByCustomer(customer: string): Promise<CustomerSiteResult | null> {
  const raw = (customer || '').trim();
  if (!raw) return null;

  const url = (import.meta.env.VITE_PUBLIC_SUPABASE_URL as string | undefined)?.trim();
  const key = (import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string | undefined)?.trim();
  if (!url || !key) {
    if (import.meta.env.DEV) console.warn('[loadContentByCustomer] Supabase not configured, skipping.');
    return null;
  }

  if (import.meta.env.DEV) console.log('[loadContentByCustomer] raw param:', JSON.stringify(raw));

  const site = await resolveSite(raw, url, key);
  if (!site || !site.data) {
    if (import.meta.env.DEV) console.log('[loadContentByCustomer] no site for', JSON.stringify(raw));
    return null;
  }

  const content = mergeSiteRow(site.data);
  if (import.meta.env.DEV) console.log('[loadContentByCustomer] loaded site', site.subdomain, 'id=', site.id);
  return { site, content };
}

export async function saveContent(content: WeddingContent): Promise<void> {
  await saveToSupabase(content);
}

/**
 * Save content directly to a `sites` row (used by admin when editing a
 * customer site, so we don't clobber site_content).
 */
export async function saveContentToSite(siteId: string, content: WeddingContent): Promise<void> {
  const url = (import.meta.env.VITE_PUBLIC_SUPABASE_URL as string | undefined)?.trim();
  const key = (import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string | undefined)?.trim();
  if (!url || !key) throw new Error(CONFIG_ERROR);

  const res = await fetch(`${url}/rest/v1/sites?id=eq.${encodeURIComponent(siteId)}`, {
    method: 'PATCH',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      data: content,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`[saveContentToSite] HTTP ${res.status}: ${txt}`);
  }
}

export async function resetContent(): Promise<WeddingContent> {
  const fresh = structuredClone(DEFAULT_CONTENT);
  await saveToSupabase(fresh);
  return fresh;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_PUBLIC_SUPABASE_URL && import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export { CONFIG_ERROR };
