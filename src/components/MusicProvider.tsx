import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import songUrl from '../assets/music/wedding-song.mp3';

interface MusicContextValue {
  isPlaying: boolean;
  toggle: () => void;
  play: () => void;
  pause: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (audioRef.current === null && typeof Audio !== 'undefined') {
    const audio = new Audio(songUrl);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.6;
    audioRef.current = audio;
  }

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) pause();
    else play();
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  return (
    <MusicContext.Provider value={{ isPlaying, toggle, play, pause }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}
