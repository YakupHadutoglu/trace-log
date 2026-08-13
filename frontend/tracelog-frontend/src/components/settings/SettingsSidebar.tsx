const navItems = [
  { label: 'Profile', active: false },
  { label: 'Security', active: true },
  { label: 'Connections', active: false },
  { label: 'Billing', active: false },
  { label: 'Team', active: false },
]

export default function SettingsSidebar() {
  return (
    <>
      <style>{`
        .tl-navitem { transition: color 140ms ease, background 140ms ease; }
        .tl-navitem:hover { color: #FFFFFE !important; background: #0A0A0A; }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#525258', letterSpacing: '0.5px', margin: '0 0 8px 12px' }}>SETTINGS</span>
        {navItems.map((item) => (
          <a key={item.label} href="#" className="tl-navitem" style={{ padding: '9px 12px', borderRadius: '7px', fontSize: '13.5px', color: item.active ? '#FFFFFE' : '#A1A1AA', background: item.active ? '#0A0A0A' : 'transparent', textDecoration: 'none' }}>
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}
