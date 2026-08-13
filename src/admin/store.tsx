import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { DEFAULT_CONTENT, type WeddingContent } from './content';
import { loadContent, saveContent, resetContent } from './dataLayer';

interface ContentContextValue {
  content: WeddingContent;
  ready: boolean;
  dirty: boolean;
  update: (patch: Partial<WeddingContent>) => void;
  updateImage: (key: keyof WeddingContent['images'], value: string) => void;
  save: () => Promise<'ok' | 'error'>;
  reset: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<WeddingContent>(() => structuredClone(DEFAULT_CONTENT));
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let active = true;
    loadContent().then((c) => {
      if (!active) return;
      setContent(c);
      setReady(true);
    });
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

  const reset = useCallback(() => {
    void resetContent().then((c) => {
      setContent(c);
      setDirty(false);
    });
  }, []);

  return (
    <ContentContext.Provider value={{ content, ready, dirty, update, updateImage, save, reset }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
