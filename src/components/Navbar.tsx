import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageSquare, Mail, Phone } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

interface NavbarProps {
  onOpenDeploymentGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDeploymentGuide }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Standards', href: '#standards' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-slate-100 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
            aria-label="NovaEdge Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-base shadow-sm shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              N
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              NovaEdge
            </span>
          </a>

          {/* Zone 2: Navigation Links (Single-line, unboxed text) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1 py-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenDeploymentGuide}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded whitespace-nowrap"
              title="View deployment &amp; GitHub guide"
            >
              Deploy Docs
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Schedule Discovery Call
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-[65px] z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 md:hidden flex flex-col justify-between overflow-y-auto px-6 py-8"
        >
          <div className="space-y-6">
            <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase">Menu</p>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-xl font-medium text-slate-100 hover:text-cyan-400 transition-colors py-1 flex items-center justify-between border-b border-slate-900 pb-2"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-all shadow-md shadow-cyan-500/20"
              >
                Schedule Discovery Call
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDeploymentGuide();
                }}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 rounded-md text-center transition-colors"
              >
                View GitHub &amp; Deployment Guide
              </button>
            </div>
          </div>

          {/* Quick Contact Info on Mobile Drawer */}
          <div className="pt-8 mt-6 border-t border-slate-900 text-xs text-slate-400 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <a href={`mailto:${COMPANY_DATA.contact.email}`} className="hover:underline">
                {COMPANY_DATA.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <a href={`tel:${COMPANY_DATA.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline">
                {COMPANY_DATA.contact.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <a
                href={`https://wa.me/${COMPANY_DATA.contact.whatsappNumber}?text=${encodeURIComponent(COMPANY_DATA.contact.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                WhatsApp Chat ({COMPANY_DATA.contact.phoneDisplay})
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
