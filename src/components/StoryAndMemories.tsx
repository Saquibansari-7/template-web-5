import { motion } from 'framer-motion';
import GoldDivider from './GoldDivider';

export function StorySection() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-wine to-wine-dark overflow-hidden">
      {/* Floating petals */}
      <div className="absolute top-16 right-20 text-2xl animate-float opacity-25">🌸</div>
      <div className="absolute bottom-24 left-16 text-xl animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>🪷</div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cinzel text-cream text-3xl md:text-4xl mb-4">Our Story</h2>
          <GoldDivider className="mb-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-playfair text-cream/80 text-lg md:text-xl leading-relaxed italic mb-8">
            It all began with a chance encounter at a friend's gathering in Mumbai. Vikram's warm smile and Kavya's infectious laughter sparked a connection that neither could ignore.
          </p>
          <p className="font-playfair text-cream/80 text-lg md:text-xl leading-relaxed italic mb-8">
            Through shared dreams, countless conversations, and adventures across India, their bond grew deeper with every passing day. From the ghats of Varanasi to the backwaters of Kerala, their love story unfolded like a beautiful melody.
          </p>
          <p className="font-playfair text-cream/80 text-lg md:text-xl leading-relaxed italic">
            Now, surrounded by the blessings of their families and the warmth of their loved ones, Vikram and Kavya embark on the most beautiful journey of all — a lifetime together.
          </p>
        </motion.div>

        {/* Timeline dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          <div className="w-2 h-2 rounded-full bg-gold-accent/40" />
          <div className="w-2 h-2 rounded-full bg-gold-accent/60" />
          <div className="w-3 h-3 rounded-full bg-gold-accent" />
          <div className="w-2 h-2 rounded-full bg-gold-accent/60" />
          <div className="w-2 h-2 rounded-full bg-gold-accent/40" />
        </motion.div>
      </div>
    </section>
  );
}

const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: 'Mehndi' },
  { src: '/images/gallery-2.jpg', alt: 'Mandap' },
  { src: '/images/gallery-3.jpg', alt: 'Celebration' },
  { src: '/images/gallery-4.jpg', alt: 'Ceremony' },
  { src: '/images/gallery-5.jpg', alt: 'Jewelry' },
  { src: '/images/gallery-6.jpg', alt: 'Decorations' },
];

export function MemoriesSection() {
  return (
    <section className="relative py-24 md:py-32 bg-wine-dark overflow-hidden">
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cinzel text-cream text-3xl md:text-4xl mb-4">Memories</h2>
          <GoldDivider className="mb-12" />
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-square overflow-hidden"
              style={{
                border: '2px solid rgba(242,201,76,0.15)',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-cinzel text-cream text-sm">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
