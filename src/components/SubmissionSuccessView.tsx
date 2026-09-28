import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Mail,
  Phone,
  MessageSquare,
  Copy,
  ExternalLink,
  Clock,
  Calendar,
  Sparkles,
  Download,
  Share2,
  Printer,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Building2,
  Check,
  Inbox,
  AlertCircle
} from 'lucide-react';
import { ApplicationFormData } from '../types';
import { MediTrustLogo } from './MediTrustLogo';
import { ConfirmationEmailModal } from './ConfirmationEmailModal';

interface SubmissionSuccessViewProps {
  formData: ApplicationFormData;
  onReset: () => void;
  applicationId: string;
}

export const SubmissionSuccessView: React.FC<SubmissionSuccessViewProps> = ({
  formData,
  onReset,
  applicationId,
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(true); // Pop up confirmation email preview
  const [emailSentTimestamp] = useState<string>(
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  );

  useEffect(() => {
    // Fire celebratory confetti matching MediTrust brand colors: Royal Blue, Vibrant Lime Green, Cyan
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#0046be', '#4ade80', '#06b6d4', '#60a5fa', '#22c55e', '#ffffff'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-16">
      {/* Top Banner: Registration successfully submitted */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#003494] via-[#004dc7] to-[#002773] text-white p-6 sm:p-8 shadow-xl border border-blue-400/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* MediTrust Official Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-ping" />
            <span>MediTrust Online Medicine Platform • Official Careers</span>
          </div>

          {/* Huge Animated Success Icon */}
          <div className="relative w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg text-[#004dc7] ring-8 ring-white/20">
            <CheckCircle2 className="w-12 h-12 text-[#10b981]" />
          </div>

          {/* Prominent "Registration successfully submitted" button / badge */}
          <div className="pt-2">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#4ade80] text-slate-950 font-extrabold text-base sm:text-lg shadow-lg hover:bg-[#3bf589] transition-all transform hover:scale-[1.02] cursor-default"
            >
              <Check className="w-6 h-6 stroke-[3]" />
              <span>Registration successfully submitted</span>
            </button>
          </div>

          <p className="text-slate-100 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
            Thank you, <strong className="text-white font-semibold">{formData.fullName}</strong>. Your employment application for{' '}
            <strong className="text-emerald-300 font-semibold">{formData.roleTitle}</strong> ({formData.sector} Sector) has been recorded in our hiring database.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono text-blue-200">
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-white/10">
              Ref ID: <span className="text-white font-bold">{applicationId}</span>
            </span>
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-white/10">
              Submitted: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {emailSentTimestamp}
            </span>
          </div>
        </div>
      </div>

      {/* Automated Email Notification Status Alert Card */}
      <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/90 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-200 text-emerald-900">
                SENT AUTOMATICALLY
              </span>
              <span className="text-xs text-slate-500 font-medium">Just now</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mt-0.5">
              Automated Confirmation Email Dispatched
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              A comprehensive confirmation email with your registration details has been sent to{' '}
              <strong className="text-slate-900 font-semibold">{formData.email}</strong>.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowEmailModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors shrink-0"
        >
          <Inbox className="w-4 h-4" />
          <span>View Automated Confirmation Email</span>
        </button>
      </div>

      {/* Founder & CTO and Co-Founder & CEO Contact Information */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-700">
              Official MediTrust Leadership
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 font-display">
              Direct Contact Details for Inquiries
            </h3>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto font-medium">
            IT & Marketing Talent Acquisition
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Founder & CTO :Soham Sali */}
          <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-b from-blue-50/70 via-white to-white p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-400 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
                  Technology & Engineering
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Active" />
              </div>

              <div className="mt-3">
                <div className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                  Founder & CTO
                </div>
                <div className="text-2xl font-black text-slate-900 font-display mt-0.5">
                  Soham Sali
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Leading MediTrust IT, Architecture, Cloud & Engineering Team
                </div>
              </div>

              {/* Exact user requested specs */}
              <div className="mt-4 space-y-3 pt-3 border-t border-slate-200/80">
                {/* Phone */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 font-semibold uppercase">
                        Contact number
                      </div>
                      <div className="text-sm font-bold text-slate-900 font-mono">
                        9028138196
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href="tel:9028138196"
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                    >
                      Call
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('9028138196', 'soham-phone')}
                      className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                      title="Copy phone"
                    >
                      {copiedText === 'soham-phone' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 font-semibold uppercase">
                        Email
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        sohamsali11346@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href="mailto:sohamsali11346@gmail.com?subject=MediTrust Application Inquiry - Soham Sali"
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
                    >
                      Email
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('sohamsali11346@gmail.com', 'soham-email')}
                      className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                      title="Copy email"
                    >
                      {copiedText === 'soham-email' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/919028138196?text=${encodeURIComponent(
                  `Hello Soham Sir, I have submitted my job application (Ref: ${applicationId}) for the ${formData.roleTitle} role at MediTrust.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat with Soham Sali on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Co founder & CEO.:Abhay Pratap Singh */}
          <div className="rounded-2xl border-2 border-teal-200 bg-gradient-to-b from-teal-50/70 via-white to-white p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal-400 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 text-[11px] font-bold uppercase tracking-wider">
                  Operations & Marketing
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" title="Active" />
              </div>

              <div className="mt-3">
                <div className="text-xs font-bold text-teal-800 uppercase tracking-wide">
                  Co founder & CEO.
                </div>
                <div className="text-2xl font-black text-slate-900 font-display mt-0.5">
                  Abhay Pratap Singh
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Leading MediTrust Operations, Growth, Pharmacy Network & Partnerships
                </div>
              </div>

              {/* Exact user requested specs */}
              <div className="mt-4 space-y-3 pt-3 border-t border-slate-200/80">
                {/* Phone */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 font-semibold uppercase">
                        Contact number
                      </div>
                      <div className="text-sm font-bold text-slate-900 font-mono">
                        6395864684
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href="tel:6395864684"
                      className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
                    >
                      Call
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('6395864684', 'abhay-phone')}
                      className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                      title="Copy phone"
                    >
                      {copiedText === 'abhay-phone' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Email - preserved user's exact email: abhaypratap9814@gamil.com */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 font-semibold uppercase">
                        Email
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        abhaypratap9814@gamil.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href="mailto:abhaypratap9814@gamil.com?subject=MediTrust Employment Inquiry - Abhay Pratap Singh"
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
                    >
                      Email
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('abhaypratap9814@gamil.com', 'abhay-email')}
                      className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                      title="Copy email"
                    >
                      {copiedText === 'abhay-email' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/916395864684?text=${encodeURIComponent(
                  `Hello Abhay Sir, I have submitted my application (Ref: ${applicationId}) for the ${formData.roleTitle} role at MediTrust.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-900 text-xs font-bold transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-teal-700" />
                <span>Chat with Abhay Pratap Singh on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 pt-1">
          Feel free to reach out directly to the founders for urgent inquiries or referral discussions.
        </div>
      </div>

      {/* Submitted Application Summary Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            {formData.photoUrl ? (
              <img
                src={formData.photoUrl}
                alt={formData.fullName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg">
                {formData.fullName.charAt(0) || 'C'}
              </div>
            )}
            <div>
              <h4 className="text-base font-bold text-slate-900">{formData.fullName}</h4>
              <p className="text-xs text-slate-500">
                {formData.roleTitle} • {formData.sector} Sector
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-medium">Contact Phone</span>
            <span className="text-slate-800 font-bold font-mono mt-0.5 block">{formData.phone}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-medium">Degree Completed</span>
            <span className="text-slate-800 font-bold mt-0.5 block truncate" title={formData.education.degreeCompletion}>
              {formData.education.degreeCompletion || 'N/A'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-medium">College & City</span>
            <span className="text-slate-800 font-bold mt-0.5 block truncate" title={`${formData.education.collegeName}, ${formData.education.collegeCity}`}>
              {formData.education.collegeCity || 'N/A'}, {formData.education.collegeCountry || 'India'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-medium">Expected CTC</span>
            <span className="text-emerald-700 font-bold mt-0.5 block font-mono">
              ₹ {formData.salary.expectedCTC}
            </span>
          </div>
        </div>

        {formData.resumeFile && (
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs flex items-center justify-between text-blue-900">
            <span className="font-medium">Attached Resume: <strong className="font-semibold">{formData.resumeFile.name}</strong></span>
            <span className="text-[11px] text-blue-700 font-mono">Archived securely for evaluation</span>
          </div>
        )}
      </div>

      {/* Mandatory closing text as explicitly specified by user:
          "At last it should show please wait for the further update.further updates will be provided on your email & please keep checking your email."
      */}
      <div className="rounded-3xl border-2 border-blue-300 bg-gradient-to-r from-blue-50 via-indigo-50/60 to-emerald-50 p-6 sm:p-8 text-center space-y-3 shadow-md">
        <div className="w-12 h-12 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-1">
          <h4 className="text-lg sm:text-xl font-extrabold text-blue-950 font-display">
            Application Status: Under Review
          </h4>
          <p className="text-sm sm:text-base font-semibold text-blue-900 leading-relaxed max-w-2xl mx-auto">
            please wait for the further update.further updates will be provided on your email & please keep checking your email.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Vetted by Founders Directly
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-medium">
            <Mail className="w-4 h-4 text-blue-600" />
            Updates sent to: {formData.email}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="w-4 h-4 text-purple-600" />
            Target turnaround: 2-3 business days
          </span>
        </div>
      </div>

      {/* Bottom Actions: View Confirmation Email or Submit Another */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={() => setShowEmailModal(true)}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
        >
          <Inbox className="w-4 h-4" />
          <span>Open Sent Confirmation Email</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm transition-colors"
        >
          Submit Another Application
        </button>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <ConfirmationEmailModal
          formData={formData}
          applicationId={applicationId}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
};
