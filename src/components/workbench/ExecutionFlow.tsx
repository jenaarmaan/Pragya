import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Terminal,
  Cpu,
  Layers,
  Search,
  ShieldCheck,
  FileCheck,
  UserCheck,
  RotateCcw
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { StatusBadge } from '../common/StatusBadge';
import { TaskStatus, ExecutionStep } from '../../types';

export const ExecutionFlow: React.FC = () => {
  const { currentTask, startTaskExecution } = useWorkbench();
  const [expandedStepId, setExpandedStepId] = useState<string | null>('stp-4');

  if (!currentTask) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-slate-500 font-mono text-xs bg-white">
        No task selected. Select or create an industrial task from the left panel.
      </div>
    );
  }

  const pipelineStages: { stage: TaskStatus; label: string }[] = [
    { stage: 'CREATED', label: 'Created' },
    { stage: 'CLASSIFYING', label: 'Classify' },
    { stage: 'ROUTING', label: 'Route' },
    { stage: 'PLANNING', label: 'Plan' },
    { stage: 'EXECUTING', label: 'Execute & MCP' },
    { stage: 'VERIFYING', label: 'Verify' },
    { stage: 'AWAITING_APPROVAL', label: 'Approval' },
    { stage: 'COMPLETED', label: 'Complete' }
  ];

  const currentStageIndex = pipelineStages.findIndex(s => s.stage === currentTask.status);

  const toggleStep = (stepId: string) => {
    setExpandedStepId(prev => (prev === stepId ? null : stepId));
  };

  const getStepIcon = (step: ExecutionStep) => {
    if (step.status === 'completed') return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    if (step.status === 'running') return <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />;
    if (step.status === 'failed') return <AlertCircle className="w-4 h-4 text-rose-600" />;
    return <Clock className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden text-slate-800">
      {/* Center Top: Task Status Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-slate-500 font-semibold">{currentTask.id}</span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <StatusBadge status={currentTask.status} />
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-xs font-mono text-slate-700 hidden sm:inline font-medium">{currentTask.plantUnit}</span>
            </div>
            <h1 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1 font-sans">
              {currentTask.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => startTaskExecution(currentTask.id)}
              className="px-2.5 py-1 text-xs rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer font-mono font-medium shadow-2xs"
              title="Re-run deterministic pipeline for this task"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Rerun Step Chain</span>
            </button>
          </div>
        </div>

        {/* State Machine Visualizer */}
        <div className="mt-3 pt-3 border-t border-slate-200">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
            Deterministic Pipeline Execution State
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {pipelineStages.map((stageItem, idx) => {
              const isPassed = currentStageIndex > idx || currentTask.status === 'COMPLETED';
              const isCurrent = currentStageIndex === idx && currentTask.status !== 'COMPLETED';

              return (
                <div
                  key={stageItem.stage}
                  className={`p-1.5 rounded-md text-center border transition-all ${
                    isCurrent
                      ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold shadow-xs'
                      : isPassed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] font-mono truncate font-medium">{stageItem.label}</div>
                  <div className="text-[9px] font-mono mt-0.5 font-bold">
                    {isPassed ? 'DONE' : isCurrent ? 'ACTIVE' : 'IDLE'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Execution Timeline */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-1 font-medium">
          <span>Agentic Execution Trace & MCP Activity</span>
          <span>{currentTask.steps.filter(s => s.status === 'completed').length} / {currentTask.steps.length} Steps Completed</span>
        </div>

        <div className="relative border-l border-slate-200 ml-3 pl-5 space-y-3.5">
          {currentTask.steps.map((step, idx) => {
            const isExpanded = expandedStepId === step.id;

            return (
              <div key={step.id} className="relative group">
                {/* Step Connector Node */}
                <div className="absolute -left-[27px] top-1.5 bg-white p-0.5 rounded-full border border-slate-200 shadow-2xs">
                  {getStepIcon(step)}
                </div>

                {/* Step Card */}
                <div
                  className={`rounded-lg border transition-all shadow-xs ${
                    step.status === 'running'
                      ? 'bg-blue-50/60 border-blue-400 ring-1 ring-blue-300'
                      : step.status === 'completed'
                      ? 'bg-white border-slate-200 hover:border-slate-300'
                      : 'bg-white/60 border-slate-200 text-slate-400'
                  }`}
                >
                  {/* Card Header */}
                  <div
                    onClick={() => toggleStep(step.id)}
                    className="p-3 flex items-start justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-2.5">
                      <button className="mt-0.5 text-slate-400 group-hover:text-slate-700">
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900 font-sans">
                            {idx + 1}. {step.name}
                          </span>
                          {step.modelOrTool && (
                            <span className="text-[10px] font-mono text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 font-semibold">
                              {step.modelOrTool}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {step.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 shrink-0">
                      {step.timestamp && <span>{step.timestamp}</span>}
                      {step.durationMs !== undefined && step.durationMs > 0 && (
                        <span className="font-semibold text-slate-600">({step.durationMs}ms)</span>
                      )}
                    </div>
                  </div>

                  {/* Expandable Step Details */}
                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-slate-100 space-y-2 text-xs font-mono">
                      {step.details && (
                        <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                            Execution Telemetry & Parameters
                          </div>
                          {step.details}
                        </div>
                      )}

                      {/* Display MCP tool call detail if in this step */}
                      {step.stage === 'EXECUTING' && currentTask.mcpCalls && currentTask.mcpCalls.length > 0 && (
                        <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 space-y-1.5">
                          <div className="text-[10px] text-blue-700 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                            <Terminal className="w-3 h-3" />
                            <span>Permitted MCP Invocations</span>
                          </div>
                          {currentTask.mcpCalls.map((mcp, mIdx) => (
                            <div key={mIdx} className="text-[11px] p-2 rounded bg-white border border-slate-200 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-blue-800 font-mono">{mcp.server}.{mcp.tool}</span>
                                <span className="text-emerald-700 text-[10px] bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200 font-bold">
                                  POLICY: {mcp.status}
                                </span>
                              </div>
                              <div className="text-slate-500 text-[10px] truncate">
                                Params: {JSON.stringify(mcp.params)}
                              </div>
                              <div className="text-slate-800 text-[10px] font-medium">
                                Result: {mcp.outputSummary} ({mcp.durationMs}ms)
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
