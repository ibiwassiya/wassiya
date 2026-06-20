import SignOutButton from '@/components/SignOutButton'

export default function ScholarPage() {
  return (
    <div className="pwrap">
      <div className="psb">
        <div className="pub">
          <div className="pav" style={{ background: '#f3f0ff', color: '#6d28d9' }}>SC</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Scholar</div>
            <div style={{ fontSize: 11, color: 'var(--ink3)' }}>Faraid validation</div>
          </div>
        </div>
        <button className="pnb active">Validation queue</button>
        <SignOutButton style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginTop: 'auto', width: '100%', padding: '9px 12px',
          background: 'none', border: '1px solid var(--cr2)',
          borderRadius: 'var(--r)', cursor: 'pointer',
          fontSize: 13, color: 'var(--ink3)', fontFamily: 'var(--sans)',
        }} />
      </div>
      <div className="pmain">
        <div className="psec active">
          <div className="psect">Validation queue</div>
          <div style={{ color: 'var(--ink3)', fontSize: 13, padding: '20px 0' }}>
            No pending validations.
          </div>
        </div>
      </div>
    </div>
  )
}
