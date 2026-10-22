import React from 'react';
import { Compass, Cpu, Layers, BarChart3, ArrowRight, Check } from 'lucide-react';
import { COMPANY_DATA, ServiceItem } from '../data/companyData';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-cyan-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-cyan-400" />;
      default:
        return <Compass className="w-6 h-6 text-cyan-400" />;
    }
  };

  const handleInquire = (service: ServiceItem) => {
    onSelectService(service.title);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="services" className="py-24 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
              Professional Services &amp; Deliverables
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Engineered for resilience, structured with clear milestones.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              We focus on deep software disciplines where architectural clarity and high execution speed
              are essential for product success.
            </p>
          </div>
          <div className="text-sm text-slate-400 font-mono">
            <span>Specialized Practicing Disciplines · 04 Core Units</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMPANY_DATA.services.map((service) => (
            <div
              key={service.id}
              className="group p-8 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div 
                aria-hidden="true"
                className="absolute -right-24 -top-24 w-60 h-60 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none"
              />

              <div className="space-y-6 relative z-10">
                {/* Header row: Number and Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:scale-105 transition-all">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-2xl font-mono font-bold text-slate-600 group-hover:text-cyan-400/80 transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400/90 mt-1">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Concrete Deliverables */}
                <div className="pt-2 space-y-2.5">
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    Tangible Engineering Deliverables:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Capabilities Metadata (Zero-Pill discipline: unboxed text with separators) */}
                <div className="pt-3 border-t border-slate-900 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="text-slate-400 font-mono">Tooling:</span>
                  {service.capabilities.map((cap, idx) => (
                    <React.Fragment key={cap}>
                      <span className="text-slate-300 font-medium">{cap}</span>
                      {idx < service.capabilities.length - 1 && (
                        <span aria-hidden="true" className="text-slate-600">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Bottom Inquire CTA */}
              <div className="mt-8 pt-4 border-t border-slate-900/80 flex items-center justify-between relative z-10">
                <button
                  onClick={() => handleInquire(service)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-1 duration-200"
                >
                  <span>Inquire about this capability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-slate-400">Fixed Milestone</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
