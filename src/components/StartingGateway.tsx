import React from 'react';
import { Sparkles, ArrowRight, UploadCloud, MessageSquareText, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface StartingGatewayProps {
  onSelectCreatorPath: () => void;
  onSelectClientPath: () => void;
  creatorsCount: number;
}

export const StartingGateway: React.FC<StartingGatewayProps> = ({
  onSelectCreatorPath,
  onSelectClientPath,
  creatorsCount,
}) => {
  return (
    <div className="pt-6 pb-12 bg-[#06141B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Gateway Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9BA8AB] font-mono mb-3 bg-[#11212D] px-3 py-1 rounded border border-[#253745]">
            <Sparkles className="w-3.5 h-3.5 text-[#CCD0CF]" />
            <span>AI-Driven Creative Matchmaking</span>
            <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
            <span className="text-[#CCD0CF]">Good work deserves to be discovered</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#CCD0CF] leading-[1.15] text-balance mb-4">
            How would you like to enter SkillBridge?
          </h1>
          <p className="text-sm sm:text-base text-[#9BA8AB] leading-relaxed max-w-2xl mx-auto">
            Whether you are a creator ready to showcase your work and get ranked, or a client looking for the exact specialist to execute your vision.
          </p>
        </div>

        {/* Dual Choice Gateway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Option 1: I Have a Skill (Creator Flow) */}
          <div
            onClick={onSelectCreatorPath}
            className="group relative bg-[#11212D] hover:bg-[#162a39] border-2 border-[#253745] hover:border-[#CCD0CF] rounded-2xl p-7 sm:p-9 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#06141B] border border-[#253745] flex items-center justify-center text-[#CCD0CF] group-hover:border-[#CCD0CF] transition-colors shadow-inner">
                  <UploadCloud className="w-7 h-7 text-[#CCD0CF]" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#9BA8AB] bg-[#06141B] px-2.5 py-1 rounded border border-[#253745]">
                  Creator Portal
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#CCD0CF] mb-2 group-hover:text-white transition-colors">
                I Have a Skill
              </h2>
              <p className="text-sm text-[#9BA8AB] leading-relaxed mb-6">
                Log in and upload your work. Our AI analyzes your craft, automatically builds an official portfolio for you, and assigns your skill ranking so clients discover you for matching briefs.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#253745]/70 mb-8 text-xs text-[#9BA8AB]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CCD0CF] shrink-0" />
                  <span>Upload videos, photos, designs, social clips, or scripts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CCD0CF] shrink-0" />
                  <span>AI generates your case studies, bio, & tiered pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CCD0CF] shrink-0" />
                  <span>Automated skill scoring (Master Grade ranking)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#253745]">
              <span className="text-xs font-semibold text-[#CCD0CF] group-hover:underline flex items-center gap-2">
                <span>Enter as Creator & Upload Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <Award className="w-4 h-4 text-[#4A5C6A]" />
            </div>
          </div>

          {/* Option 2: I Need a Service (Client Flow) */}
          <div
            onClick={onSelectClientPath}
            className="group relative bg-[#11212D] hover:bg-[#162a39] border-2 border-[#253745] hover:border-[#CCD0CF] rounded-2xl p-7 sm:p-9 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#06141B] border border-[#253745] flex items-center justify-center text-[#CCD0CF] group-hover:border-[#CCD0CF] transition-colors shadow-inner">
                  <MessageSquareText className="w-7 h-7 text-[#CCD0CF]" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#9BA8AB] bg-[#06141B] px-2.5 py-1 rounded border border-[#253745]">
                  Client Match Chatbox
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#CCD0CF] mb-2 group-hover:text-white transition-colors">
                I Need a Service
              </h2>
              <p className="text-sm text-[#9BA8AB] leading-relaxed mb-6">
                Open our AI assistant chatbox and describe what you want in simple language. Mention your budget, timeline, and vision. AI assigns and shows the portfolios of logged-in creators who fit your exact task.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#253745]/70 mb-8 text-xs text-[#9BA8AB]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CCD0CF] shrink-0" />
                  <span>Conversational chat with AI Executive Producer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CCD0CF] shrink-0" />
                  <span>Specify your budget, formats, and aesthetic</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CCD0CF] shrink-0" />
                  <span>Instantly assigned matching creator portfolios with rationale</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#253745]">
              <span className="text-xs font-semibold text-[#CCD0CF] group-hover:underline flex items-center gap-2">
                <span>Start Client Requirement Chat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <ShieldCheck className="w-4 h-4 text-[#4A5C6A]" />
            </div>
          </div>
        </div>

        {/* Quick status trust bar */}
        <div className="mt-12 text-center text-xs text-[#9BA8AB] flex items-center justify-center gap-6 flex-wrap">
          <span>{creatorsCount} Creators Registered & Ranked</span>
          <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
          <span>5 Core Creative Disciplines</span>
          <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
          <span>Live AI Semantic Matching</span>
        </div>
      </div>
    </div>
  );
};
