'use client'

export default function DocumentsTab() {
  return (
    <div className="psec active">
      <div className="psect">Your documents</div>
      <div className="dr"><div><div className="drn">Will draft (preview)</div><div className="drs">AI-generated · Solicitor review in progress</div></div><button className="drb">Preview PDF</button></div>
      <div className="dr"><div><div className="drn">Questionnaire summary</div><div className="drs">Your answers — all 20 steps completed</div></div><button className="drb">Download</button></div>
      <div className="dr" style={{ opacity: .5 }}><div><div className="drn">Final signed will</div><div className="drs">Available once solicitor approves</div></div><button className="drb" disabled>Pending</button></div>
      <div className="dr" style={{ opacity: .5 }}><div><div className="drn">Execution instructions</div><div className="drs">How to sign with two witnesses</div></div><button className="drb" disabled>Pending</button></div>
      <div className="alert alert-a" style={{ marginTop: 12 }}>Once approved, print and sign in the presence of two independent witnesses who are not beneficiaries and not married to beneficiaries. Both must be 18+ and of sound mind.</div>
    </div>
  )
}
