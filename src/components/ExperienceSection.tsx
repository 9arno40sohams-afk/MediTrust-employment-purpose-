import React, { useState } from 'react';
import { Briefcase, Plus, X, Sparkles, Building, Clock, Layers } from 'lucide-react';
import { ExperienceDetails, Sector } from '../types';
import { NOTICE_PERIOD_OPTIONS, IT_SKILLS_LIST, MARKETING_SKILLS_LIST } from '../data/rolesData';

interface ExperienceSectionProps {
  experience: ExperienceDetails;
  sector: Sector;
  onChange: (field: keyof ExperienceDetails, value: any) => void;
  errors?: Partial<Record<keyof ExperienceDetails, string>>;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  sector,
  onChange,
  errors = {},
}) => {
  const [customSkillInput, setCustomSkillInput] = useState('');

  const suggestedSkills = sector === 'IT' ? IT_SKILLS_LIST : MARKETING_SKILLS_LIST;

  const handleToggleSkill = (skill: string) => {
    if (experience.skills.includes(skill)) {
      onChange(
        'skills',
        experience.skills.filter((s) => s !== skill)
      );
    } else {
      onChange('skills', [...experience.skills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (trimmed && !experience.skills.includes(trimmed)) {
      onChange('skills', [...experience.skills, trimmed]);
      setCustomSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(
      'skills',
      experience.skills.filter((s) => s !== skillToRemove)
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
            Relevant Professional Experience
          </h3>
          <p className="text-xs text-slate-500">
            Work history, projects, notice period, and core domain skills
          </p>
        </div>
      </div>

      {/* Experience Level Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 block">
          Total Experience Bracket <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'fresher', label: 'Fresher / 0 Yrs', sub: 'New Graduate' },
            { id: '1-2', label: '1 - 2 Years', sub: 'Junior / Associate' },
            { id: '3-5', label: '3 - 5 Years', sub: 'Mid-Level Professional' },
            { id: '5+', label: '5+ Years', sub: 'Senior / Lead' },
          ].map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => onChange('experienceLevel', level.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                experience.experienceLevel === level.id
                  ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 text-emerald-950 font-semibold'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="text-xs sm:text-sm font-semibold">{level.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{level.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Current / Previous Organization & Designation */}
      {experience.experienceLevel !== 'fresher' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Current / Most Recent Company</span>
            </label>
            <input
              type="text"
              value={experience.currentCompany}
              onChange={(e) => onChange('currentCompany', e.target.value)}
              placeholder="e.g. Tata 1mg, Apollo 247, Swiggy, Infosys"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span>Current / Previous Designation</span>
            </label>
            <input
              type="text"
              value={experience.currentDesignation}
              onChange={(e) => onChange('currentDesignation', e.target.value)}
              placeholder="e.g. Software Engineer / Marketing Lead"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Exact Total Years</span>
            </label>
            <input
              type="text"
              value={experience.totalYearsExp}
              onChange={(e) => onChange('totalYearsExp', e.target.value)}
              placeholder="e.g. 2.5 years"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>
      )}

      {/* Notice Period */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Notice Period / Availability to Join</span>
          <span className="text-red-500">*</span>
        </label>
        <select
          value={experience.noticePeriod}
          onChange={(e) => onChange('noticePeriod', e.target.value)}
          className={`w-full sm:w-80 px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 ${
            errors.noticePeriod
              ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
              : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20'
          }`}
        >
          <option value="">Select Notice Period</option>
          {NOTICE_PERIOD_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.noticePeriod && (
          <p className="text-xs text-red-500 font-medium">{errors.noticePeriod}</p>
        )}
      </div>

      {/* Skills Selector */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Key Skills & Proficiencies</span>
            <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-slate-400">
            Selected: {experience.skills.length}
          </span>
        </div>

        {/* Selected skills tag cloud */}
        <div className="flex flex-wrap gap-2 min-h-9 p-2 rounded-xl bg-slate-50 border border-slate-200">
          {experience.skills.length === 0 ? (
            <span className="text-xs text-slate-400 italic py-1 px-2">
              Select from suggested tags below or add your custom skills
            </span>
          ) : (
            experience.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-medium shadow-2xs"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:bg-emerald-700 rounded p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Custom skill add input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customSkillInput}
            onChange={(e) => setCustomSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomSkill(e);
              }
            }}
            placeholder="Type other skill and press enter (e.g. Next.js, Redis, Meta Ads)..."
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={handleAddCustomSkill}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {/* Suggested Quick Toggle Tags */}
        <div className="space-y-1 pt-1">
          <span className="text-[11px] font-medium text-slate-500 block">
            Suggested for {sector} Sector:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedSkills.map((skill) => {
              const isSelected = experience.skills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleToggleSkill(skill)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                </button>
              );
            })}
          </div>
        </div>

        {errors.skills && (
          <p className="text-xs text-red-500 font-medium">{errors.skills}</p>
        )}
      </div>

      {/* Projects & Achievements */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
          <span>Notable Projects / Key Achievements</span>
          <span className="text-slate-400 text-[11px]">Optional but recommended</span>
        </label>
        <textarea
          rows={3}
          value={experience.projectAchievements}
          onChange={(e) => onChange('projectAchievements', e.target.value)}
          placeholder={
            sector === 'IT'
              ? 'e.g. Developed high-throughput medicine inventory API processing 10,000 requests/sec with 99.98% uptime. Scaled automated prescription parsing.'
              : 'e.g. Scaled paid acquisition to 25,000 app installs per month while cutting customer acquisition cost (CAC) by 34% through targeted creative tests.'
          }
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>
    </div>
  );
};
