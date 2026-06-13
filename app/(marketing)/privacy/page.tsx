import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Wasiyya',
  description: 'How Wasiyya collects, uses, and protects your personal data. ICO registered. UK GDPR compliant.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="secsm" style={{ background: 'var(--cr)' }}>
        <div className="max">
          <span className="eyebrow">Legal</span>
          <h1 className="h1">Privacy policy</h1>
          <p className="lead">Last updated: May 2025</p>
        </div>
      </section>

      <section className="secsm" style={{ background: '#fff' }}>
        <div className="maxs">
          <h2 className="h3">1. Who we are</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 24 }}>Wasiyya Ltd is registered in England and Wales. We are registered with the Information Commissioner&apos;s Office (ICO) as a data controller. We take the protection of your personal data seriously and are committed to full compliance with UK GDPR.</p>

          <h2 className="h3">2. What data we collect</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 24 }}>We collect: identity data (full name, date of birth, nationality, NI number), contact data (email, phone, address), will questionnaire data (family, assets, debts, religious obligations), financial data (transaction amounts via Stripe — we do not store card details), and technical data (IP address, browser, device).</p>

          <h2 className="h3">3. How we protect your data</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 24 }}>All personal data fields are encrypted at field level using AES-256 before being stored. Documents are stored in encrypted cloud storage in the UK. All data is transmitted over TLS 1.3. We maintain a full audit log of every data access event.</p>

          <h2 className="h3">4. Who sees your data</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 24 }}>Your questionnaire answers are accessible only to: your assigned SRA-regulated solicitor (for will review), your assigned Islamic scholar (for Faraid validation), and your referring financial advisor (commission tracking only — they do not see your personal data unless you have explicitly consented to upsell contact). We never sell your data. We never share it for marketing purposes.</p>

          <h2 className="h3">5. Your rights</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 24 }}>Under UK GDPR you have the right to: access your data, correct inaccurate data, request erasure, restrict processing, and data portability. Contact us at privacy@wasiyya.co.uk.</p>

          <h2 className="h3">6. Contact</h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.8 }}>For privacy queries: privacy@wasiyya.co.uk</p>
        </div>
      </section>
    </>
  )
}
