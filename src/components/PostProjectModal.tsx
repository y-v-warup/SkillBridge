import React, { useState } from 'react';
import { X, Sparkles, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectOpportunity, CreatorDiscipline } from '../types';

interface PostProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOpportunity: (opportunity: ProjectOpportunity) => void;
}

export const PostProjectModal: React.FC<PostProjectModalProps> = ({
  isOpen,
  onClose,
  onAddOpportunity,
}) => {
  const [title, setTitle] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientName, setClientName] = useState('');
  const [discipline, setDiscipline] = useState<CreatorDiscipline>('video_editor');
  const [budget, setBudget] = useState('$2,500 - $3,500');
  const [deadline, setDeadline] = useState('Due in 2 weeks');
  const [roughNotes, setRoughNotes] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([
    'High-resolution Master Cut in native aspect ratios',
    'Platform-optimized vertical cutdowns with captions',
    'Color graded source stills',
  ]);
  const [skills, setSkills] = useState<string[]>(['DaVinci Resolve', 'Commercial Color Grading', 'High-Retention Pacing']);

  const [isRefining, setIsRefining] = useState(false);
  const [aiRefined, setAiRefined] = useState(false);

  if (!isOpen) return null;

  const handleRefineWithAI = async () => {
    if (!roughNotes.trim()) return;
    setIsRefining(true);

    try {
      const response = await fetch('/api/generate-project-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roughIdea: roughNotes,
          discipline,
          targetBudget: budget,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setTitle(json.data.title);
        setDeliverables(json.data.deliverables || []);
        if (json.data.recommendedBudgetRange) {
          setBudget(json.data.recommendedBudgetRange);
        }
        setAiRefined(true);
      }
    } catch (err) {
      console.error('Error generating project brief:', err);
    } finally {
      setIsRefining(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOpportunity: ProjectOpportunity = {
      id: `opp-${Date.now()}`,
      title: title || 'Content Production Project',
      clientName: clientName || 'Verified Client',
      clientCompany: clientCompany || 'Brand Partner',
      discipline,
      budget: budget || '$2,000 - $3,000',
      deadline: deadline || 'In 2 weeks',
      postedDate: 'Just now',
      description: roughNotes || 'Commercial project brief crafted on SkillBridge AI.',
      deliverables,
      requiredSkills: skills,
      proposalsCount: 0,
      urgency: 'Standard',
    };

    onAddOpportunity(newOpportunity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#11212D] border border-[#253745] rounded-xl shadow-2xl my-8 overflow-hidden text-[#CCD0CF]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#253745] bg-[#06141B]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#CCD0CF]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#CCD0CF]">
              Post a Project Request · AI Brief Assistant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9BA8AB] hover:text-[#CCD0CF] bg-[#11212D] hover:bg-[#253745] rounded border border-[#253745] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Rachel Morgan"
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Brand / Company Name
              </label>
              <input
                type="text"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                placeholder="e.g. Lumina Apparel"
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Target Discipline
              </label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value as CreatorDiscipline)}
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
              >
                <option value="video_editor">Video Editor</option>
                <option value="photographer">Photographer</option>
                <option value="graphic_designer">Graphic Designer</option>
                <option value="social_creator">Social Media Creator</option>
                <option value="scriptwriter">Scriptwriter</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Budget Range
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $2,500 - $3,500"
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Deadline
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Due in 2 weeks"
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
              />
            </div>
          </div>

          {/* Rough notes */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-[#9BA8AB]">
                Describe your requirements or rough vision
              </label>
              <button
                type="button"
                onClick={handleRefineWithAI}
                disabled={isRefining || !roughNotes.trim()}
                className="flex items-center gap-1 text-[11px] text-[#CCD0CF] hover:underline disabled:opacity-40 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>{isRefining ? 'AI Is Refining Brief...' : 'Refine Brief with AI'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={roughNotes}
              onChange={(e) => setRoughNotes(e.target.value)}
              placeholder="e.g. We need a dynamic 60s product video for Instagram + 3 vertical cuts. The footage is already filmed in 4K ProRes. Need DaVinci color grading and sound design..."
              className="w-full bg-[#06141B] border border-[#253745] rounded p-3 text-xs text-[#CCD0CF] placeholder-[#4A5C6A] focus:outline-none focus:border-[#9BA8AB]"
              required
            />
          </div>

          {/* Project Title */}
          <div>
            <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Commercial Brand Anthem Finishing & Sound Mix"
              className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
              required
            />
          </div>

          {/* Deliverables List */}
          <div>
            <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
              Target Deliverables
            </label>
            <div className="space-y-2">
              {deliverables.map((del, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CCD0CF] shrink-0" />
                  <input
                    type="text"
                    value={del}
                    onChange={(e) => {
                      const updated = [...deliverables];
                      updated[dIdx] = e.target.value;
                      setDeliverables(updated);
                    }}
                    className="flex-1 bg-[#06141B] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-[#253745] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-[#9BA8AB] hover:text-[#CCD0CF] cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-[#06141B] bg-[#CCD0CF] hover:bg-white rounded transition-colors cursor-pointer shadow-sm"
            >
              <span>Publish Request to Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
