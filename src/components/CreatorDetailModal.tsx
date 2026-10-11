import React, { useEffect } from 'react';
import { X, Star, ShieldCheck, MapPin, Wrench, CheckCircle2, Send, ArrowRight } from 'lucide-react';
import { Creator, CreatorPackage } from '../types';

interface CreatorDetailModalProps {
  creator: Creator | null;
  onClose: () => void;
  onSelectPackageForInquiry: (creator: Creator, pkg?: CreatorPackage) => void;
}

export const CreatorDetailModal: React.FC<CreatorDetailModalProps> = ({
  creator,
  onClose,
  onSelectPackageForInquiry,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!creator) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#11212D] border border-[#253745] rounded-xl shadow-2xl my-8 overflow-hidden text-[#CCD0CF]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 border-b border-[#253745] bg-[#06141B]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#9BA8AB] font-mono">
              Creator Profile & Showcase
            </span>
            <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
            <span className="text-xs text-[#CCD0CF] font-medium">{creator.disciplineLabel}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9BA8AB] hover:text-[#CCD0CF] bg-[#11212D] hover:bg-[#253745] rounded border border-[#253745] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Header Profile Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#253745]">
            <div className="flex items-center gap-4">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-16 h-16 rounded-xl object-cover border border-[#253745] shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#CCD0CF]">
                    {creator.name}
                  </h2>
                  {creator.verified && (
                    <ShieldCheck className="w-5 h-5 text-[#9BA8AB]" />
                  )}
                </div>
                <p className="text-xs text-[#9BA8AB] mt-0.5 font-medium">
                  {creator.title}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#9BA8AB] mt-1.5 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#4A5C6A]" />
                    {creator.location}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{creator.experienceYears} Years Exp</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#CCD0CF]">{creator.availability}</span>
                </div>
              </div>
            </div>

            {/* Quick Rates & Rating */}
            <div className="bg-[#06141B] border border-[#253745] rounded-lg p-3.5 sm:text-right shrink-0">
              <div className="text-xs text-[#9BA8AB]">Hourly Production Rate</div>
              <div className="font-mono tabular-nums text-2xl font-bold text-[#CCD0CF]">
                ${creator.rate}
                <span className="text-xs font-normal text-[#9BA8AB]">/hr</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-xs text-[#9BA8AB] mt-1 font-mono">
                <Star className="w-3.5 h-3.5 fill-current text-[#CCD0CF]" />
                <span className="font-semibold text-[#CCD0CF]">{creator.rating}</span>
                <span>({creator.completedProjects} projects finished)</span>
              </div>
            </div>
          </div>

          {/* About & Craft Philosophy */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#9BA8AB] font-semibold mb-2">
              Background & Creative Philosophy
            </h3>
            <p className="text-sm text-[#CCD0CF] leading-relaxed whitespace-pre-line">
              {creator.bio}
            </p>
          </div>

          {/* Software, Gear & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#06141B] p-5 rounded-xl border border-[#253745]">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#9BA8AB] font-semibold mb-3 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-[#CCD0CF]" />
                <span>Production Tools & Software Stack</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {creator.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#11212D] text-[#CCD0CF] px-2.5 py-1 rounded border border-[#253745] font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#9BA8AB] font-semibold mb-3">
                Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {creator.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#11212D] text-[#CCD0CF] px-2.5 py-1 rounded border border-[#253745]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio & Case Studies Showcase */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-wider text-[#9BA8AB] font-semibold">
                Featured Portfolio & Case Studies
              </h3>
              <span className="text-xs font-mono text-[#9BA8AB]">
                {creator.portfolioItems.length} Master Deliverables
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creator.portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#06141B] border border-[#253745] rounded-xl overflow-hidden group shadow-sm flex flex-col justify-between"
                >
                  {item.imageUrl && (
                    <div className="aspect-16/10 overflow-hidden relative border-b border-[#253745]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-[#11212D]/90 backdrop-blur-xs text-[10px] font-mono text-[#CCD0CF] px-2 py-0.5 rounded border border-[#253745]">
                        {item.category}
                      </div>
                    </div>
                  )}

                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-bold text-[#CCD0CF]">{item.title}</h4>
                    <p className="text-xs text-[#9BA8AB] leading-relaxed">{item.description}</p>
                    
                    <div className="pt-2 border-t border-[#253745]/60 flex items-center justify-between text-[11px] font-mono text-[#9BA8AB]">
                      {item.client && <span>Client: {item.client}</span>}
                      {item.metrics && <span className="text-[#CCD0CF]">{item.metrics}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tiered Service Packages */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#9BA8AB] font-semibold mb-4">
              Standard Service Packages
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {creator.packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className="bg-[#06141B] border border-[#253745] hover:border-[#4A5C6A] rounded-xl p-4 flex flex-col justify-between transition-colors shadow-xs"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#CCD0CF] uppercase tracking-wider mb-1">
                      {pkg.title}
                    </div>
                    <div className="font-mono tabular-nums text-xl font-bold text-[#CCD0CF] mb-1">
                      {pkg.rate}
                    </div>
                    <div className="text-[11px] text-[#9BA8AB] font-mono mb-3">
                      Est. Turnaround: {pkg.turnaround}
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-[#253745]/80 mb-4">
                      {pkg.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-xs text-[#9BA8AB]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                          <span className="leading-snug">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectPackageForInquiry(creator, pkg);
                    }}
                    className="w-full py-2 text-xs font-medium bg-[#11212D] hover:bg-[#253745] text-[#CCD0CF] rounded border border-[#253745] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Request This Tier</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Client Reviews */}
          {creator.reviews && creator.reviews.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#9BA8AB] font-semibold mb-3">
                Verified Client Reviews
              </h3>
              <div className="space-y-3">
                {creator.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-[#06141B] border border-[#253745] rounded-lg p-4 text-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#CCD0CF]">{rev.clientName}</span>
                        <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
                        <span className="text-[#9BA8AB]">{rev.role}, {rev.company}</span>
                        {rev.verifiedContractId && (
                          <span className="text-[10px] font-mono text-[#CCD0CF] bg-[#11212D] border border-[#253745] px-1.5 py-0.5 rounded flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-[#CCD0CF]" />
                            <span>Verified Contract {rev.verifiedContractId}</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[#CCD0CF]">
                        <Star className="w-3 h-3 fill-current text-[#CCD0CF]" />
                        <span className="font-mono">{rev.rating}.0</span>
                      </div>
                    </div>
                    {rev.verifiedMilestoneTier && (
                      <div className="text-[10px] font-mono text-[#9BA8AB] mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#CCD0CF]" />
                        <span>Escrow Completed: {rev.verifiedMilestoneTier}</span>
                      </div>
                    )}
                    <p className="text-[#9BA8AB] leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="p-5 border-t border-[#253745] bg-[#06141B] flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-[#9BA8AB]">
            <span className="font-semibold text-[#CCD0CF]">Starting at ${creator.startingProjectRate}</span> · Available for custom scoped contracts
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#9BA8AB] hover:text-[#CCD0CF] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectPackageForInquiry(creator);
              }}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-[#06141B] bg-[#CCD0CF] hover:bg-white rounded transition-colors cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Initiate Collaboration Request</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
