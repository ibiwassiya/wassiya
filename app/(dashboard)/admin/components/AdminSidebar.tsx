import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { Profile } from '../page'

type Tab = 'users' | 'create'

interface Props {
  activeTab: Tab
  profiles:  Profile[]
}

export default function AdminSidebar({ activeTab, profiles }: Props) {
  const counts = {
    total:      profiles.length,
    clients:    profiles.filter(p => p.role === 'client').length,
    advisors:   profiles.filter(p => p.role === 'advisor').length,
    solicitors: profiles.filter(p => p.role === 'solicitor').length,
    scholars:   profiles.filter(p => p.role === 'scholar').length,
    inactive:   profiles.filter(p => !p.is_active).length,
  }

  return (
    <div className="psb">
      <div className="pub">
        <div className="pav" style={{ background: 'var(--ink)', color: '#fff' }}>AD</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Admin</div>
          <div style={{ fontSize: 11, color: 'var(--ink3)' }}>User management</div>
        </div>
      </div>

      <Link href="/admin?tab=users"  className={`pnb${activeTab === 'users'  ? ' active' : ''}`}>
        All users
        <Badge variant="outline" style={{ marginLeft: 'auto', background: 'var(--cr2)', color: 'var(--ink3)', borderColor: 'transparent', fontSize: 10 }}>
          {counts.total}
        </Badge>
      </Link>
      <Link href="/admin?tab=create" className={`pnb${activeTab === 'create' ? ' active' : ''}`}>
        Create account
      </Link>

      <Separator style={{ background: 'var(--cr2)', margin: '12px 0' }} />

      <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 8 }}>Breakdown</div>
      <div className="ir"><span className="irl">Clients</span><span className="irv">{counts.clients}</span></div>
      <div className="ir"><span className="irl">Advisors</span><span className="irv">{counts.advisors}</span></div>
      <div className="ir"><span className="irl">Solicitors</span><span className="irv">{counts.solicitors}</span></div>
      <div className="ir"><span className="irl">Scholars</span><span className="irv">{counts.scholars}</span></div>
      <div className="ir">
        <span className="irl">Inactive</span>
        <Badge
          variant="outline"
          style={{ background: counts.inactive > 0 ? 'var(--ambl)' : 'var(--cr2)', color: counts.inactive > 0 ? 'var(--ambd)' : 'var(--ink3)', borderColor: 'transparent', fontSize: 10 }}
        >
          {counts.inactive}
        </Badge>
      </div>

      <SignOutButton style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginTop: 'auto', width: '100%', padding: '9px 12px',
        background: 'none', border: '1px solid var(--cr2)',
        borderRadius: 'var(--r)', cursor: 'pointer',
        fontSize: 13, color: 'var(--ink3)', fontFamily: 'var(--sans)',
      }} />
    </div>
  )
}
