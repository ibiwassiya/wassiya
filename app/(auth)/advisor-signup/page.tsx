'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AdvisorSignupPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [firm, setFirm] = useState('')
  const [regulated, setRegulated] = useState('Yes — FCA authorised')
  const [source, setSource] = useState('Referral from colleague')

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', alignItems: 'center', background: 'var(--cr)' }}>
      <div className="authwrap" style={{ maxWidth: 560, margin: '0 auto', padding: '32px 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Link href="/" className="logo" style={{ fontSize: 28 }}>Wasi<span>yya</span></Link>
        </div>
        <div className="authcard">
          <div className="auth-title">Advisor registration</div>
          <div className="auth-sub">Register as a Wasiyya advisor partner. Free. No minimums. No lock-in.</div>
          <div className="fgrid2 fg">
            <div>
              <label className="fl">First name</label>
              <input className="fi" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div>
              <label className="fl">Last name</label>
              <input className="fi" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="fg">
            <label className="fl">Email address</label>
            <input className="fi" type="email" placeholder="your@firm.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="fg">
            <label className="fl">Phone number</label>
            <input className="fi" type="tel" placeholder="+44 7700 000000" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div className="fg">
            <label className="fl">Firm / company name</label>
            <input className="fi" placeholder="Your firm or practice name" value={firm} onChange={e => setFirm(e.target.value)} />
          </div>
          <div className="fg">
            <label className="fl">Are you FCA regulated?</label>
            <select className="fsel" value={regulated} onChange={e => setRegulated(e.target.value)}>
              <option>Yes — FCA authorised</option>
              <option>Yes — FCA appointed representative</option>
              <option>No — independent</option>
              <option>Other</option>
            </select>
          </div>
          <div className="fg">
            <label className="fl">How did you hear about us?</label>
            <select className="fsel" value={source} onChange={e => setSource(e.target.value)}>
              <option>Referral from colleague</option>
              <option>Social media</option>
              <option>Muslim media / press</option>
              <option>Mosque / community event</option>
              <option>Other</option>
            </select>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink3)', marginBottom: 16, lineHeight: 1.6 }}>
            By registering you agree to our{' '}
            <Link href="/terms" style={{ color: 'var(--g)', fontSize: 12 }}>Terms of service</Link>
            {' '}and confirm you will disclose referral fees to clients as required by your regulatory obligations.
          </div>
          <button className="btn btn-g" style={{ width: '100%', justifyContent: 'center' }}>Register as advisor partner</button>
          <div className="auth-div">or</div>
          <Link href="/advisor-portal" className="btn btn-o" style={{ width: '100%', justifyContent: 'center' }}>See demo advisor dashboard <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></Link>
        </div>
      </div>
    </div>
  )
}
