import React, { useState } from 'react';
import { Search, Star, ExternalLink, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import { Creator, CreatorDiscipline } from '../types';

interface CreatorDirectoryProps {
  creators: Creator[];
  selectedCategory: CreatorDiscipline | 'all';
  onSelectCategory: (category: CreatorDiscipline | 'all') => void;
  onSelectCreator: (creator: Creator) => void;
  onRequestCollaboration: (creator: Creator) => void;
}

export const CreatorDirectory: React.FC<CreatorDirectoryProps> = ({
  creators,
  selectedCategory,
  onSelectCategory,
  onSelectCreator,
  onRequestCollaboration,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available_now'>('all');
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(150);

  const filteredCreators = creators.filter((creator) => {
    // Category match
    if (selectedCategory !== 'all' && creator.discipline !== selectedCategory) {
      return false;
    }
    // Availability match
    if (availabilityFilter === 'available_now' && creator.availability !== 'Available Now') {
      return false;
    }
    // Rate filter
    if (creator.rate > maxHourlyRate) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = creator.name.toLowerCase().includes(q);
      const matchTitle = creator.title.toLowerCase().includes(q);
      const matchSkills = creator.skills.some((s) => s.toLowerCase().includes(q));
      const matchTools = creator.tools.some((t) => t.toLowerCase().includes(q));
      return matchName || matchTitle || matchSkills || matchTools;
    }
    return true;
  });

  return (
    <section id="creator-catalog" className="py-12 bg-[#06141B] border-b border-[#253745]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#9BA8AB] font-medium mb-1">
              Curated Talent Roster
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#CCD0CF]">
              Discover Vetted Content Specialists
            </h2>
            <p className="text-sm text-[#9BA8AB] mt-1">
              Filter by technical skillset, past client showreels, and verified rates.
            </p>
          </div>

          {/* Quick Stats or Availability Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setAvailabilityFilter(availabilityFilter === 'all' ? 'available_now' : 'all')
              }
              className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer ${
                availabilityFilter === 'available_now'
                  ? 'bg-[#253745] text-[#CCD0CF] border-[#4A5C6A]'
                  : 'bg-[#11212D] text-[#9BA8AB] border-[#253745] hover:text-[#CCD0CF]'
              }`}
            >
              {availabilityFilter === 'available_now'
                ? 'Showing: Ready Now Only'
                : 'Filter: Ready Now Only'}
            </button>

            <span className="text-xs font-mono tabular-nums text-[#9BA8AB]">
              {filteredCreators.length} Available
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#11212D] border border-[#253745] rounded-xl p-4 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#4A5C6A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skill (e.g. DaVinci, Leica, Figma, Screenplay, UGC)..."
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 pl-9 text-xs text-[#CCD0CF] placeholder-[#4A5C6A] focus:outline-none focus:border-[#9BA8AB]"
              />
            </div>

            {/* Discipline Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value as any)}
                aria-label="Filter creators by creative discipline"
                className="w-full bg-[#06141B] border border-[#253745] rounded p-2.5 text-xs text-[#CCD0CF] focus:outline-none focus:border-[#9BA8AB]"
              >
                <option value="all">All Disciplines</option>
                <option value="video_editor">Video Editors</option>
                <option value="photographer">Photographers</option>
                <option value="graphic_designer">Graphic Designers</option>
                <option value="social_creator">Social Media Creators</option>
                <option value="scriptwriter">Scriptwriters</option>
              </select>
            </div>

            {/* Max Hourly Rate Slider */}
            <div className="md:col-span-3 flex items-center gap-3">
              <span className="text-xs text-[#9BA8AB] whitespace-nowrap">
                Max: <strong className="font-mono tabular-nums text-[#CCD0CF]">${maxHourlyRate}/hr</strong>
              </span>
              <input
                type="range"
                min="60"
                max="150"
                step="5"
                value={maxHourlyRate}
                onChange={(e) => setMaxHourlyRate(Number(e.target.value))}
                aria-label="Filter creators by maximum hourly rate"
                className="w-full accent-[#CCD0CF] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Creators Grid (3-column on desktop) */}
        {filteredCreators.length === 0 ? (
          <div className="text-center py-16 bg-[#11212D] rounded-xl border border-[#253745]">
            <Filter className="w-8 h-8 text-[#4A5C6A] mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[#CCD0CF] mb-1">No Creators Found</h3>
            <p className="text-xs text-[#9BA8AB] max-w-sm mx-auto mb-4">
              Try adjusting your search query, increasing your hourly rate limit, or resetting the discipline filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
                setAvailabilityFilter('all');
                setMaxHourlyRate(150);
              }}
              className="px-4 py-2 text-xs bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] rounded transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => {
              const topItem = creator.portfolioItems[0];

              return (
                <div
                  key={creator.id}
                  className="bg-[#11212D] border border-[#253745] hover:border-[#4A5C6A] rounded-xl overflow-hidden flex flex-col justify-between transition-all group shadow-sm"
                >
                  <div>
                    {/* Media Thumbnail Showcase */}
                    <div className="relative aspect-16/10 bg-[#06141B] overflow-hidden border-b border-[#253745]">
                      {creator.coverImage || topItem?.imageUrl ? (
                        <img
                          src={creator.coverImage || topItem?.imageUrl}
                          alt={topItem?.title || creator.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#06141B] text-xs text-[#4A5C6A]">
                          Portfolio Master
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11212D] via-transparent to-transparent opacity-80" />

                      {/* Discipline Badge overlay */}
                      <div className="absolute top-3 left-3 bg-[#06141B]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-medium text-[#CCD0CF] border border-[#253745]">
                        {creator.disciplineLabel}
                      </div>

                      {/* Availability Tag */}
                      <div className="absolute top-3 right-3 bg-[#11212D]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-[#CCD0CF] border border-[#253745]">
                        {creator.availability}
                      </div>
                    </div>

                    {/* Creator Identity Header */}
                    <div className="p-5 pb-3">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-11 h-11 rounded-lg object-cover border border-[#253745] shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-bold text-[#CCD0CF] truncate leading-tight">
                              {creator.name}
                            </h3>
                            {creator.verified && (
                              <ShieldCheck className="w-4 h-4 text-[#9BA8AB] shrink-0" />
                            )}
                          </div>
                          <span className="text-xs text-[#9BA8AB] truncate block">
                            {creator.location} · {creator.experienceYears}y exp
                          </span>
                        </div>
                      </div>

                      <h4 className="text-xs font-medium text-[#CCD0CF] mb-1.5 line-clamp-1">
                        {creator.title}
                      </h4>

                      <p className="text-xs text-[#9BA8AB] leading-relaxed line-clamp-2 mb-4">
                        {creator.bio}
                      </p>

                      {/* Unboxed Metadata with Typographic Separator */}
                      <div className="flex items-center gap-2 text-xs text-[#9BA8AB] font-mono mb-4 pt-3 border-t border-[#253745]/60">
                        <span className="tabular-nums font-bold text-[#CCD0CF]">
                          ${creator.rate}/hr
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Starts at ${creator.startingProjectRate}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 text-[#CCD0CF]">
                          <Star className="w-3 h-3 fill-current text-[#CCD0CF]" />
                          <span className="tabular-nums">{creator.rating}</span>
                          <span className="text-[#9BA8AB]">({creator.completedProjects})</span>
                        </span>
                      </div>

                      {/* Skills clean list */}
                      <div className="flex flex-wrap gap-1.5">
                        {creator.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-[#06141B] px-2 py-0.5 rounded text-[#9BA8AB] border border-[#253745]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 pt-3 border-t border-[#253745] flex items-center justify-between gap-3 bg-[#11212D]/50">
                    <button
                      onClick={() => onSelectCreator(creator)}
                      className="flex items-center gap-1.5 text-xs text-[#9BA8AB] hover:text-[#CCD0CF] transition-colors cursor-pointer py-1"
                    >
                      <span>View Showreel</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => onRequestCollaboration(creator)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#06141B] bg-[#CCD0CF] hover:bg-white rounded transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
