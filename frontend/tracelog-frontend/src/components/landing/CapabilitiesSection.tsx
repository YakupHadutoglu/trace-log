
'use client'

export default function CapabilitiesSection() {
  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 48px', position: 'relative', zIndex: 1 }}>

      {/* TITLE */}
      <div style={{ marginBottom: '48px', maxWidth: '600px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#FE5203', fontWeight: 600, letterSpacing: '0.5px' }}>CAPABILITIES</span>
        <h2 style={{ fontSize: '44px', fontWeight: 700, letterSpacing: '-1.8px', margin: '12px 0 0', color: '#FFFFFF' }}>Built for polyglot infrastructure.</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>

        {/* LARGE CARD - Polyglot Persistence */}
        <div style={{ gridColumn: 'span 4', background: '#0A0A0A', padding: '32px', display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'space-between', minHeight: '280px', border: '1px solid #1A1A1A', borderRadius: '14px' }}>
          <div style={{ maxWidth: '280px' }}>
            <h3 style={{ fontSize: '21px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.4px', color: '#FFFFFF' }}>Polyglot Persistence</h3>
            <p style={{ fontSize: '14.5px', color: '#71717A', lineHeight: 1.6, margin: 0 }}>Native connectors for PostgreSQL, MongoDB and Redis stream into one unified schema — no adapters, no data loss.</p>
          </div>

          {/* DIAGRAM */}
          <div style={{ position: 'relative', width: '200px', height: '200px', flexShrink: 0 }}>
            <style>{`
              @keyframes orbitPulse {
                0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.85); }
              }
            `}</style>
            {/* LINES */}
            <div style={{ position: 'absolute', left: '100px', top: '100px', width: '80px', height: '2px', background: 'linear-gradient(90deg, #FE5203, transparent)', transformOrigin: 'left center', transform: 'rotate(-90deg)' }}></div>
            <div style={{ position: 'absolute', left: '100px', top: '100px', width: '85px', height: '2px', background: 'linear-gradient(90deg, #FE5203, transparent)', transformOrigin: 'left center', transform: 'rotate(139.8deg)' }}></div>
            <div style={{ position: 'absolute', left: '100px', top: '100px', width: '85px', height: '2px', background: 'linear-gradient(90deg, #FE5203, transparent)', transformOrigin: 'left center', transform: 'rotate(40.2deg)' }}></div>

            {/* PG */}
            <div style={{ position: 'absolute', left: '100px', top: '20px', transform: 'translate(-50%, -50%)', width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #3B82F6', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '11px', color: '#3B82F6', animation: 'orbitPulse 3s ease-in-out infinite' }}>PG</div>

            {/* MG */}
            <div style={{ position: 'absolute', left: '35px', top: '155px', transform: 'translate(-50%, -50%)', width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #10B981', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '11px', color: '#10B981', animation: 'orbitPulse 3s ease-in-out infinite', animationDelay: '0.4s' }}>MG</div>

            {/* RD */}
            <div style={{ position: 'absolute', left: '165px', top: '155px', transform: 'translate(-50%, -50%)', width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #EF4444', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '11px', color: '#EF4444', animation: 'orbitPulse 3s ease-in-out infinite', animationDelay: '0.8s' }}>RD</div>

            {/* LOG - Merkez */}
            <div style={{ position: 'absolute', left: '100px', top: '100px', transform: 'translate(-50%, -50%)', width: '64px', height: '64px', borderRadius: '14px', border: '1.5px solid #FE5203', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '13px', color: '#FE5203' }}>LOG</div>
          </div>
        </div>

        {/* Smart Alarm Rules */}
        <div style={{ gridColumn: 'span 2', background: '#0A0A0A', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px', border: '1px solid #1A1A1A', borderRadius: '14px' }}>
          <div>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', color: '#F59E0B' }}>!</span>
            </div>
            <h3 style={{ fontSize: '21px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.4px', color: '#FFFFFF' }}>Smart Alarm Rules</h3>
            <p style={{ fontSize: '14.5px', color: '#71717A', lineHeight: 1.6, margin: 0 }}>Threshold, anomaly or composite rules, routed in milliseconds.</p>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div style={{ gridColumn: 'span 2', background: '#0A0A0A', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '240px', border: '1px solid #1A1A1A', borderRadius: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', color: '#10B981' }}>↗</span>
          </div>
          <div>
            <h3 style={{ fontSize: '21px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.4px', color: '#FFFFFF' }}>Real-time Metrics</h3>
            <p style={{ fontSize: '14.5px', color: '#71717A', lineHeight: 1.6, margin: 0 }}>Sub-second dashboards for QPS, latency and replication lag.</p>
          </div>
        </div>

        {/* Query Language */}
        <div style={{ gridColumn: 'span 2', background: '#0A0A0A', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '240px', border: '1px solid #1A1A1A', borderRadius: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', color: '#FFFFFF' }}>◈</span>
          </div>
          <div>
            <h3 style={{ fontSize: '21px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.4px', color: '#FFFFFF' }}>Query Language</h3>
            <p style={{ fontSize: '14.5px', color: '#71717A', lineHeight: 1.6, margin: 0 }}>One syntax across all three engines to filter, aggregate, correlate.</p>
          </div>
        </div>

        {/* Zero-Trust Ingest */}
        <div style={{ gridColumn: 'span 2', background: '#0A0A0A', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '240px', border: '1px solid #1A1A1A', borderRadius: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', color: '#EF4444' }}>▲</span>
          </div>
          <div>
            <h3 style={{ fontSize: '21px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.4px', color: '#FFFFFF' }}>Zero-Trust Ingest</h3>
            <p style={{ fontSize: '14.5px', color: '#71717A', lineHeight: 1.6, margin: 0 }}>mTLS agents, scoped keys, full audit trail on every event.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
