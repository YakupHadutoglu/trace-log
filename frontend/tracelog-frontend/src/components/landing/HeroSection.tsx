export default function HeroSection() {
  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 48px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>

      {/* BADGE */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #27272A', background: '#0A0A0A', borderRadius: '20px', padding: '6px 14px', marginBottom: '24px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'block' }}></span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#A1A1AA' }}>v1.0 — Now in Beta</span>
      </div>

      {/* TITLE */}
      <h1 style={{ fontSize: '80px', lineHeight: 0.98, fontWeight: 800, letterSpacing: '-4px', margin: '0 0 24px', maxWidth: '920px', color: '#FFFFFF' }}>
        Observability for<br/>every database you run.
      </h1>

      {/* DESCRIPTION */}
      <p style={{ fontSize: '19px', lineHeight: 1.6, color: '#A1A1AA', maxWidth: '600px', margin: '0 0 32px', fontWeight: 400, letterSpacing: '-0.1px' }}>
        TraceLog unifies logs, metrics, and alerting across PostgreSQL, MongoDB, and Redis — one pane of glass, zero blind spots.
      </p>

      {/* BUTTONS */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <a href="/register" style={{ background: '#FE5203', color: '#FFFFFE', fontSize: '15px', fontWeight: 600, padding: '13px 24px', borderRadius: '7px', textDecoration: 'none' }}>Start Tracing — Free</a>
        <a href="#demo" style={{ background: 'transparent', color: '#FFFFFF', fontSize: '15px', fontWeight: 600, padding: '13px 24px', borderRadius: '7px', border: '1px solid #27272A', textDecoration: 'none' }}>Watch Demo</a>
      </div>

      {/* BOTTOM TEXT */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '72px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: '#52525B', letterSpacing: '0.3px' }}>Built for scale</span>
        <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: '#52525B', letterSpacing: '0.3px' }}>No vendor lock-in</span>
        <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#27272A', display: 'block' }}></span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: '#52525B', letterSpacing: '0.3px' }}>Open source SDK</span>
      </div>

    </section>
  )
}
