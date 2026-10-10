import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, DollarSign, Calendar } from 'lucide-react';
import { Creator, CreatorPackage, CollaborationRequest } from '../types';

interface CollaborationModalProps {
  creator: Creator | null;
  selectedPackage?: CreatorPackage;
  prefilledBrief?: string;
  prefilledBudget?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (request: CollaborationRequest) => void;
}

export const CollaborationModal: React.FC<CollaborationModalProps> = ({
  creator,
  selectedPackage,
  prefilledBrief,
  prefilledBudget,
  isOpen,
  onClose,
  onSubmitInquiry,
}) => {
  if (!isOpen || !creator) return null;

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectTitle, setProjectTitle] = useState(
    selectedPackage ? `${selectedPackage.title} Collaboration` : `Project with ${creator.name}`
  );
  const [projectBrief, setProjectBrief] = useState(prefilledBrief || '');
  const [budget, setBudget] = useState(
    prefilledBudget || (selectedPackage ? selectedPackage.rate : `$${creator.startingProjectRate}`)
  );
  const [timeline, setTimeline] = useState(
    selectedPackage ? selectedPackage.turnaround : 'Within 2-3 weeks'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry: CollaborationRequest = {
      id: `inq-${Date.now()}`,
      creatorId: creator.id,
      creatorName: creator.name,
      clientName: clientName || 'Client Partner',
      clientEmail: clientEmail || 'client@studio.com',
      projectTitle,
      projectBrief,
      budget,
      timeline,
      selectedPackage: selectedPackage?.title,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Pending Creator Review',
    };

    onSubmitInquiry(newInquiry);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#11212D] border border-[#253745] rounded-xl shadow-2xl my-8 overflow-hidden text-[#CCD0CF]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#253745] bg-[#06141B]">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-[#CCD0CF]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#CCD0CF]">
              Initiate Project Collaboration
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9BA8AB] hover:text-[#CCD0CF] bg-[#11212D] hover:bg-[#253745] rounded border border-[#253745] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#CCD0CF] mx-auto" />
            <h3 className="text-lg font-bold text-[#CCD0CF]">Inquiry Dispatched</h3>
            <p className="text-xs text-[#9BA8AB] max-w-sm mx-auto">
              Your project brief has been delivered to {creator.name}. You will receive a direct notification once they accept or review your scope.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Target Creator Badge */}
            <div className="bg-[#06141B] p-3 rounded-lg border border-[#253745] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-10 h-10 rounded-md object-cover border border-[#253745]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#CCD0CF]">{creator.name}</span>
                    {creator.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#9BA8AB]" />}
                  </div>
                  <span className="text-[11px] text-[#9BA8AB]">{creator.disciplineLabel}</span>
                </div>
              </div>
              <div className="text-right font-mono tabular-nums text-xs text-[#CCD0CF]">
                <div>${creator.rate}/hr</div>
                <div className="text-[10px] text-[#9BA8AB]">{creator.availability}</div>
              </div>
            </div>

            {selectedPackage && (
              <div className="p-2.5 bg-[#253745]/40 rounded border border-[#253745] text-xs">
                <span className="text-[#9BA8AB]">Selected Tier: </span>
                <strong className="text-[#CCD0CF]">{selectedPackage.title} ({selectedPackage.rate})</strong>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#9BA8AB] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Alex Henderson"
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA8AB] mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g. Autumn Brand Commercial Finish"
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#9BA8AB] mb-1">
                  Proposed Budget
                </label>
                <div className="relative">
                  <DollarSign className="w-3.5 h-3.5 text-[#4A5C6A] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#06141B] border border-[#253745] rounded p-2 pl-7 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA8AB] mb-1">
                  Delivery Timeline
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-[#4A5C6A] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#06141B] border border-[#253745] rounded p-2 pl-7 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1">
                Project Scope & Deliverable Notes
              </label>
              <textarea
                rows={3}
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                placeholder="Share links to reference videos/moodboards, file specs, and key milestone requirements..."
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] placeholder-[#4A5C6A] focus:outline-none focus:border-[#9BA8AB]"
                required
              />
            </div>

            <div className="pt-3 border-t border-[#253745] flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#9BA8AB] hover:text-[#CCD0CF] cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-[#06141B] bg-[#CCD0CF] hover:bg-white rounded transition-colors cursor-pointer shadow-sm"
              >
                Send Request to Creator
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
