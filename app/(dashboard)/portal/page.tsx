'use client'
import { useState } from 'react'
import SignOutButton from '@/components/SignOutButton'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import OverviewTab from './components/OverviewTab'
import DocumentsTab from './components/DocumentsTab'
import AssetRegisterTab from './components/AssetRegisterTab'
import MessagesTab from './components/MessagesTab'

type Tab = 'overview' | 'documents' | 'assetreg' | 'messages'

export default function PortalPage() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="pwrap">
      <div className="psb">
        <div className="pub">
          <div className="pav" style={{ background: 'var(--g)', color: '#fff' }}>AK</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Ahmed Khan</div>
            <div style={{ fontSize: 11, color: 'var(--ink3)' }}>Family case · £1,200</div>
          </div>
        </div>

        <button className={`pnb${tab === 'overview'  ? ' active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
        <button className={`pnb${tab === 'documents' ? ' active' : ''}`} onClick={() => setTab('documents')}>Documents</button>
        <button className={`pnb${tab === 'assetreg'  ? ' active' : ''}`} onClick={() => setTab('assetreg')}>Asset register</button>
        <button className={`pnb${tab === 'messages'  ? ' active' : ''}`} onClick={() => setTab('messages')}>
          Messages
          <Badge variant="outline" style={{ marginLeft: 'auto', background: 'var(--ambl)', color: 'var(--ambd)', borderColor: 'transparent', fontSize: 10 }}>1</Badge>
        </button>

        <div style={{ marginTop: 'auto' }}>
          <Separator style={{ background: 'var(--cr2)', margin: '0 0 12px' }} />
          <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 8 }}>Your solicitor</div>
          <div className="ir"><span className="irl">Name</span><span className="irv">Fatima Hassan</span></div>
          <div className="ir" style={{ borderBottom: 'none' }}><span className="irl">SRA</span><span className="irv">123456</span></div>
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
        {tab === 'overview'  && <OverviewTab />}
        {tab === 'documents' && <DocumentsTab />}
        {tab === 'assetreg'  && <AssetRegisterTab />}
        {tab === 'messages'  && <MessagesTab />}
      </div>
    </div>
  )
}
