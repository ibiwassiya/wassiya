'use client'
import { useRouter } from 'next/navigation'

type Draft = {
  id: string
  answers: Record<string, unknown> | null
  updated_at: string
  expires_at: string
}

interface Props {
  drafts: Draft[]
}

export default function MyWillsTab({ drafts }: Props) {
  const router = useRouter()

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  function stepLabel(step: number | undefined) {
    const STAGES = ['About you','Address','Family','Relatives','Property','Finance','Debts','Legal','Religious','Executor','Guardian','Islamic','Gifts','IHT','Summary']
    const STAGE_MAP = [0,1,2,4,5,6,8,9,11,12,13,14,15,16,17]
    if (step === undefined) return 'Not started'
    const stageIdx = STAGE_MAP.findLastIndex(s => step >= s)
    const stageName = stageIdx >= 0 ? STAGES[stageIdx] : 'About you'
    const pct = Math.round(((step + 1) / 21) * 100)
    return `${stageName} · ${pct}% complete`
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>My Wills</div>
        <div style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 2 }}>Saved drafts and active cases</div>
      </div>

      {drafts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', border: '1px dashed var(--cr2)', borderRadius: 'var(--r)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>No wills in progress</div>
          <div style={{ fontSize: 12, color: 'var(--ink3)', marginBottom: 16 }}>Start your Islamic will — takes around 15 minutes</div>
          <button
            onClick={() => router.push('/start')}
            style={{ fontSize: 12, fontWeight: 600, padding: '9px 18px', background: 'var(--g)', color: '#fff', border: 'none', borderRadius: 'var(--r)', cursor: 'pointer', fontFamily: 'var(--sans)' }}
          >
            Start my will
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {drafts.map(draft => {
            const step = (draft.answers as { step?: number } | null)?.step
            const pct = step !== undefined ? Math.round(((step + 1) / 21) * 100) : 0
            const expired = new Date(draft.expires_at) < new Date()

            return (
              <div key={draft.id} style={{ border: '1px solid var(--cr2)', borderRadius: 'var(--r)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', border: `3px solid ${expired ? 'var(--cr2)' : 'var(--g)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: expired ? 'var(--ink3)' : 'var(--g)' }}>
                  {pct}%
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>Islamic Will — Draft</div>
                  <div style={{ fontSize: 11, color: 'var(--ink3)' }}>
                    {stepLabel(step)} · Last saved {formatDate(draft.updated_at)}
                  </div>
                  {expired && (
                    <div style={{ fontSize: 11, color: '#c0392b', marginTop: 3 }}>Expired — start a new will</div>
                  )}
                </div>
                {!expired && (
                  <button
                    onClick={() => router.push(`/start?resume=${draft.id}`)}
                    style={{ fontSize: 12, fontWeight: 600, padding: '7px 14px', background: 'transparent', border: '1px solid var(--g)', borderRadius: 'var(--r)', color: 'var(--g)', cursor: 'pointer', fontFamily: 'var(--sans)', flexShrink: 0 }}
                  >
                    Resume
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
