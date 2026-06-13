'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', alignItems: 'center', background: 'var(--cr)' }}>
      <div className="authwrap">
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link href="/" className="logo" style={{ fontSize: 30 }}>Wasi<span>yya</span></Link>
        </div>
        <div className="authcard">
          <div className="auth-title">Welcome back</div>
          <div className="auth-sub">Sign in to your Wasiyya account</div>
          <div className="fg">
            <label className="fl">Email address</label>
            <input className="fi" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="fg">
            <label className="fl">Password</label>
            <input className="fi" type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div style={{ textAlign: 'right', marginBottom: 20 }}>
            <button style={{ fontSize: 13, color: 'var(--g)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)' }}>Forgot password?</button>
          </div>
          <button className="btn btn-g" style={{ width: '100%', justifyContent: 'center' }}>Sign in</button>
          <div className="auth-div">or</div>
          <Link href="/portal" className="btn btn-o" style={{ width: '100%', justifyContent: 'center' }}>Demo: enter customer portal</Link>
          <div style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: 'var(--ink3)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/start" style={{ color: 'var(--g)', fontSize: 13 }}>Start your will</Link>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--ink3)' }}>
          <Link href="/solicitor" style={{ color: 'var(--g)', fontSize: 12 }}>Solicitor portal</Link>
          {' · '}
          <Link href="/advisor-portal" style={{ color: 'var(--g)', fontSize: 12 }}>Advisor portal</Link>
        </div>
      </div>
    </div>
  )
}
