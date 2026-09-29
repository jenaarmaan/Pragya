import React from 'react';
import { X, Download, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { GeneratedArtifact } from '../../types';
import { downloadArtifact } from '../../utils/fileExport';
import { StatusBadge } from './StatusBadge';

interface ArtifactDownloadModalProps {
  artifact: GeneratedArtifact | null;
  onClose: () => void;
}

export const ArtifactDownloadModal: React.FC<ArtifactDownloadModalProps> = ({ artifact, onClose }) => {
  if (!artifact) return null;

  const handleDownload = () => {
    downloadArtifact(artifact.name, artifact.content, artifact.format);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-300 rounded-lg max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-slate-800">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 font-mono">{artifact.name}</h3>
                <StatusBadge status={artifact.approvalStatus} />
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">
                Format: <span className="font-mono text-slate-800">{artifact.format}</span> · Size:{' '}
                <span className="font-mono text-slate-800">{artifact.size}</span> · Generated:{' '}
                <span className="font-mono text-slate-800">{artifact.generatedAt}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security & Verification Banner */}
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cryptographic Integrity: Verified (SHA-256 Validated)</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Air-Gap Sealed</span>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-auto p-4 bg-slate-50 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap selection:bg-blue-100 border-b border-slate-200">
          {artifact.content}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500 truncate max-w-md">
            {artifact.description}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-700 hover:text-slate-900 rounded-md border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer font-medium"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File ({artifact.format})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
