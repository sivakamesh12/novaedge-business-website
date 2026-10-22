import React, { useState } from 'react';
import { ShieldCheck, Zap, LineChart, Code2, Users2, Clock } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'principles' | 'process'>('principles');

  const principles = [
    {
      icon: ShieldCheck,
      title: "Architectural Rigor Over Feature Bloat",
      description: "We model failure boundaries, idempotency, and high-concurrency data consistency before committing code. Resilient architecture always outlasts premature features.",
    },
    {
      icon: Zap,
      title: "Direct Access to Principal Engineers",
      description: "No account managers translating requirements. You collaborate directly with senior systems architects who write and review production code daily.",
    },
    {
      icon: LineChart,
      title: "Verifiable Metric Accountability",
      description: "Every engagement ties delivery milestones to concrete business parameters—API p99 latency reduction, conversion rate improvements, or infrastructure savings.",
    },
  ];

  const processPhases = [
    {
      phase: "01",
      name: "Domain Audit & Technical Blueprinting",
      duration: "Days 1 – 14",
      summary: "Deep-dive analysis of your current infrastructure, transaction profiles, data schemas, and team constraints to map an immutable delivery roadmap.",
    },
    {
      phase: "02",
      name: "Rapid Sprint Construction",
      duration: "Weeks 3 – 10",
      summary: "Bi-weekly production sprint increments with automated testing, live preview staging environments, and zero-defect QA verification.",
    },
    {
      phase: "03",
      name: "Stress Testing & Compliance Validation",
      duration: "Weeks 11 – 12",
      summary: "Comprehensive load testing simulating 10x traffic spikes, chaos experiments, and security audits adhering to SOC2, HIPAA, and GDPR standards.",
    },
    {
      phase: "04",
      name: "Zero-Downtime Cutover & 30-Day Hypercare",
      duration: "Post-Launch",
      summary: "Automated canary deployments, continuous monitoring with distributed telemetry, and direct support during critical ramp periods.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-900/50 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            About NovaEdge
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Boutique craft with enterprise-grade execution.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Founded in {COMPANY_DATA.brand.yearEstablished}, NovaEdge operates as a dedicated technical
            consultancy for venture-backed startups and Fortune 500 divisions. We eliminate the layers of
            traditional agency overhead so you get battle-tested software delivered on schedule.
          </p>
        </div>

        {/* Tab switch */}
        <div className="mt-12 flex items-center gap-2 p-1.5 bg-slate-950/80 border border-slate-800 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('principles')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'principles'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Core Engineering Tenets
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'process'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4-Stage Delivery Framework
          </button>
        </div>

        {/* Tab Content: Principles */}
        {activeTab === 'principles' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-900 text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>Principle #{idx + 1}</span>
                    <span className="text-cyan-400">Validated in Production</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content: Process */}
        {activeTab === 'process' && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processPhases.map((phase) => (
              <div
                key={phase.phase}
                className="p-6 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-400 font-bold">{phase.phase}</span>
                    <span className="text-slate-400">{phase.duration}</span>
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {phase.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {phase.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-400">
                  Fixed timeline guarantee
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Editorial Team Credentials Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-xl bg-slate-950/60 border border-slate-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
              <Users2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Senior Engineering Talents with Tier-1 Backgrounds
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Alumni from high-concurrency fintech platforms, cloud infrastructure providers, and regulated healthcare ecosystems.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              US Pacific &amp; Eastern Hubs
            </span>
            <span className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-cyan-400" />
              100% In-House Code
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
