import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Github, Terminal, Cloud, Shield } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'vercel' | 'github' | 'netlify'>('vercel');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitExportCommands = `# 1. Initialize git and commit local files
git init
git add .
git commit -m "feat: complete NovaEdge production website"

# 2. Add your GitHub remote repository
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/novaedge.git

# 3. Push to GitHub
git push -u origin main`;

  const buildCommand = `# Test production build locally
npm run build

# Preview static output
npx vite preview`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="deployment-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 id="deployment-modal-title" className="text-lg font-bold text-white">
                Export to GitHub &amp; Free Hosting Guide
              </h3>
              <p className="text-xs text-slate-400">
                100% static React + Vite build. Zero paid services or credit card needed.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close guide modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-sm text-slate-300">
          {/* Step 1: Export to GitHub */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-semibold">
              <Github className="w-4 h-4" />
              <span>Step 1: Push Code to GitHub</span>
            </div>
            <p className="text-xs text-slate-400">
              Run these standard commands in your local terminal or IDE shell to push to your repository:
            </p>
            <div className="relative group">
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre">
                {gitExportCommands}
              </pre>
              <button
                onClick={() => copyCode(gitExportCommands, 1)}
                className="absolute top-3 right-3 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Step 2: Zero-Cost Hosting Platform Selection */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                Step 2: Choose Free Hosting Provider
              </span>
              <div className="flex gap-1">
                {(['vercel', 'github', 'netlify'] as const).map((prov) => (
                  <button
                    key={prov}
                    onClick={() => setActiveTab(prov)}
                    className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                      activeTab === prov
                        ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {prov === 'github' ? 'GitHub Pages' : prov}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Instructions */}
            {activeTab === 'vercel' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <p className="font-semibold text-white">Deploy on Vercel (Recommended · 60 seconds):</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                  <li>Go to <strong className="text-slate-200">vercel.com</strong> and click "Add New Project".</li>
                  <li>Import your pushed GitHub repository (<strong className="text-slate-200">novaedge</strong>).</li>
                  <li>Vercel automatically detects <strong className="text-cyan-400">Vite</strong> build settings (<code className="text-slate-300">npm run build</code>, output directory <code className="text-slate-300">dist</code>).</li>
                  <li>Click <strong className="text-white">Deploy</strong>. Your free global edge URL is live immediately with automatic SSL.</li>
                </ol>
              </div>
            )}

            {activeTab === 'github' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <p className="font-semibold text-white">Deploy on GitHub Pages (Built-in Free):</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                  <li>In your GitHub repo, go to <strong className="text-slate-200">Settings → Pages</strong>.</li>
                  <li>Under "Build and deployment", choose <strong className="text-cyan-400">GitHub Actions</strong>.</li>
                  <li>Select the official <strong className="text-white">Static HTML / Vite</strong> template.</li>
                  <li>Commit the workflow. GitHub builds and publishes to <code className="text-slate-300">https://yourusername.github.io/novaedge/</code> automatically.</li>
                </ol>
              </div>
            )}

            {activeTab === 'netlify' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <p className="font-semibold text-white">Deploy on Netlify (Drag &amp; Drop or Git):</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                  <li>Run <code className="text-slate-300">npm run build</code> locally to produce the <code className="text-slate-300">dist/</code> folder.</li>
                  <li>Log in to <strong className="text-slate-200">netlify.com</strong>.</li>
                  <li>Drag and drop the <strong className="text-cyan-400">dist</strong> directory directly into Netlify's dropzone, or connect your GitHub repository.</li>
                  <li>Your website is immediately published with free CDN, SSL, and custom domain support.</li>
                </ol>
              </div>
            )}
          </div>

          {/* Step 3: Local Verification */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-semibold">
              <Terminal className="w-4 h-4" />
              <span>Step 3: Test Production Build Locally</span>
            </div>
            <div className="relative group">
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre">
                {buildCommand}
              </pre>
              <button
                onClick={() => copyCode(buildCommand, 2)}
                className="absolute top-3 right-3 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Zero proprietary lock-in. 100% standard open-source stack.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
          >
            Got it, return to site
          </button>
        </div>
      </div>
    </div>
  );
};
