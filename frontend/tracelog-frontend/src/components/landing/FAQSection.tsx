'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Which databases does TraceLog support?',
    a: 'PostgreSQL, MongoDB and Redis today, with native connectors for each — more engines are on the roadmap.',
  },
  {
    q: 'How is pricing calculated?',
    a: 'Billed on total ingest volume per month across all connected databases, regardless of how many hosts you run.',
  },
  {
    q: 'Can I self-host TraceLog?',
    a: 'Yes — Enterprise plans support on-prem and VPC deployment alongside our managed cloud.',
  },
  {
    q: 'What is the data retention policy?',
    a: 'Free retains 7 days, Team retains 30 days, Enterprise plans can configure custom retention windows.',
  },
  {
    q: 'Do you offer an SLA?',
    a: 'Enterprise plans include a 99.99% uptime SLA with dedicated on-call support.',
  },
]

function FAQItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {

  return (
    <div style={{ borderTop: '1px solid #1A1A1A' }}>
      <div
        onClick={onToggle}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', padding: '24px 0', cursor: 'pointer' }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF', margin: 0, lineHeight: 1.5 }}>{faq.q}</h3>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '20px',
          color: '#FE5203',
          flexShrink: 0,
          marginTop: '2px',
          display: 'block',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 250ms ease',
        }}>+</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows 280ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <p style={{
            fontSize: '14px',
            color: '#71717A',
            lineHeight: 1.7,
            margin: '0 0 24px',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'opacity 250ms ease, transform 250ms ease',
          }}>{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(prev => prev === i ? null : i)
  }

  return (
    <section style={{ borderTop: '1px solid #1A1A1A', padding: '96px 48px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#FE5203', letterSpacing: '1.5px', textTransform: 'uppercase' }}>FAQ</span>
          <h2 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-1.5px', color: '#FFFFFF', margin: '12px 0 0', lineHeight: 1.1 }}>
            Common questions.
          </h2>
        </div>

        <div style={{ borderBottom: '1px solid #1A1A1A' }}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
