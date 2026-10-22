/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Standards } from './components/Standards';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';

export default function App() {
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  const handleSelectService = (title: string) => {
    setSelectedServiceTitle(title);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar onOpenDeploymentGuide={() => setIsGuideOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Services onSelectService={handleSelectService} />
        <Portfolio />
        <Standards />
        <FAQ />
        <Contact selectedServiceTitle={selectedServiceTitle} />
      </main>

      {/* Footer */}
      <Footer onOpenDeploymentGuide={() => setIsGuideOpen(true)} />

      {/* Deployment & GitHub Guide Modal */}
      <DeploymentGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
