import React, { useState } from 'react';
import { Briefcase, Clock, DollarSign, Send, CheckCircle, Sparkles, Filter, Check } from 'lucide-react';
import { ProjectOpportunity, CreatorDiscipline } from '../types';

interface OpportunitiesBoardProps {
  opportunities: ProjectOpportunity[];
  onOpenPostProject: () => void;
}

export const OpportunitiesBoard: React.FC<OpportunitiesBoardProps> = ({
  opportunities,
  onOpenPostProject,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<CreatorDiscipline | 'all'>('all');
  const [applyingOpportunity, setApplyingOpportunity] = useState<ProjectOpportunity | null>(null);
  const [proposalPitch, setProposalPitch] = useState('');
  const [proposedRate, setProposedRate] = useState('');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const filtered = opportunities.filter((opp) => {
    if (selectedDiscipline !== 'all' && opp.discipline !== selectedDiscipline) {
      return false;
    }
    return true;
  });

  const handleOpenProposal = (opp: ProjectOpportunity) => {
    setApplyingOpportunity(opp);
    setProposedRate(opp.budget.split('-')[0].trim());
    setProposalPitch('');
    setSubmissionSuccess(false);
  };

  const handleAIAssistPitch = () => {
    if (!applyingOpportunity) return;
    setIsGeneratingPitch(true);
    setTimeout(() => {
      setProposalPitch(
        `Hi ${applyingOpportunity.clientName},\n\nI reviewed your brief for ${applyingOpportunity.title} and have extensive production experience delivering ${applyingOpportunity.deliverables[0]}. My workflow specializes in ${applyingOpportunity.requiredSkills.slice(0, 3).join(', ')}, ensuring high aesthetic retention and pristine finishing.\n\nI can comfortably deliver within your ${applyingOpportunity.deadline} target and would love to review your reference moodboard.`
      );
      setIsGeneratingPitch(false);
    }, 600);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingOpportunity) return;
    setSubmittedIds((prev) => [...prev, applyingOpportunity.id]);
    setSubmissionSuccess(true);
    setTimeout(() => {
      setApplyingOpportunity(null);
      setSubmissionSuccess(false);
    }, 1200);
  };

  return (
    <div className="bg-[#06141B] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#9BA8AB] font-medium mb-1">
            Active Client Briefs
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#CCD0CF]">
            Creator Opportunities & Project Requests
          </h2>
          <p className="text-sm text-[#9BA8AB] mt-1">
            Verified clients seeking immediate talent across video editing, photography, design, writing, and social.
          </p>
        </div>

        <button
          onClick={onOpenPostProject}
          className="self-start md:self-auto px-4 py-2 bg-[#11212D] hover:bg-[#253745] text-[#CCD0CF] text-xs font-semibold rounded border border-[#253745] transition-colors cursor-pointer"
        >
          Post a Client Request
        </button>
      </div>

      {/* Discipline filter chips */}
      <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-[#11212D] rounded-lg border border-[#253745] w-fit">
        {[
          { id: 'all', label: 'All Requests' },
          { id: 'video_editor', label: 'Video Editing' },
          { id: 'photographer', label: 'Photography' },
          { id: 'graphic_designer', label: 'Graphic Design' },
          { id: 'social_creator', label: 'Social Media' },
          { id: 'scriptwriter', label: 'Scriptwriting' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedDiscipline(item.id as any)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              selectedDiscipline === item.id
                ? 'bg-[#253745] text-[#CCD0CF]'
                : 'text-[#9BA8AB] hover:text-[#CCD0CF]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Opportunities Grid */}
      <div className="space-y-4">
        {filtered.map((opp) => {
          const isSubmitted = submittedIds.includes(opp.id);

          return (
            <div
              key={opp.id}
              className="bg-[#11212D] border border-[#253745] hover:border-[#4A5C6A] rounded-xl p-5 sm:p-6 transition-all shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#9BA8AB]">
                    <span className="font-semibold text-[#CCD0CF]">{opp.clientCompany}</span>
                    <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
                    <span>Contact: {opp.clientName}</span>
                    <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
                    <span>Posted {opp.postedDate}</span>
                    <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
                    <span className="text-[#CCD0CF] font-mono">{opp.urgency} Kickoff</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#CCD0CF]">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-[#9BA8AB] leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Deliverables list */}
                  <div className="space-y-1 pt-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#9BA8AB] font-semibold block">
                      Required Deliverables:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {opp.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-1.5 text-xs text-[#CCD0CF]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#9BA8AB] shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required skill tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#253745]/60">
                    {opp.requiredSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-[#06141B] px-2 py-0.5 rounded text-[11px] font-mono text-[#9BA8AB] border border-[#253745]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side: Budget, Timeline & CTA */}
                <div className="lg:w-64 bg-[#06141B] border border-[#253745] rounded-lg p-4 flex flex-col justify-between shrink-0">
                  <div className="space-y-2 mb-4">
                    <div>
                      <span className="text-[10px] text-[#9BA8AB] uppercase tracking-wider block">
                        Client Budget
                      </span>
                      <span className="font-mono tabular-nums text-lg font-bold text-[#CCD0CF]">
                        {opp.budget}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#9BA8AB]">
                      <Clock className="w-3.5 h-3.5 text-[#4A5C6A]" />
                      <span>{opp.deadline}</span>
                    </div>

                    <div className="text-[11px] font-mono text-[#9BA8AB]">
                      {opp.proposalsCount + (isSubmitted ? 1 : 0)} proposals submitted
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenProposal(opp)}
                    disabled={isSubmitted}
                    className={`w-full py-2 px-3 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSubmitted
                        ? 'bg-[#253745] text-[#9BA8AB] cursor-default'
                        : 'bg-[#CCD0CF] hover:bg-white text-[#06141B] shadow-xs'
                    }`}
                  >
                    {isSubmitted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Proposal Submitted</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Proposal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Proposal Drawer / Modal */}
      {applyingOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#11212D] border border-[#253745] rounded-xl max-w-xl w-full p-6 shadow-2xl relative text-[#CCD0CF]">
            <div className="flex items-center justify-between pb-3 border-b border-[#253745] mb-4">
              <div>
                <span className="text-xs font-mono text-[#9BA8AB]">Project Proposal</span>
                <h3 className="text-sm font-bold text-[#CCD0CF]">{applyingOpportunity.title}</h3>
              </div>
              <button
                onClick={() => setApplyingOpportunity(null)}
                className="text-xs text-[#9BA8AB] hover:text-[#CCD0CF] cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {submissionSuccess ? (
              <div className="py-12 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-[#CCD0CF] mx-auto mb-2" />
                <h4 className="text-base font-bold text-[#CCD0CF]">Proposal Successfully Sent</h4>
                <p className="text-xs text-[#9BA8AB]">
                  {applyingOpportunity.clientName} from {applyingOpportunity.clientCompany} will review your portfolio.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-[#9BA8AB]">
                      Pitch & Relevant Experience
                    </label>
                    <button
                      type="button"
                      onClick={handleAIAssistPitch}
                      disabled={isGeneratingPitch}
                      className="flex items-center gap-1 text-[11px] text-[#CCD0CF] hover:underline cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{isGeneratingPitch ? 'Drafting...' : 'AI Pitch Assistant'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={proposalPitch}
                    onChange={(e) => setProposalPitch(e.target.value)}
                    placeholder="Describe how your experience aligns with their deliverables, software requirements, and deadline..."
                    className="w-full bg-[#06141B] border border-[#253745] rounded p-3 text-xs text-[#CCD0CF] placeholder-[#4A5C6A] focus:outline-none focus:border-[#9BA8AB]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                    Your Proposed Rate / Project Fee
                  </label>
                  <input
                    type="text"
                    value={proposedRate}
                    onChange={(e) => setProposedRate(e.target.value)}
                    placeholder="e.g. $2,800 or $95/hr"
                    className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                    required
                  />
                </div>

                <div className="pt-3 border-t border-[#253745] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setApplyingOpportunity(null)}
                    className="px-3 py-1.5 text-xs text-[#9BA8AB] hover:text-[#CCD0CF] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-[#06141B] bg-[#CCD0CF] hover:bg-white rounded transition-colors cursor-pointer"
                  >
                    Send Proposal to Client
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
