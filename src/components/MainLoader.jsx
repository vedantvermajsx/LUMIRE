function MainLoader({ visible }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, background: '#0B0B0B',
            zIndex: 99999, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '24px',
            transition: 'opacity 0.8s, visibility 0.8s',
            opacity: visible ? 1 : 0,
            visibility: visible ? 'visible' : 'hidden',
            pointerEvents: visible ? 'auto' : 'none',
        }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: '20px', letterSpacing: '12px', color: '#D4AF37', fontWeight: 400 }}>
                EIRA
            </div>
            <div style={{ width: '240px', height: '1px', background: 'rgba(212,175,55,0.08)' }}>
                <div id="ld-bar" style={{ height: '100%', background: '#D4AF37', width: '0%', transition: 'width 0.15s', boxShadow: '0 0 10px rgba(212,175,55,0.5)' }} />
            </div>
            <div id="ld-pct" style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: 'rgba(212,175,55,0.3)', letterSpacing: '4px', fontWeight: 300 }}>0%</div>
        </div>
    );
}

export default MainLoader;