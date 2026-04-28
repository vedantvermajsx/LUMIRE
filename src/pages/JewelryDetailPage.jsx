import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import InquiryModal from '../components/InquiryModal';
import ImageSlider from '../components/ImageSlider';
import { useCollectionById, useCollections } from '../hooks/useCollections';
import useBreakpoint from '../hooks/useBreakpoint';

export default function JewelryDetailPage() {
  const { id } = useParams();
  const { collection, loading, error } = useCollectionById(id);
  const { collections } = useCollections();
  const { isMobile, isTablet } = useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div style={{ background: '#0B0B0B', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', letterSpacing: '4px', opacity: 0.5, animation: 'pulse 2s infinite' }}>Loading...</div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div style={{ background: '#0B0B0B', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', letterSpacing: '4px' }}>Piece Not Found</h2>
        <Link to="/collections" style={{ color: 'rgba(245,245,245,0.4)', textDecoration: 'none', fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>Return to Collections</Link>
      </div>
    );
  }

  const related = collections
    .filter(c => c.category === collection.category && c._id !== collection._id)
    .slice(0, 3);

  const images = collection.images?.length > 0
    ? collection.images
    : (collection.image ? [collection.image] : []);

  const sidePad = isMobile ? '0 20px' : isTablet ? '0 40px' : '0 80px';

  return (
    <div style={{ background: '#0B0B0B', color: '#F5F5F5', minHeight: '100vh' }}>
      <main style={{ paddingTop: isMobile ? '100px' : '160px', paddingBottom: '120px' }}>

        {/* Main Display Area */}
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: sidePad,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '48px' : '100px',
          alignItems: 'start',
        }}>

          {/* Left: Image/Visual */}
          <div style={{ position: 'relative' }}>
            <div style={{
              aspectRatio: '5/6', background: 'rgba(212,175,55,0.03)',
              border: '1px solid rgba(212,175,55,0.08)',
              overflow: 'hidden', position: 'relative'
            }}>
              <ImageSlider images={images} />
            </div>

            {/* Corner label */}
            <div style={{
              position: 'absolute', bottom: '-32px', left: '0',
              fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '3px',
              color: 'rgba(212,175,55,0.2)', textTransform: 'uppercase'
            }}>Ref: LP-2026-00{collection._id}</div>
          </div>

          {/* Right: Info Area */}
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: isMobile ? '16px' : '0' }}>
            <div style={{ marginBottom: '64px' }}>
              <div style={{
                display: 'inline-block', padding: '6px 14px', border: '1px solid rgba(212,175,55,0.2)',
                marginBottom: '24px', fontFamily: "'Jost', sans-serif", fontSize: '9px',
                letterSpacing: '3px', textTransform: 'uppercase', color: '#D4AF37'
              }}>
                {collection.badge}
              </div>

              <h1 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: isMobile ? 'clamp(28px, 9vw, 48px)' : 'clamp(36px, 4vw, 64px)',
                fontWeight: 400,
                letterSpacing: '4px', marginBottom: '12px', lineHeight: 1.1
              }}>
                {collection.name}
              </h1>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontStyle: 'italic',
                color: 'rgba(212,175,55,0.5)', marginBottom: '32px'
              }}>
                {collection.subtitle}
              </p>

              <div style={{ height: '1px', background: 'rgba(212,175,55,0.15)', width: '100px', marginBottom: '48px' }} />

              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: '16px', lineHeight: 1.8,
                color: 'rgba(245,245,245,0.6)', fontWeight: 300, marginBottom: '64px',
                maxWidth: '500px'
              }}>
                {collection.description}
              </p>

              <div style={{ display: 'flex', gap: isMobile ? '40px' : '80px', marginBottom: '64px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '2px', color: 'rgba(212,175,55,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}>Material</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: '14px', color: '#F5F5F5' }}>{collection.material}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '2px', color: 'rgba(212,175,55,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}>Edition</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: '14px', color: '#F5F5F5' }}>{collection.era}</div>
                </div>
              </div>

              <div style={{
                background: 'rgba(212,175,55,0.03)', border: '1px solid rgba(212,175,55,0.08)',
                padding: isMobile ? '28px 20px' : '40px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: isMobile ? '24px' : '0',
              }}>
                <div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '3px', color: 'rgba(245,245,245,0.3)', textTransform: 'uppercase', marginBottom: '4px' }}>Indicative Price</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: '32px', color: '#D4AF37' }}>{collection.price}</div>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    background: '#D4AF37', border: 'none',
                    padding: '20px 48px',
                    width: isMobile ? '100%' : 'auto',
                    color: '#0B0B0B',
                    fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '4px',
                    textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={e => e.target.style.background = '#e5c05c'}
                  onMouseLeave={e => e.target.style.background = '#D4AF37'}
                >Inquire Piece</button>
              </div>
            </div>

            {/* Specifications */}
            <div style={{ borderTop: '1px solid rgba(212,175,55,0.08)', paddingTop: '40px' }}>
              <h4 style={{
                fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '3px',
                textTransform: 'uppercase', color: 'rgba(245,245,245,0.4)', marginBottom: '24px'
              }}>Gemstone Details</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {collection.stones?.map(stone => (
                  <div key={stone} style={{
                    padding: '12px 24px', border: '1px solid rgba(212,175,55,0.06)',
                    fontFamily: "'Jost', sans-serif", fontSize: '12px', fontWeight: 300, color: 'rgba(245,245,245,0.7)'
                  }}>
                    {stone}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Section */}
        {related.length > 0 && (
          <div style={{ marginTop: isMobile ? '100px' : '200px', borderTop: '1px solid rgba(212,175,55,0.05)', paddingTop: isMobile ? '60px' : '120px' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: sidePad }}>
              <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? '22px' : '32px', letterSpacing: '4px', marginBottom: '16px' }}>Other Related Pieces</h3>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', letterSpacing: '2px', color: 'rgba(212,175,55,0.4)', textTransform: 'uppercase' }}>
                  Discover more from the {collection.category} collection
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '24px' : '40px',
              }}>
                {related.map(rec => (
                  <CollectionCard key={rec._id} collection={rec} />
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        piece={collection}
      />
    </div>
  );
}
