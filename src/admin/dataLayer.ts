import { DEFAULT_CONTENT, type WeddingContent } from './content';
import { loadContent as loadFromSupabase } from '../services/loadContent';
import { saveContent as saveToSupabase } from '../services/saveContent';

/**
 * Data layer — backed by Supabase.
 *
 * One row in `wedding_content` (id = 1) holds the entire WeddingContent jsonb.
 * loadContent falls back to DEFAULT_CONTENT when Supabase is not configured or
 * the row is missing, so the public site always renders. saveContent throws a
 * clear error if Supabase is not configured (the admin panel surfaces it).
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

export async function saveContent(content: WeddingContent): Promise<void> {
  await saveToSupabase(content);
}

export async function resetContent(): Promise<WeddingContent> {
  // Reset = save the defaults back to Supabase.
  const fresh = structuredClone(DEFAULT_CONTENT);
  await saveToSupabase(fresh);
  return fresh;
}

export function isSupabaseConfigured(): boolean {
  // Reuse the service guard indirectly: loadContent handles null client,
  // but admin wants to know up-front. We expose a simple check.
  return Boolean(import.meta.env.VITE_PUBLIC_SUPABASE_URL && import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export { CONFIG_ERROR };
