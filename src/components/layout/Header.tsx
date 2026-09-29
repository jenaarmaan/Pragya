import React from 'react';
import { ShieldCheck, Play, Radio, User, BookOpen, Layers } from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';

export const Header: React.FC = () => {
  const { isAirGapEnforced, setAirGapEnforced, runGoldenDemo, activeTab, setActiveTab } = useWorkbench();

  return (
    <header className="flex flex-col shrink-0 select-none z-20 border-b border-slate-200 bg-white">
      {/* Official Tricolor National Accent Stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Top Portal Utility Bar */}
      <div className="bg-[#0b2545] text-white px-4 lg:px-6 py-2 flex items-center justify-between">
        {/* Left: GoI & PSU Emblem / Institutional Title */}
        <div
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to PRAGYA Home Portal"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-serif text-amber-300 font-bold text-sm tracking-wider group-hover:scale-105 transition-transform">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-300 tracking-wide">
                भारत सरकार | Government of India
              </span>
              <span className="text-white/40 hidden sm:inline">·</span>
              <span className="text-[11px] text-slate-300 hidden md:inline">
                Ministry of Petroleum and Natural Gas
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base font-bold text-white tracking-tight font-sans">
                PRAGYA <span className="text-amber-400 font-serif font-normal text-xs">(प्रज्ञा)</span>
              </span>
              <span className="text-[11px] bg-amber-500/20 text-amber-200 px-1.5 py-0.2 rounded border border-amber-400/30 font-mono font-medium">
                MRPL Mangalore Refinery · SIH26117
              </span>
            </div>
          </div>
        </div>

        {/* Center: System Status & Sovereign Boundary (Air-Gap) */}
        <div className="hidden xl:flex items-center gap-5 text-xs font-mono text-slate-200">
          <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Cluster:</span>
            <span className="text-emerald-300 font-semibold">HPC-AI01 (vLLM Local)</span>
          </div>

          <button
            onClick={() => setAirGapEnforced(!isAirGapEnforced)}
            title="Click to toggle Air-Gap Sovereign Boundary simulation"
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded border border-white/10 transition-colors cursor-pointer text-slate-200"
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isAirGapEnforced ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className="text-slate-300">Boundary:</span>
            <span className={isAirGapEnforced ? 'text-emerald-300 font-semibold' : 'text-amber-300 font-semibold'}>
              {isAirGapEnforced ? 'AIR-GAPPED' : 'TEST-MODE'}
            </span>
          </button>

          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
            <Radio className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-slate-300">Egress:</span>
            <span className="text-emerald-300 font-semibold">0 EXTERNAL CALLS</span>
          </div>
        </div>

        {/* Right: Quick Documentation & Golden Demo Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer border ${
              activeTab === 'docs'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Docs & Features</span>
          </button>

          <button
            onClick={runGoldenDemo}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center gap-1.5 shadow-sm font-sans cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Golden Demo</span>
          </button>

          <div className="h-5 w-px bg-white/20 mx-1 hidden sm:block" />

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-white leading-tight">K. S. Rao</div>
              <div className="text-[10px] text-amber-200/80 font-mono">Lead Metallurgist · MRPL</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
