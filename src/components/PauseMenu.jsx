import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Home, Settings } from 'lucide-react';

export default function PauseMenu({ onResume, onRestart, onMainMenu }) {
  const [mounted, setMounted] = useState(false);
  const [resumeHovered, setResumeHovered] = useState(false);
  const [restartHovered, setRestartHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main menu container */}
      <div
        className={`
          relative z-10 w-full max-w-md px-6 transition-all duration-500
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        <div className="rounded-2xl overflow-visible border-2 border-cyan-400/30 backdrop-blur-xl bg-slate-900/80 shadow-[0_0_60px_rgba(0,255,255,0.3)]">
          {/* Glow effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none rounded-2xl" />
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-20 blur-xl pointer-events-none rounded-2xl" />
          
          <div className="relative p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 rounded-full mb-4">
                <span className="text-cyan-300 text-xs font-mono tracking-wider uppercase">
                  Jeu en Pause
                </span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-2"
                  style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                PAUSE
              </h1>
              <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-4" />
            </div>

            {/* Menu Options */}
            <div className="space-y-4">
              <button
                onClick={onResume}
                onMouseEnter={() => setResumeHovered(true)}
                onMouseLeave={() => setResumeHovered(false)}
                className={`
                  relative w-full py-4 px-6 rounded-xl font-semibold text-lg
                  bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950
                  transition-all duration-300
                  hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
                  ${resumeHovered ? "scale-105" : "scale-100"}
                  group
                `}
              >
                <div className="flex items-center justify-center gap-3">
                  <Play className={`w-5 h-5 transition-transform ${resumeHovered ? "scale-110 rotate-0" : "scale-100"}`} />
                  Reprendre
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>

              <button
                onClick={onRestart}
                onMouseEnter={() => setRestartHovered(true)}
                onMouseLeave={() => setRestartHovered(false)}
                className={`
                  relative w-full py-4 px-6 rounded-xl font-semibold text-lg
                  bg-slate-800/80 border-2 border-cyan-400/30 text-cyan-300
                  transition-all duration-300
                  hover:border-cyan-400 hover:bg-slate-800
                  hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]
                  ${restartHovered ? "scale-105" : "scale-100"}
                  group
                `}
              >
                <div className="flex items-center justify-center gap-3">
                  <RotateCcw className={`w-5 h-5 transition-transform ${restartHovered ? "rotate-180" : ""}`} />
                  Recommencer
                </div>
              </button>

              <button
                onClick={onMainMenu}
                onMouseEnter={() => setMenuHovered(true)}
                onMouseLeave={() => setMenuHovered(false)}
                className={`
                  relative w-full py-4 px-6 rounded-xl font-semibold text-lg
                  bg-slate-800/60 border-2 border-slate-600/50 text-slate-300
                  transition-all duration-300
                  hover:border-slate-400 hover:text-white
                  hover:bg-slate-800/80
                  ${menuHovered ? "scale-105" : "scale-100"}
                  group
                `}
              >
                <div className="flex items-center justify-center gap-3">
                  <Home className={`w-5 h-5 transition-transform ${menuHovered ? "scale-110" : ""}`} />
                  Menu Principal
                </div>
              </button>
            </div>

            {/* Footer hint */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-xs font-mono">
                Appuyez sur <span className="text-cyan-400 font-bold">ESC</span> pour reprendre
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

