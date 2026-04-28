function SkeletonCard() {
    return (
        <div style={{
            background: '#141414', border: '1px solid rgba(212,175,55,0.06)',
            padding: '48px 40px', animation: 'pulse 1.8s ease-in-out infinite',
        }}>
            {[70, 35, 20, 15, 55, 100, 75].map((w, i) => (
                <div key={i} style={{
                    height: i === 0 ? '18px' : '11px', width: w + '%',
                    background: 'rgba(212,175,55,0.04)', marginBottom: i === 6 ? 0 : '18px',
                }} />
            ))}
        </div>
    );
}

export default SkeletonCard;