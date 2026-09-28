import React, { useState } from 'react';
import {
  X,
  Mail,
  CheckCircle2,
  Calendar,
  Clock,
  Printer,
  Copy,
  Check,
  Send,
  ExternalLink,
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';
import { ApplicationFormData } from '../types';
import { MediTrustLogo } from './MediTrustLogo';

interface ConfirmationEmailModalProps {
  formData: ApplicationFormData;
  applicationId: string;
  onClose: () => void;
}

export const ConfirmationEmailModal: React.FC<ConfirmationEmailModalProps> = ({
  formData,
  applicationId,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [resending, setResending] = useState(false);
  const [resentSuccess, setResentSuccess] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCopyEmailBody = () => {
    const text = `
SUBJECT: Application Confirmed: MediTrust Employment Drive 2026 - ${formData.roleTitle} (Ref: ${applicationId})
FROM: MediTrust Careers <careers@meditrust.in>
TO: ${formData.email}

Dear ${formData.fullName},

Thank you for applying for employment at MediTrust (Online Medicine Platform) for the role of ${formData.roleTitle} in the ${formData.sector} sector.

We have successfully received your full profile, photo, resume, academic qualifications (${formData.education.degreeCompletion} from ${formData.education.collegeName}, ${formData.education.collegeCity}, ${formData.education.collegeCountry}), experience history, and salary expectations.

PLEASE NOTE:
please wait for the further update.further updates will be provided on your email & please keep checking your email.

For any immediate inquiries, our founding leadership is directly accessible:

Founder & CTO : Soham Sali 
Contact number: 9028138196
Email: sohamsali11346@gmail.com 

Co founder & CEO.: Abhay Pratap Singh 
Contact number : 6395864684
Email: abhaypratap9814@gamil.com for further inquiries.

Warm regards,
MediTrust Talent Acquisition Team
"Your Care, My Dear"
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResentSuccess(true);
      setTimeout(() => setResentSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Email Client Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <span>Automated Confirmation Email</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/30 text-emerald-300 font-mono">
                  Delivered
                </span>
              </div>
              <div className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                To: {formData.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              title="Resend email"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Send className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
              <span>{resending ? 'Sending...' : 'Resend'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {resentSuccess && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 text-center font-medium flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Automated confirmation email resent successfully to {formData.email}!</span>
          </div>
        )}

        {/* Email Metadata Details */}
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 text-xs space-y-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-bold text-slate-800 text-sm">
              Application Confirmed: MediTrust Employment Drive 2026 - {formData.roleTitle}
            </span>
            <span className="text-[11px] text-slate-500 font-mono shrink-0">
              {currentTime}
            </span>
          </div>
          <div className="text-slate-600 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px]">
            <span><strong>From:</strong> MediTrust Careers &lt;careers@meditrust.in&gt;</span>
            <span><strong>Reply-To:</strong> sohamsali11346@gmail.com</span>
            <span><strong>Application ID:</strong> #{applicationId}</span>
          </div>
        </div>

        {/* Email Body Preview (HTML rendered) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-slate-800 text-sm leading-relaxed bg-white">
          {/* Email MediTrust Header Branding */}
          <div className="rounded-2xl p-5 bg-gradient-to-r from-[#003da5] via-[#0047BA] to-[#002773] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <MediTrustLogo size="sm" whiteVariant showTagline />
            </div>
            <div className="text-xs text-blue-100 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Reference: <span className="font-mono font-bold text-white">{applicationId}</span>
            </div>
          </div>

          {/* Salutation & Body */}
          <div className="space-y-3">
            <p className="font-medium text-slate-900">
              Dear <strong className="font-bold">{formData.fullName}</strong>,
            </p>
            <p className="text-slate-600">
              Thank you for submitting your employment application to <strong>MediTrust</strong>—India’s trusted online platform to provide medicine and healthcare logistics.
            </p>
            <p className="text-slate-600">
              We are pleased to confirm that your application for the position of{' '}
              <strong className="text-blue-900 font-bold">{formData.roleTitle}</strong> ({formData.sector} Sector) has been successfully registered and assigned to our hiring evaluation panel.
            </p>
          </div>

          {/* Snapshot of application data */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
            <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px] flex items-center justify-between">
              <span>Application Snapshot</span>
              <span className="text-emerald-700 font-semibold">Verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 block">Candidate Name:</span>
                <span className="font-semibold text-slate-900">{formData.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Registered Email & Phone:</span>
                <span className="font-semibold text-slate-900">{formData.email} • {formData.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">College / University:</span>
                <span className="font-semibold text-slate-900">
                  {formData.education.collegeName} ({formData.education.collegeCity}, {formData.education.collegeCountry})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Degree Completion:</span>
                <span className="font-semibold text-slate-900">
                  {formData.education.degreeCompletion} ({formData.education.completionYear || 'Completed'})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Target Sector & Notice Period:</span>
                <span className="font-semibold text-slate-900">
                  {formData.sector} Sector • {formData.experience.noticePeriod}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Expected CTC:</span>
                <span className="font-semibold text-emerald-700">
                  ₹ {formData.salary.expectedCTC}
                </span>
              </div>
            </div>

            {formData.resumeFile && (
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-600">Attached Resume: <strong>{formData.resumeFile.name}</strong></span>
                <span className="text-emerald-700 font-semibold">✓ Uploaded</span>
              </div>
            )}
          </div>

          {/* User's Exact Highlight Note Requirement */}
          <div className="rounded-2xl p-4.5 bg-blue-50 border-2 border-blue-300 text-blue-950 space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Important Application Notice:</span>
            </div>
            <p className="text-sm font-bold text-blue-900 leading-relaxed">
              please wait for the further update.further updates will be provided on your email & please keep checking your email.
            </p>
          </div>

          {/* Leadership Contact Card in Email */}
          <div className="rounded-2xl p-4.5 bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Direct Contact Information for Inquiries:
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-blue-900">Founder & CTO :Soham Sali</div>
                <div className="text-slate-600">Contact number: <strong className="font-mono text-slate-900">9028138196</strong></div>
                <div className="text-slate-600">Email: <strong className="text-slate-900">sohamsali11346@gmail.com</strong></div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-teal-900">Co founder & CEO.:Abhay Pratap Singh</div>
                <div className="text-slate-600">Contact number : <strong className="font-mono text-slate-900">6395864684</strong></div>
                <div className="text-slate-600">Email: <strong className="text-slate-900">abhaypratap9814@gamil.com</strong> for further inquiries.</div>
              </div>
            </div>
          </div>

          {/* Email Sign-off */}
          <div className="text-xs text-slate-500 pt-2 space-y-1 border-t border-slate-100">
            <p>Best Regards,</p>
            <p className="font-bold text-slate-800">MediTrust Talent Acquisition & Human Resources</p>
            <p className="italic text-slate-500">"Your Care, My Dear" • Delivering Genuine Medicines Faster</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyEmailBody}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Email Text'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
