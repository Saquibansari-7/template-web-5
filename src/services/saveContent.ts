import { supabase } from '../lib/supabase';
import { CONTENT_TABLE, SITE_ID } from './loadContent';
import { type WeddingContent } from '../admin/content';

export async function saveContent(content: WeddingContent): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase not configured — add VITE_PUBLIC_SUPABASE_URL and VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env');
  }

  const { error } = await supabase
    .from(CONTENT_TABLE)
    .upsert(
      {
        site_id: SITE_ID,
        data: content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'site_id' },
    );

  if (error) {
    if (import.meta.env.DEV) console.error('[saveContent] Supabase error:', error);
    throw new Error(`Supabase save failed: ${error.message}`);
  }
}
