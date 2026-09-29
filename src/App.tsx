/**
 * PRAGYA — Sovereign On-Premise Agentic AI Workbench
 * Team Tattva | MRPL | SIH26117 | Smart India Hackathon 2026
 *
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WorkbenchProvider, useWorkbench } from './context/WorkbenchContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewView } from './components/overview/OverviewView';
import { WorkbenchView } from './components/workbench/WorkbenchView';
import { KnowledgeBaseView } from './components/knowledge/KnowledgeBaseView';
import { ModelRouterView } from './components/models/ModelRouterView';
import { McpToolsView } from './components/mcp/McpToolsView';
import { SandboxView } from './components/sandbox/SandboxView';
import { FederatedLearningView } from './components/federated/FederatedLearningView';
import { ApprovalsView } from './components/approvals/ApprovalsView';
import { AuditSecurityView } from './components/audit/AuditSecurityView';
import { ArtifactsView } from './components/artifacts/ArtifactsView';
import { SettingsView } from './components/settings/SettingsView';
import { DocumentationView } from './components/docs/DocumentationView';
import { ArtifactDownloadModal } from './components/common/ArtifactDownloadModal';

const AppContent: React.FC = () => {
  const { activeTab, previewArtifact, setPreviewArtifact } = useWorkbench();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'docs':
        return <DocumentationView />;
      case 'workbench':
        return <WorkbenchView />;
      case 'knowledge':
        return <KnowledgeBaseView />;
      case 'models':
        return <ModelRouterView />;
      case 'mcp':
        return <McpToolsView />;
      case 'sandbox':
        return <SandboxView />;
      case 'federated':
        return <FederatedLearningView />;
      case 'approvals':
        return <ApprovalsView />;
      case 'audit':
        return <AuditSecurityView />;
      case 'artifacts':
        return <ArtifactsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <WorkbenchView />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 text-slate-800 antialiased overflow-hidden select-none font-sans">
      {/* Top Header conforming to Top Bar Contract */}
      <Header />

      {/* Main Workspace: Sidebar + Dynamic Canvas */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <Sidebar />
        <main className="flex-1 min-w-0 h-full overflow-hidden bg-slate-100">
          {renderActiveView()}
        </main>
      </div>

      {/* Modal for Previewing and Downloading Business Artifacts */}
      <ArtifactDownloadModal
        artifact={previewArtifact}
        onClose={() => setPreviewArtifact(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <WorkbenchProvider>
      <AppContent />
    </WorkbenchProvider>
  );
}
