import React, { useState } from 'react';
import {
  UploadCloud,
  Sparkles,
  Award,
  CheckCircle2,
  Loader2,
  FileText,
  User,
  Star,
  ShieldCheck,
  ArrowRight,
  LogOut,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';
import { Creator, CreatorAccount, CreatorDiscipline, UploadedWork } from '../types';

interface CreatorSkillHubProps {
  currentUser: CreatorAccount | null;
  onLogin: (account: CreatorAccount) => void;
  onLogout: () => void;
  onStoreNewPortfolio: (creator: Creator) => void;
  onBrowseMarketplace: () => void;
}

export const CreatorSkillHub: React.FC<CreatorSkillHubProps> = ({
  currentUser,
  onLogin,
  onLogout,
  onStoreNewPortfolio,
  onBrowseMarketplace,
}) => {
  // Login form state
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginDiscipline, setLoginDiscipline] = useState<CreatorDiscipline>('video_editor');
  const [loginLocation, setLoginLocation] = useState('Berlin / Remote');

  // Work upload state
  const [workTitle, setWorkTitle] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [toolsUsed, setToolsUsed] = useState('DaVinci Resolve Studio 19, Premiere Pro, Arri RAW Workflow, Dehancer');
  const [previewImageUrl, setPreviewImageUrl] = useState('/src/assets/images/portfolio_video_showreel_1791631043025.jpg');
  const [uploadedFileName, setUploadedFileName] = useState('campaign_master_color_grade.mov');
  
  // AI analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [isActivated, setIsActivated] = useState(false);

  // Quick demo presets for easy testing
  const handleQuickLogin = (name: string, email: string, discipline: CreatorDiscipline, loc: string) => {
    const demoAccount: CreatorAccount = {
      id: `cr-user-${Date.now()}`,
      name,
      email,
      discipline,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      uploadedWorks: [],
      isPortfolioGenerated: false,
    };
    onLogin(demoAccount);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim()) return;
    const newAccount: CreatorAccount = {
      id: `cr-user-${Date.now()}`,
      name: loginName,
      email: loginEmail || `${loginName.toLowerCase().replace(/\s+/g, '')}@creator.io`,
      discipline: loginDiscipline,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      uploadedWorks: [],
      isPortfolioGenerated: false,
    };
    onLogin(newAccount);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setPreviewImageUrl(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Trigger AI work analysis & automated portfolio generation
  const handleAnalyzeWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workTitle.trim() || !currentUser) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-and-build-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName: currentUser.name,
          discipline: currentUser.discipline,
          workTitle,
          workDescription: workDescription || 'Commercial finishing project showcasing advanced pacing, color science, and sound stems.',
          fileMetadata: uploadedFileName,
          toolsUsed,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setAnalysisResult(json.data);
      }
    } catch (err) {
      console.error('Error analyzing work:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Activate and store creator portfolio into marketplace
  const handleStoreAndPublish = () => {
    if (!currentUser || !analysisResult) return;

    const disciplineLabels: Record<CreatorDiscipline, string> = {
      video_editor: 'Video Editor & Colorist',
      photographer: 'Editorial Photographer',
      graphic_designer: 'Brand & Graphic Designer',
      social_creator: 'Social Media Creator',
      scriptwriter: 'Scriptwriter & Story Architect',
    };

    const newCreator: Creator = {
      id: currentUser.id,
      name: currentUser.name,
      discipline: currentUser.discipline,
      disciplineLabel: disciplineLabels[currentUser.discipline],
      title: analysisResult.creatorProfile.headline,
      tagline: analysisResult.creatorProfile.bio.split('\n')[0] || 'Vetted creative specialist.',
      location: 'Berlin / Remote',
      experienceYears: 6,
      rate: analysisResult.creatorProfile.recommendedHourlyRate || 95,
      startingProjectRate: analysisResult.creatorProfile.recommendedStartingProject || 1400,
      availability: 'Available Now',
      rating: 4.98,
      completedProjects: 14,
      verified: true,
      avatar: currentUser.avatar,
      coverImage: previewImageUrl,
      bio: analysisResult.creatorProfile.bio,
      skills: analysisResult.creatorProfile.detectedSkills || ['Color Science', 'Pacing', 'Finishing'],
      tools: toolsUsed.split(',').map((t) => t.trim()),
      ranking: {
        craftScore: analysisResult.ranking.craftScore,
        rankTier: analysisResult.ranking.rankTier,
        rankBadge: analysisResult.ranking.rankBadge,
        rankingRationale: analysisResult.ranking.rankingRationale,
      },
      portfolioItems: [
        {
          id: `p-${Date.now()}`,
          title: analysisResult.portfolioItem.title,
          category: analysisResult.portfolioItem.category,
          imageUrl: previewImageUrl,
          description: analysisResult.portfolioItem.description,
          client: 'Client Commercial Project',
          metrics: analysisResult.portfolioItem.clientImpact,
          featured: true,
        },
      ],
      packages: [
        {
          title: 'Single Master Asset Sprint',
          rate: `$${analysisResult.creatorProfile.recommendedStartingProject || 950}`,
          turnaround: '48 Hours',
          deliverables: ['1x Commercial Master export', '2 revision rounds', 'Full color & sound pass'],
        },
        {
          title: 'Campaign Package',
          rate: `$${(analysisResult.creatorProfile.recommendedStartingProject || 950) * 2}`,
          turnaround: '1 Week',
          deliverables: ['Multi-format cutdowns', 'RAW conform', 'Archival stems delivery'],
        },
      ],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          clientName: 'SkillBridge Automated Review Engine',
          role: 'Talent Curator',
          company: 'SkillBridge AI',
          comment: `Work evaluated with a craft score of ${analysisResult.ranking.craftScore}/100. Exceptional execution.`,
          rating: 5,
          date: 'Just now',
        },
      ],
    };

    onStoreNewPortfolio(newCreator);
    setIsActivated(true);
  };

  return (
    <div className="py-10 bg-[#06141B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* If Not Logged In: Show Creator Sign-in / Setup */}
      {!currentUser ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9BA8AB] bg-[#11212D] px-3 py-1 rounded border border-[#253745] mb-2">
              <UploadCloud className="w-3.5 h-3.5 text-[#CCD0CF]" />
              <span>Creator Onboarding Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#CCD0CF]">
              Log in to Upload Work & Build Your Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-[#9BA8AB] mt-2 leading-relaxed">
              Sign in with your creative discipline. Once you upload your work, our AI conducts deep craft analysis, formats your portfolio case studies, and assigns your ranking.
            </p>
          </div>

          {/* Quick Demo Login Buttons */}
          <div className="bg-[#11212D] border border-[#253745] rounded-xl p-5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#CCD0CF] block mb-3">
              One-Click Demo Profiles (For Instant Testing):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  handleQuickLogin(
                    'Alex Rivera',
                    'alex.rivera@cinema.io',
                    'video_editor',
                    'Berlin / Remote'
                  )
                }
                className="p-3 bg-[#06141B] hover:bg-[#253745] text-left border border-[#253745] rounded-lg transition-colors cursor-pointer text-xs"
              >
                <div className="font-bold text-[#CCD0CF]">Alex Rivera</div>
                <div className="text-[#9BA8AB] text-[11px]">Video Editor & DaVinci Colorist</div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickLogin(
                    'Kaito Shimizu',
                    'kaito@tokyostudio.com',
                    'photographer',
                    'Tokyo / Worldwide'
                  )
                }
                className="p-3 bg-[#06141B] hover:bg-[#253745] text-left border border-[#253745] rounded-lg transition-colors cursor-pointer text-xs"
              >
                <div className="font-bold text-[#CCD0CF]">Kaito Shimizu</div>
                <div className="text-[#9BA8AB] text-[11px]">Editorial & Studio Photographer</div>
              </button>
            </div>
          </div>

          {/* Custom Login Form */}
          <div className="bg-[#11212D] border border-[#253745] rounded-xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#CCD0CF] mb-4">
              Or Create Your Creator Profile
            </h3>
            <form onSubmit={handleCustomLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="e.g. Maya Sterling"
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                    Your Creative Discipline
                  </label>
                  <select
                    value={loginDiscipline}
                    onChange={(e) => setLoginDiscipline(e.target.value as CreatorDiscipline)}
                    className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                  >
                    <option value="video_editor">Video Editor & Colorist</option>
                    <option value="photographer">Editorial Photographer</option>
                    <option value="graphic_designer">Brand & Graphic Designer</option>
                    <option value="social_creator">Social Media Creator</option>
                    <option value="scriptwriter">Scriptwriter & Story Architect</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@studio.com"
                    className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#CCD0CF] hover:bg-white text-[#06141B] text-xs font-semibold rounded transition-colors cursor-pointer shadow-sm mt-2 flex items-center justify-center gap-2"
              >
                <span>Log In & Open Work Upload Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Logged In Creator Workspace */
        <div className="space-y-8">
          {/* Creator Bar */}
          <div className="bg-[#11212D] border border-[#253745] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-lg object-cover border border-[#253745]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#CCD0CF]">{currentUser.name}</h3>
                  <span className="text-[10px] font-mono text-[#CCD0CF] bg-[#06141B] px-2 py-0.5 rounded border border-[#253745]">
                    Logged In
                  </span>
                </div>
                <span className="text-xs text-[#9BA8AB]">
                  {currentUser.discipline.replace('_', ' ').toUpperCase()} · {currentUser.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button
                onClick={onBrowseMarketplace}
                className="px-3.5 py-1.5 text-xs bg-[#06141B] hover:bg-[#253745] text-[#CCD0CF] rounded border border-[#253745] transition-colors cursor-pointer"
              >
                View Live Marketplace
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#9BA8AB] hover:text-[#CCD0CF] transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch Account</span>
              </button>
            </div>
          </div>

          {/* Step 1: Upload Your Work */}
          <div className="bg-[#11212D] border border-[#253745] rounded-xl p-6 sm:p-8 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-[#253745] mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-[#CCD0CF]" />
                  <h3 className="text-base font-bold text-[#CCD0CF]">
                    Upload Your Work For AI Analysis
                  </h3>
                </div>
                <p className="text-xs text-[#9BA8AB] mt-1">
                  Upload your video reel, photo shoot, graphic identity, or script sample. AI evaluates your craft and builds your verified portfolio.
                </p>
              </div>

              {/* Sample Preset loader */}
              <button
                type="button"
                onClick={() => {
                  setWorkTitle('Commercial Automotive Noir Brand Anthem (DaVinci Resolve)');
                  setWorkDescription(
                    'Color graded 60-second national commercial shot on Arri Alexa Mini LF. Applied bespoke 35mm film grain curve, calibrated tungsten interior lighting against deep midnight blacks, and engineered dynamic multi-stem audio pass.'
                  );
                  setToolsUsed('DaVinci Resolve Studio 19, Premiere Pro, Arri RAW, Dehancer, Izotope RX');
                  setUploadedFileName('automotive_anthem_final_prores.mov');
                  setPreviewImageUrl('/src/assets/images/portfolio_video_showreel_1791631043025.jpg');
                }}
                className="text-xs text-[#CCD0CF] hover:underline flex items-center gap-1 cursor-pointer font-mono"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Load Sample Work Data</span>
              </button>
            </div>

            <form onSubmit={handleAnalyzeWork} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#CCD0CF] mb-1.5 uppercase tracking-wider">
                    Work / Project Title
                  </label>
                  <input
                    type="text"
                    value={workTitle}
                    onChange={(e) => setWorkTitle(e.target.value)}
                    placeholder="e.g. Architectural Furniture Lookbook Editorial Stills"
                    className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#CCD0CF] mb-1.5 uppercase tracking-wider">
                    Tools, Cameras & Software Used
                  </label>
                  <input
                    type="text"
                    value={toolsUsed}
                    onChange={(e) => setToolsUsed(e.target.value)}
                    placeholder="e.g. DaVinci Resolve Studio, Leica M11, Figma, Final Draft..."
                    className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CCD0CF] mb-1.5 uppercase tracking-wider">
                  Work Description & Technical Details
                </label>
                <textarea
                  rows={4}
                  value={workDescription}
                  onChange={(e) => setWorkDescription(e.target.value)}
                  placeholder="Detail what you produced, the aesthetic approach, challenges solved, and final deliverable formats..."
                  className="w-full bg-[#06141B] border border-[#253745] rounded p-3 text-xs text-[#CCD0CF] placeholder-[#4A5C6A] focus:outline-none focus:border-[#9BA8AB]"
                  required
                />
              </div>

              {/* Upload Dropzone & Media Selection */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-[#CCD0CF] mb-1.5 uppercase tracking-wider">
                    Upload Asset / Master File
                  </label>
                  <div className="border-2 border-dashed border-[#253745] hover:border-[#4A5C6A] rounded-xl p-6 text-center bg-[#06141B] transition-colors relative">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      title="Upload work asset file"
                    />
                    <FolderOpen className="w-8 h-8 text-[#4A5C6A] mx-auto mb-2" />
                    <span className="text-xs font-semibold text-[#CCD0CF] block">
                      {uploadedFileName ? uploadedFileName : 'Click or drop master file here'}
                    </span>
                    <span className="text-[11px] text-[#9BA8AB] mt-1 block">
                      Supports video (MP4, MOV), high-res images (JPEG, PNG), scripts (PDF), or design exports
                    </span>
                  </div>
                </div>

                {/* Preview Thumbnail */}
                <div className="md:col-span-4">
                  <span className="block text-xs font-semibold text-[#CCD0CF] mb-1.5 uppercase tracking-wider">
                    Asset Visual Preview
                  </span>
                  <div className="aspect-16/10 rounded-lg overflow-hidden border border-[#253745] bg-[#06141B] relative">
                    <img
                      src={previewImageUrl}
                      alt="Uploaded work preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-[#06141B]/90 backdrop-blur-xs rounded text-[10px] font-mono text-[#CCD0CF]">
                      Attached Master
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#253745] flex items-center justify-between">
                <div className="text-xs text-[#9BA8AB] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#CCD0CF]" />
                  <span>Gemini 3.8 Flash assesses technique, craft complexity, and calculates your ranking.</span>
                </div>

                <button
                  type="submit"
                  disabled={isAnalyzing || !workTitle.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#CCD0CF] hover:bg-white text-[#06141B] text-xs font-bold rounded transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#06141B]" />
                      <span>Analyzing Craft & Building Portfolio...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#06141B]" />
                      <span>Analyze Work & Build My Portfolio with AI</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Step 2: AI Generated Portfolio & Ranking Card */}
          {analysisResult && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-[#11212D] border-2 border-[#253745] rounded-xl p-6 sm:p-8 shadow-xl">
                {/* Ranking Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#253745] mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#9BA8AB] font-mono mb-1">
                      <Award className="w-4 h-4 text-[#CCD0CF]" />
                      <span>AI Skill Ranking Assigned</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#CCD0CF]">
                      {analysisResult.ranking.rankTier}
                    </h3>
                    <p className="text-xs text-[#9BA8AB] mt-1">
                      {analysisResult.ranking.rankingRationale}
                    </p>
                  </div>

                  <div className="bg-[#06141B] p-4 rounded-xl border border-[#253745] text-right shrink-0">
                    <span className="text-[10px] text-[#9BA8AB] uppercase tracking-wider block font-mono">
                      Craftsmanship Score
                    </span>
                    <span className="font-mono tabular-nums text-3xl font-extrabold text-[#CCD0CF]">
                      {analysisResult.ranking.craftScore}
                      <span className="text-sm font-normal text-[#9BA8AB]">/100</span>
                    </span>
                    <div className="text-[11px] text-[#CCD0CF] font-semibold mt-0.5">
                      {analysisResult.ranking.rankBadge}
                    </div>
                  </div>
                </div>

                {/* AI Built Portfolio Case Study */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                  <div className="lg:col-span-5">
                    <div className="aspect-16/10 rounded-xl overflow-hidden border border-[#253745] bg-[#06141B] mb-3">
                      <img
                        src={previewImageUrl}
                        alt="Portfolio master"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-xs text-[#9BA8AB] font-mono flex items-center justify-between">
                      <span>Category: {analysisResult.portfolioItem.category}</span>
                      <span className="text-[#CCD0CF]">Impact: {analysisResult.portfolioItem.clientImpact}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <span className="text-xs font-mono text-[#9BA8AB] uppercase tracking-wider block mb-1">
                        AI Formatted Case Study
                      </span>
                      <h4 className="text-lg font-bold text-[#CCD0CF]">
                        {analysisResult.portfolioItem.title}
                      </h4>
                      <p className="text-xs text-[#9BA8AB] leading-relaxed mt-2">
                        {analysisResult.portfolioItem.description}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-[#CCD0CF] uppercase tracking-wider block mb-2">
                        Detected Technical Techniques:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.portfolioItem.detectedTechniques?.map((tech: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className="bg-[#06141B] text-[#CCD0CF] text-[11px] px-2.5 py-1 rounded border border-[#253745] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#253745] grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[#9BA8AB] block">Recommended Rate</span>
                        <span className="font-mono tabular-nums text-sm font-bold text-[#CCD0CF]">
                          ${analysisResult.creatorProfile.recommendedHourlyRate}/hr
                        </span>
                      </div>
                      <div>
                        <span className="text-[#9BA8AB] block">Starting Project Tier</span>
                        <span className="font-mono tabular-nums text-sm font-bold text-[#CCD0CF]">
                          ${analysisResult.creatorProfile.recommendedStartingProject}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Storing and Activating in Marketplace */}
                <div className="p-4 bg-[#06141B] rounded-xl border border-[#253745] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#9BA8AB]">
                    {isActivated ? (
                      <span className="text-[#CCD0CF] font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#CCD0CF]" />
                        <span>Portfolio is Live! When clients search or chat for matching work, AI will assign your portfolio.</span>
                      </span>
                    ) : (
                      <span>
                        Ready to store this data. Click below to add your AI-built portfolio into the live marketplace.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {isActivated ? (
                      <button
                        onClick={onBrowseMarketplace}
                        className="px-5 py-2 text-xs font-semibold bg-[#CCD0CF] hover:bg-white text-[#06141B] rounded transition-colors cursor-pointer"
                      >
                        View in Marketplace
                      </button>
                    ) : (
                      <button
                        onClick={handleStoreAndPublish}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#CCD0CF] hover:bg-white text-[#06141B] text-xs font-bold rounded transition-colors cursor-pointer shadow-sm"
                      >
                        <span>Activate & Store Portfolio in Marketplace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
