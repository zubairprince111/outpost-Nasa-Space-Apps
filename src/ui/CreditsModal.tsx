import React from 'react';
import { X, ExternalLink, ShieldCheck, Database, Radio, Dna } from 'lucide-react';

interface CreditsProps {
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 z-[80] pointer-events-none flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-md pointer-events-auto" onClick={onClose} />

      <div className="relative pointer-events-auto w-full max-w-2xl bg-slate-950/95 border border-cyan-500/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 max-h-[88vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-100">NASA Open Science Datasets & Attribution</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          OUTPOST grounds its simulation, telemetry, and decision trade-offs in real NASA open data and open-source scientific assets for the NASA Space Apps Challenge 2026:
        </p>

        <div className="space-y-3 text-xs">
          {/* NASA DONKI */}
          <div className="bg-slate-900/80 border border-amber-500/40 rounded-xl p-3">
            <div className="flex items-center justify-between font-bold text-slate-100 mb-1">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Database className="w-4 h-4 text-amber-400" />
                <span>NASA DONKI Space Weather Database</span>
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                NASA OPEN DATA
              </span>
            </div>
            <p className="text-slate-300 mb-1 leading-relaxed">
              Real Coronal Mass Ejection (CME) shock speeds (up to 2,128 km/s), Solar Flare classifications (X8.7 Solar Cycle 25 Peak), and Solar Energetic Particle (SEP) proton flux rates from NASA Goddard Space Flight Center.
            </p>
            <a href="https://kauai.ccmc.gsfc.nasa.gov/DONKI/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1 text-[11px] font-mono">
              Visit NASA DONKI Portal <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* NASA OSDR */}
          <div className="bg-slate-900/80 border border-emerald-500/40 rounded-xl p-3">
            <div className="flex items-center justify-between font-bold text-slate-100 mb-1">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <Dna className="w-4 h-4 text-emerald-400" />
                <span>NASA Open Science Data Repository (OSDR)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                NASA OPEN DATA
              </span>
            </div>
            <p className="text-slate-300 mb-1 leading-relaxed">
              Studies OSDR-120 (NASA Twins Study DNA and cognitive dosimetry), OSDR-311 (Plant Habitat-04 chili pepper and microgreen cultivation under cosmic radiation), and OSDR-485 (bone mineral density loss mitigation).
            </p>
            <a href="https://osdr.nasa.gov/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1 text-[11px] font-mono">
              Explore NASA OSDR Repository <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Artemis & Mars Perseverance */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="flex items-center justify-between font-bold text-slate-100 mb-1">
              <span>Artemis LROC / Diviner & Mars Perseverance MEDA</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/40">
                PLANETARY TELEMETRY
              </span>
            </div>
            <p className="text-slate-400 mb-1">
              Shackleton Crater Lunar South Pole illumination angles and cryogenic temperatures; Jezero Crater delta atmospheric pressure (750 Pa), dust optical depth (tau), and Deep Space Network light-speed latency.
            </p>
          </div>

          {/* Kenney & 3D Models */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="flex items-center justify-between font-bold text-slate-100 mb-1">
              <span>Kenney Space & Station Kits (3D Models)</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                CC0 PUBLIC DOMAIN
              </span>
            </div>
            <p className="text-slate-400 mb-1">
              Astronauts, Rover, Biodome Hangar, Habitat Modules, Parabolic Antenna, Regolith Boulders.
            </p>
          </div>

          {/* Audio */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="flex items-center justify-between font-bold text-slate-100 mb-1">
              <span>Soundtracks & Space Soundscape</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/40">
                ROYALTY FREE / CC
              </span>
            </div>
            <p className="text-slate-400">
              "Reloj en el Vacío", "Red Alert Corridor", and Web Audio API synthesized tactile interface cues.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors mt-2"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};
