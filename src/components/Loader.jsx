import { useEffect, useRef } from 'react';

export default function Loader({ onComplete }) {
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 12 + 3;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        if (barRef.current) barRef.current.style.width = '100%';
        if (pctRef.current) pctRef.current.textContent = '100%';
        setTimeout(() => {
          if (loaderRef.current) {
            loaderRef.current.style.opacity = '0';
            loaderRef.current.style.visibility = 'hidden';
          }
          setTimeout(onComplete, 700);
        }, 300);
        return;
      }
      if (barRef.current) barRef.current.style.width = val + '%';
      if (pctRef.current) pctRef.current.textContent = Math.floor(val) + '%';
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#07060a',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        transition: 'opacity 0.7s, visibility 0.7s',
      }}
    >
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '22px',
        letterSpacing: '10px',
        color: '#c9a84c',
        fontWeight: 400,
      }}>
        EIRA
      </div>
      <div style={{
        width: '280px',
        height: '1px',
        background: 'rgba(201,168,76,0.1)',
      }}>
        <div
          ref={barRef}
          style={{
            height: '100%',
            background: '#c9a84c',
            width: '0%',
            transition: 'width 0.15s',
            boxShadow: '0 0 12px rgba(201,168,76,0.4)',
          }}
        />
      </div>
      <div
        ref={pctRef}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '11px',
          color: '#5a5248',
          letterSpacing: '3px',
          fontWeight: 300,
        }}
      >
        0%
      </div>
    </div>
  );
}
