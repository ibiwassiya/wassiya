import type { Metadata } from 'next'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

export const metadata: Metadata = {
  title: 'Advisor Dashboard — Wasiyya',
}

export default function AdvisorPortalPage() {
  return (
    <div style={{ padding: 28, maxWidth: 1060, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--ink)', marginBottom: 4 }}>Advisor dashboard</div>
          <div style={{ fontSize: 13, color: 'var(--ink3)' }}>Bilal Mahmood · Enver Wealth Management · 20% commission per completed case</div>
        </div>
        <SignOutButton style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '8px 14px', background: 'none',
          border: '1px solid var(--cr2)', borderRadius: 'var(--r)',
          cursor: 'pointer', fontSize: 13, color: 'var(--ink3)',
          fontFamily: 'var(--sans)',
        }} />
      </div>

      <div className="metrow">
        <div className="metc"><div className="metl">Total referrals</div><div className="metv">24</div><div className="mets">since Jan 2025</div></div>
        <div className="metc"><div className="metl">This month</div><div className="metv">6</div><div className="mets">May 2025</div></div>
        <div className="metc"><div className="metl">Commission earned</div><div className="metv" style={{ fontSize: 22 }}>£4,820</div><div className="mets">YTD</div></div>
        <div className="metc"><div className="metl">Pending payment</div><div className="metv" style={{ fontSize: 22 }}>£640</div><div className="mets">3 cases in review</div></div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: 14 }}>Recent referrals</div>
        <table className="dtbl">
          <thead>
            <tr><th>Client</th><th>Package</th><th>Status</th><th>Fee</th><th>Commission</th><th>Date</th></tr>
          </thead>
          <tbody>
            <tr><td>Ahmed Khan</td><td>Family</td><td><span className="chip chip-b">In review</span></td><td>£1,200</td><td>£240</td><td>12 May</td></tr>
            <tr><td>Fatima Malik</td><td>Essentials</td><td><span className="chip chip-g">Complete</span></td><td>£499</td><td>£100 paid</td><td>8 May</td></tr>
            <tr><td>Omar Hussain</td><td>Complex</td><td><span className="chip chip-b">In review</span></td><td>£3,200</td><td>£640</td><td>11 May</td></tr>
            <tr><td>Aisha Rahman</td><td>Family</td><td><span className="chip chip-g">Complete</span></td><td>£1,200</td><td>£240 paid</td><td>2 May</td></tr>
            <tr><td>Ibrahim Patel</td><td>Essentials</td><td><span className="chip chip-a">Awaiting</span></td><td>£499</td><td>£100</td><td>13 May</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: 10 }}>Upsell opportunities (client-consented)</div>
        <div className="alert alert-b" style={{ marginBottom: 12 }}>The following clients have consented to financial planning referrals based on gaps identified in their estate planning questionnaire.</div>
        <table className="dtbl">
          <thead>
            <tr><th>Client</th><th>Opportunity</th><th>Flagged reason</th><th>Action</th></tr>
          </thead>
          <tbody>
            <tr><td>Ahmed Khan</td><td>Life insurance review</td><td>Property owned, no life cover noted</td><td><button className="btn btn-sm" style={{ background: 'var(--cr2)', border: '1px solid var(--cr3)', color: 'var(--ink3)', borderRadius: 'var(--r)' }}>Contact client</button></td></tr>
            <tr><td>Omar Hussain</td><td>Pension nomination</td><td>Pension held, beneficiary not current</td><td><button className="btn btn-sm" style={{ background: 'var(--cr2)', border: '1px solid var(--cr3)', color: 'var(--ink3)', borderRadius: 'var(--r)' }}>Contact client</button></td></tr>
            <tr><td>Aisha Rahman</td><td>Halal ISA / investment</td><td>Cash savings, no Sharia investment</td><td><button className="btn btn-sm" style={{ background: 'var(--cr2)', border: '1px solid var(--cr3)', color: 'var(--ink3)', borderRadius: 'var(--r)' }}>Contact client</button></td></tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link href="/start" className="btn btn-g">Refer a new client</Link>
        <button className="btn btn-o">Download commission statement</button>
        <button className="btn btn-gh">Copy referral link</button>
      </div>
    </div>
  )
}
