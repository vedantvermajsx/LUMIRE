import React from 'react';

export default function StatCard({ label, value, accent }) {
  return (
    <div style={{ padding:'28px 32px', border:`1px solid ${accent ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.08)'}`, background: accent ? 'rgba(212,175,55,0.03)' : 'rgba(212,175,55,0.01)', position:'relative', overflow:'hidden', transition:'all 0.35s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(212,175,55,0.25)'; e.currentTarget.style.background='rgba(212,175,55,0.04)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=accent ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.08)'; e.currentTarget.style.background=accent ? 'rgba(212,175,55,0.03)' : 'rgba(212,175,55,0.01)'; }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.12),transparent)' }}/>
      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(212,175,55,0.4)', fontWeight:300, marginBottom:'14px' }}>{label}</div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:'44px', color:'rgba(245,245,245,0.9)', lineHeight:1, fontWeight:400 }}>{value}</div>
    </div>
  );
}
