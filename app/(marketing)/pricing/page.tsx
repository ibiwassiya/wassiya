import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — Wasiyya',
  description: 'Transparent pricing for Islamic wills. Three packages from £499. No payment until you review your summary.',
}

export default function PricingPage() {
  return (
    <>
      <section className="secsm" style={{ background: 'var(--cr)' }}>
        <div className="max tc">
          <span className="eyebrow">Transparent pricing</span>
          <h1 className="h1">Three packages. One platform.</h1>
          <p className="lead c">Your exact fee is confirmed at the end of your questionnaire — no payment until you review your summary.</p>
        </div>
      </section>

      <section className="secsm" style={{ background: '#fff' }}>
        <div className="max">
          <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 600, color: 'var(--gd)', marginBottom: 34 }}>Plans from £499 · No payment until you review your summary</p>
          <div className="plangrid">
            <div className="plan ch">
              <div className="plan-name">Essentials</div>
              <div className="plan-price">£499 – £799</div>
              <div className="plan-sub">Straightforward single estate</div>
              <ul className="plan-feats">
                <li>Faraid-compliant will</li>
                <li>SRA solicitor review &amp; sign-off</li>
                <li>Scholar Faraid validation</li>
                <li>Funeral instructions (Sunnah)</li>
                <li>Executor appointment</li>
                <li>Encrypted digital storage</li>
                <li>3-year review reminder</li>
              </ul>
              <Link href="/start" className="btn btn-o" style={{ width: '100%', justifyContent: 'center' }}>Get started</Link>
            </div>
            <div className="plan feat ch">
              <div className="plan-label">Most popular</div>
              <div className="plan-name">Family</div>
              <div className="plan-price">£1,200 – £1,800</div>
              <div className="plan-sub">Families with children</div>
              <ul className="plan-feats">
                <li>Mirror wills — husband &amp; wife</li>
                <li>Guardianship &amp; backup</li>
                <li>Children&apos;s trust (minors)</li>
                <li>Scholar-validated Faraid shares</li>
                <li>Executors (up to 3)</li>
                <li>Per stirpes distribution clause</li>
                <li>Survivorship period clause</li>
                <li>All Essentials features</li>
              </ul>
              <Link href="/start" className="btn btn-g" style={{ width: '100%', justifyContent: 'center' }}>Get started</Link>
            </div>
            <div className="plan ch">
              <div className="plan-name">Complex</div>
              <div className="plan-price">£2,000 – £10,000</div>
              <div className="plan-sub">Complex estates</div>
              <ul className="plan-feats">
                <li>Business succession provisions</li>
                <li>Overseas property addendum</li>
                <li>Waqf charitable endowment trust</li>
                <li>Power of attorney (Wakala)</li>
                <li>IHT specialist review</li>
                <li>Professional executor provisions</li>
                <li>Domicile declaration clause</li>
                <li>All Family features</li>
              </ul>
              <Link href="/start" className="btn btn-o" style={{ width: '100%', justifyContent: 'center' }}>Get started</Link>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink3)', marginTop: 16 }}>All prices include VAT · Exact fee shown before payment · IHT initial review included at no extra charge</p>
        </div>
      </section>

      <section className="secsm" style={{ background: 'var(--cr)' }}>
        <div className="max">
          <div className="tc" style={{ marginBottom: 8 }}>
            <span className="eyebrow">Optional add-ons</span>
            <h2 className="h2" style={{ fontSize: 'clamp(26px,3.5vw,42px)' }}>Enhance your will</h2>
            <p className="lead c" style={{ marginBottom: 0 }}>Add only what you need. All add-ons are shown in your fee summary before payment.</p>
          </div>
          <div className="addgrid">
            <div className="addon ch"><div className="addon-n">Overseas property addendum</div><div className="addon-d">Clause addressing property abroad. Note on separate jurisdiction will requirement.</div><div className="addon-p">+£500</div></div>
            <div className="addon ch"><div className="addon-n">Waqf charitable endowment</div><div className="addon-d">Ongoing charity trust — assets set aside for a cause in perpetuity. Requires separate trust deed.</div><div className="addon-p">+£800</div></div>
            <div className="addon ch"><div className="addon-n">Power of attorney (Wakala)</div><div className="addon-d">Appoint someone to manage your affairs if you lose capacity. Drafted within Islamic principles.</div><div className="addon-p">+£400</div></div>
            <div className="addon ch"><div className="addon-n">IHT specialist review</div><div className="addon-d">Inheritance tax specialist assigned. Relevant if estate exceeds £325k individual / £650k couple.</div><div className="addon-p">+£750</div></div>
            <div className="addon ch"><div className="addon-n">Private solicitor consultation</div><div className="addon-d">For sensitive matters not covered by your legal marriage. Off-platform, fully confidential.</div><div className="addon-p">+£600</div></div>
            <div className="addon ch"><div className="addon-n">Business succession provisions</div><div className="addon-d">Sole trader wind-down or company share transfer clauses for business owners.</div><div className="addon-p">+£500</div></div>
          </div>
        </div>
      </section>
    </>
  )
}
