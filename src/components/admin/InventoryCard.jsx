import { useState } from 'react';
import { Ic } from './AdminCommon';

export default function InventoryCard({ piece, onEdit, onDelete }) {
  const [hov, setHov] = useState(false);
  const images = piece.images?.length
    ? piece.images
    : piece.image ? [{ preview: piece.image, status: 'uploaded' }] : [];
  const primaryImg = images[0];
  const imgSrc = primaryImg?.preview || primaryImg?.cloudinaryUrl || (typeof primaryImg === 'string' ? primaryImg : '');

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ border:`1px solid ${hov ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.07)'}`, background: hov ? '#161616' : 'rgba(212,175,55,0.01)', transition:'all 0.35s', overflow:'hidden' }}>

      {/* Image */}
      <div style={{ position:'relative', height:'150px', background:'#0a0a0a', overflow:'hidden' }}>
        {imgSrc
          ? <img src={imgSrc} alt={piece.name} style={{ width:'100%', height:'100%', objectFit:'cover', opacity: hov ? 0.88 : 0.6, transform: hov ? 'scale(1.05)' : 'scale(1)', transition:'all 0.65s' }} />
          : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(212,175,55,0.1)' }}><Ic.imgEmpty /></div>
        }
        {images.length > 1 && (
          <div style={{ position:'absolute', bottom:6, right:6, background:'rgba(0,0,0,0.72)', border:'1px solid rgba(212,175,55,0.2)', fontFamily:"'Jost',sans-serif", fontSize:'7px', letterSpacing:'1.5px', color:'rgba(212,175,55,0.6)', padding:'2px 7px' }}>
            +{images.length - 1}
          </div>
        )}
        <div style={{ position:'absolute', top:6, left:6, background:'rgba(0,0,0,0.72)', border:'1px solid rgba(212,175,55,0.15)', fontFamily:"'Jost',sans-serif", fontSize:'7px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(212,175,55,0.65)', padding:'2px 7px' }}>
          {piece.category}
        </div>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, #0B0B0B, transparent 55%)' }}/>
      </div>

      {/* Body */}
      <div style={{ padding:'14px 16px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'8px', marginBottom:'8px' }}>
          <div style={{ minWidth:0 }}>
            <h4 style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'rgba(245,245,245,0.9)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginBottom:'2px' }}>{piece.name}</h4>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'8px', letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(212,175,55,0.3)', fontWeight:300, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{piece.material}</p>
          </div>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:'12px', color:'#D4AF37', flexShrink:0 }}>{piece.price}</span>
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'3px', marginBottom:'12px' }}>
          {piece.stones?.slice(0,3).map(s => (
            <span key={s} style={{ fontFamily:"'Jost',sans-serif", fontSize:'7px', letterSpacing:'1px', textTransform:'uppercase', color:'rgba(212,175,55,0.3)', border:'1px solid rgba(212,175,55,0.1)', padding:'2px 6px', fontWeight:300 }}>{s}</span>
          ))}
        </div>

        <div style={{ display:'flex', gap:'6px', paddingTop:'10px', borderTop:'1px solid rgba(212,175,55,0.05)' }}>
          <button onClick={() => onEdit(piece)}
            style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'5px', fontFamily:"'Jost',sans-serif", fontSize:'8px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(245,245,245,0.3)', border:'1px solid rgba(212,175,55,0.08)', padding:'8px', background:'transparent', cursor:'pointer', transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color='#D4AF37'; e.currentTarget.style.borderColor='rgba(212,175,55,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='rgba(245,245,245,0.3)'; e.currentTarget.style.borderColor='rgba(212,175,55,0.08)'; }}>
            <Ic.edit /> Edit
          </button>
          <button onClick={() => onDelete(piece._id)}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(239,68,68,0.4)', border:'1px solid rgba(239,68,68,0.08)', padding:'8px 12px', background:'transparent', cursor:'pointer', transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color='rgb(248,113,113)'; e.currentTarget.style.borderColor='rgba(239,68,68,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='rgba(239,68,68,0.4)'; e.currentTarget.style.borderColor='rgba(239,68,68,0.08)'; }}>
            <Ic.trash />
          </button>
        </div>
      </div>
    </div>
  );
}
