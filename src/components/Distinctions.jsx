import { useEffect, useRef } from 'react';
import { mockDistinctions } from '../config/mockData';
import useBreakpoint from '../hooks/useBreakpoint';

const ICONS = {
  diamond: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
      <polygon points="24,4 44,16 44,32 24,44 4,32 4,16" />
      <polygon points="24,12 36,18 36,30 24,36 12,30 12,18" />
      <line x1="24" y1="4" x2="24" y2="12" /><line x1="44" y1="16" x2="36" y2="18" />
      <line x1="44" y1="32" x2="36" y2="30" /><line x1="24" y1="44" x2="24" y2="36" />
      <line x1="4" y1="32" x2="12" y2="30" /><line x1="4" y1="16" x2="12" y2="18" />
    </svg>
  ),
  craft: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="24" cy="24" r="18" />
      <path d="M24 6v4M24 38v4M6 24h4M38 24h4" />
      <path d="M14 14l3 3M31 31l3 3M34 14l-3 3M17 31l-3 3" />
      <circle cx="24" cy="24" r="7" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M24 4L28 16H44L32 24L36 36L24 28L12 36L16 24L4 16H20Z" />
    </svg>
  ),
};

export default function Distinctions() {
  const { isMobile, isTablet } = useBreakpoint();
  const cardsRef = useRef([]);
  const headRef = useRef(null);

  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    if (headRef.current) io.observe(headRef.current);
    cardsRef.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="atelier" className="section-pad" style={{ background: '#0B0B0B' }}>
      <div ref={headRef} style={{
        marginBottom: isMobile ? '56px' : '100px',
        opacity: 0, transform: 'translateY(40px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}>
        <span style={{
          fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '6px',
          textTransform: 'uppercase', color: '#D4AF37', display: 'block',
          marginBottom: '24px', fontWeight: 300,
        }}>Our Distinctions</span>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(32px, 5.5vw, 80px)',
          lineHeight: 1.1, letterSpacing: '4px', fontWeight: 400,
        }}>
          THE ART OF<br />
          <em style={{ fontStyle: 'italic', WebkitTextStroke: '1px rgba(212,175,55,0.3)', color: 'transparent' }}>
            Rare Beauty
          </em>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '1px',
        background: 'rgba(212,175,55,0.05)',
      }}>
        {mockDistinctions.map((d, i) => (
          <div
            key={d.id}
            ref={el => cardsRef.current[i] = el}
            style={{
              background: '#0B0B0B',
              padding: isMobile ? '48px 28px' : '72px 56px',
              position: 'relative', overflow: 'hidden',
              opacity: 0, transform: 'translateY(40px)',
              transition: `opacity 0.9s ease ${i * 200}ms, transform 0.9s ease ${i * 200}ms, background 0.4s`,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#111'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0B0B0B'; }}
          >
            {/* Large numeral bg */}
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: '64px',
              color: 'rgba(212,175,55,0.03)', position: 'absolute',
              top: '20px', right: '28px', fontWeight: 400, userSelect: 'none',
            }}>{d.numeral}</div>

            {/* Top line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'rgba(212,175,55,0.06)',
            }} />

            <div style={{ width: '42px', height: '42px', color: '#D4AF37', marginBottom: '36px', opacity: 0.7 }}>
              {ICONS[d.icon]}
            </div>
            <h3 style={{
              fontFamily: "'Cinzel', serif", fontSize: '19px',
              letterSpacing: '3px', marginBottom: '18px', fontWeight: 400, color: '#F5F5F5',
            }}>{d.title}</h3>
            <p style={{
              fontFamily: "'Jost', sans-serif", fontSize: '13px',
              lineHeight: 2, color: 'rgba(245,245,245,0.25)', fontWeight: 300,
            }}>{d.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}