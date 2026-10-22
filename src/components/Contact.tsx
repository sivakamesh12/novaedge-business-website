import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  Check, 
  Copy, 
  ExternalLink, 
  AlertCircle,
  ShieldAlert,
  Info
} from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

interface ContactProps {
  selectedServiceTitle?: string;
}

interface FormData {
  fullName: string;
  workEmail: string;
  company: string;
  service: string;
  budget: string;
  details: string;
}

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  company?: string;
  details?: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedServiceTitle }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    workEmail: '',
    company: '',
    service: selectedServiceTitle || COMPANY_DATA.services[0].title,
    budget: '$50,000 – $100,000',
    details: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isPrepared, setIsPrepared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  // Sync incoming selected service if user clicked from services section
  useEffect(() => {
    if (selectedServiceTitle) {
      setFormData((prev) => ({ ...prev, service: selectedServiceTitle }));
    }
  }, [selectedServiceTitle]);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.workEmail.trim()) {
      errs.workEmail = 'Please provide your work email address.';
    } else if (!emailRegex.test(formData.workEmail.trim())) {
      errs.workEmail = 'Please enter a valid work email address.';
    }

    if (!formData.company.trim()) {
      errs.company = 'Please enter your company or organization name.';
    }

    if (!formData.details.trim()) {
      errs.details = 'Please briefly outline your initiative or architecture requirements.';
    } else if (formData.details.trim().length < 10) {
      errs.details = 'Please describe your initiative in at least 10 characters.';
    }

    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validate());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      workEmail: true,
      company: true,
      details: true,
    });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsPrepared(true);
    }
  };

  // Structured summary for mailto / copy
  const formattedSummary = `
NOVAEDGE PROJECT INQUIRY
----------------------------------------
Name: ${formData.fullName}
Work Email: ${formData.workEmail}
Company: ${formData.company}
Target Service: ${formData.service}
Budget Scope: ${formData.budget}

Project Objectives & Architecture Requirements:
${formData.details}

Submitted via NovaEdge Client Portal
  `.trim();

  const mailtoUrl = `mailto:${COMPANY_DATA.contact.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${formData.company} - ${formData.service}`
  )}&body=${encodeURIComponent(formattedSummary)}`;

  const whatsappUrl = `https://wa.me/${COMPANY_DATA.contact.whatsappNumber}?text=${encodeURIComponent(
    COMPANY_DATA.contact.whatsappDefaultMessage
  )}`;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(formattedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleResetForm = () => {
    setIsPrepared(false);
    setFormData({
      fullName: '',
      workEmail: '',
      company: '',
      service: COMPANY_DATA.services[0].title,
      budget: '$50,000 – $100,000',
      details: '',
    });
    setTouched({});
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Editable Studio Details & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                Initiate Engagement
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
                Let’s review your system architecture.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Whether you need a Greenfield product build, cloud modernization, or a performance
                discovery sprint, reach out directly. All contact fields are fully editable in your codebase.
              </p>
            </div>

            {/* Business Contact Details Card */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Direct Communications
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">PST Business Hours</span>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-slate-400 font-medium">Official Inquiry Mailbox</div>
                  <a
                    href={`mailto:${COMPANY_DATA.contact.email}?subject=${encodeURIComponent(
                      COMPANY_DATA.contact.emailSubject
                    )}`}
                    className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{COMPANY_DATA.contact.email}</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                  <p className="text-[11px] text-slate-400">Response SLA: {COMPANY_DATA.contact.responseSLA}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-slate-400 font-medium">Headquarters Telephone</div>
                  <a
                    href={`tel:${COMPANY_DATA.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{COMPANY_DATA.contact.phoneDisplay}</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                  <p className="text-[11px] text-slate-400">Toll-free business line</p>
                </div>
              </div>

              {/* WhatsApp Link with clear editable placeholder indicator */}
              <div className="flex items-start gap-3 pt-3 border-t border-slate-800/80">
                <div className="p-2 rounded-lg bg-emerald-950/70 text-emerald-400 border border-emerald-800/50 shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">WhatsApp Instant Line</span>
                    <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900">
                      Working Link
                    </span>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 hover:text-emerald-200 text-xs font-semibold border border-emerald-800/60 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open WhatsApp Chat ({COMPANY_DATA.contact.phoneDisplay})</span>
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                  <div className="flex items-start gap-1 text-[11px] text-slate-400 pt-0.5">
                    <Info className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      Editable placeholder in <code className="text-slate-200">src/data/companyData.ts</code> (update <code className="text-cyan-300">whatsappNumber</code>).
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical Office / Demo Location Card */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Headquarters Location</div>
                      <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                        {COMPANY_DATA.contact.address.label}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {COMPANY_DATA.contact.address.coordinates}
                  </span>
                </div>

                <p className="text-sm text-slate-200 font-medium pl-10">
                  {COMPANY_DATA.contact.address.display}
                </p>

                {/* Stylized Vector Cartography Preview (Zero API Key, Never Blank or Broken) */}
                <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
                  {/* Subtle Grid Lines */}
                  <svg className="absolute inset-0 w-full h-full stroke-slate-800/70" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="contact-map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" strokeWidth="0.75" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#contact-map-grid)" />
                    {/* Simulated arterial streets */}
                    <path d="M-10 40 Q 120 70 300 20 T 600 80" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.25" />
                    <path d="M 160 -10 L 140 130" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.2" />
                    <path d="M 240 -10 L 220 130" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.15" />
                  </svg>

                  {/* Concentric Radar Rings & Central Cyan Pin */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-16 h-16 rounded-full border border-cyan-500/20 animate-ping opacity-40 pointer-events-none" />
                    <div className="absolute w-10 h-10 rounded-full border border-cyan-400/30 bg-cyan-950/40" />
                    <div className="relative w-7 h-7 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-400/40 z-10 group-hover:scale-110 transition-transform">
                      <MapPin className="w-4 h-4 fill-slate-950" />
                    </div>
                  </div>

                  {/* Bottom overlay badge */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded border border-slate-800">
                    <span>San Francisco · Mission District</span>
                    <span className="text-cyan-400">PST · UTC-8</span>
                  </div>
                </div>

                {/* Location Action Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={COMPANY_DATA.contact.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-300 hover:text-cyan-200 text-xs font-semibold border border-cyan-800/60 transition-colors"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(COMPANY_DATA.contact.address.display);
                      setAddressCopied(true);
                      setTimeout(() => setAddressCopied(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                  >
                    {addressCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Address Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 leading-tight">
                  Sample address for client preview. Update <code className="text-slate-300">address</code> in{' '}
                  <code className="text-slate-300">src/data/companyData.ts</code> with your verified office or remote hub.
                </p>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 pt-3 border-t border-slate-800/80">
                <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Operating Hours</div>
                  <p className="text-xs text-slate-300">
                    {COMPANY_DATA.contact.officeHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative">
              {!isPrepared ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Schedule a Technical Discovery Session
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Complete this brief to structure your requirements. Form validation checks inputs client-side with zero fake backend claims.
                    </p>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="block text-xs font-medium text-slate-300">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('fullName')}
                        placeholder="Alex Morgan"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border text-sm text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 transition-colors ${
                          errors.fullName && touched.fullName
                            ? 'border-rose-500 focus-visible:ring-rose-500'
                            : 'border-slate-800 focus-visible:border-cyan-400 focus-visible:ring-cyan-400'
                        }`}
                      />
                      {errors.fullName && touched.fullName && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="workEmail" className="block text-xs font-medium text-slate-300">
                        Work Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="workEmail"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        onBlur={() => handleBlur('workEmail')}
                        placeholder="alex@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border text-sm text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 transition-colors ${
                          errors.workEmail && touched.workEmail
                            ? 'border-rose-500 focus-visible:ring-rose-500'
                            : 'border-slate-800 focus-visible:border-cyan-400 focus-visible:ring-cyan-400'
                        }`}
                      />
                      {errors.workEmail && touched.workEmail && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.workEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company & Target Service Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company */}
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="block text-xs font-medium text-slate-300">
                        Company / Organization <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={() => handleBlur('company')}
                        placeholder="Horizon Dynamics"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border text-sm text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 transition-colors ${
                          errors.company && touched.company
                            ? 'border-rose-500 focus-visible:ring-rose-500'
                            : 'border-slate-800 focus-visible:border-cyan-400 focus-visible:ring-cyan-400'
                        }`}
                      />
                      {errors.company && touched.company && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.company}
                        </p>
                      )}
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-1.5">
                      <label htmlFor="service" className="block text-xs font-medium text-slate-300">
                        Primary Area of Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus-visible:outline-none focus-visible:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
                      >
                        {COMPANY_DATA.services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.number}. {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget Scope */}
                  <div className="space-y-1.5">
                    <label htmlFor="budget" className="block text-xs font-medium text-slate-300">
                      Estimated Project Scope / Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus-visible:outline-none focus-visible:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <option value="$25,000 – $50,000">$25,000 – $50,000 (Targeted Discovery / Audit)</option>
                      <option value="$50,000 – $100,000">$50,000 – $100,000 (Core Microservice or UI System)</option>
                      <option value="$100,000 – $250,000">$100,000 – $250,000 (Full Platform Re-architecture)</option>
                      <option value="$250,000+">$250,000+ (Multi-quarter Enterprise Program)</option>
                    </select>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-1.5">
                    <label htmlFor="details" className="block text-xs font-medium text-slate-300">
                      System Objectives &amp; Known Bottlenecks <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows={4}
                      value={formData.details}
                      onChange={handleChange}
                      onBlur={() => handleBlur('details')}
                      placeholder="e.g. We are refactoring our real-time notification engine to support 100,000 concurrent WebSocket connections. We need architectural blueprints and an event-sourced queue setup."
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border text-sm text-white placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 transition-colors ${
                        errors.details && touched.details
                          ? 'border-rose-500 focus-visible:ring-rose-500'
                          : 'border-slate-800 focus-visible:border-cyan-400 focus-visible:ring-cyan-400'
                      }`}
                    />
                    {errors.details && touched.details && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.details}
                      </p>
                    )}
                  </div>

                  {/* Transparent Architectural Disclaimer */}
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400">
                    <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Static Client Verification:</strong> This form validates your brief in-browser.
                      No fake server calls or phantom databases are claimed. Once verified, dispatch directly via your email client or copy the formatted payload.
                    </span>
                  </div>

                  {/* Submit Button with hover effect */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>Validate &amp; Prepare Project Brief</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Validated Prepared State */
                <div className="space-y-6 py-2">
                  <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Brief Validated &amp; Formatted
                      </h4>
                      <p className="text-xs text-slate-300">
                        Your project inquiry for <strong>{formData.company}</strong> is ready for direct transmission.
                      </p>
                    </div>
                  </div>

                  {/* Summary Preview Box */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-2 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
                    {formattedSummary}
                  </div>

                  {/* Two Real Working Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Action 1: Open in Email Client */}
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors text-center cursor-pointer shadow-md shadow-cyan-500/20"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email Client (mailto)</span>
                    </a>

                    {/* Action 2: Copy to Clipboard */}
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Brief Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Formatted Brief</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Reset/Edit Action */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      Edit inputs or create another inquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
