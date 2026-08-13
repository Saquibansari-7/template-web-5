import { supabase } from '../lib/supabase';
import { DEFAULT_CONTENT, type WeddingContent } from '../admin/content';

export const SITE_ID = 'default';
export const CONTENT_TABLE = 'site_content';

export async function loadContent(): Promise<WeddingContent> {
  if (!supabase) {
    // Not configured yet — fall back to defaults so the site still renders.
    if (import.meta.env.DEV) console.warn('[loadContent] Supabase not configured, using defaults.');
    return structuredClone(DEFAULT_CONTENT);
  }

  const { data, error } = await supabase
    .from(CONTENT_TABLE)
    .select('data')
    .eq('site_id', SITE_ID)
    .single();

  if (error && error.code !== 'PGRST116') {
    if (import.meta.env.DEV) console.error('[loadContent] Supabase error:', error);
    return structuredClone(DEFAULT_CONTENT);
  }

  const raw = (data?.data as Partial<WeddingContent> | undefined) ?? undefined;
  if (!raw) return structuredClone(DEFAULT_CONTENT);

  const isArr = (v: unknown): v is unknown[] => Array.isArray(v);
  const isObj = (v: unknown): v is Record<string, unknown> =>
    typeof v === 'object' && v !== null && !Array.isArray(v);

  // Defensive normalization: the stored row may contain a different app's
  // shape (e.g. gallery/events as objects). Fall back to defaults for any
  // field that isn't the expected type so the UI never crashes on .map().
  const merged: WeddingContent = {
    ...structuredClone(DEFAULT_CONTENT),
    ...raw,
    sections: isObj(raw.sections) ? { ...DEFAULT_CONTENT.sections, ...raw.sections } : DEFAULT_CONTENT.sections,
    images: isObj(raw.images) ? { ...DEFAULT_CONTENT.images, ...raw.images } : DEFAULT_CONTENT.images,
    storyParagraphs: isArr(raw.storyParagraphs) ? (raw.storyParagraphs as string[]) : DEFAULT_CONTENT.storyParagraphs,
    gallery: isArr(raw.gallery) ? (raw.gallery as WeddingContent['gallery']) : DEFAULT_CONTENT.gallery,
    events: isArr(raw.events) ? (raw.events as WeddingContent['events']) : DEFAULT_CONTENT.events,
    travelInfo: isArr(raw.travelInfo) ? (raw.travelInfo as WeddingContent['travelInfo']) : DEFAULT_CONTENT.travelInfo,
    hotels: isArr(raw.hotels) ? (raw.hotels as WeddingContent['hotels']) : DEFAULT_CONTENT.hotels,
  };

  if (import.meta.env.DEV) console.log('[loadContent] loaded; gallery is array:', isArr(raw.gallery), 'events is array:', isArr(raw.events));

  return merged;
}
