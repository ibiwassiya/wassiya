'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Is Wasiyya a regulated legal service?',
    a: 'Will writing itself is not regulated in the UK. However, every will we produce is reviewed and signed off by an SRA-regulated solicitor with professional indemnity insurance. Trust creation and power of attorney services are handled directly by our regulated solicitor partners.',
  },
  {
    q: 'How are Faraid shares calculated?',
    a: 'Our platform calculates preliminary Faraid shares based on your surviving relatives. These are then validated by a qualified Islamic scholar before your will is finalised. Any ambiguity is escalated for individual review.',
  },
  {
    q: 'Can I update my will after it is written?',
    a: 'Yes. You can update your will at any time through your secure account. We recommend reviewing every 3 years or after any significant life event. Updates are priced as new cases.',
  },
  {
    q: 'What if I have property overseas?',
    a: 'Overseas property often requires a separate will in that jurisdiction. Our platform flags this automatically and our solicitors advise on the overseas addendum required — included as an add-on (£500) to your package.',
  },
  {
    q: 'How is my data protected?',
    a: 'All personal data is encrypted at field level using AES-256. Documents are stored in encrypted cloud storage in the UK. We are registered with the ICO as a data controller and comply fully with UK GDPR. We never sell or share your data.',
  },
  {
    q: 'What is a Wasiyyah bequest?',
    a: 'A Wasiyyah is an optional bequest of up to one-third of your estate to someone who is not a Faraid heir — such as a charity, mosque, adopted children, or non-Muslim family members. It cannot benefit a legal Faraid heir.',
  },
  {
    q: 'How long does the whole process take?',
    a: 'The questionnaire takes approximately 20 minutes. Simple cases are delivered within 3 working days. Family cases take 5 working days. Complex cases have a bespoke timeline agreed with your solicitor.',
  },
]

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} className={`faqitem${open === i ? ' open' : ''}`}>
          <button className="faqq" onClick={() => setOpen(open === i ? null : i)}>
            {faq.q}
            <ChevronDown size={16} className="faqi" style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }} />
          </button>
          <div className="faqa">{faq.a}</div>
        </div>
      ))}
    </div>
  )
}
