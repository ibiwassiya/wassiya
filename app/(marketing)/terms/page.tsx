import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Wasiyya',
  description: 'Wasiyya terms of service — what we provide, payment, refunds, and your responsibilities.',
}

export default function TermsPage() {
  return (
    <>
      <section className="secsm" style={{ background: 'var(--cr)' }}>
        <div className="max">
          <span className="eyebrow">Legal</span>
          <h1 className="h1">Terms of service</h1>
          <p className="lead">Last updated: May 2025</p>
        </div>
      </section>

      <section className="secsm" style={{ background: '#fff' }}>
        <div className="maxs">
          <div className="alert alert-a" style={{ marginBottom: 24 }}>This is a summary for general guidance. The full legal terms will be drafted by our solicitor partners before launch.</div>

          <h2 className="h3">1. Our service</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 24 }}>Wasiyya provides an Islamic estate planning platform enabling you to prepare a will with AI technology, reviewed by SRA-regulated solicitors and validated by Islamic scholars. Will writing is not a regulated activity in the UK. Trust creation and power of attorney services are handled by our regulated solicitor partners.</p>

          <h2 className="h3">2. What we provide</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 24 }}>We provide: a guided questionnaire, an AI-generated will draft, solicitor review, scholar validation, a completed will document, and secure storage. We do not provide legal advice directly — your legal advice is provided by our SRA-regulated solicitor partners who review your will.</p>

          <h2 className="h3">3. Payment and refunds</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 24 }}>Payment is taken only after you have reviewed your full fee summary and confirmed you wish to proceed. Refunds are available if your case has not been assigned to a solicitor, or the solicitor has not yet begun review. Once solicitor review is complete, no refund is available. Contact support@wasiyya.co.uk for refund requests.</p>

          <h2 className="h3">4. Your responsibilities</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 24 }}>You are responsible for: providing accurate and complete information, signing your will correctly with two independent witnesses, informing Wasiyya of any significant changes to your circumstances, and keeping your login credentials secure.</p>

          <h2 className="h3">5. Limitation of liability</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8 }}>Wasiyya&apos;s liability is limited to the fee you paid for the service. We are not liable for any loss arising from incorrect information provided in the questionnaire or failure to execute your will correctly.</p>
        </div>
      </section>
    </>
  )
}
