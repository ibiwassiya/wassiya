'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'

type Tab = 'overview' | 'documents' | 'assetreg' | 'messages'

export default function PortalPage() {
  const [tab, setTab] = useState<Tab>('overview')
  const [message, setMessage] = useState('')

  return (
    <div className="pwrap">
      <div className="psb">
        <div className="pub">
          <div className="pav">AK</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Ahmed Khan</div>
            <div style={{ fontSize: 11, color: 'var(--ink3)' }}>Family case · £1,200</div>
          </div>
        </div>
        <button className={`pnb${tab === 'overview' ? ' active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
        <button className={`pnb${tab === 'documents' ? ' active' : ''}`} onClick={() => setTab('documents')}>Documents</button>
        <button className={`pnb${tab === 'assetreg' ? ' active' : ''}`} onClick={() => setTab('assetreg')}>Asset register</button>
        <button className={`pnb${tab === 'messages' ? ' active' : ''}`} onClick={() => setTab('messages')}>Messages (1)</button>
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--cr2)' }}>
          <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 5 }}>Your solicitor</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Fatima Hassan</div>
          <div style={{ fontSize: 11, color: 'var(--ink3)' }}>SRA: 123456</div>
        </div>
      </div>

      <div className="pmain">
        {tab === 'overview' && (
          <div className="psec active">
            <div className="psect">Case progress</div>
            <div className="stl">
              <div className="stli done"><div className="stld stl-ok"><Check size={12} /></div><div className="stll">Received</div></div>
              <div className="stli done"><div className="stld stl-ok"><Check size={12} /></div><div className="stll">Assigned</div></div>
              <div className="stli"><div className="stld stl-cur">3</div><div className="stll">In review</div></div>
              <div className="stli"><div className="stld stl-pend">4</div><div className="stll">Approved</div></div>
              <div className="stli"><div className="stld stl-pend">5</div><div className="stll">Delivered</div></div>
            </div>
            <div className="alert alert-b">Your will draft is being reviewed by Fatima Hassan. She has a query about your overseas property — check your messages.</div>
            <div className="psect">Case details</div>
            <div className="ir"><span className="irl">Full name</span><span className="irv">Ahmed Rafiq Khan</span></div>
            <div className="ir"><span className="irl">Date of birth</span><span className="irv">14 March 1981</span></div>
            <div className="ir"><span className="irl">Address</span><span className="irv">42 Maple Avenue, Birmingham B15 3PQ</span></div>
            <div className="ir"><span className="irl">Case type</span><span className="irv">Family package</span></div>
            <div className="ir"><span className="irl">Solicitor</span><span className="irv">Fatima Hassan (SRA: 123456)</span></div>
            <div className="ir"><span className="irl">Scholar</span><span className="irv">Mufti Ibrahim Ali</span></div>
            <div className="ir"><span className="irl">Faraid shares</span><span className="irv g">Validated <Check size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }} /></span></div>
            <div className="ir"><span className="irl">Fee paid</span><span className="irv">£1,200</span></div>
            <div className="ir"><span className="irl">Referring advisor</span><span className="irv">Bilal Mahmood — Enver W&amp;M</span></div>
          </div>
        )}

        {tab === 'documents' && (
          <div className="psec active">
            <div className="psect">Your documents</div>
            <div className="dr"><div><div className="drn">Will draft (preview)</div><div className="drs">AI-generated · Solicitor review in progress</div></div><button className="drb">Preview PDF</button></div>
            <div className="dr"><div><div className="drn">Questionnaire summary</div><div className="drs">Your answers — all 20 steps completed</div></div><button className="drb">Download</button></div>
            <div className="dr" style={{ opacity: .5 }}><div><div className="drn">Final signed will</div><div className="drs">Available once solicitor approves</div></div><button className="drb" disabled>Pending</button></div>
            <div className="dr" style={{ opacity: .5 }}><div><div className="drn">Execution instructions</div><div className="drs">How to sign with two witnesses</div></div><button className="drb" disabled>Pending</button></div>
            <div className="alert alert-a" style={{ marginTop: 12 }}>Once approved, print and sign in the presence of two independent witnesses who are not beneficiaries and not married to beneficiaries. Both must be 18+ and of sound mind.</div>
          </div>
        )}

        {tab === 'assetreg' && (
          <div className="psec active">
            <div className="psect">Asset register completion</div>
            <div className="alert alert-g">Your asset register is stored securely alongside your will. Complete it so your executors can administer your estate without difficulty.</div>
            <div className="ir"><span className="irl">Bank accounts</span><span className="irv g">2 entries <Check size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }} /></span></div>
            <div className="ir"><span className="irl">Property (UK)</span><span className="irv g">1 entry <Check size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }} /></span></div>
            <div className="ir"><span className="irl">Property (overseas)</span><span className="irv a">Ref pending</span></div>
            <div className="ir"><span className="irl">Pensions</span><span className="irv a">Not started</span></div>
            <div className="ir"><span className="irl">Debts &amp; obligations</span><span className="irv g">Completed <Check size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }} /></span></div>
            <div className="ir"><span className="irl">Religious obligations</span><span className="irv a">Not started</span></div>
            <div className="ir"><span className="irl">Relatives (Faraid)</span><span className="irv g">Completed <Check size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }} /></span></div>
            <button className="btn btn-g" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>Continue asset register</button>
          </div>
        )}

        {tab === 'messages' && (
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
              <input placeholder="Type a message to your solicitor..." style={{ flex: 1, padding: '10px 14px', border: '1px solid var(--cr3)', borderRadius: 'var(--r)', fontSize: 13, color: 'var(--ink)', background: '#fff', fontFamily: 'var(--sans)' }} value={message} onChange={e => setMessage(e.target.value)} />
              <button className="btn btn-g btn-sm">Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
