import React from 'react';
import { GitBranch, UserCheck, ShieldAlert, Check, CheckCircle2 } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

export const Standards: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <GitBranch className="w-6 h-6 text-cyan-400" />;
      case 1:
        return <UserCheck className="w-6 h-6 text-cyan-400" />;
      case 2:
        return <CheckCircle2 className="w-6 h-6 text-cyan-400" />;
      default:
        return <Check className="w-6 h-6 text-cyan-400" />;
    }
  };

  const comparisonPoints = [
    {
      feature: "Code & Architecture Ownership",
      traditional: "Proprietary frameworks, delayed code releases",
      novaedge: "100% client repository ownership from Day 1",
    },
    {
      feature: "Communication Channel",
      traditional: "Account managers & ticketing buffers",
      novaedge: "Direct Slack/Teams channel with principal architects",
    },
    {
      feature: "Testing & Code Quality",
      traditional: "Manual handoffs & post-launch bug triage",
      novaedge: "Automated CI/CD, linting & load tests on every branch",
    },
    {
      feature: "Contractual Model",
      traditional: "Open-ended time & materials with hourly overages",
      novaedge: "Clear milestone-based agreements with fixed acceptance criteria",
    },
  ];

  return (
    <section id="standards" className="py-24 bg-slate-900/40 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
            Engineering Standards &amp; Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            How we work: Zero black boxes, absolute code transparency.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            We partner with modern teams seeking clarity, speed, and clean code.
            Our practices are designed to protect your product roadmap and engineering culture.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {COMPANY_DATA.engagementStandards.map((std, idx) => (
            <div
              key={std.id}
              className="p-8 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between relative shadow-lg shadow-black/20 group hover:shadow-xl hover:shadow-cyan-950/10"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:scale-105 transition-all">
                  {getIcon(idx)}
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyan-400 font-semibold">
                    {std.principle}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {std.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {std.detail}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-900 text-xs font-mono text-slate-400 flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{std.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Matrix: Traditional Agencies vs NovaEdge */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
          <div className="mb-6 space-y-1">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Operational Transparency Matrix
            </h3>
            <p className="text-xs text-slate-400">
              A direct comparison between traditional agency workflows and our engineering-first delivery model.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs uppercase">
                  <th className="py-3 px-4 font-semibold">Operational Facet</th>
                  <th className="py-3 px-4 font-semibold text-slate-400">Conventional Agencies</th>
                  <th className="py-3 px-4 font-semibold text-cyan-400">NovaEdge Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {comparisonPoints.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {row.traditional}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-cyan-300 flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{row.novaedge}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
