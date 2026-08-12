import { DEFAULT_CONTENT, type WeddingContent } from './content';

/**
 * Data layer abstraction.
 *
 * Currently backed by localStorage (zero backend). To connect a real backend
 * (Supabase), implement the same async shape in `loadContent` / `saveContent`
 * / `resetContent` (e.g. read/write a single row in a `wedding_content` table)
 * and the rest of the app — store, admin panel, and the site — keeps working
 * unchanged.
 *
 * Suggested Supabase schema (single-row config table):
 *   create table wedding_content (
 *     id int primary key default 1,
 *     data jsonb not null,
 *     updated_at timestamptz default now()
 *   );
 *   insert into wedding_content (id, data) values (1, '{}');
 */

const STORAGE_KEY = 'wedding_content_v1';

function deepMerge(base: WeddingContent, override: Partial<WeddingContent>): WeddingContent {
  return {
    ...base,
    ...override,
    sections: { ...base.sections, ...(override.sections ?? {}) },
    images: { ...base.images, ...(override.images ?? {}) },
    storyParagraphs: override.storyParagraphs ?? base.storyParagraphs,
    gallery: override.gallery ?? base.gallery,
    events: override.events ?? base.events,
    travelInfo: override.travelInfo ?? base.travelInfo,
    hotels: override.hotels ?? base.hotels,
  };
}

export async function loadContent(): Promise<WeddingContent> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_CONTENT);
    const parsed = JSON.parse(raw) as Partial<WeddingContent>;
    return deepMerge(structuredClone(DEFAULT_CONTENT), parsed);
  } catch {
    return structuredClone(DEFAULT_CONTENT);
  }
}

export async function saveContent(content: WeddingContent): Promise<void> {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export async function resetContent(): Promise<WeddingContent> {
  const fresh = structuredClone(DEFAULT_CONTENT);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

/**
 * Convert an uploaded File into a base64 data URL, suitable for storing in
 * localStorage or a jsonb column. Resolves to a string usable directly as an
 * <img src>.
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
