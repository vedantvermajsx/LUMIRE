import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import useBreakpoint from '../hooks/useBreakpoint';

// ─── Category icons ───────────────────────────────────────────────────────────
const ICONS = {
  diamond: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="24,3 43,14 43,34 24,45 5,34 5,14"/><polygon points="24,11 35,17 35,31 24,37 13,31 13,17"/><line x1="24" y1="3" x2="24" y2="11"/><line x1="43" y1="14" x2="35" y2="17"/><line x1="43" y1="34" x2="35" y2="31"/><line x1="24" y1="45" x2="24" y2="37"/><line x1="5" y1="34" x2="13" y2="31"/><line x1="5" y1="14" x2="13" y2="17"/></svg>,
  ring:    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="24" cy="29" r="14"/><circle cx="24" cy="29" r="7"/><path d="M19 15 C19 10 29 10 29 15"/><circle cx="24" cy="12" r="3"/></svg>,
  necklace:<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><path d="M8 8 Q24 22 40 8"/><path d="M8 8 Q5 24 14 34"/><path d="M40 8 Q43 24 34 34"/><path d="M14 34 Q24 40 34 34"/><circle cx="24" cy="39" r="5"/></svg>,
  bracelet:<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><ellipse cx="24" cy="24" rx="19" ry="11"/><ellipse cx="24" cy="24" rx="12" ry="6"/><circle cx="24" cy="13" r="2.5"/><circle cx="43" cy="24" r="2.5"/><circle cx="24" cy="35" r="2.5"/><circle cx="5" cy="24" r="2.5"/></svg>,
  crown:   <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 38 L6 22 L15 30 L24 10 L33 30 L42 22 L42 38 Z"/><line x1="6" y1="38" x2="42" y2="38"/><circle cx="24" cy="10" r="2.5"/><circle cx="6" cy="22" r="2.5"/><circle cx="42" cy="22" r="2.5"/></svg>,
  sun:     <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="24" cy="24" r="9"/><line x1="24" y1="4" x2="24" y2="11"/><line x1="24" y1="37" x2="24" y2="44"/><line x1="4" y1="24" x2="11" y2="24"/><line x1="37" y1="24" x2="44" y2="24"/><line x1="9" y1="9" x2="14" y2="14"/><line x1="34" y1="34" x2="39" y2="39"/><line x1="39" y1="9" x2="34" y2="14"/><line x1="14" y1="34" x2="9" y2="39"/></svg>,
};

const CAT_ICON = { Rings:'ring', Necklaces:'necklace', Bracelets:'bracelet', Earrings:'crown', Sets:'diamond', Pendants:'sun' };

const BADGE_CLR = {
  Heritage:   { bg:'rgba(212,175,55,0.1)',   text:'#D4AF37', border:'rgba(212,175,55,0.25)'  },
  Exclusive:  { bg:'rgba(241,196,15,0.08)',  text:'#F1C40F', border:'rgba(241,196,15,0.2)'   },
  Limited:    { bg:'rgba(180,150,80,0.08)',  text:'#D4AA50', border:'rgba(180,150,80,0.2)'   },
  New:        { bg:'rgba(80,200,120,0.08)',  text:'#5EC87E', border:'rgba(80,200,120,0.2)'   },
  Bespoke:    { bg:'rgba(160,100,200,0.08)', text:'#C07EE0', border:'rgba(160,100,200,0.2)'  },
  Bestseller: { bg:'rgba(212,175,55,0.12)',  text:'#F0C040', border:'rgba(240,192,64,0.28)'  },
};

// ─── Collection Card ──────────────────────────────────────────────────────────
export default function CollectionCard({ collection }) {
  const [hovered, setHovered] = useState(false);
  const { isMobile } = useBreakpoint();

  const iconKey = CAT_ICON[collection.category] || 'diamond';
  const badge   = BADGE_CLR[collection.badge]   || BADGE_CLR.Heritage;

  const images = collection.images?.length
    ? collection.images
    : collection.image ? [collection.image] : [];

  return (
    <Link
      to={`/collections/${collection._id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-responsive"
      style={{
        display:'block', textDecoration:'none', position:'relative',
        background: hovered ? 'linear-gradient(135deg, #161616 0%, #0f0f0f 100%)' : '#0d0d0d',
        border:`1px solid ${hovered ? 'rgba(212,175,55,0.25)' : 'rgba(212,175,55,0.08)'}`,
        overflow:'hidden', transition:'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: hovered
          ? '0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(212,175,55,0.1), inset 0 0 24px rgba(212,175,55,0.02)'
          : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.03)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Shimmer line top */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'1px', zIndex:2,
        background: hovered
          ? 'linear-gradient(90deg, transparent, #D4AF37 30%, #F5EFD0 50%, #D4AF37 70%, transparent)'
          : 'linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent)',
        transition:'background 0.5s',
      }}/>

      {/* ── Slider ── */}
      {images.length > 0 && (
        <div className="card-image-container" style={{ position:'relative', overflow:'hidden' }}>
          <ImageSlider images={images} hovered={hovered} />
        </div>
      )}

      {/* ── Info ── */}
      <div className="card-info" style={{ position:'relative', zIndex:3 }}>

        {/* Numeral + badge row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'clamp(12px, 2vw, 20px)' }}>
          <span style={{
            fontFamily:"'Cinzel',serif", fontSize:'clamp(28px, 5vw, 42px)', lineHeight:0.9, fontWeight:400,
            color: hovered ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0.05)',
            transition:'color 0.5s', userSelect:'none',
          }}>{collection.tag}</span>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'4px' }}>
            <span style={{
              fontFamily:"'Jost',sans-serif", fontSize:'clamp(6px, 1.5vw, 7px)', letterSpacing:'clamp(1.5px, 2vw, 2.5px)', textTransform:'uppercase', fontWeight:300,
              background:badge.bg, border:`1px solid ${badge.border}`, color:badge.text, padding:'clamp(2px, 1vw, 4px) clamp(6px, 2vw, 10px)', borderRadius:'2px',
              transition:'all 0.3s',
            }}>{collection.badge}</span>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'clamp(6px, 1.5vw, 7px)', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(212,175,55,0.25)', fontWeight:300 }}>
              {collection.era}
            </span>
          </div>
        </div>

        {/* Icon + category */}
        <div style={{ display:'flex', alignItems:'center', gap:'clamp(6px, 2vw, 10px)', marginBottom:'clamp(10px, 2vw, 16px)' }}>
          <div style={{
            width:'clamp(24px, 5vw, 30px)', height:'clamp(24px, 5vw, 30px)', flexShrink:0,
            color: hovered ? '#D4AF37' : 'rgba(212,175,55,0.32)',
            transition:'color 0.5s, filter 0.5s, transform 0.5s',
            filter: hovered ? 'drop-shadow(0 2px 8px rgba(212,175,55,0.35))' : 'drop-shadow(0 1px 3px rgba(212,175,55,0.08))',
            transform: hovered ? 'scale(1.12) translateY(-1px)' : 'scale(1)',
          }}>{ICONS[iconKey]}</div>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'clamp(6px, 1.5vw, 7.5px)', letterSpacing:'clamp(1.5px, 2vw, 2.5px)', textTransform:'uppercase', color:'rgba(212,175,55,0.50)', fontWeight:300 }}>
            {collection.category}
          </span>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily:"'Cinzel',serif", fontSize:'clamp(12px, 2.5vw, 20px)',
          letterSpacing:'1.5px', fontWeight:400, color:'#F5F5F5', marginBottom:'4px', lineHeight:1.2,
          transition:'color 0.3s',
        }}>{collection.name}</h3>

        {/* Subtitle - hidden */}

        {/* Divider - hidden */}

        {/* Description - hidden */}

        {/* Stone tags - hidden */}

        {/* Material - hidden */}

        {/* Price + CTA */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'clamp(8px, 2vw, 12px)' }}>
          <div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'clamp(6px, 1.5vw, 7px)', letterSpacing:'clamp(1.5px, 2vw, 2.5px)', color:'rgba(245,245,245,0.20)', textTransform:'uppercase', marginBottom:'clamp(2px, 1vw, 4px)', fontWeight:300 }}>From</div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(12px, 2.2vw, 15px)', color:'#D4AF37', letterSpacing:'clamp(1px, 2vw, 2px)', fontWeight:400, transition:'color 0.3s', }}>{collection.price}</div>
          </div>

          <div style={{
            fontFamily:"'Jost',sans-serif", fontSize:'clamp(6px, 1.5vw, 7px)', letterSpacing:'clamp(3px, 2vw, 4px)', textTransform:'uppercase',
            background:'transparent', border:`1px solid ${hovered ? '#D4AF37' : 'rgba(212,175,55,0.25)'}`,
            color: hovered ? '#0B0B0B' : '#D4AF37', padding:'clamp(8px, 2vw, 10px) clamp(14px, 3vw, 20px)', cursor:'pointer',
            position:'relative', overflow:'hidden', transition:'all 0.5s cubic-bezier(.25,.46,.45,.94)', fontWeight:300,
            display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: isMobile ? '40px' : 'auto',
          }}>
            <span style={{
              position:'absolute', inset:0, background:'#D4AF37',
              transform: hovered ? 'translateX(0)' : 'translateX(-101%)',
              transition:'transform 0.5s cubic-bezier(.25,.46,.45,.94)', zIndex:0,
            }}/>
            <span style={{ position:'relative', zIndex:1 }}>
              {isMobile ? '→' : 'Discover'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
