import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

/* eslint-disable react-refresh/only-export-components */
import { DEFAULT_CONTENT, type WeddingContent } from './content';
import { loadContent, saveContent, resetContent, loadContentByCustomer, saveContentToSite } from './dataLayer';
import { type SiteRow } from '../lib/siteResolver';

interface ContentContextValue {
  content: WeddingContent;
  ready: boolean;
  dirty: boolean;
  update: (patch: Partial<WeddingContent>) => void;
  updateImage: (key: keyof WeddingContent['images'], value: string) => void;
  addBlessing: (name: string, message: string) => void;
  removeBlessing: (id: number) => void;
  save: () => Promise<'ok' | 'error'>;
  /** Save the current content back to a specific `sites` row (multi-tenant admin). */
  saveToSite: (siteId: string) => Promise<'ok' | 'error'>;
  reset: () => void;
  /** Resolved site row when ?customer= matched, otherwise null. */
  site: SiteRow | null;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<WeddingContent>(() => structuredClone(DEFAULT_CONTENT));
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [site, setSite] = useState<SiteRow | null>(null);

  useEffect(() => {
    let active = true;

    // Read ?customer=<subdomain> from the URL. If present, hit the `sites`
    // table once; only fall back to the default site if the customer is
    // missing OR the lookup fails. Never throws — the site always renders.
    const params = new URLSearchParams(window.location.search);
    const customer = params.get('customer');

    const finalize = (c: WeddingContent, s?: SiteRow | null) => {
      if (!active) return;
      setContent(c);
      setReady(true);
      if (s) setSite(s);
    };

    if (customer && customer.trim()) {
      loadContentByCustomer(customer)
        .then((result) => {
          if (!active) return;
          if (result) {
            finalize(result.content, result.site);
          } else {
            // Customer not found / not configured — fall back to default site.
            if (import.meta.env.DEV) console.warn('[ContentProvider] customer not found, using default site');
            loadContent().then((c) => finalize(c, null));
          }
        })
        .catch((err) => {
          if (import.meta.env.DEV) console.error('[ContentProvider] customer load failed:', err);
          loadContent().then((c) => finalize(c, null));
        });
    } else {
      loadContent().then((c) => finalize(c, null));
    }

    return () => {
      active = false;
    };
  }, []);

  const update = useCallback((patch: Partial<WeddingContent>) => {
    setContent((prev) => ({ ...prev, ...patch } as WeddingContent));
    setDirty(true);
  }, []);

  const updateImage = useCallback((key: keyof WeddingContent['images'], value: string) => {
    setContent((prev) => ({ ...prev, images: { ...prev.images, [key]: value } }));
    setDirty(true);
  }, []);

  const addBlessing = useCallback((name: string, message: string) => {
    const next: WeddingContent = {
      ...content,
      blessings: [
        { id: Date.now(), name, message, createdAt: new Date().toISOString() },
        ...content.blessings,
      ],
    };
    setContent(next);
    setDirty(true);
    const promise = site
      ? saveContentToSite(site.id, next)
      : saveContent(next);
    void promise.catch((err) => {
      if (import.meta.env.DEV) console.error('[addBlessing] save failed:', err);
    });
  }, [content, site]);

  const removeBlessing = useCallback((id: number) => {
    const next: WeddingContent = {
      ...content,
      blessings: content.blessings.filter((b) => b.id !== id),
    };
    setContent(next);
    setDirty(true);
    const promise = site
      ? saveContentToSite(site.id, next)
      : saveContent(next);
    void promise.catch((err) => {
      if (import.meta.env.DEV) console.error('[removeBlessing] save failed:', err);
    });
  }, [content, site]);

  const save = useCallback(async (): Promise<'ok' | 'error'> => {
    try {
      const snapshot = content;
      await saveContent(snapshot);
      setDirty(false);
      return 'ok';
    } catch (err) {
      if (import.meta.env.DEV) console.error('[save] failed:', err);
      return 'error';
    }
  }, [content]);

  const saveToSite = useCallback(async (siteId: string): Promise<'ok' | 'error'> => {
    try {
      const snapshot = content;
      await saveContentToSite(siteId, snapshot);
      setDirty(false);
      return 'ok';
    } catch (err) {
      if (import.meta.env.DEV) console.error('[saveToSite] failed:', err);
      return 'error';
    }
  }, [content]);

  const reset = useCallback(() => {
    void resetContent().then((c) => {
      setContent(c);
      setDirty(false);
    });
  }, []);

  return (
    <ContentContext.Provider value={{ content, ready, dirty, update, updateImage, addBlessing, removeBlessing, save, saveToSite, reset, site }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
