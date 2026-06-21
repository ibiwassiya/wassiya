'use client'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { useForm, useFieldArray } from 'react-hook-form'
import { saveDraft } from '@/actions/draft/save'
import { loadDraft } from '@/actions/draft/load'

const STAGES = ['You','Address','Family','Relatives','Property','Finance','Debts','Legal','Religious','Executor','Guardian','Islamic','Gifts','IHT','Summary']
const STAGE_MAP = [0,1,2,4,5,6,8,9,11,12,13,14,15,16,17]
const WB_TOTAL = 20

// Fields to trigger per step (input steps only — selection steps use canContinue)
const STEP_FIELDS: Partial<Record<number, string[]>> = {
  0: ['fn', 'ln', 'dob', 'ni', 'email'],
  1: ['a1', 'city', 'postcode'],
}

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

type WillForm = {
  fn: string; ln: string; dob: string; nat: string; ni: string; phone: string; email: string
  a1: string; a2: string; city: string; county: string; postcode: string
  children: { fn: string; dob: string }[]
  props: { type: string; own: string; addr: string; val: string; mort: string }[]
  banks: { name: string; type: string; acct: string; sort: string; bal: string }[]
  execName: string; execRel: string; execAddr: string; execContact: string; execBack: string; execBackRel: string
  guardName: string; guardRel: string; guardAddr: string; guardContact: string; guardBack: string; guardBackRel: string
}

function calcFee(opts: Record<number, number>, childrenHas: boolean | null, multi: Record<number, number[]>, watchedProps: { type: string }[]) {
  const complex = opts[3] === 2 || opts[19] === 2
  const family = (opts[2] === 1 && childrenHas === true) || watchedProps.length > 1
  const tier = complex ? 'complex' : family ? 'family' : 'simple'
  const base = tier === 'complex' ? 2000 : tier === 'family' ? 1200 : 499
  const items: { l: string; v: number }[] = [{ l: tier === 'complex' ? 'Complex estate plan' : tier === 'family' ? 'Family package' : 'Essentials', v: base }]
  if (watchedProps.some(p => p.type === 'Property abroad')) items.push({ l: 'Overseas property addendum', v: 500 })
  if (multi[17]?.includes(2)) items.push({ l: 'Waqf trust deed', v: 800 })
  if (opts[19] === 2) items.push({ l: 'IHT specialist review', v: 750 })
  return { total: items.reduce((s, i) => s + i.v, 0), items, tier }
}

const ERR = ({ msg }: { msg: string | undefined }) =>
  msg ? <div style={{ fontSize: 11, color: '#c0392b', marginTop: 4 }}>{msg}</div> : null

export default function WillBuilderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [cur, setCur] = useState(0)
  const [opts, setOpts] = useState<Record<number, number>>({})
  const [multi, setMulti] = useState<Record<number, number[]>>({})
  const [religious, setReligious] = useState<number[]>([])
  const [childrenHas, setChildrenHas] = useState<boolean | null>(null)

  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const { register, trigger, watch, control, getValues, reset, formState: { errors } } = useForm<WillForm>({
    defaultValues: {
      fn: '', ln: '', dob: '', nat: 'British', ni: '', phone: '', email: '',
      a1: '', a2: '', city: '', county: '', postcode: '',
      children:  [{ fn: '', dob: '' }],
      props:     [{ type: '', own: '', addr: '', val: '', mort: '' }],
      banks:     [{ name: '', type: '', acct: '', sort: '', bal: '' }],
      execName: '', execRel: '', execAddr: '', execContact: '', execBack: '', execBackRel: '',
      guardName: '', guardRel: '', guardAddr: '', guardContact: '', guardBack: '', guardBackRel: '',
    },
  })

  const { fields: childFields, append: appendChild, remove: removeChild } = useFieldArray({ control, name: 'children' })
  const { fields: propFields,  append: appendProp,  remove: removeProp  } = useFieldArray({ control, name: 'props' })
  const { fields: bankFields,  append: appendBank,  remove: removeBank  } = useFieldArray({ control, name: 'banks' })

  const step        = STEPS[Math.min(cur, STEPS.length - 1)]
  const pct         = Math.round(((cur + 1) / (WB_TOTAL + 1)) * 100)
  const watchedProps = watch('props') || []
  const fee         = calcFee(opts, childrenHas, multi, watchedProps)

  const stageIndex = useCallback((i: number) => {
    const start = STAGE_MAP[i]
    const end   = i < STAGE_MAP.length - 1 ? STAGE_MAP[i + 1] : WB_TOTAL
    if (cur >= end)               return 'done'
    if (cur >= start && cur < end) return 'active'
    return ''
  }, [cur])

  async function goNext() {
    const fields = STEP_FIELDS[cur]
    if (fields) {
      const valid = await trigger(fields as Parameters<typeof trigger>[0])
      if (!valid) return
    }
    if (!canContinue) return
    if (cur < STEPS.length - 1) {
      setCur(c => c + 1)
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      router.push('/portal')
    }
  }

  useEffect(() => {
    const resumeId = searchParams.get('resume')
    if (!resumeId) return

    loadDraft(resumeId).then(answers => {
      if (!answers) return
      const draft = answers as {
        form: WillForm
        opts: Record<string, number>
        multi: Record<string, number[]>
        religious: number[]
        childrenHas: boolean | null
        step: number
      }
      reset(draft.form)
      setOpts(draft.opts as unknown as Record<number, number>)
      setMulti(draft.multi as unknown as Record<number, number[]>)
      setReligious(draft.religious || [])
      setChildrenHas(draft.childrenHas ?? null)
      setCur(draft.step || 0)
    })
  }, [searchParams, reset])

  async function handleSave() {
    setSaving(true)
    setSaveError(null)
    const result = await saveDraft({
      form:        getValues() as Record<string, unknown>,
      opts:        Object.fromEntries(Object.entries(opts).map(([k, v]) => [k, v])),
      multi:       Object.fromEntries(Object.entries(multi).map(([k, v]) => [k, v])),
      religious,
      childrenHas,
      step:        cur,
    })
    setSaving(false)
    if (result.error) { setSaveError(result.error); return }
    router.push('/portal')
  }

  function goBack() {
    if (cur > 0) {
      setCur(c => c - 1)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  function selOpt(idx: number) { setOpts(o => ({ ...o, [cur]: idx })) }

  function toggleMC(idx: number) {
    setMulti(m => {
      const prev = m[cur] || []
      const next = prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]
      return { ...m, [cur]: next }
    })
  }

  const canContinue = (() => {
    if (step.type === 'opts')     return opts[cur] !== undefined
    if (step.type === 'multi')    return (multi[cur] || []).length > 0
    if (step.type === 'children') return childrenHas !== null
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
            {i + 1}
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
        <button type="button" style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', border: '1px solid var(--blue)', borderRadius: 'var(--r)', color: 'var(--blue)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--sans)' }}>Save &amp; get link</button>
      </div>

      <div className="wbcard">
        <div className="wbhead">
          <div className="wbht">{step.sec}</div>
          <div className="wbhc">Step {cur + 1} of {WB_TOTAL + 1}</div>
        </div>

        <div className="wbbody">

          {step.type === 'personal' && (
            <>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              <div className="wbfg wbfg2">
                <div>
                  <label className="fl">First name(s) <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="fi" placeholder="e.g. Ahmed Rafiq" {...register('fn', { required: 'First name is required' })} />
                  <ERR msg={errors.fn?.message} />
                </div>
                <div>
                  <label className="fl">Last name <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="fi" placeholder="e.g. Khan" {...register('ln', { required: 'Last name is required' })} />
                  <ERR msg={errors.ln?.message} />
                </div>
              </div>
              <div className="wbfg wbfg2">
                <div>
                  <label className="fl">Date of birth <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="fi" type="date" {...register('dob', { required: 'Date of birth is required' })} />
                  <ERR msg={errors.dob?.message} />
                </div>
                <div>
                  <label className="fl">Nationality</label>
                  <input className="fi" placeholder="British" {...register('nat')} />
                </div>
              </div>
              <div className="wbfg">
                <div>
                  <label className="fl">National Insurance number <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="fi" placeholder="AB 12 34 56 C" maxLength={13} {...register('ni', {
                    required: 'NI number is required',
                    validate: v => /^[A-Z]{2}\d{6}[A-DCFHIJKLMNPRSTW]$/i.test(v.replace(/\s/g, '')) || 'Enter a valid NI number (e.g. AB 12 34 56 C)',
                  })} />
                  {errors.ni
                    ? <ERR msg={errors.ni.message} />
                    : <div style={{ fontSize: 11, color: 'var(--ink3)', marginTop: 5 }}>Format: 2 letters · 6 digits · 1 letter</div>
                  }
                </div>
              </div>
              <div className="wbfg wbfg2">
                <div>
                  <label className="fl">Phone</label>
                  <input className="fi" placeholder="+44 7700 000000" {...register('phone')} />
                </div>
                <div>
                  <label className="fl">Email <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="fi" type="email" placeholder="your@email.com" {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                  })} />
                  <ERR msg={errors.email?.message} />
                </div>
              </div>
            </>
          )}

          {step.type === 'address' && (
            <>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              <div className="wbfg">
                <div>
                  <label className="fl">Address line 1 <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="fi" placeholder="House number and street" {...register('a1', { required: 'Address line 1 is required' })} />
                  <ERR msg={errors.a1?.message} />
                </div>
                <div>
                  <label className="fl">Address line 2 (optional)</label>
                  <input className="fi" {...register('a2')} />
                </div>
              </div>
              <div className="wbfg wbfg3">
                <div>
                  <label className="fl">Town / City <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="fi" placeholder="Birmingham" {...register('city', { required: 'Town / city is required' })} />
                  <ERR msg={errors.city?.message} />
                </div>
                <div>
                  <label className="fl">County (optional)</label>
                  <input className="fi" {...register('county')} />
                </div>
                <div>
                  <label className="fl">Postcode <span style={{ color: '#c0392b' }}>*</span></label>
                  <input className="fi" placeholder="B15 3PQ" {...register('postcode', {
                    required: 'Postcode is required',
                    pattern: { value: /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i, message: 'Enter a valid UK postcode (e.g. B15 3PQ)' },
                  })} />
                  <ERR msg={errors.postcode?.message} />
                </div>
              </div>
            </>
          )}

          {step.type === 'opts' && (
            <>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              {step.tip && <div className="wbtip">{step.tip}</div>}
              <div className="wbopts">
                {step.ops.map((o, i) => (
                  <div key={i} className={`wbopt${opts[cur] === i ? ' sel' : ''}`} onClick={() => selOpt(i)}>
                    <div className="wbot">{o.t}</div>
                    {o.s && <div className="wbos">{o.s}</div>}
                  </div>
                ))}
              </div>
            </>
          )}

          {step.type === 'children' && (
            <>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              <div className="wbopts" style={{ flex: 0, marginBottom: 12 }}>
                <div className={`wbopt${childrenHas === false ? ' sel' : ''}`} onClick={() => setChildrenHas(false)}>
                  <div className="wbot">No children</div>
                </div>
                <div className={`wbopt${childrenHas === true ? ' sel' : ''}`} onClick={() => setChildrenHas(true)}>
                  <div className="wbot">Yes — I have children</div>
                  <div className="wbos">We will capture their full names and dates of birth for the will</div>
                </div>
              </div>
              {childrenHas === true && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink3)', marginBottom: 8 }}>Children&apos;s details</div>
                  {childFields.map((field, i) => (
                    <div key={field.id} className="childrow">
                      <div>
                        <label className="fl">Full name</label>
                        <input className="fi" placeholder="Full name" {...register(`children.${i}.fn`)} />
                      </div>
                      <div>
                        <label className="fl">Date of birth</label>
                        <input className="fi" type="date" {...register(`children.${i}.dob`)} />
                      </div>
                      {childFields.length > 1 && <button type="button" className="rmb" onClick={() => removeChild(i)}>×</button>}
                    </div>
                  ))}
                  <button type="button" className="addbtn" onClick={() => appendChild({ fn: '', dob: '' })}>+ Add another child</button>
                </div>
              )}
            </>
          )}

          {step.type === 'multi' && (
            <>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              {step.tip && <div className="wbtip">{step.tip}</div>}
              <div className="wbopts">
                {step.opts.map((o, i) => (
                  <div key={i} className={`wbopt${(multi[cur] || []).includes(i) ? ' sel' : ''}`} onClick={() => toggleMC(i)}>
                    <div className="wbot">{o}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step.type === 'props' && (
            <>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              {step.tip && <div className="wbtip">{step.tip}</div>}
              {propFields.map((field, i) => (
                <div key={field.id} className="acctblk">
                  <div className="ablkh">
                    <div className="ablkt">Property {i + 1}</div>
                    {propFields.length > 1 && <button type="button" className="rmb" onClick={() => removeProp(i)}>×</button>}
                  </div>
                  <div className="wbfg wbfg2">
                    <div>
                      <label className="fl">Property type</label>
                      <select className="fi" {...register(`props.${i}.type`)}>
                        <option value="">Select…</option>
                        <option>UK residential</option>
                        <option>Buy-to-let (UK)</option>
                        <option>Property abroad</option>
                        <option>Commercial property</option>
                      </select>
                    </div>
                    <div>
                      <label className="fl">Ownership</label>
                      <select className="fi" {...register(`props.${i}.own`)}>
                        <option value="">Select…</option>
                        <option>Sole owner</option>
                        <option>Tenants in common ✓</option>
                        <option>Joint tenancy ⚠</option>
                      </select>
                    </div>
                  </div>
                  <div className="wbfg">
                    <label className="fl">Full address</label>
                    <input className="fi" placeholder="Full address" {...register(`props.${i}.addr`)} />
                  </div>
                  <div className="wbfg wbfg2">
                    <div>
                      <label className="fl">Approximate value (£)</label>
                      <input className="fi" placeholder="e.g. 350000" {...register(`props.${i}.val`)} />
                    </div>
                    <div>
                      <label className="fl">Outstanding mortgage (£)</label>
                      <input className="fi" placeholder="e.g. 180000 or 0" {...register(`props.${i}.mort`)} />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="addbtn" onClick={() => appendProp({ type: '', own: '', addr: '', val: '', mort: '' })}>+ Add another property</button>
            </>
          )}

          {step.type === 'banks' && (
            <>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              {bankFields.map((field, i) => (
                <div key={field.id} className="acctblk">
                  <div className="ablkh">
                    <div className="ablkt">Account {i + 1}</div>
                    {bankFields.length > 1 && <button type="button" className="rmb" onClick={() => removeBank(i)}>×</button>}
                  </div>
                  <div className="wbfg wbfg2">
                    <div>
                      <label className="fl">Bank / building society</label>
                      <input className="fi" placeholder="e.g. Lloyds, Al Rayan" {...register(`banks.${i}.name`)} />
                    </div>
                    <div>
                      <label className="fl">Account type</label>
                      <select className="fi" {...register(`banks.${i}.type`)}>
                        <option value="">Select…</option>
                        <option>Current account</option>
                        <option>Savings account</option>
                        <option>Joint account</option>
                        <option>Overseas account</option>
                      </select>
                    </div>
                  </div>
                  <div className="wbfg wbfg3">
                    <div>
                      <label className="fl">Account number</label>
                      <input className="fi" placeholder="12345678" {...register(`banks.${i}.acct`)} />
                    </div>
                    <div>
                      <label className="fl">Sort code</label>
                      <input className="fi" placeholder="00-00-00" {...register(`banks.${i}.sort`)} />
                    </div>
                    <div>
                      <label className="fl">Balance (£) approx.</label>
                      <input className="fi" placeholder="Optional" {...register(`banks.${i}.bal`)} />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="addbtn" onClick={() => appendBank({ name: '', type: '', acct: '', sort: '', bal: '' })}>+ Add another account</button>
            </>
          )}

          {step.type === 'religious' && (
            <>
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
                  <div key={i} className={`wbopt${religious.includes(i) ? ' sel' : ''}`} onClick={() => setReligious(r => r.includes(i) ? r.filter(x => x !== i) : [...r, i])}>
                    <div className="wbot">{o.t}</div>
                    {o.s && <div className="wbos">{o.s}</div>}
                  </div>
                ))}
              </div>
            </>
          )}

          {step.type === 'appoint' && step.flavor === 'executor' && (
            <>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              <div className="alert alert-g" style={{ marginBottom: 12 }}>{step.info}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink3)', marginBottom: 8 }}>Primary executor</div>
              <div className="wbfg wbfg2">
                <div><label className="fl">Full name</label><input className="fi" placeholder="Full name" {...register('execName')} /></div>
                <div><label className="fl">Relationship to you</label><input className="fi" placeholder="e.g. Brother, spouse" {...register('execRel')} /></div>
              </div>
              <div className="wbfg wbfg2">
                <div><label className="fl">Full address</label><input className="fi" placeholder="Address" {...register('execAddr')} /></div>
                <div><label className="fl">Phone / email</label><input className="fi" placeholder="Contact details" {...register('execContact')} /></div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink3)', margin: '11px 0 7px' }}>Backup executor (strongly recommended)</div>
              <div className="wbfg wbfg2">
                <div><label className="fl">Full name</label><input className="fi" placeholder="Full name" {...register('execBack')} /></div>
                <div><label className="fl">Relationship to you</label><input className="fi" placeholder="Relationship" {...register('execBackRel')} /></div>
              </div>
            </>
          )}

          {step.type === 'appoint' && step.flavor === 'guardian' && (
            <>
              <div className="wbq">{step.q}</div>
              <div className="wbsub">{step.sub}</div>
              <div className="alert alert-g" style={{ marginBottom: 12 }}>{step.info}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink3)', marginBottom: 8 }}>Primary guardian</div>
              <div className="wbfg wbfg2">
                <div><label className="fl">Full name</label><input className="fi" placeholder="Full name" {...register('guardName')} /></div>
                <div><label className="fl">Relationship to you</label><input className="fi" placeholder="e.g. Brother, spouse" {...register('guardRel')} /></div>
              </div>
              <div className="wbfg wbfg2">
                <div><label className="fl">Full address</label><input className="fi" placeholder="Address" {...register('guardAddr')} /></div>
                <div><label className="fl">Phone / email</label><input className="fi" placeholder="Contact details" {...register('guardContact')} /></div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink3)', margin: '11px 0 7px' }}>Backup guardian (strongly recommended)</div>
              <div className="wbfg wbfg2">
                <div><label className="fl">Full name</label><input className="fi" placeholder="Full name" {...register('guardBack')} /></div>
                <div><label className="fl">Relationship to you</label><input className="fi" placeholder="Relationship" {...register('guardBackRel')} /></div>
              </div>
            </>
          )}

          {step.type === 'summary' && (
            <>
              <Badge variant="outline" style={{
                marginBottom: 12,
                ...(fee.tier === 'complex'
                  ? { background: 'var(--ambl)', color: 'var(--ambd)', borderColor: 'transparent' }
                  : fee.tier === 'family'
                  ? { background: 'var(--bluel)', color: 'var(--blue)', borderColor: 'transparent' }
                  : { background: 'var(--gl)', color: 'var(--gd)', borderColor: 'transparent' })
              }}>
                {fee.tier === 'complex' ? 'Complex case' : fee.tier === 'family' ? 'Family case' : 'Essentials'}
              </Badge>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>Your will summary</div>
              <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 13 }}>Review before payment</div>
              <div className="sumrow"><span className="sk">Marital status</span><span className="sv">{opts[2] !== undefined ? (STEPS[2] as { ops: { t: string }[] }).ops[opts[2]]?.t : '—'}</span></div>
              <div className="sumrow"><span className="sk">Survivorship</span><span className="sv">{opts[12] !== undefined ? (STEPS[12] as { ops: { t: string }[] }).ops[opts[12]]?.t : '—'}</span></div>
              <div className="sumrow"><span className="sk">Per stirpes</span><span className="sv">{opts[13] !== undefined ? (STEPS[13] as { ops: { t: string }[] }).ops[opts[13]]?.t : '—'}</span></div>
              <div className="sumrow"><span className="sk">Estate value</span><span className="sv">{opts[19] !== undefined ? (STEPS[19] as { ops: { t: string }[] }).ops[opts[19]]?.t : '—'}</span></div>
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
          <button type="button" className="wbback" onClick={goBack} style={{ opacity: cur === 0 ? 0.3 : 1 }} disabled={cur === 0}>Back</button>
          <button type="button" className="wbsave" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save & exit'}
          </button>
          {saveError && <div style={{ fontSize: 11, color: '#c0392b', marginTop: 4, textAlign: 'center' }}>{saveError}</div>}
          <button type="button" className="wbnext" onClick={goNext} disabled={!canContinue && step.type !== 'personal' && step.type !== 'address'}>
            {cur === STEPS.length - 1 ? 'Proceed to checkout' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
