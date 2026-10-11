import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';

interface ReportAbuseModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId?: string;
  targetName?: string;
  targetType?: 'creator' | 'client' | 'project';
}

export const ReportAbuseModal: React.FC<ReportAbuseModalProps> = ({
  isOpen,
  onClose,
  targetId,
  targetName,
  targetType = 'creator',
}) => {
  if (!isOpen) return null;

  const [reason, setReason] = useState('plagiarism');
  const [details, setDetails] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/security/report-abuse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetId: targetId || 'unspecified_target',
          targetType,
          reason,
          details,
          reporterEmail,
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1600);
    } catch (err) {
      console.error('Error reporting abuse:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#11212D] border border-[#253745] rounded-xl shadow-2xl overflow-hidden text-[#CCD0CF]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#253745] bg-[#06141B]">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#CCD0CF]">
              Report Account or Content (P1 Abuse Shield)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9BA8AB] hover:text-[#CCD0CF] bg-[#11212D] rounded border border-[#253745] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-[#CCD0CF]">Report Logged for Audit</h4>
            <p className="text-xs text-[#9BA8AB]">
              Our Trust & Safety system has logged your report. The account and assets are flagged for manual review and plagiarism comparison.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-[#06141B] rounded border border-[#253745] text-xs">
              <span className="text-[#9BA8AB]">Target: </span>
              <strong className="text-[#CCD0CF]">{targetName || targetId || 'Reported Profile'}</strong>
              <span className="text-[#4A5C6A] block text-[10px] mt-0.5">
                Anonymous reports are reviewed within 4 hours by platform moderators.
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Violation Category
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
              >
                <option value="plagiarism">Plagiarism / Stolen Portfolio Work</option>
                <option value="off_platform_payment">Off-Platform Payment / Escrow Bypass</option>
                <option value="fake_account">Fake Account / Identity Impersonation</option>
                <option value="malicious_file">Malicious File or Link in Deliverable</option>
                <option value="unfulfilled_contract">Unfulfilled Paid Milestone</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Specific Evidence or Explanation
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe why this work or account violates terms (e.g. original artist link, unauthorized upload)..."
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] placeholder-[#4A5C6A] focus:outline-none focus:border-[#9BA8AB]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9BA8AB] mb-1.5">
                Your Contact Email (for report updates)
              </label>
              <input
                type="email"
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
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
                disabled={isSubmitting}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#06141B] bg-rose-300 hover:bg-rose-200 rounded cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Safety Report</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
