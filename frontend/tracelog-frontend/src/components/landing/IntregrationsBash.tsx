'use client'

export default function IntegrationBash() {
  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px 128px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', position: 'relative', zIndex: 1 }}>

      {/* SOL - METİN */}
      <div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#FE5203', fontWeight: 600, letterSpacing: '0.5px' }}>INTEGRATION</span>
        <h2 style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-1.5px', margin: '12px 0 20px', color: '#FFFFFF' }}>Ship it in under a minute.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            'Auto-discovery',
            'Structured JSON logs',
            'Zero-restart rule updates',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '20px', height: '20px', borderRadius: '5px', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#000', fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: '14px', color: '#FFFFFF' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - CLI */}
      <div style={{ border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', overflow: 'hidden' }}>

        {/* CLI TITLE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', borderBottom: '1px solid #1A1A1A' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#A1A1AA', marginLeft: '8px' }}>bash</span>
        </div>

        {/* CLI CONTENT */}
        <div style={{ padding: '24px 22px', fontFamily: "'JetBrains Mono', monospace", fontSize: '13.5px', lineHeight: 2 }}>
          <div>
            <span style={{ color: '#525258' }}>$ </span>
            <span style={{ color: '#D4D4D8' }}>npm install tracelog-sdk</span>
          </div>
          <div>
            <span style={{ color: '#525258' }}>$ </span>
            <span style={{ color: '#D4D4D8' }}>tracelog init --key=tl_live_••••••••</span>
          </div>
          <div style={{ color: '#10B981' }}>✓ Connected to postgres://prod-primary:5432</div>
          <div style={{ color: '#10B981' }}>✓ Connected to mongodb://cluster-01.internal</div>
          <div style={{ color: '#10B981' }}>✓ Connected to redis://cache-eu-west-1:6379</div>
          <div style={{ color: '#F59E0B' }}>⚠ slow query detected: 812ms on orders.idx_created_at</div>
          <div>
            <span style={{ color: '#525258' }}>$ </span>
            <span style={{ color: '#D4D4D8' }}>_</span>
            <style>{`
              @keyframes blink {
                0%, 49% { opacity: 1; }
                50%, 100% { opacity: 0; }
              }
              .cursor-blink {
                animation: blink 1s step-end infinite;
                color: #FE5203;
              }
            `}</style>
            <span className="cursor-blink">▍</span>
          </div>
        </div>

      </div>
    </section>
  )
}
