import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

/* eslint-disable react-refresh/only-export-components */
import { DEFAULT_CONTENT, type WeddingContent } from './content';
import { loadContent, saveContent, resetContent } from './dataLayer';

interface ContentContextValue {
  content: WeddingContent;
  ready: boolean;
  dirty: boolean;
  update: (patch: Partial<WeddingContent>) => void;
  updateImage: (key: keyof WeddingContent['images'], value: string) => void;
  addBlessing: (name: string, message: string) => void;
  removeBlessing: (id: number) => void;
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
    // Persist immediately so blessings are visible in the admin panel
    // (and for other visitors) without requiring a manual Save.
    void saveContent(next).catch((err) => {
      if (import.meta.env.DEV) console.error('[addBlessing] save failed:', err);
    });
  }, [content]);

  const removeBlessing = useCallback((id: number) => {
    const next: WeddingContent = {
      ...content,
      blessings: content.blessings.filter((b) => b.id !== id),
    };
    setContent(next);
    setDirty(true);
    void saveContent(next).catch((err) => {
      if (import.meta.env.DEV) console.error('[removeBlessing] save failed:', err);
    });
  }, [content]);

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
    <ContentContext.Provider value={{ content, ready, dirty, update, updateImage, addBlessing, removeBlessing, save, reset }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
