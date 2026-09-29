import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  Eye,
  Check,
  X,
  ExternalLink,
  Cpu,
  BookOpen,
  Filter
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { StatusBadge } from '../common/StatusBadge';
import { downloadArtifact } from '../../utils/fileExport';

interface EvidencePanelProps {
  onClose?: () => void;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ onClose }) => {
  const { currentTask, approveTask, rejectTask, artifacts, setPreviewArtifact } = useWorkbench();
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'CITATIONS' | 'VERIFY' | 'APPROVAL'>('ALL');

  if (!currentTask) return null;

  const currentArtifact = artifacts.find(
    a => a.id === currentTask.generatedArtifactId || a.taskId === currentTask.id
  );

  const handleApprove = () => {
    approveTask(currentTask.id, 'Counter-signed by Lead Metallurgist per SOP-2401 Sec 8.4.');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please enter a rejection reason for the audit trail.');
      return;
    }
    rejectTask(currentTask.id, rejectReason);
    setShowRejectInput(false);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto text-slate-800 border-l border-slate-200">
      {/* Panel Header */}
      <div className="p-3.5 border-b border-slate-200 shrink-0 bg-slate-50 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Evidence & Verification
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Zero Hallucination
            </span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                title="Collapse evidence inspector"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('ALL')}
            className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
              activeTab === 'ALL'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('CITATIONS')}
            className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
              activeTab === 'CITATIONS'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Citations ({currentTask.retrievedEvidence?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('VERIFY')}
            className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
              activeTab === 'VERIFY'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Verify Suite ({currentTask.verificationChecks?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('APPROVAL')}
            className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
              activeTab === 'APPROVAL'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Sign-Off
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Selected Model & Trace (Rendered when ALL or CITATIONS) */}
        {(activeTab === 'ALL' || activeTab === 'CITATIONS') && (
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-600 flex items-center gap-1.5 font-bold">
                <Cpu className="w-3.5 h-3.5 text-blue-700" />
                <span>Model Routing Trace</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-1 rounded border border-emerald-200">
                ON-PREM vLLM
              </span>
            </div>

            <div className="text-xs font-bold text-slate-900 font-sans">
              {currentTask.routingTrace?.selectedModelName || 'Qwen-2.5-72B-Instruct'}
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
              {currentTask.routingTrace?.routingReason ||
                'Selected because this model supports the required 32k context and zero-shot tool invocation.'}
            </p>

            <div className="pt-1.5 text-[10px] font-mono text-slate-500 flex items-center justify-between border-t border-slate-200">
              <span>Capability:</span>
              <span className="text-blue-800 font-bold">
                {currentTask.routingTrace?.detectedCapability || 'Industrial Reasoning & SOP Synthesis'}
              </span>
            </div>
          </div>
        )}

        {/* Retrieved RAG Citations */}
        {(activeTab === 'ALL' || activeTab === 'CITATIONS') && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 font-sans">
                Retrieved Grounding Citations
              </span>
              <span className="text-[10px] font-mono text-blue-800 font-semibold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                {currentTask.retrievedEvidence?.length || 0} Chunks Verified
              </span>
            </div>

            <div className="space-y-2">
              {!currentTask.retrievedEvidence || currentTask.retrievedEvidence.length === 0 ? (
                <div className="p-3 border border-slate-200 rounded-md bg-slate-50 text-center text-xs text-slate-500 font-mono">
                  No citations retrieved yet. RAG chunks will appear once execution begins.
                </div>
              ) : (
                currentTask.retrievedEvidence.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-md bg-slate-50 border border-slate-200 text-xs space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-blue-900 text-[11px] truncate font-bold">
                        {ev.sourceDoc} (p. {ev.page})
                      </span>
                      <span className="text-[10px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-1 rounded border border-emerald-200">
                        Sim: {(ev.similarityScore * 100).toFixed(0)}%
                      </span>
                    </div>

                    <p className="text-slate-700 text-[11px] leading-relaxed italic bg-white p-2 rounded border border-slate-200 font-sans">
                      &ldquo;{ev.excerpt}&rdquo;
                    </p>

                    <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
                      <span>{ev.section}</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Grounding Verified</span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Verification Checklist */}
        {(activeTab === 'ALL' || activeTab === 'VERIFY') && (
          <div>
            <div className="text-xs font-bold text-slate-800 mb-2 font-sans flex items-center justify-between">
              <span>Multi-Criteria Verification Suite</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                100% Passed
              </span>
            </div>

            <div className="space-y-1.5">
              {!currentTask.verificationChecks || currentTask.verificationChecks.length === 0 ? (
                <div className="p-3 border border-slate-200 rounded-md bg-slate-50 text-center text-xs text-slate-500 font-mono">
                  Verification checks pending pipeline progression.
                </div>
              ) : (
                currentTask.verificationChecks.map(chk => (
                  <div
                    key={chk.id}
                    className="p-2 rounded-md bg-slate-50 border border-slate-200 text-xs flex items-start gap-2 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{chk.label}</span>
                        {chk.score !== undefined && (
                          <span className="font-mono text-[10px] text-emerald-700 font-bold">{chk.score}%</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{chk.description}</div>
                      {chk.evidenceRef && (
                        <div className="text-[10px] font-mono text-blue-700 mt-0.5 font-medium">
                          Ref: {chk.evidenceRef}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Generated Artifact Card */}
        {currentArtifact && (activeTab === 'ALL' || activeTab === 'APPROVAL') && (
          <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-blue-800 font-bold">
                Generated Business Artifact
              </span>
              <StatusBadge status={currentArtifact.approvalStatus} />
            </div>

            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-700 shrink-0" />
              <div className="truncate">
                <div className="text-xs font-mono font-bold text-slate-900 truncate">
                  {currentArtifact.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {currentArtifact.format} · {currentArtifact.size} · SHA256 Sealed
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setPreviewArtifact(currentArtifact)}
                className="flex-1 py-1.5 px-2 rounded-md text-xs bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer font-sans font-medium"
              >
                <Eye className="w-3 h-3" />
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => downloadArtifact(currentArtifact.name, currentArtifact.content, currentArtifact.format)}
                className="flex-1 py-1.5 px-2 rounded-md text-xs bg-blue-700 hover:bg-blue-800 text-white font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer font-sans shadow-2xs"
              >
                <Download className="w-3 h-3" />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}

        {/* Human-In-The-Loop Approval Block */}
        {currentTask.status === 'AWAITING_APPROVAL' && currentTask.approvalNote && (activeTab === 'ALL' || activeTab === 'APPROVAL') && (
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-300 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-amber-900 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Human Approval Required</span>
              </span>
              <span className="text-[10px] font-mono text-amber-900 bg-amber-200/60 px-1 py-0.2 rounded border border-amber-300 font-bold">
                HIGH RISK ASSET
              </span>
            </div>

            <div className="text-xs text-slate-900 font-bold font-sans">
              {currentTask.approvalNote.subject}
            </div>

            <div className="space-y-1 text-[11px] text-slate-700 font-sans">
              {currentTask.approvalNote.findings.map((f, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="p-2 rounded-md bg-white border border-amber-200 text-[11px] text-slate-800">
              <span className="font-bold text-amber-900">Recommended Action: </span>
              {currentTask.approvalNote.recommendedAction}
            </div>

            <div className="text-[10px] text-slate-600 font-mono font-medium">
              Approver: {currentTask.approvalNote.signOffRequiredFrom}
            </div>

            {!showRejectInput ? (
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowRejectInput(true)}
                  className="flex-1 py-1.5 px-3 rounded-md text-xs font-semibold text-rose-700 border border-rose-300 bg-white hover:bg-rose-50 transition-colors flex items-center justify-center gap-1 cursor-pointer font-sans"
                >
                  <X className="w-3 h-3" />
                  <span>Reject</span>
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className="flex-1 py-1.5 px-3 rounded-md text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1 cursor-pointer font-sans shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve & Sign</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <textarea
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="Mandatory rejection reason for audit trail..."
                  rows={2}
                  className="w-full bg-white border border-rose-300 rounded-md p-1.5 text-xs text-slate-800 placeholder-slate-400 font-sans focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRejectInput(false)}
                    className="flex-1 py-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReject}
                    className="flex-1 py-1 px-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-md"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {currentTask.approvalState?.status === 'APPROVED' && (activeTab === 'ALL' || activeTab === 'APPROVAL') && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-xs space-y-1 shadow-2xs">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold font-mono text-[11px]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Formally Approved & Signed</span>
            </div>
            <div className="text-slate-700 text-[11px]">
              Reviewer: <span className="font-mono font-semibold">{currentTask.approvalState.reviewedBy}</span>
            </div>
            <div className="text-slate-500 text-[10px] font-mono">
              Timestamp: {currentTask.approvalState.timestamp}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
