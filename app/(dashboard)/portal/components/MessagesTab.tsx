'use client'
import { useState } from 'react'

export default function MessagesTab() {
  const [message, setMessage] = useState('')

  return (
    <div className="psec active">
      <div className="psect">Messages</div>
      <div style={{ background: 'var(--cr)', borderRadius: 'var(--rl)', padding: 14, marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink3)', marginBottom: 6 }}><span>Fatima Hassan (Solicitor)</span><span>14 May 2025</span></div>
        <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6 }}>Assalamu alaikum Ahmed, I have begun my review of your will draft. One query — could you provide the Land Registry reference for your property in Pakistan? This is needed for the overseas addendum clause.</div>
      </div>
      <div style={{ background: 'var(--gl)', borderRadius: 'var(--rl)', padding: 14, marginBottom: 10, marginLeft: 20 }}>
        <div style={{ fontSize: 11, color: 'var(--gd)', marginBottom: 5, textAlign: 'right' }}>You · 14 May 2025</div>
        <div style={{ fontSize: 13, color: 'var(--gd)', lineHeight: 1.6, textAlign: 'right' }}>JazakAllah khayran Fatima. I will find the reference and send it over shortly.</div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <input
          placeholder="Type a message to your solicitor..."
          style={{ flex: 1, padding: '10px 14px', border: '1px solid var(--cr3)', borderRadius: 'var(--r)', fontSize: 13, color: 'var(--ink)', background: '#fff', fontFamily: 'var(--sans)' }}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className="btn btn-g btn-sm">Send</button>
      </div>
    </div>
  )
}
