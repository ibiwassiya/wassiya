import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

type Tab = 'overview' | 'mywills' | 'documents' | 'assetreg' | 'messages'

interface Props {
  activeTab: Tab
}

export default function PortalSidebar({ activeTab }: Props) {
  return (
    <div className="psb">
      <div className="pub">
        <div className="pav" style={{ background: 'var(--g)', color: '#fff' }}>AK</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Ahmed Khan</div>
          <div style={{ fontSize: 11, color: 'var(--ink3)' }}>Family case · £1,200</div>
        </div>
      </div>

      <Link href="/portal?tab=overview"  className={`pnb${activeTab === 'overview'  ? ' active' : ''}`}>Overview</Link>
      <Link href="/portal?tab=mywills"   className={`pnb${activeTab === 'mywills'   ? ' active' : ''}`}>My Wills</Link>
      <Link href="/portal?tab=documents" className={`pnb${activeTab === 'documents' ? ' active' : ''}`}>Documents</Link>
      <Link href="/portal?tab=assetreg"  className={`pnb${activeTab === 'assetreg'  ? ' active' : ''}`}>Asset register</Link>
      <Link href="/portal?tab=messages"  className={`pnb${activeTab === 'messages'  ? ' active' : ''}`}>
        Messages
        <Badge variant="outline" style={{ marginLeft: 'auto', background: 'var(--ambl)', color: 'var(--ambd)', borderColor: 'transparent', fontSize: 10 }}>1</Badge>
      </Link>

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
  )
}
