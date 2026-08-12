import { motion } from 'framer-motion';
import GoldDivider from './GoldDivider';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Wedding background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/95 via-[#8B0000]/80 to-[#8B0000]/60" />
      </div>

      {/* Decorative mandala rings - hidden on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
        <div className="mandala-ring w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] animate-spin-slow" style={{ left: 'calc(-150px)', top: 'calc(-150px)' }} />
        <div className="mandala-ring w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] animate-spin-slow" style={{ left: 'calc(-125px)', top: 'calc(-125px)', animationDirection: 'reverse', animationDuration: '30s' }} />
      </div>

      {/* Floating decorative elements - mobile adjusted */}
      <div className="absolute top-12 right-8 sm:top-16 sm:right-12 md:top-20 md:right-20 text-2xl sm:text-3xl md:text-4xl animate-float opacity-60">🌸</div>
      <div className="absolute top-20 left-4 sm:top-32 sm:left-8 md:top-40 md:left-10 text-xl sm:text-2xl md:text-3xl animate-float-slow opacity-50" style={{ animationDelay: '2s' }}>🪷</div>
      <div className="hidden sm:block absolute bottom-24 right-20 sm:bottom-32 sm:right-24 md:bottom-32 md:right-32 text-2xl md:text-3xl animate-float opacity-40" style={{ animationDelay: '1s' }}>🌺</div>
      <div className="hidden sm:block absolute bottom-12 left-6 sm:bottom-16 sm:left-12 md:bottom-20 md:left-20 text-lg sm:text-xl md:text-2xl animate-float-slow opacity-50" style={{ animationDelay: '3s' }}>✿</div>
      <div className="hidden md:block absolute top-1/3 right-1/4 text-2xl animate-float opacity-30" style={{ animationDelay: '4s' }}>🏵️</div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex-1 text-center lg:text-left w-full lg:w-auto"
          >
            {/* Monogram */}
            {/* <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className="mb-8 inline-block"
            >
              <div className="w-28 h-28 rounded-full border-2 border-gold-accent flex items-center justify-center animate-pulse-glow"
                style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.2) 0%, transparent 70%)' }}>
                <span className="font-vibes text-4xl text-gold-accent">VK</span>
              </div>
            </motion.div> */}

            <GoldDivider width="80px" className="mb-6 sm:mb-8 justify-center lg:justify-start" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-lato text-cream/80 text-xs sm:text-sm md:text-lg tracking-[0.3em] uppercase mb-2 sm:mb-4"
            >
              Together with their families
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-cream mb-2 sm:mb-4 leading-tight"
            >
              <span className="gold-shimmer">Vikram</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="my-2 sm:my-4"
            >
              <span className="font-vibes text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gold-accent">&</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-cream mb-4 sm:mb-8 leading-tight"
            >
              <span className="gold-shimmer">Kavya</span>
            </motion.h1>

            <GoldDivider width="80px" className="mb-6 sm:mb-8 justify-center lg:justify-start" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="font-lato text-cream/70 text-sm sm:text-base md:text-lg tracking-wider"
            >
              Request the pleasure of your company
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="font-cinzel text-gold-accent text-lg sm:text-xl md:text-2xl mt-1 sm:mt-2 tracking-wider"
            >
              February 14, 2027
            </motion.p>
          </motion.div>

          {/* Right - Bride Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-2 sm:-inset-4 rounded-2xl border border-gold-accent/30" />
              <div className="absolute -inset-4 sm:-inset-8 rounded-2xl border border-gold-accent/15" />

              <div className="relative w-60 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[440px] lg:w-96 lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/bride.jpg"
                  alt="Bride"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/40 to-transparent" />
              </div>

              {/* Floating petals around image */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-xl sm:text-2xl md:text-3xl animate-float">🌸</div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 text-lg sm:text-xl md:text-2xl animate-float-slow" style={{ animationDelay: '1s' }}>🪷</div>
              <div className="absolute top-1/2 -right-6 sm:-right-8 text-sm sm:text-lg md:text-xl animate-float" style={{ animationDelay: '2s' }}>🌺</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
