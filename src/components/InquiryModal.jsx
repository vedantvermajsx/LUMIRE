import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import apiService from '../services/ApiService';

export default function InquiryModal({ isOpen, onClose, piece }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', phone: '', email: '' });
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await apiService.addBooking({
        userName: formData.name,
        userPhone: formData.phone,
        userEmail: formData.email,
        pieceId: piece._id,
        pieceName: piece.name,
        url: window.location.href,
      });

      if (result.emailError) {
        toast.error('Inquiry saved, but confirmation email failed to send.');
      } else {
        toast.success('Inquiry received! Confirmation email sent.');
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(10px)'
    }} onClick={onClose}>
      <div style={{
        background: '#0D0D0D', border: '1px solid rgba(212,175,55,0.15)',
        width: '100%', maxWidth: '480px', padding: '64px 48px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
      }} onClick={e => e.stopPropagation()}>

        {/* Decorative corner */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '100px', height: '100px',
          background: 'linear-gradient(225deg, rgba(212,175,55,0.1) 0%, transparent 70%)'
        }} />

        {!isSuccess ? (
          <>
            <h3 style={{
              fontFamily: "'Cinzel', serif", fontSize: '28px', color: '#D4AF37',
              letterSpacing: '2px', marginBottom: '12px', textAlign: 'center'
            }}>Inquire Piece</h3>
            <p style={{
              fontFamily: "'Jost', sans-serif", fontSize: '12px', color: 'rgba(245,245,245,0.4)',
              textAlign: 'center', marginBottom: '48px', letterSpacing: '1px', textTransform: 'uppercase'
            }}>Request a private consultation for {piece.name}</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase' }}>Your Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    background: 'transparent', border: 'none', borderBottom: '1px solid rgba(212,175,55,0.2)',
                    color: '#F5F5F5', fontFamily: "'Jost', sans-serif", fontSize: '16px', padding: '8px 0',
                    outline: 'none', transition: 'border-color 0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#D4AF37'}
                  onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.2)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase' }}>Phone Number</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    background: 'transparent', border: 'none', borderBottom: '1px solid rgba(212,175,55,0.2)',
                    color: '#F5F5F5', fontFamily: "'Jost', sans-serif", fontSize: '16px', padding: '8px 0',
                    outline: 'none', transition: 'border-color 0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#D4AF37'}
                  onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.2)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase' }}>Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    background: 'transparent', border: 'none', borderBottom: '1px solid rgba(212,175,55,0.2)',
                    color: '#F5F5F5', fontFamily: "'Jost', sans-serif", fontSize: '16px', padding: '8px 0',
                    outline: 'none', transition: 'border-color 0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#D4AF37'}
                  onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.2)'}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: '#D4AF37', color: '#0B0B0B', border: 'none', padding: '20px',
                  fontFamily: "'Jost', sans-serif", fontSize: '12px', letterSpacing: '4px',
                  textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer',
                  marginTop: '16px', opacity: isSubmitting ? 0.7 : 1, transition: 'background 0.3s'
                }}
                onMouseEnter={e => { if (!isSubmitting) e.target.style.background = '#e5c05c'; }}
                onMouseLeave={e => { if (!isSubmitting) e.target.style.background = '#D4AF37'; }}
              >
                {isSubmitting ? 'Processing...' : 'Send Inquiry'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              width: '64px', height: '64px', border: '2px solid #D4AF37', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px',
              color: '#D4AF37'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '24px', color: '#D4AF37', marginBottom: '16px' }}>Inquiry Sent</h3>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '14px', color: 'rgba(245,245,245,0.5)', lineHeight: 1.6 }}>
              A master from our Maison will contact you shortly to arrange your private consultation.
            </p>
          </div>
        )}

        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none',
          color: 'rgba(212,175,55,0.4)', fontSize: '24px', cursor: 'pointer', fontWeight: 300
        }}>&times;</button>
      </div>
    </div>
  );
}
