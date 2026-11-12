import React, { useState, useEffect } from 'react';
import { QuestChallenge, QuestChoice } from '../simulation/SimulationModels';
import {
  Eye,
  EyeOff,
  Play,
  Clock,
  ExternalLink,
  ShieldAlert,
  Zap,
  Droplets,
  Wind,
  Apple,
  Heart,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { AudioEngine } from '../audio/AudioEngine';

interface ActionProps {
  challenge: QuestChallenge;
  onExecuteChoice: (choice: QuestChoice) => void;
  onTimeExpired: () => void;
  onPeek3DChange?: (peeking: boolean) => void;
}

const ACTION_TIMEOUT_SECONDS = 30;

export const ChallengeActionModal: React.FC<ActionProps> = ({
  challenge,
  onExecuteChoice,
  onTimeExpired,
  onPeek3DChange
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<'A' | 'B' | 'C'>(challenge.choices[0].id);
  const [peek3D, setPeek3D] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(ACTION_TIMEOUT_SECONDS);

  // Countdown Timer Hook
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired();
          return 0;
        }
        AudioEngine.getInstance().playCountdownTick(prev <= 6);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeExpired]);

  const handleTogglePeek = (val: boolean) => {
    setPeek3D(val);
    onPeek3DChange?.(val);
  };

  const selectedChoice =
    challenge.choices.find((c) => c.id === selectedChoiceId) || challenge.choices[0];

  if (peek3D) {
    return (
      <div className="absolute bottom-6 right-6 z-30 pointer-events-auto flex items-center gap-3">
        {/* Floating Timer Pill in Peek Mode */}
        <div
          className={`px-4 py-2.5 rounded-2xl border-2 flex items-center gap-2 font-mono text-xs sm:text-sm font-black shadow-2xl backdrop-blur-md ${
            timeLeft <= 5
              ? 'bg-red-950/95 border-red-500 text-red-200 animate-pulse'
              : timeLeft <= 10
              ? 'bg-amber-950/90 border-amber-500 text-amber-300'
              : 'bg-slate-950/90 border-cyan-400 text-cyan-300'
          }`}
        >
          <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-400 animate-spin' : 'text-cyan-400'}`} />
          <span>⏱️ {timeLeft}s REMAINING</span>
        </div>

        <button
          onClick={() => handleTogglePeek(false)}
          className="px-5 py-3 bg-slate-950/95 hover:bg-slate-900 border-2 border-cyan-400 text-cyan-300 font-black text-xs sm:text-sm rounded-2xl flex items-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.5)] animate-bounce-subtle"
        >
          <EyeOff className="w-4 h-4" />
          <span>SHOW ACTION CHOICES</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-2 sm:p-5">
      {/* Soft vignette backdrop */}
      <div className="absolute inset-0 bg-slate-950/50 pointer-events-auto" />

      {/* Main Container */}
      <div className="relative pointer-events-auto w-full max-w-4xl max-h-[94dvh] overflow-y-auto bg-slate-950/95 border-2 border-cyan-500/60 rounded-3xl p-4 sm:p-6 shadow-[0_0_70px_rgba(6,182,212,0.35)] flex flex-col gap-3.5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl shrink-0">{challenge.choices[0]?.icon || '🚨'}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-bold truncate">
                  // DEEP SPACE CHALLENGE #{challenge.id}
                </span>
                {challenge.nasaDataReference && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-950/80 border border-purple-500/60 text-purple-300">
                    <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                    <span>{challenge.nasaDataReference.badgeLabel}</span>
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-100 truncate">
                {challenge.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Countdown Timer Display Pill */}
            <div
              className={`px-3 py-1.5 rounded-2xl border-2 flex items-center gap-1.5 font-mono text-xs font-black shadow-lg transition-all ${
                timeLeft <= 5
                  ? 'bg-red-950/90 border-red-500 text-red-200 animate-pulse scale-105 shadow-[0_0_20px_rgba(239,68,68,0.7)]'
                  : timeLeft <= 10
                  ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                  : 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${timeLeft <= 5 ? 'animate-spin text-red-400' : 'text-cyan-400'}`} />
              <span>{timeLeft}s</span>
            </div>

            <button
              type="button"
              onClick={() => handleTogglePeek(true)}
              className="text-xs text-cyan-300 font-mono bg-cyan-950/80 hover:bg-cyan-900 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-cyan-400/50 flex items-center gap-1.5 transition-colors"
              title="Inspect 3D Base Unobstructed"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="font-bold hidden sm:inline">PEEK 3D</span>
            </button>
          </div>
        </div>

        {/* Countdown Progress Bar */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800 -mt-1.5">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              timeLeft <= 5
                ? 'bg-gradient-to-r from-red-600 to-amber-500 animate-pulse'
                : timeLeft <= 10
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500'
            }`}
            style={{ width: `${(timeLeft / ACTION_TIMEOUT_SECONDS) * 100}%` }}
          />
        </div>

        {/* NASA Live Telemetry Callout & Trade-Off Prompt */}
        <div className="bg-gradient-to-r from-blue-950/70 via-cyan-950/60 to-slate-900/80 border border-cyan-500/50 rounded-2xl p-3 sm:p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-300 font-bold uppercase flex items-center gap-1.5">
              <span>⚖️ CORE ENGINEERING TRADE-OFF DILEMMA:</span>
            </span>
            {challenge.nasaDataReference && (
              <span className="text-[10px] text-amber-300 font-mono hidden md:inline">
                {challenge.nasaDataReference.realValue}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
            {challenge.tradeoffPrompt}
          </p>
        </div>

        {/* 3 Real Trade-off Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {challenge.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            return (
              <div
                key={choice.id}
                onClick={() => setSelectedChoiceId(choice.id)}
                className={`rounded-2xl p-3.5 cursor-pointer transition-all border-2 flex flex-col justify-between gap-2.5 text-left ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/95 via-slate-900 to-slate-950 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] ring-2 ring-cyan-400/50 scale-[1.01]'
                    : 'bg-slate-900/80 hover:bg-slate-850 border-slate-700/80 opacity-85 hover:opacity-100 hover:border-slate-600'
                }`}
              >
                <div>
                  {/* Top Bar with Icon & Option ID */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl">{choice.icon}</span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-mono border ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-cyan-300'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {choice.id}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-100 line-clamp-2">
                    {choice.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed font-sans line-clamp-3">
                    {choice.description}
                  </p>

                  {/* Resource Impact Pills */}
                  <div className="flex flex-wrap gap-1.5 my-2.5">
                    {choice.deltaPower !== 0 && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                        choice.deltaPower > 0 ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'bg-slate-950 text-amber-400'
                      }`}>
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span>{choice.deltaPower > 0 ? `+${choice.deltaPower}` : choice.deltaPower} kW</span>
                      </span>
                    )}

                    {choice.deltaCrew !== 0 && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                        choice.deltaCrew >= 0 ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300 border border-red-500/50'
                      }`}>
                        <Heart className="w-3 h-3 text-rose-400" />
                        <span>{choice.deltaCrew > 0 ? `+${choice.deltaCrew}` : choice.deltaCrew}% Crew</span>
                      </span>
                    )}

                    {choice.deltaScience && choice.deltaScience > 0 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                        +{choice.deltaScience} Sci
                      </span>
                    )}

                    {choice.deltaRadiation_mSv !== undefined && choice.deltaRadiation_mSv > 0 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/50">
                        +{choice.deltaRadiation_mSv} mSv
                      </span>
                    )}
                  </div>

                  {/* Explicit Trade-off & Compounding Risk Box */}
                  <div className="bg-slate-950/80 rounded-xl p-2 border border-slate-800 text-[10px] space-y-1 font-mono">
                    <div className="text-cyan-300 leading-snug">
                      <strong className="text-slate-400">TRADE-OFF: </strong>{choice.engineeringTradeoff}
                    </div>
                    <div className="text-amber-300 leading-snug">
                      <strong className="text-slate-400">NEXT-SOL RISK: </strong>{choice.compoundingRisk}
                    </div>
                  </div>
                </div>

                <div
                  className={`py-1.5 rounded-xl text-center text-xs font-mono font-bold transition-all mt-1 ${
                    isSelected ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800/80 text-slate-400'
                  }`}
                >
                  {isSelected ? '✓ SELECTED STRATEGY' : 'TAP TO PREVIEW'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Signature Feature: FUTURE FORK 48-HOUR TRAJECTORY PREVIEW */}
        {selectedChoice.trajectoryForecast && (
          <div className="bg-slate-900/80 border border-purple-500/40 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>THE FUTURE FORK • 48-HOUR PROJECTED TRAJECTORY PREVIEW</span>
              </span>
              <span className="text-[10px] text-slate-400">
                Strategy: <strong>{selectedChoice.title}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              {/* Power Forecast */}
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">GRID POWER</div>
                <div className="text-sm font-black text-amber-300">
                  {selectedChoice.trajectoryForecast.power[0]}% → {selectedChoice.trajectoryForecast.power[4]}%
                </div>
                <div className="text-[9px] text-slate-400">
                  48h Trend: {selectedChoice.trajectoryForecast.power.join(' → ')}
                </div>
              </div>

              {/* Battery Forecast */}
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">BATTERY SOC</div>
                <div className="text-sm font-black text-cyan-300">
                  {selectedChoice.trajectoryForecast.battery[0]}% → {selectedChoice.trajectoryForecast.battery[4]}%
                </div>
                <div className="text-[9px] text-slate-400">
                  48h Trend: {selectedChoice.trajectoryForecast.battery.join(' → ')}
                </div>
              </div>

              {/* Oxygen Forecast */}
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">ATMOSPHERIC O₂</div>
                <div className="text-sm font-black text-blue-300">
                  {selectedChoice.trajectoryForecast.oxygen[0]}% → {selectedChoice.trajectoryForecast.oxygen[4]}%
                </div>
                <div className="text-[9px] text-slate-400">
                  48h Trend: {selectedChoice.trajectoryForecast.oxygen.join(' → ')}
                </div>
              </div>

              {/* Crew Health Forecast */}
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">CREW HEALTH</div>
                <div className="text-sm font-black text-rose-300">
                  {selectedChoice.trajectoryForecast.crew[0]}% → {selectedChoice.trajectoryForecast.crew[4]}%
                </div>
                <div className="text-[9px] text-slate-400">
                  48h Trend: {selectedChoice.trajectoryForecast.crew.join(' → ')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer: Execute Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="text-xs text-slate-300 font-sans text-center sm:text-left truncate max-w-md">
            Ready to commit: <strong className="text-cyan-300 font-bold">{selectedChoice.title}</strong>
          </div>

          <button
            onClick={() => onExecuteChoice(selectedChoice)}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>COMMIT STRATEGY & ADVANCE</span>
          </button>
        </div>

      </div>
    </div>
  );
};
