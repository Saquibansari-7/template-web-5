import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
}

const petalEmojis = ['🌸', '🌺', '🪷', '✿', '❀', '🏵️'];

function buildPetals(count: number, isMobile: boolean): Petal[] {
  const petalCount = isMobile ? Math.floor(count / 2) : count;
  return Array.from({ length: petalCount }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 20,
    size: isMobile ? 8 + Math.random() * 12 : 12 + Math.random() * 16,
    emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
  }));
}

export default function FloatingPetals({ count = 15 }: { count?: number }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [petals, setPetals] = useState<Petal[]>(() => buildPetals(count, window.innerWidth < 640));

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setPetals(buildPetals(count, mobile));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="animate-petal absolute"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            fontSize: `${petal.size}px`,
            opacity: isMobile ? 0.4 : 0.6,
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </div>
  );
}
