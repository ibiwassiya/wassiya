'use client'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ScholarValidation() {
  return (
    <div className="psec active">
      <div className="psect">Scholar validation queue</div>
      <div className="casec">
        <div className="caseh">
          <div>
            <div className="casetn">Ahmed Khan — Faraid validation</div>
            <div className="caseref">WAS-2025-04821 · Mufti Ibrahim Ali assigned</div>
          </div>
          <div className="caseacts">
            <Badge variant="outline" style={{ background: 'var(--gl)', color: 'var(--gd)', borderColor: 'transparent' }}>
              <Check size={10} />Validated
            </Badge>
          </div>
        </div>
        <div className="ir"><span className="irl">Surviving relatives</span><span className="irv">Wife, 2 daughters, mother</span></div>
        <div className="ir"><span className="irl">Spouse share</span><span className="irv">⅛ (children present)</span></div>
        <div className="ir"><span className="irl">Daughters share</span><span className="irv">Split remaining ¾ equally</span></div>
        <div className="ir"><span className="irl">Mother share</span><span className="irv">⅙ (children present)</span></div>
        <div className="ir"><span className="irl">Scholar sign-off</span><span className="irv g">Mufti Ibrahim Ali · 12 May 2025</span></div>
      </div>
    </div>
  )
}
