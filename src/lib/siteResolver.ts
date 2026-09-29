/**
 * Site resolver — public lookup ONLY via main app API.
 *
 * SECURITY: No direct Supabase calls from the browser. All public site
 * lookups go through:
 *   https://weddappvows.vercel.app/api/site/lookup?customer=<subdomain>
 *
 * The main app API enforces:
 *   - exact subdomain match (no partial/ilike)
 *   - template_id matches this deployment
 *   - status === 'active'
 *   - not expired
 *
 * Admin panel still uses supabase.ts directly (password-gated, so direct
 * DB access is acceptable there).
 */

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
  data?: Record<string, unknown> | null;
  [key: string]: unknown;
}

/**
 * Exact-match subdomain validator.
 * Allows: lowercase letters, digits, hyphens
 * Length: 1-60 chars
 * Must start and end with alphanumeric (no leading/trailing hyphen)
 */
const SUBDOMAIN_RE = /^[a-z0-9](?:[a-z0-9-]{0,58}[a-z0-9])?$/;

/**
 * Resolve a customer's site by subdomain via the main app API.
 *
 * Returns the raw site row (including `id` and `data`) so callers can
 * both render the site AND target the correct row on write-back.
 *
 * Returns `null` when:
 *   - customerSubdomain is empty or invalid format
 *   - the subdomain isn't found
 *   - the site is for a different template
 *   - the site status is not 'active'
 *   - the site has expired
 *   - the network request fails
 *
 * Never throws — callers should always have a safe fallback.
 */
export async function resolveSite(
  customerSubdomain: string,
): Promise<SiteRow | null> {
  let subdomain = (customerSubdomain || '').trim().toLowerCase();
  if (!subdomain) return null;

  // Strip trailing slash (platform may pass "sohel-and-mina/").
  subdomain = subdomain.replace(/\/+$/, '');

  // Exact format validation — no partial matches, no special chars.
  if (!SUBDOMAIN_RE.test(subdomain)) {
    console.warn('[siteResolver] invalid subdomain format:', subdomain);
    return null;
  }

  // Main app API URL — change this if the main app deploys to a different URL.
  const MAIN_APP_API = 'https://weddappvows.vercel.app/api/site/lookup';

  try {
    const endpoint = `${MAIN_APP_API}?customer=${encodeURIComponent(subdomain)}`;
    if (import.meta.env.DEV) console.log('[siteResolver] GET', endpoint);

    const res = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      // 404 from the API means site not found / not active / wrong template.
      console.warn('[siteResolver] API returned', res.status, 'for', subdomain);
      return null;
    }

    const site = (await res.json()) as SiteRow;
    if (!site || !site.id) {
      console.warn('[siteResolver] empty response for', subdomain);
      return null;
    }

    // Defensive checks (should already be enforced by the API, but belt-and-suspenders).
    if (site.status && site.status !== 'active') {
      console.warn('[siteResolver] site not active:', site.status);
      return null;
    }

    if (site.expires_at && new Date(site.expires_at) < new Date()) {
      console.warn('[siteResolver] site expired:', site.expires_at);
      return null;
    }

    if (import.meta.env.DEV) console.log('[siteResolver] resolved:', site.subdomain, 'id=', site.id);
    return site;
  } catch (err) {
    console.error('[siteResolver] fetch failed:', err);
    return null;
  }
}
