'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'

type Tab = 'queue' | 'scholar' | 'completed'

export default function SolicitorPage() {
  const [tab, setTab] = useState<Tab>('queue')

  return (
    <div className="pwrap">
      <div className="psb">
        <div className="pub">
          <div className="pav" style={{ background: 'var(--bluel)', color: 'var(--blue)' }}>FH</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Fatima Hassan</div>
            <div style={{ fontSize: 11, color: 'var(--ink3)' }}>SRA: 123456 · Solicitor</div>
          </div>
        </div>
        <button className={`pnb${tab === 'queue' ? ' active' : ''}`} onClick={() => setTab('queue')}>Case queue (3)</button>
        <button className={`pnb${tab === 'scholar' ? ' active' : ''}`} onClick={() => setTab('scholar')}>Scholar validation</button>
        <button className={`pnb${tab === 'completed' ? ' active' : ''}`} onClick={() => setTab('completed')}>Completed cases</button>
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--cr2)' }}>
          <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 6 }}>This week</div>
          <div className="ir"><span className="irl">Cases reviewed</span><span className="irv">7</span></div>
          <div className="ir"><span className="irl">Pending</span><span className="irv a">3</span></div>
          <div className="ir"><span className="irl">Avg review time</span><span className="irv">52 min</span></div>
        </div>
      </div>

      <div className="pmain">
        {tab === 'queue' && (
          <div className="psec active">
            <div className="psect">Case review queue</div>
            <div className="casec">
              <div className="caseh">
                <div>
                  <div className="casetn">Ahmed Khan — Family case</div>
                  <div className="caseref">WAS-2025-04821 · DOB: 14 Mar 1981 · Birmingham · £1,200 · Submitted 12 May</div>
                </div>
                <div className="caseacts">
                  <button className="ca ca-v">View draft</button>
                  <button className="ca ca-a">Approve</button>
                  <button className="ca ca-f">Query</button>
                </div>
              </div>
              <div className="chklist">
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>Identity confirmed — full name, DOB, address, NI recorded</div>
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>Faraid shares validated — Mufti Ibrahim Ali (spouse ¼, daughters ¾ equally)</div>
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>Children recorded — Zara (DOB: 12/03/2010), Sara (DOB: 04/07/2014)</div>
                <div className="chki"><div className="chkd cd-p"></div>Overseas property — Land Registry reference pending from client</div>
                <div className="chki"><div className="chkd cd-w">!</div>Confirm tenants in common status on UK property — currently joint tenancy</div>
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>Religious obligations — Zakat: est. £1,200 unpaid; 3 missed fasts (Fidya: £15)</div>
              </div>
            </div>
            <div className="casec">
              <div className="caseh">
                <div>
                  <div className="casetn">Omar Hussain — Complex case</div>
                  <div className="caseref">WAS-2025-04819 · DOB: 3 Jun 1975 · Manchester · £3,200 · IHT specialist assigned · Submitted 11 May</div>
                </div>
                <div className="caseacts">
                  <button className="ca ca-v">View draft</button>
                  <button className="ca ca-a">Approve</button>
                  <button className="ca ca-f">Query</button>
                </div>
              </div>
              <div className="chklist">
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>Identity confirmed</div>
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>Business succession provisions drafted — sole trader wind-down clause</div>
                <div className="chki"><div className="chkd cd-r">!</div>IHT review required — estate est. £820k. James Whitfield (IHT specialist) assigned</div>
                <div className="chki"><div className="chkd cd-w">!</div>Waqf trust instrument requires separate deed — coordinate with scholar</div>
                <div className="chki"><div className="chkd cd-p"></div>Professional executor remuneration clause — confirm client awareness (s.29(2) TA 2000)</div>
              </div>
            </div>
            <div className="casec">
              <div className="caseh">
                <div>
                  <div className="casetn">Nadia Akhtar — Essentials case</div>
                  <div className="caseref">WAS-2025-04823 · DOB: 22 Sep 1990 · Leeds · £499 · Submitted 13 May</div>
                </div>
                <div className="caseacts">
                  <button className="ca ca-v">View draft</button>
                  <button className="ca ca-done">Approve &amp; deliver <Check size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }} /></button>
                </div>
              </div>
              <div className="chklist">
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>All clauses reviewed and verified</div>
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>Faraid shares confirmed — spouse ¼, two daughters ¾ equally (no sons)</div>
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>Funeral instructions — ghusl, kafan, Janazah, dafn — MRI instead of autopsy</div>
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>30-day survivorship clause included. Per stirpes confirmed.</div>
                <div className="chki"><div className="chkd cd-ok"><Check size={11} /></div>Ready for delivery — no outstanding queries</div>
              </div>
            </div>
          </div>
        )}

        {tab === 'scholar' && (
          <div className="psec active">
            <div className="psect">Scholar validation queue</div>
            <div className="casec">
              <div className="caseh">
                <div>
                  <div className="casetn">Ahmed Khan — Faraid validation</div>
                  <div className="caseref">WAS-2025-04821 · Mufti Ibrahim Ali assigned</div>
                </div>
                <div className="caseacts"><span className="chip chip-g">Validated <Check size={11} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 1 }} /></span></div>
              </div>
              <div className="ir"><span className="irl">Surviving relatives</span><span className="irv">Wife, 2 daughters, mother</span></div>
              <div className="ir"><span className="irl">Spouse share</span><span className="irv">⅛ (children present)</span></div>
              <div className="ir"><span className="irl">Daughters share</span><span className="irv">Split remaining ¾ equally</span></div>
              <div className="ir"><span className="irl">Mother share</span><span className="irv">⅙ (children present)</span></div>
              <div className="ir"><span className="irl">Scholar sign-off</span><span className="irv g">Mufti Ibrahim Ali · 12 May 2025</span></div>
            </div>
          </div>
        )}

        {tab === 'completed' && (
          <div className="psec active">
            <div className="psect">Completed cases this month</div>
            <table className="dtbl">
              <thead><tr><th>Client</th><th>Type</th><th>Completed</th><th>Fee</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>Nadia Akhtar</td><td>Essentials</td><td>13 May 2025</td><td>£499</td><td><span className="chip chip-g">Delivered</span></td></tr>
                <tr><td>Sarah Ahmed</td><td>Family</td><td>10 May 2025</td><td>£1,200</td><td><span className="chip chip-g">Delivered</span></td></tr>
                <tr><td>Yusuf Khan</td><td>Essentials</td><td>8 May 2025</td><td>£499</td><td><span className="chip chip-g">Delivered</span></td></tr>
                <tr><td>Amina Patel</td><td>Complex</td><td>5 May 2025</td><td>£2,800</td><td><span className="chip chip-g">Delivered</span></td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
