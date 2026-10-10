import React from 'react';
import { CreatorDiscipline } from '../types';

interface FooterProps {
  onSelectCategory: (category: CreatorDiscipline | 'all') => void;
  onOpenCreatorStudio: () => void;
  onOpenPostProject: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCreatorStudio,
  onOpenPostProject,
}) => {
  return (
    <footer className="bg-[#06141B] border-t border-[#253745] text-[#9BA8AB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#253745]">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#11212D] border border-[#253745] flex items-center justify-center text-[#CCD0CF] font-bold text-xs">
                SB
              </div>
              <span className="text-base font-bold text-[#CCD0CF]">SkillBridge AI</span>
            </div>
            <p className="text-xs text-[#9BA8AB] max-w-sm leading-relaxed">
              An intelligent content creator marketplace connecting clients with skilled video editors, photographers, graphic designers, social media creators, and scriptwriters.
            </p>
            <div className="text-xs font-medium text-[#CCD0CF]">
              Good work deserves to be discovered.
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#CCD0CF] block mb-2">
              Creative Disciplines
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('video_editor')}
                  className="hover:text-[#CCD0CF] transition-colors cursor-pointer"
                >
                  Video Editors & Colorists
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('photographer')}
                  className="hover:text-[#CCD0CF] transition-colors cursor-pointer"
                >
                  Editorial Photographers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('graphic_designer')}
                  className="hover:text-[#CCD0CF] transition-colors cursor-pointer"
                >
                  Brand & Graphic Designers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('social_creator')}
                  className="hover:text-[#CCD0CF] transition-colors cursor-pointer"
                >
                  Social Media Creators
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('scriptwriter')}
                  className="hover:text-[#CCD0CF] transition-colors cursor-pointer"
                >
                  Narrative Scriptwriters
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#CCD0CF] block mb-2">
              Platform Actions
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={onOpenPostProject}
                  className="hover:text-[#CCD0CF] transition-colors cursor-pointer text-left"
                >
                  Post a Client Project Request
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCreatorStudio}
                  className="hover:text-[#CCD0CF] transition-colors cursor-pointer text-left"
                >
                  Creator Studio & AI Profile Generator
                </button>
              </li>
              <li>
                <span className="text-[#4A5C6A]">
                  AI Match Reasoning Model · Gemini 3.8 Flash
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#4A5C6A] gap-4">
          <div>© 2026 SkillBridge AI. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>Terms of Service</span>
            <span>Editorial Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
