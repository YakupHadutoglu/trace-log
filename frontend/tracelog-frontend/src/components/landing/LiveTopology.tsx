'use client'

import { useEffect, useRef } from 'react'

const nodeData = [
  { x: 0.12, y: 0.25, color: '#3B82F6' },
  { x: 0.25, y: 0.65, color: '#10B981' },
  { x: 0.38, y: 0.18, color: '#EF4444' },
  { x: 0.18, y: 0.82, color: '#3B82F6' },
  { x: 0.72, y: 0.22, color: '#EF4444' },
  { x: 0.88, y: 0.58, color: '#3B82F6' },
  { x: 0.78, y: 0.78, color: '#10B981' },
  { x: 0.62, y: 0.88, color: '#EF4444' },
  { x: 0.08, y: 0.48, color: '#10B981' },
  { x: 0.32, y: 0.42, color: '#FE5203' },
  { x: 0.92, y: 0.32, color: '#10B981' },
  { x: 0.55, y: 0.12, color: '#3B82F6' },
  { x: 0.45, y: 0.72, color: '#FE5203' },
  { x: 0.82, y: 0.42, color: '#EF4444' },
  { x: 0.15, y: 0.42, color: '#FE5203' },
  { x: 0.68, y: 0.55, color: '#3B82F6' },
  { x: 0.42, y: 0.92, color: '#10B981' },
  { x: 0.95, y: 0.15, color: '#EF4444' },
]

export default function LiveTopology() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles = nodeData.map((_, i) => ({
      nodeIndex: i,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.003,
    }))

    let frame: number
    let tick = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height),
      }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -999, y: -999 } }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const cx = 0.5 * W
      const cy = 0.5 * H
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const hoverRadius = W * 0.18

      nodeData.forEach((node) => {
        const nx = node.x * W
        const ny = node.y * H
        const distToMouse = Math.hypot(nx - mx, ny - my)
        const inHover = distToMouse < hoverRadius
        const alpha = inHover
          ? 0.4 + (1 - distToMouse / hoverRadius) * 0.55
          : 0.06

        ctx.beginPath()
        ctx.moveTo(nx, ny)
        ctx.lineTo(cx, cy)
        ctx.strokeStyle = `rgba(254,82,3,${alpha})`
        ctx.lineWidth = inHover ? 1.5 : 0.6
        ctx.stroke()
      })

      particles.forEach((p) => {
        p.progress += p.speed
        if (p.progress > 1) p.progress = 0

        const node = nodeData[p.nodeIndex]
        const nx = node.x * W
        const ny = node.y * H
        const px = nx + (cx - nx) * p.progress
        const py = ny + (cy - ny) * p.progress

        const distToMouse = Math.hypot(nx - mx, ny - my)
        const inHover = distToMouse < hoverRadius
        const baseAlpha = inHover ? 0.95 : 0.45

        ctx.beginPath()
        ctx.arc(px, py, inHover ? 3.5 : 2.5, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.globalAlpha = baseAlpha * (1 - p.progress * 0.5)
        ctx.fill()
        ctx.globalAlpha = 1
      })

      const pulse = (Math.sin(tick * 0.04) + 1) / 2
      ctx.beginPath()
      ctx.arc(cx, cy, 24 + pulse * 10, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(254,82,3,${0.22 - pulse * 0.14})`
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(cx, cy, 10, 0, Math.PI * 2)
      ctx.fillStyle = '#FE5203'
      ctx.globalAlpha = 1
      ctx.fill()

      nodeData.forEach((node) => {
        const nx = node.x * W
        const ny = node.y * H
        const distToMouse = Math.hypot(nx - mx, ny - my)
        const inHover = distToMouse < hoverRadius

        ctx.beginPath()
        ctx.arc(nx, ny, inHover ? 5 : 3.5, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.globalAlpha = inHover ? 1 : 0.65
        ctx.fill()
        ctx.globalAlpha = 1
      })

      tick++
      frame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(frame)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px 96px', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#FE5203', fontWeight: 600, letterSpacing: '0.5px' }}>LIVE TOPOLOGY</span>
        <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-1.4px', margin: '12px 0 0', color: '#FFFFFF' }}>Every host, mapped in real time.</h2>
      </div>

      <div style={{ position: 'relative', border: '1px solid #1A1A1A', borderRadius: '16px', overflow: 'hidden', background: '#000000' }}>
        <canvas
          ref={canvasRef}
          width={1184}
          height={440}
          style={{ display: 'block', width: '100%', height: '440px', cursor: 'crosshair' }}
        />

        {/* Legend - left top corner */}
        <div style={{ position: 'absolute', top: '20px', left: '24px', display: 'flex', gap: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#A1A1AA' }}>
          <span><span style={{ color: '#3B82F6' }}>●</span> Postgres</span>
          <span><span style={{ color: '#10B981' }}>●</span> Mongo</span>
          <span><span style={{ color: '#EF4444' }}>●</span> Redis</span>
          <span><span style={{ color: '#FE5203' }}>●</span> Alert</span>
        </div>

        {/* Events/sec - right top corner */}
        <div style={{ position: 'absolute', top: '20px', right: '24px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#10B981' }}>
          41,401 events/sec
        </div>
      </div>
    </section>
  )
}
