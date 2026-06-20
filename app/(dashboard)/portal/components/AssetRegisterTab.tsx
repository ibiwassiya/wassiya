'use client'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const done  = { background: 'var(--gl)',   color: 'var(--gd)',   borderColor: 'transparent' }
const amber = { background: 'var(--ambl)', color: 'var(--ambd)', borderColor: 'transparent' }

export default function AssetRegisterTab() {
  return (
    <div className="psec active">
      <div className="psect">Asset register completion</div>
      <div className="alert alert-g">Your asset register is stored securely alongside your will. Complete it so your executors can administer your estate without difficulty.</div>
      <div className="ir"><span className="irl">Bank accounts</span><Badge variant="outline" style={done}><Check size={10} />2 entries</Badge></div>
      <div className="ir"><span className="irl">Property (UK)</span><Badge variant="outline" style={done}><Check size={10} />1 entry</Badge></div>
      <div className="ir"><span className="irl">Property (overseas)</span><Badge variant="outline" style={amber}>Ref pending</Badge></div>
      <div className="ir"><span className="irl">Pensions</span><Badge variant="outline" style={amber}>Not started</Badge></div>
      <div className="ir"><span className="irl">Debts &amp; obligations</span><Badge variant="outline" style={done}><Check size={10} />Completed</Badge></div>
      <div className="ir"><span className="irl">Religious obligations</span><Badge variant="outline" style={amber}>Not started</Badge></div>
      <div className="ir"><span className="irl">Relatives (Faraid)</span><Badge variant="outline" style={done}><Check size={10} />Completed</Badge></div>
      <button className="btn btn-g" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>Continue asset register</button>
    </div>
  )
}
