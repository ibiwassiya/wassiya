'use client'
import { useState } from 'react'
import { UserCheck, UserX } from 'lucide-react'
import { toggleUserActive } from '@/actions/admin/actions'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Profile } from '../page'

const ROLE_COLOR: Record<string, { bg: string; color: string }> = {
  client:    { bg: 'var(--gl)',    color: 'var(--gd)'   },
  advisor:   { bg: '#fff8e6',      color: '#b45309'      },
  solicitor: { bg: 'var(--bluel)', color: 'var(--blue)'  },
  scholar:   { bg: '#f3f0ff',      color: '#6d28d9'      },
  admin:     { bg: 'var(--cr2)',   color: 'var(--ink)'   },
}

interface Props {
  profiles:      Profile[]
  currentUserId: string
}

export default function UsersTab({ profiles, currentUserId }: Props) {
  const [filter,     setFilter]  = useState('all')
  const [roleFilter, setRole]    = useState('all')
  const [pending,    setPending] = useState<string | null>(null)

  const filtered = profiles.filter(p => {
    const statusOk = filter === 'all' || (filter === 'active' ? p.is_active : !p.is_active)
    const roleOk   = roleFilter === 'all' || p.role === roleFilter
    return statusOk && roleOk
  })

  async function handleToggle(id: string, active: boolean) {
    setPending(id)
    await toggleUserActive(id, active)
    setPending(null)
  }

  function fmt(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="psec active">
      <div className="psect">All users</div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {(['all', 'active', 'inactive'] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '5px 14px', borderRadius: 99, fontSize: 12, cursor: 'pointer',
            fontFamily: 'var(--sans)', border: '1px solid var(--cr3)',
            background: filter === s ? 'var(--ink)' : 'var(--cr)',
            color: filter === s ? '#fff' : 'var(--ink3)',
          }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <div style={{ width: 1, background: 'var(--cr3)', margin: '0 4px' }} />
        {(['all', 'client', 'advisor', 'solicitor', 'scholar', 'admin'] as const).map(r => (
          <button key={r} onClick={() => setRole(r)} style={{
            padding: '5px 14px', borderRadius: 99, fontSize: 12, cursor: 'pointer',
            fontFamily: 'var(--sans)', border: '1px solid var(--cr3)',
            background: roleFilter === r ? 'var(--gd)' : 'var(--cr)',
            color: roleFilter === r ? '#fff' : 'var(--ink3)',
          }}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map(p => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.full_name ?? '—'}</TableCell>
              <TableCell style={{ color: 'var(--ink3)' }}>{p.email ?? '—'}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  style={{
                    background: ROLE_COLOR[p.role]?.bg ?? 'var(--cr2)',
                    color: ROLE_COLOR[p.role]?.color ?? 'var(--ink)',
                    borderColor: 'transparent',
                  }}
                >
                  {p.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  style={{
                    background: p.is_active ? 'var(--gl)'   : 'var(--ambl)',
                    color:      p.is_active ? 'var(--gd)'   : 'var(--ambd)',
                    borderColor: 'transparent',
                  }}
                >
                  {p.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell style={{ color: 'var(--ink3)' }}>{fmt(p.created_at)}</TableCell>
              <TableCell>
                {p.id === currentUserId ? (
                  <span style={{ fontSize: 11, color: 'var(--ink3)', fontStyle: 'italic' }}
                    title="You cannot deactivate your own account">
                    Current session
                  </span>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pending === p.id}
                    onClick={() => handleToggle(p.id, p.is_active)}
                    style={{
                      gap: 4,
                      opacity: pending === p.id ? 0.5 : 1,
                      background:   p.is_active ? '#fff3f3'    : 'var(--gl)',
                      color:        p.is_active ? 'var(--red)' : 'var(--gd)',
                      borderColor:  p.is_active ? '#fecaca'    : 'var(--g)',
                    }}
                  >
                    {p.is_active
                      ? <><UserX size={12} /> Deactivate</>
                      : <><UserCheck size={12} /> Activate</>}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ink3)', fontSize: 13 }}>
          No users match the selected filters.
        </div>
      )}
    </div>
  )
}
