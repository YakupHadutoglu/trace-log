export default function Navbar() {
	return (
        	<nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: '64px', borderBottom: '1px solid #1A1A1A', position: 'sticky', top: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', zIndex: 50 }}>

            	{/* LOGO */}
    			<div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        			<div style={{ width: '28px', height: '28px', border: '1.5px solid #FE5203', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A' }}>
                		<span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '8.5px', color: '#FE5203', letterSpacing: '0.5px' }}>LOG</span>
            		</div>
                	<span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.4px', color: '#FFFFFF' }}>TraceLog</span>
            	</div>

            	{/* NAV LİNK */}
            	<div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                	<a href="#product" style={{ color: '#A1A1AA', fontSize: '13.5px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Product</a>
                	<a href="#features" style={{ color: '#A1A1AA', fontSize: '13.5px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Features</a>
                	<a href="#docs" style={{ color: '#A1A1AA', fontSize: '13.5px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Docs</a>
                	<a href="#pricing" style={{ color: '#A1A1AA', fontSize: '13.5px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Pricing</a>
            	</div>

            	{/* BUTTON */}
            	<div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                	<a href="/login" style={{ color: '#FFFFFF', fontSize: '13.5px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>Log in</a>
                	<a href="/register" style={{ background: '#FE5203', color: '#FFFFFE', fontSize: '13.5px', fontWeight: 600, padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>Get Started</a>
            	</div>
        	</nav>
	)
}
