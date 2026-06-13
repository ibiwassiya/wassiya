import type { Metadata } from 'next'
import Link from 'next/link'
import FaqAccordion from '@/components/FaqAccordion'
import { Scale, BookOpen, ShieldCheck, Banknote, ArrowRight, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Wasiyya — Islamic Estate Planning',
  description: 'Faraid-compliant, solicitor-reviewed Islamic wills for UK Muslim families.',
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', alignItems: 'center', background: 'var(--cr)', position: 'relative', overflow: 'hidden', padding: '60px 0' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 40%,rgba(29,158,117,.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--cr3) 1px,transparent 1px),linear-gradient(90deg,var(--cr3) 1px,transparent 1px)', backgroundSize: '48px 48px', opacity: .3, pointerEvents: 'none' }} />
        <div className="max" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--g)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
                <span style={{ display: 'block', width: 28, height: 1, background: 'var(--g)' }} />
                UK Islamic estate planning
              </div>
              <h1 className="h1" style={{ fontSize: 'clamp(48px,6vw,80px)' }}>Your will.<br /><em style={{ color: 'var(--g)', fontStyle: 'italic' }}>Done properly.</em></h1>
              <p className="lead" style={{ marginBottom: 34 }}>Faraid-compliant, solicitor-reviewed Islamic wills for UK Muslim families. Guided, affordable, and built with scholars.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
                <Link href="/start" className="btn btn-g">Start my will</Link>
                <Link href="/how-it-works" className="btn btn-o">How it works</Link>
              </div>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <div><div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 300, color: 'var(--gd)', lineHeight: 1, marginBottom: 3 }}>3.9M</div><div style={{ fontSize: 12, color: 'var(--ink3)' }}>UK Muslims</div></div>
                <div><div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 300, color: 'var(--gd)', lineHeight: 1, marginBottom: 3 }}>&lt;5%</div><div style={{ fontSize: 12, color: 'var(--ink3)' }}>have a valid will</div></div>
                <div><div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 300, color: 'var(--gd)', lineHeight: 1, marginBottom: 3 }}>20 min</div><div style={{ fontSize: 12, color: 'var(--ink3)' }}>to complete</div></div>
              </div>
            </div>
            <div style={{ position: 'relative' }} className="hcard-wrap">
              <div className="hcard">
                <div className="hch">
                  <div className="hcav">W</div>
                  <div><div className="hcn">Wasiyya Platform</div><div className="hcs">Islamic estate planning</div></div>
                  <div className="hcst">Secure</div>
                </div>
                <div className="hcrow"><span className="hcrl">Case type</span><span className="hcrv">Family package</span></div>
                <div className="hcrow"><span className="hcrl">Faraid shares</span><span className="hcrv g">Scholar validated <Check size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }} /></span></div>
                <div className="hcrow"><span className="hcrl">Solicitor</span><span className="hcrv">Fatima Hassan SRA</span></div>
                <div className="hcrow"><span className="hcrl">Status</span><span className="hcrv a">In review</span></div>
                <div className="hcrow"><span className="hcrl">Estimated fee</span><span className="hcrv">£1,200</span></div>
                <Link href="/start" className="hcbtn">Start your will <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></Link>
              </div>
              <div className="hfloat">Plans from £499</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="trust">
        <div className="max">
          <div className="trustgrid">
            <div style={{ textAlign: 'center' }}><div style={{ marginBottom: 8 }}><Scale size={22} color="#fff" /></div><div className="trust-title">SRA-regulated solicitors</div><div className="trust-body">Every will reviewed by a qualified solicitor with PI insurance</div></div>
            <div style={{ textAlign: 'center' }}><div style={{ marginBottom: 8 }}><BookOpen size={22} color="#fff" /></div><div className="trust-title">Scholar-validated Faraid</div><div className="trust-body">Qualified Islamic scholars verify every inheritance calculation</div></div>
            <div style={{ textAlign: 'center' }}><div style={{ marginBottom: 8 }}><ShieldCheck size={22} color="#fff" /></div><div className="trust-title">Bank-grade security</div><div className="trust-body">AES-256 encryption. ICO registered. UK GDPR compliant</div></div>
            <div style={{ textAlign: 'center' }}><div style={{ marginBottom: 8 }}><Banknote size={22} color="#fff" /></div><div className="trust-title">Transparent pricing</div><div className="trust-body">Exact fee confirmed before payment. No hidden costs</div></div>
          </div>
        </div>
      </div>

      {/* Four steps */}
      <section className="sec" style={{ background: '#fff' }}>
        <div className="max tc">
          <span className="eyebrow">Simple process</span>
          <h2 className="h2">Your Islamic will in four steps</h2>
          <p className="lead c">From questionnaire to completed, solicitor-reviewed will. Most cases done in 3–5 working days.</p>
          <div className="stepsgrid">
            <div className="step"><div className="step-n">01</div><div className="step-t">Tell us about yourself</div><div className="step-b">Upload documents to pre-fill. 20-step guided questionnaire. Takes about 20 minutes.</div></div>
            <div className="step"><div className="step-n">02</div><div className="step-t">We generate your draft</div><div className="step-b">AI produces a Faraid-compliant draft using solicitor-approved templates. Fee confirmed before payment.</div></div>
            <div className="step"><div className="step-n">03</div><div className="step-t">Solicitor reviews</div><div className="step-b">An SRA-regulated solicitor reviews every clause. An Islamic scholar validates your Faraid shares.</div></div>
            <div className="step"><div className="step-n">04</div><div className="step-t">Sign &amp; done</div><div className="step-b">Download, sign with two independent witnesses, store safely. 3-year review reminder included.</div></div>
          </div>
          <div style={{ marginTop: 40 }}><Link href="/how-it-works" className="btn btn-g">See full process <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></Link></div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="sec" style={{ background: 'var(--cr)' }}>
        <div className="max">
          <div className="tc" style={{ marginBottom: 38 }}>
            <span className="eyebrow">Transparent pricing</span>
            <h2 className="h2">Three packages. One platform.</h2>
            <p className="lead c">No payment until you review your full summary.</p>
          </div>
          <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 600, color: 'var(--gd)', marginBottom: 34 }}>Plans from £499 · Exact fee shown before you pay</p>
          <div className="plangrid">
            <div className="plan ch">
              <div className="plan-name">Essentials</div><div className="plan-price">£499 – £799</div><div className="plan-sub">Straightforward estates</div>
              <ul className="plan-feats"><li>Faraid-compliant will</li><li>SRA solicitor review</li><li>Funeral instructions</li><li>Secure storage</li><li>3-year reminder</li></ul>
              <Link href="/start" className="btn btn-o" style={{ width: '100%', justifyContent: 'center' }}>Get started</Link>
            </div>
            <div className="plan feat ch">
              <div className="plan-label">Most popular</div>
              <div className="plan-name">Family</div><div className="plan-price">£1,200 – £1,800</div><div className="plan-sub">Families with children</div>
              <ul className="plan-feats"><li>Mirror wills (husband &amp; wife)</li><li>Guardianship &amp; trust</li><li>Scholar-validated shares</li><li>Executors (up to 3)</li><li>All Essentials features</li></ul>
              <Link href="/start" className="btn btn-g" style={{ width: '100%', justifyContent: 'center' }}>Get started</Link>
            </div>
            <div className="plan ch">
              <div className="plan-name">Complex</div><div className="plan-price">£2,000 – £10,000</div><div className="plan-sub">Complex estates</div>
              <ul className="plan-feats"><li>Business succession</li><li>Overseas property</li><li>Waqf trust &amp; POA</li><li>IHT specialist</li><li>All Family features</li></ul>
              <Link href="/start" className="btn btn-o" style={{ width: '100%', justifyContent: 'center' }}>Get started</Link>
            </div>
          </div>
          <div className="tc" style={{ marginTop: 18 }}><Link href="/pricing" className="btn btn-gh">See full pricing &amp; add-ons <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></Link></div>
        </div>
      </section>

      {/* Advisor CTA */}
      <section className="sec" style={{ background: 'var(--gd)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 80% 50%,rgba(29,158,117,.25) 0%,transparent 70%)' }} />
        <div className="max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid2" style={{ gap: 72 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <span style={{ width: 20, height: 1, background: 'rgba(255,255,255,.35)', display: 'block' }} />
                For financial advisors
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,50px)', fontWeight: 400, lineHeight: 1.1, color: '#fff', marginBottom: 16 }}>Earn 20% on every case you refer</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', lineHeight: 1.7, fontWeight: 300, marginBottom: 28 }}>Your clients need Islamic wills. Wasiyya pays you 20% of every completed case fee — automatically, with no invoicing.</p>
              <Link href="/for-advisors" className="btn btn-w">Learn about our advisor programme <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></Link>
            </div>
            <div className="ctbl">
              <div className="ctbl-h"><span>Case type</span><span>Your commission</span></div>
              <div className="ctbl-r"><span className="ctbl-t">Essentials will</span><span className="ctbl-v">£100</span></div>
              <div className="ctbl-r"><span className="ctbl-t">Family package</span><span className="ctbl-v">£240</span></div>
              <div className="ctbl-r"><span className="ctbl-t">Complex estate (avg)</span><span className="ctbl-v">£600+</span></div>
              <div className="ctbl-r"><span className="ctbl-t">10 referrals/month</span><span className="ctbl-v">~£1,800/mo</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" style={{ background: '#fff' }}>
        <div className="max">
          <div className="tc" style={{ marginBottom: 44 }}>
            <span className="eyebrow">Common questions</span>
            <h2 className="h2">Frequently asked questions</h2>
          </div>
          <div className="maxs" style={{ padding: 0 }}>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="secxs" style={{ background: 'var(--cr)', borderTop: '1px solid var(--cr3)' }}>
        <div className="maxxs tc">
          <h2 className="h2">Protect your family&apos;s future today</h2>
          <p className="lead c" style={{ marginBottom: 24 }}>Writing your will is a duty in Islam. It takes 20 minutes. Start now.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
            <Link href="/start" className="btn btn-g">Start my will — free to begin</Link>
            <Link href="/for-advisors" className="btn btn-o">I&apos;m an advisor</Link>
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink3)' }}>Plans from £499 · Solicitor-reviewed · Scholar-validated · ICO registered</p>
        </div>
      </section>
    </>
  )
}
