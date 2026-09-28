import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Mail,
  Phone,
  User,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
  IndianRupee,
  FileText,
  AlertCircle,
  ExternalLink,
  Laptop,
  Megaphone,
  Check,
  Copy,
  ChevronRight,
  History,
  Info
} from 'lucide-react';

import { ApplicationFormData, Sector } from './types';
import { IT_ROLES, MARKETING_ROLES, LEADERSHIP_CONTACTS } from './data/rolesData';
import { MediTrustLogo } from './components/MediTrustLogo';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CandidatePhotoUpload } from './components/CandidatePhotoUpload';
import { ResumeUpload } from './components/ResumeUpload';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SalaryAndCoverSection } from './components/SalaryAndCoverSection';
import { SubmissionSuccessView } from './components/SubmissionSuccessView';

const INITIAL_FORM_DATA: ApplicationFormData = {
  sector: 'IT',
  roleId: 'it-fullstack',
  roleTitle: 'Full-Stack Software Engineer',
  fullName: '',
  photoUrl: '',
  photoFileName: '',
  email: '',
  phone: '',
  alternatePhone: '',
  currentAddress: '',
  currentCity: '',
  currentCountry: 'India',
  linkedInUrl: '',
  portfolioUrl: '',
  education: {
    collegeName: '',
    degreeCompletion: '',
    specialization: '',
    completionYear: '2025',
    collegeCity: '',
    collegeCountry: 'India',
    cgpaOrPercentage: '',
  },
  resumeFile: undefined,
  coverLetter: '',
  experience: {
    experienceLevel: '1-2',
    currentCompany: '',
    currentDesignation: '',
    totalYearsExp: '',
    noticePeriod: 'Immediate Joiner (0 days)',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    projectAchievements: '',
  },
  salary: {
    currentCTC: '',
    expectedCTC: '',
    isNegotiable: true,
    workModePreference: 'Hybrid',
    availableFrom: '',
  },
};

export default function App() {
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string>('');
  const [savedSubmissions, setSavedSubmissions] = useState<ApplicationFormData[]>([]);
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Load saved submissions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('meditrust_applications');
      if (stored) {
        setSavedSubmissions(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load past applications', e);
    }
  }, []);

  // Update role choices when sector changes
  const handleSectorChange = (newSector: Sector) => {
    const defaultRole = newSector === 'IT' ? IT_ROLES[0] : MARKETING_ROLES[0];
    const defaultSkills =
      newSector === 'IT'
        ? ['React', 'TypeScript', 'Node.js', 'Tailwind CSS']
        : ['Google Ads', 'Meta Ads (Facebook & Instagram)', 'Growth Hacking', 'SEO'];

    setFormData((prev) => ({
      ...prev,
      sector: newSector,
      roleId: defaultRole.id,
      roleTitle: defaultRole.title,
      experience: {
        ...prev.experience,
        skills: defaultSkills,
      },
    }));
  };

  const handleRoleSelect = (roleId: string, roleTitle: string, sector: Sector) => {
    setFormData((prev) => ({
      ...prev,
      sector,
      roleId,
      roleTitle,
    }));

    // Smooth scroll down to application form
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-fill realistic demo candidate details for fast review
  const handleAutoFillDemo = () => {
    const isIT = formData.sector === 'IT';
    setFormData({
      sector: formData.sector,
      roleId: isIT ? 'it-fullstack' : 'mkt-growth-lead',
      roleTitle: isIT ? 'Full-Stack Software Engineer' : 'Growth & User Acquisition Specialist',
      fullName: 'Aarav Sharma',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
      photoFileName: 'aarav_sharma_profile.jpg',
      email: 'aarav.sharma.dev@gmail.com',
      phone: '9876543210',
      alternatePhone: '9822012345',
      currentAddress: 'Flat 402, Green Glen Layout, Bellandur',
      currentCity: 'Bengaluru',
      currentCountry: 'India',
      linkedInUrl: 'https://linkedin.com/in/aarav-sharma-meditrust',
      portfolioUrl: 'https://aaravsharma.dev',
      education: {
        collegeName: 'Pune Institute of Computer Technology (PICT)',
        degreeCompletion: isIT ? 'B.Tech (Bachelor of Technology)' : 'MBA (Marketing / Tech Management)',
        specialization: isIT ? 'Computer Engineering & Information Technology' : 'Growth Marketing & Brand Strategy',
        completionYear: '2024',
        collegeCity: 'Pune',
        collegeCountry: 'India',
        cgpaOrPercentage: '8.85 CGPA (First Class with Distinction)',
      },
      resumeFile: {
        name: 'Aarav_Sharma_Resume_MediTrust_2026.pdf',
        size: 1845000,
        type: 'application/pdf',
        lastModified: Date.now(),
        dataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJcTl8uXrp...',
      },
      coverLetter: isIT
        ? `Dear Soham Sali (CTO), Abhay Pratap Singh (CEO), and MediTrust Team,\n\nI am thrilled to apply for the Full-Stack Software Engineer position at MediTrust. I have built scalable microservices handling 25,000+ orders daily and high-concurrency medicine inventory systems. MediTrust’s promise of "Your Care, My Dear" with 20-minute genuine medicine fulfillment aligns deeply with my passion for health-tech impact.\n\nI look forward to collaborating directly with Soham and Abhay to architect the next chapter of MediTrust's digital health infrastructure.\n\nWarm regards,\nAarav Sharma`
        : `Dear Abhay Pratap Singh (CEO), Soham Sali (CTO), and MediTrust Team,\n\nI am excited to submit my candidacy for the Growth & User Acquisition role at MediTrust. Over the past two years, I scaled medicine delivery app installs by 180% while reducing customer acquisition cost (CAC) by 32% via high-intent search campaigns and local pharmacy referral loops.\n\nI am eager to lead MediTrust's regional patient acquisition campaigns across Tier 1 and Tier 2 cities in India.\n\nWarm regards,\nAarav Sharma`,
      experience: {
        experienceLevel: '1-2',
        currentCompany: 'HealthSync Technologies Pvt. Ltd.',
        currentDesignation: isIT ? 'Software Engineer - Platform' : 'Associate Growth Manager',
        totalYearsExp: '2.2 Years',
        noticePeriod: 'Immediate Joiner (0 days)',
        skills: isIT
          ? ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Redis']
          : ['Google Ads', 'Meta Ads (Facebook & Instagram)', 'Growth Hacking', 'SEO', 'WhatsApp Marketing'],
        projectAchievements: isIT
          ? 'Architected real-time prescription tracking pipeline that improved order fulfillment SLA by 28%. Reduced API response latency by 45%.'
          : 'Executed performance ad campaigns generating 40,000+ app downloads in 90 days. Boosted 30-day medicine re-order retention by 22%.',
      },
      salary: {
        currentCTC: '7.5 LPA',
        expectedCTC: '11.5 LPA',
        isNegotiable: true,
        workModePreference: 'Hybrid',
        availableFrom: '2026-10-15',
      },
    });

    setErrors({});
  };

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit mobile number';
    }

    if (!formData.currentCity.trim()) {
      newErrors.currentCity = 'Current city is required';
    }

    // Education validations
    if (!formData.education.collegeName.trim()) {
      newErrors.collegeName = 'Name of college / university is required';
    }
    if (!formData.education.degreeCompletion.trim()) {
      newErrors.degreeCompletion = 'Please select degree qualification (e.g. B.Tech, M.Tech)';
    }
    if (!formData.education.specialization.trim()) {
      newErrors.specialization = 'Branch / Specialization is required';
    }
    if (!formData.education.collegeCity.trim()) {
      newErrors.collegeCity = 'City of college is required';
    }
    if (!formData.education.collegeCountry.trim()) {
      newErrors.collegeCountry = 'Country of college is required';
    }
    if (!formData.education.completionYear) {
      newErrors.completionYear = 'Year of degree completion is required';
    }

    // Resume validation
    if (!formData.resumeFile) {
      newErrors.resume = 'Resume / CV file is required';
    }

    // Experience validation
    if (formData.experience.skills.length === 0) {
      newErrors.skills = 'Please select or add at least one relevant skill';
    }
    if (!formData.experience.noticePeriod) {
      newErrors.noticePeriod = 'Notice period availability is required';
    }

    // Salary validation
    if (!formData.salary.expectedCTC.trim()) {
      newErrors.expectedCTC = 'Expected CTC is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Find first error and scroll to it
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate backend submission & automated email generation
    setTimeout(() => {
      const generatedId = `MT-${formData.sector.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const submissionRecord: ApplicationFormData = {
        ...formData,
        id: generatedId,
        submittedAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem('meditrust_applications') || '[]');
        const updated = [submissionRecord, ...existing];
        localStorage.setItem('meditrust_applications', JSON.stringify(updated));
        setSavedSubmissions(updated);
      } catch (err) {
        console.error('Storage error', err);
      }

      setSubmittedId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Primary Navigation Bar */}
      <Navbar
        onFillDemo={handleAutoFillDemo}
        onOpenTracker={() => setShowSubmissionsModal(true)}
        savedApplicationsCount={savedSubmissions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If already submitted, display the full success experience */}
        {isSubmitted ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <SubmissionSuccessView
              formData={formData}
              applicationId={submittedId}
              onReset={handleReset}
            />
          </div>
        ) : (
          <>
            {/* Hero Banner with Sector Selection & MediTrust Logo Theme */}
            <HeroBanner
              selectedSector={formData.sector}
              onSelectSector={handleSectorChange}
            />

            {/* Open Roles Directory Preview */}
            <section id="role-selection" className="py-12 bg-white border-b border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Immediate Openings • 2026 Drive</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                      Available Roles in <span className="text-blue-700">{formData.sector} Sector</span>
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Click any role card below to pre-select it in your employment application form
                    </p>
                  </div>

                  {/* Sector toggle pills */}
                  <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => handleSectorChange('IT')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                        formData.sector === 'IT'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Laptop className="w-3.5 h-3.5" />
                      <span>IT Sector ({IT_ROLES.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSectorChange('Marketing')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                        formData.sector === 'Marketing'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Megaphone className="w-3.5 h-3.5" />
                      <span>Marketing Sector ({MARKETING_ROLES.length})</span>
                    </button>
                  </div>
                </div>

                {/* Role Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(formData.sector === 'IT' ? IT_ROLES : MARKETING_ROLES).map((role) => {
                    const isSelected = formData.roleId === role.id;
                    return (
                      <div
                        key={role.id}
                        onClick={() => handleRoleSelect(role.id, role.title, role.sector)}
                        className={`group relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-500/20'
                            : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {role.level}
                            </span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>Selected</span>
                              </span>
                            )}
                          </div>

                          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors font-display">
                            {role.title}
                          </h3>

                          <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                            {role.description}
                          </p>

                          {/* Skill Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {role.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                          <span>Apply for this role</span>
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Employment Application Form Section */}
            <section id="application-form" className="py-12 sm:py-16">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Form Header */}
                <div className="text-center space-y-3 mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0047BA]/10 text-[#0047BA] text-xs font-bold uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Official Candidate Application</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                    MediTrust Employment Application
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                    Please provide your complete profile, candidate photo, resume, college details, and compensation expectations below.
                  </p>

                  <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-medium">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Want to test quickly? Click "Auto-Fill Demo" at the top navbar to populate verified sample details.</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Card 1: Target Position & Sector Confirmation */}
                  <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                          Sector & Position
                        </h3>
                        <p className="text-xs text-slate-500">
                          Confirm the team and designation you wish to join
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Sector */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Company Sector <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleSectorChange('IT')}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                              formData.sector === 'IT'
                                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <Laptop className="w-4 h-4" />
                            <span>IT Sector</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSectorChange('Marketing')}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                              formData.sector === 'Marketing'
                                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <Megaphone className="w-4 h-4" />
                            <span>Marketing Sector</span>
                          </button>
                        </div>
                      </div>

                      {/* Role selection dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Applied Designation <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.roleId}
                          onChange={(e) => {
                            const found = (formData.sector === 'IT' ? IT_ROLES : MARKETING_ROLES).find(
                              (r) => r.id === e.target.value
                            );
                            if (found) {
                              setFormData((prev) => ({
                                ...prev,
                                roleId: found.id,
                                roleTitle: found.title,
                              }));
                            }
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                        >
                          {(formData.sector === 'IT' ? IT_ROLES : MARKETING_ROLES).map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.title} ({role.level})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Full Name, Photo Upload & Contact Information */}
                  <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                          Candidate Identity & Contact Information
                        </h3>
                        <p className="text-xs text-slate-500">
                          Full name, candidate photo, phone number, email, and social links
                        </p>
                      </div>
                    </div>

                    {/* Candidate Photo Upload */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-2">
                        Candidate Photograph (His / Her Photo) <span className="text-slate-400 font-normal">(Required for candidate badge)</span>
                      </label>
                      <CandidatePhotoUpload
                        photoUrl={formData.photoUrl}
                        onPhotoChange={(url, name) => {
                          setFormData((prev) => ({
                            ...prev,
                            photoUrl: url,
                            photoFileName: name,
                          }));
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                      {/* Full Name */}
                      <div className="space-y-1.5" id="fullName">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <span>Full Name</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                          placeholder="e.g. Rahul Sharma"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                            errors.fullName
                              ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                              : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5" id="email">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>Email Address</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="e.g. rahul.sharma@example.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                            errors.email
                              ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                              : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                          }`}
                        />
                        <p className="text-[11px] text-slate-400">
                          Automated confirmation email will be delivered to this address.
                        </p>
                        {errors.email && (
                          <p className="text-xs text-red-500 font-medium">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1.5" id="phone">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>Contact Phone Number</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                            +91
                          </span>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder="9876543210"
                            className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-sm font-mono transition-all focus:outline-hidden focus:ring-2 ${
                              errors.phone
                                ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                                : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-red-500 font-medium">{errors.phone}</p>
                        )}
                      </div>

                      {/* Alternate Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>Alternate Phone</span>
                          <span className="text-slate-400 text-[11px]">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.alternatePhone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, alternatePhone: e.target.value }))}
                          placeholder="e.g. 9822012345"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                        />
                      </div>

                      {/* Current City */}
                      <div className="space-y-1.5" id="currentCity">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>Current City of Residence</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.currentCity}
                          onChange={(e) => setFormData((prev) => ({ ...prev, currentCity: e.target.value }))}
                          placeholder="e.g. Pune, Mumbai, Bangalore, Noida"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                            errors.currentCity
                              ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                              : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20'
                          }`}
                        />
                        {errors.currentCity && (
                          <p className="text-xs text-red-500 font-medium">{errors.currentCity}</p>
                        )}
                      </div>

                      {/* LinkedIn Profile */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <span>LinkedIn URL / Portfolio</span>
                          <span className="text-slate-400 text-[11px]">(Recommended)</span>
                        </label>
                        <input
                          type="url"
                          value={formData.linkedInUrl}
                          onChange={(e) => setFormData((prev) => ({ ...prev, linkedInUrl: e.target.value }))}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: College, Degree Completion (BTech/MTech etc), City & Country of College */}
                  <div id="collegeName">
                    <EducationSection
                      education={formData.education}
                      onChange={(field, value) => {
                        setFormData((prev) => ({
                          ...prev,
                          education: {
                            ...prev.education,
                            [field]: value,
                          },
                        }));
                      }}
                      errors={{
                        collegeName: errors.collegeName,
                        degreeCompletion: errors.degreeCompletion,
                        specialization: errors.specialization,
                        collegeCity: errors.collegeCity,
                        collegeCountry: errors.collegeCountry,
                        completionYear: errors.completionYear,
                      }}
                    />
                  </div>

                  {/* Card 4: Resume Upload */}
                  <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4" id="resume">
                    <ResumeUpload
                      resumeFile={formData.resumeFile}
                      onResumeChange={(file) => {
                        setFormData((prev) => ({ ...prev, resumeFile: file }));
                      }}
                      error={errors.resume}
                    />
                  </div>

                  {/* Card 5: Relevant Professional Experience */}
                  <div id="skills">
                    <ExperienceSection
                      experience={formData.experience}
                      sector={formData.sector}
                      onChange={(field, val) => {
                        setFormData((prev) => ({
                          ...prev,
                          experience: {
                            ...prev.experience,
                            [field]: val,
                          },
                        }));
                      }}
                      errors={{
                        skills: errors.skills,
                        noticePeriod: errors.noticePeriod,
                      }}
                    />
                  </div>

                  {/* Card 6: Cover Letter & Salary Expectations */}
                  <div id="expectedCTC">
                    <SalaryAndCoverSection
                      salary={formData.salary}
                      coverLetter={formData.coverLetter}
                      sector={formData.sector}
                      roleTitle={formData.roleTitle}
                      onSalaryChange={(field, val) => {
                        setFormData((prev) => ({
                          ...prev,
                          salary: {
                            ...prev.salary,
                            [field]: val,
                          },
                        }));
                      }}
                      onCoverLetterChange={(val) => {
                        setFormData((prev) => ({ ...prev, coverLetter: val }));
                      }}
                      errors={{
                        expectedCTC: errors.expectedCTC,
                      }}
                    />
                  </div>

                  {/* Form Submission Bar */}
                  <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-500/30 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold font-display text-white">
                          Ready to Submit Your Application?
                        </h4>
                        <p className="text-xs text-blue-200 max-w-lg mt-0.5">
                          Upon submission, an automated confirmation email will be delivered to your inbox, and your details will be queued for review by CTO Soham Sali and CEO Abhay Pratap Singh.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#4ade80] hover:bg-[#3bf589] text-slate-950 font-extrabold text-base shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            <span>Processing Submission...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Employment Application</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>

                    {Object.keys(errors).length > 0 && (
                      <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>Please fix the highlighted fields above before submitting.</span>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </section>
          </>
        )}

        {/* Official Leadership & Contact Section (Always visible for transparency) */}
        <section id="leadership" className="py-16 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#4ade80]">
                MediTrust Executive Directory
              </span>
              <h2 className="text-3xl font-extrabold text-white font-display">
                Founder & Executive Contacts
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Direct contact details for employment queries, interviews, and corporate partnerships
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Soham Sali */}
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-4 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                    Technical Leadership
                  </span>
                  <span className="text-xs text-slate-400">Pune / Bengaluru</span>
                </div>

                <div>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wide">
                    Founder & CTO
                  </div>
                  <div className="text-2xl font-black text-white font-display">
                    Soham Sali
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-slate-700/60 font-mono text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                    <span>Contact number: <strong>9028138196</strong></span>
                    <a href="tel:9028138196" className="text-blue-400 hover:underline">
                      Call
                    </a>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                    <span className="truncate mr-2">Email: <strong>sohamsali11346@gmail.com</strong></span>
                    <a href="mailto:sohamsali11346@gmail.com" className="text-blue-400 hover:underline shrink-0">
                      Mail
                    </a>
                  </div>
                </div>
              </div>

              {/* Abhay Pratap Singh */}
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-4 hover:border-teal-500 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold">
                    Executive Leadership
                  </span>
                  <span className="text-xs text-slate-400">Delhi / Mumbai</span>
                </div>

                <div>
                  <div className="text-xs font-bold text-teal-400 uppercase tracking-wide">
                    Co founder & CEO.
                  </div>
                  <div className="text-2xl font-black text-white font-display">
                    Abhay Pratap Singh
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-slate-700/60 font-mono text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                    <span>Contact number : <strong>6395864684</strong></span>
                    <a href="tel:6395864684" className="text-teal-400 hover:underline">
                      Call
                    </a>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                    <span className="truncate mr-2">Email: <strong>abhaypratap9814@gamil.com</strong></span>
                    <a href="mailto:abhaypratap9814@gamil.com" className="text-teal-400 hover:underline shrink-0">
                      Mail
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Note banner */}
            <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-blue-950/60 border border-blue-800/60 text-center text-xs text-blue-200">
              <span className="font-semibold text-white">Notice for Candidates:</span> please wait for the further update.further updates will be provided on your email & please keep checking your email.
            </div>
          </div>
        </section>
      </main>

      {/* Footer matching exact MediTrust brand identity */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <MediTrustLogo size="sm" whiteVariant showTagline />

          <div className="text-xs text-slate-400 text-center md:text-right space-y-1">
            <p>© {new Date().getFullYear()} MediTrust Healthcare Technologies Pvt. Ltd. All rights reserved.</p>
            <p className="text-slate-500">
              Online Medicine Ordering | Local Pharmacy Network | Fast & Reliable Delivery
            </p>
          </div>
        </div>
      </footer>

      {/* My Submissions Drawer / Modal */}
      {showSubmissionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <History className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-slate-900 text-base">
                  Submitted Applications ({savedSubmissions.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmissionsModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {savedSubmissions.length === 0 ? (
                <div className="text-center py-10 text-slate-400 space-y-2">
                  <FileText className="w-10 h-10 mx-auto opacity-40" />
                  <p className="text-sm font-medium text-slate-600">No applications recorded yet</p>
                  <p className="text-xs text-slate-400">Complete the form to submit your first employment profile.</p>
                </div>
              ) : (
                savedSubmissions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-700">
                        #{item.id || `APP-${idx + 1}`}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Submitted
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.photoUrl && (
                        <img src={item.photoUrl} alt="" className="w-9 h-9 rounded-full object-cover border" />
                      )}
                      <div>
                        <div className="text-sm font-bold text-slate-900">{item.fullName}</div>
                        <div className="text-xs text-slate-500">
                          {item.roleTitle} • {item.sector} Sector
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/80 flex items-center justify-between">
                      <span>{item.email}</span>
                      <span>College: {item.education.degreeCompletion}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => setShowSubmissionsModal(false)}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
