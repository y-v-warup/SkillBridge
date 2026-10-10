import React, { useState } from 'react';
import { X, Sparkles, Loader2, CheckCircle2, User, Wrench, Briefcase, Plus, ArrowRight } from 'lucide-react';
import { Creator, CreatorDiscipline } from '../types';

interface CreatorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishCreator: (creator: Creator) => void;
}

export const CreatorStudioModal: React.FC<CreatorStudioModalProps> = ({
  isOpen,
  onClose,
  onPublishCreator,
}) => {
  const [discipline, setDiscipline] = useState<CreatorDiscipline>('video_editor');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('New York / Remote');
  const [rate, setRate] = useState('90');
  const [startingRate, setStartingRate] = useState('1200');
  const [rawExperience, setRawExperience] = useState('');
  const [equipmentOrTools, setEquipmentOrTools] = useState('DaVinci Resolve Studio, Premiere Pro, After Effects, Blackmagic Cinema');
  const [sampleLinks, setSampleLinks] = useState('');
  
  // AI-generated states
  const [isGenerating, setIsGenerating] = useState(false);
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [portfolioTitle, setPortfolioTitle] = useState('Brand Anthem Showcase');
  const [portfolioDesc, setPortfolioDesc] = useState('Commercial color grading and sound design pass.');

  if (!isOpen) return null;

  const handleGenerateProfile = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-creator-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discipline,
          rawExperience: rawExperience || `Experienced ${discipline} with extensive client delivery history.`,
          equipmentOrTools,
          sampleLinksOrTopics: sampleLinks,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setHeadline(json.data.headline);
        setBio(json.data.bio);
        setSkills(json.data.skillTags || []);
        setPackages(
          (json.data.servicePackages || []).map((pkg: any) => ({
            title: pkg.packageTitle,
            rate: pkg.suggestedRate,
            turnaround: pkg.turnaround,
            deliverables: [pkg.deliverableSummary, 'Client revisions included', 'High-res source delivery'],
          }))
        );
        setHasGenerated(true);
      }
    } catch (err) {
      console.error('Failed to generate profile:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const disciplineLabels: Record<CreatorDiscipline, string> = {
      video_editor: 'Video Editor & Colorist',
      photographer: 'Editorial Photographer',
      graphic_designer: 'Brand & Graphic Designer',
      social_creator: 'Social Media Creator',
      scriptwriter: 'Scriptwriter & Story Architect',
    };

    const newCreator: Creator = {
      id: `cr-user-${Date.now()}`,
      name: name || 'Creative Specialist',
      discipline,
      disciplineLabel: disciplineLabels[discipline],
      title: headline || `Professional ${disciplineLabels[discipline]}`,
      tagline: bio.split('\n')[0] || 'Crafting distinctive visual and narrative assets.',
      location: location || 'Remote',
      experienceYears: 5,
      rate: Number(rate) || 85,
      startingProjectRate: Number(startingRate) || 1000,
      availability: 'Available Now',
      rating: 5.0,
      completedProjects: 1,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      coverImage: '/src/assets/images/portfolio_video_showreel_1791631043025.jpg',
      bio: bio || rawExperience,
      skills: skills.length > 0 ? skills : ['Creative Direction', 'Finishing', 'Pacing'],
      tools: equipmentOrTools.split(',').map((t) => t.trim()),
      portfolioItems: [
        {
          id: `p-${Date.now()}`,
          title: portfolioTitle,
          category: disciplineLabels[discipline],
          imageUrl: '/src/assets/images/portfolio_video_showreel_1791631043025.jpg',
          description: portfolioDesc,
          client: 'Independent Client',
          metrics: 'Verified Master Asset',
          featured: true,
        },
      ],
      packages: packages.length > 0 ? packages : [
        {
          title: 'Starter Asset Sprint',
          rate: `$${startingRate}`,
          turnaround: '48 Hours',
          deliverables: ['Primary master deliverable', '2 rounds of revision', 'ProRes export'],
        },
      ],
      reviews: [
        {
          id: `r-${Date.now()}`,
          clientName: 'Marketplace Verification',
          role: 'Talent Curator',
          company: 'SkillBridge AI',
          comment: 'Portfolio verified for commercial compliance and technical finish.',
          rating: 5,
          date: 'Just now',
        },
      ],
    };

    onPublishCreator(newCreator);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#11212D] border border-[#253745] rounded-xl shadow-2xl my-8 overflow-hidden text-[#CCD0CF]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#253745] bg-[#06141B]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#CCD0CF]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#CCD0CF]">
              Creator Studio · AI Profile Generator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9BA8AB] hover:text-[#CCD0CF] bg-[#11212D] hover:bg-[#253745] rounded border border-[#253745] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="text-xs text-[#9BA8AB] leading-relaxed">
            Showcase your skills and generate a high-converting editorial profile with AI. We craft your positioning headline, narrative bio, and tiered pricing packages to attract clients on SkillBridge.
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Leo Kastner"
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                  Creative Discipline
                </label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value as CreatorDiscipline)}
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                >
                  <option value="video_editor">Video Editor & Colorist</option>
                  <option value="photographer">Editorial Photographer</option>
                  <option value="graphic_designer">Brand & Graphic Designer</option>
                  <option value="social_creator">Social Media Creator</option>
                  <option value="scriptwriter">Scriptwriter & Story Architect</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                  Location / Base
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. London / Remote"
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="95"
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                  Min Project Tier ($)
                </label>
                <input
                  type="number"
                  value={startingRate}
                  onChange={(e) => setStartingRate(e.target.value)}
                  placeholder="1200"
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Tools, Software & Cameras
              </label>
              <input
                type="text"
                value={equipmentOrTools}
                onChange={(e) => setEquipmentOrTools(e.target.value)}
                placeholder="e.g. DaVinci Resolve, RED Komodo, Leica M11, Figma, Final Draft..."
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Raw Experience, Style & Project Notes
              </label>
              <textarea
                rows={3}
                value={rawExperience}
                onChange={(e) => setRawExperience(e.target.value)}
                placeholder="Give us rough notes about your background, favorite genres (e.g. commercial, fashion, narrative, YouTube), clients you've worked with, or what makes your work distinct..."
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] placeholder-[#4A5C6A] focus:outline-none focus:border-[#9BA8AB]"
              />
            </div>

            {/* AI Generation Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerateProfile}
                disabled={isGenerating}
                className="w-full py-2.5 px-4 bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] text-xs font-semibold rounded border border-[#4A5C6A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#CCD0CF]" />
                    <span>AI Talent Agent Is Crafting Your Profile...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#CCD0CF]" />
                    <span>Generate Professional Profile with AI</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Results & Customization */}
            {hasGenerated && (
              <div className="space-y-4 pt-4 border-t border-[#253745] bg-[#06141B] p-4 rounded-xl border">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#CCD0CF]">
                  <CheckCircle2 className="w-4 h-4 text-[#CCD0CF]" />
                  <span>AI Generated Profile Preview (Editable)</span>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#9BA8AB] mb-1">
                    Positioning Headline
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-[#11212D] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#9BA8AB] mb-1">
                    Executive Biography
                  </label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-[#11212D] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#9BA8AB] mb-1">
                    AI Curated Skill Tags
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-[#11212D] px-2 py-0.5 rounded text-[11px] text-[#CCD0CF] border border-[#253745]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Portfolio Item info */}
                <div className="pt-3 border-t border-[#253745]">
                  <label className="block text-[11px] font-medium text-[#9BA8AB] mb-1.5">
                    Featured Portfolio Project
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={portfolioTitle}
                      onChange={(e) => setPortfolioTitle(e.target.value)}
                      placeholder="Project title"
                      className="bg-[#11212D] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF]"
                    />
                    <input
                      type="text"
                      value={portfolioDesc}
                      onChange={(e) => setPortfolioDesc(e.target.value)}
                      placeholder="Brief description"
                      className="bg-[#11212D] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-[#253745] bg-[#06141B] flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-[#9BA8AB] hover:text-[#CCD0CF] cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handlePublish}
            disabled={!name.trim()}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-[#06141B] bg-[#CCD0CF] hover:bg-white rounded transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <span>Publish to Live Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
