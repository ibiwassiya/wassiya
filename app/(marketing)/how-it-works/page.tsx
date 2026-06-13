import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works — Wasiyya',
  description: 'From questionnaire to signed Islamic will — understand every step of the Wasiyya process.',
}

export default function HowItWorksPage() {
  return (
    <>
      <section className="secsm" style={{ background: 'var(--cr)' }}>
        <div className="max">
          <span className="eyebrow">The process</span>
          <h1 className="h1">How Wasiyya works</h1>
          <p className="lead">From your first question to a signed, legally valid Islamic will.</p>
        </div>
      </section>

      <section className="secsm" style={{ background: '#fff' }}>
        <div className="max">
          <div className="ptl">
            <div className="pstep">
              <div className="psn">01</div>
              <div>
                <div className="pst">Upload documents to pre-fill (optional)</div>
                <div className="psb">Upload your passport, driving licence, or existing will. Our AI extracts your name, date of birth, address, NI number, and property details — saving up to 10 minutes on the questionnaire.</div>
                <div className="psnote">Documents are encrypted on upload and deleted automatically after extraction. We never store originals.</div>
              </div>
            </div>
            <div className="pstep">
              <div className="psn">02</div>
              <div>
                <div className="pst">Complete the guided questionnaire</div>
                <div className="psb">20 guided steps covering: personal details, family composition, property and assets, debts, religious obligations, executor and guardian appointments, and any Islamic provisions. Takes approximately 20 minutes. Save and resume at any time.</div>
              </div>
            </div>
            <div className="pstep">
              <div className="psn">03</div>
              <div>
                <div className="pst">Review your summary and pay</div>
                <div className="psb">Before payment, you see a full summary of your answers and an itemised fee breakdown. Your exact price is shown here — no surprises. Payment is processed securely via Stripe.</div>
                <div className="psnote">No payment is taken until you have reviewed your full summary and are happy to proceed.</div>
              </div>
            </div>
            <div className="pstep">
              <div className="psn">04</div>
              <div>
                <div className="pst">AI generates your draft will</div>
                <div className="psb">Our AI uses your questionnaire answers to generate a Faraid-compliant will draft from a solicitor-approved clause library. This draft goes to your assigned solicitor for review — never sent directly to you.</div>
                <div className="psnote">Sensitive elements (e.g. nikah consultation) are never processed by AI — handled directly by a specialist solicitor.</div>
              </div>
            </div>
            <div className="pstep">
              <div className="psn">05</div>
              <div>
                <div className="pst">Solicitor and scholar review</div>
                <div className="psb">An SRA-regulated solicitor reviews every clause against your questionnaire answers. An Islamic scholar independently validates your Faraid inheritance shares. If the solicitor needs anything from you, they contact you via your secure portal.</div>
                <div className="psnote">Simple cases: 3 working days. Family cases: 5 working days. Complex cases: bespoke timeline agreed with you.</div>
              </div>
            </div>
            <div className="pstep">
              <div className="psn">06</div>
              <div>
                <div className="pst">Receive and sign your will</div>
                <div className="psb">Once approved, your completed will is available in your secure portal. Print it and sign in the presence of two independent witnesses — both present simultaneously, neither a beneficiary or married to one.</div>
                <div className="psnote">Full execution instructions are provided. Signing incorrectly is the most common reason a will is invalid in UK law.</div>
              </div>
            </div>
            <div className="pstep">
              <div className="psn">07</div>
              <div>
                <div className="pst">Complete your asset register</div>
                <div className="psb">After signing, complete your digital Asset Register — a secure companion document listing all your bank accounts, property, investments, pensions, religious obligations, and household bills. This helps your executors administer your estate without difficulty.</div>
              </div>
            </div>
            <div className="pstep">
              <div className="psn">08</div>
              <div>
                <div className="pst">Three-year review reminder</div>
                <div className="psb">We send you an automatic reminder every three years to review your will. Life events — a new child, property purchase, divorce — can change your Faraid distribution. Keeping your will current is as important as writing it.</div>
              </div>
            </div>
          </div>

          <div className="tlv">
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 18 }}>Typical case timeline</div>
            <div className="tlis">
              <div className="tli"><div className="tld tl-ok"><Check size={12} /></div><div className="tll">Day 1<br />Questionnaire</div></div>
              <div className="tli"><div className="tld tl-ok"><Check size={12} /></div><div className="tll">Day 1<br />Draft generated</div></div>
              <div className="tli"><div className="tld tl-cur">3</div><div className="tll">Days 2–3<br />In review</div></div>
              <div className="tli"><div className="tld tl-pend">4</div><div className="tll">Day 3–5<br />Approved</div></div>
              <div className="tli"><div className="tld tl-pend">5</div><div className="tll">Day 3–5<br />Delivered</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="secxs" style={{ background: 'var(--cr)', borderTop: '1px solid var(--cr3)', textAlign: 'center' }}>
        <div className="maxxs">
          <h2 className="h3">Ready to begin?</h2>
          <p className="lead c" style={{ marginBottom: 22 }}>It takes 20 minutes. No payment until you review your summary.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/start" className="btn btn-g">Start my will</Link>
            <Link href="/pricing" className="btn btn-o">View pricing</Link>
          </div>
        </div>
      </section>
    </>
  )
}
