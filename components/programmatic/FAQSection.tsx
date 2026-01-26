'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export function FAQSection({ items, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-heading font-bold text-text mb-6">{title}</h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="card overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-surface-light/50 transition-colors"
            >
              <span className="font-semibold text-text pr-4">{item.question}</span>
              <span
                className={`text-brand text-xl transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                ↓
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-muted leading-relaxed border-t border-slate-100 pt-4">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
