'use client'
import { Check } from 'lucide-react'

export default function CaseQueue() {
  return (
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
  )
}
