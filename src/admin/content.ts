export interface EventItem {
  day: string;
  date: string;
  title: string;
  time: string;
  description: string;
}

export interface TravelItem {
  icon: string;
  title: string;
  details: string;
  sub: string;
  enabled: boolean;
}

export interface HotelItem {
  tier: string;
  icon: string;
  names: string;
  note: string;
  enabled: boolean;
}

export interface GalleryItem {
  src: string;
  alt: string;
}

export interface BlessingItem {
  id: number;
  name: string;
  message: string;
  createdAt?: string;
}

export type SectionKey =
  | 'hero'
  | 'intro'
  | 'monogram'
  | 'saveDate'
  | 'story'
  | 'memories'
  | 'invitation'
  | 'events'
  | 'cultural'
  | 'family'
  | 'travel'
  | 'map'
  | 'sendLove'
  | 'blessing';

export interface WeddingContent {
  /* Section visibility — toggle any section on/off from the site */
  sections: Record<SectionKey, boolean>;

  /* Couple & Date — shared across Hero, SaveTheDate, Footer, Monogram, Invitation */
  groomName: string;
  brideName: string;
  weddingDate: string; // display string e.g. "February 14, 2027"
  dateYear: string; // e.g. "2027"
  dateMonth: string; // e.g. "February"
  dateDay: string; // e.g. "14"
  venueName: string;
  venueCity: string;

  /* Hero */
  heroPreLine: string; // "Together with their families"
  heroRequestLine: string; // "Request the pleasure of your company"

  /* Invitation */
  invitationPreLine: string;
  invitationBody: string;
  invitationTimeText: string; // "at half past four in the afternoon"

  /* Images (path by default, base64 data URL when uploaded via admin) */
  images: {
    heroBg: string;
    bride: string;
    couple: string;
    thali: string;
  };

  /* Our Story */
  storyHeading: string;
  storyParagraphs: string[];

  /* Memories gallery */
  galleryHeading: string;
  gallery: GalleryItem[];

  /* Events */
  eventsHeading: string;
  events: EventItem[];

  /* Map / Venue location */
  mapHeading: string;
  mapSub: string;
  mapAddress: string;
  mapEmbedUrl: string;

  /* Send Love (blessings board) */
  sendLoveHeading: string;
  sendLoveSub: string;
  sendLoveNameLabel: string;
  sendLoveMessageLabel: string;
  sendLovePlaceholder: string;
  blessingsHeading: string;
  blessings: BlessingItem[];

  /* Travel & Accommodation */
  travelHeading: string;
  travelSub: string;
  travelInfo: TravelItem[];
  hotelsHeading: string;
  hotels: HotelItem[];
}

export const ALL_SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'intro', label: 'Intro Quote' },
  { key: 'monogram', label: 'Monogram / Om' },
  { key: 'saveDate', label: 'Save The Date' },
  { key: 'story', label: 'Our Story' },
  { key: 'memories', label: 'Memories Gallery' },
  { key: 'invitation', label: 'Invitation' },
  { key: 'events', label: 'Events' },
  { key: 'cultural', label: 'Cultural Highlight' },
  { key: 'family', label: 'Family & Wedding Party' },
  { key: 'travel', label: 'Travel & Accommodation' },
  { key: 'map', label: 'Venue Map' },
  { key: 'sendLove', label: 'Send Love' },
  { key: 'blessing', label: 'Sacred Blessing' },
];

const enabledTravel = (
  icon: string,
  title: string,
  details: string,
  sub: string,
): TravelItem => ({ icon, title, details, sub, enabled: true });

const enabledHotel = (
  tier: string,
  icon: string,
  names: string,
  note: string,
): HotelItem => ({ tier, icon, names, note, enabled: true });

export const DEFAULT_CONTENT: WeddingContent = {
  sections: {
    hero: true,
    intro: true,
    monogram: true,
    saveDate: true,
    story: true,
    memories: true,
    invitation: true,
    events: true,
    cultural: true,
    family: true,
    travel: true,
    map: true,
    sendLove: true,
    blessing: true,
  },

  groomName: 'Vikram',
  brideName: 'Kavya',
  weddingDate: 'February 14, 2027',
  dateYear: '2027',
  dateMonth: 'February',
  dateDay: '14',
  venueName: 'The Grand Palace',
  venueCity: 'Jaipur, Rajasthan, India',

  heroPreLine: 'Together with their families',
  heroRequestLine: 'Request the pleasure of your company',

  invitationPreLine: 'Together with their families',
  invitationBody: 'Request the honour of your presence at the celebration of their marriage',
  invitationTimeText: 'at half past four in the afternoon',

  images: {
    heroBg: '/images/hero-bg.jpg',
    bride: '/images/bride.jpg',
    couple: '/images/couple.jpg',
    thali: '/images/food-plate.jpg',
  },

  storyHeading: 'Our Story',
  storyParagraphs: [
    'It all began with a chance encounter at a friend\'s gathering in Mumbai. Vikram\'s warm smile and Kavya\'s infectious laughter sparked a connection that neither could ignore.',
    'Through shared dreams, countless conversations, and adventures across India, their bond grew deeper with every passing day. From the ghats of Varanasi to the backwaters of Kerala, their love story unfolded like a beautiful melody.',
    'Now, surrounded by the blessings of their families and the warmth of their loved ones, Vikram and Kavya embark on the most beautiful journey of all — a lifetime together.',
  ],

  galleryHeading: 'Memories',
  gallery: [
    { src: '/images/gallery-1.jpg', alt: 'Mehndi' },
    { src: '/images/gallery-2.jpg', alt: 'Mandap' },
    { src: '/images/gallery-3.jpg', alt: 'Celebration' },
    { src: '/images/gallery-4.jpg', alt: 'Ceremony' },
    { src: '/images/gallery-5.jpg', alt: 'Jewelry' },
    { src: '/images/gallery-6.jpg', alt: 'Decorations' },
  ],

  eventsHeading: 'Wedding Events',
  events: [
    {
      day: 'Day 1',
      date: 'February 12, 2027',
      title: 'Mehndi & Sangeet',
      time: '4:00 PM Onwards',
      description:
        "An evening of henna artistry, music, and dance celebrating the joy of togetherness.",
    },
    {
      day: 'Day 2',
      date: 'February 13, 2027',
      title: 'Haldi & Baraat',
      time: '10:00 AM Onwards',
      description:
        "Sacred turmeric ceremony followed by the groom's grand procession with music and celebration.",
    },
    {
      day: 'Day 3',
      date: 'February 14, 2027',
      title: 'Wedding & Reception',
      time: '4:30 PM Onwards',
      description:
        'The sacred wedding ceremony under the mandap, followed by a grand celebration of love.',
    },
  ],

  mapHeading: 'Wedding Venue',
  mapSub: 'Where two hearts become one',
  mapAddress: 'The Grand Palace, Jaipur, Rajasthan, India',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.5!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1',

  sendLoveHeading: 'Send Your Love',
  sendLoveSub: 'Shower the couple with your blessings & warm wishes',
  sendLoveNameLabel: 'Your Name',
  sendLoveMessageLabel: 'Your Blessing',
  sendLovePlaceholder: 'Write your heartfelt wishes for the couple…',
  blessingsHeading: 'Blessings & Wishes',
  blessings: [],

  travelHeading: 'Travel & Accommodation',
  travelSub: 'Everything you need for a comfortable journey',
  travelInfo: [
    enabledTravel('airplane', 'Nearest Airport', 'Jaipur International Airport (JAI)', '~25 km from the venue • 40 min drive'),
    enabledTravel('train', 'Railway Station', 'Jaipur Junction (JP)', '~12 km from the venue • 25 min drive'),
    enabledTravel('cab', 'Cab Services', 'Ola & Uber available citywide', 'Pre-book for airport/station pickups'),
    enabledTravel('shuttle', 'Shuttle Service', 'Complimentary guest shuttles provided', 'Routes from major hotels to venue'),
  ],
  hotelsHeading: 'Hotel Recommendations',
  hotels: [
    enabledHotel('Luxury', 'luxury', 'Rambagh Palace, Taj Jai Mahal Palace', 'Heritage luxury experience'),
    enabledHotel('Mid-Range', 'hotel', 'ITC Rajputana, Holiday Inn Jaipur', 'Comfortable & convenient'),
    enabledHotel('Budget', 'budget', 'Zostel Jaipur, Hotel Pearl Palace', 'Affordable & well-rated'),
  ],
};
