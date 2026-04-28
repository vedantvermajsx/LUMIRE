import { useEffect, useRef } from 'react';
import useBreakpoint from '../hooks/useBreakpoint';

const CATEGORIES = [
    {
        id: 'diamonds',
        label: 'Diamonds',
        sub: 'Conflict-free brilliance',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.9">
                <polygon points="32,4 58,18 58,46 32,60 6,46 6,18" />
                <polygon points="32,14 46,21 46,43 32,50 18,43 18,21" />
                <line x1="32" y1="4" x2="32" y2="14" />
                <line x1="58" y1="18" x2="46" y2="21" />
                <line x1="58" y1="46" x2="46" y2="43" />
                <line x1="32" y1="60" x2="32" y2="50" />
                <line x1="6" y1="46" x2="18" y2="43" />
                <line x1="6" y1="18" x2="18" y2="21" />
            </svg>
        ),
        desc: 'From 0.5ct to 10ct, round brilliant to rare fancy shapes',
        stat: '2,400+ stones',
    },
    {
        id: 'gold',
        label: 'Gold',
        sub: '18K · 22K · 24K',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.9">
                <circle cx="32" cy="32" r="24" />
                <circle cx="32" cy="32" r="14" />
                <path d="M32 8v10M32 46v10M8 32h10M46 32h10" />
                <path d="M15 15l7 7M42 42l7 7M49 15l-7 7M22 42l-7 7" />
            </svg>
        ),
        desc: 'Yellow, white and rose gold in every karat and finish',
        stat: '18K · 22K · 24K',
    },
    {
        id: 'silver',
        label: 'Silver',
        sub: 'Sterling & fine silver',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.9">
                <rect x="12" y="12" width="40" height="40" rx="2" />
                <rect x="20" y="20" width="24" height="24" rx="1" />
                <line x1="12" y1="32" x2="20" y2="32" />
                <line x1="44" y1="32" x2="52" y2="32" />
                <line x1="32" y1="12" x2="32" y2="20" />
                <line x1="32" y1="44" x2="32" y2="52" />
            </svg>
        ),
        desc: 'Sterling silver and fine silver settings with rhodium plating',
        stat: '925 Sterling',
    },
    {
        id: 'rings',
        label: 'Rings',
        sub: 'Solitaires & bands',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.9">
                <circle cx="32" cy="38" r="18" />
                <circle cx="32" cy="38" r="9" />
                <path d="M25 20C25 13 39 13 39 20" />
                <circle cx="32" cy="16" r="4" />
            </svg>
        ),
        desc: 'Engagement, eternity, signet and cocktail rings',
        stat: '340+ designs',
    },
    {
        id: 'necklaces',
        label: 'Necklaces',
        sub: 'Pendants & chains',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.9">
                <path d="M10 10 Q32 28 54 10" />
                <path d="M10 10 Q6 32 18 45" />
                <path d="M54 10 Q58 32 46 45" />
                <path d="M18 45 Q32 52 46 45" />
                <circle cx="32" cy="52" r="7" />
            </svg>
        ),
        desc: 'Layering chains, statement pieces and diamond drops',
        stat: '180+ styles',
    },
    {
        id: 'bracelets',
        label: 'Bracelets',
        sub: 'Bangles & tennis',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.9">
                <ellipse cx="32" cy="32" rx="25" ry="14" />
                <ellipse cx="32" cy="32" rx="16" ry="8" />
                <circle cx="32" cy="18" r="3" />
                <circle cx="57" cy="32" r="3" />
                <circle cx="32" cy="46" r="3" />
                <circle cx="7" cy="32" r="3" />
            </svg>
        ),
        desc: 'Tennis bracelets, bangles and charm designs',
        stat: '120+ designs',
    },
    {
        id: 'earrings',
        label: 'Earrings',
        sub: 'Studs & drops',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.9">
                <circle cx="20" cy="16" r="6" />
                <line x1="20" y1="22" x2="20" y2="36" />
                <path d="M12 36 Q20 52 28 36" />
                <circle cx="44" cy="16" r="6" />
                <line x1="44" y1="22" x2="44" y2="36" />
                <path d="M36 36 Q44 52 52 36" />
            </svg>
        ),
        desc: 'Diamond studs, hoops, drops and chandelier styles',
        stat: '260+ pairs',
    },
    {
        id: 'platinum',
        label: 'Platinum',
        sub: 'The rarest metal',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.9">
                <path d="M32 6 L56 20 L56 44 L32 58 L8 44 L8 20 Z" />
                <path d="M32 14 L48 23 L48 41 L32 50 L16 41 L16 23 Z" />
                <path d="M32 22 L40 27 L40 37 L32 42 L24 37 L24 27 Z" />
            </svg>
        ),
        desc: 'Pure platinum settings — the most durable precious metal',
        stat: '950 Pt',
    },
];

export default function WhatWeSell() {
    const { isMobile, isTablet } = useBreakpoint();
    const sectionRef = useRef(null);
    const headRef = useRef(null);
    const itemsRef = useRef([]);

    // Determine grid columns
    const cols = isMobile ? 1 : isTablet ? 2 : 4;

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
        itemsRef.current.forEach(el => el && io.observe(el));
        return () => io.disconnect();
    }, []);

    // Border logic based on cols
    const getBorders = (i) => {
        const isLastInRow = (i + 1) % cols === 0;
        const isInLastRow = i >= CATEGORIES.length - cols;
        return {
            borderRight: !isLastInRow ? '1px solid rgba(212,175,55,0.06)' : 'none',
            borderBottom: !isInLastRow ? '1px solid rgba(212,175,55,0.06)' : 'none',
        };
    };

    return (
        <section ref={sectionRef} className="section-pad" style={{ background: '#0B0B0B' }}>
            {/* Heading */}
            <div ref={headRef} style={{
                marginBottom: isMobile ? '64px' : '120px',
                opacity: 0, transform: 'translateY(40px)',
                transition: 'opacity 1s ease, transform 1s ease',
            }}>
                <span style={{
                    fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '6px',
                    textTransform: 'uppercase', color: '#D4AF37', display: 'block',
                    marginBottom: '24px', fontWeight: 300,
                }}>Our Maison</span>
                <h2 style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(32px, 5.5vw, 80px)',
                    lineHeight: 1.1, letterSpacing: '4px', fontWeight: 400, color: '#F5F5F5',
                    maxWidth: '700px',
                }}>
                    THE FINEST IN<br />
                    <em style={{ fontStyle: 'italic', WebkitTextStroke: '1px rgba(212,175,55,0.3)', color: 'transparent' }}>
                        Precious Jewellery
                    </em>
                </h2>
                <p style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontStyle: 'italic',
                    color: 'rgba(245,245,245,0.3)', maxWidth: '520px', marginTop: '28px',
                    lineHeight: 2, fontWeight: 300,
                }}>
                    Diamonds, gold, silver and platinum — every precious material, every jewellery category,
                    crafted to the highest standard of Parisian haute joaillerie.
                </p>
            </div>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: '1px',
                background: 'rgba(212,175,55,0.06)',
                border: '1px solid rgba(212,175,55,0.06)',
            }}>
                {CATEGORIES.map((cat, i) => (
                    <div
                        key={cat.id}
                        ref={el => itemsRef.current[i] = el}
                        style={{
                            background: '#0B0B0B',
                            padding: isMobile ? '40px 24px' : '56px 40px',
                            opacity: 0, transform: 'translateY(48px)',
                            transition: `opacity 0.8s ease ${i * 80}ms, transform 0.8s ease ${i * 80}ms`,
                            position: 'relative', overflow: 'hidden',
                            ...getBorders(i),
                        }}
                        onMouseEnter={e => {
                            const el = e.currentTarget;
                            el.style.background = '#111111';
                            el.querySelector('.cat-icon').style.color = '#D4AF37';
                            el.querySelector('.cat-icon').style.filter = 'drop-shadow(0 0 12px rgba(212,175,55,0.3))';
                            el.querySelector('.cat-label').style.color = '#D4AF37';
                            el.querySelector('.cat-bar').style.width = '100%';
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget;
                            el.style.background = '#0B0B0B';
                            el.querySelector('.cat-icon').style.color = 'rgba(212,175,55,0.35)';
                            el.querySelector('.cat-icon').style.filter = 'none';
                            el.querySelector('.cat-label').style.color = '#F5F5F5';
                            el.querySelector('.cat-bar').style.width = '0%';
                        }}
                    >
                        {/* Bottom progress bar reveal */}
                        <div className="cat-bar" style={{
                            position: 'absolute', bottom: 0, left: 0, height: '1px',
                            background: 'linear-gradient(90deg, #D4AF37, transparent)',
                            width: '0%', transition: 'width 0.6s ease',
                        }} />

                        {/* Icon */}
                        <div className="cat-icon" style={{
                            width: '52px', height: '52px', marginBottom: '36px',
                            color: 'rgba(212,175,55,0.35)',
                            transition: 'color 0.4s, filter 0.4s',
                        }}>
                            {cat.icon}
                        </div>

                        {/* Label */}
                        <h3 className="cat-label" style={{
                            fontFamily: "'Cinzel', serif", fontSize: 'clamp(15px,1.4vw,20px)',
                            letterSpacing: '3px', fontWeight: 400, color: '#F5F5F5',
                            marginBottom: '6px', transition: 'color 0.4s',
                        }}>
                            {cat.label}
                        </h3>

                        {/* Sub */}
                        <p style={{
                            fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '3px',
                            textTransform: 'uppercase', color: '#D4AF37', marginBottom: '20px', fontWeight: 300,
                        }}>
                            {cat.sub}
                        </p>

                        {/* Desc */}
                        <p style={{
                            fontFamily: "'Jost', sans-serif", fontSize: '12px', lineHeight: 1.9,
                            color: 'rgba(245,245,245,0.25)', fontWeight: 300,
                        }}>
                            {cat.desc}
                        </p>

                        {/* Stat */}
                        <div style={{
                            marginTop: '28px', fontFamily: "'Cinzel', serif", fontSize: '11px',
                            letterSpacing: '2px', color: 'rgba(212,175,55,0.4)',
                        }}>
                            {cat.stat}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}