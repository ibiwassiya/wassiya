'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/for-advisors', label: 'For advisors' },
  { href: '/for-mosques', label: 'For mosques' },
  { href: '/about', label: 'About' },
]

const ROLE_DASHBOARDS: Record<string, string> = {
  client:    '/portal',
  advisor:   '/advisor',
  solicitor: '/solicitor',
  scholar:   '/scholar',
  admin:     '/admin',
}

interface NavProps {
  initialUser:      User | null
  initialRole:      string | null
  initialDashboard: string
}

export default function Nav({ initialUser, initialRole, initialDashboard }: NavProps) {
  const pathname = usePathname()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [user,      setUser]      = useState<User | null>(initialUser)
  const [role,      setRole]      = useState<string | null>(initialRole)
  const [dashboard, setDashboard] = useState(initialDashboard)

  useEffect(() => {
    const supabase = createClient()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()
          const r = (data as { role: string } | null)?.role ?? 'client'
          setUser(session.user)
          setRole(r)
          setDashboard(ROLE_DASHBOARDS[r] ?? '/portal')
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setRole(null)
        setDashboard('/portal')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const toggleMenu = () => setMenuOpen(v => !v)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="navinner">
          <Link href="/" className="logo">Wasi<span>yya</span></Link>
          <div className="navlinks">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`nl${pathname === l.href ? ' cur' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="navcta">
            {user
              ? <Link href={dashboard} className="ncta" style={{ background: 'var(--ink)', color: '#fff' }}>Dashboard</Link>
              : <Link href="/login" className={`nl${pathname === '/login' ? ' cur' : ''}`}>Sign in</Link>
            }
            {(!user || role === 'client') && (
              <Link href="/start" className="ncta">Start my will</Link>
            )}
          </div>
          <button className="nmob" onClick={toggleMenu} aria-label="Menu">
            <span style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : '' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : '' }} />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(l => (
          <Link key={l.href} href={l.href} className="mml" onClick={closeMenu}>{l.label}</Link>
        ))}
        {user
          ? <Link href={dashboard} className="mml" onClick={closeMenu}>Dashboard</Link>
          : <Link href="/login" className="mml" onClick={closeMenu}>Sign in</Link>
        }
        {role === 'solicitor' && (
          <Link href="/solicitor" className="mml" onClick={closeMenu}>Solicitor portal</Link>
        )}
        {role === 'advisor' && (
          <Link href="/advisor" className="mml" onClick={closeMenu}>Advisor portal</Link>
        )}
        {(!user || role === 'client') && (
          <Link href="/start" className="btn btn-g" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }} onClick={closeMenu}>Start my will</Link>
        )}
      </div>
    </>
  )
}
