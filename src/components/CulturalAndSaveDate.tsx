import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GoldDivider from './GoldDivider';

export function CulturalSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #D4A017 0%, #F2C94C 50%, #D4A017 100%)' }}>
      {/* Floating petals */}
      <div className="absolute top-6 left-4 sm:top-10 sm:left-10 text-xl sm:text-2xl md:text-3xl animate-float opacity-50">🌸</div>
      <div className="absolute top-12 right-6 sm:top-20 sm:right-20 text-lg sm:text-xl md:text-2xl animate-float-slow opacity-40" style={{ animationDelay: '1s' }}>🪷</div>
      <div className="hidden sm:block absolute bottom-12 left-1/4 text-xl md:text-2xl animate-float opacity-30" style={{ animationDelay: '2s' }}>🌺</div>
      <div className="hidden sm:block absolute bottom-8 right-1/3 text-lg md:text-xl animate-float-slow opacity-40" style={{ animationDelay: '3s' }}>✿</div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cinzel text-wine text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">A Feast of Traditions</h2>
          <GoldDivider className="mb-8 sm:mb-12" withDiamond={false} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative">
            {/* Decorative frame */}
            <div className="absolute -inset-2 sm:-inset-3 rounded-2xl border-2 border-wine/20" />
            <div className="absolute -inset-3 sm:-inset-6 rounded-2xl border border-wine/10" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/food-plate.jpg"
                alt="Traditional Indian Thali"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine/30 to-transparent" />
              <div className="absolute bottom-3 sm:bottom-6 left-0 right-0 text-center">
                <p className="font-cinzel text-cream text-xs sm:text-lg tracking-wider">Traditional Indian Cuisine</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function SaveTheDateSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date is February 14, 2027
    const targetDate = new Date('2027-02-14T00:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Run initially
    updateTimer();

    // Update every second
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const timerItems = [
    { value: formatNumber(timeLeft.days), label: 'Days' },
    { value: formatNumber(timeLeft.hours), label: 'Hours' },
    { value: formatNumber(timeLeft.minutes), label: 'Mins' },
    { value: formatNumber(timeLeft.seconds), label: 'Secs' }
  ];

  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-wine overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F2C94C' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating elements */}
      <div className="absolute top-10 right-8 sm:top-16 sm:right-16 text-2xl sm:text-3xl animate-float opacity-30">🌸</div>
      <div className="hidden sm:block absolute bottom-16 left-10 sm:left-16 text-xl sm:text-2xl animate-float-slow opacity-25" style={{ animationDelay: '2s' }}>🪷</div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* Ornamental card */}
          <div className="relative decorative-corner p-6 sm:p-8 md:p-12 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(212,160,23,0.1) 0%, rgba(139,0,0,0.3) 100%)', border: '2px solid rgba(242,201,76,0.3)' }}>
            
            {/* Corner ornaments */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-gold-accent/50" />
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-r-2 border-gold-accent/50" />
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-l-2 border-gold-accent/50" />
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-gold-accent/50" />

            <p className="font-lato text-gold-accent/70 text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 sm:mb-6">Save The Date</p>
            
            <h2 className="font-cinzel text-cream text-2xl sm:text-4xl md:text-5xl mb-1 sm:mb-2">Vikram</h2>
            <span className="font-vibes text-gold-accent text-xl sm:text-2xl md:text-3xl">&</span>
            <h2 className="font-cinzel text-cream text-2xl sm:text-4xl md:text-5xl mt-1 sm:mt-2 mb-6 sm:mb-8">Kavya</h2>

            <GoldDivider width="60px" className="mb-6 sm:mb-8" withDiamond={false} />

            {/* Couple photo */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6 sm:mb-8 rounded-full overflow-hidden border-4 border-gold-accent/40 shadow-xl">
              <img
                src="/images/couple.jpg"
                alt="Couple"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine/30 to-transparent" />
            </div>

            <div className="space-y-2">
              <p className="font-cinzel text-gold-accent text-2xl">February 14, 2027</p>
              <p className="font-lato text-cream/60 text-sm tracking-wider">The Grand Palace, Jaipur</p>
            </div>

            {/* Live Ticking Countdown */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-8 max-w-md mx-auto">
              {timerItems.map((item) => (
                <div 
                  key={item.label} 
                  className="relative p-2 sm:p-4 rounded-xl border border-gold-accent/20 backdrop-blur-sm overflow-hidden text-center transition-all duration-300 hover:border-gold-accent/40"
                  style={{
                    background: 'radial-gradient(100% 100% at 50% 0%, rgba(212, 160, 23, 0.15) 0%, rgba(139, 0, 0, 0.2) 100%)',
                    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Subtle inner top glow */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-accent/40 to-transparent" />
                  
                  <div className="overflow-hidden h-8 sm:h-12 flex items-center justify-center">
                    <motion.span 
                      key={item.value}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="font-cinzel text-gold-accent text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] block"
                    >
                      {item.value}
                    </motion.span>
                  </div>
                  
                  <p className="font-lato text-cream/50 text-[10px] sm:text-xs tracking-widest uppercase font-semibold mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
