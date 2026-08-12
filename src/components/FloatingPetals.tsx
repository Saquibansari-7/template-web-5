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

export default function FloatingPetals({ count = 15 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Reduce petal count on mobile devices for better performance
    const petalCount = isMobile ? Math.floor(count / 2) : count;
    const newPetals: Petal[] = Array.from({ length: petalCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 20,
      size: isMobile ? 8 + Math.random() * 12 : 12 + Math.random() * 16,
      emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
    }));
    setPetals(newPetals);
  }, [count, isMobile]);

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
