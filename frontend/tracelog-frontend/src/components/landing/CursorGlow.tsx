'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    let frame: number

    const update = () => {
      if (glowRef.current) {
        glowRef.current.style.setProperty('--x', `${mousePos.current.x}px`)
        glowRef.current.style.setProperty('--y', `${mousePos.current.y}px`)
      }
      frame = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', onMove)
    frame = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(254,82,3,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        transform: 'translate3d(calc(var(--x, 0px) - 300px), calc(var(--y, 0px) - 300px), 0)',
      }}
    />
  )
}
