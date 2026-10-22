import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import heroStudioImg from '../assets/images/hero_modern_studio_1792669469648.jpg';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-slate-900">
      {/* Subtle background illumination */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl opacity-70" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Hero Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 tracking-wide uppercase">
              <span>Enterprise Software Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Cloud Engineering</span>
              <span aria-hidden="true">·</span>
              <span>San Francisco</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Engineering digital systems that redefine{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                enterprise velocity.
              </span>
            </h1>

            {/* Body proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              NovaEdge partners with modern engineering and product leaders to architect,
              modernize, and ship resilient cloud platforms, distributed services, and
              refined digital products designed for high volume.
            </p>

            {/* CTAs with hover effects */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('#contact')}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 hover:shadow-cyan-400/25 hover:shadow-xl active:scale-[0.98] transition-all whitespace-nowrap"
              >
                <span>Schedule Discovery Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('#portfolio')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 hover:border-slate-700 hover:text-white transition-all active:scale-[0.98] whitespace-nowrap"
              >
                Explore Sample Blueprints
              </button>
            </div>

            {/* Engineering standard cues */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Zero vendor lock-in</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Production CI/CD pipelines</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Fixed-milestone agreements</span>
              </div>
            </div>
          </div>

          {/* Right: High-Fidelity Studio Visual Asset with hover polish */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-cyan-950/20 group transition-all duration-300 hover:border-slate-700">
              <img
                src={heroStudioImg}
                alt="NovaEdge Digital Engineering Studio in San Francisco"
                className="w-full h-auto object-cover aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/hero-studio.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
              
              {/* Overlay Caption with authentic detail */}
              <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300 backdrop-blur-md bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">NovaEdge Systems Lab</p>
                  <p className="text-[11px] text-slate-400">Mission District · San Francisco</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-cyan-400 font-semibold text-xs">High-Volume Staging</span>
                  <p className="text-[11px] text-slate-400">Distributed Architectures</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Engineering Benchmark Strip */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {COMPANY_DATA.benchmarks.map((stat, idx) => (
            <div key={idx} className="space-y-1 p-3 rounded-lg hover:bg-slate-900/40 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 leading-snug">
                {stat.context}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
