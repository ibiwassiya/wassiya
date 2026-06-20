'use client'
import { useState, useActionState } from 'react'
import { UserCheck, UserX, Plus, Eye, EyeOff, Copy, Check as CheckIcon } from 'lucide-react'
import SignOutButton from '@/components/SignOutButton'
import { createUser, toggleUserActive, type CreateUserState } from '@/actions/admin/actions'
import type { Profile } from './page'

type Tab = 'users' | 'create'

const ROLE_CHIP: Record<string, { bg: string; color: string }> = {
  client:    { bg: 'var(--gl)',    color: 'var(--gd)'   },
  advisor:   { bg: '#fff8e6',      color: '#b45309'      },
  solicitor: { bg: 'var(--bluel)', color: 'var(--blue)'  },
  scholar:   { bg: '#f3f0ff',      color: '#6d28d9'      },
  admin:     { bg: 'var(--cr2)',   color: 'var(--ink)'   },
}

interface Props {
  profiles:      Profile[]
  currentUserId: string
  defaultTab:    Tab
  error?:        string
}

export default function AdminDashboard({ profiles, currentUserId, defaultTab, error }: Props) {
  const [tab, setTab]           = useState<Tab>(defaultTab)
  const [filter, setFilter]     = useState('all')
  const [roleFilter, setRole]   = useState('all')
  const [pending, setPending]   = useState<string | null>(null)
  const [createRole, setCreateRole]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied]             = useState<string | null>(null)

  const initialState: CreateUserState = { status: 'idle' }
  const [state, formAction, isPending] = useActionState(createUser, initialState)

  function copy(value: string, key: string) {
    navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  function closeDialog() {
    // Reset by navigating to the same tab — triggers server re-fetch
    window.location.href = '/admin?tab=create'
  }

  const counts = {
    total:      profiles.length,
    clients:    profiles.filter(p => p.role === 'client').length,
    advisors:   profiles.filter(p => p.role === 'advisor').length,
    solicitors: profiles.filter(p => p.role === 'solicitor').length,
    scholars:   profiles.filter(p => p.role === 'scholar').length,
    inactive:   profiles.filter(p => !p.is_active).length,
  }

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
    <div className="pwrap">
      {/* Sidebar */}
      <div className="psb">
        <div className="pub">
          <div className="pav" style={{ background: 'var(--ink)', color: '#fff' }}>AD</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Admin</div>
            <div style={{ fontSize: 11, color: 'var(--ink3)' }}>User management</div>
          </div>
        </div>

        <button className={`pnb${tab === 'users' ? ' active' : ''}`} onClick={() => setTab('users')}>
          All users ({counts.total})
        </button>
        <button className={`pnb${tab === 'create' ? ' active' : ''}`} onClick={() => setTab('create')}>
          Create account
        </button>

        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--cr2)' }}>
          <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 6 }}>Breakdown</div>
          <div className="ir"><span className="irl">Clients</span><span className="irv">{counts.clients}</span></div>
          <div className="ir"><span className="irl">Advisors</span><span className="irv">{counts.advisors}</span></div>
          <div className="ir"><span className="irl">Solicitors</span><span className="irv">{counts.solicitors}</span></div>
          <div className="ir"><span className="irl">Scholars</span><span className="irv">{counts.scholars}</span></div>
          <div className="ir"><span className="irl">Inactive</span><span className="irv a">{counts.inactive}</span></div>
        </div>

        <SignOutButton style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginTop: 'auto', width: '100%', padding: '9px 12px',
          background: 'none', border: '1px solid var(--cr2)',
          borderRadius: 'var(--r)', cursor: 'pointer',
          fontSize: 13, color: 'var(--ink3)', fontFamily: 'var(--sans)',
        }} />
      </div>

      {/* Main */}
      <div className="pmain">

        {/* Users tab */}
        {tab === 'users' && (
          <div className="psec active">
            <div className="psect">All users</div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {['all', 'active', 'inactive'].map(s => (
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
              {['all', 'client', 'advisor', 'solicitor', 'scholar', 'admin'].map(r => (
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

            <table className="dtbl">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 500 }}>{p.full_name ?? '—'}</td>
                    <td style={{ color: 'var(--ink3)' }}>{p.email ?? '—'}</td>
                    <td>
                      <span style={{
                        padding: '2px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                        background: ROLE_CHIP[p.role]?.bg ?? 'var(--cr2)',
                        color:      ROLE_CHIP[p.role]?.color ?? 'var(--ink)',
                      }}>
                        {p.role}
                      </span>
                    </td>
                    <td>
                      <span className={`chip ${p.is_active ? 'chip-g' : 'chip-a'}`}>
                        {p.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--ink3)' }}>{fmt(p.created_at)}</td>
                    <td>
                      {p.id === currentUserId ? (
                        <span title="You cannot deactivate your own account" style={{
                          fontSize: 11, color: 'var(--ink3)', fontStyle: 'italic',
                        }}>
                          Current session
                        </span>
                      ) : (
                        <button
                          className="ca"
                          disabled={pending === p.id}
                          onClick={() => handleToggle(p.id, p.is_active)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 4,
                            opacity: pending === p.id ? 0.5 : 1,
                            background: p.is_active ? '#fff3f3' : 'var(--gl)',
                            color:      p.is_active ? 'var(--r)' : 'var(--gd)',
                            border: `1px solid ${p.is_active ? '#fecaca' : 'var(--g)'}`,
                          }}
                        >
                          {p.is_active
                            ? <><UserX size={12} /> Deactivate</>
                            : <><UserCheck size={12} /> Activate</>}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ink3)', fontSize: 13 }}>
                No users match the selected filters.
              </div>
            )}
          </div>
        )}

        {/* Create account tab */}
        {tab === 'create' && (
          <div className="psec active">
            <div className="psect">Create account</div>

            {state.status === 'error' && (
              <div className="alert alert-r" style={{ marginBottom: 16 }}>
                {state.message ?? 'Failed to create account. The email may already be in use.'}
              </div>
            )}

            <div className="alert alert-b" style={{ marginBottom: 20 }}>
              Clients and advisors self-register. Use this form to create solicitor or scholar accounts only.
            </div>

            <form action={formAction} style={{ maxWidth: 480 }}>
              <div className="fg">
                <label className="fl">Full name</label>
                <input className="fi" type="text" name="fullName" placeholder="e.g. Fatima Hassan" required />
              </div>
              <div className="fg">
                <label className="fl">Email address</label>
                <input className="fi" type="email" name="email" placeholder="fatima@chambers.co.uk" required />
              </div>
              <div className="fg">
                <label className="fl">Temporary password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="fi"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Min. 8 characters"
                    minLength={8}
                    required
                    style={{ paddingRight: 42 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute', right: 12, top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--ink3)', padding: 0, display: 'flex',
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="fg">
                <label className="fl">Role</label>
                <select
                  className="fi"
                  name="role"
                  required
                  defaultValue=""
                  onChange={e => setCreateRole(e.target.value)}
                >
                  <option value="" disabled>Select a role</option>
                  <option value="solicitor">Solicitor</option>
                  <option value="scholar">Scholar</option>
                </select>
              </div>
              {createRole === 'solicitor' && (
                <div className="fg">
                  <label className="fl">SRA number</label>
                  <input className="fi" type="text" name="sraNumber" placeholder="e.g. 123456" />
                </div>
              )}
              <div className="fg">
                <label className="fl">
                  Phone <span style={{ color: 'var(--ink3)', fontWeight: 400 }}>(optional)</span>
                </label>
                <input className="fi" type="tel" name="phone" placeholder="+44 7700 000000" />
              </div>
              <button
                type="submit"
                className="btn btn-g"
                disabled={isPending}
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, opacity: isPending ? 0.6 : 1 }}
              >
                <Plus size={15} /> {isPending ? 'Creating…' : 'Create account'}
              </button>
            </form>

            {/* Credentials dialog */}
            {state.status === 'success' && (
              <div style={{
                position: 'fixed', inset: 0, zIndex: 50,
                background: 'rgba(0,0,0,.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  background: '#fff', borderRadius: 16, padding: '32px 36px',
                  width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,.2)',
                }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink)', marginBottom: 6 }}>
                    Account created
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--ink3)', marginBottom: 24 }}>
                    Share these credentials with <strong>{state.fullName}</strong>. The password will not be shown again.
                  </div>

                  {[
                    { label: 'Full name', value: state.fullName,  key: 'name' },
                    { label: 'Role',      value: state.role,       key: 'role' },
                    { label: 'Email',     value: state.email,      key: 'email' },
                    { label: 'Password',  value: state.password,   key: 'pass' },
                  ].map(({ label, value, key }) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 4 }}>{label}</div>
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: 'var(--cr)', border: '1px solid var(--cr2)',
                        borderRadius: 'var(--r)', padding: '9px 12px',
                      }}>
                        <span style={{ fontSize: 13, fontFamily: 'monospace', color: 'var(--ink)' }}>{value}</span>
                        <button
                          type="button"
                          onClick={() => copy(value, key)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink3)', display: 'flex', padding: 0 }}
                          title="Copy"
                        >
                          {copied === key ? <CheckIcon size={15} color="var(--g)" /> : <Copy size={15} />}
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={closeDialog}
                    className="btn btn-g"
                    style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
