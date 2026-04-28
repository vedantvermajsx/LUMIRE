import { Link } from 'react-router-dom';
import useBreakpoint from '../hooks/useBreakpoint';

export default function Footer() {
  const { isMobile } = useBreakpoint();

  return (
    <footer style={{
      padding: isMobile ? '48px 20px' : '64px 80px',
      borderTop: '1px solid rgba(212,175,55,0.06)',
      background: '#0B0B0B',
    }}>
      {/* Top row */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'flex-start',
        gap: isMobile ? '48px' : '0',
        marginBottom: '64px',
      }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: '22px', letterSpacing: '8px', color: '#D4AF37', fontWeight: 400, marginBottom: '12px' }}>
            EIRA
          </div>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: 'rgba(245,245,245,0.2)', letterSpacing: '3px', fontWeight: 300, textTransform: 'uppercase' }}>
            Haute Joaillerie · Est. 1887
          </p>
        </div>

        <div style={{ display: 'flex', gap: isMobile ? '32px' : '80px', flexWrap: 'wrap' }}>
          {[
            { title: 'Collections', links: ['Rings', 'Necklaces', 'Bracelets', 'Earrings'] },
            { title: 'Materials', links: ['Diamonds', 'Gold', 'Silver', 'Platinum'] },
            { title: 'Maison', links: ['Heritage', 'Atelier', 'Bespoke', 'Contact'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '24px', fontWeight: 300 }}>
                {col.title}
              </div>
              {col.links.map(link => (
                <div key={link} style={{ marginBottom: '12px' }}>
                  <Link to="/collections" style={{
                    fontFamily: "'Jost', sans-serif", fontSize: '12px',
                    color: 'rgba(245,245,245,0.2)', textDecoration: 'none', fontWeight: 300,
                    letterSpacing: '1px', transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => e.target.style.color = 'rgba(212,175,55,0.6)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(245,245,245,0.2)'}
                  >{link}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(212,175,55,0.05)', marginBottom: '32px' }} />

      {/* Bottom row */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? '12px' : '0',
      }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: 'rgba(245,245,245,0.15)', letterSpacing: '2px', fontWeight: 300 }}>
          © 2026 Maison Eira. All rights reserved.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', color: 'rgba(212,175,55,0.2)', fontStyle: 'italic', letterSpacing: '1px', fontWeight: 300 }}>
          Crafted with precision in Paris
        </p>
      </div>

      <div style={{ marginTop: '64px', display: 'flex', justifyContent: 'center' }}>
        <Link to="/admin" style={{
          fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '4px',
          textTransform: 'uppercase', color: 'rgba(212,175,55,0.25)', textDecoration: 'none',
          fontWeight: 300, transition: 'color 0.3s'
        }}
          onMouseEnter={e => e.target.style.color = '#D4AF37'}
          onMouseLeave={e => e.target.style.color = 'rgba(212,175,55,0.25)'}
        >Maison Control</Link>
      </div>
    </footer>
  );
}