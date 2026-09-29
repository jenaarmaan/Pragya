import React, { useState } from 'react';
import { AiWorkspaceCanvas } from './AiWorkspaceCanvas';
import { EvidencePanel } from './EvidencePanel';
import { GoldenDemoBanner } from '../common/GoldenDemoBanner';

export const WorkbenchView: React.FC = () => {
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(true);

  return (
    <div className="h-full flex flex-col p-3 sm:p-4 bg-slate-50 overflow-hidden text-slate-800">
      {/* Top SIH Golden Demo Banner */}
      <GoldenDemoBanner />

      {/* Unified Modern AI Studio Canvas & Collapsible Inspector */}
      <div className="flex-1 flex flex-col lg:flex-row rounded-xl border border-slate-200 overflow-hidden shadow-xs bg-white min-h-0 relative">
        {/* Main AI Workspace: Conversational & Execution Feed + Bottom Input Dock (flex-1) */}
        <AiWorkspaceCanvas
          isEvidenceOpen={isEvidenceOpen}
          onToggleEvidence={() => setIsEvidenceOpen(!isEvidenceOpen)}
        />

        {/* Right Inspector: Evidence & Verification (Collapsible & Tabbed) */}
        {isEvidenceOpen && (
          <div className="w-full lg:w-[380px] xl:w-[410px] h-80 lg:h-full shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 transition-all">
            <EvidencePanel onClose={() => setIsEvidenceOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
};
