import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, MessageSquare, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

interface FooterProps {
  onOpenDeploymentGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeploymentGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Core Services', href: '#services' },
    { label: 'Portfolio Blueprints', href: '#portfolio' },
    { label: 'Engineering Standards', href: '#standards' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact & Briefing', href: '#contact' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-slate-900">
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-base shadow-sm">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {COMPANY_DATA.brand.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {COMPANY_DATA.brand.mission}
            </p>
            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                aria-label="NovaEdge on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                aria-label="NovaEdge on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                aria-label="NovaEdge on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Mirror */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Communications */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Direct Channels
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${COMPANY_DATA.contact.email}`}
                  className="hover:text-cyan-400 transition-colors break-all"
                >
                  {COMPANY_DATA.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <a
                  href={`tel:${COMPANY_DATA.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {COMPANY_DATA.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-slate-900">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${COMPANY_DATA.contact.whatsappNumber}?text=${encodeURIComponent(
                    COMPANY_DATA.contact.whatsappDefaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  WhatsApp Chat (Active)
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          {/* Deployment & Open Source Guide */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Static Hosting
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% static React and Vite bundle. Optimized for free hosting on GitHub Pages, Vercel, or Netlify.
            </p>
            <button
              onClick={onOpenDeploymentGuide}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors cursor-pointer"
            >
              <span>Export &amp; Deploy Guide</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {COMPANY_DATA.brand.yearEstablished}–2026 {COMPANY_DATA.brand.name} Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>San Francisco (PST)</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
