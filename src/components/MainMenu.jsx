import React, { useState, useEffect } from 'react';
import { Activity, BarChart3 } from 'lucide-react';
import bgVideo from '../assets/bg_mario_video.mp4';

export default function ResistanceDigitaleMenu() {
  const [mounted, setMounted] = useState(false);
  const [startHovered, setStartHovered] = useState(false);
  const [statsHovered, setStatsHovered] = useState(false);
  const [startPressed, setStartPressed] = useState(false);
  const [statsPressed, setStatsPressed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartClick = () => {
    setStartPressed(true);
    setTimeout(() => {
      alert("Game Starting… (Demo)");
      setStartPressed(false);
    }, 200);
  };

  const handleStatsClick = () => {
    setStatsPressed(true);
    setTimeout(() => {
      alert("Stats Screen… (Demo)");
      setStatsPressed(false);
    }, 200);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-visible"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center' }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* Main menu container - increased width & higher z so text won't be clipped */}
      <div
        className={`
          relative z-30 w-full max-w-3xl px-6 transition-all duration-1000
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        {/* Make sure this wrapper does not hide overflow */}
        <div className="rounded-2xl overflow-visible border border-white/10 backdrop-blur-xl bg-white/5 shadow-[0_0_40px_rgba(0,255,255,0.15)]">
          
          {/* Glow accent (pointer-events none so it won't intercept clicks) */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 to-blue-500/10 pointer-events-none" />

          <div className="relative p-12 pb-16">
            
            {/* Header */}
            <div className="text-center mb-10 overflow-visible">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300 text-xs font-mono tracking-wider">
                Year 2047 • Mission Briefing
              </span>

              {/* Responsive sizes: small on mobile, large on desktop */}
              <h1
                className="mt-6 font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent
                           text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
                style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
              >
                Resistance
              </h1>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight"
                style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
              >
                Digitale
              </h2>

              <p className="text-cyan-300 text-sm sm:text-base font-mono tracking-wider mx-auto max-w-3xl mt-4">
                The network remembers. The code awakens. Your fight begins now. Fight for digital sovereignty against corporate surveillance.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 bg-black/20 rounded-lg p-4 backdrop-blur">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">47</div>
                <div className="text-xs text-slate-400">Levels</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">∞</div>
                <div className="text-xs text-slate-400">Possibilities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">2047</div>
                <div className="text-xs text-slate-400">The Year</div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-32 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            {/* Buttons (kept unchanged functionally) */}
            <div className="space-y-5">
              <button
                onClick={handleStartClick}
                onMouseEnter={() => setStartHovered(true)}
                onMouseLeave={() => setStartHovered(false)}
                className={`
                  relative w-full py-4 rounded-xl font-semibold text-lg
                  bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950
                  transition-all duration-300
                  hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]
                  ${startHovered ? "scale-105" : "scale-100"}
                  ${startPressed ? "scale-95" : ""}
                `}
              >
                <div className="flex items-center justify-center gap-3">
                  <Activity className={`w-5 h-5 transition-transform ${startHovered ? "rotate-90" : ""}`} />
                  Start Mission
                </div>
              </button>

              <button
                onClick={handleStatsClick}
                onMouseEnter={() => setStatsHovered(true)}
                onMouseLeave={() => setStatsHovered(false)}
                className={`
                  relative w-full py-4 rounded-xl font-semibold text-lg
                  bg-slate-900/60 border border-white/10 text-white/80
                  transition-all duration-300
                  hover:border-cyan-300 hover:text-cyan-300
                  ${statsHovered ? "scale-105" : "scale-100"}
                  ${statsPressed ? "scale-95" : ""}
                `}
              >
                <div className="flex items-center justify-center gap-3">
                  <BarChart3 className={`w-5 h-5 transition-all ${statsHovered ? "scale-110 text-cyan-300" : ""}`} />
                  View Stats
                </div>
              </button>
            </div>

            {/* (Optional) footer removed to keep clean */}
          </div>
        </div>
      </div>
    </div>
  );
}
