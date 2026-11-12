import React from 'react';
import { ResourceState, DestinationType, DifficultyMode } from '../simulation/SimulationModels';
import {
  Zap,
  Droplets,
  Apple,
  Wind,
  Heart,
  Map,
  Volume2,
  VolumeX,
  RotateCcw,
  Trophy,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  Globe,
  Gauge
} from 'lucide-react';

interface ResourceHudProps {
  resources: ResourceState;
  currentChallengeName?: string;
  totalScore: number;
  totalStars: number;
  unlockedBadgeCount: number;
  totalBadgeCount: number;
  isMuted: boolean;
  destination: DestinationType;
  difficultyMode: DifficultyMode;
  onOpenMap: () => void;
  onOpenBadges: () => void;
  onOpenAskOrbit: () => void;
  onOpenNasaDossier: () => void;
  onOpenSandbox: () => void;
  onOpenCertificate?: () => void;
  onToggleDestination: (dest: DestinationType) => void;
  onToggleMode: () => void;
  onToggleMute: () => void;
  onResetCamera: () => void;
}

export const ResourceHud: React.FC<ResourceHudProps> = ({
  resources,
  currentChallengeName,
  totalScore,
  totalStars,
  unlockedBadgeCount,
  totalBadgeCount,
  isMuted,
  destination,
  difficultyMode,
  onOpenMap,
  onOpenBadges,
  onOpenAskOrbit,
  onOpenNasaDossier,
  onOpenSandbox,
  onOpenCertificate,
  onToggleDestination,
  onToggleMode,
  onToggleMute,
  onResetCamera
}) => {
  const isCommander = difficultyMode === 'commander';
  const isMars = destination === 'mars';

  const getPillStatus = (val: number) => {
    if (val <= 30) return { color: 'text-red-400 border-red-500/60 bg-red-950/60 animate-pulse', smiley: '😨' };
    if (val <= 60) return { color: 'text-amber-400 border-amber-500/50 bg-amber-950/50', smiley: '😐' };
    return { color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30', smiley: '😊' };
  };

  const pwr = getPillStatus(resources.power);
  const h2o = getPillStatus(resources.water);
  const food = getPillStatus(resources.food);
  const o2 = getPillStatus(resources.oxygen);
  const crew = getPillStatus(resources.crewSafety);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-2 sm:p-3 safe-pad-top safe-pad-left safe-pad-right pointer-events-none flex flex-col items-stretch gap-2">
      
      {/* Top Bar: Logo, Destination Selector, Mode Switcher, and Quick Tool Bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        
        {/* Left: Brand + Location Switcher */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-cyan-500/50 rounded-2xl p-1.5 shadow-xl">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cyan-400 object-cover shrink-0"
          />
          <div className="min-w-0 pr-1">
            <div className="text-[10px] sm:text-xs font-black text-cyan-300 font-mono tracking-wider truncate flex items-center gap-1.5">
              <span>OUTPOST</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
            </div>
            <div className="text-[9px] text-slate-300 font-mono truncate">
              {currentChallengeName || (isMars ? 'Mars Jezero Outpost' : 'Lunar Shackleton Base')}
            </div>
          </div>

          {/* Moon / Mars Destination Switcher Pill */}
          <div className="flex items-center bg-slate-950 rounded-xl p-0.5 border border-slate-700">
            <button
              onClick={() => onToggleDestination('moon')}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                !isMars
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/60 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to Lunar South Pole Shackleton Base"
            >
              <span>🌕</span>
              <span className="hidden sm:inline">MOON</span>
            </button>
            <button
              onClick={() => onToggleDestination('mars')}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                isMars
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400/60 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to Mars Jezero Crater Outpost"
            >
              <span>🔴</span>
              <span className="hidden sm:inline">MARS</span>
            </button>
          </div>

          {/* Mission Map Button */}
          <button
            onClick={onOpenMap}
            className="px-2.5 py-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1 shadow-md active:scale-95 transition-all"
            title="Open Mission Map"
          >
            <Map className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">MAP</span>
          </button>
        </div>

        {/* Center / Right STEM Feature Buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl p-1 shadow-xl shrink-0">
          
          {/* Junior Cadet vs Flight Director Mode Toggle */}
          <button
            onClick={onToggleMode}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold flex items-center gap-1.5 transition-colors border ${
              isCommander
                ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-md'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Toggle between Junior Cadet (Ages 7-10) and Flight Director (Ages 11-12+ with NASA telemetry units)"
          >
            <Gauge className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">{isCommander ? 'FLIGHT DIRECTOR MODE' : 'CADET MODE'}</span>
            <span className="md:hidden">{isCommander ? 'DIRECTOR' : 'CADET'}</span>
          </button>

          {/* NASA Open Data Dossier Button */}
          <button
            onClick={onOpenNasaDossier}
            className="px-2.5 py-1 bg-amber-950/60 hover:bg-amber-950 border border-amber-500/50 text-amber-300 rounded-xl text-[11px] font-mono font-bold flex items-center gap-1 transition-colors"
            title="Open Verified NASA DONKI & OSDR Data Hub"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">NASA DATA</span>
          </button>

          {/* Mission Control Sandbox Button */}
          <button
            onClick={onOpenSandbox}
            className="px-2.5 py-1 bg-purple-950/60 hover:bg-purple-950 border border-purple-500/50 text-purple-300 rounded-xl text-[11px] font-mono font-bold flex items-center gap-1 transition-colors"
            title="Open Sol-by-Sol Mission Control Simulation Sandbox"
          >
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">SANDBOX</span>
          </button>

          {/* Certificate Button (if available) */}
          {onOpenCertificate && (
            <button
              onClick={onOpenCertificate}
              className="px-2.5 py-1 text-amber-300 hover:bg-slate-800 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-colors hidden lg:flex"
              title="View NASA Flight Director Diploma"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>DIPLOMA</span>
            </button>
          )}

          {/* Badges Case */}
          <button
            onClick={onOpenBadges}
            className="px-2 py-1 text-slate-200 hover:text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
            title="View Badges"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px]">{unlockedBadgeCount}/{totalBadgeCount}</span>
          </button>

          {/* Ask ORBIT */}
          <button
            onClick={onOpenAskOrbit}
            className="px-2 py-1 text-slate-200 hover:text-cyan-300 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors hidden sm:flex"
            title="Ask ORBIT"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px]">ORBIT</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 text-slate-300 hover:text-cyan-300 rounded-lg transition-colors"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Reset Camera */}
          <button
            onClick={onResetCamera}
            className="p-1.5 text-slate-300 hover:text-cyan-300 rounded-lg transition-colors"
            title="Reset 3D Overview"
          >
            <RotateCcw className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Center 5 Vital Resource Indicators with Responsive Commander / Cadet Views */}
      <div className="pointer-events-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl px-3 py-1.5 shadow-xl">
        
        {/* Power */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shrink-0 ${pwr.color}`}>
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>PWR {Math.round(resources.power)}%</span>
          {isCommander ? (
            <span className="text-[10px] text-amber-300 font-normal">({Math.round(resources.power * 0.9)} kW)</span>
          ) : (
            <span>{pwr.smiley}</span>
          )}
        </div>

        {/* Water */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shrink-0 ${h2o.color}`}>
          <Droplets className="w-3.5 h-3.5 text-blue-400" />
          <span>H₂O {Math.round(resources.water)}%</span>
          {isCommander ? (
            <span className="text-[10px] text-blue-300 font-normal">(WRS 98%)</span>
          ) : (
            <span>{h2o.smiley}</span>
          )}
        </div>

        {/* Food */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shrink-0 ${food.color}`}>
          <Apple className="w-3.5 h-3.5 text-lime-400" />
          <span>FOOD {Math.round(resources.food)}%</span>
          {isCommander ? (
            <span className="text-[10px] text-lime-300 font-normal">(OSDR-311)</span>
          ) : (
            <span>{food.smiley}</span>
          )}
        </div>

        {/* Oxygen */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shrink-0 ${o2.color}`}>
          <Wind className="w-3.5 h-3.5 text-cyan-300" />
          <span>O₂ {Math.round(resources.oxygen)}%</span>
          {isCommander ? (
            <span className="text-[10px] text-cyan-200 font-normal">(21 kPa)</span>
          ) : (
            <span>{o2.smiley}</span>
          )}
        </div>

        {/* Crew Safety */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shrink-0 ${crew.color}`}>
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>CREW {Math.round(resources.crewSafety)}%</span>
          {isCommander ? (
            <span className="text-[10px] text-rose-300 font-normal">
              ({resources.radiationDose_mSv.toFixed(1)} mSv)
            </span>
          ) : (
            <span>{crew.smiley}</span>
          )}
        </div>

        {/* Score PTS */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-purple-500/40 bg-purple-950/40 text-purple-300 text-xs font-mono font-black shrink-0">
          <span>{totalScore} PTS</span>
        </div>

        {/* Commander Mode Comms Lag Indicator */}
        {isCommander && (
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-[10px] font-mono shrink-0">
            <span>📡 LAG:</span>
            <span className="font-bold">{isMars ? '14.0 min' : '1.3 sec'}</span>
          </div>
        )}

      </div>

    </header>
  );
};
