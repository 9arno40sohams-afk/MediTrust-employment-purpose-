import React from 'react';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { MediTrustLogo } from './MediTrustLogo';

interface NavbarProps {
  onFillDemo: () => void;
  onOpenTracker: () => void;
  savedApplicationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onFillDemo,
  onOpenTracker,
  savedApplicationsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element Brand mark */}
        <a href="#" className="flex items-center gap-2 group">
          <MediTrustLogo size="md" />
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#role-selection"
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Open Sectors
          </a>
          <a
            href="#application-form"
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Application Form
          </a>
          <a
            href="#culture"
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Why MediTrust
          </a>
          <a
            href="#leadership"
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Leadership
          </a>
          <a
            href="#process"
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Interview Stages
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Auto-fill Helper */}
          <button
            type="button"
            onClick={onFillDemo}
            title="Auto-fill verified candidate sample details for fast testing"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Auto-Fill Demo</span>
          </button>

          {/* Submissions Tracker button */}
          <button
            type="button"
            onClick={onOpenTracker}
            className="relative inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>My Submissions</span>
            {savedApplicationsCount > 0 && (
              <span className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                {savedApplicationsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
