'use client'
import { useState, useActionState } from 'react'
import { Plus, Eye, EyeOff, Copy, Check as CheckIcon, ChevronDown } from 'lucide-react'
import { createUser, type CreateUserState } from '@/actions/admin/actions'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'

const initialState: CreateUserState = { status: 'idle' }

const CREDENTIALS = [
  { label: 'Full name', key: 'fullName' },
  { label: 'Role',      key: 'role'     },
  { label: 'Email',     key: 'email'    },
  { label: 'Password',  key: 'password' },
] as const

export default function CreateUserForm() {
  const [createRole,   setCreateRole]   = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [copied,       setCopied]       = useState<string | null>(null)

  const [state, formAction, isPending] = useActionState(createUser, initialState)

  function copy(value: string, key: string) {
    navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  function closeDialog() {
    window.location.href = '/admin?tab=create'
  }

  return (
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
          <input type="hidden" name="role" value={createRole} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="fi"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', textAlign: 'left',
                  color: createRole ? 'var(--ink)' : 'var(--ink3)',
                }}
              >
                {createRole
                  ? createRole.charAt(0).toUpperCase() + createRole.slice(1)
                  : 'Select a role'}
                <ChevronDown size={14} style={{ color: 'var(--ink3)', flexShrink: 0 }} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" style={{ minWidth: 200 }}>
              <DropdownMenuRadioGroup value={createRole} onValueChange={setCreateRole}>
                {(['solicitor', 'scholar'] as const).map(r => (
                  <DropdownMenuRadioItem key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <Button
          type="submit"
          disabled={isPending}
          style={{
            marginTop: 8, gap: 8,
            background: 'var(--g)', color: '#fff',
            opacity: isPending ? 0.6 : 1,
          }}
        >
          <Plus size={15} /> {isPending ? 'Creating…' : 'Create account'}
        </Button>
      </form>

      {/* Credentials dialog */}
      <Dialog open={state.status === 'success'} onOpenChange={open => { if (!open) closeDialog() }}>
        <DialogContent className="max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 400, color: 'var(--ink)' }}>
              Account created
            </DialogTitle>
            <DialogDescription>
              Share these credentials with <strong style={{ color: 'var(--ink)' }}>
                {state.status === 'success' ? state.fullName : ''}
              </strong>. The password will not be shown again.
            </DialogDescription>
          </DialogHeader>

          {state.status === 'success' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              {CREDENTIALS.map(({ label, key }) => (
                <div key={key}>
                  <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 4 }}>{label}</div>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'var(--cr)', border: '1px solid var(--cr2)',
                    borderRadius: 'var(--r)', padding: '9px 12px',
                  }}>
                    <span style={{ fontSize: 13, fontFamily: 'monospace', color: 'var(--ink)' }}>
                      {state[key]}
                    </span>
                    <button
                      type="button"
                      onClick={() => copy(state[key], key)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink3)', display: 'flex', padding: 0 }}
                      title="Copy"
                    >
                      {copied === key ? <CheckIcon size={15} color="var(--g)" /> : <Copy size={15} />}
                    </button>
                  </div>
                </div>
              ))}

              <Button
                onClick={closeDialog}
                style={{ marginTop: 4, background: 'var(--g)', color: '#fff', width: '100%', justifyContent: 'center' }}
              >
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
