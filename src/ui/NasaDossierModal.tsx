import React, { useState, useEffect } from 'react';
import { NASADataService, DonkiEvent, OsdrStudy } from '../simulation/NASADataService';
import { DestinationType } from '../simulation/SimulationModels';
import {
  X,
  ExternalLink,
  Sun,
  Dna,
  Compass,
  Calculator,
  ShieldCheck,
  Radio,
  Sparkles,
  Zap,
  Heart,
  Droplets,
  Wind
} from 'lucide-react';

interface NasaDossierProps {
  onClose: () => void;
  destination: DestinationType;
}

export const NasaDossierModal: React.FC<NasaDossierProps> = ({ onClose, destination }) => {
  const [activeTab, setActiveTab] = useState<'donki' | 'osdr' | 'environments' | 'math'>('donki');
  const [donkiEvents, setDonkiEvents] = useState<DonkiEvent[]>(NASADataService.DONKI_RECORDS);
  const [isLoadingDonki, setIsLoadingDonki] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingDonki(true);
    NASADataService.getLatestSpaceWeather().then((events) => {
      if (isMounted) {
        setDonkiEvents(events);
        setIsLoadingDonki(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const lunarEnv = NASADataService.PLANETARY_ENVIRONMENTS.moon;
  const marsEnv = NASADataService.PLANETARY_ENVIRONMENTS.mars;

  return (
    <div className="absolute inset-0 z-[70] pointer-events-none flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md pointer-events-auto" onClick={onClose} />

      <div className="relative pointer-events-auto w-full max-w-4xl max-h-[92dvh] overflow-hidden bg-slate-950/95 border-2 border-cyan-500/60 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.35)] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300 shrink-0">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  NASA OPEN SCIENCE & TELEMETRY HUB
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-950/80 border border-purple-500/50 text-purple-300">
                  VERIFIED OPEN DATA
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-slate-100">
                Ground Truth Science Dossier
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
            title="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-2 sm:px-5 bg-slate-900/40 border-b border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('donki')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'donki'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span>DONKI SPACE WEATHER ({donkiEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('osdr')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'osdr'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Dna className="w-4 h-4 text-emerald-400" />
            <span>OSDR SPACE BIOLOGY & DOSIMETRY</span>
          </button>

          <button
            onClick={() => setActiveTab('environments')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'environments'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>ARTEMIS MOON VS JEZERO MARS</span>
          </button>

          <button
            onClick={() => setActiveTab('math')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'math'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-4 h-4 text-purple-400" />
            <span>ENGINEERING MATH & FORMULAS</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* TAB 1: DONKI SPACE WEATHER */}
          {activeTab === 'donki' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-amber-300 flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <span>NASA Space Weather Database Of Notifications (DONKI)</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    DONKI provides real-time and archived space weather models developed at NASA Goddard Space Flight Center. In OUTPOST, solar storm challenges are directly driven by real DONKI Coronal Mass Ejection (CME) and Solar Flare events.
                  </p>
                </div>
                <a
                  href="https://kauai.ccmc.gsfc.nasa.gov/DONKI/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-200 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0"
                >
                  <span>DONKI Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {donkiEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:border-amber-500/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                          {evt.type} • {evt.classOrSpeed}
                        </span>
                        <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded ${
                          evt.radiationIndex === 'CRITICAL' ? 'bg-red-950 text-red-300 border border-red-500/50' : 'bg-amber-950 text-amber-300'
                        }`}>
                          {evt.radiationIndex} RADIATION
                        </span>
                      </div>

                      <h4 className="text-xs font-mono text-cyan-300 font-bold mb-1">
                        {evt.id}
                      </h4>
                      <p className="text-xs text-slate-200 font-sans leading-relaxed mb-2">
                        {evt.summary}
                      </p>
                      
                      <div className="bg-slate-950/80 rounded-xl p-2.5 border border-slate-800 text-[11px] space-y-1 font-mono">
                        <div className="text-amber-300">
                          <span className="text-slate-400">ARRIVAL LAG: </span>{evt.estimatedArrivalOutpost}
                        </div>
                        <div className="text-purple-300">
                          <span className="text-slate-400">ENGINEERING IMPACT: </span>{evt.scientificImpact}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono text-[10px]">{evt.eventTime}</span>
                      <a
                        href={evt.referenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-mono"
                      >
                        <span>View NASA Record</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: OSDR SPACE BIOLOGY & DOSIMETRY */}
          {activeTab === 'osdr' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-emerald-300 flex items-center gap-2">
                    <Dna className="w-4 h-4" />
                    <span>NASA Open Science Data Repository (OSDR)</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    NASA's OSDR hosts biological, genomic, and radiation dosimetry datasets from Apollo, Shuttle, ISS, and analog missions. OUTPOST grounds all astronaut health, greenhouse crop yield, and radiation dose curves in real OSDR scientific peer-reviewed studies.
                  </p>
                </div>
                <a
                  href="https://osdr.nasa.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0"
                >
                  <span>OSDR Database</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Radiation Benchmarks Bar */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
                <h4 className="text-xs font-mono font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>REAL RADIATION BENCHMARKS (mSv/day) — MEASURED BY NASA MISSIONS</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {NASADataService.RADIATION_BENCHMARKS.slice(0, 4).map((bench, idx) => (
                    <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-400 truncate">{bench.label}</div>
                      <div className="text-base font-black font-mono text-cyan-300">{bench.dose_mSv_day} mSv</div>
                      <div className="text-[9px] text-slate-400 mt-0.5 truncate">{bench.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Studies Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {NASADataService.OSDR_STUDIES.map((study) => (
                  <div
                    key={study.id}
                    className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:border-emerald-500/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                          {study.id}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 truncate">
                          {study.organismOrSubject}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-100 mb-1 leading-snug">
                        {study.title}
                      </h4>
                      <div className="text-[11px] text-slate-300 font-sans leading-relaxed mb-2">
                        {study.dosimetryFinding}
                      </div>

                      <div className="bg-slate-950/80 rounded-xl p-2.5 border border-slate-800 text-[11px] space-y-1 font-mono">
                        <div className="text-emerald-300">
                          <span className="text-slate-400">STEM PRINCIPLE: </span>{study.stemTakeaway}
                        </div>
                        <div className="text-cyan-300">
                          <span className="text-slate-400">FOR YOUNG LEARNERS: </span>{study.kidExplanation || study.kidSummary}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono text-[10px]">{study.mission}</span>
                      <a
                        href={study.referenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 font-mono"
                      >
                        <span>View Study in OSDR</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ARTEMIS MOON VS JEZERO MARS */}
          {activeTab === 'environments' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Moon Shackleton Base */}
                <div className={`p-5 rounded-3xl border-2 flex flex-col justify-between gap-4 transition-all ${
                  destination === 'moon'
                    ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-950/80 border-slate-800 opacity-90'
                }`}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                        🌕 ARTEMIS BASE CAMP
                      </span>
                      <span className="text-xs font-mono text-cyan-400 font-bold">1.3s COMMS LAG</span>
                    </div>

                    <h3 className="text-base font-black text-slate-100 mb-1">
                      {lunarEnv.locationName}
                    </h3>
                    <p className="text-xs text-slate-300 font-mono mb-3">
                      Coordinates: {lunarEnv.coordinates}
                    </p>

                    <div className="space-y-2 text-xs font-mono bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">GRAVITY:</span>
                        <span className="text-slate-200 font-bold">{lunarEnv.gravity}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">ATMOSPHERE:</span>
                        <span className="text-slate-200 font-bold">{lunarEnv.atmosphere}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">TEMPERATURE SWING:</span>
                        <span className="text-slate-200 font-bold">{lunarEnv.surfaceTempRange}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">DAY / NIGHT CYCLE:</span>
                        <span className="text-slate-200 font-bold">{lunarEnv.dayNightCycle}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">BASE RADIATION:</span>
                        <span className="text-amber-400 font-bold">{lunarEnv.radiationBaseline_mSv_day} mSv/day</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-[11px] font-mono text-cyan-300 font-bold mb-1">PRIMARY SURVIVAL HAZARDS:</div>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                        {lunarEnv.primaryHazards.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans italic border-t border-slate-800 pt-2">
                    {lunarEnv.nasaMissionContext}
                  </p>
                </div>

                {/* Mars Jezero Delta */}
                <div className={`p-5 rounded-3xl border-2 flex flex-col justify-between gap-4 transition-all ${
                  destination === 'mars'
                    ? 'bg-slate-900/90 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-950/80 border-slate-800 opacity-90'
                }`}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                        🔴 PERSEVERANCE OUTPOST
                      </span>
                      <span className="text-xs font-mono text-amber-400 font-bold">14.0 min COMMS LAG</span>
                    </div>

                    <h3 className="text-base font-black text-slate-100 mb-1">
                      {marsEnv.locationName}
                    </h3>
                    <p className="text-xs text-slate-300 font-mono mb-3">
                      Coordinates: {marsEnv.coordinates}
                    </p>

                    <div className="space-y-2 text-xs font-mono bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">GRAVITY:</span>
                        <span className="text-slate-200 font-bold">{marsEnv.gravity}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">ATMOSPHERE:</span>
                        <span className="text-slate-200 font-bold">{marsEnv.atmosphere}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">TEMPERATURE SWING:</span>
                        <span className="text-slate-200 font-bold">{marsEnv.surfaceTempRange}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">DAY / NIGHT CYCLE:</span>
                        <span className="text-slate-200 font-bold">{marsEnv.dayNightCycle}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">BASE RADIATION:</span>
                        <span className="text-amber-400 font-bold">{marsEnv.radiationBaseline_mSv_day} mSv/day</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-[11px] font-mono text-amber-300 font-bold mb-1">PRIMARY SURVIVAL HAZARDS:</div>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                        {marsEnv.primaryHazards.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans italic border-t border-slate-800 pt-2">
                    {marsEnv.nasaMissionContext}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: MATHEMATICAL ENGINEERING FORMULAS */}
          {activeTab === 'math' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-purple-950/30 border border-purple-500/40 rounded-2xl p-4">
                <h3 className="text-sm font-extrabold text-purple-300 flex items-center gap-2 mb-1">
                  <Calculator className="w-4 h-4" />
                  <span>Systems Engineering Mathematical Principles (NASA SP-2016-6105)</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every decision in OUTPOST executes deterministic mathematics mirroring real aerospace trade studies. No choice is free: every watt allocated to payload reduces margin elsewhere.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs font-mono">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>1. ELECTRICAL POWER BALANCE (kW)</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[11px]">
                    <code>P_net = P_solar(t, tau) + P_nuclear - Σ P_subsystems</code>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    If <code>P_net &lt; 0</code>, the difference is drawn from the battery storage bank. When battery SOC drops below 25%, low-voltage load shedding triggers emergency brownouts.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="text-rose-300 font-bold flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>2. CUMULATIVE RADIATION DOSIMETRY (mSv)</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[11px]">
                    <code>D_total = Σ [ (D_GCR + D_SEP) × (1 - η_shield) ] × Δt</code>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Shield effectiveness <code>η_shield</code> scales with water wall pumping and regolith thickness. Acute doses above 100 mSv produce physiological cellular damage.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="text-blue-300 font-bold flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span>3. CLOSED-LOOP WATER RECOVERY RATIO (%)</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[11px]">
                    <code>W_reserves(t+1) = W_reserves(t) - C_crew - C_crops + (η_WRS × W_recycled)</code>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    NASA WRS standard operates at <code>η_WRS = 0.98</code>. Leaks to vacuum cause rapid flash boiling, requiring immediate mechanical isolation.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-emerald-400" />
                    <span>4. PHOTOSYNTHESIS & OXYGEN CYCLE (kg O₂/day)</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[11px]">
                    <code>O₂_net = O₂_electrolysis(P) + O₂_plants(PAR, CO₂) - (0.84 kg × N_crew)</code>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Plant oxygen production depends on Photosynthetically Active Radiation (PAR) from tuned 660nm/430nm grow LEDs and carbon dioxide availability.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>NASA SPACE APPS CHALLENGE 2026 • TRACEABLE OPEN SCIENCE</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-colors"
          >
            RETURN TO MISSION
          </button>
        </div>

      </div>
    </div>
  );
};
