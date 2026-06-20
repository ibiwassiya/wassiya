import type { Metadata } from 'next'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { client: 'Ahmed Khan',   pkg: 'Family',     status: 'In review', fee: '£1,200', commission: '£240',      date: '12 May' },
              { client: 'Fatima Malik', pkg: 'Essentials', status: 'Complete',  fee: '£499',   commission: '£100 paid', date: '8 May'  },
              { client: 'Omar Hussain', pkg: 'Complex',    status: 'In review', fee: '£3,200', commission: '£640',      date: '11 May' },
              { client: 'Aisha Rahman', pkg: 'Family',     status: 'Complete',  fee: '£1,200', commission: '£240 paid', date: '2 May'  },
              { client: 'Ibrahim Patel',pkg: 'Essentials', status: 'Awaiting',  fee: '£499',   commission: '£100',      date: '13 May' },
            ].map(r => (
              <TableRow key={r.client}>
                <TableCell className="font-medium">{r.client}</TableCell>
                <TableCell>{r.pkg}</TableCell>
                <TableCell>
                  <Badge variant="outline" style={
                    r.status === 'Complete'  ? { background: 'var(--gl)',    color: 'var(--gd)',   borderColor: 'transparent' } :
                    r.status === 'In review' ? { background: 'var(--bluel)', color: 'var(--blue)', borderColor: 'transparent' } :
                                               { background: 'var(--ambl)',  color: 'var(--ambd)', borderColor: 'transparent' }
                  }>{r.status}</Badge>
                </TableCell>
                <TableCell>{r.fee}</TableCell>
                <TableCell style={{ color: 'var(--ink3)' }}>{r.commission}</TableCell>
                <TableCell style={{ color: 'var(--ink3)' }}>{r.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: 10 }}>Upsell opportunities (client-consented)</div>
        <div className="alert alert-b" style={{ marginBottom: 12 }}>The following clients have consented to financial planning referrals based on gaps identified in their estate planning questionnaire.</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Opportunity</TableHead>
              <TableHead>Flagged reason</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { client: 'Ahmed Khan',   opp: 'Life insurance review', reason: 'Property owned, no life cover noted'    },
              { client: 'Omar Hussain', opp: 'Pension nomination',    reason: 'Pension held, beneficiary not current' },
              { client: 'Aisha Rahman', opp: 'Halal ISA / investment',reason: 'Cash savings, no Sharia investment'    },
            ].map(r => (
              <TableRow key={r.client}>
                <TableCell className="font-medium">{r.client}</TableCell>
                <TableCell>{r.opp}</TableCell>
                <TableCell style={{ color: 'var(--ink3)' }}>{r.reason}</TableCell>
                <TableCell>
                  <button className="btn btn-sm" style={{ background: 'var(--cr2)', border: '1px solid var(--cr3)', color: 'var(--ink3)', borderRadius: 'var(--r)' }}>
                    Contact client
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link href="/start" className="btn btn-g">Refer a new client</Link>
        <button className="btn btn-o">Download commission statement</button>
        <button className="btn btn-gh">Copy referral link</button>
      </div>
    </div>
  )
}
