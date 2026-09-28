import React from 'react';
import { IndianRupee, FileText, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { SalaryExpectations, Sector } from '../types';

interface SalaryAndCoverSectionProps {
  salary: SalaryExpectations;
  coverLetter: string;
  sector: Sector;
  roleTitle: string;
  onSalaryChange: (field: keyof SalaryExpectations, value: any) => void;
  onCoverLetterChange: (val: string) => void;
  errors?: {
    expectedCTC?: string;
    coverLetter?: string;
  };
}

export const SalaryAndCoverSection: React.FC<SalaryAndCoverSectionProps> = ({
  salary,
  coverLetter,
  sector,
  roleTitle,
  onSalaryChange,
  onCoverLetterChange,
  errors = {},
}) => {
  const handleLoadTemplate = () => {
    if (sector === 'IT') {
      onCoverLetterChange(
        `Dear Soham Sali (CTO), Abhay Pratap Singh (CEO), and MediTrust Team,\n\nI am writing to express my strong enthusiasm for the ${roleTitle || 'IT Engineering'} role at MediTrust. As an engineer deeply passionate about healthcare accessibility, I admire MediTrust's mission to deliver verified medicines reliably across India.\n\nIn my previous projects, I have focused on high-performance architectures, clean UI/UX, and reliable backend services with resilient error handling. Working at MediTrust represents an opportunity to leverage technology to solve critical real-world healthcare logistics and deliver life-saving medicines on time.\n\nI look forward to discussing how my skills and problem-solving mindset can contribute to MediTrust's rapid scale.\n\nSincerely,\nCandidate`
      );
    } else {
      onCoverLetterChange(
        `Dear Abhay Pratap Singh (CEO), Soham Sali (CTO), and MediTrust Team,\n\nI am thrilled to apply for the ${roleTitle || 'Marketing'} role at MediTrust. The online pharmacy and healthcare sector demands authentic trust, patient-first communication, and agile user acquisition—areas where I have demonstrated measurable results.\n\nThroughout my work, I have focused on scaling customer acquisition, lowering blended CAC, optimizing conversion funnels, and building long-term healthcare retention through data-driven campaigns.\n\nI am eager to contribute to making MediTrust the #1 household healthcare name for medicine delivery across Tier 1, 2, and 3 cities in India.\n\nSincerely,\nCandidate`
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Cover Letter Box */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Cover Letter & Statement of Purpose
              </h3>
              <p className="text-xs text-slate-500">
                Tell us why you are excited to join the MediTrust medicine mission
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLoadTemplate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Load Role Template</span>
          </button>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
            <span>Your Pitch / Motivation Letter</span>
            <span className="text-slate-400 text-[11px]">
              {coverLetter.length} characters
            </span>
          </label>
          <textarea
            rows={5}
            value={coverLetter}
            onChange={(e) => onCoverLetterChange(e.target.value)}
            placeholder="Introduce your background, key strengths, and why you want to work at MediTrust..."
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm leading-relaxed transition-all focus:outline-hidden focus:ring-2 ${
              errors.coverLetter
                ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          />
          {errors.coverLetter && (
            <p className="text-xs text-red-500 font-medium">{errors.coverLetter}</p>
          )}
        </div>
      </div>

      {/* Salary Expectations Box */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Salary Expectations & Work Preferences
            </h3>
            <p className="text-xs text-slate-500">
              Compensation benchmarks, flexibility, and preferred work location
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Current CTC */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <span>Current Annual CTC</span>
              <span className="text-slate-400 text-[11px]">(LPA or N/A for freshers)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                ₹
              </span>
              <input
                type="text"
                value={salary.currentCTC}
                onChange={(e) => onSalaryChange('currentCTC', e.target.value)}
                placeholder="e.g. 6.5 LPA (or Fresher)"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Expected CTC */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <span>Expected Annual CTC</span>
              <span className="text-red-500">*</span>
              <span className="text-slate-400 text-[11px]">(in LPA)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                ₹
              </span>
              <input
                type="text"
                value={salary.expectedCTC}
                onChange={(e) => onSalaryChange('expectedCTC', e.target.value)}
                placeholder="e.g. 10.0 LPA or As per industry standards"
                className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                  errors.expectedCTC
                    ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                    : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20'
                }`}
              />
            </div>
            {errors.expectedCTC && (
              <p className="text-xs text-red-500 font-medium">{errors.expectedCTC}</p>
            )}
          </div>
        </div>

        {/* Work Mode & Negotiation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Work Mode */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Preferred Work Setup
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Hybrid', 'Remote', 'On-site'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onSalaryChange('workModePreference', mode)}
                  className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all ${
                    salary.workModePreference === mode
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Earliest Start Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Earliest Available Joining Date
            </label>
            <input
              type="date"
              value={salary.availableFrom}
              onChange={(e) => onSalaryChange('availableFrom', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Negotiation Checkbox */}
        <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors">
          <input
            type="checkbox"
            checked={salary.isNegotiable}
            onChange={(e) => onSalaryChange('isNegotiable', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
          />
          <div className="text-xs">
            <span className="font-semibold text-slate-800">
              Open to negotiation based on role scope, equity / ESOPs, and benefits
            </span>
            <p className="text-slate-500 mt-0.5">
              MediTrust offers competitive industry salaries, comprehensive family health insurance, and performance bonuses.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};
