import { supabase } from '../lib/supabase';
import { SITE_ID } from './loadContent';

const BUCKET = 'sites';

export async function uploadImage(file: File): Promise<string> {
  if (!supabase || !supabase.storage) {
    throw new Error(
      'Supabase is not configured. Check VITE_PUBLIC_SUPABASE_URL / VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY.',
    );
  }

  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
  const filePath = `${SITE_ID}/${fileName}`;

  if (import.meta.env.DEV) console.log('[uploadImage] uploading', filePath, file.size, file.type);

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (error) {
    const msg = error.message || String(error);
    if (import.meta.env.DEV) console.error('[uploadImage] failed:', msg);
    if (msg.toLowerCase().includes('bucket')) {
      throw new Error(`Storage bucket "${BUCKET}" not found. Create it in Supabase Storage.`);
    }
    if (msg.includes('Unauthorized') || msg.toLowerCase().includes('jwt')) {
      throw new Error('Storage upload unauthorized. Check Storage RLS policies.');
    }
    throw new Error(`Image upload failed: ${msg}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data?.publicUrl || '';
}
