const dbCards = [
  { name: 'postgres-prod', color: '#3B82F6' },
  { name: 'mongo-cluster', color: '#10B981' },
  { name: 'redis-cache', color: '#EF4444' },
]

export default function RegisterLeftPanel() {
  return (
    <div style={{ background: '#0A0A0A', borderRight: '1px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-160px', left: '-160px', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(254,82,3,0.14) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
      <div style={{ width: '80%', maxWidth: '420px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {dbCards.map((card) => (
          <div key={card.name} style={{ border: '1px solid #1A1A1A', borderRadius: '10px', background: '#000000', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: card.color, display: 'block' }}></span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#FFFFFE', flex: 1 }}>{card.name}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#10B981' }}>connected</span>
          </div>
        ))}
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: '#525258', margin: '8px 0 0' }}>
          Auto-discovery finds every instance in your VPC within seconds of signup.
        </p>
      </div>
    </div>
  )
}
