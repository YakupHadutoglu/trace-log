'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 14px',
    borderRadius: '7px',
    border: '1px solid #27272A',
    background: '#0A0A0A',
    color: '#FFFFFE',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '24px 64px', position: 'relative', zIndex: 1, height: '100vh', overflow: 'hidden', justifyContent: 'space-between' }}>

      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <div style={{ width: '28px', height: '28px', border: '1.5px solid #FE5203', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '8.5px', color: '#FE5203' }}>LOG</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.4px', color: '#FFFFFE' }}>TraceLog</span>
      </Link>

      <div style={{ maxWidth: '380px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-1.2px', margin: '0 0 6px', color: '#FFFFFE' }}>Create your account</h1>
        <p style={{ fontSize: '13.5px', color: '#A1A1AA', margin: '0 0 20px' }}>Free for the first 10GB / month. No credit card required.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '10px', borderRadius: '7px', border: '1px solid #27272A', background: 'transparent', color: '#FFFFFE', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}>⌥</span> Continue with GitHub
          </button>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '10px', borderRadius: '7px', border: '1px solid #27272A', background: 'transparent', color: '#FFFFFE', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}>◆</span> Continue with Google
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          <div style={{ flex: 1, height: '1px', background: '#1A1A1A' }}></div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#525258' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#1A1A1A' }}></div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#D4D4D8', display: 'block', marginBottom: '6px' }}>Name</label>
              <input type="text" placeholder="Ada Lovelace" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#D4D4D8', display: 'block', marginBottom: '6px' }}>Company</label>
              <input type="text" placeholder="Acme Inc." value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#D4D4D8', display: 'block', marginBottom: '6px' }}>Work email</label>
            <input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          </div>

          <div>
            <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#D4D4D8', display: 'block', marginBottom: '6px' }}>Password</label>
            <input type="password" placeholder="••••••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={inputStyle} />
            <span style={{ fontSize: '11.5px', color: '#525258', marginTop: '5px', display: 'block' }}>Minimum 12 characters.</span>
          </div>

          <button type="submit" style={{ background: '#FE5203', color: '#FFFFFE', fontSize: '14.5px', fontWeight: 600, padding: '11px', borderRadius: '7px', border: 'none', cursor: 'pointer' }}>
            Create account
          </button>
        </form>

        <p style={{ fontSize: '13.5px', color: '#A1A1AA', textAlign: 'center', marginTop: '20px' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#FE5203', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>

      <p style={{ fontSize: '11.5px', color: '#525258', textAlign: 'center' }}>
        By creating an account you agree to our{' '}
        <Link href="#" style={{ color: '#525258', textDecoration: 'none' }}>Terms</Link>
        {' '}and{' '}
        <Link href="#" style={{ color: '#525258', textDecoration: 'none' }}>Privacy Policy</Link>.
      </p>
    </div>
  )
}
