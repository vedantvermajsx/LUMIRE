import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiService from '../services/ApiService';
import { Ic, STATUS_CFG, BOOKING_TABS } from '../components/admin/AdminCommon';
import StatCard from '../components/admin/StatCard';
import InquiryRow from '../components/admin/InquiryRow';
import InventoryCard from '../components/admin/InventoryCard';
import InventoryModal from '../components/admin/InventoryModal';
import useBreakpoint from '../hooks/useBreakpoint';

const SIDEBAR_TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'bookings', label: 'Inquiries', icon: 'bookings' },
  { id: 'inventory', label: 'Inventory', icon: 'inventory' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookingTab, setBookingTab] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPiece, setEditingPiece] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isMobile, isTablet } = useBreakpoint();

  const handleLogout = () => {
    localStorage.removeItem('eira_auth');
    navigate('/login');
  };

  const stats = {
    total: inventory.length,
    inquiries: bookings.length,
    pending: bookings.filter(b => (b.status?.toLowerCase() || 'pending') === 'pending').length,
    cats: [...new Set(inventory.map(p => p.category))].length,
  };

  const loadData = async () => {
    setLoading(true);
    const [b, i] = await Promise.all([apiService.getBookings(), apiService.getInventory()]);
    setBookings(b || []); setInventory(i || []); setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await apiService.updateBookingStatus(id, status);
      toast.success(`Status updated to ${status}`);
      loadData();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this piece?')) {
      try {
        await apiService.deletePiece(id);
        toast.success('Piece removed from inventory');
        loadData();
      } catch (err) {
        toast.error('Failed to delete piece');
      }
    }
  };

  const handleSave = async (piece, id) => {
    try {
      if (id) {
        await apiService.updatePiece(id, piece);
        toast.success('Inventory updated');
      } else {
        await apiService.addPiece({ ...piece, tag: (inventory.length + 1).toString(), badge: 'New', gradient: 'from-[#1a1a2e]/80 to-[#c9a84c]/5', accent: '#e8d5a3' });
        toast.success('New piece added to collection');
      }
      loadData();
    } catch (err) {
      toast.error('Save failed. Please check connection.');
    }
  };

  const filteredInventory = inventory.filter(p =>
    !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookings = bookings.filter(b => {
    const s = b.status?.toLowerCase() || 'pending';
    return bookingTab === 'all' || s === bookingTab;
  });

  const bookingCounts = BOOKING_TABS.reduce((acc, t) => ({
    ...acc, [t.id]: t.id === 'all' ? bookings.length : bookings.filter(b => (b.status?.toLowerCase() || 'pending') === t.id).length
  }), {});

  if (loading) return (
    <div style={{ background: '#0B0B0B', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '36px', height: '36px', border: '1px solid rgba(212,175,55,0.15)', borderTopColor: 'rgba(212,175,55,0.6)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <p style={{ fontFamily: "'Cinzel',serif", fontSize: '10px', letterSpacing: '4px', color: 'rgba(212,175,55,0.4)', textTransform: 'uppercase' }}>Loading Archives</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  // Responsive page padding
  const pagePad = isMobile ? '80px 16px 100px' : isTablet ? '120px 32px 80px' : '160px 80px 120px';

  return (
    <div style={{ background: '#0B0B0B', color: '#F5F5F5', minHeight: '100vh' }}>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: pagePad }}>

        {/* Page header */}
        <header style={{
          marginBottom: '40px', paddingBottom: '28px',
          borderBottom: '1px solid rgba(212,175,55,0.08)',
          display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', gap: '16px',
        }}>
          <div>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.3)', fontWeight: 300, marginBottom: '10px' }}>Administrative Suite</p>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: isMobile ? '28px' : '44px', color: '#D4AF37', letterSpacing: '4px', fontWeight: 400 }}>Maison Control</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
            {activeTab === 'inventory' && (
              <button onClick={() => { setEditingPiece({}); setIsModalOpen(true); }}
                style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#D4AF37', color: '#0B0B0B', border: 'none', padding: '11px 22px', fontFamily: "'Jost',sans-serif", fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s', flex: isMobile ? 1 : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = '#C9A432'}
                onMouseLeave={e => e.currentTarget.style.background = '#D4AF37'}>
                <Ic.plus /> Add Piece
              </button>
            )}
            {/* Mobile logout in header */}
            {isMobile && (
              <button onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', color: 'rgba(239,68,68,0.5)', border: '1px solid rgba(239,68,68,0.2)', padding: '11px 16px', fontFamily: "'Jost',sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
                <Ic.logout /> Out
              </button>
            )}
          </div>
        </header>

        {/* Desktop layout: sidebar + content */}
        {!isMobile ? (
          <div style={{ display: 'flex', gap: '56px' }}>

            {/* Sidebar */}
            <aside style={{ width: '192px', flexShrink: 0 }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '1px', position: 'sticky', top: '120px' }}>
                {SIDEBAR_TABS.map(tab => {
                  const active = activeTab === tab.id;
                  const IconComp = Ic[tab.icon];
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '9px', textAlign: 'left', fontFamily: "'Jost',sans-serif", fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: active ? '#D4AF37' : 'rgba(245,245,245,0.25)', background: active ? 'rgba(212,175,55,0.05)' : 'transparent', border: 'none', borderLeft: `1px solid ${active ? '#D4AF37' : 'transparent'}`, padding: '11px 14px', cursor: 'pointer', transition: 'all 0.3s', fontWeight: 300 }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'rgba(245,245,245,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'rgba(245,245,245,0.25)'; e.currentTarget.style.background = 'transparent'; } }}>
                      <span style={{ color: active ? '#D4AF37' : 'rgba(245,245,245,0.2)' }}><IconComp /></span>
                      {tab.label}
                      {tab.id === 'bookings' && stats.pending > 0 && (
                        <span style={{ marginLeft: 'auto', background: 'rgba(212,175,55,0.15)', color: '#D4AF37', fontSize: '8px', padding: '1px 6px', borderRadius: '10px', fontFamily: "'Jost',sans-serif" }}>
                          {stats.pending}
                        </span>
                      )}
                    </button>
                  );
                })}

                <button onClick={handleLogout}
                  style={{ display: 'flex', alignItems: 'center', gap: '9px', textAlign: 'left', fontFamily: "'Jost',sans-serif", fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(239, 68, 68, 0.4)', background: 'transparent', border: 'none', borderLeft: '1px solid transparent', padding: '11px 14px', cursor: 'pointer', transition: 'all 0.3s', fontWeight: 300, marginTop: '8px' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgb(248, 113, 113)'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.02)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(239, 68, 68, 0.4)'; e.currentTarget.style.background = 'transparent'; }}>
                  <span style={{ color: 'inherit' }}><Ic.logout /></span>
                  Sign Out
                </button>

                <div style={{ marginTop: '28px', paddingTop: '28px', borderTop: '1px solid rgba(212,175,55,0.06)' }}>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.2)', paddingLeft: '14px', marginBottom: '12px' }}>Quick Stats</p>
                  {[{ l: 'Pieces', v: stats.total }, { l: 'Inquiries', v: stats.inquiries }, { l: 'Collections', v: stats.cats }].map(s => (
                    <div key={s.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 14px' }}>
                      <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,245,245,0.2)', fontWeight: 300 }}>{s.l}</span>
                      <span style={{ fontFamily: "'Cinzel',serif", fontSize: '13px', color: 'rgba(212,175,55,0.55)' }}>{s.v}</span>
                    </div>
                  ))}
                </div>
              </nav>
            </aside>

            {/* Main content */}
            <main style={{ flexGrow: 1, minWidth: 0 }}>
              <AdminMainContent
                activeTab={activeTab} bookingTab={bookingTab} setBookingTab={setBookingTab}
                stats={stats} bookings={bookings} filteredBookings={filteredBookings}
                inventory={inventory} filteredInventory={filteredInventory}
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                bookingCounts={bookingCounts} handleStatusChange={handleStatusChange}
                handleDelete={handleDelete} setEditingPiece={setEditingPiece}
                setIsModalOpen={setIsModalOpen} setActiveTab={setActiveTab}
                isMobile={false} isTablet={isTablet}
              />
            </main>
          </div>
        ) : (
          /* Mobile: full-width content */
          <AdminMainContent
            activeTab={activeTab} bookingTab={bookingTab} setBookingTab={setBookingTab}
            stats={stats} bookings={bookings} filteredBookings={filteredBookings}
            inventory={inventory} filteredInventory={filteredInventory}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            bookingCounts={bookingCounts} handleStatusChange={handleStatusChange}
            handleDelete={handleDelete} setEditingPiece={setEditingPiece}
            setIsModalOpen={setIsModalOpen} setActiveTab={setActiveTab}
            isMobile={true} isTablet={isTablet}
          />
        )}
      </div>

      {/* Mobile bottom tab bar */}
      {isMobile && (
        <nav style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500,
          background: 'rgba(11,11,11,0.97)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(212,175,55,0.08)',
          display: 'flex',
        }}>
          {SIDEBAR_TABS.map(tab => {
            const active = activeTab === tab.id;
            const IconComp = Ic[tab.icon];
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '4px', padding: '12px 8px', background: 'transparent', border: 'none',
                  borderTop: `2px solid ${active ? '#D4AF37' : 'transparent'}`,
                  color: active ? '#D4AF37' : 'rgba(245,245,245,0.25)',
                  cursor: 'pointer', transition: 'all 0.25s', position: 'relative',
                }}>
                <span style={{ color: 'inherit' }}><IconComp /></span>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 300 }}>
                  {tab.label}
                </span>
                {tab.id === 'bookings' && stats.pending > 0 && (
                  <span style={{
                    position: 'absolute', top: '8px', right: 'calc(50% - 18px)',
                    background: '#D4AF37', color: '#0B0B0B', fontSize: '7px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Jost',sans-serif", fontWeight: 600,
                  }}>{stats.pending}</span>
                )}
              </button>
            );
          })}
        </nav>
      )}

      {isModalOpen && (
        <InventoryModal editingPiece={editingPiece} inventory={inventory} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
}

/* ── Extracted main content panel (shared between mobile + desktop) ── */
function AdminMainContent({
  activeTab, bookingTab, setBookingTab, stats, bookings,
  filteredBookings, inventory, filteredInventory, searchQuery,
  setSearchQuery, bookingCounts, handleStatusChange, handleDelete,
  setEditingPiece, setIsModalOpen, setActiveTab, isMobile, isTablet,
}) {
  const statCols = isMobile ? 1 : 3;

  return (
    <>
      {/* ── Dashboard ── */}
      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${statCols},1fr)`, gap: '12px' }}>
            <StatCard label="Total Pieces" value={stats.total} accent />
            <StatCard label="Active Inquiries" value={stats.inquiries} />
            <StatCard label="Collections" value={stats.cats} />
          </div>

          {/* Recent inquiries */}
          <div style={{ border: '1px solid rgba(212,175,55,0.08)', overflowX: 'auto' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(212,175,55,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '14px', letterSpacing: '2px', color: 'rgba(245,245,245,0.8)' }}>Recent Inquiries</h3>
              <button onClick={() => setActiveTab('bookings')} style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.4)', border: '1px solid rgba(212,175,55,0.12)', padding: '6px 14px', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(212,175,55,0.4)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)'; }}>
                View All
              </button>
            </div>
            {bookings.slice(-5).reverse().map(b => {
              const s = b.status?.toLowerCase() || 'pending';
              const cfg = STATUS_CFG[s] || STATUS_CFG.pending;
              return (
                <div key={b.id} style={{ padding: '13px 20px', borderBottom: '1px solid rgba(212,175,55,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '12px', color: 'rgba(245,245,245,0.65)', fontWeight: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.userName}</p>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', color: 'rgba(212,175,55,0.35)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.pieceName}</p>
                  </div>
                  <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: cfg.color, border: `1px solid ${cfg.border}`, background: cfg.bg, padding: '3px 8px', flexShrink: 0 }}>{cfg.label}</span>
                </div>
              );
            })}
            {bookings.length === 0 && <div style={{ padding: '40px', textAlign: 'center' }}><p style={{ fontFamily: "'Cinzel',serif", fontSize: '11px', letterSpacing: '3px', color: 'rgba(212,175,55,0.15)' }}>No inquiries yet</p></div>}
          </div>

          {/* Latest pieces */}
          <div style={{ border: '1px solid rgba(212,175,55,0.08)' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(212,175,55,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '14px', letterSpacing: '2px', color: 'rgba(245,245,245,0.8)' }}>Latest Pieces</h3>
              <button onClick={() => setActiveTab('inventory')} style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.4)', border: '1px solid rgba(212,175,55,0.12)', padding: '6px 14px', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(212,175,55,0.4)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)'; }}>
                Manage
              </button>
            </div>
            {inventory.slice(-5).reverse().map(p => {
              const imgSrc = p.images?.[0]?.preview || p.images?.[0]?.cloudinaryUrl || p.image;
              return (
                <div key={p._id} style={{ padding: '12px 20px', borderBottom: '1px solid rgba(212,175,55,0.04)', display: 'flex', alignItems: 'center', gap: '14px', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width: '38px', height: '38px', flexShrink: 0, overflow: 'hidden', background: '#0a0a0a', border: '1px solid rgba(212,175,55,0.1)' }}>
                    {imgSrc ? <img src={imgSrc} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(212,175,55,0.15)' }}><Ic.imgEmpty /></div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: '12px', color: 'rgba(245,245,245,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', color: 'rgba(212,175,55,0.3)', marginTop: '2px' }}>{p.category}</p>
                  </div>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: '12px', color: 'rgba(212,175,55,0.7)', flexShrink: 0 }}>{p.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Bookings ── */}
      {activeTab === 'bookings' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: isMobile ? '16px' : '19px', letterSpacing: '2px', color: 'rgba(245,245,245,0.8)', marginBottom: '16px' }}>Client Inquiries</h3>
            {/* Status tabs — scrollable on mobile */}
            <div style={{ display: 'flex', gap: '2px', borderBottom: '1px solid rgba(212,175,55,0.08)', overflowX: 'auto', paddingBottom: '0', WebkitOverflowScrolling: 'touch' }}>
              {BOOKING_TABS.map(t => {
                const active = bookingTab === t.id;
                const count = bookingCounts[t.id];
                return (
                  <button key={t.id} onClick={() => setBookingTab(t.id)}
                    style={{ background: 'transparent', border: 'none', borderBottom: `2px solid ${active ? '#D4AF37' : 'transparent'}`, padding: '10px 14px', fontFamily: "'Jost',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: active ? '#D4AF37' : 'rgba(245,245,245,0.3)', cursor: 'pointer', transition: 'all 0.25s', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '-1px', fontWeight: 300, whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(245,245,245,0.55)'; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(245,245,245,0.3)'; }}>
                    {t.label}
                    {count > 0 && (
                      <span style={{ background: active ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)', color: active ? '#D4AF37' : 'rgba(245,245,245,0.3)', fontSize: '8px', padding: '1px 5px', borderRadius: '8px' }}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table / Card list */}
          <div style={{ border: '1px solid rgba(212,175,55,0.08)', overflow: 'hidden' }}>
            {/* Column headers — desktop only */}
            {!isMobile && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.8fr 0.9fr auto', gap: '16px', padding: '12px 24px', background: 'rgba(212,175,55,0.02)', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
                {['Client', 'Piece', 'Date', 'Status', 'Actions'].map(h => (
                  <span key={h} style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)', fontWeight: 300 }}>{h}</span>
                ))}
              </div>
            )}
            {filteredBookings.length === 0
              ? <div style={{ padding: '48px', textAlign: 'center' }}><p style={{ fontFamily: "'Cinzel',serif", fontSize: '12px', letterSpacing: '3px', color: 'rgba(212,175,55,0.15)' }}>No inquiries in this category</p></div>
              : filteredBookings.map(b => <InquiryRow key={b.id} booking={b} onStatusChange={handleStatusChange} isMobile={isMobile} />)
            }
          </div>
        </div>
      )}

      {/* ── Inventory ── */}
      {activeTab === 'inventory' && (
        <div>
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'space-between', gap: '12px' }}>
            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: isMobile ? '16px' : '19px', letterSpacing: '2px', color: 'rgba(245,245,245,0.8)' }}>Boutique Inventory</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(212,175,55,0.15)', paddingBottom: '6px', flex: 1 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ color: 'rgba(212,175,55,0.3)', flexShrink: 0 }}><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" /><path d="M11 11L14 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>
                <input type="text" placeholder="Search…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ background: 'transparent', border: 'none', outline: 'none', fontFamily: "'Jost',sans-serif", fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(245,245,245,0.45)', width: '100%', fontWeight: 300 }} />
              </div>
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.25)', whiteSpace: 'nowrap' }}>{filteredInventory.length} pieces</span>
            </div>
          </div>

          {filteredInventory.length === 0
            ? (
              <div style={{ border: '1px solid rgba(212,175,55,0.08)', padding: '64px 24px', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: '12px', letterSpacing: '4px', color: 'rgba(212,175,55,0.15)', marginBottom: '16px' }}>{searchQuery ? 'No matches' : 'No pieces yet'}</p>
                {!searchQuery && (
                  <button onClick={() => { setEditingPiece({}); setIsModalOpen(true); }}
                    style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', border: '1px solid rgba(212,175,55,0.2)', padding: '10px 22px', background: 'transparent', cursor: 'pointer' }}>
                    Add First Piece
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(220px,1fr))', gap: '12px' }}>
                {filteredInventory.map(p => (
                  <InventoryCard key={p._id} piece={p}
                    onEdit={piece => { setEditingPiece(piece); setIsModalOpen(true); }}
                    onDelete={handleDelete} />
                ))}
              </div>
            )
          }
        </div>
      )}
    </>
  );
}
