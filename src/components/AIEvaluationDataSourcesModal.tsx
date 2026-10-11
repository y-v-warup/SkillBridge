import React from 'react';
import { X, Database, Eye, ShieldCheck, Film, Camera, Palette, Share2, PenTool, CheckCircle2, Cpu, BarChart3 } from 'lucide-react';

interface AIEvaluationDataSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIEvaluationDataSourcesModal: React.FC<AIEvaluationDataSourcesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#11212D] border border-[#253745] rounded-2xl shadow-2xl my-8 overflow-hidden text-[#CCD0CF]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 border-b border-[#253745] bg-[#06141B]">
          <div className="flex items-center gap-2.5">
            <Database className="w-4 h-4 text-[#CCD0CF]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#CCD0CF]">
              AI Evaluation Intelligence & Data Sources
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9BA8AB] hover:text-[#CCD0CF] bg-[#11212D] hover:bg-[#253745] rounded border border-[#253745] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Executive Overview */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#9BA8AB] block mb-1">
              How SkillBridge AI Evaluates Your Craft
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#CCD0CF]">
              Where Does the AI Gain Its Data to Grade & Rank Creative Work?
            </h3>
            <p className="text-xs sm:text-sm text-[#9BA8AB] leading-relaxed mt-2">
              SkillBridge AI evaluates video editors, photographers, graphic designers, social media creators, and scriptwriters through a triangulated three-tier intelligence framework: Multimodal Foundation Pretraining, Domain Industry Rubrics, and Live Market Calibration.
            </p>
          </div>

          {/* 3 Core Intelligence Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#06141B] border border-[#253745] rounded-xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#11212D] border border-[#253745] flex items-center justify-center text-[#CCD0CF]">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#CCD0CF]">
                1. Multimodal Foundation (Gemini 3.8 Flash)
              </h4>
              <p className="text-xs text-[#9BA8AB] leading-relaxed">
                Trained on billions of visual frames, audio waveforms, typography specimens, and narrative texts across world cinema, commercial advertising, and global literature.
              </p>
            </div>

            <div className="bg-[#06141B] border border-[#253745] rounded-xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#11212D] border border-[#253745] flex items-center justify-center text-[#CCD0CF]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#CCD0CF]">
                2. Domain Production Rubrics
              </h4>
              <p className="text-xs text-[#9BA8AB] leading-relaxed">
                Built-in commercial standards including ACES/Rec.709 color science, broadcast audio standards (-14 LUFS / EBU R128), print dieline tolerances, and screenplay beat sheets.
              </p>
            </div>

            <div className="bg-[#06141B] border border-[#253745] rounded-xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#11212D] border border-[#253745] flex items-center justify-center text-[#CCD0CF]">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#CCD0CF]">
                3. Live Market Calibration
              </h4>
              <p className="text-xs text-[#9BA8AB] leading-relaxed">
                Continuously adjusted against real client project reviews, budget clearance metrics, turnaround benchmarks, and active marketplace completion histories.
              </p>
            </div>
          </div>

          {/* Discipline-Specific Evaluation Rubrics */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#CCD0CF] mb-4">
              Discipline-Specific Benchmark Standards
            </h4>

            <div className="space-y-4">
              {/* Video Editors & Colorists */}
              <div className="bg-[#06141B] border border-[#253745] rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <Film className="w-4 h-4 text-[#CCD0CF]" />
                  <h5 className="text-sm font-bold text-[#CCD0CF]">
                    Video Editors & Colorists
                  </h5>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9BA8AB] pt-2 border-t border-[#253745]/60">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                    <span><strong>Color Science:</strong> ACES/DaVinci YRGB color management, skin tone vector alignment, gamut clipping protection, and black/white point calibration.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                    <span><strong>Pacing & Audio:</strong> Visual rhythm, scene transition latency, and sound stem mixing calibrated to broadcast loudness (-14 to -23 LUFS).</span>
                  </div>
                </div>
              </div>

              {/* Photographers & Cinematographers */}
              <div className="bg-[#06141B] border border-[#253745] rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <Camera className="w-4 h-4 text-[#CCD0CF]" />
                  <h5 className="text-sm font-bold text-[#CCD0CF]">
                    Photographers & Cameramen
                  </h5>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9BA8AB] pt-2 border-t border-[#253745]/60">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                    <span><strong>Lighting & Optics:</strong> Key-to-fill lighting ratios, shadow detail recovery in 14-bit+ RAW captures, and natural optical depth-of-field falloff.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                    <span><strong>Composition:</strong> Editorial framing, golden ratio geometry, background separation, and subject textural rendering.</span>
                  </div>
                </div>
              </div>

              {/* Graphic Designers & Brand Strategists */}
              <div className="bg-[#06141B] border border-[#253745] rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <Palette className="w-4 h-4 text-[#CCD0CF]" />
                  <h5 className="text-sm font-bold text-[#CCD0CF]">
                    Graphic Designers & Brand Strategists
                  </h5>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9BA8AB] pt-2 border-t border-[#253745]/60">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                    <span><strong>Typographic Math:</strong> Kerning consistency, baseline grid alignment, measure (65-75 characters/line), and intentional typeface pairing.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                    <span><strong>Production Standards:</strong> Vector node economy, packaging dieline tolerances, CMYK print separation readiness, and digital system coherence.</span>
                  </div>
                </div>
              </div>

              {/* Social Media Creators & Managers */}
              <div className="bg-[#06141B] border border-[#253745] rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <Share2 className="w-4 h-4 text-[#CCD0CF]" />
                  <h5 className="text-sm font-bold text-[#CCD0CF]">
                    Social Media Creators, Managers & Strategists
                  </h5>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9BA8AB] pt-2 border-t border-[#253745]/60">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                    <span><strong>Retention Architecture:</strong> 0-3 second visual hook rate, pattern interrupt frequency, narrative pacing curve, and dynamic caption typography.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                    <span><strong>Format Native Mastery:</strong> 9:16 safe-zone framing (avoiding UI overlap), audio trend synchronization, and call-to-action conversion timing.</span>
                  </div>
                </div>
              </div>

              {/* Scriptwriters & Story Architects */}
              <div className="bg-[#06141B] border border-[#253745] rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <PenTool className="w-4 h-4 text-[#CCD0CF]" />
                  <h5 className="text-sm font-bold text-[#CCD0CF]">
                    Scriptwriters & Narrative Architects
                  </h5>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9BA8AB] pt-2 border-t border-[#253745]/60">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                    <span><strong>Narrative Tension:</strong> Beat-by-beat progression, exposition management, tension-and-release arcs, and rhetorical device density.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CCD0CF] shrink-0 mt-0.5" />
                    <span><strong>Voiceover & Dialogue:</strong> Natural cadence for oral delivery, word economy, visual scene cue synchronization, and research synthesis.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#253745] bg-[#06141B] flex items-center justify-between">
          <div className="text-xs text-[#9BA8AB]">
            Evaluations are unbiased, deterministic, and free of platform favoritism.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-[#CCD0CF] hover:bg-white text-[#06141B] rounded transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
