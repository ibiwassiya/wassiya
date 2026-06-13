import type { Metadata } from 'next'
import Link from 'next/link'
import { Megaphone, Coins, GraduationCap, FileText, Link2, BarChart2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Mosques — Wasiyya',
  description: 'Partner with Wasiyya to offer your community Islamic estate planning and earn 10% commission for your mosque fund.',
}

export default function ForMosquesPage() {
  return (
    <>
      <section style={{ background: 'var(--gd)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 70% 50%,rgba(29,158,117,.3) 0%,transparent 65%)' }} />
        <div className="max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid2" style={{ gap: 60 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 18 }}>For mosques &amp; Islamic institutions</div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 400, lineHeight: 1.05, color: '#fff', marginBottom: 16 }}>A community service — and a fundraising opportunity</h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', lineHeight: 1.7, fontWeight: 300, marginBottom: 28 }}>Partner with Wasiyya to offer your community access to Islamic estate planning — and earn 10% of every completed case fee for your mosque fund.</p>
              <Link href="mailto:mosques@wasiyya.co.uk" className="btn btn-w">Register mosque partnership</Link>
            </div>
            <div className="advc">
              <div className="advc-t">Mosque partnership model</div>
              <div className="advc-r"><span className="advc-l">Commission rate</span><span className="advc-v">10% of fee</span></div>
              <div className="advc-r"><span className="advc-l">Essentials will (£499)</span><span className="advc-v">£50</span></div>
              <div className="advc-r"><span className="advc-l">Family package (£1,200)</span><span className="advc-v">£120</span></div>
              <div className="advc-r"><span className="advc-l">50 cases/year</span><span className="advc-v">~£3,000+</span></div>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.1)' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', lineHeight: 1.6 }}>Commission goes directly to your mosque fund. Automatically paid monthly. No administration required.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: '#fff' }}>
        <div className="max">
          <div className="tc" style={{ marginBottom: 44 }}>
            <span className="eyebrow">Partnership benefits</span>
            <h2 className="h2">Why partner with Wasiyya?</h2>
          </div>
          <div className="mosquegrid">
            <div className="mosquec"><div className="mosquei"><Megaphone size={22} color="var(--g)" /></div><div className="mosquett">Fulfil a religious duty</div><div className="mosqueb">By partnering with Wasiyya, your mosque actively helps its community fulfil the Islamic obligation of writing a will.</div></div>
            <div className="mosquec"><div className="mosquei"><Coins size={22} color="var(--g)" /></div><div className="mosquett">Fundraising for your mosque</div><div className="mosqueb">10% of every completed case fee is donated to your mosque fund automatically. No paperwork, no chasing.</div></div>
            <div className="mosquec"><div className="mosquei"><GraduationCap size={22} color="var(--g)" /></div><div className="mosquett">Imam briefing sessions</div><div className="mosqueb">We provide materials and sessions to help imams talk confidently about Islamic estate planning.</div></div>
            <div className="mosquec"><div className="mosquei"><FileText size={22} color="var(--g)" /></div><div className="mosquett">Community materials</div><div className="mosqueb">Branded leaflets, posters, and digital assets for your noticeboard and WhatsApp groups — all provided free.</div></div>
            <div className="mosquec"><div className="mosquei"><Link2 size={22} color="var(--g)" /></div><div className="mosquett">Dedicated referral link</div><div className="mosqueb">Your mosque gets a unique referral link. Every member who uses it is tracked and commission calculated automatically.</div></div>
            <div className="mosquec"><div className="mosquei"><BarChart2 size={22} color="var(--g)" /></div><div className="mosquett">Community dashboard</div><div className="mosqueb">Track how many of your community members have completed their will. See total commission earned in real time.</div></div>
          </div>
        </div>
      </section>

      <section className="secxs" style={{ background: 'var(--cr)', borderTop: '1px solid var(--cr3)', textAlign: 'center' }}>
        <div className="maxxs">
          <h2 className="h3">Interested in partnering?</h2>
          <p className="lead c" style={{ marginBottom: 22 }}>Email us at <strong>mosques@wasiyya.co.uk</strong> or register your interest below.</p>
          <Link href="mailto:mosques@wasiyya.co.uk" className="btn btn-g">Register mosque interest</Link>
        </div>
      </section>
    </>
  )
}
