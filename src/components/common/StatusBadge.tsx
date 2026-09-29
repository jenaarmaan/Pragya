import React from 'react';
import { TaskStatus, ModelStatus } from '../../types';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  let colorClass = 'text-slate-700 bg-slate-100 border-slate-300';
  let dotClass = 'bg-slate-500';
  let label = (status || '').replace(/_/g, ' ');

  switch (status) {
    case 'COMPLETED':
    case 'APPROVED':
    case 'CONNECTED':
    case 'PERMITTED':
    case 'SUCCESS':
    case 'SYNCED':
    case 'ONLINE':
      colorClass = 'text-emerald-800 bg-emerald-50 border-emerald-200';
      dotClass = 'bg-emerald-600';
      break;

    case 'EXECUTING':
    case 'CLASSIFYING':
    case 'ROUTING':
    case 'PLANNING':
    case 'VERIFYING':
    case 'TRAINING':
    case 'RUNNING':
      colorClass = 'text-blue-800 bg-blue-50 border-blue-200 animate-pulse';
      dotClass = 'bg-blue-600';
      break;

    case 'AWAITING_APPROVAL':
    case 'PENDING':
    case 'REVIEW_REQUIRED':
      colorClass = 'text-amber-800 bg-amber-50 border-amber-300';
      dotClass = 'bg-amber-600 animate-ping';
      break;

    case 'FAILED':
    case 'POLICY_DENIED':
    case 'REJECTED':
    case 'BLOCKED':
    case 'DENIED':
    case 'UNAVAILABLE':
    case 'DISCONNECTED':
    case 'OFFLINE':
      colorClass = 'text-rose-800 bg-rose-50 border-rose-200';
      dotClass = 'bg-rose-600';
      break;

    case 'MOCK':
    case 'STANDBY':
    case 'LOCAL':
    case 'SCHEDULED':
      colorClass = 'text-sky-800 bg-sky-50 border-sky-200';
      dotClass = 'bg-sky-600';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono font-medium rounded border ${colorClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      <span>{label}</span>
    </span>
  );
};
