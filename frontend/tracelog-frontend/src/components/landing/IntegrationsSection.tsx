const integrations = [
  { name: 'Node.js', glyph: 'JS', color: '#10B981' },
  { name: 'Python', glyph: 'PY', color: '#3B82F6' },
  { name: 'Go', glyph: 'GO', color: '#06B6D4' },
  { name: 'Java', glyph: 'JV', color: '#F59E0B' },
  { name: 'Docker', glyph: 'DK', color: '#71717A' },
  { name: 'Kubernetes', glyph: 'K8S', color: '#71717A' },
  { name: 'Terraform', glyph: 'TF', color: '#EF4444' },
  { name: 'GH Actions', glyph: 'GH', color: '#71717A' },
]

export default function IntegrationsSection() {
  return (
    <section style={{ borderTop: '1px solid #1A1A1A', padding: '96px 48px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* BAŞLIK */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#FE5203', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Integrations</span>
          <h2 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-1.5px', color: '#FFFFFF', margin: '12px 0 14px', lineHeight: 1.1 }}>
            Works with your stack.
          </h2>
          <p style={{ fontSize: '16px', color: '#71717A', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6 }}>
            Native SDKs and connectors for the tools your team already uses.
          </p>
        </div>

        {/* ICONS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          {integrations.map((item) => (
            <div key={item.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '24px 32px', border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', minWidth: '100px' }}>
              <div style={{ width: '44px', height: '44px', border: '1px solid #27272A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111111' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 700, color: item.color, letterSpacing: '0.5px' }}>{item.glyph}</span>
              </div>
              <span style={{ fontSize: '13px', color: '#A1A1AA', fontWeight: 500, whiteSpace: 'nowrap' }}>{item.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
