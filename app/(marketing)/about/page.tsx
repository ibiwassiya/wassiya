import type { Metadata } from 'next'
import Link from 'next/link'
import { Handshake, Scale, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — Wasiyya',
  description: 'The story behind Wasiyya — the UK\'s first Faraid-compliant Islamic estate planning platform.',
}

export default function AboutPage() {
  return (
    <>
      <section className="secsm" style={{ background: 'var(--cr)' }}>
        <div className="max">
          <span className="eyebrow">Our story</span>
          <h1 className="h1">About Wasiyya</h1>
          <p className="lead">We started Wasiyya because we experienced the problem first-hand — a family without an Islamic will, and the disputes and heartbreak that followed.</p>
        </div>
      </section>

      <section className="sec" style={{ background: '#fff' }}>
        <div className="max">
          <div className="grid2" style={{ gap: 72 }}>
            <div>
              <span className="eyebrow">Our mission</span>
              <h2 className="h2">Making Islamic estate planning accessible to every UK Muslim</h2>
              <p className="lead" style={{ maxWidth: 'none', marginBottom: 20 }}>Less than 5% of UK Muslims have a valid Islamic will. When someone dies without one, UK intestacy law applies — not Faraid. Spouses receive the wrong share, children are unprotected, and religious obligations go unsettled.</p>
              <p style={{ fontSize: 15, color: 'var(--ink3)', lineHeight: 1.7 }}>Wasiyya exists to change this. We&apos;ve built the UK&apos;s first platform specifically designed for the complexity of Islamic estate planning — combining modern technology with the rigour of an SRA-regulated solicitor and the authority of a qualified Islamic scholar.</p>
            </div>
            <div>
              <div className="card" style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--gd)', marginBottom: 8 }}>Why wills matter in Islam</div>
                <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.7 }}>The Prophet Muhammad (peace be upon him) said: &ldquo;It is the duty of a Muslim who has anything to bequest not to let two nights pass without writing a will about it.&rdquo; — Sahih al-Bukhari &amp; Muslim. A will is not just a legal document — it is an act of worship and care for those you leave behind.</p>
              </div>
              <div className="card">
                <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--gd)', marginBottom: 8 }}>Why UK Muslims need a specialist</div>
                <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.7 }}>Generic will-writing services do not understand Faraid, Wasiyyah, Waqf, Mahr, or the nuances of overseas property ownership. Only a platform built specifically for Islamic estates — and validated by scholars — can do this properly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--cr)' }}>
        <div className="max">
          <div className="tc" style={{ marginBottom: 44 }}>
            <span className="eyebrow">Our team</span>
            <h2 className="h2">Built by people who understand the problem</h2>
          </div>
          <div className="teamgrid">
            <div className="teamc">
              <div className="teamav">F</div>
              <div className="teamn">Fatima Hassan</div>
              <div className="teamr">Lead Solicitor Partner · SRA: 123456</div>
              <div className="teambio">Islamic estate specialist with 12 years experience in Faraid-compliant wills, trusts, and estate administration. Previously at Irwin Mitchell.</div>
            </div>
            <div className="teamc">
              <div className="teamav">M</div>
              <div className="teamn">Mufti Ibrahim Ali</div>
              <div className="teamr">Islamic Scholar · Faraid Validation</div>
              <div className="teambio">Qualified in fiqh al-mawarith from Darul Uloom. Validates all Faraid calculations and religious obligation provisions on the platform.</div>
            </div>
            <div className="teamc">
              <div className="teamav">B</div>
              <div className="teamn">Bilal Mahmood</div>
              <div className="teamr">Head of Advisor Partnerships</div>
              <div className="teambio">10 years as an IFA specialising in Muslim community financial planning. Leads our network of advisor partners across the UK.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: '#fff' }}>
        <div className="max">
          <div className="tc" style={{ marginBottom: 44 }}>
            <span className="eyebrow">Our commitments</span>
            <h2 className="h2">How we work</h2>
          </div>
          <div className="grid3">
            <div className="cardsm">
              <div style={{ marginBottom: 10 }}><Handshake size={22} color="var(--g)" /></div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>Scholar-first approach</div>
              <div style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.6 }}>Every Islamic provision on our platform has been validated by qualified scholars. We do not publish guidance without religious authority behind it.</div>
            </div>
            <div className="cardsm">
              <div style={{ marginBottom: 10 }}><Scale size={22} color="var(--g)" /></div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>Legal rigour</div>
              <div style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.6 }}>Every will is reviewed by an SRA-regulated solicitor with professional indemnity insurance. We do not cut corners on legal quality.</div>
            </div>
            <div className="cardsm">
              <div style={{ marginBottom: 10 }}><ShieldCheck size={22} color="var(--g)" /></div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>Privacy by design</div>
              <div style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.6 }}>Your data is never sold. Personal details are encrypted at field level. You can request deletion at any time. ICO registered.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="secxs" style={{ background: 'var(--cr)', borderTop: '1px solid var(--cr3)', textAlign: 'center' }}>
        <div className="maxxs">
          <h2 className="h3">Ready to get started?</h2>
          <p className="lead c" style={{ marginBottom: 22 }}>Join thousands of UK Muslim families protecting their future with a Faraid-compliant will.</p>
          <Link href="/start" className="btn btn-g">Start my will</Link>
        </div>
      </section>
    </>
  )
}
