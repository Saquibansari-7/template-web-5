import { useRef, useState, type ReactNode } from 'react';
import { useContent } from './store';
import { uploadImage } from '../services/uploadImage';
import { isSupabaseConfigured } from '../admin/dataLayer';
import { useAuth } from './auth';
import { ALL_SECTIONS, DEFAULT_CONTENT, type WeddingContent } from './content';

/* ─── Reusable form primitives ─── */

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  'w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40';

function TextField({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <Field label={label}>
      {textarea ? (
        <textarea
          className={`${inputCls} resize-none`}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </Field>
  );
}

/* Toggle switch */
function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2"
    >
      <span
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-amber-500' : 'bg-slate-600'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : ''}`}
        />
      </span>
      {label && <span className="text-xs text-slate-300">{label}</span>}
    </button>
  );
}

function ImageField({
  label,
  imgKey,
}: {
  label: string;
  imgKey: keyof WeddingContent['images'];
}) {
  const { content, updateImage } = useContent();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const src = content.images[imgKey];

  const onFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      const url = await uploadImage(file);
      if (!url) throw new Error('Upload returned no URL');
      updateImage(imgKey, url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mb-5">
      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
        {label}
      </span>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-600 bg-slate-800 flex-shrink-0">
          <img src={src} alt={label} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm text-slate-100 transition"
          >
            {busy ? 'Uploading…' : 'Choose image'}
          </button>
          <button
            type="button"
            onClick={() => updateImage(imgKey, DEFAULT_CONTENT.images[imgKey])}
            className="ml-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 transition"
          >
            Reset
          </button>
          {err && <p className="text-[11px] text-red-400 mt-2">{err}</p>}
          {!err && <p className="text-[11px] text-slate-500 mt-2 break-all">{src.slice(0, 48)}</p>}
        </div>
      </div>
    </div>
  );
}

/* Gallery image upload (Supabase Storage) */
function GalleryManager() {
  const { content, update } = useContent();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      const url = await uploadImage(file);
      if (!url) throw new Error('Upload returned no URL');
      update({ gallery: [...content.gallery, { src: url, alt: 'Photo' }] });
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const setAlt = (i: number, alt: string) => {
    update({ gallery: content.gallery.map((g, idx) => (idx === i ? { ...g, alt } : g)) });
  };
  const remove = (i: number) => {
    update({ gallery: content.gallery.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {content.gallery.map((g, i) => (
        <div key={i} className="border border-slate-700 rounded-lg p-3">
          <div className="w-full aspect-square rounded-md overflow-hidden bg-slate-800 mb-2">
            <img src={g.src} alt={g.alt} className="w-full h-full object-cover" />
          </div>
          <input
            className={`${inputCls} mb-2`}
            value={g.alt}
            placeholder="Caption"
            onChange={(e) => setAlt(i, e.target.value)}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="w-full text-xs py-1.5 rounded-md bg-red-500/15 hover:bg-red-500/25 text-red-300 transition"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="border border-dashed border-slate-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-300 hover:border-amber-400 transition text-sm min-h-[140px]"
      >
        {busy ? 'Uploading…' : '+ Upload Photo'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      {err && <p className="text-xs text-red-400 mt-2 col-span-full">{err}</p>}
    </div>
  );
}

function SectionCard({
  title,
  children,
  onReset,
  toggle,
}: {
  title: string;
  children: ReactNode;
  onReset?: () => void;
  toggle?: { checked: boolean; onChange: (v: boolean) => void };
}) {
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-amber-300">{title}</h2>
          {toggle && <Toggle checked={toggle.checked} onChange={toggle.onChange} />}
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Reset section
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/* ─── Section panels ─── */

function CoupleDatePanel() {
  const { content, update } = useContent();
  const set = (patch: Partial<WeddingContent>) => update(patch);
  return (
    <SectionCard
      title="Couple & Wedding Date"
      onReset={() =>
        set({
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
        })
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <TextField label="Groom Name" value={content.groomName} onChange={(v) => set({ groomName: v })} />
        <TextField label="Bride Name" value={content.brideName} onChange={(v) => set({ brideName: v })} />
        <TextField label="Display Date" value={content.weddingDate} onChange={(v) => set({ weddingDate: v })} />
        <TextField label="Venue Name" value={content.venueName} onChange={(v) => set({ venueName: v })} />
        <TextField label="City / Location" value={content.venueCity} onChange={(v) => set({ venueCity: v })} />
        <TextField label="Hero Pre-line" value={content.heroPreLine} onChange={(v) => set({ heroPreLine: v })} />
        <TextField label="Hero Request Line" value={content.heroRequestLine} onChange={(v) => set({ heroRequestLine: v })} />
        <TextField label="Invitation Body" value={content.invitationBody} onChange={(v) => set({ invitationBody: v })} />
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Names &amp; date update the Hero, Save-the-Date, Footer, Monogram and Invitation automatically.
      </p>
    </SectionCard>
  );
}

function ImagesPanel() {
  return (
    <SectionCard title="Images">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <ImageField label="Hero Background" imgKey="heroBg" />
        <ImageField label="Bride Portrait" imgKey="bride" />
        <ImageField label="Couple Photo" imgKey="couple" />
        <ImageField label="Cultural / Thali" imgKey="thali" />
      </div>
    </SectionCard>
  );
}

function MapPanel() {
  const { content, update } = useContent();
  const set = (patch: Partial<WeddingContent>) => update(patch);
  return (
    <SectionCard
      title="Venue Map Location"
      toggle={{ checked: content.sections.map, onChange: (v) => set({ sections: { ...content.sections, map: v } }) }}
      onReset={() =>
        set({
          mapHeading: 'Wedding Venue',
          mapSub: 'Where two hearts become one',
          mapAddress: 'The Grand Palace, Jaipur, Rajasthan, India',
          mapEmbedUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.5!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1',
        })
      }
    >
      <TextField label="Heading" value={content.mapHeading} onChange={(v) => set({ mapHeading: v })} />
      <TextField label="Subtitle" value={content.mapSub} onChange={(v) => set({ mapSub: v })} />
      <TextField label="Venue Address" value={content.mapAddress} onChange={(v) => set({ mapAddress: v })} />
      <TextField
        label="Google Maps Embed URL"
        value={content.mapEmbedUrl}
        onChange={(v) => set({ mapEmbedUrl: v })}
        textarea
      />
      <p className="text-xs text-slate-500">
        Paste a Maps embed URL (Maps → Share → Embed a map → copy the src).
      </p>
    </SectionCard>
  );
}

function StoryPanel() {
  const { content, update } = useContent();
  const set = (patch: Partial<WeddingContent>) => update(patch);

  const setParagraph = (i: number, text: string) => {
    set({ storyParagraphs: content.storyParagraphs.map((p, idx) => (idx === i ? text : p)) });
  };
  const add = () => set({ storyParagraphs: [...content.storyParagraphs, 'New paragraph…'] });
  const remove = (i: number) =>
    set({ storyParagraphs: content.storyParagraphs.filter((_, idx) => idx !== i) });

  return (
    <SectionCard
      title="Our Story"
      toggle={{ checked: content.sections.story, onChange: (v) => set({ sections: { ...content.sections, story: v } }) }}
      onReset={() =>
        set({
          storyHeading: 'Our Story',
          storyParagraphs: [
            "It all began with a chance encounter at a friend's gathering in Mumbai. Vikram's warm smile and Kavya's infectious laughter sparked a connection that neither could ignore.",
            'Through shared dreams, countless conversations, and adventures across India, their bond grew deeper with every passing day. From the ghats of Varanasi to the backwaters of Kerala, their love story unfolded like a beautiful melody.',
            'Now, surrounded by the blessings of their families and the warmth of their loved ones, Vikram and Kavya embark on the most beautiful journey of all — a lifetime together.',
          ],
        })
      }
    >
      <TextField label="Heading" value={content.storyHeading} onChange={(v) => set({ storyHeading: v })} />
      {content.storyParagraphs.map((p, i) => (
        <div key={i} className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500">Paragraph {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300">
              Remove
            </button>
          </div>
          <textarea
            className={`${inputCls} resize-none`}
            rows={3}
            value={p}
            onChange={(e) => setParagraph(i, e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-sm font-medium transition"
      >
        + Add Paragraph
      </button>
    </SectionCard>
  );
}

function MemoriesPanel() {
  const { content, update } = useContent();
  const set = (patch: Partial<WeddingContent>) => update(patch);
  return (
    <SectionCard
      title="Memories Gallery"
      toggle={{ checked: content.sections.memories, onChange: (v) => set({ sections: { ...content.sections, memories: v } }) }}
      onReset={() =>
        set({
          galleryHeading: 'Memories',
          gallery: [
            { src: '/images/gallery-1.jpg', alt: 'Mehndi' },
            { src: '/images/gallery-2.jpg', alt: 'Mandap' },
            { src: '/images/gallery-3.jpg', alt: 'Celebration' },
            { src: '/images/gallery-4.jpg', alt: 'Ceremony' },
            { src: '/images/gallery-5.jpg', alt: 'Jewelry' },
            { src: '/images/gallery-6.jpg', alt: 'Decorations' },
          ],
        })
      }
    >
      <TextField label="Heading" value={content.galleryHeading} onChange={(v) => set({ galleryHeading: v })} />
      <p className="text-xs text-slate-500 mb-3">Upload photos (stored as base64).</p>
      <GalleryManager />
    </SectionCard>
  );
}

function EventsPanel() {
  const { content, update } = useContent();
  const setEvents = (events: WeddingContent['events']) => update({ events });

  const change = (i: number, patch: Partial<WeddingContent['events'][number]>) => {
    const next = content.events.map((e, idx) => (idx === i ? { ...e, ...patch } : e));
    setEvents(next);
  };
  const add = () =>
    setEvents([
      ...content.events,
      { day: 'Day', date: '', title: 'New Event', time: '', description: '' },
    ]);
  const remove = (i: number) => setEvents(content.events.filter((_, idx) => idx !== i));

  return (
    <SectionCard
      title="Events / Schedule"
      toggle={{ checked: content.sections.events, onChange: (v) => update({ sections: { ...content.sections, events: v } }) }}
      onReset={() =>
        setEvents([
          { day: 'Day 1', date: 'February 12, 2027', title: 'Mehndi & Sangeet', time: '4:00 PM Onwards', description: "An evening of henna artistry, music, and dance celebrating the joy of togetherness." },
          { day: 'Day 2', date: 'February 13, 2027', title: 'Haldi & Baraat', time: '10:00 AM Onwards', description: "Sacred turmeric ceremony followed by the groom's grand procession with music and celebration." },
          { day: 'Day 3', date: 'February 14, 2027', title: 'Wedding & Reception', time: '4:30 PM Onwards', description: 'The sacred wedding ceremony under the mandap, followed by a grand celebration of love.' },
        ])
      }
    >
      {content.events.map((ev, i) => (
        <div key={i} className="border border-slate-700 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-amber-400">Event {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300">
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <TextField label="Day" value={ev.day} onChange={(v) => change(i, { day: v })} />
            <TextField label="Date" value={ev.date} onChange={(v) => change(i, { date: v })} />
            <TextField label="Title" value={ev.title} onChange={(v) => change(i, { title: v })} />
            <TextField label="Time" value={ev.time} onChange={(v) => change(i, { time: v })} />
          </div>
          <TextField label="Description" value={ev.description} onChange={(v) => change(i, { description: v })} textarea />
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-sm font-medium transition"
      >
        + Add Event
      </button>
    </SectionCard>
  );
}

function TravelPanel() {
  const { content, update } = useContent();
  const set = (patch: Partial<WeddingContent>) => update(patch);

  const changeTravel = (i: number, patch: Partial<WeddingContent['travelInfo'][number]>) => {
    set({ travelInfo: content.travelInfo.map((t, idx) => (idx === i ? { ...t, ...patch } : t)) });
  };
  const changeHotel = (i: number, patch: Partial<WeddingContent['hotels'][number]>) => {
    set({ hotels: content.hotels.map((h, idx) => (idx === i ? { ...h, ...patch } : h)) });
  };

  return (
    <SectionCard
      title="Venue, Travel & Accommodation"
      toggle={{ checked: content.sections.travel, onChange: (v) => set({ sections: { ...content.sections, travel: v } }) }}
      onReset={() =>
        set({
          travelHeading: 'Travel & Accommodation',
          travelSub: 'Everything you need for a comfortable journey',
          travelInfo: [
            { icon: 'airplane', title: 'Nearest Airport', details: 'Jaipur International Airport (JAI)', sub: '~25 km from the venue • 40 min drive', enabled: true },
            { icon: 'train', title: 'Railway Station', details: 'Jaipur Junction (JP)', sub: '~12 km from the venue • 25 min drive', enabled: true },
            { icon: 'cab', title: 'Cab Services', details: 'Ola & Uber available citywide', sub: 'Pre-book for airport/station pickups', enabled: true },
            { icon: 'shuttle', title: 'Shuttle Service', details: 'Complimentary guest shuttles provided', sub: 'Routes from major hotels to venue', enabled: true },
          ],
          hotelsHeading: 'Hotel Recommendations',
          hotels: [
            { tier: 'Luxury', icon: 'luxury', names: 'Rambagh Palace, Taj Jai Mahal Palace', note: 'Heritage luxury experience', enabled: true },
            { tier: 'Mid-Range', icon: 'hotel', names: 'ITC Rajputana, Holiday Inn Jaipur', note: 'Comfortable & convenient', enabled: true },
            { tier: 'Budget', icon: 'budget', names: 'Zostel Jaipur, Hotel Pearl Palace', note: 'Affordable & well-rated', enabled: true },
          ],
        })
      }
    >
      <TextField label="Section Heading" value={content.travelHeading} onChange={(v) => set({ travelHeading: v })} />
      <TextField label="Subtitle" value={content.travelSub} onChange={(v) => set({ travelSub: v })} />
      <p className="text-xs text-slate-500 mb-3">Travel Info — toggle each box on/off</p>
      {content.travelInfo.map((t, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-x-4 mb-3 items-end">
          <TextField label="Title" value={t.title} onChange={(v) => changeTravel(i, { title: v })} />
          <TextField label="Details" value={t.details} onChange={(v) => changeTravel(i, { details: v })} />
          <TextField label="Sub" value={t.sub} onChange={(v) => changeTravel(i, { sub: v })} />
          <div className="pb-4">
            <Toggle checked={t.enabled} onChange={(v) => changeTravel(i, { enabled: v })} label="Show" />
          </div>
        </div>
      ))}
      <p className="text-xs text-slate-500 mt-4 mb-3">Hotels — toggle each box on/off</p>
      <TextField label="Hotels Heading" value={content.hotelsHeading} onChange={(v) => set({ hotelsHeading: v })} />
      {content.hotels.map((h, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-x-4 mb-3 items-end">
          <TextField label="Tier" value={h.tier} onChange={(v) => changeHotel(i, { tier: v })} />
          <TextField label="Names" value={h.names} onChange={(v) => changeHotel(i, { names: v })} />
          <TextField label="Note" value={h.note} onChange={(v) => changeHotel(i, { note: v })} />
          <div className="pb-4">
            <Toggle checked={h.enabled} onChange={(v) => changeHotel(i, { enabled: v })} label="Show" />
          </div>
        </div>
      ))}
    </SectionCard>
  );
}

function SectionsPanel() {
  const { content, update } = useContent();
  return (
    <SectionCard title="Section Visibility">
      <p className="text-xs text-slate-500 mb-4">Toggle any section on or off across the website.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {ALL_SECTIONS.map((s) => (
          <div key={s.key} className="flex items-center justify-between border border-slate-700 rounded-lg px-3 py-2">
            <span className="text-sm text-slate-200">{s.label}</span>
            <Toggle
              checked={content.sections[s.key]}
              onChange={(v) => update({ sections: { ...content.sections, [s.key]: v } })}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ─── Sidebar + layout ─── */

function BlessingsPanel() {
  const { content, removeBlessing } = useContent();
  return (
    <SectionCard title="Blessings from Guests">
      <p className="text-xs text-slate-500 mb-4">
        Blessings submitted via “Send Your Love” on the site. Delete any you don’t want shown. Remember to press Save to persist changes.
      </p>
      {content.blessings.length === 0 ? (
        <p className="text-sm text-slate-400">No blessings yet.</p>
      ) : (
        <div className="space-y-3">
          {content.blessings.map((b) => (
            <div key={b.id} className="flex items-start gap-3 border border-slate-700 rounded-lg p-3">
              <div className="flex-1 min-w-0">
                <p className="font-cinzel text-amber-300 text-sm">{b.name}</p>
                <p className="font-playfair text-slate-200 text-sm italic mt-1 break-words">“{b.message}”</p>
              </div>
              <button
                type="button"
                onClick={() => removeBlessing(b.id)}
                className="text-xs text-red-400 hover:text-red-300 whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

type Tab = 'couple' | 'images' | 'map' | 'story' | 'memories' | 'events' | 'travel' | 'blessings' | 'social' | 'sections';

function SocialMediaPanel() {
  const { content, update } = useContent();
  const set = (patch: Partial<WeddingContent>) => update(patch);
  return (
    <SectionCard
      title="Footer Social Media"
      onReset={() => set({ socialMedia: { id: '', no: '', email: '' } })}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <TextField
          label="Instagram ID"
          value={content.socialMedia.instagram}
          onChange={(v) => set({ socialMedia: { ...content.socialMedia, instagram: v } })}
        />
        <TextField
          label="WhatsApp No."
          value={content.socialMedia.whatsapp}
          onChange={(v) => set({ socialMedia: { ...content.socialMedia, whatsapp: v } })}
        />
        <TextField
          label="Email"
          value={content.socialMedia.email}
          onChange={(v) => set({ socialMedia: { ...content.socialMedia, email: v } })}
        />
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Instagram handle, WhatsApp number and email used in the footer social links.
      </p>
    </SectionCard>
  );
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'couple', label: 'Couple & Date' },
  { id: 'images', label: 'Images' },
  { id: 'map', label: 'Venue Map' },
  { id: 'story', label: 'Our Story' },
  { id: 'memories', label: 'Memories' },
  { id: 'events', label: 'Events' },
  { id: 'travel', label: 'Travel & Hotels' },
  { id: 'blessings', label: 'Blessings' },
  { id: 'social', label: 'Social Media' },
  { id: 'sections', label: 'Sections On/Off' },
];

export function AdminApp() {
  const { authenticated, login, logout } = useAuth();
  const { content, dirty, reset, save, removeBlessing } = useContent();
  const [tab, setTab] = useState<Tab>('couple');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ kind: 'ok' | 'error'; msg: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    const result = await save();
    setSaving(false);
    setToast(
      result === 'ok'
        ? { kind: 'ok', msg: 'Saved successfully ✓' }
        : { kind: 'error', msg: 'Save failed — check Supabase connection' },
    );
    window.setTimeout(() => setToast(null), 3000);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!login(pw)) setErr(true);
          }}
          className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-xl p-8"
        >
          <h1 className="text-xl font-semibold text-amber-300 mb-1 text-center">Wedding Admin</h1>
          <p className="text-sm text-slate-400 text-center mb-6">Enter your password to continue</p>
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setErr(false);
            }}
            placeholder="Password"
            className={`${inputCls} mb-3`}
          />
          {err && <p className="text-red-400 text-sm mb-3">Incorrect password.</p>}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold transition"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── Mobile top bar (sm:hidden) ── */}
      <header className="sm:hidden sticky top-0 z-20 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="min-w-0">
            <h1 className="text-amber-300 font-semibold text-sm leading-tight">Wedding Admin</h1>
            <p className="text-[11px] text-slate-500 truncate">
              {content.groomName} &amp; {content.brideName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1.5 rounded-lg hover:bg-slate-800"
            >
              View ↗
            </a>
            <button
              onClick={logout}
              className="text-[11px] text-slate-400 hover:text-red-400 px-2 py-1.5 rounded-lg hover:bg-slate-800"
            >
              Exit
            </button>
          </div>
        </div>
        {/* Horizontal scrolling tab bar */}
        <nav className="flex gap-2 overflow-x-auto px-3 pb-2 -mx-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition ${
                tab === t.id
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Desktop layout (sm+) ── */}
      <div className="flex">
        <aside className="hidden sm:flex w-60 bg-slate-900 border-r border-slate-800 flex-col fixed inset-y-0">
          <div className="p-5 border-b border-slate-800">
            <h1 className="text-amber-300 font-semibold">Wedding Admin</h1>
            <p className="text-xs text-slate-500 mt-1 truncate">
              {content.groomName} &amp; {content.brideName}
            </p>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  tab === t.id ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-slate-800 space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="block text-center text-xs text-slate-400 hover:text-slate-200 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              View Site ↗
            </a>
            <button
              onClick={logout}
              className="w-full text-xs text-slate-400 hover:text-red-400 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 sm:ml-60 p-4 sm:p-6 lg:p-10">
          <div className="max-w-3xl mx-auto">
            {!isSupabaseConfigured() && (
              <div className="mb-5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
                Supabase is not configured. Add <code className="font-mono">VITE_PUBLIC_SUPABASE_URL</code> and{' '}
                <code className="font-mono">VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to your <code className="font-mono">.env</code>.
                Changes are shown here but won't be saved until Supabase is connected.
              </div>
            )}
            <div className="flex items-center justify-between mb-5 sm:mb-6 gap-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 truncate">
                {TABS.find((t) => t.id === tab)?.label}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving || !dirty}
                  className={`text-sm sm:text-base px-6 py-3 rounded-xl font-bold shadow-lg transition whitespace-nowrap ${
                    dirty
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-amber-500/30'
                      : 'bg-slate-700 text-slate-400 cursor-default shadow-none'
                  }`}
                >
                  {saving ? 'Saving…' : dirty ? '💾 Save Changes' : '✓ Saved'}
                </button>
                <button
                  onClick={() => {
                    if (confirm('Reset ALL content to defaults? This cannot be undone.')) reset();
                  }}
                  className="text-xs px-3 py-2 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-300 transition whitespace-nowrap"
                >
                  Reset All
                </button>
              </div>
            </div>

            {tab === 'couple' && <CoupleDatePanel />}
            {tab === 'images' && <ImagesPanel />}
            {tab === 'map' && <MapPanel />}
            {tab === 'story' && <StoryPanel />}
            {tab === 'memories' && <MemoriesPanel />}
            {tab === 'events' && <EventsPanel />}
            {tab === 'travel' && <TravelPanel />}
            {tab === 'blessings' && <BlessingsPanel />}
            {tab === 'social' && <SocialMediaPanel />}
            {tab === 'sections' && <SectionsPanel />}

            <p className="text-xs text-slate-600 mt-4 text-center">
              Edit any section, then press <span className="text-slate-400">Save</span> to store changes in Supabase.
            </p>
          </div>

          {/* Toast */}
          {toast && (
            <div
              className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition ${
                toast.kind === 'ok'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
            >
              {toast.msg}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
