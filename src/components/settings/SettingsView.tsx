import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  RotateCcw,
  Server,
  Database,
  CheckCircle2,
  AlertTriangle,
  Building2
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';

export const SettingsView: React.FC = () => {
  const { isAirGapEnforced, setAirGapEnforced, demoMode, setDemoMode, resetAllData } = useWorkbench();
  const [resetNotification, setResetNotification] = useState(false);

  const handleReset = () => {
    resetAllData();
    setResetNotification(true);
    setTimeout(() => setResetNotification(false), 2500);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-50 text-slate-800">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
            System & Governance Settings
          </h1>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
            Admin Configuration
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Manage local deployment parameters, sovereign boundary enforcement, and hackathon test datasets.
        </p>
      </div>

      {resetNotification && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 font-mono flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">All workbench state has been restored to default SIH 2026 Golden Demo baseline!</span>
        </div>
      )}

      {/* Sovereign Security & Air-Gap */}
      <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 font-sans flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Sovereign Boundary Policies</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-900 font-sans">
                Air-Gap Boundary Enforcement
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 font-sans">
                Hard drop all external network connections at the OS kernel level via eBPF filters.
              </p>
            </div>
            <button
              onClick={() => setAirGapEnforced(!isAirGapEnforced)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-colors cursor-pointer border ${
                isAirGapEnforced
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              {isAirGapEnforced ? 'ENFORCED' : 'DISABLED'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-900 font-sans">
                SIH Demonstration Mode
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 font-sans">
                Pre-populate verified sample tasks, NDT inspection reports, and industrial SOPs.
              </p>
            </div>
            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-colors cursor-pointer border ${
                demoMode
                  ? 'bg-blue-700 text-white border-blue-800'
                  : 'bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              {demoMode ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>
      </div>

      {/* Refinery Node Identity */}
      <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 font-sans flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-700" />
          <span>Refinery Node Topology & Identity</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Operating Entity</span>
            <div className="text-slate-900 font-bold">Mangalore Refinery and Petrochemicals Limited</div>
            <div className="text-slate-500 text-[10px]">Ministry of Petroleum and Natural Gas</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Plant Unit ID</span>
            <div className="text-slate-900 font-bold">MRPL-MANGALORE-DHDS-02</div>
            <div className="text-slate-500 text-[10px]">Turnaround 2026 Scheduled Enclave</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Local vLLM Server Host</span>
            <div className="text-blue-800 font-bold">HPC-AI01 (10.14.8.50:8000)</div>
            <div className="text-slate-500 text-[10px]">Isolated GPU Cluster (NVIDIA A100x4)</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Compliance Jurisdiction</span>
            <div className="text-slate-900 font-bold">OISD-118 / PESO / DPDP Act 2023</div>
            <div className="text-emerald-700 font-semibold text-[10px]">Sovereign On-Premise Certified</div>
          </div>
        </div>
      </div>

      {/* System State Reset for Demo */}
      <div className="p-5 rounded-lg bg-white border border-rose-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-rose-800 font-sans flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-rose-600" />
          <span>Reset Workbench State</span>
        </h3>
        <p className="text-xs text-slate-600">
          Reset all task runs, audit logs, and approval queues back to the pristine SIH 2026 evaluation baseline.
        </p>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-md text-xs font-bold text-rose-700 border border-rose-300 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer font-sans"
        >
          Reset All Data to Demo Baseline
        </button>
      </div>
    </div>
  );
};
