import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { COMPANY_DATA, CaseStudy } from '../data/companyData';
import { CaseStudyModal } from './CaseStudyModal';

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'fintech' | 'logistics' | 'healthtech'>('all');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const filteredStudies = COMPANY_DATA.caseStudies.filter((study) => {
    if (filter === 'all') return true;
    return study.category === filter;
  });

  const handleContactClick = () => {
    const el = document.querySelector('#contact');
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="portfolio" className="py-24 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
              Portfolio &amp; Architecture Blueprints
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Three detailed reference architectures engineered for scale.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Explore how we design distributed systems, event-driven queues, and resilient web applications.
              These representative blueprints demonstrate our architecture standards and deliverable quality.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-950 border border-slate-800 rounded-lg w-fit">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Projects ({COMPANY_DATA.caseStudies.length})
            </button>
            <button
              onClick={() => setFilter('fintech')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'fintech'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              FinTech
            </button>
            <button
              onClick={() => setFilter('logistics')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'logistics'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Logistics
            </button>
            <button
              onClick={() => setFilter('healthtech')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'healthtech'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HealthTech
            </button>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <article
              key={study.id}
              className="group flex flex-col justify-between rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 hover:shadow-2xl hover:shadow-cyan-950/20 transition-all duration-300 overflow-hidden shadow-lg shadow-black/20"
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = study.fallbackImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Benchmark metric badge */}
                <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 rounded-lg px-3 py-1.5 text-right">
                  <div className="text-lg font-extrabold text-cyan-400 font-mono tabular-nums leading-none">
                    {study.headlineMetric}
                  </div>
                  <div className="text-[10px] text-slate-300 font-medium">
                    {study.metricLabel}
                  </div>
                </div>

                {/* Subtitle / unboxed text */}
                <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <span className="text-cyan-400 font-medium">{study.projectType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{study.industry}</span>
                </div>
              </div>

              {/* Text Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {study.summary}
                  </p>
                </div>

                {/* Key takeaway */}
                <div className="pt-3 border-t border-slate-900/80 space-y-2">
                  <div className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-200">
                      {study.results[0]}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {study.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.techStack.length > 4 && (
                      <span className="text-[11px] font-mono px-1.5 py-0.5 text-slate-400">
                        +{study.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedStudy(study)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 rounded-lg transition-all group-hover:border-cyan-500/40 active:scale-[0.98]"
                  >
                    <span>Inspect Architecture Brief</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        study={selectedStudy}
        onClose={() => setSelectedStudy(null)}
        onContactClick={handleContactClick}
      />
    </section>
  );
};
