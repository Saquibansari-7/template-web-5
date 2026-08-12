import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { DEFAULT_CONTENT, type WeddingContent } from './content';
import { loadContent, saveContent, resetContent } from './dataLayer';

interface ContentContextValue {
  content: WeddingContent;
  ready: boolean;
  update: (patch: Partial<WeddingContent>) => void;
  updateImage: (key: keyof WeddingContent['images'], value: string) => void;
  reset: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<WeddingContent>(() => structuredClone(DEFAULT_CONTENT));
  const [ready, setReady] = useState(false);

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

  const update = useCallback(
    (patch: Partial<WeddingContent>) => {
      setContent((prev) => {
        const next = { ...prev, ...patch } as WeddingContent;
        void saveContent(next);
        return next;
      });
    },
    [],
  );

  const updateImage = useCallback(
    (key: keyof WeddingContent['images'], value: string) => {
      setContent((prev) => {
        const next = { ...prev, images: { ...prev.images, [key]: value } };
        void saveContent(next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    void resetContent().then(setContent);
  }, []);

  return (
    <ContentContext.Provider value={{ content, ready, update, updateImage, reset }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
