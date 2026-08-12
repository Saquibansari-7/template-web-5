import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoldDivider from './GoldDivider';
import PremiumIcon from './PremiumIcon';

/* ─── Sparkle particle type ─── */
interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
}

let sparkleIdCounter = 0;
const SPARKLE_EMOJIS = ['✨', '💫', '🌸', '💖', '🪷', '⭐'];

export function SendLoveSection() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [blessings, setBlessings] = useState<{ id: number; name: string; message: string }[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const spawnSparkles = useCallback(() => {
    const newSparkles: Sparkle[] = Array.from({ length: 14 }, () => ({
      id: sparkleIdCounter++,
      x: Math.random() * 100,
      y: Math.random() * 40 + 30,
      size: Math.random() * 16 + 12,
      delay: Math.random() * 0.4,
      duration: Math.random() * 1.2 + 1,
      emoji: SPARKLE_EMOJIS[Math.floor(Math.random() * SPARKLE_EMOJIS.length)],
    }));
    setSparkles((prev) => [...prev, ...newSparkles]);
    // Clean up sparkles after animation completes
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.includes(s)));
    }, 2800);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    const guestName = name.trim() || 'A Loving Guest';
    setBlessings((prev) => [{ id: Date.now(), name: guestName, message: message.trim() }, ...prev]);
    setMessage('');
    setName('');
    spawnSparkles();
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #D4A017 0%, #F2C94C 50%, #D4A017 100%)' }}>
      {/* Floating petals */}
      <div className="absolute top-12 left-12 text-3xl animate-float opacity-30">🌸</div>
      <div className="absolute top-24 right-20 text-2xl animate-float-slow opacity-25" style={{ animationDelay: '1.5s' }}>🪷</div>
      <div className="absolute bottom-16 left-1/4 text-2xl animate-float opacity-20" style={{ animationDelay: '2s' }}>💐</div>
      <div className="absolute bottom-12 right-16 text-xl animate-float-slow opacity-25" style={{ animationDelay: '0.5s' }}>✿</div>

      {/* ── Sparkle overlay ── */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0.6], y: -120 }}
            exit={{ opacity: 0 }}
            transition={{ duration: s.duration, delay: s.delay, ease: 'easeOut' }}
            className="pointer-events-none fixed z-50"
            style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size }}
          >
            {s.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-6">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cinzel text-wine text-3xl md:text-4xl mb-4">
            Send Your{' '}
            <span className="font-vibes text-wine text-4xl md:text-5xl">Love</span>
          </h2>
          <GoldDivider className="mb-4" />
          <p className="font-playfair text-wine/70 text-lg italic mb-12">
            Shower the couple with your blessings & warm wishes
          </p>
        </motion.div>

        {/* ── Input card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div
            className="relative p-8 md:p-10"
            style={{
              background: 'rgba(139,0,0,0.08)',
              border: '2px solid rgba(139,0,0,0.15)',
              borderRadius: '12px',
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold-accent/50" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold-accent/50" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold-accent/50" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold-accent/50" />

            <div className="flex justify-center mb-5">
              <PremiumIcon name="namaste" size={44} />
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-cinzel text-wine text-sm mb-2 tracking-wider">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-light/80 border border-wine/15 rounded-lg font-lato text-wine focus:outline-none focus:border-wine/40 focus:ring-1 focus:ring-wine/20 transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block font-cinzel text-wine text-sm mb-2 tracking-wider">Your Blessing</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  maxLength={280}
                  className="w-full px-4 py-3 bg-cream-light/80 border border-wine/15 rounded-lg font-lato text-wine focus:outline-none focus:border-wine/40 focus:ring-1 focus:ring-wine/20 resize-none transition-all duration-200"
                  placeholder="Write your heartfelt wishes for the couple…"
                />
                <p className="text-right font-lato text-wine/40 text-xs mt-1">{message.length}/280</p>
              </div>

              {/* Send button */}
              <motion.button
                type="button"
                onClick={handleSend}
                disabled={!message.trim()}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-full font-cinzel text-cream text-lg tracking-[0.15em] uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: message.trim()
                    ? 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)'
                    : 'linear-gradient(135deg, #8B000066 0%, #6B000066 100%)',
                  border: '1px solid rgba(242,201,76,0.3)',
                  boxShadow: message.trim() ? '0 6px 24px rgba(139,0,0,0.35)' : 'none',
                }}
              >
                ❤️️Send Love❤️️
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── Blessings wall ── */}
        <AnimatePresence>
          {blessings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="text-center mb-10">
                <h3 className="font-cinzel text-wine text-2xl mb-2">Blessings & Wishes</h3>
                <GoldDivider width="80px" withDiamond={false} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {blessings.map((b, i) => (
                    <motion.div
                      key={b.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: i === 0 ? 0 : 0 }}
                      className="card-hover"
                    >
                      <div
                        className="relative p-6 h-full"
                        style={{
                          background: 'linear-gradient(135deg, rgba(245,230,200,0.95) 0%, rgba(245,214,110,0.2) 100%)',
                          border: '2px solid rgba(212,160,23,0.3)',
                          borderRadius: '10px',
                          boxShadow: '0 4px 16px rgba(139,0,0,0.08)',
                        }}
                      >
                        {/* Corner accents */}
                        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-accent/40" />
                        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-accent/40" />
                        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-accent/40" />
                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-accent/40" />

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm">💖</span>
                          <h4 className="font-cinzel text-wine text-sm tracking-wider">{b.name}</h4>
                        </div>
                        <div className="w-8 h-[1px] bg-gold/40 mb-3" />
                        <p className="font-playfair text-wine/75 text-sm leading-relaxed italic">
                          "{b.message}"
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export function FAQsSection() {
  const faqs = [
    {
      icon: 'dress',
      question: 'What is the dress code?',
      answer:
        'Traditional Indian attire is encouraged. Ladies may wear sarees, lehengas, or salwar suits. Gentlemen may wear sherwanis, kurta-pajamas, or formal suits. Please embrace vibrant colors — it\'s a celebration!',
    },
    {
      icon: 'child',
      question: 'Are children invited?',
      answer:
        'Absolutely! Children of all ages are welcome. We will have a supervised kids\' corner with activities during the reception. Highchairs and child-friendly meals are available — please mention in your RSVP.',
    },
    {
      icon: 'camera',
      question: 'Can we take photographs?',
      answer:
        'We\'d love you to capture memories! Personal photography is welcome during the Mehndi, Sangeet, and reception. During the sacred wedding ceremony (pheras), we kindly request no flash photography — our professional team will cover it.',
    },
    {
      icon: 'thali',
      question: 'What about food preferences?',
      answer:
        'A grand vegetarian feast will be served, including Jain-friendly and vegan options. If you have specific dietary needs (allergies, halal requirements), please let us know in your RSVP so we can accommodate you.',
    },
    {
      icon: 'parking',
      question: 'What about parking & shuttles?',
      answer:
        'Complimentary valet parking is available at the venue. Shuttle buses will run from select partner hotels to the venue and back. Pickup schedules will be shared closer to the date via WhatsApp.',
    },
    {
      icon: 'om',
      question: 'What is the ceremony timing?',
      answer:
        'The wedding ceremony will commence at the auspicious muhurat of 4:30 PM on February 14, 2027. The pheras are expected at 5:15 PM. We request guests to be seated by 4:00 PM for the rituals to begin on time.',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-cream overflow-hidden">
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cinzel text-wine text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
          <GoldDivider className="mb-4" />
          <p className="font-playfair text-wine/60 text-lg italic mb-16">
            Everything you might want to know
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover"
            >
              <div
                className="relative p-6 h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,230,200,0.95) 0%, rgba(245,214,110,0.2) 100%)',
                  border: '2px solid rgba(212,160,23,0.3)',
                  borderRadius: '8px',
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-accent/40" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-accent/40" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-accent/40" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-accent/40" />

                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 mt-1"><PremiumIcon name={faq.icon} size={32} /></span>
                  <div>
                    <h3 className="font-cinzel text-wine text-base mb-3 tracking-wider leading-snug">
                      {faq.question}
                    </h3>
                    <div className="w-8 h-[1px] bg-gold/40 mb-3" />
                    <p className="font-lato text-wine/65 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative py-16 bg-wine-dark">
      <div className="container mx-auto px-6 text-center">
        <GoldDivider className="mb-8" withDiamond={false} />

        <h3 className="font-vibes text-gold-accent text-4xl mb-4">Vikram & Kavya</h3>
        <p className="font-cinzel text-cream/50 text-sm tracking-[0.2em] uppercase mb-8">
          February 14, 2027 • Jaipur, India
        </p>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-gold-accent/30 flex items-center justify-center hover:border-gold-accent/60 hover:bg-gold-accent/10 transition-all duration-300"
            title="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gold-accent/70">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>

          {/* Email */}
          <a href="mailto:vikramandkavya@example.com"
            className="w-12 h-12 rounded-full border border-gold-accent/30 flex items-center justify-center hover:border-gold-accent/60 hover:bg-gold-accent/10 transition-all duration-300"
            title="Email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gold-accent/70">
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <polyline points="22,4 12,13 2,4" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-gold-accent/30 flex items-center justify-center hover:border-gold-accent/60 hover:bg-gold-accent/10 transition-all duration-300"
            title="WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gold-accent/70">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>

        <div className="w-16 h-[1px] bg-gold-accent/20 mx-auto mb-6" />
        <p className="font-lato text-cream/20 text-xs mt-2">
          © 2027 webforwedd. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
