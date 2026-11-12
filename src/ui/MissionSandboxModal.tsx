import React, { useState } from 'react';
import {
  ResourceState,
  DestinationType,
  SandboxAllocation,
  SolLogEntry
} from '../simulation/SimulationModels';
import { SimulationEngine } from '../simulation/SimulationEngine';
import { AudioEngine } from '../audio/AudioEngine';
import {
  X,
  Play,
  RotateCcw,
  Zap,
  Flame,
  ShieldAlert,
  Sprout,
  Microscope,
  Radio,
  Heart,
  Droplets,
  Wind,
  Apple,
  AlertTriangle,
  History,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface SandboxProps {
  initialState: ResourceState;
  destination: DestinationType;
  onClose: () => void;
  onApplySandboxStateToWorld: (state: ResourceState) => void;
}

export const MissionSandboxModal: React.FC<SandboxProps> = ({
  initialState,
  destination,
  onClose,
  onApplySandboxStateToWorld
}) => {
  const [sandboxState, setSandboxState] = useState<ResourceState>(initialState);
  const [allocation, setAllocation] = useState<SandboxAllocation>({
    lifeSupport: 22,
    thermal: 18,
    shielding: 15,
    greenhouse: 15,
    science: 12,
    comms: 8
  });
  const [logs, setLogs] = useState<SolLogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const availablePower = destination === 'mars' ? 80 : 90;
  const totalAllocated =
    allocation.lifeSupport +
    allocation.thermal +
    allocation.shielding +
    allocation.greenhouse +
    allocation.science +
    allocation.comms;
  const powerSurplus = availablePower - totalAllocated;

  const handleSliderChange = (key: keyof SandboxAllocation, val: number) => {
    setAllocation((prev) => ({ ...prev, [key]: val }));
  };

  const handleAdvanceSol = () => {
    setIsSimulating(true);
    AudioEngine.getInstance().playFutureForkWhoosh();

    setTimeout(() => {
      const { updatedState, log } = SimulationEngine.simulateSol(sandboxState, allocation);
      setSandboxState(updatedState);
      setLogs((prev) => [log, ...prev]);
      setIsSimulating(false);
      onApplySandboxStateToWorld(updatedState);

      if (updatedState.crewHealth > 50) {
        AudioEngine.getInstance().playSuccessChime();
      } else {
        AudioEngine.getInstance().playWarningKlaxon();
      }
    }, 400);
  };

  const handleReset = () => {
    const fresh = SimulationEngine.getInitialState(destination);
    setSandboxState(fresh);
    setLogs([]);
    setAllocation({
      lifeSupport: 22,
      thermal: 18,
      shielding: 15,
      greenhouse: 15,
      science: 12,
      comms: 8
    });
    onApplySandboxStateToWorld(fresh);
    AudioEngine.getInstance().playBeep(440, 0.1);
  };

  return (
    <div className="absolute inset-0 z-[70] pointer-events-none flex items-center justify-center p-2 sm:p-5">
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md pointer-events-auto" onClick={onClose} />

      <div className="relative pointer-events-auto w-full max-w-4xl max-h-[94dvh] overflow-hidden bg-slate-950/95 border-2 border-purple-500/60 rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.35)] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-300 shrink-0">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
                  MISSION CONTROL SIMULATION SANDBOX
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-950/80 border border-cyan-500/50 text-cyan-300">
                  {destination === 'mars' ? '🔴 MARS JEZERO' : '🌕 MOON SHACKLETON'} • SOL {sandboxState.sol}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-slate-100">
                Sol-by-Sol Outpost Resource Manager
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-mono font-bold transition-colors border border-slate-700"
              title="Reset Sandbox"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">RESET</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
              title="Close Sandbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-Time Telemetry Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-3 sm:px-5 bg-slate-900/40 border-b border-slate-800 text-xs font-mono">
          <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] text-slate-400">BATTERY</div>
              <div className="font-black text-slate-100">{Math.round(sandboxState.battery)}%</div>
            </div>
          </div>

          <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] text-slate-400">WATER</div>
              <div className="font-black text-slate-100">{Math.round(sandboxState.water)}%</div>
            </div>
          </div>

          <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-300 shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] text-slate-400">OXYGEN</div>
              <div className="font-black text-slate-100">{Math.round(sandboxState.oxygen)}%</div>
            </div>
          </div>

          <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Apple className="w-4 h-4 text-lime-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] text-slate-400">FOOD</div>
              <div className="font-black text-slate-100">{Math.round(sandboxState.food)}%</div>
            </div>
          </div>

          <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] text-slate-400">HEALTH</div>
              <div className="font-black text-slate-100">{Math.round(sandboxState.crewHealth)}%</div>
            </div>
          </div>

          <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Microscope className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] text-slate-400">SCIENCE</div>
              <div className="font-black text-purple-300">{sandboxState.scienceScore} pts</div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column: Power Allocation Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Generator Status Header */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-mono text-slate-400">TOTAL GENERATOR CAPACITY</div>
                <div className="text-xl font-black text-slate-100 font-mono flex items-center gap-2">
                  <span>{availablePower} kW AVAILABLE</span>
                  <span className="text-xs text-slate-400 font-normal">
                    ({destination === 'mars' ? 'Photovoltaic + MOXIE' : 'Solar Tracking Array'})
                  </span>
                </div>
              </div>

              {/* Power Balance Badge */}
              <div className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-black flex items-center gap-2 ${
                powerSurplus >= 0
                  ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                  : 'bg-red-950/80 border-red-500/60 text-red-300 animate-pulse'
              }`}>
                <Zap className="w-4 h-4" />
                <span>
                  {powerSurplus >= 0 ? `+${powerSurplus} kW SURPLUS (CHARGING)` : `${powerSurplus} kW DEFICIT (DRAINING)`}
                </span>
              </div>
            </div>

            {/* Allocation Sliders */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3.5">
              <div className="text-xs font-mono font-bold text-cyan-300 uppercase flex items-center justify-between">
                <span>// SUB-SYSTEM LOAD ALLOCATION (kW)</span>
                <span className="text-slate-400">TOTAL: {totalAllocated} / {availablePower} kW</span>
              </div>

              {/* 1. Life Support */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200 flex items-center gap-1.5 font-bold">
                    <Wind className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Life Support & CO₂ Scrubbers</span>
                  </span>
                  <span className="text-cyan-300 font-bold">{allocation.lifeSupport} kW</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={allocation.lifeSupport}
                  onChange={(e) => handleSliderChange('lifeSupport', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Min 5 kW (Suffocation risk!)</span>
                  <span>Nominal ~20 kW</span>
                </div>
              </div>

              {/* 2. Thermal Heaters */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200 flex items-center gap-1.5 font-bold">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>Thermal Regolith Heating (-130°C Cold Shield)</span>
                  </span>
                  <span className="text-orange-300 font-bold">{allocation.thermal} kW</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={allocation.thermal}
                  onChange={(e) => handleSliderChange('thermal', Number(e.target.value))}
                  className="w-full accent-orange-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>0 kW (Freezes pipes)</span>
                  <span>Nominal ~18 kW</span>
                </div>
              </div>

              {/* 3. Radiation Shielding */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200 flex items-center gap-1.5 font-bold">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>EM Deflector & Water Wall Pumps</span>
                  </span>
                  <span className="text-amber-300 font-bold">{allocation.shielding} kW</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={allocation.shielding}
                  onChange={(e) => handleSliderChange('shielding', Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>0 kW (Full cosmic rays)</span>
                  <span>Nominal ~15 kW</span>
                </div>
              </div>

              {/* 4. Greenhouse LED Grow Lamps */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200 flex items-center gap-1.5 font-bold">
                    <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Hydroponic Grow Lamps & Nutrient Flow</span>
                  </span>
                  <span className="text-emerald-300 font-bold">{allocation.greenhouse} kW</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={allocation.greenhouse}
                  onChange={(e) => handleSliderChange('greenhouse', Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>0 kW (Crops wilt)</span>
                  <span>Nominal ~15 kW</span>
                </div>
              </div>

              {/* 5. Science Lab Laser Drill */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200 flex items-center gap-1.5 font-bold">
                    <Microscope className="w-3.5 h-3.5 text-purple-400" />
                    <span>Science Spectrometer & Core Drill (+Pts)</span>
                  </span>
                  <span className="text-purple-300 font-bold">{allocation.science} kW</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={allocation.science}
                  onChange={(e) => handleSliderChange('science', Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>0 kW (No science discoveries)</span>
                  <span>Max ~25 kW</span>
                </div>
              </div>

              {/* 6. Deep Space Comms */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200 flex items-center gap-1.5 font-bold">
                    <Radio className="w-3.5 h-3.5 text-blue-400" />
                    <span>High-Gain Comm Dish (Downlink to Houston)</span>
                  </span>
                  <span className="text-blue-300 font-bold">{allocation.comms} kW</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={allocation.comms}
                  onChange={(e) => handleSliderChange('comms', Number(e.target.value))}
                  className="w-full accent-blue-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>0 kW (Comms blackout)</span>
                  <span>Nominal ~8 kW</span>
                </div>
              </div>

            </div>

            {/* Advance Sol Button */}
            <button
              onClick={handleAdvanceSol}
              disabled={isSimulating}
              className="w-full py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all active:scale-95 disabled:opacity-50"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{isSimulating ? 'SIMULATING ORBIT CYCLE...' : `SIMULATE & ADVANCE TO SOL ${sandboxState.sol + 1}`}</span>
            </button>

          </div>

          {/* Right Column: Mission Logs & Dosimetry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Radiation Dosimeter Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>CUMULATIVE DOSIMETRY (NASA OSDR)</span>
                </span>
                <span className="text-slate-400 text-[10px]">OSDR-120 Baseline</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-slate-100">
                  {sandboxState.radiationDose_mSv.toFixed(3)}
                </span>
                <span className="text-xs font-mono text-cyan-400">mSv Total Absorbed</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Daily Rate: ~{sandboxState.radiationRate_mSv_day.toFixed(3)} mSv/day (Safe 1-year mission limit: 250 mSv).
              </div>
            </div>

            {/* Sol History Log */}
            <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2 min-h-[260px]">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <History className="w-4 h-4 text-purple-400" />
                  <span>SIMULATED SOL HISTORY ({logs.length})</span>
                </span>
                <span className="text-[10px] text-slate-400">Latest on top</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[320px]">
                {logs.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 font-mono text-xs">
                    No Sols simulated yet. Adjust power allocations on the left and tap "Simulate Sol" to advance the mission!
                  </div>
                ) : (
                  logs.map((log) => (
                    <div
                      key={log.sol}
                      className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 text-xs font-mono space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-cyan-300 flex items-center gap-1">
                          <span>{log.eventIcon}</span>
                          <span>SOL {log.sol}</span>
                        </span>
                        <span className="text-purple-300">+{log.scienceGained} Science</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-sans">
                        {log.notes}
                      </div>
                      <div className="text-[10px] text-slate-400 flex flex-wrap gap-2 pt-1 border-t border-slate-900">
                        <span>Pwr: {log.netPower >= 0 ? `+${log.netPower}` : log.netPower} kW</span>
                        <span>H₂O: {log.netWater >= 0 ? `+${log.netWater}` : log.netWater}%</span>
                        <span>O₂: {log.netOxygen >= 0 ? `+${log.netOxygen}` : log.netOxygen}%</span>
                        <span>Food: {log.netFood >= 0 ? `+${log.netFood}` : log.netFood}%</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
