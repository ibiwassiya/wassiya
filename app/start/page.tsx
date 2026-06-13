'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const STAGES = ['You','Address','Family','Relatives','Property','Finance','Debts','Legal','Religious','Executor','Guardian','Islamic','Gifts','IHT','Summary']
const STAGE_MAP = [0,1,2,4,5,6,8,9,11,12,13,14,15,16,17]
const WB_TOTAL = 20

type Step =
  | { sec: string; type: 'personal'; q: string; sub: string }
  | { sec: string; type: 'address'; q: string; sub: string }
  | { sec: string; type: 'opts'; q: string; sub: string; tip?: string; ops: { t: string; s?: string }[] }
  | { sec: string; type: 'children'; q: string; sub: string }
  | { sec: string; type: 'multi'; q: string; sub: string; tip?: string; opts: string[] }
  | { sec: string; type: 'props'; q: string; sub: string; tip?: string }
  | { sec: string; type: 'banks'; q: string; sub: string }
  | { sec: string; type: 'religious'; q: string; sub: string; tip?: string }
  | { sec: string; type: 'appoint'; flavor: string; q: string; sub: string; info: string }
  | { sec: string; type: 'summary' }

const STEPS: Step[] = [
  { sec: 'About you', type: 'personal', q: 'Your personal details', sub: 'Required for your will to be legally valid under English law.' },
  { sec: 'Address', type: 'address', q: 'Your current address', sub: 'This address will appear on your will.' },
  { sec: 'Family', type: 'opts', q: 'What is your marital status?', sub: 'This determines your default heirs under Faraid.', ops: [{ t: 'Single' }, { t: 'Married', s: 'Currently married under UK law' }, { t: 'Divorced', s: 'Marriage legally ended' }, { t: 'Widowed', s: 'Spouse has passed away' }] },
  { sec: 'Family', type: 'opts', q: 'What is your country of domicile?', sub: "Your domicile determines which country's law governs your estate.", tip: "Domicile differs from nationality. If you were born overseas and have not clearly established UK domicile, your solicitor will confirm.", ops: [{ t: 'United Kingdom', s: 'Born or permanently settled here' }, { t: 'Born overseas — permanently settled in UK', s: 'UK domicile likely — solicitor will confirm' }, { t: 'May be domiciled overseas', s: 'Requires legal advice — routed to specialist' }] },
  { sec: 'Family', type: 'children', q: 'Do you have children?', sub: 'Children are primary heirs under Islamic inheritance law.' },
  { sec: 'Relatives', type: 'multi', q: 'Which relatives are currently living?', sub: 'Select all that apply. This helps us calculate correct Faraid shares.', opts: ['Father', 'Mother', 'Paternal grandfather', 'Paternal grandmother', 'Maternal grandfather', 'Maternal grandmother', 'Full brothers (same mother and father)', 'Full sisters', 'Half brothers (same father only)', 'Half sisters (same father only)', 'Grandchildren through a deceased son', 'None of the above'] },
  { sec: 'Property', type: 'props', q: 'What property do you own?', sub: 'Add each property separately.', tip: 'Jointly owned property should be held as tenants in common — not joint tenancy — for Islamic inheritance to apply correctly.' },
  { sec: 'Property', type: 'opts', q: 'Do you own any other land or real estate?', sub: 'Select the most relevant option.', ops: [{ t: 'No other property or land' }, { t: 'Land overseas', s: 'May require a separate will in that jurisdiction' }, { t: 'Timeshare or shared ownership' }, { t: 'Commercial property' }] },
  { sec: 'Finance', type: 'banks', q: 'What bank accounts do you hold?', sub: 'Add each account separately. Include UK and overseas accounts.' },
  { sec: 'Finance', type: 'multi', q: 'What investments and financial products do you hold?', sub: 'Select all that apply.', tip: 'Pensions and life insurance often pass outside your estate. We will guide you on beneficiary nominations.', opts: ['Stocks and shares ISA', 'Cash ISA', 'Stocks / shares / bonds', 'Pension (workplace)', 'Pension (private / SIPP)', 'Life insurance — written in trust', 'Life insurance — NOT written in trust', 'Cryptocurrency', 'Bonds or fixed-term savings', 'Premium bonds', 'Overseas accounts or investments', 'None of the above'] },
  { sec: 'Finance', type: 'multi', q: 'Do you own any valuable personal assets?', sub: 'Select all that apply.', opts: ['Jewellery, gold or silver', 'Watches (value £500+)', 'Vehicles', 'Art, antiques or collectibles', 'None of significant value'] },
  { sec: 'Debts', type: 'multi', q: 'What debts or financial obligations do you have?', sub: 'All debts are settled from your estate before distribution under Islamic law.', tip: 'Informal loans from family count as valid debts under Islamic law.', opts: ['Residential mortgage', 'Buy-to-let mortgage', 'Personal loan', 'Car finance', 'Credit card debt', 'Student loan', 'Business debt', 'Informal loan from family or friends', 'No debts'] },
  { sec: 'Legal', type: 'opts', q: 'Survivorship period for beneficiaries', sub: 'Standard UK legal protection — prevents the estate being administered twice.', tip: '30 days is the UK standard and recommended for most wills.', ops: [{ t: '30 days (recommended)', s: 'Standard UK protection' }, { t: '60 days', s: 'Extended protection' }, { t: 'No survivorship requirement', s: 'Not recommended' }] },
  { sec: 'Legal', type: 'opts', q: 'If a child predeceases you, should their share pass to their children?', sub: 'This is called per stirpes distribution.', tip: "Example: if you have 3 children and one dies before you leaving 2 of their own children, per stirpes means those grandchildren split their parent's share.", ops: [{ t: 'Yes — per stirpes (recommended)', s: "Grandchildren inherit their parent's share" }, { t: 'No — redistribute to surviving children' }, { t: 'Specify per child individually', s: 'Complex — solicitor will advise' }] },
  { sec: 'Religious', type: 'religious', q: 'Do you have any outstanding religious obligations?', sub: 'Select all that apply. These are settled from your estate before distribution under Islamic law.', tip: 'It is a duty in Islam to settle these obligations. Recording them now protects your family from uncertainty.' },
  { sec: 'Executor', type: 'appoint', flavor: 'executor', q: 'Who would you appoint as executor?', sub: 'Your executor carries out your wishes. You may appoint up to three.', info: 'If appointing a professional (solicitor or accountant), a remuneration clause under s.29(2) Trustee Act 2000 will be included.' },
  { sec: 'Guardian', type: 'appoint', flavor: 'guardian', q: 'Who would you appoint as guardian for your minor children?', sub: 'The guardian raises your children if both parents are no longer alive.', info: 'Islamic scholars recommend a Muslim guardian. Courts make the final decision — your preference carries significant weight.' },
  { sec: 'Islamic', type: 'multi', q: 'Would you like any Islamic provisions beyond standard Faraid?', sub: 'Select all that apply. Subject to the 1/3 Wasiyyah limit.', opts: ['None — standard Faraid distribution only', 'Wasiyyah bequest (up to 1/3 of estate)', 'Waqf — charitable endowment', 'Power of attorney (Wakala)', 'Letter of wishes', 'Detailed funeral instructions', 'Private solicitor consultation (confidential)'] },
  { sec: 'Gifts', type: 'opts', q: 'Do you wish to leave any specific gifts?', sub: 'Subject to the Wasiyyah 1/3 limit.', ops: [{ t: 'No specific gifts' }, { t: 'Cash to named individuals', s: 'Must not be a Faraid heir' }, { t: 'Personal possessions (jewellery, heirlooms)' }, { t: 'Gift to a charity, mosque or Islamic institution' }] },
  { sec: 'IHT', type: 'opts', q: 'Approximate total estate value?', sub: 'Determines whether inheritance tax advice is needed. UK threshold: £325k individual / £650k couple.', tip: 'Estates above these thresholds may be subject to 40% IHT on the excess.', ops: [{ t: 'Under £325,000' }, { t: '£325,000 – £650,000', s: 'May apply — flagged for review' }, { t: 'Over £650,000', s: 'IHT specialist strongly recommended' }, { t: 'Not sure', s: 'We will flag for review to be safe' }] },
  { sec: 'Summary', type: 'summary' },
]

type ChildEntry = { fn: string; dob: string }
type PropEntry = { type: string; own: string; addr: string; val: string; mort: string }
type BankEntry = { name: string; type: string; acct: string; sort: string; bal: string }
type PersonalAns = { fn: string; ln: string; dob: string; nat: string; ni: string; phone: string; email: string }
type AddressAns = { a1: string; a2: string; city: string; county: string; postcode: string }
type AppointAns = { name: string; rel: string; addr: string; contact: string; back: string; backrel: string }
type ChildrenAns = { has: boolean | null; list: ChildEntry[] }

type Answers = {
  personal?: PersonalAns
  address?: AddressAns
  opts: Record<number, number>
  multi: Record<number, number[]>
  children?: ChildrenAns
  religious: number[]
  appoint: Record<number, AppointAns>
}

function calcFee(answers: Answers, props: PropEntry[]) {
  const complex = answers.opts[3] === 2 || answers.opts[19] === 2
  const family = answers.opts[2] === 1 && answers.children?.has === true || props.length > 1
  const tier = complex ? 'complex' : family ? 'family' : 'simple'
  const base = tier === 'complex' ? 2000 : tier === 'family' ? 1200 : 499
  const items: { l: string; v: number }[] = [{ l: tier === 'complex' ? 'Complex estate plan' : tier === 'family' ? 'Family package' : 'Essentials', v: base }]
  if (props.some(p => p.type === 'Property abroad')) items.push({ l: 'Overseas property addendum', v: 500 })
  if (answers.multi[17]?.includes(2)) items.push({ l: 'Waqf trust deed', v: 800 })
  if (answers.opts[19] === 2) items.push({ l: 'IHT specialist review', v: 750 })
  return { total: items.reduce((s, i) => s + i.v, 0), items, tier }
}

export default function WillBuilderPage() {
  const router = useRouter()
  const [cur, setCur] = useState(0)
  const [answers, setAnswers] = useState<Answers>({ opts: {}, multi: {}, religious: [], appoint: {} })
  const [props, setProps] = useState<PropEntry[]>([{ type: '', own: '', addr: '', val: '', mort: '' }])
  const [banks, setBanks] = useState<BankEntry[]>([{ name: '', type: '', acct: '', sort: '', bal: '' }])
  const [personal, setPersonal] = useState<PersonalAns>({ fn: '', ln: '', dob: '', nat: 'British', ni: '', phone: '', email: '' })
  const [address, setAddress] = useState<AddressAns>({ a1: '', a2: '', city: '', county: '', postcode: '' })
  const [children, setChildren] = useState<ChildrenAns>({ has: null, list: [{ fn: '', dob: '' }] })
  const [appoint, setAppoint] = useState<Record<number, AppointAns>>({})

  const step = STEPS[Math.min(cur, STEPS.length - 1)]
  const pct = Math.round(((cur + 1) / (WB_TOTAL + 1)) * 100)

  const stageIndex = useCallback((i: number) => {
    const start = STAGE_MAP[i]
    const end = i < STAGE_MAP.length - 1 ? STAGE_MAP[i + 1] : WB_TOTAL
    if (cur >= end) return 'done'
    if (cur >= start && cur < end) return 'active'
    return ''
  }, [cur])

  function goNext() {
    if (cur < STEPS.length - 1) {
      setCur(c => c + 1)
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      router.push('/portal')
    }
  }

  function goBack() {
    if (cur > 0) {
      setCur(c => c - 1)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  function selOpt(idx: number) {
    setAnswers(a => ({ ...a, opts: { ...a.opts, [cur]: idx } }))
  }

  function toggleMC(idx: number) {
    setAnswers(a => {
      const prev = a.multi[cur] || []
      const next = prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]
      return { ...a, multi: { ...a.multi, [cur]: next } }
    })
  }

  const fee = calcFee({ ...answers, personal, address, children }, props)

  const canContinue = (() => {
    if (step.type === 'opts') return answers.opts[cur] !== undefined
    if (step.type === 'children') return children.has !== null
    return true
  })()

  return (
    <div className="wbwrap">
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <Link href="/" className="logo" style={{ fontSize: 22 }}>Wasi<span>yya</span></Link>
        <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 2 }}>Guided Islamic will builder</div>
      </div>

      <div className="wbstages">
        {STAGES.map((s, i) => (
          <div key={s} className={`wbs ${stageIndex(i)}`} onClick={() => { if (cur >= STAGE_MAP[i]) { setCur(STAGE_MAP[i]); window.scrollTo({ top: 0, behavior: 'instant' }) } }} title={s}>
            {s.substring(0, 3)}
          </div>
        ))}
      </div>

      <div className="wbprow">
        <span>{step.sec}</span>
        <span>{pct}%</span>
      </div>
      <div className="wbptr">
        <div className="wbpfill" style={{ width: `${pct}%` }} />
      </div>

      <div style={{ background: 'var(--bluel)', border: '1px solid #B5D4F4', borderRadius: 'var(--r)', padding: '8px 13px', marginBottom: 12, fontSize: 12, color: 'var(--blue)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Progress saved automatically</span>
        <button style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', border: '1px solid var(--blue)', borderRadius: 'var(--r)', color: 'var(--blue)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--sans)' }}>Save &amp; get link</button>
      </div>

      <div className="wbcard">
        <div className="wbhead">
          <div className="wbht">{step.sec}</div>
          <div className="wbhc">Step {cur + 1} of {WB_TOTAL + 1}</div>
        </div>

        <div className="wbbody">
          {step.type === 'personal' && (
            <>
              <div className="wbpill">{step.sec}</div>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              <div className="wbfg wbfg2">
                <div><label className="fl">First name(s)</label><input className="fi" placeholder="e.g. Ahmed Rafiq" value={personal.fn} onChange={e => setPersonal(p => ({ ...p, fn: e.target.value }))} /></div>
                <div><label className="fl">Last name</label><input className="fi" placeholder="e.g. Khan" value={personal.ln} onChange={e => setPersonal(p => ({ ...p, ln: e.target.value }))} /></div>
              </div>
              <div className="wbfg wbfg3">
                <div><label className="fl">Date of birth</label><input className="fi" type="date" value={personal.dob} onChange={e => setPersonal(p => ({ ...p, dob: e.target.value }))} /></div>
                <div><label className="fl">Nationality</label><input className="fi" placeholder="British" value={personal.nat} onChange={e => setPersonal(p => ({ ...p, nat: e.target.value }))} /></div>
                <div><label className="fl">NI number</label><input className="fi" placeholder="AB 12 34 56 C" value={personal.ni} onChange={e => setPersonal(p => ({ ...p, ni: e.target.value }))} /></div>
              </div>
              <div className="wbfg wbfg2">
                <div><label className="fl">Phone</label><input className="fi" placeholder="+44 7700 000000" value={personal.phone} onChange={e => setPersonal(p => ({ ...p, phone: e.target.value }))} /></div>
                <div><label className="fl">Email</label><input className="fi" placeholder="your@email.com" value={personal.email} onChange={e => setPersonal(p => ({ ...p, email: e.target.value }))} /></div>
              </div>
            </>
          )}

          {step.type === 'address' && (
            <>
              <div className="wbpill">{step.sec}</div>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              <div className="wbfg">
                <div><label className="fl">Address line 1</label><input className="fi" placeholder="House number and street" value={address.a1} onChange={e => setAddress(a => ({ ...a, a1: e.target.value }))} /></div>
                <div><label className="fl">Address line 2 (optional)</label><input className="fi" value={address.a2} onChange={e => setAddress(a => ({ ...a, a2: e.target.value }))} /></div>
              </div>
              <div className="wbfg wbfg3">
                <div><label className="fl">Town / City</label><input className="fi" placeholder="Birmingham" value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} /></div>
                <div><label className="fl">County (optional)</label><input className="fi" value={address.county} onChange={e => setAddress(a => ({ ...a, county: e.target.value }))} /></div>
                <div><label className="fl">Postcode</label><input className="fi" placeholder="B15 3PQ" value={address.postcode} onChange={e => setAddress(a => ({ ...a, postcode: e.target.value }))} /></div>
              </div>
            </>
          )}

          {step.type === 'opts' && (
            <>
              <div className="wbpill">{step.sec}</div>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              {step.tip && <div className="wbtip">{step.tip}</div>}
              <div className="wbopts">
                {step.ops.map((o, i) => (
                  <div key={i} className={`wbopt${answers.opts[cur] === i ? ' sel' : ''}`} onClick={() => selOpt(i)}>
                    <div className="wbot">{o.t}</div>
                    {o.s && <div className="wbos">{o.s}</div>}
                  </div>
                ))}
              </div>
            </>
          )}

          {step.type === 'children' && (
            <>
              <div className="wbpill">{step.sec}</div>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              <div className="wbopts" style={{ flex: 0, marginBottom: 12 }}>
                <div className={`wbopt${children.has === false ? ' sel' : ''}`} onClick={() => setChildren(c => ({ ...c, has: false }))}>
                  <div className="wbot">No children</div>
                </div>
                <div className={`wbopt${children.has === true ? ' sel' : ''}`} onClick={() => setChildren(c => ({ ...c, has: true }))}>
                  <div className="wbot">Yes — I have children</div>
                  <div className="wbos">We will capture their full names and dates of birth for the will</div>
                </div>
              </div>
              {children.has === true && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink3)', marginBottom: 8 }}>Children&apos;s details</div>
                  {children.list.map((c, i) => (
                    <div key={i} className="childrow">
                      <div><label className="fl">Full name</label><input className="fi" placeholder="Full name" value={c.fn} onChange={e => setChildren(ch => { const l = [...ch.list]; l[i] = { ...l[i], fn: e.target.value }; return { ...ch, list: l } })} /></div>
                      <div><label className="fl">Date of birth</label><input className="fi" type="date" value={c.dob} onChange={e => setChildren(ch => { const l = [...ch.list]; l[i] = { ...l[i], dob: e.target.value }; return { ...ch, list: l } })} /></div>
                      {children.list.length > 1 && <button className="rmb" onClick={() => setChildren(ch => ({ ...ch, list: ch.list.filter((_, j) => j !== i) }))}>×</button>}
                    </div>
                  ))}
                  <button className="addbtn" onClick={() => setChildren(c => ({ ...c, list: [...c.list, { fn: '', dob: '' }] }))}>+ Add another child</button>
                </div>
              )}
            </>
          )}

          {step.type === 'multi' && (
            <>
              <div className="wbpill">{step.sec}</div>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              {step.tip && <div className="wbtip">{step.tip}</div>}
              <div className="wbopts">
                {step.opts.map((o, i) => (
                  <div key={i} className={`wbopt${(answers.multi[cur] || []).includes(i) ? ' sel' : ''}`} onClick={() => toggleMC(i)}>
                    <div className="wbot">{o}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step.type === 'props' && (
            <>
              <div className="wbpill">{step.sec}</div>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              {step.tip && <div className="wbtip">{step.tip}</div>}
              {props.map((p, i) => (
                <div key={i} className="acctblk">
                  <div className="ablkh">
                    <div className="ablkt">Property {i + 1}</div>
                    {props.length > 1 && <button className="rmb" onClick={() => setProps(ps => ps.filter((_, j) => j !== i))}>×</button>}
                  </div>
                  <div className="wbfg wbfg2">
                    <div><label className="fl">Property type</label><select className="fi" value={p.type} onChange={e => setProps(ps => { const n = [...ps]; n[i] = { ...n[i], type: e.target.value }; return n })}><option value="">Select…</option><option>UK residential</option><option>Buy-to-let (UK)</option><option>Property abroad</option><option>Commercial property</option></select></div>
                    <div><label className="fl">Ownership</label><select className="fi" value={p.own} onChange={e => setProps(ps => { const n = [...ps]; n[i] = { ...n[i], own: e.target.value }; return n })}><option value="">Select…</option><option>Sole owner</option><option>Tenants in common ✓</option><option>Joint tenancy ⚠</option></select></div>
                  </div>
                  <div className="wbfg"><label className="fl">Full address</label><input className="fi" placeholder="Full address" value={p.addr} onChange={e => setProps(ps => { const n = [...ps]; n[i] = { ...n[i], addr: e.target.value }; return n })} /></div>
                  <div className="wbfg wbfg2">
                    <div><label className="fl">Approximate value (£)</label><input className="fi" placeholder="e.g. 350000" value={p.val} onChange={e => setProps(ps => { const n = [...ps]; n[i] = { ...n[i], val: e.target.value }; return n })} /></div>
                    <div><label className="fl">Outstanding mortgage (£)</label><input className="fi" placeholder="e.g. 180000 or 0" value={p.mort} onChange={e => setProps(ps => { const n = [...ps]; n[i] = { ...n[i], mort: e.target.value }; return n })} /></div>
                  </div>
                </div>
              ))}
              <button className="addbtn" onClick={() => setProps(ps => [...ps, { type: '', own: '', addr: '', val: '', mort: '' }])}>+ Add another property</button>
            </>
          )}

          {step.type === 'banks' && (
            <>
              <div className="wbpill">{step.sec}</div>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              {banks.map((b, i) => (
                <div key={i} className="acctblk">
                  <div className="ablkh">
                    <div className="ablkt">Account {i + 1}</div>
                    {banks.length > 1 && <button className="rmb" onClick={() => setBanks(bs => bs.filter((_, j) => j !== i))}>×</button>}
                  </div>
                  <div className="wbfg wbfg2">
                    <div><label className="fl">Bank / building society</label><input className="fi" placeholder="e.g. Lloyds, Al Rayan" value={b.name} onChange={e => setBanks(bs => { const n = [...bs]; n[i] = { ...n[i], name: e.target.value }; return n })} /></div>
                    <div><label className="fl">Account type</label><select className="fi" value={b.type} onChange={e => setBanks(bs => { const n = [...bs]; n[i] = { ...n[i], type: e.target.value }; return n })}><option value="">Select…</option><option>Current account</option><option>Savings account</option><option>Joint account</option><option>Overseas account</option></select></div>
                  </div>
                  <div className="wbfg wbfg3">
                    <div><label className="fl">Account number</label><input className="fi" placeholder="12345678" value={b.acct} onChange={e => setBanks(bs => { const n = [...bs]; n[i] = { ...n[i], acct: e.target.value }; return n })} /></div>
                    <div><label className="fl">Sort code</label><input className="fi" placeholder="00-00-00" value={b.sort} onChange={e => setBanks(bs => { const n = [...bs]; n[i] = { ...n[i], sort: e.target.value }; return n })} /></div>
                    <div><label className="fl">Balance (£) approx.</label><input className="fi" placeholder="Optional" value={b.bal} onChange={e => setBanks(bs => { const n = [...bs]; n[i] = { ...n[i], bal: e.target.value }; return n })} /></div>
                  </div>
                </div>
              ))}
              <button className="addbtn" onClick={() => setBanks(bs => [...bs, { name: '', type: '', acct: '', sort: '', bal: '' }])}>+ Add another account</button>
            </>
          )}

          {step.type === 'religious' && (
            <>
              <div className="wbpill">{step.sec}</div>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              {step.tip && <div className="wbtip">{step.tip}</div>}
              <div className="wbopts">
                {[
                  { t: 'No outstanding religious obligations' },
                  { t: 'Unpaid Zakat', s: '2.5% of wealth above Nisab threshold, per year' },
                  { t: 'Missed Ramadan fasts (Fidya)', s: 'Approximately £5 per missed fast — current rate' },
                  { t: 'Missed obligatory prayers (Kaffarah)', s: 'Your scholar will determine the correct expiation amount' },
                  { t: 'Outstanding Hajj obligation', s: 'Cost from UK approximately £5,000–£8,000 — settled from estate' },
                  { t: 'Unpaid Mahr (deferred dowry)', s: 'Debt owed to spouse — must be settled from estate before distribution' },
                ].map((o, i) => (
                  <div key={i} className={`wbopt${answers.religious.includes(i) ? ' sel' : ''}`} onClick={() => setAnswers(a => { const r = a.religious.includes(i) ? a.religious.filter(x => x !== i) : [...a.religious, i]; return { ...a, religious: r } })}>
                    <div className="wbot">{o.t}</div>
                    {o.s && <div className="wbos">{o.s}</div>}
                  </div>
                ))}
              </div>
            </>
          )}

          {step.type === 'appoint' && (
            <>
              <div className="wbpill">{step.sec}</div>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              <div className="alert alert-g" style={{ marginBottom: 12 }}>{step.info}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink3)', marginBottom: 8 }}>Primary {step.flavor}</div>
              <div className="wbfg wbfg2">
                <div><label className="fl">Full name</label><input className="fi" placeholder="Full name" value={appoint[cur]?.name || ''} onChange={e => setAppoint(a => ({ ...a, [cur]: { ...a[cur], name: e.target.value } }))} /></div>
                <div><label className="fl">Relationship to you</label><input className="fi" placeholder="e.g. Brother, spouse" value={appoint[cur]?.rel || ''} onChange={e => setAppoint(a => ({ ...a, [cur]: { ...a[cur], rel: e.target.value } }))} /></div>
              </div>
              <div className="wbfg wbfg2">
                <div><label className="fl">Full address</label><input className="fi" placeholder="Address" value={appoint[cur]?.addr || ''} onChange={e => setAppoint(a => ({ ...a, [cur]: { ...a[cur], addr: e.target.value } }))} /></div>
                <div><label className="fl">Phone / email</label><input className="fi" placeholder="Contact details" value={appoint[cur]?.contact || ''} onChange={e => setAppoint(a => ({ ...a, [cur]: { ...a[cur], contact: e.target.value } }))} /></div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink3)', margin: '11px 0 7px' }}>Backup {step.flavor} (strongly recommended)</div>
              <div className="wbfg wbfg2">
                <div><label className="fl">Full name</label><input className="fi" placeholder="Full name" value={appoint[cur]?.back || ''} onChange={e => setAppoint(a => ({ ...a, [cur]: { ...a[cur], back: e.target.value } }))} /></div>
                <div><label className="fl">Relationship to you</label><input className="fi" placeholder="Relationship" value={appoint[cur]?.backrel || ''} onChange={e => setAppoint(a => ({ ...a, [cur]: { ...a[cur], backrel: e.target.value } }))} /></div>
              </div>
            </>
          )}

          {step.type === 'summary' && (
            <>
              <span className={`chip chip-${fee.tier === 'complex' ? 'a' : fee.tier === 'family' ? 'b' : 'g'}`} style={{ marginBottom: 12 }}>
                {fee.tier === 'complex' ? 'Complex case' : fee.tier === 'family' ? 'Family case' : 'Essentials'}
              </span>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>Your will summary</div>
              <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 13 }}>Review before payment</div>
              <div className="sumrow"><span className="sk">Marital status</span><span className="sv">{answers.opts[2] !== undefined ? (STEPS[2] as { ops: { t: string }[] }).ops[answers.opts[2]]?.t : '—'}</span></div>
              <div className="sumrow"><span className="sk">Survivorship</span><span className="sv">{answers.opts[12] !== undefined ? (STEPS[12] as { ops: { t: string }[] }).ops[answers.opts[12]]?.t : '—'}</span></div>
              <div className="sumrow"><span className="sk">Per stirpes</span><span className="sv">{answers.opts[13] !== undefined ? (STEPS[13] as { ops: { t: string }[] }).ops[answers.opts[13]]?.t : '—'}</span></div>
              <div className="sumrow"><span className="sk">Estate value</span><span className="sv">{answers.opts[19] !== undefined ? (STEPS[19] as { ops: { t: string }[] }).ops[answers.opts[19]]?.t : '—'}</span></div>
              <div className="feebox">
                {fee.items.map((item, i) => (
                  <div key={i} className="feeitem"><span>{item.l}</span><span>£{item.v.toLocaleString()}</span></div>
                ))}
                <div style={{ borderTop: '1px solid var(--cr3)', marginTop: 8, paddingTop: 8 }}>
                  <div className="feetotal">£{fee.total.toLocaleString()}</div>
                  <div className="feenote">Total inc. VAT · AI draft · solicitor review · secure storage</div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="wbnav">
          <button className="wbback" onClick={goBack} style={{ opacity: cur === 0 ? 0.3 : 1 }} disabled={cur === 0}>Back</button>
          <button className="wbsave">Save &amp; exit</button>
          <button className="wbnext" onClick={goNext} disabled={!canContinue}>
            {cur === STEPS.length - 1 ? 'Proceed to checkout' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
