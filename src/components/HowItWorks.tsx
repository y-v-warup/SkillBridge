import React from 'react';
import { Sparkles, Users, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';

interface HowItWorksProps {
  onStartMatching: () => void;
  onOpenCreatorStudio: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onStartMatching,
  onOpenCreatorStudio,
}) => {
  return (
    <section className="py-16 bg-[#06141B] border-b border-[#253745]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider text-[#9BA8AB] font-medium mb-1">
            SkillBridge Architecture
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#CCD0CF]">
            How Good Work Gets Discovered
          </h2>
          <p className="text-sm text-[#9BA8AB] mt-2 leading-relaxed">
            Eliminating the noise of open bidding marketplaces. SkillBridge AI combines semantic requirement analysis with verified creator talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#11212D] border border-[#253745] rounded-xl p-6 relative">
            <span className="font-mono text-xs text-[#9BA8AB] block mb-2">01. Simple Language Input</span>
            <h3 className="text-base font-bold text-[#CCD0CF] mb-2">
              Explain Your Vision In Everyday Words
            </h3>
            <p className="text-xs text-[#9BA8AB] leading-relaxed">
              No technical jargon needed. Share what you want to build—from 9:16 short-form video series to architectural lookbooks or long-form documentary screenplays.
            </p>
          </div>

          <div className="bg-[#11212D] border border-[#253745] rounded-xl p-6 relative">
            <span className="font-mono text-xs text-[#9BA8AB] block mb-2">02. Semantic Match Rationale</span>
            <h3 className="text-base font-bold text-[#CCD0CF] mb-2">
              Transparent "Why This Creator" Fit
            </h3>
            <p className="text-xs text-[#9BA8AB] leading-relaxed">
              Our AI engine evaluates past color grading science, composition textures, narrative pacing, and verified rates, providing an explicit explanation for each candidate.
            </p>
          </div>

          <div className="bg-[#11212D] border border-[#253745] rounded-xl p-6 relative">
            <span className="font-mono text-xs text-[#9BA8AB] block mb-2">03. High-Fidelity Finishing</span>
            <h3 className="text-base font-bold text-[#CCD0CF] mb-2">
              Structured Milestones & Master Stems
            </h3>
            <p className="text-xs text-[#9BA8AB] leading-relaxed">
              Directly request standard tiered service packages or customized multi-asset contracts. Receive master exports in native resolutions with revision protection.
            </p>
          </div>
        </div>

        {/* Creator Callout Banner */}
        <div className="bg-[#11212D] border border-[#253745] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#CCD0CF] mb-1">
              <Sparkles className="w-4 h-4 text-[#CCD0CF]" />
              <span>For Independent Content Creators</span>
            </div>
            <h3 className="text-lg font-bold text-[#CCD0CF]">
              Elevate Your Portfolio with AI Assistance
            </h3>
            <p className="text-xs text-[#9BA8AB] max-w-xl mt-1 leading-relaxed">
              Use our AI Talent Agent in the Creator Studio to generate executive headlines, sharpen your service packages, and match directly with discerning clients.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCreatorStudio}
              className="px-5 py-2.5 text-xs font-semibold bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] rounded border border-[#4A5C6A] transition-colors cursor-pointer"
            >
              Open Creator Studio
            </button>
            <button
              onClick={onStartMatching}
              className="px-5 py-2.5 text-xs font-semibold bg-[#CCD0CF] hover:bg-white text-[#06141B] rounded transition-colors cursor-pointer"
            >
              Find a Creator Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
