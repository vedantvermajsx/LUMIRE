import React from 'react';

export const Ic = {
  dashboard: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  bookings:  () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>,
  inventory: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9" y1="14.5" x2="15" y2="14.5"/></svg>,
  upload:    () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  trash:     () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  edit:      () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  close:     () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus:      () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  imgEmpty:  () => <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>,
  cloud:     () => <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
  check:     () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>,
  x:         () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  truck:     () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  chevL:     () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15,18 9,12 15,6"/></svg>,
  chevR:     () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9,18 15,12 9,6"/></svg>,
  logout:    () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

export const S = {
  label:  { fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(212,175,55,0.4)', fontWeight:300, display:'block', marginBottom:'8px' },
  input:  { width:'100%', background:'rgba(212,175,55,0.02)', border:'1px solid rgba(212,175,55,0.1)', color:'rgba(245,245,245,0.8)', fontFamily:"'Jost',sans-serif", fontSize:'12px', letterSpacing:'1px', padding:'11px 14px', outline:'none', transition:'all 0.2s' },
  ghost:  (active) => ({ background:'transparent', border:'none', cursor:'pointer', fontFamily:"'Jost',sans-serif", transition:'all 0.2s', ...(active ? { color:'#D4AF37' } : { color:'rgba(245,245,245,0.25)' }) }),
};

export const focusStyle = { borderColor:'rgba(212,175,55,0.3)', background:'rgba(212,175,55,0.04)' };

export const STATUS_CFG = {
  pending:   { label:'Pending',    color:'rgba(212,175,55,0.7)',  bg:'rgba(212,175,55,0.08)',  border:'rgba(212,175,55,0.2)'  },
  accepted:  { label:'Accepted',   color:'rgba(74,222,128,0.85)', bg:'rgba(74,222,128,0.07)',  border:'rgba(74,222,128,0.2)'  },
  rejected:  { label:'Rejected',   color:'rgba(239,68,68,0.7)',   bg:'rgba(239,68,68,0.07)',   border:'rgba(239,68,68,0.2)'   },
  delivered: { label:'Delivered',  color:'rgba(147,197,253,0.8)', bg:'rgba(147,197,253,0.07)', border:'rgba(147,197,253,0.2)' },
};

export const BOOKING_TABS = [
  { id:'all',       label:'All'       },
  { id:'pending',   label:'Pending'   },
  { id:'accepted',  label:'Accepted'  },
  { id:'delivered', label:'Delivered' },
  { id:'rejected',  label:'Rejected'  },
];

export const CATEGORIES = [
  'Rings',
  'Necklaces',
  'Bracelets',
  'Earrings',
  'Sets',
  'Pendants',
  'Watches',
  'Bespoke'
];

export const MATERIALS = [
  '18K White Gold',
  '18K Yellow Gold',
  '18K Rose Gold',
  '24K Gold Vermeil',
  'Platinum',
  'Oxidised Platinum',
  'Sterling Silver',
  'Custom...'
];
