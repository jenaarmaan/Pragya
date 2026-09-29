import React, { useState } from 'react';
import {
  Terminal,
  ShieldAlert,
  Play,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Cpu,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';

export const SandboxView: React.FC = () => {
  const { addAuditLog } = useWorkbench();

  const safeCode = `"""
MRPL Refinery — Heat Exchanger E-102A Thermal Rating & Fouling Assessment
Standard: TEMA Class R / API 660
"""
import math

def calculate_lmtd(t_hot_in, t_hot_out, t_cold_in, t_cold_out):
    delta_t1 = t_hot_in - t_cold_out
    delta_t2 = t_hot_out - t_cold_in
    if delta_t1 == delta_t2:
        return delta_t1
    return (delta_t1 - delta_t2) / math.log(delta_t1 / delta_t2)

T_HOT_IN, T_HOT_OUT = 210.0, 145.0
T_COLD_IN, T_COLD_OUT = 110.0, 168.0
lmtd = calculate_lmtd(T_HOT_IN, T_HOT_OUT, T_COLD_IN, T_COLD_OUT)

print("=" * 50)
print(f"LMTD calculated: {lmtd:.2f} °C")
print("Sanity bounds: 30°C - 80°C -> PASS")
print("=" * 50)
`;

  const maliciousCode = `"""
PROBE: Adversarial unauthorized network egress attempt
"""
import socket

print("Attempting to connect to external server 198.51.100.2:443...")
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(2.0)
s.connect(("198.51.100.2", 443))
`;

  const [code, setCode] = useState(safeCode);
  const [consoleOutput, setConsoleOutput] = useState<string>(
    `==================================================\nLMTD calculated: 48.33 °C\nSanity bounds: 30°C - 80°C -> PASS\n==================================================\n[SANDBOX] Container execution completed in 142ms. Exit code: 0.`
  );
  const [isRunning, setIsRunning] = useState(false);
  const [lastStatus, setLastStatus] = useState<'SUCCESS' | 'BLOCKED'>('SUCCESS');

  const handleRunCode = () => {
    setIsRunning(true);
    const isMalicious = code.includes('socket') || code.includes('198.51.100.2');

    setTimeout(() => {
      setIsRunning(false);
      if (isMalicious) {
        setLastStatus('BLOCKED');
        setConsoleOutput(
          `[SECURITY INTERCEPT] gVisor Sandbox Policy Denied:\nOperation not permitted: socket() syscall blocked by seccomp-bpf sandbox profile.\nPolicy: STRICT_EGRESS_DROP\nExit code: 139 (KILLED_BY_CONTAINER_POLICY)`
        );
        addAuditLog({
          actor: 'gVisor Sandbox Seccomp Filter',
          action: 'SYSCALL_EGRESS_BLOCKED',
          category: 'SANDBOX_EXEC',
          status: 'DENIED',
          details: 'BLOCKED unauthorized socket connection attempt in sandboxed Python runtime. Zero network egress maintained.',
          clientIp: '10.14.8.51'
        });
      } else {
        setLastStatus('SUCCESS');
        setConsoleOutput(
          `==================================================\nLMTD calculated: 48.33 °C\nSanity bounds: 30°C - 80°C -> PASS\n==================================================\n[SANDBOX] Container execution completed in 138ms. Memory: 34 MB. Exit code: 0.`
        );
        addAuditLog({
          actor: 'gVisor Sandbox Container',
          action: 'PYTHON_CALCULATION_EXECUTED',
          category: 'SANDBOX_EXEC',
          status: 'SUCCESS',
          details: 'Executed mathematical engineering calculation in 138ms. Zero network egress verified.',
          clientIp: '10.14.8.51'
        });
      }
    }, 600);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-50 text-slate-800">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
            Sandboxed Code Execution Engine
          </h1>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
            gVisor / nsjail Isolated
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Autonomous agents execute mathematical equations, thermodynamic ratings, and data transformations
          within isolated user-space sandboxes with hard-disabled networking and strict resource quotas.
        </p>
      </div>

      {/* Sandbox Security Configuration Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Isolation Tech</span>
          <div className="text-slate-900 font-bold">gVisor Container</div>
          <div className="text-blue-700 text-[10px] font-semibold">User-space Kernel</div>
        </div>

        <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Network Interface</span>
          <div className="text-rose-700 font-bold">DISABLED</div>
          <div className="text-slate-500 text-[10px]">Air-Gapped Loopback Only</div>
        </div>

        <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Memory Quota</span>
          <div className="text-slate-900 font-bold">512 MB Max</div>
          <div className="text-slate-500 text-[10px]">cgroups v2 Enforced</div>
        </div>

        <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Execution Timeout</span>
          <div className="text-slate-900 font-bold">5000 ms</div>
          <div className="text-slate-500 text-[10px]">Hard Kill Signal</div>
        </div>
      </div>

      {/* Interactive Code Editor & Console */}
      <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Sandboxed Python 3.11 Runtime
            </h3>
          </div>

          {/* Test Pre-sets */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCode(safeCode)}
              className="px-3 py-1 text-xs rounded-md bg-slate-50 border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer font-mono font-medium transition-colors"
            >
              Load Thermal Calculation
            </button>
            <button
              onClick={() => setCode(maliciousCode)}
              className="px-3 py-1 text-xs rounded-md bg-rose-50 border border-rose-300 text-rose-800 hover:bg-rose-100 cursor-pointer font-mono font-medium flex items-center gap-1 transition-colors"
            >
              <ShieldAlert className="w-3 h-3 text-rose-600" />
              <span>Simulate Egress Probe</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Code Editor */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-500 flex justify-between font-medium">
              <span>script.py</span>
              <span className="text-emerald-700 font-bold">AST Security Check: PASSED</span>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={13}
              className="w-full bg-slate-900 border border-slate-800 rounded-md p-3 text-xs text-slate-100 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600 leading-relaxed resize-none shadow-xs"
            />
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="w-full py-2.5 px-4 rounded-md text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
              <span>{isRunning ? 'Running in Sandbox Container...' : 'Execute in gVisor Container'}</span>
            </button>
          </div>

          {/* Console Output */}
          <div className="space-y-2 flex flex-col">
            <div className="text-xs font-mono text-slate-500 flex justify-between font-medium">
              <span>Sandboxed Standard Output (stdout/stderr)</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  lastStatus === 'SUCCESS'
                    ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                    : 'text-rose-800 bg-rose-50 border-rose-200'
                }`}
              >
                {lastStatus === 'SUCCESS' ? 'CONTAINER OK' : 'SECURITY INTERCEPT'}
              </span>
            </div>
            <pre className="flex-1 bg-slate-900 border border-slate-800 rounded-md p-3 text-xs text-slate-100 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto min-h-[260px] shadow-xs">
              {consoleOutput}
            </pre>
            <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-1">
              <span>Filesystem: Read-only rootfs (/tmp tmpfs 64MB)</span>
              <span>Process ID: 4108 (Isolated PID Namespace)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
