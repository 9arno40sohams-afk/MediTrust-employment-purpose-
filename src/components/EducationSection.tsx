import React from 'react';
import { GraduationCap, Building2, MapPin, Globe, Award, Calendar } from 'lucide-react';
import { EducationDetails } from '../types';
import { DEGREE_OPTIONS } from '../data/rolesData';

interface EducationSectionProps {
  education: EducationDetails;
  onChange: (field: keyof EducationDetails, value: string) => void;
  errors?: Partial<Record<keyof EducationDetails, string>>;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  onChange,
  errors = {},
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => String(currentYear + 1 - i));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
            College & Academic Background
          </h3>
          <p className="text-xs text-slate-500">
            Details of your university, degree qualification, and location
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name of College */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Name of College / University / Institute</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={education.collegeName}
            onChange={(e) => onChange('collegeName', e.target.value)}
            placeholder="e.g. Pune Institute of Computer Technology (PICT) / BITS Pilani"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
              errors.collegeName
                ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          />
          {errors.collegeName && (
            <p className="text-xs text-red-500 font-medium">{errors.collegeName}</p>
          )}
        </div>

        {/* Degree Completion like BTech MTech */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-400" />
            <span>Degree Completion / Qualification</span>
            <span className="text-red-500">*</span>
          </label>
          <select
            value={education.degreeCompletion}
            onChange={(e) => onChange('degreeCompletion', e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition-all focus:outline-hidden focus:ring-2 ${
              errors.degreeCompletion
                ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          >
            <option value="">Select Degree (e.g. B.Tech, M.Tech...)</option>
            {DEGREE_OPTIONS.map((deg) => (
              <option key={deg} value={deg}>
                {deg}
              </option>
            ))}
          </select>
          {errors.degreeCompletion && (
            <p className="text-xs text-red-500 font-medium">{errors.degreeCompletion}</p>
          )}
        </div>

        {/* Specialization / Branch */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <span>Branch / Specialization</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={education.specialization}
            onChange={(e) => onChange('specialization', e.target.value)}
            placeholder="e.g. Computer Engineering, IT, Marketing, Data Science"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
              errors.specialization
                ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          />
          {errors.specialization && (
            <p className="text-xs text-red-500 font-medium">{errors.specialization}</p>
          )}
        </div>

        {/* City of College */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>City of College</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={education.collegeCity}
            onChange={(e) => onChange('collegeCity', e.target.value)}
            placeholder="e.g. Pune, Mumbai, Bangalore, Delhi, Hyderabad"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
              errors.collegeCity
                ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          />
          {errors.collegeCity && (
            <p className="text-xs text-red-500 font-medium">{errors.collegeCity}</p>
          )}
        </div>

        {/* Country of College */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Country of College</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={education.collegeCountry}
            onChange={(e) => onChange('collegeCountry', e.target.value)}
            placeholder="e.g. India"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
              errors.collegeCountry
                ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          />
          {errors.collegeCountry && (
            <p className="text-xs text-red-500 font-medium">{errors.collegeCountry}</p>
          )}
        </div>

        {/* Year of Completion */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Year of Degree Completion</span>
            <span className="text-red-500">*</span>
          </label>
          <select
            value={education.completionYear}
            onChange={(e) => onChange('completionYear', e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition-all focus:outline-hidden focus:ring-2 ${
              errors.completionYear
                ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          >
            <option value="">Select Passing Year</option>
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr} {yr === String(currentYear) ? '(Current Year)' : ''}
              </option>
            ))}
          </select>
          {errors.completionYear && (
            <p className="text-xs text-red-500 font-medium">{errors.completionYear}</p>
          )}
        </div>

        {/* CGPA / Percentage */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <span>CGPA / Aggregate Percentage</span>
            <span className="text-slate-400 text-[11px]">(Optional)</span>
          </label>
          <input
            type="text"
            value={education.cgpaOrPercentage}
            onChange={(e) => onChange('cgpaOrPercentage', e.target.value)}
            placeholder="e.g. 8.6 CGPA or 82%"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>
    </div>
  );
};
