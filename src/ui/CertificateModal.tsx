import React, { useState } from 'react';
import { QuestBadge, ResourceState, DestinationType } from '../simulation/SimulationModels';
import { X, Printer, Trophy, Award, CheckCircle2, ShieldCheck, Star } from 'lucide-react';

interface CertificateProps {
  totalScore: number;
  totalStars: number;
  finalResources: ResourceState;
  badges: QuestBadge[];
  destination: DestinationType;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateProps> = ({
  totalScore,
  totalStars,
  finalResources,
  badges,
  destination,
  onClose
}) => {
  const [studentName, setStudentName] = useState<string>("Cadet Commander");
  const unlockedBadges = badges.filter((b) => b.unlocked);
  const isMars = destination === 'mars';

  const handlePrint = () => {
    window.print();
  };

  const getRank = () => {
    if (totalScore >= 500) return "Master Deep-Space Flight Director";
    if (totalScore >= 350) return "Senior Mission Operations Specialist";
    return "Certified Outpost Systems Cadet";
  };

  return (
    <div className="absolute inset-0 z-[80] pointer-events-none flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md pointer-events-auto" onClick={onClose} />

      <div className="relative pointer-events-auto w-full max-w-3xl max-h-[92dvh] overflow-y-auto bg-slate-950/95 border-2 border-amber-400/70 rounded-3xl p-5 sm:p-8 shadow-[0_0_80px_rgba(245,158,11,0.35)] flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Controls Header (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 print:hidden">
          <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>NASA STEM OFFICIAL FLIGHT DIRECTOR DIPLOMA</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-200 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / SAVE PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Name Input Bar (Print-friendly) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 print:hidden">
          <label className="text-xs font-mono text-slate-300 font-bold">
            Enter Student / Commander Name:
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 bg-slate-950 border border-cyan-500/50 rounded-xl text-slate-100 font-mono text-sm font-bold focus:outline-none focus:border-cyan-400"
            placeholder="Your Name Here"
          />
        </div>

        {/* CERTIFICATE BODY (PRINT CANVAS) */}
        <div className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-4 border-amber-400/80 rounded-2xl p-6 sm:p-10 shadow-2xl text-center flex flex-col items-center gap-4">
          
          {/* Top NASA Space Apps Emblem */}
          <div className="flex items-center justify-between w-full border-b-2 border-amber-500/30 pb-4">
            <div className="flex items-center gap-3 text-left">
              <img
                src="/images/logo.png"
                alt="NASA Space Apps"
                className="w-12 h-12 rounded-full border-2 border-amber-400 object-cover shadow-lg"
              />
              <div>
                <div className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                  NASA SPACE APPS CHALLENGE 2026
                </div>
                <div className="text-sm font-black text-slate-100 tracking-wide font-sans">
                  OUTPOST • DEEP SPACE SYSTEMS PROGRAM
                </div>
              </div>
            </div>

            <div className="text-right font-mono text-[10px] text-slate-400">
              <div>CERTIFICATE ID:</div>
              <div className="text-amber-300 font-bold">NASA-OUTPOST-2026-F2A7</div>
            </div>
          </div>

          {/* Certificate Headline */}
          <div className="space-y-1 my-2">
            <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
              CERTIFICATE OF MISSION EXCELLENCE
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-serif italic">
              Junior Flight Director Diploma
            </h1>
            <p className="text-xs text-slate-300 max-w-md mx-auto font-sans">
              Awarded for exceptional mastery of deep-space engineering trade-offs, life-support redundancy, and radiation mitigation.
            </p>
          </div>

          {/* Student Name */}
          <div className="my-2 border-b-2 border-dashed border-amber-400/60 pb-1 px-8 min-w-[280px]">
            <span className="text-xl sm:text-3xl font-black text-cyan-300 font-mono tracking-wide">
              {studentName || "Cadet Commander"}
            </span>
          </div>

          {/* Rank & Mission Theater */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 font-mono text-xs font-black">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>RANK: {getRank()} • {isMars ? 'MARS JEZERO CRATER' : 'LUNAR SOUTH POLE SHACKLETON'}</span>
          </div>

          {/* Mission Statistics Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full my-2 text-xs font-mono">
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400">TOTAL SCORE</div>
              <div className="text-base font-black text-purple-300">{totalScore} PTS</div>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400">STARS EARNED</div>
              <div className="text-base font-black text-amber-300 flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>{totalStars} / 18</span>
              </div>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400">CREW SURVIVAL</div>
              <div className="text-base font-black text-emerald-400">100% NOMINAL</div>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400">RADIATION DOSE</div>
              <div className="text-base font-black text-cyan-300">
                {finalResources.radiationDose_mSv.toFixed(2)} mSv
              </div>
            </div>
          </div>

          {/* Unlocked Badges Row */}
          <div className="w-full bg-slate-900/60 rounded-xl p-3 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-2">
              VERIFIED NASA STEM SPECIALTY BADGES ({unlockedBadges.length}/{badges.length}):
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {unlockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-amber-500/40 text-xs font-mono flex items-center gap-1 text-slate-200"
                  title={badge.description}
                >
                  <span>{badge.emoji}</span>
                  <span className="text-[11px] font-bold">{badge.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="flex items-end justify-between w-full pt-4 border-t-2 border-amber-500/30 text-xs font-mono text-left">
            <div>
              <div className="text-cyan-400 font-bold">ORBIT AI Companion</div>
              <div className="text-[10px] text-slate-400">Automated Telemetry Verification</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-amber-400 flex items-center justify-center mx-auto text-amber-300 text-xs font-bold font-mono">
                SEAL
              </div>
              <div className="text-[9px] text-slate-400 mt-1">OFFICIAL OUTPOST</div>
            </div>

            <div className="text-right">
              <div className="text-amber-400 font-bold">NASA Space Apps 2026</div>
              <div className="text-[10px] text-slate-400">Deep Space Systems Engineering</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
