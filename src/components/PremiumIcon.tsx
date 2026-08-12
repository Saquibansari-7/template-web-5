import { JSX } from "react";

interface Props {
  name: string;
  size?: number;
  className?: string;
}

const gold1 = '#D4A017';
const gold2 = '#F2C94C';
const wine = '#8B0000';

/* Elegant thin-stroke SVG icons in the gold/wine palette */
export default function PremiumIcon({ name, size = 40, className = '' }: Props) {
  const s = size;
  const common = { width: s, height: s, viewBox: '0 0 48 48', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className };

  const icons: Record<string, JSX.Element> = {
    venue: (
      <svg {...common} viewBox="0 0 48 48" role="img" aria-label="Wedding Venue">
        <defs>
          <linearGradient id="gv" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gold2} />
            <stop offset="100%" stopColor={gold1} />
          </linearGradient>
        </defs>

        {/* Outer Elegant Arch */}
        <path d="M12 42V20a12 12 0 0 1 24 0v22" stroke="url(#gv)" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Inner Parallel Arch for Depth */}
        <path d="M16 42V20a8 8 0 0 1 16 0v22" stroke="url(#gv)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />

        {/* Stylized Botanical/Floral Crest at the Top Center */}
        <path d="M24 5c1 2.5 3 3.5 5 3.5-2 0-4 .5-5 2.5-.1-2-2-2.5-4-2.5 2 0 3.5-1 4-3.5z" fill="url(#gv)" />
        <circle cx="24" cy="11" r="1.5" fill="url(#gv)" />

        {/* Hanging Romantic Chandelier/Geometric Pendant */}
        <line x1="24" y1="12" x2="24" y2="17" stroke="url(#gv)" strokeWidth="1.2" />
        <polygon points="24,17 21,21 24,25 27,21" stroke="url(#gv)" strokeWidth="1" fill="none" />
        <circle cx="24" cy="21" r="1" fill="url(#gv)" />

        {/* Clean Ground Base Line */}
        <line x1="6" y1="42" x2="42" y2="42" stroke="url(#gv)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),


    /* ── Airplane ── */
    airplane: (
      <svg {...common} viewBox="0 0 48 48" role="img" aria-label="Airplane">
        <defs>
          <linearGradient id="ga" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gold2} />
            <stop offset="100%" stopColor={gold1} />
          </linearGradient>
        </defs>
        <path
          d="M24 4 
         L21 15 
         H6 
         L4 19 
         L21 25 
         V37 
         L16 41 
         V44 
         L24 41 
         L32 44 
         V41 
         L27 37 
         V25 
         L44 19 
         L42 15 
         H27 
         L24 4 Z"
          stroke="url(#ga)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),

    /* ── Train ── */
    train: (
      <svg {...common}>
        <defs><linearGradient id="gt" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <rect x="12" y="8" width="24" height="28" rx="4" stroke="url(#gt)" strokeWidth="1.5" />
        <line x1="12" y1="20" x2="36" y2="20" stroke="url(#gt)" strokeWidth="1.2" />
        <line x1="12" y1="28" x2="36" y2="28" stroke="url(#gt)" strokeWidth="1.2" />
        <circle cx="18" cy="32" r="2" stroke="url(#gt)" strokeWidth="1.2" />
        <circle cx="30" cy="32" r="2" stroke="url(#gt)" strokeWidth="1.2" />
        <rect x="18" y="12" width="12" height="6" rx="1" stroke="url(#gt)" strokeWidth="1" />
        <line x1="16" y1="36" x2="12" y2="42" stroke="url(#gt)" strokeWidth="1.4" />
        <line x1="32" y1="36" x2="36" y2="42" stroke="url(#gt)" strokeWidth="1.4" />
        <line x1="10" y1="42" x2="38" y2="42" stroke="url(#gt)" strokeWidth="1.4" />
      </svg>
    ),

    /* ── Cab / Car ── */
    cab: (
      <svg {...common}>
        <defs><linearGradient id="gc" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <path d="M10 30V22a2 2 0 012-2h2l3-6h14l3 6h2a2 2 0 012 2v8" stroke="url(#gc)" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="8" y="30" width="32" height="6" rx="2" stroke="url(#gc)" strokeWidth="1.5" />
        <circle cx="15" cy="36" r="3" stroke="url(#gc)" strokeWidth="1.4" fill="none" />
        <circle cx="33" cy="36" r="3" stroke="url(#gc)" strokeWidth="1.4" fill="none" />
        <line x1="20" y1="14" x2="18" y2="20" stroke="url(#gc)" strokeWidth="1" />
        <line x1="28" y1="14" x2="30" y2="20" stroke="url(#gc)" strokeWidth="1" />
      </svg>
    ),

    /* ── Shuttle / Bus ── */
    shuttle: (
      <svg {...common}>
        <defs><linearGradient id="gs" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <rect x="6" y="12" width="36" height="22" rx="3" stroke="url(#gs)" strokeWidth="1.5" />
        <line x1="6" y1="26" x2="42" y2="26" stroke="url(#gs)" strokeWidth="1.2" />
        <rect x="10" y="16" width="8" height="8" rx="1" stroke="url(#gs)" strokeWidth="1" />
        <rect x="20" y="16" width="8" height="8" rx="1" stroke="url(#gs)" strokeWidth="1" />
        <rect x="30" y="16" width="8" height="8" rx="1" stroke="url(#gs)" strokeWidth="1" />
        <circle cx="14" cy="34" r="3" stroke="url(#gs)" strokeWidth="1.4" />
        <circle cx="34" cy="34" r="3" stroke="url(#gs)" strokeWidth="1.4" />
        <line x1="17" y1="34" x2="31" y2="34" stroke="url(#gs)" strokeWidth="1" />
      </svg>
    ),

    /* ── Luxury Star ── */
    luxury: (
      <svg {...common}>
        <defs><linearGradient id="gl" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <path d="M24 4l4.5 13.8H43l-11.7 8.5 4.5 13.8L24 31.6 12.3 40.1l4.5-13.8L5 17.8h14.5z" stroke="url(#gl)" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <circle cx="24" cy="22" r="4" stroke="url(#gl)" strokeWidth="1" />
      </svg>
    ),

    /* ── Hotel ── */
    hotel: (
      <svg {...common}>
        <defs><linearGradient id="gh" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <rect x="8" y="14" width="32" height="28" rx="2" stroke="url(#gh)" strokeWidth="1.5" />
        <path d="M8 14l16-8 16 8" stroke="url(#gh)" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="14" y="20" width="5" height="5" rx="0.5" stroke="url(#gh)" strokeWidth="1" />
        <rect x="21.5" y="20" width="5" height="5" rx="0.5" stroke="url(#gh)" strokeWidth="1" />
        <rect x="29" y="20" width="5" height="5" rx="0.5" stroke="url(#gh)" strokeWidth="1" />
        <rect x="14" y="29" width="5" height="5" rx="0.5" stroke="url(#gh)" strokeWidth="1" />
        <rect x="29" y="29" width="5" height="5" rx="0.5" stroke="url(#gh)" strokeWidth="1" />
        <rect x="20" y="34" width="8" height="8" rx="4" stroke="url(#gh)" strokeWidth="1.2" />
      </svg>
    ),

    /* ── Budget / Simple Stay ── */
    budget: (
      <svg {...common}>
        <defs><linearGradient id="gb" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <path d="M6 24L24 8l18 16" stroke="url(#gb)" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="12" y="24" width="24" height="18" rx="1" stroke="url(#gb)" strokeWidth="1.5" />
        <rect x="20" y="30" width="8" height="12" rx="1" stroke="url(#gb)" strokeWidth="1.2" />
        <circle cx="26" cy="36" r="0.8" fill={gold1} />
      </svg>
    ),

    /* ── Weather / Layers ── */
    weather: (
      <svg {...common}>
        <defs><linearGradient id="gw" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <circle cx="24" cy="18" r="7" stroke="url(#gw)" strokeWidth="1.4" />
        <line x1="24" y1="6" x2="24" y2="9" stroke="url(#gw)" strokeWidth="1.2" />
        <line x1="24" y1="27" x2="24" y2="30" stroke="url(#gw)" strokeWidth="1.2" />
        <line x1="13" y1="18" x2="10" y2="18" stroke="url(#gw)" strokeWidth="1.2" />
        <line x1="38" y1="18" x2="35" y2="18" stroke="url(#gw)" strokeWidth="1.2" />
        <line x1="16" y1="10" x2="14" y2="8" stroke="url(#gw)" strokeWidth="1.2" />
        <line x1="34" y1="28" x2="32" y2="26" stroke="url(#gw)" strokeWidth="1.2" />
        <line x1="34" y1="10" x2="32" y2="12" stroke="url(#gw)" strokeWidth="1.2" />
        <path d="M10 36c0-3 3-5 6-5 1-3 4-5 8-5s7 2 8 5c3 0 6 2 6 5H10z" stroke="url(#gw)" strokeWidth="1.2" fill="none" />
      </svg>
    ),

    /* ── Rupee / Currency ── */
    rupee: (
      <svg {...common}>
        <defs><linearGradient id="gr" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <circle cx="24" cy="24" r="18" stroke="url(#gr)" strokeWidth="1.4" />
        <line x1="16" y1="14" x2="32" y2="14" stroke="url(#gr)" strokeWidth="1.6" />
        <line x1="16" y1="20" x2="32" y2="20" stroke="url(#gr)" strokeWidth="1.6" />
        <path d="M16 14c0 0 2 12 12 12" stroke="url(#gr)" strokeWidth="1.5" fill="none" />
        <line x1="18" y1="26" x2="28" y2="38" stroke="url(#gr)" strokeWidth="1.6" />
      </svg>
    ),

    /* ── Fort / Monument ── */
    monument: (
      <svg {...common}>
        <defs><linearGradient id="gm" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <path d="M8 40V20l4-4V10h4v4l8-8 8 8v-4h4v6l4 4v20" stroke="url(#gm)" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M18 40V30a6 6 0 0112 0v10" stroke="url(#gm)" strokeWidth="1.3" fill="none" />
        <line x1="8" y1="40" x2="40" y2="40" stroke="url(#gm)" strokeWidth="1.5" />
        <rect x="10" y="22" width="4" height="5" rx="2" stroke="url(#gm)" strokeWidth="1" />
        <rect x="34" y="22" width="4" height="5" rx="2" stroke="url(#gm)" strokeWidth="1" />
      </svg>
    ),

    /* ── Chai / Tea cup ── */
    chai: (
      <svg {...common}>
        <defs><linearGradient id="gch" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <path d="M10 20h24v14a8 8 0 01-8 8h-8a8 8 0 01-8-8V20z" stroke="url(#gch)" strokeWidth="1.5" fill="none" />
        <path d="M34 24h4a4 4 0 010 8h-4" stroke="url(#gch)" strokeWidth="1.3" fill="none" />
        <path d="M18 8c0 4 4 4 4 8" stroke="url(#gch)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M24 6c0 4 4 4 4 8" stroke="url(#gch)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <line x1="8" y1="44" x2="36" y2="44" stroke="url(#gch)" strokeWidth="1.3" />
      </svg>
    ),

    /* ── Namaste / Prayer Hands ── */
    namaste: (
      <svg {...common} viewBox="0 0 48 48" role="img" aria-label="Namaste / Prayer Hands">
        <defs>
          <linearGradient id="gn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gold2} />
            <stop offset="100%" stopColor={gold1} />
          </linearGradient>
        </defs>

        {/* Left Hand Silhouette */}
        <path
          d="M24 6 
         C23 10, 20 16, 15 22 
         C12 26, 12 30, 14 36 
         L17 42 
         H24"
          stroke="url(#gn)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Right Hand Silhouette (Perfect Mirror) */}
        <path
          d="M24 6 
         C25 10, 28 16, 33 22 
         C36 26, 36 30, 34 36 
         L31 42 
         H24"
          stroke="url(#gn)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Center Palms Pressed Line & Finger Details */}
        <line x1="24" y1="6" x2="24" y2="38" stroke="url(#gn)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Elegant Thumbs Detail */}
        <path d="M19 32c2-1 4-1 5 1" stroke="url(#gn)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M29 32c-2-1-4-1-5 1" stroke="url(#gn)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Delicate Spiritual Radiance / Light Rays around the hands */}
        <line x1="11" y1="14" x2="8" y2="12" stroke="url(#gn)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <line x1="37" y1="14" x2="40" y2="12" stroke="url(#gn)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <line x1="9" y1="22" x2="5" y2="22" stroke="url(#gn)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <line x1="39" y1="22" x2="43" y2="22" stroke="url(#gn)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),

    /* ── Dress / Saree drape ── */
    dress: (
      <svg {...common}>
        <defs><linearGradient id="gd" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <path d="M18 6h12l2 8h-16l2-8z" stroke="url(#gd)" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M14 14c-2 6-4 16-2 28h24c2-12 0-22-2-28" stroke="url(#gd)" strokeWidth="1.4" fill="none" />
        <path d="M18 14c4 8 8 8 12 0" stroke="url(#gd)" strokeWidth="1" fill="none" />
        <path d="M16 24c4 4 12 4 16 0" stroke="url(#gd)" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M14 34c5 3 15 3 20 0" stroke="url(#gd)" strokeWidth="1" fill="none" opacity="0.4" />
      </svg>
    ),

    /* ── Child / Family ── */
    child: (
      <svg {...common}>
        <defs><linearGradient id="gkid" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <circle cx="24" cy="10" r="5" stroke="url(#gkid)" strokeWidth="1.4" />
        <path d="M16 42V28a8 8 0 0116 0v14" stroke="url(#gkid)" strokeWidth="1.4" fill="none" />
        <line x1="10" y1="30" x2="16" y2="26" stroke="url(#gkid)" strokeWidth="1.3" />
        <line x1="38" y1="30" x2="32" y2="26" stroke="url(#gkid)" strokeWidth="1.3" />
        <circle cx="12" cy="8" r="3" stroke="url(#gkid)" strokeWidth="1" opacity="0.5" />
        <path d="M8 24v-6a4 4 0 018 0" stroke="url(#gkid)" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
    ),

    /* ── Camera / Photography ── */
    camera: (
      <svg {...common}>
        <defs><linearGradient id="gcam" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <rect x="6" y="16" width="36" height="24" rx="3" stroke="url(#gcam)" strokeWidth="1.5" />
        <path d="M18 16l2-6h8l2 6" stroke="url(#gcam)" strokeWidth="1.3" strokeLinejoin="round" />
        <circle cx="24" cy="28" r="7" stroke="url(#gcam)" strokeWidth="1.4" />
        <circle cx="24" cy="28" r="3.5" stroke="url(#gcam)" strokeWidth="1" />
        <circle cx="36" cy="21" r="1.5" fill={gold1} />
      </svg>
    ),

    /* ── Thali / Food plate ── */
    thali: (
      <svg {...common}>
        <defs><linearGradient id="gf" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <ellipse cx="24" cy="28" rx="18" ry="10" stroke="url(#gf)" strokeWidth="1.5" fill="none" />
        <ellipse cx="24" cy="28" rx="14" ry="7" stroke="url(#gf)" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="16" cy="26" r="3" stroke="url(#gf)" strokeWidth="1" />
        <circle cx="32" cy="26" r="3" stroke="url(#gf)" strokeWidth="1" />
        <circle cx="24" cy="22" r="2.5" stroke="url(#gf)" strokeWidth="1" />
        <circle cx="24" cy="32" r="2.5" stroke="url(#gf)" strokeWidth="1" />
        <path d="M22 8c0 3 2 4 2 7" stroke="url(#gf)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <path d="M26 6c0 3 2 4 2 7" stroke="url(#gf)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),

    /* ── Parking / Car ── */
    parking: (
      <svg {...common}>
        <defs><linearGradient id="gp" x1="0" y1="0" x2="48" y2="48"><stop stopColor={gold2} /><stop offset="1" stopColor={gold1} /></linearGradient></defs>
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="url(#gp)" strokeWidth="1.5" />
        <path d="M18 36V14h8a7 7 0 010 14h-8" stroke="url(#gp)" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      </svg>
    ),

    /* ── Om / Sacred ── */
    om: (
      <svg {...common} viewBox="0 0 48 48" role="img" aria-label="Om / Sacred">
        <defs>
          <linearGradient id="go" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gold2} />
            <stop offset="100%" stopColor={gold1} />
          </linearGradient>
        </defs>

        {/* Optional background sacred circle (Cleaned up opacity and stroke) */}
        <circle cx="24" cy="24" r="21" stroke="url(#go)" strokeWidth="1" fill="none" opacity="0.25" />

        {/* The Main Left Curves (3-shape) and Upper Loop */}
        <path
          d="M23 15
         C20 11, 13 12, 13 17
         C13 22, 21 21, 21 25
         C21 30, 12 31, 13 36
         C14 40, 21 40, 23 37"
          stroke="url(#go)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* The Right Side S-Curve Tail */}
        <path
          d="M20 23
         C25 23, 33 21, 35 26
         C37 31, 32 37, 26 39"
          stroke="url(#go)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* The Top Right Banner/Wing Stroke */}
        <path
          d="M23 25
         C28 25, 34 23, 37 16"
          stroke="url(#go)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* The Chandrabindu (Crescent and Bindu Dot at the top) */}
        <path
          d="M26 11
         C29 11, 32 13, 34 16"
          stroke="url(#go)"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="30" cy="7" r="1.5" fill="url(#go)" />
      </svg>
    ),
  };

  return icons[name] || <span style={{ width: s, height: s, display: 'inline-block' }} />;
}
