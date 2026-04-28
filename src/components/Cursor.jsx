import { useEffect, useRef } from 'react';

export default function Cursor() {
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
    };
    document.addEventListener('mousemove', onMove);

    const loop = () => {
      const { mx, my } = pos.current;
      pos.current.rx += (mx - pos.current.rx) * 0.13;
      pos.current.ry += (my - pos.current.ry) * 0.13;
      if (curRef.current) {
        curRef.current.style.transform = `translate(${mx - 5}px,${my - 5}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.rx - 19}px,${pos.current.ry - 19}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const expand = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '64px';
        ringRef.current.style.height = '64px';
        ringRef.current.style.borderColor = 'rgba(201,168,76,0.7)';
      }
    };
    const collapse = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '38px';
        ringRef.current.style.height = '38px';
        ringRef.current.style.borderColor = 'rgba(201,168,76,0.4)';
      }
    };

    const targets = document.querySelectorAll('a, button, [data-cursor-expand]');
    targets.forEach((el) => {
      el.addEventListener('mouseenter', expand);
      el.addEventListener('mouseleave', collapse);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={curRef}
        style={{
          width: 10, height: 10,
          background: '#c9a84c',
          borderRadius: '50%',
          position: 'fixed',
          top: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <div
        ref={ringRef}
        style={{
          width: 38, height: 38,
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: '50%',
          position: 'fixed',
          top: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
      />
    </>
  );
}
