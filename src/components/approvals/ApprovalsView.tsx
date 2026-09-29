import React, { useState } from 'react';
import {
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Eye,
  Download,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { StatusBadge } from '../common/StatusBadge';
import { downloadArtifact } from '../../utils/fileExport';

export const ApprovalsView: React.FC = () => {
  const { tasks, approveTask, rejectTask, artifacts, setPreviewArtifact, setCurrentTaskId, setActiveTab } = useWorkbench();

  const [comments, setComments] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'APPROVE' | 'REJECT' | null>(null);

  const pendingTasks = tasks.filter(t => t.status === 'AWAITING_APPROVAL');
  const pastApprovals = tasks.filter(t => t.approvalState && t.approvalState.status !== 'PENDING');

  const handleConfirmAction = (taskId: string) => {
    if (actionType === 'APPROVE') {
      approveTask(taskId, comments || 'Approved based on visual inspection and API 579 criteria.');
    } else if (actionType === 'REJECT') {
      if (!rejectReason.trim()) {
        alert('Please specify a rejection reason for the audit trail.');
        return;
      }
      rejectTask(taskId, rejectReason);
    }
    setActiveActionId(null);
    setActionType(null);
    setComments('');
    setRejectReason('');
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-50 text-slate-800">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
            Human-in-the-Loop Approval Queue
          </h1>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 font-bold">
            {pendingTasks.length} Pending Sign-Off
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Sensitive industrial actions require formal human verification before engineering decisions are finalized.
          All approvals and rejections are cryptographically recorded in the on-premise audit trail.
        </p>
      </div>

      {/* Pending Approvals Section */}
      <div className="space-y-4">
        <div className="text-xs font-mono uppercase text-slate-600 font-bold">
          Pending Authorizations ({pendingTasks.length})
        </div>

        {pendingTasks.length === 0 ? (
          <div className="p-8 rounded-lg bg-white border border-slate-200 text-center space-y-2 shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <div className="text-sm font-bold text-slate-900">All Clear! No Pending Approvals</div>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              All high-risk industrial tasks have been verified and signed off.
            </p>
          </div>
        ) : (
          pendingTasks.map(task => {
            const artifact = artifacts.find(a => a.taskId === task.id || a.id === task.generatedArtifactId);
            const isActing = activeActionId === task.id;

            return (
              <div
                key={task.id}
                className="p-5 rounded-lg bg-white border border-amber-300 space-y-4 shadow-xs"
              >
                {/* Task Top Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-blue-700 font-bold">{task.id}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-mono text-slate-700 font-medium">{task.plantUnit}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-mono text-amber-900 font-bold bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300">
                        RISK: {task.riskLevel}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1 font-sans">{task.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentTaskId(task.id);
                        setActiveTab('workbench');
                      }}
                      className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer font-sans"
                    >
                      View in Workbench
                    </button>
                  </div>
                </div>

                {/* Subject & Summary Findings */}
                {task.approvalNote && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-900 font-sans">
                      {task.approvalNote.subject}
                    </div>
                    <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1 text-xs text-slate-700 font-sans">
                      {task.approvalNote.findings.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <span className="text-blue-700 font-bold">•</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-md bg-amber-50 border border-amber-200 text-xs text-slate-800">
                      <strong className="text-amber-900">Recommended Operational Action: </strong>
                      {task.approvalNote.recommendedAction}
                    </div>
                  </div>
                )}

                {/* Grounding & Evidence Summary */}
                {task.retrievedEvidence && task.retrievedEvidence.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                      Verified Citations & Grounding
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {task.retrievedEvidence.map((ev, eIdx) => (
                        <div key={eIdx} className="p-2.5 rounded-md bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700">
                          <div className="flex justify-between text-blue-900 font-bold">
                            <span>{ev.sourceDoc} (p. {ev.page})</span>
                            <span className="text-emerald-700 font-sans font-semibold">Verified</span>
                          </div>
                          <p className="text-slate-600 font-sans mt-0.5 line-clamp-1 italic text-[11px]">
                            &ldquo;{ev.excerpt}&rdquo;
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Associated Artifact Quick Actions */}
                {artifact && (
                  <div className="flex items-center justify-between p-2.5 rounded-md bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-700" />
                      <span className="font-mono text-slate-800 font-medium">{artifact.name}</span>
                      <span className="text-slate-500 font-mono">({artifact.size})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewArtifact(artifact)}
                        className="px-2.5 py-1 text-[11px] rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview Artifact</span>
                      </button>
                      <button
                        onClick={() => downloadArtifact(artifact.name, artifact.content, artifact.format)}
                        className="px-2.5 py-1 text-[11px] rounded bg-blue-700 hover:bg-blue-800 text-white font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Block */}
                {!isActing ? (
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => {
                        setActiveActionId(task.id);
                        setActionType('REJECT');
                      }}
                      className="px-4 py-2 rounded-md text-xs font-semibold text-rose-700 border border-rose-300 bg-white hover:bg-rose-50 transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject & Terminate</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveActionId(task.id);
                        setActionType('APPROVE');
                      }}
                      className="px-5 py-2 rounded-md text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer font-sans shadow-xs"
                    >
                      <Check className="w-4 h-4" />
                      <span>Authorize & Sign Note</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200 space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-900 font-sans">
                      {actionType === 'APPROVE' ? 'Authorizing Sign-Off Note' : 'Rejecting Industrial Task'}
                    </div>
                    {actionType === 'APPROVE' ? (
                      <textarea
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                        placeholder="Optional metallurgical or engineering comments..."
                        rows={2}
                        className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    ) : (
                      <textarea
                        value={rejectReason}
                        onChange={e => setRejectReason(e.target.value)}
                        placeholder="Mandatory reason for rejection (logged to immutable audit trail)..."
                        rows={2}
                        className="w-full bg-white border border-rose-300 rounded p-2 text-xs text-rose-900 font-sans focus:outline-none focus:ring-1 focus:ring-rose-500"
                      />
                    )}
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setActiveActionId(null);
                          setActionType(null);
                        }}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleConfirmAction(task.id)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-md cursor-pointer ${
                          actionType === 'APPROVE'
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-rose-600 text-white hover:bg-rose-700'
                        }`}
                      >
                        Confirm {actionType === 'APPROVE' ? 'Approval' : 'Rejection'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Historical Approvals */}
      <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="text-xs font-mono uppercase text-slate-600 font-bold">
          Historical Governance Log
        </div>

        <div className="space-y-2">
          {pastApprovals.map(t => (
            <div
              key={t.id}
              className="p-3 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-blue-700 font-bold">{t.id}</span>
                  <span className="font-bold text-slate-900 font-sans">{t.title}</span>
                </div>
                <div className="text-[11px] text-slate-600 font-mono mt-0.5">
                  Reviewer: {t.approvalState?.reviewedBy} · Comments: &ldquo;{t.approvalState?.comments}&rdquo;
                </div>
              </div>
              <div className="text-right shrink-0">
                <StatusBadge status={t.approvalState?.status as any} />
                <div className="text-[10px] font-mono text-slate-500 mt-1">
                  {t.approvalState?.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
