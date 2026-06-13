import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Advisors — Wasiyya',
  description: 'Earn 20% commission on every Islamic will case you refer. Free to join, no minimums.',
}

export default function ForAdvisorsPage() {
  return (
    <>
      <section style={{ background: 'var(--gd)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 90% at 75% 50%,rgba(29,158,117,.3) 0%,transparent 65%)' }} />
        <div className="max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid2" style={{ gap: 72 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <span style={{ display: 'block', width: 20, height: 1, background: 'rgba(255,255,255,.35)' }} />
                For financial advisors
              </div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 400, lineHeight: 1.05, color: '#fff', marginBottom: 16 }}>A new revenue stream. A service your clients need.</h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,.65)', lineHeight: 1.7, fontWeight: 300, marginBottom: 28 }}>Less than 5% of UK Muslims have an Islamic will. Your clients are among them. Wasiyya gives you a trusted platform to refer them to — and pays you 20% of every completed case automatically.</p>
              <Link href="/advisor-signup" className="btn btn-w">Register as an advisor partner</Link>
            </div>
            <div className="advc">
              <div className="advc-t">Commission calculator</div>
              <div className="advc-r"><span className="advc-l">Essentials will (£499)</span><span className="advc-v">£100</span></div>
              <div className="advc-r"><span className="advc-l">Family package (£1,200)</span><span className="advc-v">£240</span></div>
              <div className="advc-r"><span className="advc-l">Complex estate (avg £3,000)</span><span className="advc-v">£600</span></div>
              <div className="advc-r"><span className="advc-l">10 referrals/month (blended)</span><span className="advc-v">~£1,800/mo</span></div>
              <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.1)' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: 4 }}>Example: 10 referrals/month</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: '#fff', fontWeight: 300 }}>£1,000<span style={{ fontSize: 16, color: 'rgba(255,255,255,.5)' }}>/month</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: '#fff' }}>
        <div className="max">
          <div className="tc"><span className="eyebrow">Simple referral process</span><h2 className="h2">Refer in seconds. Earn automatically.</h2></div>
          <div className="refsteps">
            <div className="refstep"><div className="refn">1</div><div className="reft">Register free</div><div className="refb">Create your advisor account. No fees, no minimums. Your referral dashboard is available immediately.</div></div>
            <div className="refstep"><div className="refn">2</div><div className="reft">Refer your client</div><div className="refb">Send your client a personalised referral link. Their case is linked to your account automatically.</div></div>
            <div className="refstep"><div className="refn">3</div><div className="reft">We handle everything</div><div className="refb">Questionnaire, AI draft, solicitor review, scholar validation. We deliver the completed will.</div></div>
            <div className="refstep"><div className="refn">4</div><div className="reft">Collect commission</div><div className="refb">20% paid automatically when the case completes. Monthly statements provided. No invoicing.</div></div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--cr)' }}>
        <div className="max">
          <div className="tc" style={{ marginBottom: 40 }}>
            <span className="eyebrow">Beyond the will</span>
            <h2 className="h2">Turn answers into planning opportunities</h2>
            <p className="lead c">With your client&apos;s consent, Wasiyya flags financial planning gaps identified during the questionnaire — surfacing warm leads in your advisor dashboard.</p>
          </div>
          <div className="uptbl" style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="upth"><span>Flagged from questionnaire</span><span>Opportunity surfaced to you</span></div>
            <div className="upr"><span className="upt">Property owned + no life insurance noted</span><span className="upo">Life insurance / protection review</span></div>
            <div className="upr"><span className="upt">Pension held + beneficiary nomination not confirmed</span><span className="upo">Pension nomination update</span></div>
            <div className="upr"><span className="upt">Cash savings + no Sharia-compliant investment</span><span className="upo">Halal ISA / investment referral</span></div>
            <div className="upr"><span className="upt">Estate above £325k</span><span className="upo">IHT planning consultation</span></div>
            <div className="upr"><span className="upt">Business interest declared</span><span className="upo">Business succession &amp; keyman cover</span></div>
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink3)', marginTop: 14 }}>Upsell flags only shown where the client has given explicit consent at checkout.</p>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--gd)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 80% 50%,rgba(29,158,117,.25) 0%,transparent 70%)' }} />
        <div className="max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid2" style={{ gap: 72 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px,4vw,48px)', fontWeight: 400, lineHeight: 1.1, color: '#fff', marginBottom: 16 }}>Four key benefits</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', lineHeight: 1.7, fontWeight: 300, marginBottom: 28 }}>No minimums. No lock-in. No invoicing. The most straightforward referral arrangement in UK Islamic financial services.</p>
              <Link href="/advisor-signup" className="btn btn-w">Register as an advisor partner</Link>
            </div>
            <div className="bengrid">
              <div className="benc"><div className="bent">Refer in seconds</div><div className="benb">Send your client a personalised link from your dashboard. Their case is linked to you automatically.</div></div>
              <div className="benc"><div className="bent">Track in real time</div><div className="benb">See every case status, fee, and commission in your dashboard. Full transparency.</div></div>
              <div className="benc"><div className="bent">Upsell flags</div><div className="benb">With consent, we surface financial planning gaps from the questionnaire as warm leads.</div></div>
              <div className="benc"><div className="bent">Auto commission</div><div className="benb">20% paid automatically on case completion. Monthly statements. No chasing invoices.</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="secxs" style={{ background: 'var(--cr)', textAlign: 'center', borderTop: '1px solid var(--cr3)' }}>
        <div className="maxxs">
          <h2 className="h3">Ready to start earning?</h2>
          <p className="lead c" style={{ marginBottom: 22 }}>Register free. No minimum referral volume. No lock-in.</p>
          <Link href="/advisor-signup" className="btn btn-g">Register as an advisor partner</Link>
        </div>
      </section>
    </>
  )
}
