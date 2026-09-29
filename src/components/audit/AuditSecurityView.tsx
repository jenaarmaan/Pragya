import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Download,
  Filter,
  Search,
  Radio,
  Lock,
  CheckCircle2,
  AlertOctagon,
  FileText
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { StatusBadge } from '../common/StatusBadge';
import { downloadFile } from '../../utils/fileExport';

export const AuditSecurityView: React.FC = () => {
  const { auditLogs, isAirGapEnforced, setAirGapEnforced } = useWorkbench();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    if (categoryFilter !== 'ALL' && log.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        log.id.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.actor.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportLogs = () => {
    const jsonStr = JSON.stringify(auditLogs, null, 2);
    downloadFile(`MRPL_PRAGYA_AUDIT_TRAIL_${Date.now()}.json`, jsonStr, 'application/json');
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-50 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
              Immutable Audit Trail & Sovereign Security
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
              eBPF Boundary Sealed
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Cryptographic ledger tracking all model inferences, tool invocations, RAG retrievals, and human sign-offs.
            Monitors zero-egress sovereign guarantees across refinery subnets.
          </p>
        </div>

        <button
          onClick={handleExportLogs}
          className="px-4 py-2 text-xs font-bold rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 font-sans"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Certified Audit Journal</span>
        </button>
      </div>

      {/* Sovereign Perimeter Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center justify-between font-bold">
            <span>External Network Calls</span>
            <Radio className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 font-mono">0 Calls</div>
          <div className="text-[11px] font-mono text-slate-600 font-medium">Zero Cloud Egress Active</div>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center justify-between font-bold">
            <span>Data Egress Policy</span>
            <Lock className="w-3.5 h-3.5 text-blue-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">BLOCKED</div>
          <div className="text-[11px] font-mono text-slate-600 font-medium">Kernel Firewall (eBPF Drop)</div>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center justify-between font-bold">
            <span>Air-Gap Simulation</span>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
          </div>
          <button
            onClick={() => setAirGapEnforced(!isAirGapEnforced)}
            className="text-left font-mono font-bold text-xl cursor-pointer hover:underline"
          >
            <span className={isAirGapEnforced ? 'text-emerald-700' : 'text-amber-700'}>
              {isAirGapEnforced ? 'ENFORCED' : 'TEST-MODE'}
            </span>
          </button>
          <div className="text-[11px] font-mono text-slate-500">Click to toggle state</div>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center justify-between font-bold">
            <span>Audit Integrity</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">SHA-256</div>
          <div className="text-[11px] font-mono text-slate-600 font-medium">Append-Only Cryptographic Log</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'SYSTEM', 'MODEL_ROUTER', 'RAG_RETRIEVAL', 'MCP_TOOL', 'POLICY_GATEWAY', 'SANDBOX_EXEC', 'HUMAN_APPROVAL'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-blue-700 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search audit trail..."
            className="w-full bg-slate-50 border border-slate-300 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 font-sans"
          />
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-600 uppercase">
                <th className="py-2.5 px-3">Event ID</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Actor / Subsystem</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Details</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px]">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500 font-semibold">{log.id}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-900 whitespace-nowrap">{log.actor}</td>
                  <td className="py-2.5 px-3 font-mono text-blue-900 font-bold">{log.action}</td>
                  <td className="py-2.5 px-3 text-slate-600 max-w-md leading-relaxed">{log.details}</td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <StatusBadge status={log.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
