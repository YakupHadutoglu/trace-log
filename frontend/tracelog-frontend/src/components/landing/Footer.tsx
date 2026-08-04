export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1A1A1A', padding: '64px 48px 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* upper part */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px' }}>

          {/* LOGO + DESCRIPTION */}
          <div style={{ maxWidth: '220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '28px', border: '1.5px solid #FE5203', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '8.5px', color: '#FE5203', letterSpacing: '0.5px' }}>LOG</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.4px', color: '#FFFFFF' }}>TraceLog</span>
            </div>
            <p style={{ fontSize: '13.5px', color: '#52525B', lineHeight: 1.65, margin: 0 }}>
              Observability infrastructure for polyglot database fleets.
            </p>
          </div>

          {/* LINKS - centered among themselves */}
          <div style={{ display: 'flex', gap: '150px', justifyContent: 'center', flex: 1, paddingLeft: '80px' }}>

            {/* PRODUCT */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', display: 'block', marginBottom: '16px' }}>Product</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>Logs</a>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>Metrics</a>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>Alerting</a>
              </div>
            </div>

            {/* DEVELOPERS */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', display: 'block', marginBottom: '16px' }}>Developers</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>Docs</a>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>API Reference</a>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>Status</a>
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', display: 'block', marginBottom: '16px' }}>Company</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>About</a>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>Careers</a>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>Blog</a>
              </div>
            </div>

            {/* LEGAL */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', display: 'block', marginBottom: '16px' }}>Legal</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>Privacy</a>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>Terms</a>
                <a href="#" style={{ fontSize: '13.5px', color: '#71717A', textDecoration: 'none' }}>Security</a>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM CORNER */}
        <div style={{ borderTop: '1px solid #1A1A1A', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#3F3F46' }}>© 2026 TraceLog, Inc. All rights reserved.</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#3F3F46' }}>status: all systems operational</span>
        </div>

      </div>
    </footer>
  )
}
