'use client'
import { Check } from 'lucide-react'

export default function OverviewTab() {
  return (
    <div className="psec active">
      <div className="psect">Case progress</div>
      <div className="stl">
        <div className="stli done"><div className="stld stl-ok"><Check size={12} /></div><div className="stll">Received</div></div>
        <div className="stli done"><div className="stld stl-ok"><Check size={12} /></div><div className="stll">Assigned</div></div>
        <div className="stli"><div className="stld stl-cur">3</div><div className="stll">In review</div></div>
        <div className="stli"><div className="stld stl-pend">4</div><div className="stll">Approved</div></div>
        <div className="stli"><div className="stld stl-pend">5</div><div className="stll">Delivered</div></div>
      </div>
      <div className="alert alert-b">Your will draft is being reviewed by Fatima Hassan. She has a query about your overseas property — check your messages.</div>
      <div className="psect">Case details</div>
      <div className="ir"><span className="irl">Full name</span><span className="irv">Ahmed Rafiq Khan</span></div>
      <div className="ir"><span className="irl">Date of birth</span><span className="irv">14 March 1981</span></div>
      <div className="ir"><span className="irl">Address</span><span className="irv">42 Maple Avenue, Birmingham B15 3PQ</span></div>
      <div className="ir"><span className="irl">Case type</span><span className="irv">Family package</span></div>
      <div className="ir"><span className="irl">Solicitor</span><span className="irv">Fatima Hassan (SRA: 123456)</span></div>
      <div className="ir"><span className="irl">Scholar</span><span className="irv">Mufti Ibrahim Ali</span></div>
      <div className="ir"><span className="irl">Faraid shares</span><span className="irv g">Validated <Check size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }} /></span></div>
      <div className="ir"><span className="irl">Fee paid</span><span className="irv">£1,200</span></div>
      <div className="ir"><span className="irl">Referring advisor</span><span className="irv">Bilal Mahmood — Enver W&amp;M</span></div>
    </div>
  )
}
