# Supabase Setup

The admin panel and website now persist all content to Supabase. No backend code
is needed — just a table, a storage bucket, and policies.

## 1. Environment

Copy `.env.example` to `.env` and fill in your project values:

```
VITE_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR-ANON-PUBLISHABLE-KEY
```

Get these from **Supabase → Project Settings → API**. Restart `npm run dev`
after creating the file.

## 2. Database table

The app reads/writes a **`site_content`** table, keyed by `site_id`
(`SITE_ID = 'wedding'`). It stores the entire `WeddingContent` object as a jsonb
`data` column. Run this in **Supabase → SQL Editor**:

```sql
create table if not exists site_content (
  site_id text primary key default 'wedding',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- Allow the anon key to read/write the single config row.
alter table site_content enable row level security;

create policy "Public read site_content"
  on site_content for select
  using (true);

create policy "Public write site_content"
  on site_content for insert
  with check (true);

create policy "Public update site_content"
  on site_content for update
  using (true);
```

The first save from the admin panel will `upsert` the row `site_id = 'wedding'`.
Until then the site renders the built-in defaults.

## 3. Storage bucket (images)

Create a public bucket named **`sites`** (Supabase → Storage → New
bucket → check "Public bucket"). Uploaded files live at `sites/<site_id>/...`.

Add an RLS policy so the anon key can upload:

```sql
insert into storage.buckets (id, name, public)
values ('sites', 'sites', true)
on conflict (id) do update set public = true;

create policy "Public upload sites"
  on storage.objects for insert
  with check (bucket_id = 'sites');

create policy "Public read sites"
  on storage.objects for select
  using (bucket_id = 'sites');
```

> If your existing table is actually named `sites` (with a `site_id` column) or
> uses a different primary key, change `CONTENT_TABLE` / `SITE_ID` in
> `src/services/loadContent.ts` to match. The error URL in the browser console
> shows the exact table + columns being queried.

Uploaded image URLs are stored in `WeddingContent.images` / `gallery` and served
from Supabase CDN — no base64 in the database.

## 4. Admin access

Visit `/admin` and log in with the password defined in `src/admin/auth.tsx`
(default `admin123`). Edits save to Supabase automatically.
