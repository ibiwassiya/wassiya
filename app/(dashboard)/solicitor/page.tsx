'use client'
import { useState } from 'react'
import SignOutButton from '@/components/SignOutButton'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import CaseQueue from './components/CaseQueue'
import ScholarValidation from './components/ScholarValidation'
import CompletedCases from './components/CompletedCases'

type Tab = 'queue' | 'scholar' | 'completed'

export default function SolicitorPage() {
  const [tab, setTab] = useState<Tab>('queue')

  return (
    <div className="pwrap">
      <div className="psb">
        <div className="pub">
          <div className="pav" style={{ background: 'var(--bluel)', color: 'var(--blue)' }}>FH</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Fatima Hassan</div>
            <div style={{ fontSize: 11, color: 'var(--ink3)' }}>SRA: 123456 · Solicitor</div>
          </div>
        </div>
        <button className={`pnb${tab === 'queue'     ? ' active' : ''}`} onClick={() => setTab('queue')}>
          Case queue
          <Badge variant="outline" style={{ marginLeft: 'auto', background: 'var(--ambl)', color: 'var(--ambd)', borderColor: 'transparent', fontSize: 10 }}>3</Badge>
        </button>
        <button className={`pnb${tab === 'scholar'   ? ' active' : ''}`} onClick={() => setTab('scholar')}>Scholar validation</button>
        <button className={`pnb${tab === 'completed' ? ' active' : ''}`} onClick={() => setTab('completed')}>Completed cases</button>

        <div style={{ marginTop: 'auto' }}>
          <Separator style={{ background: 'var(--cr2)', margin: '0 0 12px' }} />
          <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 8 }}>This week</div>
          <div className="ir"><span className="irl">Cases reviewed</span><span className="irv">7</span></div>
          <div className="ir"><span className="irl">Avg review time</span><span className="irv">52 min</span></div>
          <div className="ir" style={{ borderBottom: 'none' }}>
            <span className="irl">Pending</span>
            <Badge variant="outline" style={{ background: 'var(--ambl)', color: 'var(--ambd)', borderColor: 'transparent', fontSize: 10 }}>3</Badge>
          </div>
          <SignOutButton style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginTop: 12, width: '100%', padding: '9px 12px',
            background: 'none', border: '1px solid var(--cr2)',
            borderRadius: 'var(--r)', cursor: 'pointer',
            fontSize: 13, color: 'var(--ink3)', fontFamily: 'var(--sans)',
          }} />
        </div>
      </div>

      <div className="pmain">
        {tab === 'queue'     && <CaseQueue />}
        {tab === 'scholar'   && <ScholarValidation />}
        {tab === 'completed' && <CompletedCases />}
      </div>
    </div>
  )
}
