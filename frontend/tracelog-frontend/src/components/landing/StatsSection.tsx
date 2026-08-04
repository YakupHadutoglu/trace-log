export default function StatsSection() {
  return (
    <section style={{ borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', padding: '48px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0' }}>

        {/* STAT 1 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 48px', borderRight: '1px solid #1A1A1A' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '36px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-1.5px' }}>1.2B+</span>
          <span style={{ fontSize: '13px', color: '#52525B', marginTop: '6px', letterSpacing: '0.2px' }}>Logs ingested daily</span>
        </div>

        {/* STAT 2 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 48px', borderRight: '1px solid #1A1A1A' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '36px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-1.5px' }}>{'<'}2ms</span>
          <span style={{ fontSize: '13px', color: '#52525B', marginTop: '6px', letterSpacing: '0.2px' }}>Avg query latency</span>
        </div>

        {/* STAT 3 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 48px', borderRight: '1px solid #1A1A1A' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '36px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-1.5px' }}>4,200+</span>
          <span style={{ fontSize: '13px', color: '#52525B', marginTop: '6px', letterSpacing: '0.2px' }}>Teams monitoring</span>
        </div>

        {/* STAT 4 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 48px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '36px', fontWeight: 700, color: '#FE5203', letterSpacing: '-1.5px' }}>99.99%</span>
          <span style={{ fontSize: '13px', color: '#52525B', marginTop: '6px', letterSpacing: '0.2px' }}>Uptime SLA</span>
        </div>

      </div>
    </section>
  )
}
