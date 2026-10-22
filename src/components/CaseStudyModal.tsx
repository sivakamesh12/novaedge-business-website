import React, { useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { CaseStudy } from '../data/companyData';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  onClose,
  onContactClick,
}) => {
  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!study) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Media */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = study.fallbackImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Metric overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                {study.projectType} · Technical Deep Dive
              </div>
              <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-white mt-1">
                {study.title}
              </h3>
            </div>
            <div className="text-right shrink-0 hidden sm:block">
              <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                {study.headlineMetric}
              </span>
              <p className="text-xs text-slate-300">{study.metricLabel}</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Project Type & Summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="text-cyan-400 font-medium">Domain: {study.industry}</span>
              <span aria-hidden="true">/</span>
              <span>Architecture Paradigm: Event-Driven Distributed Microservices</span>
            </div>
            <p className="text-base text-slate-300 leading-relaxed">
              {study.summary}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Engineering Challenge
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {study.challenge}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Engineered Solution
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Measurable Benchmark Results */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Simulated Load &amp; Engineering Benchmark Results:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {study.results.map((res, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Technology Stack &amp; Protocols:
            </h4>
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono bg-slate-950 border border-slate-800 rounded text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Illustrative reference architecture blueprint</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 active:scale-[0.98] transition-all"
            >
              <span>Discuss Similar Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
