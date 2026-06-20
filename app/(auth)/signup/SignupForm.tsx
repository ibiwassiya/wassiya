'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ShieldCheck, BookOpen, Scale } from 'lucide-react'
import { signUp } from '@/actions/auth/actions'

interface Props {
  error?: string
}

export default function SignupForm({ error }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const mismatch = confirm.length > 0 && password !== confirm

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

        <div className="authcard" style={{ padding: 0 }}>

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
              <BookOpen size={22} color="#fff" />
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: '#fff', marginBottom: 4 }}>
              Create your account
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.65)' }}>
              Start your Faraid-compliant Islamic will
            </div>
          </div>

          {/* Form body */}
          <div style={{ padding: '32px 36px 28px' }}>

            {error === 'signup_failed' && (
              <div className="alert alert-r" style={{ marginBottom: 20 }}>
                Sign-up failed. This email may already be registered.
              </div>
            )}

            <form action={signUp}>
              <div className="fg">
                <label className="fl">Full name</label>
                <input
                  className="fi"
                  type="text"
                  name="fullName"
                  placeholder="e.g. Ahmed Khan"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="fg">
                <label className="fl">Email address</label>
                <input
                  className="fi"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="fg">
                <label className="fl">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="fi"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
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

              <div className="fg" style={{ marginBottom: 22 }}>
                <label className="fl">Confirm password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="fi"
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                    autoComplete="new-password"
                    style={{
                      paddingRight: 42,
                      borderColor: mismatch ? 'var(--red)' : undefined,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    tabIndex={-1}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute', right: 12, top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--ink3)', padding: 0, display: 'flex',
                    }}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {mismatch && (
                  <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 5 }}>
                    Passwords do not match
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-g"
                disabled={mismatch}
                style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '14px 28px', opacity: mismatch ? .5 : 1 }}
              >
                Create account &amp; start will
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
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--g)', fontWeight: 500 }}>Sign in</Link>
        </div>

      </div>
    </div>
  )
}
