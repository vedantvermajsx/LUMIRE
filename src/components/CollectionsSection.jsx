import { useEffect, useRef, useState, useMemo } from 'react';
import CollectionCard from './CollectionCard';
import { useCollections } from '../hooks/useCollections';
import SkeletonCard from './SkeletonCard';

const CATEGORIES = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Sets', 'Pendants'];
const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];


export default function CollectionsSection() {
  const { collections, loading } = useCollections();
  const headRef = useRef(null);
  const cardsRef = useRef([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [searchFocused, setSearchFocused] = useState(false);

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...collections];
    if (category !== 'All') list = list.filter(c => c.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.subtitle && c.subtitle.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q)) ||
        (c.stones && c.stones.some(s => s.toLowerCase().includes(q)))
      );
    }
    if (sort === 'Price: Low to High') {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sort === 'Price: High to Low') {
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    return list;
  }, [collections, category, search, sort]);

  function parsePrice(str) {
    const m = str?.match(/[\d,]+/);
    return m ? parseInt(m[0].replace(/,/g, '')) : 0;
  }

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    if (headRef.current) io.observe(headRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    cardsRef.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, [filtered]);

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#F5F5F5',
    fontFamily: "'Jost', sans-serif",
    fontSize: '12px',
    letterSpacing: '2px',
    fontWeight: 300,
    width: '100%',
    padding: '0',
  };

  return (
    <section id="collections" className="section-pad" style={{ background: '#0B0B0B' }}>

      {/* ── Filter & Search Bar ── */}
      <div style={{
        marginBottom: '80px', display: 'flex', flexDirection: 'column', gap: '40px',
      }}>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '20px',
          borderBottom: `1px solid ${searchFocused ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.12)'}`,
          paddingBottom: '16px', transition: 'border-color 0.3s',
          maxWidth: '520px',
        }}>
          {/* Search icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'rgba(212,175,55,0.4)', flexShrink: 0 }}>
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search collections..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={inputStyle}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(212,175,55,0.35)', fontSize: '16px', lineHeight: 1,
              flexShrink: 0, transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#D4AF37'}
              onMouseLeave={e => e.target.style.color = 'rgba(212,175,55,0.35)'}
            >×</button>
          )}
        </div>

        {/* Category filters + Sort */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '24px',
        }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => {
              const active = cat === category;
              return (
                <button key={cat} onClick={() => setCategory(cat)} style={{
                  fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '3px',
                  textTransform: 'uppercase', fontWeight: 300,
                  background: active ? '#D4AF37' : 'transparent',
                  color: active ? '#0B0B0B' : 'rgba(245,245,245,0.35)',
                  border: `1px solid ${active ? '#D4AF37' : 'rgba(212,175,55,0.15)'}`,
                  padding: '10px 20px', cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                  onMouseEnter={e => { if (!active) { e.target.style.borderColor = 'rgba(212,175,55,0.4)'; e.target.style.color = '#D4AF37'; } }}
                  onMouseLeave={e => { if (!active) { e.target.style.borderColor = 'rgba(212,175,55,0.15)'; e.target.style.color = 'rgba(245,245,245,0.35)'; } }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '3px',
              textTransform: 'uppercase', color: 'rgba(212,175,55,0.4)', fontWeight: 300,
            }}>Sort:</span>
            <div style={{ position: 'relative' }}>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '3px',
                  textTransform: 'uppercase', fontWeight: 300,
                  background: 'transparent',
                  color: 'rgba(245,245,245,0.5)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  padding: '10px 36px 10px 16px',
                  cursor: 'pointer', outline: 'none',
                  appearance: 'none', WebkitAppearance: 'none',
                }}
              >
                {SORT_OPTIONS.map(o => <option key={o} value={o} style={{ background: '#141414' }}>{o}</option>)}
              </select>
              <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(212,175,55,0.4)' }} width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="collections-grid">
        {loading
          ? Array(6).fill(null).map((_, i) => <SkeletonCard key={i} />)
          : filtered.length === 0
            ? (
              <div style={{
                gridColumn: '1 / -1', padding: '120px 40px', textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: '14px', letterSpacing: '4px',
                  color: 'rgba(212,175,55,0.2)', marginBottom: '16px',
                }}>No pieces found</div>
              </div>
            )
            : filtered.map((col, i) => (
              <div key={col._id}
                ref={el => cardsRef.current[i] = el}
                style={{
                  opacity: 0, transform: 'translateY(48px)',
                  transition: `opacity 0.8s ease ${Math.min(i, 4) * 100}ms, transform 0.8s ease ${Math.min(i, 4) * 100}ms`,
                }}
              >
                <CollectionCard collection={col} />
              </div>
            ))
        }
      </div>
    </section>
  );
}