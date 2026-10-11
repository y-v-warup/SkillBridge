export type CreatorDiscipline = 
  | 'video_editor'
  | 'photographer'
  | 'graphic_designer'
  | 'social_creator'
  | 'scriptwriter';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description: string;
  client?: string;
  metrics?: string;
  featured?: boolean;
}

export interface CreatorPackage {
  title: string;
  rate: string;
  turnaround: string;
  deliverables: string[];
}

export interface CreatorReview {
  id: string;
  clientName: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  date: string;
  verifiedContractId?: string; // P1: Verified-project review
  verifiedMilestoneTier?: string; // e.g. "Milestone 3 Released: Master ProRes Delivery"
}

export interface Creator {
  id: string;
  name: string;
  discipline: CreatorDiscipline;
  disciplineLabel: string;
  title: string;
  tagline: string;
  location: string;
  experienceYears: number;
  rate: number; // hourly USD
  startingProjectRate: number; // minimum project USD
  availability: 'Available Now' | 'Booking Next Month' | 'Part-time' | '2 Slots Left';
  rating: number;
  completedProjects: number;
  verified: boolean;
  isEmailVerified?: boolean;
  avatar: string;
  coverImage?: string;
  bio: string;
  skills: string[];
  tools: string[];
  portfolioItems: PortfolioItem[];
  packages: CreatorPackage[];
  reviews: CreatorReview[];
  ranking?: {
    craftScore: number;
    rankTier: string;
    rankBadge: string;
    rankingRationale: string;
  };
}

export interface EscrowMilestone {
  id: string;
  title: string;
  amount: number;
  percentage: number;
  status: 'Pending' | 'In Escrow' | 'Released' | 'Disputed';
}

export interface EscrowContract {
  id: string;
  projectTitle: string;
  creatorId: string;
  creatorName: string;
  clientEmail: string;
  totalAmount: number;
  status: 'Draft' | 'Funded' | 'Disputed' | 'Completed';
  milestones: EscrowMilestone[];
  disputeInfo?: {
    raisedBy: string;
    reason: string;
    evidence: string;
    raisedAt: string;
  };
}

export interface UploadedWork {
  id: string;
  title: string;
  discipline: CreatorDiscipline;
  description: string;
  fileUrl?: string;
  fileName?: string;
  toolsUsed?: string;
  uploadedAt: string;
  aiAnalysis?: {
    craftScore: number;
    rankTier: string;
    rankBadge: string;
    detectedTechniques: string[];
    clientImpact: string;
    rationale: string;
  };
}

export interface CreatorAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  discipline: CreatorDiscipline;
  title?: string;
  bio?: string;
  rate?: number;
  startingProjectRate?: number;
  uploadedWorks: UploadedWork[];
  isPortfolioGenerated: boolean;
  ranking?: {
    craftScore: number;
    rankTier: string;
    rankBadge: string;
    rankingRationale: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  matchedCreatorIds?: string[];
  matchingReasons?: { creatorId: string; reason: string; }[];
}

export interface AIMatchAnalysis {
  clientNeedsSummary: string;
  identifiedDisciplines: string[];
  aestheticTone: string;
  timelineAssessment: string;
  budgetViability: string;
}

export interface AIMatchResult {
  creatorId: string;
  matchScore: number;
  whyGoodMatch: string;
  keyFitStrengths: string[];
  budgetVerdict: string;
  creator?: Creator;
}

export interface ProjectOpportunity {
  id: string;
  title: string;
  clientName: string;
  clientCompany: string;
  discipline: CreatorDiscipline;
  budget: string;
  deadline: string;
  postedDate: string;
  description: string;
  deliverables: string[];
  requiredSkills: string[];
  proposalsCount: number;
  urgency: 'Immediate' | 'Standard' | 'Flexible';
}

export interface CollaborationRequest {
  id: string;
  creatorId: string;
  creatorName: string;
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  projectBrief: string;
  budget: string;
  timeline: string;
  selectedPackage?: string;
  timestamp: string;
  status: 'Pending Creator Review' | 'Accepted' | 'In Discussion';
}
