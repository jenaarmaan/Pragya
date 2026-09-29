import React, { useState } from 'react';
import {
  Upload,
  Play,
  FileText,
  FileCheck,
  Code,
  Image as ImageIcon,
  BookOpen,
  X,
  Sliders,
  Sparkles
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { IndustrialTask } from '../../types';

export const TaskInputPanel: React.FC = () => {
  const { createNewTask, startTaskExecution, runGoldenDemo } = useWorkbench();

  const [prompt, setPrompt] = useState(
    'Analyze the uploaded industrial inspection report MRPL-INSP-2026-DHDS-041, compare findings with maintenance SOP-2401, verify API 579 criteria, and prepare an executive approval note.'
  );
  const [selectedCategory, setSelectedCategory] = useState<IndustrialTask['category']>('INSPECTION');
  const [selectedUnit, setSelectedUnit] = useState('Diesel Hydrodesulfurization (DHDS-2)');
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string; type: string }[]>([
    { name: 'MRPL-INSP-2026-DHDS-041.pdf', size: '12.4 MB', type: 'application/pdf' },
    { name: 'MRPL-SOP-MNT-2401.pdf', size: '4.8 MB', type: 'application/pdf' }
  ]);

  const examplePrompts = [
    {
      title: 'Inspection & Approval Note (Golden Demo)',
      icon: FileCheck,
      category: 'INSPECTION' as const,
      text: 'Analyze the uploaded industrial inspection report MRPL-INSP-2026-DHDS-041, compare findings with maintenance SOP-2401, verify API 579 criteria, and prepare an executive approval note.',
      files: [
        { name: 'MRPL-INSP-2026-DHDS-041.pdf', size: '12.4 MB', type: 'application/pdf' },
        { name: 'MRPL-SOP-MNT-2401.pdf', size: '4.8 MB', type: 'application/pdf' }
      ]
    },
    {
      title: 'Compare Maintenance Report with SOP',
      icon: BookOpen,
      category: 'MAINTENANCE_SOP' as const,
      text: 'Compare turnaround maintenance log with MRPL-SOP-MNT-2401 Section 4.3.2 to identify any wall thinning violations requiring Level 2 FFS engineering calculation.',
      files: [{ name: 'MRPL-SOP-MNT-2401.pdf', size: '4.8 MB', type: 'application/pdf' }]
    },
    {
      title: 'Write & Sandbox Python Engineering Calc',
      icon: Code,
      category: 'CALCULATION' as const,
      text: 'Write and test a sandboxed Python script to compute LMTD, heat duty, and dirty heat transfer coefficient U_dirty for preheat exchanger E-102A per TEMA Class R.',
      files: [{ name: 'MRPL-ENG-MAN-HEX-102.pdf', size: '8.1 MB', type: 'application/pdf' }]
    },
    {
      title: 'Analyze Engineering Drawing & Extract Tags',
      icon: ImageIcon,
      category: 'PID_VISION' as const,
      text: 'Analyze P&ID drawing MRPL-PID-CRU-301, detect all control valve and transmitter tags, and generate structured asset inventory JSON.',
      files: [{ name: 'MRPL-PID-CRU-301.png', size: '3.6 MB', type: 'image/png' }]
    },
    {
      title: 'Summarize Local Knowledge Base',
      icon: FileText,
      category: 'KNOWLEDGE_SEARCH' as const,
      text: 'Synthesize safety requirements across all indexed pressure vessel inspection manuals regarding permissible corrosion allowance and HTHA risk envelopes.',
      files: [{ name: 'API-510-MRPL-GUIDE.pdf', size: '6.2 MB', type: 'application/pdf' }]
    }
  ];

  const handleApplyPreset = (preset: typeof examplePrompts[0]) => {
    setPrompt(preset.text);
    setSelectedCategory(preset.category);
    setAttachedFiles(preset.files);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        type: f.type || 'application/octet-stream'
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartTask = () => {
    if (!prompt.trim()) return;

    const taskId = createNewTask({
      title: prompt.slice(0, 60) + (prompt.length > 60 ? '...' : ''),
      description: prompt,
      category: selectedCategory,
      files: attachedFiles
    });

    startTaskExecution(taskId);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto text-slate-800">
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-200 shrink-0 bg-slate-50">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
            Task Ingestion
          </h2>
          <span className="text-[11px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            AIR-GAP ACTIVE
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          Submit confidential industrial task for autonomous model routing & verification.
        </p>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Task Input Prompt */}
        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-1.5 font-sans">
            Industrial Task Description
          </label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={4}
            placeholder="Describe your industrial task..."
            className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 font-sans leading-relaxed resize-none"
          />
        </div>

        {/* Example Task Presets */}
        <div>
          <div className="text-[11px] font-mono uppercase text-slate-500 mb-2 flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Example Industrial Scenarios</span>
          </div>
          <div className="space-y-1.5">
            {examplePrompts.map((preset, idx) => {
              const Icon = preset.icon;
              const isSelected = prompt === preset.text;
              return (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(preset)}
                  className={`w-full text-left p-2 rounded-md text-xs transition-colors flex items-start gap-2.5 border cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mt-0.5 text-blue-700 shrink-0" />
                  <div className="flex-1 truncate">
                    <div className="font-semibold truncate text-slate-900">{preset.title}</div>
                    <div className="text-[10px] text-slate-500 truncate font-mono mt-0.5">{preset.text}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Attachments Section */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-800 font-sans">
              Attached Technical Documents
            </label>
            <label className="text-[11px] text-blue-700 hover:text-blue-800 font-mono font-semibold cursor-pointer flex items-center gap-1">
              <Upload className="w-3 h-3" />
              <span>Upload File</span>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.docx,.txt,.png,.jpg,.csv"
              />
            </label>
          </div>

          <div className="space-y-1.5">
            {attachedFiles.length === 0 ? (
              <div className="p-3 border border-dashed border-slate-300 rounded-md bg-slate-50 text-center text-xs text-slate-500 font-mono">
                No attachments. Select an example or upload PDF/drawing.
              </div>
            ) : (
              attachedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span className="text-slate-800 font-medium truncate">{file.name}</span>
                    <span className="text-slate-500 text-[10px] shrink-0">({file.size})</span>
                  </div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Plant Unit & Execution Parameters */}
        <div className="pt-2 border-t border-slate-200 space-y-3">
          <div>
            <label className="block text-[11px] font-mono text-slate-600 mb-1 font-semibold">
              Refinery Process Unit
            </label>
            <select
              value={selectedUnit}
              onChange={e => setSelectedUnit(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="Diesel Hydrodesulfurization (DHDS-2)">Diesel Hydrodesulfurization (DHDS-2)</option>
              <option value="Crude Distillation Unit (CDU-1)">Crude Distillation Unit (CDU-1)</option>
              <option value="Fluid Catalytic Cracker (FCCU)">Fluid Catalytic Cracker (FCCU)</option>
              <option value="Hydrogen Generation Unit (HGU)">Hydrogen Generation Unit (HGU)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Start Task Button */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0">
        <button
          onClick={handleStartTask}
          className="w-full py-2.5 px-4 rounded-md font-bold text-xs text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs font-sans"
        >
          <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
          <span>Execute Sovereign Pipeline</span>
        </button>
      </div>
    </div>
  );
};
