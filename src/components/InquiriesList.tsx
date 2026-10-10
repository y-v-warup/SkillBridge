import React from 'react';
import { Send, Clock, DollarSign, Calendar, CheckCircle2, User } from 'lucide-react';
import { CollaborationRequest } from '../types';

interface InquiriesListProps {
  inquiries: CollaborationRequest[];
  onStartNewInquiry: () => void;
}

export const InquiriesList: React.FC<InquiriesListProps> = ({
  inquiries,
  onStartNewInquiry,
}) => {
  return (
    <section className="py-12 bg-[#06141B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#9BA8AB] font-medium mb-1">
            Collaboration Pipeline
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#CCD0CF]">
            Your Active Project Inquiries ({inquiries.length})
          </h2>
          <p className="text-sm text-[#9BA8AB] mt-1">
            Track status, negotiated rates, and incoming review responses from creators.
          </p>
        </div>

        <button
          onClick={onStartNewInquiry}
          className="px-4 py-2 text-xs font-semibold bg-[#CCD0CF] hover:bg-white text-[#06141B] rounded transition-colors cursor-pointer"
        >
          Discover More Creators
        </button>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-[#11212D] border border-[#253745] rounded-xl p-12 text-center">
          <Send className="w-8 h-8 text-[#4A5C6A] mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#CCD0CF] mb-1">No Active Inquiries Yet</h3>
          <p className="text-xs text-[#9BA8AB] max-w-sm mx-auto mb-4">
            Browse our vetted creators or use AI Smart Match to dispatch your first project brief.
          </p>
          <button
            onClick={onStartNewInquiry}
            className="px-4 py-2 text-xs bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] rounded transition-colors cursor-pointer"
          >
            Explore Creator Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-[#11212D] border border-[#253745] rounded-xl p-5 sm:p-6 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#9BA8AB]">
                    <span className="font-semibold text-[#CCD0CF]">To: {inq.creatorName}</span>
                    <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
                    <span>Sent on {inq.timestamp}</span>
                    {inq.selectedPackage && (
                      <>
                        <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
                        <span className="text-[#CCD0CF]">Package: {inq.selectedPackage}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#CCD0CF]">{inq.projectTitle}</h3>
                  <p className="text-xs text-[#9BA8AB] line-clamp-2 max-w-2xl leading-relaxed">
                    {inq.projectBrief}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#9BA8AB] pt-2">
                    <span className="flex items-center gap-1 text-[#CCD0CF]">
                      <DollarSign className="w-3.5 h-3.5 text-[#4A5C6A]" />
                      Budget: {inq.budget}
                    </span>
                    <span aria-hidden="true" className="text-[#4A5C6A]">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#4A5C6A]" />
                      Timeline: {inq.timeline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="bg-[#06141B] px-3 py-1.5 rounded border border-[#253745] text-xs font-mono text-[#CCD0CF] flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#9BA8AB]" />
                    <span>{inq.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
