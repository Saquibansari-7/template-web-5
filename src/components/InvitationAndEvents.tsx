import { motion } from 'framer-motion';
import GoldDivider from './GoldDivider';

export function InvitationSection() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-wine-dark to-wine overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 text-3xl animate-float opacity-30">🪷</div>
      <div className="absolute bottom-20 right-10 text-2xl animate-float-slow opacity-25" style={{ animationDelay: '1.5s' }}>🌸</div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cinzel text-cream text-3xl md:text-4xl mb-4">Wedding Invitation</h2>
          <GoldDivider className="mb-16" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Invitation card */}
          <div className="relative p-8 md:p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(245,230,200,0.95) 0%, rgba(245,214,110,0.3) 100%)',
              border: '3px solid #D4A017',
              boxShadow: '0 0 40px rgba(212,160,23,0.2), inset 0 0 40px rgba(212,160,23,0.1)',
            }}>

            {/* Double border effect */}
            <div className="absolute inset-3 border border-gold/40 rounded-sm" />

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 text-gold text-xl">❋</div>
            <div className="absolute top-4 right-4 text-gold text-xl">❋</div>
            <div className="absolute bottom-4 left-4 text-gold text-xl">❋</div>
            <div className="absolute bottom-4 right-4 text-gold text-xl">❋</div>


            <p className="font-lato text-wine/60 text-sm tracking-[0.3em] uppercase mb-4">
              Together with their families
            </p>

            <h3 className="font-cinzel text-wine text-3xl md:text-4xl mb-2">Vikram & Kavya</h3>

            <p className="font-lato text-wine/70 text-base mt-4 leading-relaxed max-w-md mx-auto">
              Request the honour of your presence at the celebration of their marriage
            </p>

            <div className="my-6">
              <GoldDivider width="60px" withDiamond={false} />
            </div>

            <p className="font-cinzel text-wine text-xl">Sunday, February 14, 2027</p>
            <p className="font-lato text-wine/60 text-sm mt-2">at half past four in the afternoon</p>

            <div className="my-6">
              <GoldDivider width="40px" withDiamond={false} />
            </div>

            <p className="font-cinzel text-wine/80 text-lg">The Grand Palace</p>
            <p className="font-lato text-wine/50 text-sm">Jaipur, Rajasthan, India</p>

            {/* Bottom ornament */}
            <div className="mt-8 flex justify-center gap-2">
              <span className="text-gold/60">✦</span>
              <span className="text-gold/60">✦</span>
              <span className="text-gold/60">✦</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function EventDetailsSection() {
  const events = [
    {
      day: 'Day 1',
      date: 'February 12, 2027',
      title: 'Mehndi & Sangeet',
      time: '4:00 PM Onwards',
      description: 'An evening of henna artistry, music, and dance celebrating the joy of togetherness.',

    },
    {
      day: 'Day 2',
      date: 'February 13, 2027',
      title: 'Haldi & Baraat',
      time: '10:00 AM Onwards',
      description: 'Sacred turmeric ceremony followed by the groom\'s grand procession with music and celebration.',

    },
    {
      day: 'Day 3',
      date: 'February 14, 2027',
      title: 'Wedding & Reception',
      time: '4:30 PM Onwards',
      description: 'The sacred wedding ceremony under the mandap, followed by a grand celebration of love.',

    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-wine overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F2C94C' fill-opacity='1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cinzel text-cream text-3xl md:text-4xl mb-4">Wedding Events</h2>
          <GoldDivider className="mb-16" />
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card-hover"
            >
              <div
                className="relative p-8 text-center h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,160,23,0.08) 0%, rgba(139,0,0,0.4) 100%)',
                  border: '1px solid rgba(242,201,76,0.25)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-accent/40" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-accent/40" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-accent/40" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-accent/40" />


                <p className="font-lato text-gold-accent/60 text-xs tracking-[0.3em] uppercase mb-1">{event.day}</p>
                <h3 className="font-cinzel text-cream text-xl mb-2">{event.title}</h3>

                <div className="my-4">
                  <div className="w-12 h-[1px] bg-gold-accent/30 mx-auto" />
                </div>

                <p className="font-cinzel text-gold-accent text-sm mb-3">{event.date}</p>
                <p className="font-lato text-gold-accent/60 text-xs tracking-wider mb-4">{event.time}</p>
                <p className="font-lato text-cream/60 text-sm leading-relaxed">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
