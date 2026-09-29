import React, { useState, useRef, useEffect } from 'react';
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
  RotateCcw,
  Sparkles,
  FileText,
  Building2,
  AlertTriangle,
  Download,
  Eye,
  Check,
  X,
  PanelRight,
  MessageSquare,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { StatusBadge } from '../common/StatusBadge';
import { ExecutionStep, TaskStatus } from '../../types';
import { downloadArtifact } from '../../utils/fileExport';
import { PromptInputDock } from './PromptInputDock';

interface AiWorkspaceCanvasProps {
  isEvidenceOpen: boolean;
  onToggleEvidence: () => void;
}

export const AiWorkspaceCanvas: React.FC<AiWorkspaceCanvasProps> = ({
  isEvidenceOpen,
  onToggleEvidence
}) => {
  const {
    tasks,
    currentTask,
    setCurrentTaskId,
    startTaskExecution,
    approveTask,
    rejectTask,
    artifacts,
    setPreviewArtifact
  } = useWorkbench();

  const [expandedStepId, setExpandedStepId] = useState<string | null>('stp-4');
  const [showTaskSelector, setShowTaskSelector] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  const feedBottomRef = useRef<HTMLDivElement>(null);

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

  const currentStageIndex = currentTask
    ? pipelineStages.findIndex(s => s.stage === currentTask.status)
    : -1;

  const currentArtifact = artifacts.find(
    a => currentTask && (a.id === currentTask.generatedArtifactId || a.taskId === currentTask.id)
  );

  const toggleStep = (stepId: string) => {
    setExpandedStepId(prev => (prev === stepId ? null : stepId));
  };

  const getStepIcon = (step: ExecutionStep) => {
    if (step.status === 'completed') return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    if (step.status === 'running')
      return (
        <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      );
    if (step.status === 'failed') return <AlertCircle className="w-4 h-4 text-rose-600" />;
    return <Clock className="w-4 h-4 text-slate-400" />;
  };

  const handleApprove = () => {
    if (currentTask) {
      approveTask(currentTask.id, 'Counter-signed by Lead Metallurgist per SOP-2401 Sec 8.4.');
    }
  };

  const handleReject = () => {
    if (!currentTask) return;
    if (!rejectReason.trim()) {
      alert('Please enter a rejection reason for the audit trail.');
      return;
    }
    rejectTask(currentTask.id, rejectReason);
    setShowRejectInput(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden text-slate-800">
      {/* Top Bar: Active Task Title, Context & Inspector Toggle */}
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 shrink-0 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
            <Flame className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {currentTask ? (
                <>
                  <span className="text-xs font-mono text-blue-900 font-bold">
                    {currentTask.id}
                  </span>
                  <span className="text-slate-300">·</span>
                  <StatusBadge status={currentTask.status} />
                  <span className="text-slate-300 hidden sm:inline">·</span>
                  <span className="text-xs font-mono text-slate-600 hidden sm:inline font-medium">
                    {currentTask.plantUnit}
                  </span>
                </>
              ) : (
                <span className="text-xs font-bold text-slate-700">New Sovereign Task Session</span>
              )}
            </div>

            <h1 className="text-xs sm:text-sm font-bold text-slate-900 truncate font-sans mt-0.5">
              {currentTask ? currentTask.title : 'Ready to ingest refinery reports & execute queries'}
            </h1>
          </div>
        </div>

        {/* Right Action Tools: Switch Task Dropdown, Rerun, Toggle Evidence */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Switch Session Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTaskSelector(!showTaskSelector)}
              className="px-2.5 py-1 text-xs rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>Switch Task</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showTaskSelector && (
              <div className="absolute right-0 top-full mt-1.5 w-80 bg-white rounded-lg border border-slate-200 shadow-xl p-2 z-50 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-bold px-2 py-1">
                  Active Tasks & Sessions ({tasks.length})
                </div>
                {tasks.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setCurrentTaskId(t.id);
                      setShowTaskSelector(false);
                    }}
                    className={`w-full text-left p-2 rounded-md text-xs font-sans flex items-start justify-between gap-2 cursor-pointer ${
                      currentTask?.id === t.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    <div className="truncate">
                      <div className="font-bold text-slate-900 truncate">{t.title}</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                        {t.id} · {t.plantUnit.split(' ')[0]}
                      </div>
                    </div>
                    <StatusBadge status={t.status} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Rerun Chain Button */}
          {currentTask && (
            <button
              type="button"
              onClick={() => startTaskExecution(currentTask.id)}
              className="px-2.5 py-1 text-xs rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-mono font-medium transition-colors flex items-center gap-1 cursor-pointer shadow-2xs hidden sm:flex"
              title="Re-run deterministic pipeline for this task"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Rerun</span>
            </button>
          )}

          {/* Evidence Inspector Toggle Button */}
          <button
            type="button"
            onClick={onToggleEvidence}
            className={`px-3 py-1 text-xs rounded-md font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              isEvidenceOpen
                ? 'bg-blue-50 text-blue-900 border-blue-300 shadow-2xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
            }`}
            title="Toggle Right Evidence & Verification Inspector"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Evidence Inspector</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
              {currentTask?.retrievedEvidence?.length || 0} Chunks
            </span>
          </button>
        </div>
      </div>

      {/* Main Scrollable Canvas Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/40">
        {!currentTask ? (
          /* Empty / Welcome State */
          <div className="py-12 max-w-2xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mx-auto text-2xl shadow-xs">
              🏛️
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-sans">
              PRAGYA Sovereign AI Workspace
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto">
              Ask about MRPL refinery operational procedures, attach ultrasonic thickness NDT reports, 
              or test thermodynamic equations. Type your task in the box below or click any preset to begin.
            </p>
          </div>
        ) : (
          /* Active Task Conversation & Execution Stream */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* 1. User Message Card (Prompt + Attached Files) */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                MRPL
              </div>

              <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900 font-sans">
                      Lead Metallurgist / Plant Engineer
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Unit: {currentTask.plantUnit}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[10px] font-mono font-bold border border-amber-300">
                      {currentTask.riskLevel} RISK
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {currentTask.createdAt}
                  </span>
                </div>

                {/* Prompt Text */}
                <p className="text-xs sm:text-sm text-slate-800 font-sans leading-relaxed">
                  {currentTask.description}
                </p>

                {/* Attached Files Chips */}
                {currentTask.attachedFiles && currentTask.attachedFiles.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                      Attached Refinery Records ({currentTask.attachedFiles.length}):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentTask.attachedFiles.map((file, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-700" />
                          <span className="font-semibold text-[11px]">{file.name}</span>
                          <span className="text-[10px] text-slate-500">({file.size})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. PRAGYA Sovereign AI Execution Response */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                AI
              </div>

              <div className="flex-1 space-y-4">
                {/* Agent Header & Stage Progression */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 font-sans">
                        PRAGYA Sovereign Agentic AI
                      </span>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-bold">
                        ON-PREM vLLM
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      Model: {currentTask.routingTrace?.selectedModelName || 'Qwen-2.5-72B-Instruct'}
                    </span>
                  </div>

                  {/* 8-Stage Progress Pills */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">
                      Deterministic Pipeline Progression
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 text-center">
                      {pipelineStages.map((stageItem, idx) => {
                        const isPassed =
                          currentStageIndex > idx || currentTask.status === 'COMPLETED';
                        const isCurrent =
                          currentStageIndex === idx && currentTask.status !== 'COMPLETED';

                        return (
                          <div
                            key={stageItem.stage}
                            className={`p-1 rounded text-center border transition-all ${
                              isCurrent
                                ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold shadow-2xs'
                                : isPassed
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                : 'bg-slate-50 border-slate-200 text-slate-400'
                            }`}
                          >
                            <div className="text-[10px] font-mono truncate font-medium">
                              {stageItem.label}
                            </div>
                            <div className="text-[9px] font-mono mt-0.5 font-bold">
                              {isPassed ? 'DONE' : isCurrent ? 'RUNNING' : 'QUEUED'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Agent Execution Timeline Steps */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-1 font-medium border-b border-slate-100">
                    <span className="font-bold text-slate-700">
                      ReAct Execution Trace & Tool Invocations
                    </span>
                    <span>
                      {currentTask.steps.filter(s => s.status === 'completed').length} /{' '}
                      {currentTask.steps.length} Steps Completed
                    </span>
                  </div>

                  <div className="relative border-l border-slate-200 ml-3 pl-5 space-y-3 pt-1">
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
                                  {isExpanded ? (
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  )}
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
                                  <span className="font-semibold text-slate-600">
                                    ({step.durationMs}ms)
                                  </span>
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
                                {step.stage === 'EXECUTING' &&
                                  currentTask.mcpCalls &&
                                  currentTask.mcpCalls.length > 0 && (
                                    <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 space-y-1.5">
                                      <div className="text-[10px] text-blue-700 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                                        <Terminal className="w-3 h-3" />
                                        <span>Permitted MCP Invocations</span>
                                      </div>
                                      {currentTask.mcpCalls.map((mcp, mIdx) => (
                                        <div
                                          key={mIdx}
                                          className="text-[11px] p-2 rounded bg-white border border-slate-200 space-y-1"
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className="font-bold text-blue-800 font-mono">
                                              {mcp.server}.{mcp.tool}
                                            </span>
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

                {/* Generated Deliverables Artifact Card */}
                {currentArtifact && (
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-blue-800 font-bold flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-blue-700" />
                        <span>Generated Certified Business Deliverable</span>
                      </span>
                      <StatusBadge status={currentArtifact.approvalStatus} />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white border border-blue-200 text-blue-700 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs sm:text-sm font-mono font-bold text-slate-900 truncate">
                          {currentArtifact.name}
                        </div>
                        <div className="text-[11px] text-slate-600 font-mono mt-0.5">
                          {currentArtifact.format} · {currentArtifact.size} · SHA-256 Validated · Ready for DGM Signature
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setPreviewArtifact(currentArtifact)}
                        className="px-3.5 py-1.5 rounded-md text-xs bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer font-sans font-semibold shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Preview Artifact</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          downloadArtifact(
                            currentArtifact.name,
                            currentArtifact.content,
                            currentArtifact.format
                          )
                        }
                        className="px-4 py-1.5 rounded-md text-xs bg-blue-700 hover:bg-blue-800 text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Certified File</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* In-Stream Human-In-The-Loop Approval Block (If awaiting sign-off) */}
                {currentTask.status === 'AWAITING_APPROVAL' && currentTask.approvalNote && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-amber-900 font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Human Verification & Sign-Off Required</span>
                      </span>
                      <span className="text-[10px] font-mono text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded border border-amber-300 font-bold">
                        HIGH RISK ASSET
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-900 font-bold font-sans">
                      {currentTask.approvalNote.subject}
                    </div>

                    <div className="space-y-1 text-xs text-slate-700 font-sans">
                      {currentTask.approvalNote.findings.map((f, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-700 font-bold">•</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 rounded-md bg-white border border-amber-200 text-xs text-slate-800 font-sans">
                      <span className="font-bold text-amber-900">Recommended Operational Action: </span>
                      {currentTask.approvalNote.recommendedAction}
                    </div>

                    <div className="text-[11px] text-slate-600 font-mono font-medium">
                      Mandatory Sign-Off: {currentTask.approvalNote.signOffRequiredFrom}
                    </div>

                    {!showRejectInput ? (
                      <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-amber-200/80">
                        <button
                          type="button"
                          onClick={() => setShowRejectInput(true)}
                          className="px-4 py-2 rounded-md text-xs font-semibold text-rose-700 border border-rose-300 bg-white hover:bg-rose-50 transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject & Terminate</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleApprove}
                          className="px-5 py-2 rounded-md text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer font-sans shadow-xs"
                        >
                          <Check className="w-4 h-4" />
                          <span>Authorize & Sign Document</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-2 border-t border-amber-200">
                        <textarea
                          value={rejectReason}
                          onChange={e => setRejectReason(e.target.value)}
                          placeholder="Mandatory reason for rejection (logged to immutable audit trail)..."
                          rows={2}
                          className="w-full bg-white border border-rose-300 rounded-md p-2 text-xs text-rose-900 font-sans focus:outline-none focus:ring-1 focus:ring-rose-500"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setShowRejectInput(false)}
                            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleReject}
                            className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-md cursor-pointer"
                          >
                            Confirm Rejection
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={feedBottomRef} />
      </div>

      {/* Docked Modern LLM Input Bar at Bottom */}
      <PromptInputDock />
    </div>
  );
};
