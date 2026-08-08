'use client'

import { useEffect, useRef } from 'react'

export default function PipelineSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let tick = 0
    let frame: number

    const draw = () => {
      ctx.clearRect(0, 0, 88, 88)

      // Dönen halka
      const cx = 44, cy = 44, r = 38
      ctx.beginPath()
      ctx.arc(cx, cy, r, tick * 0.02, tick * 0.02 + Math.PI * 1.5)
      ctx.strokeStyle = '#FE5203'
      ctx.lineWidth = 1.5
      ctx.globalAlpha = 0.5
      ctx.stroke()
      ctx.globalAlpha = 1

      // Küçük dot
      const dotAngle = tick * 0.02 + Math.PI * 1.5
      ctx.beginPath()
      ctx.arc(cx + Math.cos(dotAngle) * r, cy + Math.sin(dotAngle) * r, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#FE5203'
      ctx.fill()

      tick++
      frame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(frame)
  }, [])

  const nodeBox = (label: string, color: string, size = 40) => ({
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '10px',
    border: `1px solid #27272A`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 700,
    fontSize: '12px',
    color,
  } as React.CSSProperties)

  const arrow = (delay: string, fade = false) => (
    <div style={{ flex: 1, maxWidth: '90px', height: '1px', background: fade ? 'linear-gradient(90deg, #27272A, #27272A)' : 'linear-gradient(90deg, #27272A, #FE5203)', position: 'relative' }}>
      <span style={{ position: 'absolute', right: '-1px', top: '-4px', color: fade ? '#27272A' : '#FE5203', fontSize: '10px' }}>▶</span>
      <style>{`
        @keyframes flowDot {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .flow-dot {
          position: absolute;
          top: -3px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FE5203;
          animation: flowDot 2s linear infinite;
        }
      `}</style>
      <span className="flow-dot" style={{ animationDelay: delay }}></span>
    </div>
  )

  return (
    <>
      {/* PIPELINE */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px 128px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#FE5203', fontWeight: 600, letterSpacing: '0.5px' }}>PIPELINE</span>
          <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-1.4px', margin: '12px 0 0', color: '#FFFFFF' }}>From write to alert in milliseconds.</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #1A1A1A', borderRadius: '16px', background: '#0A0A0A', padding: '48px 32px' }}>

          {/* Your Databases */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '150px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={nodeBox('PG', '#3B82F6')}>PG</span>
              <span style={nodeBox('MG', '#10B981')}>MG</span>
              <span style={nodeBox('RD', '#EF4444')}>RD</span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>Your Databases</span>
          </div>

          {arrow('0s')}

          {/* mTLS Agent */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '140px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', border: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '11px', color: '#71717A' }}>AGENT</div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>mTLS Agent</span>
          </div>

          {arrow('0.7s')}

          {/* TraceLog Core */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '150px' }}>
            <div style={{ position: 'relative', width: '88px', height: '88px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <canvas ref={canvasRef} width={88} height={88} style={{ position: 'absolute', inset: 0, borderRadius: '50%' }} />
              <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '16px', border: '1.5px solid #FE5203', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '13px', color: '#FE5203', background: '#000000', zIndex: 1 }}>LOG</div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>TraceLog Core</span>
          </div>

          {arrow('1.4s')}

          {/* Rules Engine */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '140px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', border: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#F59E0B' }}>!</div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>Rules Engine</span>
          </div>

          {arrow('2.1s', true)}

          {/* Your Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '150px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={nodeBox('SLK', '#71717A')}>SLK</span>
              <span style={nodeBox('PD', '#71717A')}>PD</span>
              <span style={nodeBox('WHK', '#71717A')}>WHK</span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>Your Channels</span>
          </div>

        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 48px 128px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <span style={{ fontSize: '56px', color: '#FE5203', lineHeight: 1, fontFamily: "'JetBrains Mono', monospace" }}></span>
        <p style={{ fontSize: '26px', fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1.4, color: '#FFFFFF', margin: '0 0 24px' }}>
          We cut incident triage time from twenty minutes to under two. TraceLog is the first tool that treats Postgres, Mongo and Redis as one system, not three.
        </p>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#71717A' }}>— Staff Site Reliability Engineer, Series C fintech</span>
      </section>
    </>
  )
}
