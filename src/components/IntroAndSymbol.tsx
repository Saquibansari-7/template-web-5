import { motion } from 'framer-motion';
import GoldDivider from './GoldDivider';

export function IntroSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-wine">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F2C94C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <GoldDivider className="mb-8 sm:mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-[600px] mx-auto text-center"
        >
          <p className="font-playfair text-cream/90 text-base sm:text-lg md:text-xl leading-relaxed italic">
            "Two souls with but a single thought, two hearts that beat as one."
          </p>
          <p className="font-lato text-gold-accent/70 text-xs sm:text-sm mt-4 sm:mt-6 tracking-wider uppercase">
              Quote
          </p>
        </motion.div>

        <GoldDivider className="mt-8 sm:mt-12" />
      </div>
    </section>
  );
}

export function CoupleMonogramSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-wine to-wine-dark overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(212,160,23,0.06) 0%, transparent 60%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Monogram emblem */}
        <div className="relative">
          {/* Decorative animated rings */}
          <div className="absolute inset-0 -m-4 sm:-m-8 rounded-full border border-gold-accent/20 animate-spin-slow" />
          <div className="absolute inset-0 -m-8 sm:-m-16 rounded-full border border-gold-accent/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
          <div className="absolute inset-0 -m-12 sm:-m-24 rounded-full border border-gold-accent/5 animate-spin-slow" style={{ animationDuration: '35s' }} />

          {/* Central Om emblem */}
          <div
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-gold-accent/40 flex items-center justify-center"
            style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, rgba(139,0,0,0.2) 100%)' }}
          >
            <span className="font-vibes text-gold-accent text-5xl sm:text-7xl leading-none">ॐ</span>
          </div>
        </div>

        {/* Decorative ornament line */}
        <div className="mt-6 sm:mt-10 flex items-center gap-2 sm:gap-4">
          <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-gold-accent/50" />
          <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full border border-gold-accent/50" />
          <span className="text-gold-accent/60 text-base sm:text-lg">✦</span>
          <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full border border-gold-accent/50" />
          <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-gold-accent/50" />
        </div>

        {/* Sanskrit blessing */}
        <p className="font-playfair text-cream/60 text-xs sm:text-sm mt-6 sm:mt-8 italic tracking-wide text-center max-w-md px-4 sm:px-6">
          "May your union be blessed with love, laughter & togetherness for all the days to come."
        </p>

        <p className="font-cinzel text-gold-accent/50 text-[10px] sm:text-xs mt-3 sm:mt-4 tracking-[0.3em] uppercase">
          Marriages are settled in heaven.
        </p>
      </motion.div>
    </section>
  );
}
