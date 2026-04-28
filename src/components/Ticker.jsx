import { forwardRef } from 'react';

const ITEMS = Array(10).fill('EIRA · HAUTE JOAILLERIE · DIAMONDS · BESPOKE · PARIS · EST. 1887 · ');

const Ticker = forwardRef(({ className }, ref) => {
  return (
    <div style={{
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}>
      <div
        ref={ref}
        className={className}
        style={{
          display: 'inline-flex',
        }}
      >
        {ITEMS.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '13px',
            letterSpacing: '6px',
            color: '#07060a',
            padding: '0 32px',
            fontWeight: 400,
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
});

export default Ticker;
