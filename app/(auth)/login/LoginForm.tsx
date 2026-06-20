'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ShieldCheck, BookOpen, Scale } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const ROLE_DASHBOARDS: Record<string, string> = {
  client:    '/portal',
  advisor:   '/advisor',
  solicitor: '/solicitor',
  scholar:   '/scholar',
  admin:     '/admin',
}

interface Props {
  error?: string
}

export default function LoginForm({ error: initialError }: Props) {
  const router = useRouter()
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]           = useState(initialError)
  const [loading, setLoading]       = useState(false)

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(undefined)

    const supabase = createClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError || !data.user) {
      setError('auth_callback_failed')
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    const role = (profile as { role: string } | null)?.role ?? 'client'
    router.push(ROLE_DASHBOARDS[role] ?? '/portal')
    router.refresh()
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', alignItems: 'center', background: 'var(--cr)' }}>
      <div className="authwrap">

        {/* Brand mark */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" className="logo" style={{ fontSize: 32 }}>Wasi<span>yya</span></Link>
          <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 4, letterSpacing: '.04em' }}>
            Islamic estate planning
          </div>
        </div>

        <div className="authcard" style={{ padding: '0' }}>

          {/* Card header */}
          <div style={{
            background: 'var(--gd)',
            borderRadius: '20px 20px 0 0',
            padding: '28px 36px 24px',
            textAlign: 'center',
          }}>
            <div style={{
              width: 48, height: 48,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.12)',
              border: '1px solid rgba(255,255,255,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}>
              <ShieldCheck size={22} color="#fff" />
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: '#fff', marginBottom: 4 }}>
              Welcome back
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.65)' }}>
              Sign in to your Wasiyya account
            </div>
          </div>

          {/* Form body */}
          <div style={{ padding: '32px 36px 28px' }}>

            {error === 'auth_callback_failed' && (
              <div className="alert alert-r" style={{ marginBottom: 20 }}>
                Authentication failed. Please check your credentials and try again.
              </div>
            )}

            <form onSubmit={handleSignIn}>
              <div className="fg">
                <label className="fl">Email address</label>
                <input
                  className="fi"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="fg" style={{ marginBottom: 8 }}>
                <label className="fl">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="fi"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    style={{ paddingRight: 42 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    style={{
                      position: 'absolute', right: 12, top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--ink3)', padding: 0, display: 'flex',
                    }}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginBottom: 22 }}>
                <button
                  type="button"
                  style={{ fontSize: 12, color: 'var(--g)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)' }}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-g"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '14px 28px', opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            {/* Trust strip */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 20,
              marginTop: 24, paddingTop: 20,
              borderTop: '1px solid var(--cr2)',
            }}>
              {[
                { icon: <ShieldCheck size={13} />, label: 'SSL secured' },
                { icon: <BookOpen size={13} />, label: 'Scholar validated' },
                { icon: <Scale size={13} />, label: 'SRA regulated' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--ink3)' }}>
                  <span style={{ color: 'var(--g)' }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Below card */}
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--ink3)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--g)', fontWeight: 500 }}>Create account</Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--ink3)' }}>
          <Link href="/solicitor" style={{ color: 'var(--ink3)' }}>Solicitor portal</Link>
          <span style={{ margin: '0 8px', opacity: .4 }}>·</span>
          <Link href="/advisor" style={{ color: 'var(--ink3)' }}>Advisor portal</Link>
        </div>

      </div>
    </div>
  )
}
