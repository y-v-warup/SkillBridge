import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  FileCheck,
  KeyRound,
  Eye,
  MailCheck,
  AlertTriangle,
  Scale,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  FileCode,
  ShieldAlert,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { EscrowContract } from '../types';

interface SecurityTrustCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReportAbuse: (targetId: string, targetName: string) => void;
}

export const SecurityTrustCenterModal: React.FC<SecurityTrustCenterModalProps> = ({
  isOpen,
  onClose,
  onOpenReportAbuse,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'uploads' | 'escrow' | 'verification' | 'fraud'>('overview');

  // Interactive Upload Validation Test
  const [testFileName, setTestFileName] = useState('exploit_script.exe');
  const [uploadTestResult, setUploadTestResult] = useState<any | null>(null);
  const [isTestingUpload, setIsTestingUpload] = useState(false);

  // Interactive Email Verification Test
  const [verifyEmail, setVerifyEmail] = useState('creator@studio.com');
  const [demoCode, setDemoCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  // Interactive Escrow Simulation
  const [escrowContract, setEscrowContract] = useState<EscrowContract>({
    id: 'esc-demo-1049',
    projectTitle: 'Commercial Anamorphic Brand Anthem Finishing',
    creatorId: 'cr-1',
    creatorName: 'Marcus Vance',
    clientEmail: 'client@studio.com',
    totalAmount: 3200,
    status: 'Funded',
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Creative Brief & Initial Cut (30%)',
        amount: 960,
        percentage: 30,
        status: 'Released',
      },
      {
        id: 'm2',
        title: 'Milestone 2: Master Grading, Sound Mix & Revision (40%)',
        amount: 1280,
        percentage: 40,
        status: 'In Escrow',
      },
      {
        id: 'm3',
        title: 'Milestone 3: Final 4K ProRes & Stem Archive (30%)',
        amount: 960,
        percentage: 30,
        status: 'In Escrow',
      },
    ],
  });
  const [disputeReason, setDisputeReason] = useState('');
  const [isDisputing, setIsDisputing] = useState(false);

  // Interactive Fraud Scanner Test
  const [scanTitle, setScanTitle] = useState('Fast 4K Commercial Grade');
  const [scanDescription, setScanDescription] = useState('Specialized color science. Contact me on WhatsApp or Telegram to pay outside platform for a discount.');
  const [fraudResult, setFraudResult] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleTestUpload = async (fileToTest: string) => {
    setIsTestingUpload(true);
    setUploadTestResult(null);
    try {
      const res = await fetch('/api/security/validate-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: fileToTest, fileSize: 1024 * 1024 }),
      });
      const data = await res.json();
      setUploadTestResult(data);
    } catch (e: any) {
      setUploadTestResult({ success: false, error: e.message });
    } finally {
      setIsTestingUpload(false);
    }
  };

  const handleRequestEmailCode = async () => {
    setEmailStatus('Requesting verification code...');
    try {
      const res = await fetch('/api/security/request-email-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verifyEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setDemoCode(data.demoCode);
        setInputCode(data.demoCode);
        setEmailStatus(`Code ${data.demoCode} dispatched. Blocked disposable domains check passed.`);
      } else {
        setEmailStatus(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setEmailStatus(`Failed: ${e.message}`);
    }
  };

  const handleConfirmCode = async () => {
    try {
      const res = await fetch('/api/security/confirm-email-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verifyEmail, code: inputCode }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailStatus('Verified! Account granted Verified Creator ID.');
      } else {
        setEmailStatus(`Failed: ${data.error}`);
      }
    } catch (e: any) {
      setEmailStatus(`Error: ${e.message}`);
    }
  };

  const handleReleaseMilestone = (milestoneId: string) => {
    setEscrowContract((prev) => {
      const updated = prev.milestones.map((m) =>
        m.id === milestoneId ? { ...m, status: 'Released' as const } : m
      );
      const allDone = updated.every((m) => m.status === 'Released');
      return {
        ...prev,
        milestones: updated,
        status: allDone ? 'Completed' : prev.status,
      };
    });
  };

  const handleRaiseDispute = () => {
    if (!disputeReason.trim()) return;
    setEscrowContract((prev) => ({
      ...prev,
      status: 'Disputed',
      disputeInfo: {
        raisedBy: 'Client Partner',
        reason: disputeReason,
        evidence: 'Uploaded raw deliverables missing color pass',
        raisedAt: 'Today',
      },
    }));
    setIsDisputing(false);
  };

  const handleRunFraudScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/security/fraud-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: scanTitle, description: scanDescription }),
      });
      const data = await res.json();
      setFraudResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#11212D] border border-[#253745] rounded-2xl shadow-2xl my-8 overflow-hidden text-[#CCD0CF]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#253745] bg-[#06141B]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#CCD0CF]">
                Trust, Security & Threat Mitigation Center
              </h2>
              <span className="text-[10px] text-[#9BA8AB] font-mono">
                P0, P1, and P2 Security Safeguards Active
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9BA8AB] hover:text-[#CCD0CF] bg-[#11212D] hover:bg-[#253745] rounded border border-[#253745] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#253745] bg-[#06141B]/60 px-5 gap-2 overflow-x-auto text-xs">
          {[
            { id: 'overview', label: 'Security Architecture' },
            { id: 'uploads', label: 'P0 Upload Sandbox' },
            { id: 'escrow', label: 'P2 Milestone Escrow' },
            { id: 'verification', label: 'P1 Verification & Reports' },
            { id: 'fraud', label: 'P2 Fraud & Plagiarism Scan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'border-[#CCD0CF] text-[#CCD0CF]'
                  : 'border-transparent text-[#9BA8AB] hover:text-[#CCD0CF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#CCD0CF]">
                  Multi-Layer Threat Mitigation Matrix
                </h3>
                <p className="text-xs text-[#9BA8AB] mt-1 leading-relaxed">
                  Every transaction, upload, AI match, and review is protected by defense-in-depth measures to eliminate malicious payloads, credential leakage, fraud, and payment disputes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* P0 Category */}
                <div className="bg-[#06141B] border border-rose-900/50 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                      P0 Critical
                    </span>
                    <Lock className="w-4 h-4 text-rose-400" />
                  </div>
                  <h4 className="text-xs font-bold text-[#CCD0CF]">Platform Integrity</h4>
                  <ul className="text-xs text-[#9BA8AB] space-y-2">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span><strong>Authentication & RBAC:</strong> Prevents unauthorized route/action access.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span><strong>Secure Portfolio Uploads:</strong> Whitelists safe media, blocks scripts/executables.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span><strong>API Key Isolation:</strong> Server-side proxy; keys never reach client bundles.</span>
                    </li>
                  </ul>
                </div>

                {/* P1 Category */}
                <div className="bg-[#06141B] border border-amber-900/50 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                      P1 High Trust
                    </span>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="text-xs font-bold text-[#CCD0CF]">Account & Data Safety</h4>
                  <ul className="text-xs text-[#9BA8AB] space-y-2">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Private File Storage:</strong> Granular access controls on master source stems.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Email Verification:</strong> Blocks disposable email domains & bots.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Verified Project Reviews:</strong> Only paid, delivered contracts can write reviews.</span>
                    </li>
                  </ul>
                </div>

                {/* P2 Category */}
                <div className="bg-[#06141B] border border-blue-900/50 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                      P2 Financial & AI
                    </span>
                    <Scale className="w-4 h-4 text-blue-400" />
                  </div>
                  <h4 className="text-xs font-bold text-[#CCD0CF]">Escrow & Anti-Fraud</h4>
                  <ul className="text-xs text-[#9BA8AB] space-y-2">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>Milestone Escrow:</strong> Funds held safely until client approves stems.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>Dispute Mediation:</strong> Evidence filing & frozen escrow resolution.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>AI Output Validation:</strong> Neutralizes prompt injections & schema tampering.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB: UPLOAD SANDBOX */}
          {activeTab === 'uploads' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#CCD0CF]">
                  P0 Secure Portfolio Upload Sandbox
                </h3>
                <p className="text-xs text-[#9BA8AB] mt-1">
                  Protects both the platform and clients from malware, script execution, and path traversal. Only verified media extensions are permitted.
                </p>
              </div>

              <div className="bg-[#06141B] p-5 rounded-xl border border-[#253745] space-y-4">
                <span className="text-xs font-semibold text-[#CCD0CF] uppercase tracking-wider block">
                  Interactive Upload Security Shield Tester
                </span>

                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    'exploit_payload.exe',
                    'malicious_backdoor.sh',
                    'trojan_archive.php',
                    'clean_brand_master.mov',
                    'high_res_photo.jpg',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setTestFileName(preset);
                        handleTestUpload(preset);
                      }}
                      className="px-2.5 py-1 bg-[#11212D] hover:bg-[#253745] rounded border border-[#253745] text-xs font-mono cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testFileName}
                    onChange={(e) => setTestFileName(e.target.value)}
                    placeholder="Enter filename to test security validation..."
                    className="flex-1 bg-[#11212D] border border-[#253745] rounded p-2 text-xs font-mono text-[#CCD0CF]"
                  />
                  <button
                    onClick={() => handleTestUpload(testFileName)}
                    disabled={isTestingUpload}
                    className="px-4 py-2 bg-[#CCD0CF] text-[#06141B] rounded text-xs font-bold cursor-pointer"
                  >
                    {isTestingUpload ? 'Testing...' : 'Test File Validation'}
                  </button>
                </div>

                {uploadTestResult && (
                  <div
                    className={`p-3 rounded border text-xs font-mono ${
                      uploadTestResult.success
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-800 text-rose-300'
                    }`}
                  >
                    {uploadTestResult.success ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>PASSED: File "{uploadTestResult.sanitizedName}" permitted. Path traversal & executable checks clear.</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>BLOCKED: {uploadTestResult.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: ESCROW & DISPUTES */}
          {activeTab === 'escrow' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#CCD0CF]">
                  P2 Milestone Payments & Escrow Dispute Handling
                </h3>
                <p className="text-xs text-[#9BA8AB] mt-1">
                  Protects both creator and client financially. Funds are held in escrow and released only upon deliverable sign-off.
                </p>
              </div>

              {/* Escrow Contract Card */}
              <div className="bg-[#06141B] p-5 rounded-xl border border-[#253745] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#253745]">
                  <div>
                    <span className="text-[10px] font-mono text-[#9BA8AB] uppercase">Contract #{escrowContract.id}</span>
                    <h4 className="text-sm font-bold text-[#CCD0CF]">{escrowContract.projectTitle}</h4>
                    <span className="text-xs text-[#9BA8AB]">Creator: {escrowContract.creatorName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#9BA8AB]">Total Escrow</span>
                    <div className="text-base font-mono font-bold text-[#CCD0CF]">${escrowContract.totalAmount}</div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      escrowContract.status === 'Disputed'
                        ? 'bg-rose-950 border-rose-800 text-rose-400'
                        : 'bg-emerald-950 border-emerald-800 text-emerald-400'
                    }`}>
                      {escrowContract.status}
                    </span>
                  </div>
                </div>

                {/* Milestone List */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#CCD0CF]">Milestone Payment Schedule</span>
                  {escrowContract.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="bg-[#11212D] border border-[#253745] p-3 rounded-lg flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-[#CCD0CF]">{m.title}</div>
                        <span className="text-[11px] font-mono text-[#9BA8AB]">${m.amount} USD ({m.percentage}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                            m.status === 'Released'
                              ? 'bg-emerald-900/60 text-emerald-300'
                              : 'bg-blue-900/60 text-blue-300'
                          }`}
                        >
                          {m.status}
                        </span>
                        {m.status === 'In Escrow' && (
                          <button
                            onClick={() => handleReleaseMilestone(m.id)}
                            className="px-2.5 py-1 text-[11px] font-semibold bg-[#CCD0CF] text-[#06141B] rounded cursor-pointer"
                          >
                            Approve & Release
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dispute Section */}
                {escrowContract.status === 'Disputed' ? (
                  <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Escrow Frozen for Mediation</span>
                    </div>
                    <p className="text-rose-200">
                      Reason: {escrowContract.disputeInfo?.reason}
                    </p>
                    <span className="text-[10px] text-rose-400 font-mono block">
                      Evidence attached · Mediators resolve contracts within 48 hours.
                    </span>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[#9BA8AB]">Have an issue with deliverable specs?</span>
                    <button
                      onClick={() => setIsDisputing(true)}
                      className="text-rose-400 hover:underline cursor-pointer font-medium"
                    >
                      Raise Milestone Dispute / Mediation
                    </button>
                  </div>
                )}

                {/* Dispute Input Drawer */}
                {isDisputing && (
                  <div className="p-3 bg-[#11212D] border border-rose-800 rounded-lg space-y-2">
                    <label className="block text-xs font-semibold text-rose-300">
                      Explain Non-Compliance with Project Brief:
                    </label>
                    <textarea
                      rows={2}
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      placeholder="e.g. Creator did not deliver the agreed RAW audio stems or missed revision specifications..."
                      className="w-full bg-[#06141B] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsDisputing(false)}
                        className="px-2.5 py-1 text-xs text-[#9BA8AB]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleRaiseDispute}
                        className="px-3 py-1 bg-rose-400 text-black font-semibold text-xs rounded"
                      >
                        Submit Dispute & Freeze Funds
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: VERIFICATION & REPORTS */}
          {activeTab === 'verification' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#CCD0CF]">
                  P1 Email Verification & Abuse Reporting
                </h3>
                <p className="text-xs text-[#9BA8AB] mt-1">
                  Stops fake profiles, bots, and disposable email registrations. Allows instantaneous flagging of stolen portfolios.
                </p>
              </div>

              <div className="bg-[#06141B] p-5 rounded-xl border border-[#253745] space-y-4">
                <span className="text-xs font-semibold text-[#CCD0CF] uppercase tracking-wider block">
                  Email Verification Shield Tester
                </span>

                <div className="flex gap-2">
                  <input
                    type="email"
                    value={verifyEmail}
                    onChange={(e) => setVerifyEmail(e.target.value)}
                    placeholder="Enter email to verify..."
                    className="flex-1 bg-[#11212D] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF]"
                  />
                  <button
                    onClick={handleRequestEmailCode}
                    className="px-3 py-2 bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] rounded text-xs font-medium cursor-pointer"
                  >
                    Request Code
                  </button>
                </div>

                {demoCode && (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="w-32 bg-[#11212D] border border-[#253745] rounded p-2 text-xs font-mono text-[#CCD0CF]"
                    />
                    <button
                      onClick={handleConfirmCode}
                      className="px-3 py-2 bg-emerald-400 text-black rounded text-xs font-bold cursor-pointer"
                    >
                      Confirm Code
                    </button>
                  </div>
                )}

                {emailStatus && (
                  <div className="text-xs font-mono text-[#CCD0CF] bg-[#11212D] p-2.5 rounded border border-[#253745]">
                    {emailStatus}
                  </div>
                )}
              </div>

              {/* Report Abuse Trigger */}
              <div className="p-4 bg-[#11212D] rounded-xl border border-[#253745] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#CCD0CF]">Found Stolen Work or Fake Profile?</h4>
                  <p className="text-[11px] text-[#9BA8AB]">File a P1 Abuse Report for immediate investigation.</p>
                </div>
                <button
                  onClick={() => onOpenReportAbuse('cr-sample', 'Reported Creator')}
                  className="px-3 py-1.5 text-xs bg-rose-400/20 text-rose-300 border border-rose-800 rounded font-semibold hover:bg-rose-400/30 cursor-pointer"
                >
                  Open Report Dialog
                </button>
              </div>
            </div>
          )}

          {/* TAB: FRAUD SCANNER */}
          {activeTab === 'fraud' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#CCD0CF]">
                  P2 Advanced Fraud & Plagiarism Risk Scanner
                </h3>
                <p className="text-xs text-[#9BA8AB] mt-1">
                  Detects off-platform payment solicitations (WhatsApp, Telegram, Crypto), phishing links, and low-effort spam.
                </p>
              </div>

              <div className="bg-[#06141B] p-5 rounded-xl border border-[#253745] space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#9BA8AB] mb-1">Project / Portfolio Title</label>
                  <input
                    type="text"
                    value={scanTitle}
                    onChange={(e) => setScanTitle(e.target.value)}
                    className="w-full bg-[#11212D] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9BA8AB] mb-1">Description / Bid Proposal</label>
                  <textarea
                    rows={3}
                    value={scanDescription}
                    onChange={(e) => setScanDescription(e.target.value)}
                    className="w-full bg-[#11212D] border border-[#253745] rounded p-2 text-xs text-[#CCD0CF]"
                  />
                </div>

                <button
                  onClick={handleRunFraudScan}
                  disabled={isScanning}
                  className="px-4 py-2 bg-[#CCD0CF] text-[#06141B] font-bold text-xs rounded cursor-pointer"
                >
                  {isScanning ? 'Scanning...' : 'Run Automated Fraud & Compliance Scan'}
                </button>

                {fraudResult && (
                  <div className="p-4 bg-[#11212D] rounded-lg border border-[#253745] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#CCD0CF]">Risk Scan Verdict</span>
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          fraudResult.status === 'CLEARED'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {fraudResult.status} (Score: {fraudResult.riskScore}/100)
                      </span>
                    </div>

                    <div className="space-y-1">
                      {fraudResult.flags.map((flag: string, idx: number) => (
                        <div key={idx} className="text-xs text-[#9BA8AB] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF]" />
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#06141B] border-t border-[#253745] flex items-center justify-between text-xs">
          <span className="text-[#9BA8AB]">All security modules operate server-side with zero key exposure.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#CCD0CF] text-[#06141B] font-semibold rounded cursor-pointer"
          >
            Close Security Center
          </button>
        </div>
      </div>
    </div>
  );
};
