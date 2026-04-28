import { Ic, STATUS_CFG } from './AdminCommon';

export default function InquiryRow({ booking, onStatusChange, isMobile }) {
  const status = booking.status?.toLowerCase() || 'pending';
  const cfg = STATUS_CFG[status] || STATUS_CFG.pending;

  const actions = {
    pending:   [{ key:'accepted', label:'Accept',  icon:'check', color:'rgba(74,222,128,0.75)', hov:'rgba(74,222,128,1)'  },
                { key:'rejected', label:'Reject',  icon:'x',     color:'rgba(239,68,68,0.6)',   hov:'rgba(239,68,68,0.9)' }],
    accepted:  [{ key:'delivered',label:'Delivered', icon:'truck', color:'rgba(147,197,253,0.7)', hov:'rgba(147,197,253,1)' },
                { key:'rejected', label:'Reject',  icon:'x',     color:'rgba(239,68,68,0.5)',   hov:'rgba(239,68,68,0.8)' }],
    delivered: [],
    rejected:  [],
  }[status] || [];

  /* ── Mobile: card layout ── */
  if (isMobile) {
    return (
      <div style={{
        borderBottom:'1px solid rgba(212,175,55,0.05)',
        padding:'16px 20px',
        transition:'background 0.15s',
      }}>
        {/* Top row: client + status */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'12px', marginBottom:'8px' }}>
          <div style={{ minWidth:0 }}>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'13px', color:'rgba(245,245,245,0.7)', fontWeight:300 }}>{booking.userName}</p>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', color:'rgba(245,245,245,0.25)', marginTop:'2px' }}>{booking.userPhone}</p>
            {booking.userEmail && <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', color:'rgba(212,175,55,0.3)', marginTop:'1px' }}>{booking.userEmail}</p>}
          </div>
          <span style={{ flexShrink:0, fontFamily:"'Jost',sans-serif", fontSize:'8px', letterSpacing:'1.5px', textTransform:'uppercase', color:cfg.color, border:`1px solid ${cfg.border}`, background:cfg.bg, padding:'4px 10px' }}>
            {cfg.label}
          </span>
        </div>

        {/* Piece + date */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'8px', marginBottom: actions.length ? '12px' : '0' }}>
          <a href={booking.url} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"'Cinzel',serif", fontSize:'11px', color:'rgba(212,175,55,0.7)', textDecoration:'none', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {booking.pieceName}
          </a>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', color:'rgba(245,245,245,0.2)', flexShrink:0 }}>
            {new Date(booking.timestamp).toLocaleDateString('en-GB', { day:'numeric', month:'short' })}
          </p>
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {actions.map(act => {
              const ActionIcon = Ic[act.icon];
              return (
                <button key={act.key}
                  onClick={() => onStatusChange(booking._id || booking.id, act.key)}
                  style={{ display:'flex', alignItems:'center', gap:'5px', padding:'7px 14px', border:`1px solid ${act.color}`, background:'transparent', color:act.color, cursor:'pointer', transition:'all 0.2s', fontFamily:"'Jost',sans-serif", fontSize:'8px', letterSpacing:'1.5px', textTransform:'uppercase', flex:1 }}
                  onMouseEnter={e => { e.currentTarget.style.color=act.hov; e.currentTarget.style.borderColor=act.hov; e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color=act.color; e.currentTarget.style.borderColor=act.color; e.currentTarget.style.background='transparent'; }}>
                  <ActionIcon /> {act.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* ── Desktop: original grid row ── */
  return (
    <div style={{ borderBottom:'1px solid rgba(212,175,55,0.05)', transition:'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background='rgba(212,175,55,0.015)'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr 0.8fr 0.9fr auto', alignItems:'center', gap:'16px', padding:'14px 24px' }}>
        {/* Client */}
        <div>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'13px', color:'rgba(245,245,245,0.7)', fontWeight:300 }}>{booking.userName}</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'2px', marginTop:'2px' }}>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', color:'rgba(245,245,245,0.25)' }}>{booking.userPhone}</p>
            {booking.userEmail && <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', color:'rgba(212,175,55,0.3)' }}>{booking.userEmail}</p>}
          </div>
        </div>
        {/* Piece */}
        <div>
          <a href={booking.url} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"'Cinzel',serif", fontSize:'12px', color:'rgba(212,175,55,0.7)', textDecoration:'none', transition:'color 0.15s' }}
            onMouseEnter={e => e.target.style.color='#D4AF37'}
            onMouseLeave={e => e.target.style.color='rgba(212,175,55,0.7)'}>
            {booking.pieceName}
          </a>
        </div>
        {/* Date */}
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'10px', color:'rgba(245,245,245,0.2)' }}>
          {new Date(booking.timestamp).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
        </p>
        {/* Status badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:'5px', padding:'4px 10px', border:`1px solid ${cfg.border}`, background:cfg.bg, width:'fit-content' }}>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'8px', letterSpacing:'1.5px', textTransform:'uppercase', color:cfg.color, fontWeight:400 }}>
            {cfg.label}
          </span>
        </div>
        {/* Actions */}
        <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
          {actions.map(act => {
            const ActionIcon = Ic[act.icon];
            return (
              <button key={act.key}
                onClick={() => onStatusChange(booking._id || booking.id, act.key)}
                title={act.label}
                style={{ display:'flex', alignItems:'center', gap:'5px', padding:'6px 10px', border:`1px solid ${act.color}`, background:'transparent', color:act.color, cursor:'pointer', transition:'all 0.2s', fontFamily:"'Jost',sans-serif", fontSize:'8px', letterSpacing:'1.5px', textTransform:'uppercase' }}
                onMouseEnter={e => { e.currentTarget.style.color=act.hov; e.currentTarget.style.borderColor=act.hov; e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.color=act.color; e.currentTarget.style.borderColor=act.color; e.currentTarget.style.background='transparent'; }}>
                <ActionIcon /> {act.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
