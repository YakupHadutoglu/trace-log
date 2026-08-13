'use client'

import { useState } from 'react'
import Link from 'next/link'

function getStrength(pw: string): number {
  if (!pw) return 0
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return Math.min(score, 4)
}

const strengthLabels = ['Too short', 'Weak', 'Okay', 'Good', 'Strong']
const strengthColors = ['#27272A', '#EF4444', '#F59E0B', '#3B82F6', '#10B981']

export default function ChangePasswordCard() {
  const [form, setForm] = useState({ currentPw: '', newPw: '', confirmPw: '' })
  const [touched, setTouched] = useState(false)
  const [success, setSuccess] = useState(false)

  const strength = getStrength(form.newPw)
  const mismatch = touched && form.confirmPw !== '' && form.newPw !== form.confirmPw

  const handleSubmit = () => {
    setTouched(true)
    const { currentPw, newPw, confirmPw } = form
    if (currentPw && newPw && newPw === confirmPw && newPw.length >= 8) {
      setSuccess(true)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '11px 14px',
    borderRadius: '7px',
    border: '1px solid #27272A',
    background: '#000000',
    color: '#FFFFFE',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
  }

  return (
    <>
      <style>{`
        .tl-input { transition: border-color 160ms ease, box-shadow 160ms ease; }
        .tl-input:focus { outline: none; border-color: #FE5203 !important; box-shadow: 0 0 0 3px rgba(254,82,3,0.15); }
        .tl-btn-primary { transition: background 160ms ease, box-shadow 160ms ease, transform 160ms ease; }
        .tl-btn-primary:hover { background: #ff5f14 !important; box-shadow: 0 8px 24px -8px rgba(254,82,3,0.5); transform: translateY(-1px); }
        .tl-btn-ghost { transition: border-color 160ms ease, background 160ms ease; }
        .tl-btn-ghost:hover { border-color: #3f3f46 !important; background: #0A0A0A; }
        .tl-link:hover { color: #FE5203 !important; }
      `}</style>

      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-1px', margin: '0 0 6px', color: '#FFFFFE' }}>Security</h1>
        <p style={{ fontSize: '14px', color: '#A1A1AA', margin: '0 0 32px' }}>Manage how you sign in to TraceLog.</p>

        <div style={{ border: '1px solid #1A1A1A', borderRadius: '12px', background: '#0A0A0A', overflow: 'hidden' }}>

          {/* KART BAŞLIK */}
          <div style={{ padding: '24px 28px', borderBottom: '1px solid #1A1A1A' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px', color: '#FFFFFE' }}>Change password</h2>
            <p style={{ fontSize: '13px', color: '#A1A1AA', margin: 0 }}>Choose a strong password you don`t use elsewhere.</p>
          </div>

          {/* BAŞARILI DURUM */}
          {success ? (
            <div style={{ padding: '28px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'block' }}></span>
              </div>
              <div>
                <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#FFFFFE' }}>Password updated</div>
                <div style={{ fontSize: '13px', color: '#A1A1AA' }}>Your password was changed successfully.</div>
              </div>
            </div>
          ) : (
            /* FORM */
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#D4D4D8', display: 'block', marginBottom: '7px' }}>Current password</label>
                <input type="password" className="tl-input" placeholder="••••••••••••" value={form.currentPw} onChange={(e) => setForm({ ...form, currentPw: e.target.value })} style={inputStyle} />
              </div>

              <div style={{ height: '1px', background: '#1A1A1A' }}></div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#D4D4D8', display: 'block', marginBottom: '7px' }}>New password</label>
                <input type="password" className="tl-input" placeholder="••••••••••••" value={form.newPw} onChange={(e) => setForm({ ...form, newPw: e.target.value })} style={inputStyle} />
                <div style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} style={{ height: '3px', flex: 1, borderRadius: '2px', background: i < strength ? strengthColors[strength] : '#27272A' }}></span>
                  ))}
                </div>
                <span style={{ fontSize: '11.5px', color: strengthColors[strength], marginTop: '6px', display: 'block' }}>{strengthLabels[strength]}</span>
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#D4D4D8', display: 'block', marginBottom: '7px' }}>Confirm new password</label>
                <input type="password" className="tl-input" placeholder="••••••••••••" value={form.confirmPw} onChange={(e) => setForm({ ...form, confirmPw: e.target.value })} style={{ ...inputStyle, border: `1px solid ${mismatch ? '#EF4444' : '#27272A'}` }} />
                {mismatch && <span style={{ fontSize: '11.5px', color: '#EF4444', marginTop: '6px', display: 'block' }}>Passwords don`t match.</span>}
              </div>
            </form>
          )}

          {/* ALT BAR */}
          <div style={{ padding: '20px 28px', borderTop: '1px solid #1A1A1A', display: 'flex', justifyContent: 'flex-end', gap: '10px', background: '#000000' }}>
            <Link href="/" className="tl-btn-ghost" style={{ border: '1px solid #27272A', color: '#FFFFFE', fontSize: '13.5px', fontWeight: 600, padding: '10px 18px', borderRadius: '7px', textDecoration: 'none' }}>Cancel</Link>
            <button onClick={handleSubmit} className="tl-btn-primary" style={{ background: '#FE5203', color: '#FFFFFE', fontSize: '13.5px', fontWeight: 600, padding: '10px 18px', borderRadius: '7px', border: 'none', cursor: 'pointer' }}>Update password</button>
          </div>
        </div>

        <p style={{ fontSize: '12.5px', color: '#525258', marginTop: '16px' }}>
          Forgot your current password instead?{' '}
          <Link href="/forgot-password" className="tl-link" style={{ color: '#FE5203', fontWeight: 600, textDecoration: 'none', transition: 'color 140ms ease' }}>Reset via email</Link>
        </p>
      </div>
    </>
  )
}
