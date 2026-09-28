import React from 'react';
import { Pill, Activity, ShieldCheck, HeartHandshake, ArrowRight, Laptop, Megaphone, Users, Clock, Sparkles } from 'lucide-react';
import { Sector } from '../types';
import { MediTrustLogo } from './MediTrustLogo';

interface HeroBannerProps {
  selectedSector: Sector;
  onSelectSector: (sector: Sector) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedSector,
  onSelectSector,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#003494] via-[#002773] to-[#001744] text-white pt-10 pb-14 sm:pt-14 sm:pb-20">
      {/* Background ambient radial gradients matching logo theme (Royal Blue, Cyan, Lime Green) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-semibold tracking-wide">
              <Pill className="w-3.5 h-3.5 text-[#52d929]" />
              <span>Official Employment Portal • MediTrust 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-display text-balance">
              Join India's Fastest Growing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#52d929]">
                Online Medicine Platform
              </span>
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl font-normal">
              MediTrust powers seamless medicine delivery, verified local pharmacy fulfillment, and compassionate healthcare. We are hiring passionate builders in <strong className="text-white">IT Engineering</strong> and <strong className="text-emerald-300">Growth Marketing</strong>.
            </p>

            {/* Sector Switcher Selector */}
            <div className="pt-2">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-200 block mb-2.5">
                Choose Sector to Apply:
              </span>
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg">
                <button
                  type="button"
                  onClick={() => onSelectSector('IT')}
                  className={`flex items-start gap-3.5 p-3.5 rounded-2xl border text-left transition-all ${
                    selectedSector === 'IT'
                      ? 'bg-blue-600/50 border-[#52d929] shadow-lg shadow-blue-950/60 ring-2 ring-[#52d929]/50 text-white'
                      : 'bg-white/5 border-white/10 text-blue-100 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      selectedSector === 'IT'
                        ? 'bg-[#52d929] text-slate-950'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-1.5">
                      IT Sector
                      {selectedSector === 'IT' && (
                        <span className="w-2 h-2 rounded-full bg-[#52d929] animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs text-blue-200/80 mt-0.5 line-clamp-2">
                      Software, Full-Stack, Mobile Apps, Cloud & Architecture
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectSector('Marketing')}
                  className={`flex items-start gap-3.5 p-3.5 rounded-2xl border text-left transition-all ${
                    selectedSector === 'Marketing'
                      ? 'bg-blue-600/50 border-[#52d929] shadow-lg shadow-blue-950/60 ring-2 ring-[#52d929]/50 text-white'
                      : 'bg-white/5 border-white/10 text-blue-100 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      selectedSector === 'Marketing'
                        ? 'bg-[#52d929] text-slate-950'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-1.5">
                      Marketing Sector
                      {selectedSector === 'Marketing' && (
                        <span className="w-2 h-2 rounded-full bg-[#52d929] animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs text-blue-200/80 mt-0.5 line-clamp-2">
                      Growth, Performance Ads, SEO, Brand & Field Partnerships
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-1 flex flex-wrap items-center gap-6 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#52d929]" />
                <span>Genuine Medicines Direct</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-300" />
                <span>Automated Email Confirmation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-300" />
                <span>Direct Founder Interaction</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Logo Card & Direct Leadership Connect */}
          <div className="lg:col-span-5 space-y-4">
            {/* Exactly render the MediTrust Logo app card */}
            <div className="relative group">
              <MediTrustLogo variant="appIcon" size="lg" />
            </div>

            {/* Mini leadership teaser */}
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#52d929]" />
                <span>Founders Soham Sali (CTO) & Abhay Pratap Singh (CEO)</span>
              </div>
              <a href="#leadership" className="font-semibold text-white underline hover:text-emerald-300">
                View Contacts
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
