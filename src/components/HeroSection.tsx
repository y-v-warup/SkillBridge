import React from 'react';
import { Sparkles, ArrowRight, Video, Camera, Palette, Share2, PenTool } from 'lucide-react';
import { CreatorDiscipline } from '../types';

interface HeroSectionProps {
  onStartAIMatch: () => void;
  onSelectCategory: (discipline: CreatorDiscipline | 'all') => void;
  selectedCategory: CreatorDiscipline | 'all';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAIMatch,
  onSelectCategory,
  selectedCategory,
}) => {
  const categories: { id: CreatorDiscipline | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Disciplines', icon: null },
    { id: 'video_editor', label: 'Video Editors', icon: <Video className="w-3.5 h-3.5" /> },
    { id: 'photographer', label: 'Photographers', icon: <Camera className="w-3.5 h-3.5" /> },
    { id: 'graphic_designer', label: 'Graphic Designers', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'social_creator', label: 'Social Media Creators', icon: <Share2 className="w-3.5 h-3.5" /> },
    { id: 'scriptwriter', label: 'Scriptwriters', icon: <PenTool className="w-3.5 h-3.5" /> },
  ];

  return (
    <section className="relative pt-8 pb-12 border-b border-[#253745] bg-[#06141B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              {/* Quiet Kicker Tagline */}
              <div className="text-xs uppercase tracking-widest text-[#9BA8AB] font-medium mb-3 flex items-center gap-2">
                <span>SkillBridge Intelligence</span>
                <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
                <span className="text-[#CCD0CF]">Good work deserves to be discovered.</span>
              </div>

              {/* Refined Headline with text-wrap: balance */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#CCD0CF] leading-[1.15] text-balance max-w-2xl mb-4">
                Connect with Elite Content Creators Through AI Precision.
              </h1>

              {/* Lead Body Prose */}
              <p className="text-base text-[#9BA8AB] leading-relaxed max-w-xl mb-6">
                Describe what you need in simple, everyday language. Our matching intelligence evaluates your project's aesthetic, timeline, and budget, pairing you directly with proven video editors, photographers, designers, and writers with clear rationale on why they fit.
              </p>

              {/* Primary Call to Action Bar */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button
                  onClick={onStartAIMatch}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#CCD0CF] text-[#06141B] hover:bg-white text-sm font-semibold rounded transition-colors cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#06141B]" />
                  <span>Try AI Smart Match</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#creator-catalog"
                  className="px-4 py-2.5 bg-[#11212D] hover:bg-[#253745] text-[#CCD0CF] text-sm font-medium rounded border border-[#253745] transition-colors cursor-pointer"
                >
                  Browse Vetted Roster
                </a>
              </div>
            </div>

            {/* Interactive Discipline Segmented Filter Bar */}
            <div className="pt-4 border-t border-[#253745]/60">
              <span className="text-xs text-[#9BA8AB] uppercase tracking-wider block mb-2 font-medium">
                Filter by Creative Discipline
              </span>
              <div className="flex flex-wrap gap-1.5 p-1 bg-[#11212D] rounded-lg border border-[#253745] max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#253745] text-[#CCD0CF] shadow-xs'
                        : 'text-[#9BA8AB] hover:text-[#CCD0CF] hover:bg-[#253745]/40'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Media Asset */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-xl overflow-hidden border border-[#253745] bg-[#11212D] shadow-xl group aspect-4/3 lg:aspect-auto lg:h-full">
              <img
                src="/src/assets/images/hero_creator_collab_1791631024497.jpg"
                alt="Professional content creators working on video color grading and editorial film production"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06141B] via-transparent to-transparent opacity-80" />
              
              {/* Media Card Caption */}
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#11212D]/95 backdrop-blur-md rounded border border-[#253745]">
                <div className="flex items-center justify-between text-xs text-[#9BA8AB] mb-1">
                  <span className="font-semibold text-[#CCD0CF]">Live Production Finishes</span>
                  <span className="font-mono tabular-nums text-[#CCD0CF]">Verified Master</span>
                </div>
                <p className="text-xs text-[#9BA8AB] leading-snug">
                  Specialized talent across DaVinci color grading, medium format studio capture, and narrative scriptcraft.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Metric Strip below the split */}
        <div className="mt-12 pt-8 border-t border-[#253745] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="font-mono tabular-nums text-2xl lg:text-3xl font-bold text-[#CCD0CF]">
              500+
            </span>
            <span className="text-xs text-[#9BA8AB] mt-1">Vetted Creative Specialists</span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono tabular-nums text-2xl lg:text-3xl font-bold text-[#CCD0CF]">
              98.4%
            </span>
            <span className="text-xs text-[#9BA8AB] mt-1">AI Recommendation Precision</span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono tabular-nums text-2xl lg:text-3xl font-bold text-[#CCD0CF]">
              &lt; 24h
            </span>
            <span className="text-xs text-[#9BA8AB] mt-1">Average Brief Response Time</span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono tabular-nums text-2xl lg:text-3xl font-bold text-[#CCD0CF]">
              $4.2M+
            </span>
            <span className="text-xs text-[#9BA8AB] mt-1">Paid Directly to Creators</span>
          </div>
        </div>
      </div>
    </section>
  );
};
