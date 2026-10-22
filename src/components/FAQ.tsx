import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleFAQ = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFaqs = COMPANY_DATA.faqs.filter((faq) => {
    if (activeCategory === 'all') return true;
    return faq.category === activeCategory;
  });

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'engagement', label: 'Engagement Model' },
    { id: 'technical', label: 'Technical Stack' },
    { id: 'pricing', label: 'Investment & Timelines' },
    { id: 'timeline', label: 'Post-Launch SLA' },
  ];

  return (
    <section id="faq" className="py-24 border-b border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Clear answers about working with NovaEdge.
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Everything you need to know about our sprint cadence, technology stack, contracts, and delivery guarantees.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeCategory === cat.id
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'bg-slate-950 text-slate-400 border border-slate-900 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-colors ${
                  isOpen
                    ? 'bg-slate-900/60 border-slate-700/80 shadow-md shadow-black/20'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Prompt */}
        <div className="mt-12 p-6 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" />
            <span className="text-sm text-slate-300">
              Have a bespoke enterprise requirement or need an NDA first?
            </span>
          </div>
          <a
            href={`mailto:${COMPANY_DATA.contact.email}?subject=Enterprise%20NDA%20Inquiry%20-%20NovaEdge`}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline whitespace-nowrap"
          >
            Request bilateral NDA →
          </a>
        </div>
      </div>
    </section>
  );
};
