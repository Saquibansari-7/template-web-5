import { motion } from 'framer-motion';
import GoldDivider from './GoldDivider';
import PremiumIcon from './PremiumIcon';

/* ─── Interactive Map (replaces TypographySection) ─── */
export function InteractiveMapSection() {
  const venueAddress = 'The Grand Palace, Jaipur, Rajasthan, India';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`;

  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-cream overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cinzel text-wine text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Wedding Venue</h2>
          <GoldDivider className="mb-4" />
          <p className="font-playfair text-wine/60 text-base sm:text-lg italic mb-8 sm:mb-12">
            Where two hearts become one
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative p-4 sm:p-8 md:p-10 text-center card-hover"
            style={{
              background: 'linear-gradient(135deg, rgba(245,230,200,0.95) 0%, rgba(245,214,110,0.3) 100%)',
              border: '2px solid rgba(212,160,23,0.4)',
              boxShadow: '0 4px 30px rgba(212,160,23,0.15)',
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-3 sm:w-5 h-3 sm:h-5 border-t-2 border-l-2 border-gold-accent/50" />
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-3 sm:w-5 h-3 sm:h-5 border-t-2 border-r-2 border-gold-accent/50" />
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-3 sm:w-5 h-3 sm:h-5 border-b-2 border-l-2 border-gold-accent/50" />
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-3 sm:w-5 h-3 sm:h-5 border-b-2 border-r-2 border-gold-accent/50" />

            {/* Map embed */}
            <div className="mb-4 sm:mb-6 rounded-lg overflow-hidden border border-wine/10" style={{ aspectRatio: '16/9', minHeight: '200px' }}>
              <iframe
                title="Wedding Venue Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.5!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex justify-center mb-3 sm:mb-4"><PremiumIcon name="venue" size={40} /></div>

            <h3 className="font-cinzel text-wine text-lg sm:text-2xl md:text-3xl mb-2 sm:mb-3">The Grand Palace</h3>

            <div className="my-3 sm:my-4">
              <GoldDivider width="60px" withDiamond={false} />
            </div>

            <p className="font-lato text-wine/70 text-sm sm:text-base leading-relaxed mb-1 sm:mb-2">
              Near Amer Fort Road, Jaipur
            </p>
            <p className="font-lato text-wine/50 text-xs sm:text-sm mb-6 sm:mb-8">
              Rajasthan 302001, India
            </p>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 sm:px-10 py-2 sm:py-4 font-cinzel text-cream text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)',
                border: '1px solid rgba(242,201,76,0.3)',
              }}
            >
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Travel & Accommodation (replaces ColorPaletteSection) ─── */
export function TravelAccommodationSection() {
  const travelInfo = [
    {
      icon: 'airplane',
      title: 'Nearest Airport',
      details: 'Jaipur International Airport (JAI)',
      sub: '~25 km from the venue • 40 min drive',
    },
    {
      icon: 'train',
      title: 'Railway Station',
      details: 'Jaipur Junction (JP)',
      sub: '~12 km from the venue • 25 min drive',
    },
    {
      icon: 'cab',
      title: 'Cab Services',
      details: 'Ola & Uber available citywide',
      sub: 'Pre-book for airport/station pickups',
    },
    {
      icon: 'shuttle',
      title: 'Shuttle Service',
      details: 'Complimentary guest shuttles provided',
      sub: 'Routes from major hotels to venue',
    },
  ];

  const hotels = [
    {
      tier: 'Luxury',
      icon: 'luxury',
      names: 'Rambagh Palace, Taj Jai Mahal Palace',
      note: 'Heritage luxury experience',
    },
    {
      tier: 'Mid-Range',
      icon: 'hotel',
      names: 'ITC Rajputana, Holiday Inn Jaipur',
      note: 'Comfortable & convenient',
    },
    {
      tier: 'Budget',
      icon: 'budget',
      names: 'Zostel Jaipur, Hotel Pearl Palace',
      note: 'Affordable & well-rated',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cinzel text-wine text-3xl md:text-4xl mb-4">Travel & Accommodation</h2>
          <GoldDivider className="mb-4" />
          <p className="font-playfair text-wine/60 text-lg italic mb-16">
            Everything you need for a comfortable journey
          </p>
        </motion.div>

        {/* Travel Info Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {travelInfo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover"
            >
              <div
                className="relative p-6 text-center h-full"
                style={{
                  background: 'rgba(139,0,0,0.04)',
                  border: '1px solid rgba(139,0,0,0.1)',
                  borderRadius: '8px',
                }}
              >
                <div className="flex justify-center mb-4"><PremiumIcon name={item.icon} size={36} /></div>
                <h3 className="font-cinzel text-wine text-base mb-2 tracking-wider">{item.title}</h3>
                <div className="w-8 h-[1px] bg-gold/40 mx-auto my-3" />
                <p className="font-lato text-wine/80 text-sm font-medium mb-1">{item.details}</p>
                <p className="font-lato text-wine/50 text-xs">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hotel Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h3 className="font-cinzel text-wine text-2xl mb-2">Hotel Recommendations</h3>
          <GoldDivider width="80px" className="mb-10" withDiamond={false} />
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {hotels.map((hotel, i) => (
            <motion.div
              key={hotel.tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card-hover"
            >
              <div
                className="relative p-6 text-center h-full"
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

                <div className="flex justify-center mb-3"><PremiumIcon name={hotel.icon} size={36} /></div>
                <h4 className="font-cinzel text-wine text-lg mb-1 tracking-wider">{hotel.tier}</h4>
                <div className="w-8 h-[1px] bg-gold/40 mx-auto my-3" />
                <p className="font-lato text-wine/80 text-sm leading-relaxed mb-2">{hotel.names}</p>
                <p className="font-lato text-wine/50 text-xs italic">{hotel.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Family & Wedding Party (replaces GridSystemSection) ─── */
export function FamilyWeddingPartySection() {
  const groomSide = [
    { name: 'Mr. Rajesh Sharma', role: 'Father of the Groom' },
    { name: 'Mrs. Sunita Sharma', role: 'Mother of the Groom' },
    { name: 'Arjun Sharma', role: 'Brother of the Groom' },
    { name: 'Priya Sharma', role: 'Sister of the Groom' },
    { name: 'Rahul Sharma', role: 'Cousin — Best Man' },
    { name: 'Aditya Verma', role: 'Groomsman' },
    { name: 'Karan Mehta', role: 'Groomsman' },
  ];

  const brideSide = [
    { name: 'Mr. Suresh Patel', role: 'Father of the Bride' },
    { name: 'Mrs. Meena Patel', role: 'Mother of the Bride' },
    { name: 'Neha Patel', role: 'Sister of the Bride' },
    { name: 'Ananya Patel', role: 'Cousin — Maid of Honor' },
    { name: 'Riya Joshi', role: 'Bridesmaid' },
    { name: 'Sneha Kapoor', role: 'Bridesmaid' },
    { name: 'Meghna Iyer', role: 'Bridesmaid' },
  ];

  const officiant = { name: 'Pandit Shri Rameshwar Ji', role: 'Wedding Priest (Pandit)' };

  return (
    <section className="relative py-24 md:py-32 bg-wine overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
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
          <h2 className="font-cinzel text-cream text-3xl md:text-4xl mb-4">Family & Wedding Party</h2>
          <GoldDivider className="mb-4" />
          <p className="font-playfair text-gold-accent/70 text-lg italic mb-16">
            The cherished people who make this celebration complete
          </p>
        </motion.div>

        {/* Pandit / Officiant — centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xs mx-auto mb-16"
        >
          <div
            className="relative p-6 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(212,160,23,0.15) 0%, rgba(139,0,0,0.4) 100%)',
              border: '2px solid rgba(242,201,76,0.4)',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(212,160,23,0.15)',
            }}
          >
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold-accent/50" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold-accent/50" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold-accent/50" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold-accent/50" />

            <div className="flex justify-center mb-3"><PremiumIcon name="namaste" size={40} /></div>
            <h4 className="font-cinzel text-cream text-lg mb-1">{officiant.name}</h4>
            <p className="font-lato text-gold-accent text-xs tracking-[0.15em] uppercase">{officiant.role}</p>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Groom's Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="font-cinzel text-cream text-2xl mb-2">Groom's Side</h3>
              <GoldDivider width="60px" withDiamond={false} />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {groomSide.map((person, i) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card-hover"
                >
                  <div
                    className="p-4 text-center"
                    style={{
                      background: 'rgba(242,201,76,0.08)',
                      border: '1px solid rgba(242,201,76,0.2)',
                      borderRadius: '8px',
                    }}
                  >
                    <h4 className="font-cinzel text-cream text-sm mb-1">{person.name}</h4>
                    <p className="font-lato text-cream/50 text-xs tracking-wider">{person.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bride's Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="font-cinzel text-cream text-2xl mb-2">Bride's Side</h3>
              <GoldDivider width="60px" withDiamond={false} />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brideSide.map((person, i) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card-hover"
                >
                  <div
                    className="p-4 text-center"
                    style={{
                      background: 'rgba(242,201,76,0.08)',
                      border: '1px solid rgba(242,201,76,0.2)',
                      borderRadius: '8px',
                    }}
                  >
                    <h4 className="font-cinzel text-cream text-sm mb-1">{person.name}</h4>
                    <p className="font-lato text-cream/50 text-xs tracking-wider">{person.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
