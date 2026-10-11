import React, { useState, useEffect } from 'react';
import { Navbar, ActiveNavTab } from './components/Navbar';
import { StartingGateway } from './components/StartingGateway';
import { CreatorSkillHub } from './components/CreatorSkillHub';
import { ClientServiceChatbox } from './components/ClientServiceChatbox';
import { HeroSection } from './components/HeroSection';
import { AIMatchEngine } from './components/AIMatchEngine';
import { CreatorDirectory } from './components/CreatorDirectory';
import { CreatorDetailModal } from './components/CreatorDetailModal';
import { OpportunitiesBoard } from './components/OpportunitiesBoard';
import { CreatorStudioModal } from './components/CreatorStudioModal';
import { PostProjectModal } from './components/PostProjectModal';
import { CollaborationModal } from './components/CollaborationModal';
import { AIEvaluationDataSourcesModal } from './components/AIEvaluationDataSourcesModal';
import { SecurityTrustCenterModal } from './components/SecurityTrustCenterModal';
import { ReportAbuseModal } from './components/ReportAbuseModal';
import { HowItWorks } from './components/HowItWorks';
import { InquiriesList } from './components/InquiriesList';
import { Footer } from './components/Footer';
import { INITIAL_CREATORS, INITIAL_OPPORTUNITIES } from './data/mockData';
import {
  Creator,
  CreatorDiscipline,
  ProjectOpportunity,
  CollaborationRequest,
  CreatorPackage,
  CreatorAccount,
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('gateway');
  const [selectedCategory, setSelectedCategory] = useState<CreatorDiscipline | 'all'>('all');
  
  // Persistent creators pool
  const [creators, setCreators] = useState<Creator[]>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_creators');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load local creators, using initial:', e);
    }
    return INITIAL_CREATORS;
  });

  // Current logged in creator user session
  const [currentUser, setCurrentUser] = useState<CreatorAccount | null>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load local user session:', e);
    }
    return null;
  });

  const [opportunities, setOpportunities] = useState<ProjectOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [inquiries, setInquiries] = useState<CollaborationRequest[]>([
    {
      id: 'inq-initial-1',
      creatorId: 'cr-1',
      creatorName: 'Marcus Vance',
      clientName: 'Sarah Lindqvist',
      clientEmail: 'sarah@solaria.com',
      projectTitle: 'Solaria Autumn Campaign Color Grade',
      projectBrief: 'Need 60s master commercial with custom film emulation and high-contrast night grading for ARRI footage.',
      budget: '$2,800',
      timeline: '2 weeks',
      selectedPackage: 'Campaign Suite',
      timestamp: 'Today',
      status: 'In Discussion',
    },
  ]);

  // Modals state
  const [detailModalCreator, setDetailModalCreator] = useState<Creator | null>(null);
  const [isCreatorStudioOpen, setIsCreatorStudioOpen] = useState(false);
  const [isPostProjectOpen, setIsPostProjectOpen] = useState(false);
  const [isDataSourcesModalOpen, setIsDataSourcesModalOpen] = useState(false);
  const [isSecurityCenterOpen, setIsSecurityCenterOpen] = useState(false);
  const [reportModalData, setReportModalData] = useState<{
    isOpen: boolean;
    targetId: string;
    targetName: string;
    targetType: 'creator' | 'client' | 'project';
  }>({
    isOpen: false,
    targetId: '',
    targetName: '',
    targetType: 'creator',
  });
  const [collabModal, setCollabModal] = useState<{
    isOpen: boolean;
    creator: Creator | null;
    selectedPackage?: CreatorPackage;
    prefilledBrief?: string;
    prefilledBudget?: string;
  }>({
    isOpen: false,
    creator: null,
  });

  // Save creators to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_creators', JSON.stringify(creators));
    } catch (e) {
      console.warn('Failed to save creators locally:', e);
    }
  }, [creators]);

  // Save current user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('skillbridge_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('skillbridge_user');
      }
    } catch (e) {
      console.warn('Failed to save user session locally:', e);
    }
  }, [currentUser]);

  const handleLoginCreator = (account: CreatorAccount) => {
    setCurrentUser(account);
  };

  const handleLogoutCreator = () => {
    setCurrentUser(null);
  };

  const handleStoreNewPortfolio = (newCreator: Creator) => {
    setCreators((prev) => {
      const filtered = prev.filter((c) => c.id !== newCreator.id);
      return [newCreator, ...filtered];
    });

    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        title: newCreator.title,
        bio: newCreator.bio,
        rate: newCreator.rate,
        startingProjectRate: newCreator.startingProjectRate,
        isPortfolioGenerated: true,
        ranking: newCreator.ranking,
      });
    }
  };

  const handlePublishCreator = (newCreator: Creator) => {
    setCreators((prev) => [newCreator, ...prev]);
    setActiveTab('explore');
  };

  const handleAddOpportunity = (newOpp: ProjectOpportunity) => {
    setOpportunities((prev) => [newOpp, ...prev]);
    setActiveTab('opportunities');
  };

  const handleSubmitInquiry = (newInquiry: CollaborationRequest) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleSelectPackageForInquiry = (creator: Creator, pkg?: CreatorPackage) => {
    setCollabModal({
      isOpen: true,
      creator,
      selectedPackage: pkg,
    });
  };

  const handleOpenCollabModal = (creator: Creator, brief?: string, budget?: string) => {
    setCollabModal({
      isOpen: true,
      creator,
      prefilledBrief: brief,
      prefilledBudget: budget,
    });
  };

  return (
    <div className="min-h-screen bg-[#06141B] text-[#CCD0CF] flex flex-col font-sans selection:bg-[#253745] selection:text-[#CCD0CF]">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPostProject={() => setIsPostProjectOpen(true)}
        onOpenCreatorStudio={() => setIsCreatorStudioOpen(true)}
        onOpenDataSources={() => setIsDataSourcesModalOpen(true)}
        onOpenSecurityCenter={() => setIsSecurityCenterOpen(true)}
        inquiriesCount={inquiries.length}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* STARTING INTERFACE: Shows 'I Have a Skill' & 'I Need a Service' */}
        {activeTab === 'gateway' && (
          <>
            <StartingGateway
              onSelectCreatorPath={() => setActiveTab('creator_hub')}
              onSelectClientPath={() => setActiveTab('client_chat')}
              creatorsCount={creators.length}
            />

            {/* Curated Roster Showcase below gateway */}
            <div className="py-2 border-t border-[#253745]">
              <CreatorDirectory
                creators={creators}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onSelectCreator={(c) => setDetailModalCreator(c)}
                onRequestCollaboration={(c) => handleOpenCollabModal(c)}
              />
            </div>

            <HowItWorks
              onStartMatching={() => setActiveTab('client_chat')}
              onOpenCreatorStudio={() => setActiveTab('creator_hub')}
            />
          </>
        )}

        {/* CREATOR PORTAL: 'I Have a Skill' */}
        {activeTab === 'creator_hub' && (
          <CreatorSkillHub
            currentUser={currentUser}
            onLogin={handleLoginCreator}
            onLogout={handleLogoutCreator}
            onStoreNewPortfolio={handleStoreNewPortfolio}
            onBrowseMarketplace={() => setActiveTab('explore')}
            onOpenDataSources={() => setIsDataSourcesModalOpen(true)}
          />
        )}

        {/* CLIENT SERVICE CHATBOX: 'I Need a Service' */}
        {activeTab === 'client_chat' && (
          <ClientServiceChatbox
            creators={creators}
            onSelectCreator={(c) => setDetailModalCreator(c)}
            onRequestCollaboration={(c, brief, budget) => handleOpenCollabModal(c, brief, budget)}
          />
        )}

        {/* EXPLORE CREATORS CATALOG */}
        {activeTab === 'explore' && (
          <>
            <HeroSection
              onStartAIMatch={() => setActiveTab('client_chat')}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              selectedCategory={selectedCategory}
            />

            <div className="py-2">
              <CreatorDirectory
                creators={creators}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onSelectCreator={(c) => setDetailModalCreator(c)}
                onRequestCollaboration={(c) => handleOpenCollabModal(c)}
              />
            </div>

            <HowItWorks
              onStartMatching={() => setActiveTab('client_chat')}
              onOpenCreatorStudio={() => setActiveTab('creator_hub')}
            />
          </>
        )}

        {/* AI SMART MATCH ENGINE */}
        {activeTab === 'aimatch' && (
          <AIMatchEngine
            creators={creators}
            onSelectCreator={(c) => setDetailModalCreator(c)}
            onRequestCollaboration={(c) => handleOpenCollabModal(c)}
          />
        )}

        {/* OPPORTUNITIES BOARD */}
        {activeTab === 'opportunities' && (
          <OpportunitiesBoard
            opportunities={opportunities}
            onOpenPostProject={() => setIsPostProjectOpen(true)}
          />
        )}

        {/* HOW IT WORKS */}
        {activeTab === 'howitworks' && (
          <HowItWorks
            onStartMatching={() => setActiveTab('client_chat')}
            onOpenCreatorStudio={() => setActiveTab('creator_hub')}
          />
        )}

        {/* ACTIVE INQUIRIES PIPELINE */}
        {activeTab === 'inquiries' && (
          <InquiriesList
            inquiries={inquiries}
            onStartNewInquiry={() => setActiveTab('explore')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('explore');
        }}
        onOpenCreatorStudio={() => setActiveTab('creator_hub')}
        onOpenPostProject={() => setIsPostProjectOpen(true)}
        onOpenDataSources={() => setIsDataSourcesModalOpen(true)}
      />

      {/* Modals */}
      <CreatorDetailModal
        creator={detailModalCreator}
        onClose={() => setDetailModalCreator(null)}
        onSelectPackageForInquiry={handleSelectPackageForInquiry}
      />

      <CreatorStudioModal
        isOpen={isCreatorStudioOpen}
        onClose={() => setIsCreatorStudioOpen(false)}
        onPublishCreator={handlePublishCreator}
      />

      <PostProjectModal
        isOpen={isPostProjectOpen}
        onClose={() => setIsPostProjectOpen(false)}
        onAddOpportunity={handleAddOpportunity}
      />

      <CollaborationModal
        isOpen={collabModal.isOpen}
        creator={collabModal.creator}
        selectedPackage={collabModal.selectedPackage}
        prefilledBrief={collabModal.prefilledBrief}
        prefilledBudget={collabModal.prefilledBudget}
        onClose={() => setCollabModal({ isOpen: false, creator: null })}
        onSubmitInquiry={handleSubmitInquiry}
      />

      <AIEvaluationDataSourcesModal
        isOpen={isDataSourcesModalOpen}
        onClose={() => setIsDataSourcesModalOpen(false)}
      />

      <SecurityTrustCenterModal
        isOpen={isSecurityCenterOpen}
        onClose={() => setIsSecurityCenterOpen(false)}
        onOpenReportAbuse={(id, name) => {
          setIsSecurityCenterOpen(false);
          setReportModalData({
            isOpen: true,
            targetId: id,
            targetName: name,
            targetType: 'creator',
          });
        }}
      />

      <ReportAbuseModal
        isOpen={reportModalData.isOpen}
        targetId={reportModalData.targetId}
        targetName={reportModalData.targetName}
        targetType={reportModalData.targetType}
        onClose={() => setReportModalData((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
