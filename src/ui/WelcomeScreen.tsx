import React from 'react';
import { DestinationType } from '../simulation/SimulationModels';
import { Rocket, Users, HelpCircle, BookOpen, Sparkles, ShieldCheck, TrendingUp, Globe } from 'lucide-react';

interface WelcomeProps {
  destination: DestinationType;
  onToggleDestination: (dest: DestinationType) => void;
  onStartAdventure: () => void;
  onMeetCrew: () => void;
  onHowToPlay: () => void;
  onOpenCredits: () => void;
  onOpenNasaDossier: () => void;
  onOpenSandbox: () => void;
}

export const WelcomeScreen: React.FC<WelcomeProps> = ({
  destination,
  onToggleDestination,
  onStartAdventure,
  onMeetCrew,
  onHowToPlay,
  onOpenCredits,
  onOpenNasaDossier,
  onOpenSandbox
}) => {
  const isMars = destination === 'mars';

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-3 sm:p-6 overflow-y-auto">
      
      {/* Top Bar: NASA Badge & Quick Modals */}
      <div className="pointer-events-auto flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2.5 bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 rounded-2xl px-3.5 py-2 shadow-xl">
          <img
            src="/images/logo.png"
            alt="NASA Space Apps"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cyan-400 object-cover shrink-0"
          />
          <div className="text-[10px] sm:text-[11px] font-mono tracking-wider">
            <span className="text-cyan-400 font-bold block">NASA SPACE APPS 2026</span>
            <span className="text-slate-300 hidden xs:block">DEEP SPACE OUTPOST SIMULATOR</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* NASA Open Science Hub */}
          <button
            onClick={onOpenNasaDossier}
            className="bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 rounded-2xl px-3 py-2 text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 transition-colors shadow-lg active:scale-95"
            title="Open Verified NASA Open Data Explorer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">NASA DATA</span>
            <span className="sm:hidden">DATA</span>
          </button>

          {/* Credits */}
          <button
            onClick={onOpenCredits}
            className="bg-slate-900/85 hover:bg-slate-800 backdrop-blur-md border border-slate-700/60 rounded-2xl px-3 py-2 text-xs text-slate-300 flex items-center gap-1.5 transition-colors shadow-lg active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">CREDITS & </span>
            <span>LICENSES</span>
          </button>
        </div>
      </div>

      {/* Main Center Welcome Card */}
      <div className="pointer-events-auto w-full max-w-xl mx-auto text-center flex flex-col items-center gap-3.5 sm:gap-4 bg-slate-950/90 backdrop-blur-md border-2 border-cyan-500/60 p-5 sm:p-8 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.35)] animate-in fade-in zoom-in-95 duration-300 my-auto">
        
        {/* Animated Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>GROUNDED IN REAL NASA DONKI & OSDR DATA</span>
        </div>

        {/* Main Title */}
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-200 to-blue-400">
            OUTPOST
          </h1>
          <p className="text-xs sm:text-sm font-mono text-cyan-300 font-bold tracking-wide">
            Lead Your Crew. Balance Competing Trade-offs. Save the Mission. 🚀
          </p>
        </div>

        {/* Destination Chooser */}
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 flex flex-col gap-1.5">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            SELECT MISSION THEATER:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onToggleDestination('moon')}
              className={`p-2.5 rounded-xl border text-left font-mono transition-all flex items-center gap-2.5 ${
                !isMars
                  ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-2xl shrink-0">🌕</span>
              <div className="min-w-0">
                <div className="text-xs font-black truncate">MOON • SHACKLETON</div>
                <div className="text-[10px] text-slate-400 truncate">Vacuum • 1.3s Comms</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onToggleDestination('mars')}
              className={`p-2.5 rounded-xl border text-left font-mono transition-all flex items-center gap-2.5 ${
                isMars
                  ? 'bg-amber-950/90 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-amber-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-2xl shrink-0">🔴</span>
              <div className="min-w-0">
                <div className="text-xs font-black truncate">MARS • JEZERO DELTA</div>
                <div className="text-[10px] text-slate-400 truncate">Dust Storms • 14m Lag</div>
              </div>
            </button>
          </div>
        </div>

        {/* Story Hook for Children */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 text-slate-200 text-xs leading-relaxed font-sans text-left">
          <p className="font-bold text-cyan-200 text-xs sm:text-sm mb-1">
            "Every decision has an engineering cost—no choice is free!"
          </p>
          <p className="text-slate-300 text-xs">
            Solar radiation storms from NASA DONKI, cold crater shadows, and water leaks threaten your outpost. Will you spend electricity on electromagnetic shielding or save power for night heaters? Lead Alex, Mia, Leo, and ORBIT through 6 missions!
          </p>
        </div>

        {/* Action Buttons: Large and Rounded */}
        <div className="w-full flex flex-col gap-2.5 pt-1">
          {/* Start Adventure Button */}
          <button
            onClick={onStartAdventure}
            className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-base sm:text-lg rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-95"
          >
            <Rocket className="w-5 h-5" />
            <span>START MISSION QUEST</span>
          </button>

          {/* Secondary Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={onMeetCrew}
              className="py-2.5 px-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>CREW</span>
            </button>

            <button
              onClick={onOpenSandbox}
              className="py-2.5 px-2 bg-purple-950/80 hover:bg-purple-900 border border-purple-500/60 text-purple-200 font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span>SANDBOX</span>
            </button>

            <button
              onClick={onHowToPlay}
              className="py-2.5 px-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>HOW TO PLAY</span>
            </button>
          </div>
        </div>

        {/* Friendly Interaction Tip */}
        <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 pt-0.5">
          Touch or Drag in 3D • Tap Any Module to Inspect • 100% Free & Open-Source
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] sm:text-[11px] font-mono text-slate-400 pb-1">
        NASA SPACE APPS 2026 • THREE.JS 3D ENGINE • DETERMINISTIC MULTI-SYSTEM SIMULATION
      </div>
    </div>
  );
};
