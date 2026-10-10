import React from 'react';
import { Sparkles, Briefcase, Plus, Send, MessageSquareText, UploadCloud, User } from 'lucide-react';
import { CreatorAccount } from '../types';

export type ActiveNavTab = 'gateway' | 'creator_hub' | 'client_chat' | 'explore' | 'aimatch' | 'opportunities' | 'howitworks' | 'inquiries';

interface NavbarProps {
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  onOpenPostProject: () => void;
  onOpenCreatorStudio: () => void;
  inquiriesCount: number;
  currentUser: CreatorAccount | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPostProject,
  inquiriesCount,
  currentUser,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#06141B]/90 backdrop-blur-md border-b border-[#253745]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('gateway')}
            className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90 cursor-pointer"
          >
            <div className="w-8 h-8 rounded bg-[#11212D] border border-[#253745] flex items-center justify-center text-[#CCD0CF] font-bold text-sm shadow-inner">
              SB
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#CCD0CF] whitespace-nowrap leading-none">
                SkillBridge AI
              </span>
              <span className="text-[10px] tracking-wider text-[#9BA8AB] uppercase mt-0.5">
                Creator Marketplace
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
          <button
            onClick={() => setActiveTab('creator_hub')}
            className={`whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'creator_hub'
                ? 'text-[#CCD0CF] border-[#CCD0CF]'
                : 'text-[#9BA8AB] border-transparent hover:text-[#CCD0CF]'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5 text-[#9BA8AB]" />
            <span>I Have a Skill</span>
            {currentUser && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCD0CF] ml-0.5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('client_chat')}
            className={`whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'client_chat'
                ? 'text-[#CCD0CF] border-[#CCD0CF]'
                : 'text-[#9BA8AB] border-transparent hover:text-[#CCD0CF]'
            }`}
          >
            <MessageSquareText className="w-3.5 h-3.5 text-[#9BA8AB]" />
            <span>I Need a Service</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'explore'
                ? 'text-[#CCD0CF] border-[#CCD0CF]'
                : 'text-[#9BA8AB] border-transparent hover:text-[#CCD0CF]'
            }`}
          >
            Explore Roster
          </button>

          <button
            onClick={() => setActiveTab('aimatch')}
            className={`whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'aimatch'
                ? 'text-[#CCD0CF] border-[#CCD0CF]'
                : 'text-[#9BA8AB] border-transparent hover:text-[#CCD0CF]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9BA8AB]" />
            <span>AI Smart Match</span>
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'opportunities'
                ? 'text-[#CCD0CF] border-[#CCD0CF]'
                : 'text-[#9BA8AB] border-transparent hover:text-[#CCD0CF]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#9BA8AB]" />
            <span>Opportunities</span>
          </button>

          {inquiriesCount > 0 && (
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer py-1 border-b-2 ${
                activeTab === 'inquiries'
                  ? 'text-[#CCD0CF] border-[#CCD0CF]'
                  : 'text-[#9BA8AB] border-transparent hover:text-[#CCD0CF]'
              }`}
            >
              <Send className="w-3 h-3 text-[#9BA8AB]" />
              <span>Inquiries ({inquiriesCount})</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <button
              onClick={() => setActiveTab('creator_hub')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-[#CCD0CF] bg-[#11212D] hover:bg-[#253745] rounded border border-[#253745] transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#9BA8AB]" />
              <span className="font-semibold">{currentUser.name.split(' ')[0]} (Creator)</span>
            </button>
          ) : null}

          <button
            onClick={onOpenPostProject}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#06141B] bg-[#CCD0CF] hover:bg-white rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Post a Project</span>
          </button>
        </div>
      </div>
    </header>
  );
};

