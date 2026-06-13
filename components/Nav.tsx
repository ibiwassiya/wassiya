'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/for-advisors', label: 'For advisors' },
  { href: '/for-mosques', label: 'For mosques' },
  { href: '/about', label: 'About' },
  { href: '/login', label: 'Sign in' },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`nl${pathname === l.href ? ' cur' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/start" className="ncta">Start my will</Link>
          </div>
          <button className="nmob" onClick={toggleMenu} aria-label="Menu">
            <span style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : '' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : '' }} />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <Link key={l.href} href={l.href} className="mml" onClick={closeMenu}>{l.label}</Link>
        ))}
        <Link href="/solicitor" className="mml" onClick={closeMenu}>Solicitor portal</Link>
        <Link href="/advisor-portal" className="mml" onClick={closeMenu}>Advisor portal</Link>
        <Link href="/start" className="btn btn-g" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }} onClick={closeMenu}>Start my will</Link>
      </div>
    </>
  )
}
