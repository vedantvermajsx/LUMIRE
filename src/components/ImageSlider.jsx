import { useState, useRef, useCallback } from 'react';

export default function ImageSlider({ images, hovered = false, className = '' }) {
  const [idx, setIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const startX = useRef(0);
  const trackRef = useRef(null);

  // Normalise to URL strings
  const urls = images.map(img =>
    typeof img === 'string' ? img : img.cloudinaryUrl || img.preview || img.url || ''
  ).filter(Boolean);

  const go = useCallback((next) => {
    if (urls.length === 0) return;
    setIdx((next + urls.length) % urls.length);
  }, [urls.length]);

  // Keyboard when focused
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') go(idx - 1);
    if (e.key === 'ArrowRight') go(idx + 1);
  };

  // Touch / pointer drag
  const onPointerDown = (e) => {
    if (urls.length <= 1) return;
    startX.current = e.clientX;
    setDragging(true);
    trackRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging || urls.length <= 1) return;
    setDragDelta(e.clientX - startX.current);
  };
  const onPointerUp = (e) => {
    if (!dragging || urls.length <= 1) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? idx + 1 : idx - 1);
    setDragging(false);
    setDragDelta(0);
  };

  // Prevent link click when interacting with slider controls
  const handleControlClick = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  if (urls.length === 0) {
    return (
      <div className={className} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(212,175,55,0.1)' }}>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ width: '36px', height: '36px' }}>
          <rect x="4" y="8" width="40" height="32" rx="2" /><circle cx="16" cy="20" r="4" /><polyline points="44,32 32,20 12,40" />
        </svg>
      </div>
    );
  }

  // Use inline styles primarily, allowing class override
  return (
    <div
      className={className}
      ref={trackRef}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { setDragging(false); setDragDelta(0); }}
      style={{
        position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
        userSelect: 'none', cursor: dragging ? 'grabbing' : (urls.length > 1 ? 'grab' : 'default'), outline: 'none'
      }}
    >
      {/* Slides */}
      <div style={{
        display: 'flex', width: `${urls.length * 100}%`, height: '100%',
        transform: `translateX(calc(-${idx * (100 / urls.length)}% + ${dragDelta / urls.length}px))`,
        transition: dragging ? 'none' : 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        {urls.map((url, i) => (
          <div key={i} style={{ width: `${100 / urls.length}%`, height: '100%', flexShrink: 0, overflow: 'hidden' }}>
            <img src={url} alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: hovered ? 0.88 : 1, // Default opacity if hovered not explicitly controlled
                transform: hovered ? 'scale(1.04)' : 'scale(1)', // Mild scale on hover if hovered explicitly passed
                transition: 'opacity 0.5s, transform 0.7s',
                pointerEvents: 'none',
              }} />
          </div>
        ))}
      </div>

      {/* Gradient overlay for text/controls visibility */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.15) 55%, transparent 100%)', pointerEvents: 'none' }} />

      {/* Prev / Next arrows (visible on hover or always if not hovered prop controlled) */}
      {urls.length > 1 && (
        <>
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={e => handleControlClick(e, () => go(idx - 1))}
            style={{
              position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.2)',
              color: 'rgba(212,175,55,0.7)', width: '26px', height: '26px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 3, transition: 'all 0.2s',
              opacity: (hovered !== false) || !hovered ? 1 : 0, // Show if hovered is not false or if we don't have hover logic
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.15)'; e.currentTarget.style.color = '#D4AF37'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.color = 'rgba(212,175,55,0.7)'; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6" /></svg>
          </button>
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={e => handleControlClick(e, () => go(idx + 1))}
            style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.2)',
              color: 'rgba(212,175,55,0.7)', width: '26px', height: '26px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 3, transition: 'all 0.2s',
              opacity: (hovered !== false) || !hovered ? 1 : 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.15)'; e.currentTarget.style.color = '#D4AF37'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.color = 'rgba(212,175,55,0.7)'; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6" /></svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {urls.length > 1 && (
        <div style={{ position: 'absolute', bottom: 9, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '5px', zIndex: 3, pointerEvents: 'auto' }}>
          {urls.map((_, i) => (
            <button key={i}
              onPointerDown={e => e.stopPropagation()}
              onClick={e => handleControlClick(e, () => go(i))}
              style={{
                width: i === idx ? '16px' : '5px', height: '3px',
                background: i === idx ? '#D4AF37' : 'rgba(212,175,55,0.28)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'all 0.35s', borderRadius: '2px',
              }} />
          ))}
        </div>
      )}

      {/* Image counter */}
      {urls.length > 1 && (
        <div style={{
          position: 'absolute', top: 8, right: 8, zIndex: 3,
          background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(212,175,55,0.18)',
          fontFamily: "'Jost',sans-serif", fontSize: '7px', letterSpacing: '1.5px',
          color: 'rgba(212,175,55,0.6)', padding: '2px 7px',
          opacity: (hovered !== false) || !hovered ? 1 : 0, transition: 'opacity 0.3s',
        }}>
          {idx + 1} / {urls.length}
        </div>
      )}
    </div>
  );
}
