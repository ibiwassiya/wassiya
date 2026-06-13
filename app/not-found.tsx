import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', alignItems: 'center', background: 'var(--cr)', textAlign: 'center' }}>
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(80px,12vw,160px)', fontWeight: 300, color: 'var(--gd)', lineHeight: 1, marginBottom: 16 }}>404</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 400, color: 'var(--ink)', marginBottom: 12 }}>Page not found</h1>
        <p style={{ fontSize: 15, color: 'var(--ink3)', marginBottom: 28 }}>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn btn-g">Return home</Link>
      </div>
    </div>
  )
}
