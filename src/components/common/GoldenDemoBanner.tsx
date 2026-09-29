import React from 'react';
import { Play, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';

export const GoldenDemoBanner: React.FC = () => {
  const { runGoldenDemo, currentTask } = useWorkbench();

  const isDemoRunning = currentTask?.status && !['COMPLETED', 'AWAITING_APPROVAL', 'CREATED'].includes(currentTask.status);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded bg-amber-100 text-amber-800 shrink-0 mt-0.5 border border-amber-200">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              SIH 2026 Golden Demo Scenario · MRPL DHDS-2 Turnaround
            </h4>
            <span className="text-[10px] text-blue-700 font-mono font-semibold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
              MRPL-INSP-2026-DHDS-041
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            &ldquo;Analyze uploaded industrial inspection report, compare findings with maintenance SOP-2401, verify API 579 criteria, and prepare executive approval note.&rdquo;
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
        <button
          onClick={runGoldenDemo}
          disabled={isDemoRunning}
          className={`px-3.5 py-1.5 text-xs font-bold rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
            isDemoRunning
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
          }`}
        >
          {isDemoRunning ? (
            <>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>Executing Pipeline...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch End-to-End Demo</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
