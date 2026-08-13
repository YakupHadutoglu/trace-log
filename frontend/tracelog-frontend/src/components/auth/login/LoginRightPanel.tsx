const visualLines = [
  { level: 'INFO', levelColor: '#A1A1AA', msg: 'connection pool acquired db=postgres-prod' },
  { level: 'WARN', levelColor: '#F59E0B', msg: 'slow query 812ms on orders table' },
  { level: 'INFO', levelColor: '#A1A1AA', msg: 'replica lag 0.2s node=replica-02' },
  { level: 'ERROR', levelColor: '#EF4444', msg: 'ETIMEDOUT writing to redis cache-eu' },
  { level: 'INFO', levelColor: '#A1A1AA', msg: 'mongo bulkWrite acked n=512' },
  { level: 'INFO', levelColor: '#A1A1AA', msg: 'rule qps_spike -> routed to pagerduty' },
  { level: 'INFO', levelColor: '#A1A1AA', msg: 'checkpoint flushed wal_size=64MB' },
]

export default function LoginRightPanel() {
  return (
    <div style={{ background: '#0A0A0A', borderLeft: '1px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-160px', right: '-160px', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(254,82,3,0.14) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>

      <div style={{ width: '80%', maxWidth: '420px', border: '1px solid #1A1A1A', borderRadius: '12px', background: '#000000', overflow: 'hidden', boxShadow: '0 60px 120px -30px rgba(254,82,3,0.15)', position: 'relative', zIndex: 1 }}>

        {/* TERMINAL BAŞLIK */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #1A1A1A' }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#A1A1AA', marginLeft: '6px' }}>production-cluster</span>
        </div>

        {/* LOG SATIRLARI */}
        <div style={{ padding: '18px' }}>
          {visualLines.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', padding: '5px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', borderBottom: '1px solid #141414' }}>
              <span style={{ color: line.levelColor, fontWeight: 700, width: '40px', flexShrink: 0 }}>{line.level}</span>
              <span style={{ color: '#D4D4D8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{line.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
