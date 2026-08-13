'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  const reset = () => {
    setSent(false)
    setEmail('')
  }

  return (
    <>
      <style>{`
        .tl-input:focus { outline: none; border-color: #FE5203 !important; box-shadow: 0 0 0 3px rgba(254,82,3,0.15); }
        .tl-btn-primary { transition: background 160ms ease, box-shadow 160ms ease, transform 160ms ease; }
        .tl-btn-primary:hover { background: #ff5f14 !important; box-shadow: 0 8px 24px -8px rgba(254,82,3,0.5); transform: translateY(-1px); }
        .tl-link:hover { color: #FE5203 !important; }
        .tl-btn-outline:hover { border-color: #3f3f46 !important; }
      `}</style>

      <div style={{ background: '#000000', color: '#FFFFFE', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>

        {/* GLOW */}
        <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(254,82,3,0.12) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }}></div>

        {/* LOGO */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '40px 0 0', position: 'relative', zIndex: 1, textDecoration: 'none' }}>
          <div style={{ width: '28px', height: '28px', border: '1.5px solid #FE5203', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '8.5px', color: '#FE5203' }}>LOG</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.4px', color: '#FFFFFE' }}>TraceLog</span>
        </Link>

        {/* FORM ALANI */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px' }}>

            {/* EMAIL GÖNDERİLDİ */}
            {sent ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid #1A1A1A', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'block' }}></span>
                </div>
                <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-1px', margin: '0 0 10px', color: '#FFFFFE' }}>Check your inbox</h1>
                <p style={{ fontSize: '14.5px', color: '#A1A1AA', margin: '0 0 28px', lineHeight: 1.6 }}>
                  We sent a reset link to{' '}
                  <span style={{ color: '#FFFFFE', fontFamily: "'JetBrains Mono', monospace" }}>{email}</span>
                  . It expires in 15 minutes.
                </p>
                <button onClick={reset} className="tl-btn-outline" style={{ background: 'transparent', border: '1px solid #27272A', color: '#FFFFFE', fontSize: '13.5px', fontWeight: 600, padding: '11px 20px', borderRadius: '7px', cursor: 'pointer', transition: 'border-color 160ms ease' }}>
                  Use a different email
                </button>
              </div>
            ) : (
              /* FORM */
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-1px', margin: '0 0 10px', color: '#FFFFFE' }}>Reset your password</h1>
                <p style={{ fontSize: '14.5px', color: '#A1A1AA', margin: '0 0 28px', lineHeight: 1.6 }}>
                  Enter the email tied to your account and we`ll send a secure link to reset it.
                </p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#D4D4D8', display: 'block', marginBottom: '7px' }}>Email</label>
                    <input
                      type="email"
                      className="tl-input"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: '7px', border: '1px solid #27272A', background: '#0A0A0A', color: '#FFFFFE', fontSize: '14px', fontFamily: "'Inter', sans-serif", transition: 'border-color 160ms ease, box-shadow 160ms ease' }}
                    />
                  </div>
                  <button type="submit" className="tl-btn-primary" style={{ background: '#FE5203', color: '#FFFFFE', fontSize: '14.5px', fontWeight: 600, padding: '12px', borderRadius: '7px', border: 'none', cursor: 'pointer' }}>
                    Send reset link
                  </button>
                </form>
              </div>
            )}

            <p style={{ fontSize: '13.5px', color: '#A1A1AA', textAlign: 'center', marginTop: '28px' }}>
              <Link href="/login" className="tl-link" style={{ color: '#A1A1AA', textDecoration: 'none', transition: 'color 140ms ease' }}>← Back to sign in</Link>
            </p>
          </div>
        </div>

        <p style={{ fontSize: '11.5px', color: '#525258', marginBottom: '32px', position: 'relative', zIndex: 1 }}>© 2026 TraceLog, Inc.</p>
      </div>
    </>
  )
}
