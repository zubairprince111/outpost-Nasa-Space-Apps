import React from 'react';
import { QuestChallenge, DestinationType } from '../simulation/SimulationModels';
import {
  Star,
  Lock,
  CheckCircle2,
  Play,
  Trophy,
  Users,
  Compass,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

interface MissionMapProps {
  challenges: QuestChallenge[];
  completedIds: number[];
  starsMap: Record<number, number>;
  totalScore: number;
  unlockedBadgeCount: number;
  totalBadgeCount: number;
  destination: DestinationType;
  onSelectChallenge: (id: number) => void;
  onOpenBadges: () => void;
  onMeetCrew: () => void;
  onOpenAskOrbit?: () => void;
  onOpenNasaDossier?: () => void;
  onOpenSandbox?: () => void;
  onToggleDestination?: (dest: DestinationType) => void;
  onFreeRoam: () => void;
}

export const MissionMapScreen: React.FC<MissionMapProps> = ({
  challenges,
  completedIds,
  starsMap,
  totalScore,
  unlockedBadgeCount,
  totalBadgeCount,
  destination,
  onSelectChallenge,
  onOpenBadges,
  onMeetCrew,
  onOpenAskOrbit,
  onOpenNasaDossier,
  onOpenSandbox,
  onToggleDestination,
  onFreeRoam
}) => {
  const totalStars = Object.values(starsMap).reduce((a, b) => a + b, 0);
  const isMars = destination === 'mars';

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-3 sm:p-6 overflow-y-auto">
      
      {/* Top Bar: Mission Progress & Score */}
      <div className="pointer-events-auto flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-cyan-500/50 rounded-2xl px-3 sm:px-4 py-2 shadow-xl">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cyan-400 object-cover"
          />
          <div>
            <div className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
              <span>OUTPOST • {isMars ? 'MARS JEZERO QUEST' : 'LUNAR RESCUE QUEST'}</span>
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{totalStars} / 18 STARS</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-purple-300 font-mono">{totalScore} PTS</span>
            </div>
          </div>

          {/* Destination Switcher in Map */}
          {onToggleDestination && (
            <div className="ml-2 flex items-center bg-slate-900 rounded-xl p-0.5 border border-slate-700">
              <button
                onClick={() => onToggleDestination('moon')}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                  !isMars ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/60' : 'text-slate-400'
                }`}
                title="Switch to Moon"
              >
                <span>🌕</span>
              </button>
              <button
                onClick={() => onToggleDestination('mars')}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                  isMars ? 'bg-amber-500/30 text-amber-200 border border-amber-400/60' : 'text-slate-400'
                }`}
                title="Switch to Mars"
              >
                <span>🔴</span>
              </button>
            </div>
          )}
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md border border-slate-700/70 rounded-2xl p-1 shadow-xl">
          
          {onOpenNasaDossier && (
            <button
              onClick={onOpenNasaDossier}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-950 border border-amber-500/50 transition-colors flex items-center gap-1"
              title="Open Verified NASA DONKI & OSDR Data Hub"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">NASA DATA</span>
            </button>
          )}

          {onOpenSandbox && (
            <button
              onClick={onOpenSandbox}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-purple-300 bg-purple-950/60 hover:bg-purple-950 border border-purple-500/50 transition-colors flex items-center gap-1"
              title="Open Sol-by-Sol Sandbox"
            >
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">SANDBOX</span>
            </button>
          )}

          <button
            onClick={onOpenBadges}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-300 hover:bg-slate-800 transition-colors flex items-center gap-1"
            title="Open Badge Case"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px]">{unlockedBadgeCount}/{totalBadgeCount}</span>
          </button>

          <button
            onClick={onMeetCrew}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-cyan-300 hover:bg-slate-800 transition-colors flex items-center gap-1 hidden sm:flex"
            title="Meet Astronaut Team"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>CREW</span>
          </button>

          {onOpenAskOrbit && (
            <button
              onClick={onOpenAskOrbit}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-cyan-300 hover:bg-slate-800 transition-colors flex items-center gap-1"
              title="Ask ORBIT AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">ASK ORBIT</span>
            </button>
          )}
        </div>
      </div>

      {/* Center Challenge Path Map */}
      <div className="pointer-events-auto w-full max-w-4xl mx-auto my-auto py-3">
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/60 text-purple-200 text-xs font-mono font-bold shadow-lg mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>🔬 SCIENCE LAB MISSION COMMAND • 6 ENGINEERING TRADE-OFF CHALLENGES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100">
            CHOOSE YOUR NEXT MISSION CHALLENGE
          </h2>
          <p className="text-xs text-slate-300 font-sans max-w-lg mx-auto">
            Solve each space emergency by balancing competing life-support demands. No choice is free!
          </p>
        </div>

        {/* 6 Challenges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {challenges.map((challenge) => {
            const isCompleted = completedIds.includes(challenge.id);
            const isUnlocked = challenge.id === 1 || completedIds.includes(challenge.id - 1);
            const stars = starsMap[challenge.id] || 0;

            return (
              <div
                key={challenge.id}
                onClick={() => isUnlocked && onSelectChallenge(challenge.id)}
                className={`relative rounded-3xl p-4 border-2 transition-all flex flex-col justify-between gap-2.5 text-left ${
                  !isUnlocked
                    ? 'bg-slate-950/60 border-slate-800/80 opacity-50 cursor-not-allowed'
                    : isCompleted
                    ? 'bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border-emerald-500/60 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer hover:scale-[1.02]'
                    : 'bg-gradient-to-br from-cyan-950/80 via-slate-950 to-blue-950/80 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] cursor-pointer hover:scale-[1.03] ring-2 ring-cyan-400/50'
                }`}
              >
                {/* Card Top: Number + Status */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-black text-xs text-cyan-300">
                      #{challenge.id}
                    </span>

                    {challenge.nasaDataReference && (
                      <span className="text-[9px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40 truncate max-w-[140px]">
                        {challenge.nasaDataReference.badgeLabel}
                      </span>
                    )}

                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/50">
                        <CheckCircle2 className="w-3 h-3" /> SOLVED
                      </span>
                    ) : isUnlocked ? (
                      <span className="flex items-center gap-1 text-[10px] font-black text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-400">
                        <Play className="w-2.5 h-2.5 fill-cyan-300" /> READY
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                        <Lock className="w-3 h-3" /> LOCKED
                      </span>
                    )}
                  </div>

                  {/* Challenge Name & Story Tagline */}
                  <div className="text-xl mb-1">{challenge.choices[0]?.icon || '🚀'}</div>
                  <h3 className="font-extrabold text-sm text-slate-100 line-clamp-1">
                    {challenge.name}
                  </h3>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase">{challenge.locationName}</div>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 font-sans">
                    {challenge.tagline}
                  </p>
                </div>

                {/* Card Bottom: Stars Rating */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-3.5 h-3.5 ${
                          starIdx <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {isUnlocked && (
                    <span className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1">
                      <span>{isCompleted ? 'REPLAY' : 'START'}</span>
                      <span>→</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar: Free Roam 3D */}
      <div className="pointer-events-auto flex items-center justify-center pt-2">
        <button
          onClick={onFreeRoam}
          className="px-6 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-2xl text-xs font-bold text-slate-200 flex items-center gap-2 shadow-xl transition-all active:scale-95"
        >
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>FREE ROAM 3D {isMars ? 'MARS OUTPOST' : 'LUNAR BASE'}</span>
        </button>
      </div>

    </div>
  );
};
