import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Clock, DollarSign, Lightbulb, Compass, Loader2 } from 'lucide-react';
import { Creator, AIMatchAnalysis, AIMatchResult } from '../types';

interface AIMatchEngineProps {
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  onRequestCollaboration: (creator: Creator) => void;
}

export const AIMatchEngine: React.FC<AIMatchEngineProps> = ({
  creators,
  onSelectCreator,
  onRequestCollaboration,
}) => {
  const [requirement, setRequirement] = useState('');
  const [budget, setBudget] = useState('$2,500');
  const [timeline, setTimeline] = useState('Within 2 weeks');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIMatchAnalysis | null>(null);
  const [matches, setMatches] = useState<AIMatchResult[]>([]);
  const [matchSource, setMatchSource] = useState<'gemini' | 'heuristic' | null>(null);

  const samplePresets = [
    {
      label: 'Video Finishing & Color Grade',
      req: 'We shot a brand anthem in Iceland on ARRI and need a commercial finishing editor to handle color grading in DaVinci Resolve, sound mixing, and 3 social cutdowns with high retention pacing.',
      budget: '$3,000',
      timeline: '2 weeks',
    },
    {
      label: 'Editorial Lookbook Photography',
      req: 'Launching a minimalist architectural furniture collection. Need an editorial photographer with medium format or 35mm experience to shoot studio portraits and sculptural stoneware lookbook stills.',
      budget: '$2,800',
      timeline: '10 days',
    },
    {
      label: 'Brand Identity & Packaging',
      req: 'Pre-launch luxury skincare apothecary looking for bespoke serif typography, packaging box dielines, and cohesive digital design guidelines. Seeking timeless, non-trendy aesthetics.',
      budget: '$3,800',
      timeline: '3 weeks',
    },
    {
      label: 'YouTube Documentary Scriptwriting',
      req: 'Need a narrative scriptwriter for a 20-minute video essay on industrial design history. Must include comprehensive research citations, scene-by-scene beat sheets, and high-retention storytelling hooks.',
      budget: '$1,800',
      timeline: '10 days',
    },
    {
      label: 'Viral Short-Form UGC Launch',
      req: 'Launching a studio microphone for content creators. Need an authentic creator to write, shoot, and edit 6 high-retention 9:16 vertical reels demonstrating audio setup and studio workflow.',
      budget: '$2,200',
      timeline: '1 week',
    },
  ];

  const handleApplyPreset = (preset: typeof samplePresets[0]) => {
    setRequirement(preset.req);
    setBudget(preset.budget);
    setTimeline(preset.timeline);
  };

  const handleRunMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requirement.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/match-creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requirement,
          budget,
          timeline,
          creators,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setAnalysis(json.data.analysis);
        // Map creator objects back to matches
        const mappedMatches: AIMatchResult[] = (json.data.matches || []).map((m: any) => {
          const foundCreator = creators.find((c) => c.id === m.creatorId);
          return {
            ...m,
            creator: foundCreator,
          };
        });
        setMatches(mappedMatches);
        setMatchSource(json.source);
      }
    } catch (err) {
      console.error('Failed to run AI matching:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#06141B] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#9BA8AB] font-medium mb-2">
          <Sparkles className="w-4 h-4 text-[#CCD0CF]" />
          <span>Intelligent Discovery Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#CCD0CF] text-balance">
          Describe What You Need in Simple Language
        </h2>
        <p className="text-sm text-[#9BA8AB] mt-2 max-w-2xl leading-relaxed">
          No jargon required. Write out your vision, target deliverables, or aesthetic references. SkillBridge AI dissects your requirements, isolates the necessary disciplines, and details why each recommended creator is an optimal match.
        </p>
      </div>

      {/* Main Input Form Card */}
      <div className="bg-[#11212D] border border-[#253745] rounded-xl p-5 sm:p-7 shadow-lg mb-8">
        <form onSubmit={handleRunMatch}>
          {/* Natural language prompt */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#CCD0CF] mb-2 uppercase tracking-wider">
              Project Description & Requirements
            </label>
            <textarea
              rows={4}
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              placeholder="e.g. We're launching an architectural lighting studio next month. We need a cinematic 60-second video with DaVinci color grading and 20 lookbook stills shot in natural light. Looking for clean, quiet minimalism under $3,500..."
              className="w-full bg-[#06141B] border border-[#253745] rounded-lg p-3.5 text-sm text-[#CCD0CF] placeholder-[#4A5C6A] focus:outline-none focus:border-[#9BA8AB] transition-colors resize-y leading-relaxed"
              required
            />
          </div>

          {/* Quick Preset Selector */}
          <div className="mb-6">
            <span className="text-xs text-[#9BA8AB] block mb-2 font-medium">
              Or load a curated production brief:
            </span>
            <div className="flex flex-wrap gap-2">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="px-3 py-1.5 text-xs bg-[#06141B] hover:bg-[#253745] text-[#9BA8AB] hover:text-[#CCD0CF] border border-[#253745] rounded transition-colors cursor-pointer whitespace-nowrap text-left"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget & Timeline Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Target Budget
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-[#4A5C6A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. $2,500 or Flexible"
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 pl-9 text-sm text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Desired Timeline / Delivery
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#4A5C6A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="e.g. 2 weeks or ASAP"
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 pl-9 text-sm text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-[#253745] flex-wrap gap-3">
            <div className="text-xs text-[#9BA8AB] flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-[#CCD0CF]" />
              <span>AI cross-references portfolio showreels, skills, and current creator availability.</span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !requirement.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#CCD0CF] hover:bg-white text-[#06141B] text-sm font-semibold rounded transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#06141B]" />
                  <span>Analyzing Needs & Finding Matches...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#06141B]" />
                  <span>Analyze & Match Creators</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* AI Results Section */}
      {analysis && (
        <div className="space-y-8 animate-fade-in">
          {/* Analysis Card */}
          <div className="bg-[#11212D] border border-[#253745] rounded-xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-[#253745] mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#CCD0CF]" />
                <h3 className="text-sm font-semibold text-[#CCD0CF] uppercase tracking-wider">
                  AI Needs Identification & Project Scope
                </h3>
              </div>
              <span className="text-xs font-mono text-[#9BA8AB]">
                {matchSource === 'gemini' ? 'Gemini 3.8 Flash Analysis' : 'Heuristic Engine'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#06141B] p-3 rounded border border-[#253745]">
                <span className="text-[#9BA8AB] block mb-1">Identified Disciplines</span>
                <span className="font-medium text-[#CCD0CF] leading-snug">
                  {analysis.identifiedDisciplines?.join(', ') || 'Content Creation'}
                </span>
              </div>

              <div className="bg-[#06141B] p-3 rounded border border-[#253745]">
                <span className="text-[#9BA8AB] block mb-1">Aesthetic & Tone</span>
                <span className="font-medium text-[#CCD0CF] leading-snug">
                  {analysis.aestheticTone}
                </span>
              </div>

              <div className="bg-[#06141B] p-3 rounded border border-[#253745]">
                <span className="text-[#9BA8AB] block mb-1">Timeline Assessment</span>
                <span className="font-medium text-[#CCD0CF] leading-snug">
                  {analysis.timelineAssessment}
                </span>
              </div>

              <div className="bg-[#06141B] p-3 rounded border border-[#253745]">
                <span className="text-[#9BA8AB] block mb-1">Budget Viability</span>
                <span className="font-medium text-[#CCD0CF] leading-snug">
                  {analysis.budgetViability}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#253745]/60 text-xs text-[#9BA8AB] leading-relaxed">
              <strong className="text-[#CCD0CF] font-medium">Synthesis: </strong>
              {analysis.clientNeedsSummary}
            </div>
          </div>

          {/* Matched Creators Listing */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#CCD0CF] tracking-tight">
                Recommended Creators ({matches.length})
              </h3>
              <span className="text-xs text-[#9BA8AB]">
                Ranked by portfolio relevance, budget fit & availability
              </span>
            </div>

            <div className="space-y-5">
              {matches.map((item, idx) => {
                const creator = item.creator;
                if (!creator) return null;

                return (
                  <div
                    key={creator.id || idx}
                    className="bg-[#11212D] border border-[#253745] hover:border-[#4A5C6A] rounded-xl p-5 sm:p-6 transition-all shadow-md"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Left side: Creator Info & Showreel Snapshot */}
                      <div className="lg:col-span-5 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-start gap-3.5 mb-3">
                            <img
                              src={creator.avatar}
                              alt={creator.name}
                              className="w-12 h-12 rounded-lg object-cover border border-[#253745] shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-base font-bold text-[#CCD0CF] leading-snug">
                                  {creator.name}
                                </h4>
                                {creator.verified && (
                                  <span className="text-[10px] text-[#9BA8AB] font-mono border border-[#253745] px-1 rounded">
                                    VERIFIED
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-[#9BA8AB] block">
                                {creator.disciplineLabel} · {creator.location}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-[#9BA8AB] leading-relaxed mb-4 line-clamp-2">
                            {creator.tagline}
                          </p>

                          {/* Unboxed Metadata with Typographic Separator */}
                          <div className="flex items-center gap-2 text-xs font-mono text-[#9BA8AB] mb-4">
                            <span className="tabular-nums text-[#CCD0CF] font-semibold">
                              ${creator.rate}/hr
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>Starts at ${creator.startingProjectRate}</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#CCD0CF]">{creator.availability}</span>
                          </div>
                        </div>

                        {/* Top Skills clean list */}
                        <div className="text-xs text-[#9BA8AB] flex flex-wrap gap-1.5 pt-3 border-t border-[#253745]">
                          {creator.skills.slice(0, 4).map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="bg-[#06141B] px-2 py-0.5 rounded text-[11px] text-[#CCD0CF] border border-[#253745]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right side: AI "Why This Creator is a Good Match" Rationale */}
                      <div className="lg:col-span-7 bg-[#06141B] border border-[#253745] rounded-lg p-4 sm:p-5 flex flex-col justify-between">
                        <div>
                          {/* Score Header */}
                          <div className="flex items-center justify-between pb-3 border-b border-[#253745] mb-3">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-[#CCD0CF]" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-[#CCD0CF]">
                                AI Match Rationale
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-[#9BA8AB]">Match Fit:</span>
                              <span className="font-mono tabular-nums text-sm font-bold text-[#CCD0CF] bg-[#253745] px-2 py-0.5 rounded">
                                {item.matchScore}%
                              </span>
                            </div>
                          </div>

                          {/* "Why a Good Match" Explanation */}
                          <div className="mb-4">
                            <p className="text-xs text-[#CCD0CF] leading-relaxed font-normal">
                              {item.whyGoodMatch}
                            </p>
                          </div>

                          {/* Key Fit Strengths */}
                          <div className="mb-4 space-y-1.5">
                            <span className="text-[11px] text-[#9BA8AB] uppercase tracking-wider font-semibold block">
                              Key Fit Strengths:
                            </span>
                            {item.keyFitStrengths?.map((strength, sIndex) => (
                              <div
                                key={sIndex}
                                className="flex items-start gap-2 text-xs text-[#9BA8AB]"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                                <span>{strength}</span>
                              </div>
                            ))}
                          </div>

                          {/* Budget Verdict */}
                          <div className="text-xs text-[#9BA8AB] pt-2 border-t border-[#253745]/60 flex items-center justify-between">
                            <span>Budget Compatibility:</span>
                            <span className="text-[#CCD0CF] font-medium">{item.budgetVerdict}</span>
                          </div>
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 mt-4 border-t border-[#253745]">
                          <button
                            onClick={() => onSelectCreator(creator)}
                            className="px-3.5 py-1.5 text-xs text-[#CCD0CF] hover:text-white bg-[#11212D] hover:bg-[#253745] rounded border border-[#253745] transition-colors cursor-pointer"
                          >
                            View Portfolio & Case Studies
                          </button>

                          <button
                            onClick={() => onRequestCollaboration(creator)}
                            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-[#06141B] bg-[#CCD0CF] hover:bg-white rounded transition-colors cursor-pointer shadow-xs"
                          >
                            <span>Initiate Project</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
