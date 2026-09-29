import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  Send,
  ArrowUp,
  Mic,
  MicOff,
  Paperclip,
  FileText,
  X,
  Sparkles,
  Building2,
  Layers,
  ChevronDown,
  Upload,
  Check,
  Code,
  Image as ImageIcon,
  BookOpen
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { IndustrialTask } from '../../types';

interface AttachedFile {
  name: string;
  size: string;
  type: string;
}

export const PromptInputDock: React.FC = () => {
  const { createNewTask, startTaskExecution, runGoldenDemo } = useWorkbench();

  const [prompt, setPrompt] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('Diesel Hydrodesulfurization (DHDS-2)');
  const [selectedCategory, setSelectedCategory] = useState<IndustrialTask['category']>('INSPECTION');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showUnitMenu, setShowUnitMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const availableUnits = [
    'Diesel Hydrodesulfurization (DHDS-2)',
    'Crude Distillation Unit (CDU-1)',
    'Fluid Catalytic Cracking (FCCU)',
    'Hydrogen Generation Unit (HGU)'
  ];

  const availableCategories: { value: IndustrialTask['category']; label: string }[] = [
    { value: 'INSPECTION', label: 'NDT Inspection & SOP' },
    { value: 'CALCULATION', label: 'Python Math Sandbox' },
    { value: 'PID_VISION', label: 'P&ID Blueprint Vision' },
    { value: 'MAINTENANCE_SOP', label: 'Maintenance Standards' }
  ];

  const presetDocuments: AttachedFile[] = [
    { name: 'MRPL-INSP-2026-DHDS-041.pdf', size: '12.4 MB', type: 'application/pdf' },
    { name: 'MRPL-SOP-MNT-2401.pdf', size: '4.8 MB', type: 'application/pdf' },
    { name: 'MRPL-ENG-MAN-HEX-102.pdf', size: '8.1 MB', type: 'application/pdf' },
    { name: 'MRPL-PID-CRU-301.png', size: '3.6 MB', type: 'image/png' }
  ];

  // Quick Preset Scenarios for instant 1-click loading
  const quickScenarios = [
    {
      label: '⚡ DHDS-2 Wall Thinning (Golden Demo)',
      prompt: 'Analyze uploaded NDT inspection report MRPL-INSP-2026-DHDS-041, cross-reference remaining thickness with SOP-2401, check API 579 Level 2 criteria, and prepare formal DGM sign-off note.',
      category: 'INSPECTION' as const,
      unit: 'Diesel Hydrodesulfurization (DHDS-2)',
      files: [presetDocuments[0], presetDocuments[1]]
    },
    {
      label: '🧪 CDU-1 Exchanger Rating & LMTD',
      prompt: 'Write and test a sandboxed Python script to compute LMTD, heat duty, and dirty heat transfer coefficient U_dirty for preheat exchanger E-102A per TEMA Class R.',
      category: 'CALCULATION' as const,
      unit: 'Crude Distillation Unit (CDU-1)',
      files: [presetDocuments[2]]
    },
    {
      label: '📐 P&ID Valve & Tag Extraction',
      prompt: 'Analyze P&ID drawing MRPL-PID-CRU-301, detect all control valve and transmitter tags, and generate structured asset inventory JSON.',
      category: 'PID_VISION' as const,
      unit: 'Crude Distillation Unit (CDU-1)',
      files: [presetDocuments[3]]
    },
    {
      label: '📖 SOP-2401 Corrosion Standards',
      prompt: 'Search indexed maintenance standards for permissible corrosion allowance on 2.25Cr-1Mo hydrotreating reactors under high-pressure hydrogen service.',
      category: 'MAINTENANCE_SOP' as const,
      unit: 'Diesel Hydrodesulfurization (DHDS-2)',
      files: [presetDocuments[1]]
    }
  ];

  const handleSelectScenario = (sc: typeof quickScenarios[0]) => {
    setPrompt(sc.prompt);
    setSelectedCategory(sc.category);
    setSelectedUnit(sc.unit);
    setAttachedFiles(sc.files);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleAddPresetFile = (file: AttachedFile) => {
    if (!attachedFiles.some(f => f.name === file.name)) {
      setAttachedFiles(prev => [...prev, file]);
    }
    setShowAttachMenu(false);
  };

  const handleRemoveFile = (fileName: string) => {
    setAttachedFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const handleNativeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile: AttachedFile = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type || 'application/octet-stream'
      };
      setAttachedFiles(prev => [...prev, newFile]);
      setShowAttachMenu(false);
    }
  };

  // Speech-to-Text handler with Web Speech API and intelligent fallback
  const toggleSpeechToText = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      setRecordingStatus(null);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-IN'; // Indian English

        recognition.onstart = () => {
          setIsRecording(true);
          setRecordingStatus('Listening to engineer voice input...');
        };

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((res: any) => res[0].transcript)
            .join(' ');
          if (transcript) {
            setPrompt(prev => (prev ? `${prev} ${transcript}` : transcript));
          }
        };

        recognition.onerror = () => {
          setIsRecording(false);
          setRecordingStatus(null);
        };

        recognition.onend = () => {
          setIsRecording(false);
          setRecordingStatus(null);
        };

        recognition.start();
      } catch (err) {
        fallbackVoiceSimulation();
      }
    } else {
      fallbackVoiceSimulation();
    }
  };

  // Fallback voice simulation for environments where mic is blocked
  const fallbackVoiceSimulation = () => {
    setIsRecording(true);
    setRecordingStatus('Simulating speech recognition: "Check DHDS reactor R-02 wall thinning..."');
    setTimeout(() => {
      setPrompt(prev =>
        prev
          ? `${prev} Compare remaining wall thickness in inspection report MRPL-INSP-2026-DHDS-041 with SOP-2401 Level 2 criteria.`
          : 'Compare remaining wall thickness in inspection report MRPL-INSP-2026-DHDS-041 with SOP-2401 Level 2 criteria.'
      );
      if (attachedFiles.length === 0) {
        setAttachedFiles([presetDocuments[0], presetDocuments[1]]);
      }
      setIsRecording(false);
      setRecordingStatus(null);
    }, 1800);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() && attachedFiles.length === 0) return;

    // Generate a title based on prompt
    const cleanPrompt = prompt.trim() || 'Analyze attached refinery documents';
    const title =
      cleanPrompt.length > 55 ? `${cleanPrompt.substring(0, 52)}...` : cleanPrompt;

    const taskId = createNewTask({
      title,
      description: cleanPrompt,
      category: selectedCategory,
      files: attachedFiles.length > 0 ? attachedFiles : undefined
    });

    // Start pipeline execution
    startTaskExecution(taskId);

    // Reset prompt box
    setPrompt('');
    setAttachedFiles([]);
    setShowAttachMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [prompt]);

  return (
    <div className="border-t border-slate-200 bg-white p-3 sm:p-4 space-y-3 shrink-0 shadow-lg relative">
      {/* Quick Scenario Preset Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
        <span className="text-[10px] text-slate-600 uppercase font-bold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-blue-700" />
          <span>Presets:</span>
        </span>
        {quickScenarios.map((sc, sIdx) => (
          <button
            key={sIdx}
            type="button"
            onClick={() => handleSelectScenario(sc)}
            className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-900 transition-colors shrink-0 font-medium text-[11px] cursor-pointer"
          >
            {sc.label}
          </button>
        ))}
      </div>

      {/* Recording status badge if microphone is active */}
      {isRecording && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-50 border border-rose-300 text-xs text-rose-800 font-mono animate-in fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
          <span className="font-bold">Microphone Active:</span>
          <span>{recordingStatus}</span>
          <button
            onClick={toggleSpeechToText}
            className="ml-auto text-[11px] text-rose-700 font-bold hover:underline cursor-pointer"
          >
            Stop
          </button>
        </div>
      )}

      {/* Attached Files Chips Bar */}
      {attachedFiles.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {attachedFiles.map((file, fIdx) => (
            <div
              key={fIdx}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs text-blue-900 font-mono shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-blue-700" />
              <span className="font-semibold text-[11px]">{file.name}</span>
              <span className="text-[10px] text-slate-500">({file.size})</span>
              <button
                type="button"
                onClick={() => handleRemoveFile(file.name)}
                className="ml-1 p-0.5 hover:bg-blue-200 rounded text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modern Main AI Input Container */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-300 bg-slate-50/70 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all shadow-xs relative"
      >
        {/* Hidden Native File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleNativeFileUpload}
          className="hidden"
          accept=".pdf,.png,.jpg,.jpeg,.csv,.xlsx,.docx,.txt"
        />

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe industrial task, ask about refinery SOPs, or attach NDT reports... (Enter to send, Shift+Enter for new line)"
          rows={2}
          className="w-full bg-transparent px-3.5 pt-3 pb-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none resize-none font-sans leading-relaxed"
        />

        {/* Bottom Toolbar inside the box */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-slate-200/60 bg-white/80 rounded-b-xl gap-2">
          {/* Left Actions: Attach File (+) & Metadata Selectors */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Attachment Button (+) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="p-1.5 rounded-lg border border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-slate-700 hover:text-blue-900 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
                title="Attach refinery inspection reports or blueprints"
              >
                <Plus className="w-4 h-4 text-blue-700" />
                <span className="hidden sm:inline text-[11px] font-mono">Attach Document</span>
              </button>

              {/* Attach Dropdown Menu */}
              {showAttachMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-72 bg-white rounded-lg border border-slate-200 shadow-xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-bold px-2 py-1">
                    Select Refinery Asset / File
                  </div>

                  {/* Device Upload Option */}
                  <button
                    type="button"
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowAttachMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-md hover:bg-slate-100 flex items-center gap-2 text-xs font-sans text-slate-800 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-blue-700" />
                    <span>Upload from Local Workstation</span>
                  </button>

                  <div className="border-t border-slate-100 pt-1 text-[10px] font-mono text-slate-500 uppercase px-2 font-bold">
                    Pre-Loaded Refinery Records
                  </div>

                  {presetDocuments.map((doc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddPresetFile(doc)}
                      className="w-full text-left p-2 rounded-md hover:bg-blue-50 flex items-center justify-between text-xs font-sans text-slate-800 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span className="truncate text-[11px] font-mono">{doc.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">{doc.size}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Unit Selector Pill Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUnitMenu(!showUnitMenu)}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-mono text-slate-700 flex items-center gap-1 cursor-pointer font-medium"
              >
                <Building2 className="w-3 h-3 text-slate-500" />
                <span className="truncate max-w-[120px] sm:max-w-none">
                  {selectedUnit.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showUnitMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg border border-slate-200 shadow-xl p-1.5 z-50 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-bold px-2 py-1">
                    Operating Refinery Unit
                  </div>
                  {availableUnits.map(unit => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => {
                        setSelectedUnit(unit);
                        setShowUnitMenu(false);
                      }}
                      className={`w-full text-left p-2 rounded-md text-xs font-sans flex items-center justify-between cursor-pointer ${
                        selectedUnit === unit
                          ? 'bg-blue-50 text-blue-900 font-semibold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{unit}</span>
                      {selectedUnit === unit && <Check className="w-3.5 h-3.5 text-blue-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Selector Pill Dropdown */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-mono text-slate-700 flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Category: {availableCategories.find(c => c.value === selectedCategory)?.label.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showCategoryMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-lg border border-slate-200 shadow-xl p-1.5 z-50 space-y-1">
                  {availableCategories.map(cat => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setShowCategoryMenu(false);
                      }}
                      className={`w-full text-left p-2 rounded-md text-xs font-sans flex items-center justify-between cursor-pointer ${
                        selectedCategory === cat.value
                          ? 'bg-blue-50 text-blue-900 font-semibold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.value && <Check className="w-3.5 h-3.5 text-blue-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions: Mic (Speech-to-Text) & Submit Arrow Button */}
          <div className="flex items-center gap-2">
            {/* Speech to Text Mic Button */}
            <button
              type="button"
              onClick={toggleSpeechToText}
              className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                isRecording
                  ? 'bg-rose-600 text-white border-rose-700 shadow-sm animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
              title={isRecording ? 'Listening (Click to stop)' : 'Click to speak (Speech-to-Text)'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Execute / Send Button */}
            <button
              type="submit"
              disabled={!prompt.trim() && attachedFiles.length === 0}
              className={`p-2 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                prompt.trim() || attachedFiles.length > 0
                  ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-sm'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
              title="Execute task (Enter)"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Execute</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
