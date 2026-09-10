import { type WeddingContent } from '../admin/content';

export interface SiteRow {
  id: string;
  subdomain: string;
  template_id?: string;
  status?: string;
  title?: string;
  bride_name?: string;
  groom_name?: string;
  custom_domain?: string;
  expires_at?: string;
  data?: Partial<WeddingContent> | null;
}

/**
 * Resolve a customer's site by subdomain from the `sites` table.
 *
 * Returns the raw site row (including `id` and `data`) so callers can
 * both render the site AND target the correct row on write-back.
 *
 * Returns `null` when:
 *   - customerSubdomain is empty
 *   - Supabase env vars are missing
 *   - the subdomain isn't found
 *   - the network request fails
 *
 * Never throws — callers should always have a safe fallback.
 */
export async function resolveSite(
  customerSubdomain: string,
  supabaseUrl: string,
  supabaseKey: string,
): Promise<SiteRow | null> {
  let subdomain = (customerSubdomain || '').trim().toLowerCase();
  if (!subdomain) return null;

  // Strip trailing slash (platform may pass "sohel-and-mina/").
  subdomain = subdomain.replace(/\/+$/, '');

  const url = supabaseUrl.trim();
  const key = supabaseKey.trim();
  if (!url || !key) return null;

  // Only allow safe characters in the subdomain so the PostgREST filter
  // can't be used for URL injection.
  const safe = subdomain.replace(/[^a-zA-Z0-9_-]/g, '');
  if (safe !== subdomain) {
    if (import.meta.env.DEV) console.warn('[siteResolver] stripped invalid chars from subdomain:', subdomain, '→', safe);
    subdomain = safe;
  }
  if (!subdomain) return null;

  try {
    const endpoint = `${url}/rest/v1/sites?subdomain=eq.${encodeURIComponent(subdomain)}&select=id,subdomain,template_id,status,title,bride_name,groom_name,custom_domain,expires_at,data&limit=1`;
    if (import.meta.env.DEV) console.log('[siteResolver] GET', endpoint.replace(key, '***'));
    const res = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      if (import.meta.env.DEV) console.error('[siteResolver] HTTP', res.status, txt.slice(0, 300));
      return null;
    }

    const rows = (await res.json()) as SiteRow[];
    if (import.meta.env.DEV) console.log('[siteResolver] rows returned:', rows.length);
    return rows[0] ?? null;
  } catch (err) {
    if (import.meta.env.DEV) console.error('[siteResolver] fetch failed:', err);
    return null;
  }
}
