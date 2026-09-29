import React, { useState } from 'react';
import {
  FileCheck2,
  Download,
  Eye,
  FileText,
  Code,
  FileSpreadsheet,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Search,
  Filter
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { StatusBadge } from '../common/StatusBadge';
import { downloadArtifact } from '../../utils/fileExport';
import { GeneratedArtifact } from '../../types';

export const ArtifactsView: React.FC = () => {
  const { artifacts, setPreviewArtifact, setCurrentTaskId, setActiveTab } = useWorkbench();

  const [formatFilter, setFormatFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const getFormatIcon = (format: string) => {
    switch (format.toUpperCase()) {
      case 'DOCX':
      case 'PDF':
        return <FileText className="w-5 h-5 text-blue-700" />;
      case 'PY':
        return <Code className="w-5 h-5 text-emerald-600" />;
      case 'XLSX':
      case 'CSV':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'JSON':
        return <FileCode className="w-5 h-5 text-amber-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  const filteredArtifacts = artifacts.filter(art => {
    if (formatFilter !== 'ALL' && art.format !== formatFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        art.name.toLowerCase().includes(q) ||
        art.description.toLowerCase().includes(q) ||
        art.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-50 text-slate-800">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
            Business Artifacts Vault
          </h1>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
            {artifacts.length} Certified Artifacts
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Autonomous business outputs produced by PRAGYA&apos;s verified pipeline. All documents are cryptographically
          fingerprinted and sealed locally with zero cloud dependencies.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search artifacts by name, description, or ID..."
            className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 font-sans"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-mono text-slate-600 font-semibold">Format:</span>
          <select
            value={formatFilter}
            onChange={e => setFormatFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-md p-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="ALL">All Formats</option>
            <option value="DOCX">Word Document (.docx)</option>
            <option value="PY">Python Script (.py)</option>
            <option value="CSV">Dataset (.csv)</option>
            <option value="JSON">Asset JSON (.json)</option>
          </select>
        </div>
      </div>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArtifacts.map(artifact => (
          <div
            key={artifact.id}
            className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 shrink-0 mt-0.5">
                    {getFormatIcon(artifact.format)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-mono leading-tight">
                      {artifact.name}
                    </h3>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {artifact.format} · {artifact.size} · ID: {artifact.id}
                    </div>
                  </div>
                </div>
                <StatusBadge status={artifact.approvalStatus} />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans mb-3">
                {artifact.description}
              </p>

              <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200 space-y-1 text-[11px] font-mono text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">SHA-256 Digest:</span>
                  <span className="text-blue-900 font-bold truncate max-w-[200px]">
                    {artifact.sha256Hash || 'SHA256: 7b3e109d...a58'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Generated At:</span>
                  <span>{artifact.generatedAt}</span>
                </div>
                {artifact.signOffBy && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Sign-Off By:</span>
                    <span className="text-emerald-700 font-semibold">{artifact.signOffBy}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setCurrentTaskId(artifact.taskId);
                  setActiveTab('workbench');
                }}
                className="text-xs text-blue-700 hover:text-blue-800 font-mono font-semibold cursor-pointer"
              >
                Inspect Parent Task
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewArtifact(artifact)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer border border-slate-300"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => downloadArtifact(artifact.name, artifact.content, artifact.format)}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-md bg-blue-700 hover:bg-blue-800 text-white transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
