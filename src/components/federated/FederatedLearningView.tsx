import React from 'react';
import {
  Network,
  ShieldCheck,
  Server,
  Play,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingDown,
  Layers,
  Database
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { FEDERATED_NODES } from '../../data/sampleFederated';
import { StatusBadge } from '../common/StatusBadge';

export const FederatedLearningView: React.FC = () => {
  const { federatedRounds, triggerFederatedRound } = useWorkbench();

  const isRoundRunning = federatedRounds.some(r => r.status === 'RUNNING');

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-50 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
              Federated Learning & Model Governance
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
              Flower-Compatible FL Framework
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Collaborative model fine-tuning across public-sector refinery enclaves without moving confidential
            operational telemetry or raw maintenance reports outside local sovereign perimeters.
          </p>
        </div>

        <button
          onClick={triggerFederatedRound}
          disabled={isRoundRunning}
          className={`px-4 py-2 text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 font-sans ${
            isRoundRunning
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-blue-700 hover:bg-blue-800 text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
          <span>{isRoundRunning ? 'Aggregating Round Weights...' : 'Trigger New FL Training Round'}</span>
        </button>
      </div>

      {/* Rationale Banner */}
      <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-2">
        <div className="text-xs font-mono uppercase text-blue-800 font-bold tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Why Federated Learning for Sovereign Industrial AI?</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-sans">
          Refineries like <strong>MRPL, CPCL, and IOCL</strong> maintain highly sensitive operational telemetry,
          failure rates, and proprietary process yields that cannot be shared with external vendors or cross-plant databases.
          Federated Learning trains models locally on each refinery&apos;s private cluster, transmitting only
          <strong> differentially-private parameter gradient updates</strong> to a coordinator.
        </p>
      </div>

      {/* Participating Refinery Nodes */}
      <div>
        <div className="text-xs font-mono uppercase text-slate-600 mb-3 flex items-center justify-between font-bold">
          <span>Participating Sovereign Refinery Nodes</span>
          <span className="text-emerald-700 font-semibold">3/3 Enclaves Synced</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEDERATED_NODES.map(node => (
            <div
              key={node.id}
              className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-sans">{node.name}</h3>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">{node.location}</div>
                  </div>
                  <StatusBadge status={node.status} />
                </div>

                <div className="space-y-1.5 p-2.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600 mt-3">
                  <div className="flex justify-between">
                    <span>Local Data Samples:</span>
                    <span className="text-slate-900 font-bold tabular-nums">{node.localDataCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compute Enclave:</span>
                    <span className="text-slate-800">{node.computeNode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Differential Privacy:</span>
                    <span className="text-blue-700 font-semibold">ε = {node.privacyEpsilon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Round Loss:</span>
                    <span className="text-emerald-700 font-bold font-mono">{node.lastRoundLoss}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Data Isolation: Air-Gapped</span>
                <span className="text-emerald-700 font-bold">RAW DATA KEPT LOCAL</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Federated Rounds History */}
      <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Federated Aggregation Training Rounds
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">FedAvg + Secure DP</span>
        </div>

        <div className="space-y-2.5">
          {federatedRounds.map(round => (
            <div
              key={round.roundNumber}
              className={`p-3.5 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                round.status === 'RUNNING'
                  ? 'bg-blue-50/60 border-blue-400 shadow-xs ring-1 ring-blue-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-sm font-bold text-slate-900">
                    Round #{round.roundNumber}
                  </span>
                  <StatusBadge status={round.status} />
                  <span className="text-slate-300">·</span>
                  <span className="text-[11px] font-mono text-blue-800 font-bold">{round.accuracyDelta}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {round.aggregationMethod} · Privacy: {round.differentialPrivacyBudget}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 shrink-0">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Global Loss</div>
                  <div className="text-slate-900 font-bold">{round.globalLoss}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Started</div>
                  <div className="text-slate-700 font-medium">{round.startedAt.split(' ')[1]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
