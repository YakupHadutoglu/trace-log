export default function FeaturesSection() {
  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 48px' }}>

      {/* TITLE */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#FE5203', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Platform</span>
        <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-2px', color: '#FFFFFF', margin: '12px 0 16px', lineHeight: 1.05 }}>
          Everything you need<br/>to stay ahead of failures.
        </h2>
        <p style={{ fontSize: '17px', color: '#A1A1AA', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
          Logs, metrics, and alert rules — unified in one place so your team never misses what matters.
        </p>
      </div>

      {/* CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>

        {/* CARD 1 */}
        <div style={{ border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', padding: '32px' }}>
          <div style={{ width: '40px', height: '40px', border: '1px solid #27272A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', background: '#111111' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#FE5203', fontWeight: 700 }}>{'>'}_</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '-0.5px' }}>Log Ingestion</h3>
          <p style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.65, margin: 0 }}>
            Stream structured logs from PostgreSQL, MongoDB and Redis in real time. Filter by level, source, or custom fields instantly.
          </p>
        </div>

        {/* CARD 2 */}
        <div style={{ border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', padding: '32px' }}>
          <div style={{ width: '40px', height: '40px', border: '1px solid #27272A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', background: '#111111' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#10B981', fontWeight: 700 }}>~</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '-0.5px' }}>Metrics & Analytics</h3>
          <p style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.65, margin: 0 }}>
            Track query latency, connection pool usage, and error rates over time. Spot trends before they become outages.
          </p>
        </div>

        {/* CARD 3 */}
        <div style={{ border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', padding: '32px' }}>
          <div style={{ width: '40px', height: '40px', border: '1px solid #27272A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', background: '#111111' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#F59E0B', fontWeight: 700 }}>!</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '-0.5px' }}>Smart Alerts</h3>
          <p style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.65, margin: 0 }}>
            Define rules with flexible conditions. Get notified via Discord, Email or SMS the moment something breaks.
          </p>
        </div>

        {/* CARD 4 */}
        <div style={{ border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', padding: '32px' }}>
          <div style={{ width: '40px', height: '40px', border: '1px solid #27272A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', background: '#111111' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#3B82F6', fontWeight: 700 }}>{'#'}</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '-0.5px' }}>SDK Integration</h3>
          <p style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.65, margin: 0 }}>
            Drop our SDK into any Node.js project and start sending logs in under 2 minutes. Zero config required.
          </p>
        </div>

        {/* CARD 5 */}
        <div style={{ border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', padding: '32px' }}>
          <div style={{ width: '40px', height: '40px', border: '1px solid #27272A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', background: '#111111' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#A855F7', fontWeight: 700 }}>@</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '-0.5px' }}>Multi-channel Notify</h3>
          <p style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.65, margin: 0 }}>
            Fan-out alerts to Discord, Email and SMS simultaneously. Never rely on a single channel to reach your team.
          </p>
        </div>

        {/* CARD 6 */}
        <div style={{ border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', padding: '32px' }}>
          <div style={{ width: '40px', height: '40px', border: '1px solid #27272A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', background: '#111111' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#FE5203', fontWeight: 700 }}>$</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '-0.5px' }}>AES-256 Security</h3>
          <p style={{ fontSize: '14px', color: '#71717A', lineHeight: 1.65, margin: 0 }}>
            API keys encrypted at rest with AES-256-GCM. All traffic over TLS. Your data never leaves your control.
          </p>
        </div>

      </div>
    </section>
  )
}
