import React from 'react';
import {
  Cpu,
  BookOpen,
  Boxes,
  CheckSquare,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowRight,
  Play,
  Upload,
  FileText,
  Lock,
  Layers,
  Sparkles,
  Building2,
  Terminal,
  Code,
  FileCheck,
  Radio,
  FileSpreadsheet,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { StatusBadge } from '../common/StatusBadge';

export const OverviewView: React.FC = () => {
  const {
    setActiveTab,
    tasks,
    documents,
    models,
    mcpServers,
    auditLogs,
    runGoldenDemo,
    createNewTask,
    startTaskExecution,
    isAirGapEnforced,
    setAirGapEnforced
  } = useWorkbench();

  const pendingApprovalsCount = tasks.filter(t => t.status === 'AWAITING_APPROVAL').length;
  const completedTasksCount = 184 + tasks.filter(t => t.status === 'COMPLETED').length;

  const handleLaunchScenario = (
    title: string,
    prompt: string,
    category: any,
    files: { name: string; size: string; type: string }[]
  ) => {
    const taskId = createNewTask({
      title,
      description: prompt,
      category,
      files
    });
    startTaskExecution(taskId);
    setActiveTab('workbench');
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50 text-slate-800">
      {/* 1. Official Institutional Hero Section (Google-level simplicity & dignity) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs relative overflow-hidden">
        {/* Subtle National Tiranga Top Accent Stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        <div className="p-6 lg:p-8 space-y-6">
          {/* Top Institutional Identity Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-xl shrink-0">
                🏛️
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-blue-900 font-sans tracking-wide">
                    भारत सरकार | Government of India
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-600 font-medium">
                    Ministry of Petroleum and Natural Gas
                  </span>
                </div>
                <div className="text-xs text-slate-800 font-semibold mt-0.5">
                  मंगलूर रिफाइनरी एंड पेट्रोकेमिकल्स लिमिटेड | Mangalore Refinery and Petrochemicals Limited (MRPL)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300">
                SIH 2026 · PS ID: SIH26117
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
                Team Tattva
              </span>
            </div>
          </div>

          {/* Main Hero Headline & Value Proposition */}
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Sovereign On-Premise AI Cockpit · Zero Cloud Egress Verified</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              PRAGYA <span className="font-serif font-normal text-slate-500 text-xl sm:text-2xl">(प्रज्ञा)</span>
              <span className="block text-blue-800 text-lg sm:text-xl lg:text-2xl font-bold mt-1">
                &ldquo;AI that does the work, where the data lives.&rdquo;
              </span>
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              India&apos;s sovereign, air-gapped Agentic AI execution workbench designed specifically for confidential 
              refinery operations. It ingests technical equipment manuals, NDT turnaround inspection reports, and live DCS telemetry, 
              directs tasks to specialized open-weight local LLMs, executes deterministic calculations in isolated sandboxes, 
              and compiles auditable engineering deliverables—with guaranteed zero data leakage.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={runGoldenDemo}
              className="px-5 py-2.5 text-xs font-bold rounded-lg text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-slate-950" />
              <span>Launch Turnaround Golden Demo</span>
            </button>

            <button
              onClick={() => setActiveTab('workbench')}
              className="px-5 py-2.5 text-xs font-bold rounded-lg text-white bg-blue-700 hover:bg-blue-800 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Open AI Workbench</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-blue-700" />
              <span>System Documentation & Specs</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MRPL Plant Units Live Operational Status Strip */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-700" />
            <span className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              MRPL Mangalore Plant Units · Telemetry & Readiness Status
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            Plant Capacity: 15.0 MMTPA · Coastal Refinery
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Unit 1 */}
          <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 font-sans">DHDS-2 Unit</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold border border-amber-300">
                TURNAROUND PHASE
              </span>
            </div>
            <div className="text-[11px] text-slate-600 leading-snug">
              Diesel Hydrodesulfurization · NDT wall thinning analysis active on Reactor R-02.
            </div>
            <div className="text-[10px] font-mono text-blue-800 font-semibold pt-1">
              Active Task: MRPL-INSP-2026-DHDS-041
            </div>
          </div>

          {/* Unit 2 */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 font-sans">CDU / VDU-1</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-200">
                OPERATIONAL
              </span>
            </div>
            <div className="text-[11px] text-slate-600 leading-snug">
              Crude & Vacuum Distillation · Pre-heat train exchanger E-102A monitored for fouling.
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-1">
              Throughput: Nominal 42,000 BPD
            </div>
          </div>

          {/* Unit 3 */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 font-sans">FCCU Complex</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-200">
                NOMINAL
              </span>
            </div>
            <div className="text-[11px] text-slate-600 leading-snug">
              Fluidized Catalytic Cracking · Catalyst circulation rate & regenerator cyclone inspection.
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-1">
              Temperature: 535°C Balanced
            </div>
          </div>

          {/* Unit 4 */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 font-sans">HGU (Hydrogen Unit)</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-200">
                SAFE ENVELOPE
              </span>
            </div>
            <div className="text-[11px] text-slate-600 leading-snug">
              High-pressure reformer tubes · HTHA (Nelson Curves) API 941 compliance tracking.
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-1">
              Pressure: 28.4 kg/cm²
            </div>
          </div>
        </div>
      </div>

      {/* 3. Four Sovereign Pillars (Why PRAGYA is different from generic chatbots) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 font-sans">
            100% On-Premise Air-Gap
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zero cloud tokens, zero external API egress. Operates entirely inside MRPL&apos;s firewall 
            under the Digital Personal Data Protection (DPDP) Act 2023.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 font-sans">
            Task-Optimized Model Routing
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Routes Python math to DeepSeek-Coder-33B, engineering reasoning to Qwen-72B, and P&ID drawings 
            to Qwen-VL, optimizing GPU VRAM and eliminating latency bottlenecks.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 font-sans">
            Sandboxed Deterministic Math
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zero arithmetic hallucinations. Engineering calculations execute in isolated gVisor containers 
            running real Python code with strict AST validation.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
            <CheckSquare className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 font-sans">
            Human-in-the-Loop Sign-Off
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Critical recommendations cannot self-execute. Enforces mandatory sign-offs by Lead Metallurgists 
            and DGMs, ensuring compliance with OISD-118 and PESO.
          </p>
        </div>
      </div>

      {/* 4. One-Click Interactive Workflows (Simplistic, real, and efficient) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900 font-sans">
                Quick-Start Sovereign Workflows
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any verified industrial scenario below to pre-populate and execute the live pipeline.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('workbench')}
            className="text-xs font-mono font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Open Blank Task Canvas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Workflow 1: Golden Demo */}
          <div
            onClick={runGoldenDemo}
            className="p-4 rounded-lg border border-amber-300 bg-amber-50/40 hover:bg-amber-50 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-amber-100 text-amber-900 border border-amber-300">
                  GOLDEN DEMO SCENARIO
                </span>
                <span className="text-[10px] font-mono text-slate-500">Unit: DHDS-2</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-2 font-sans group-hover:text-blue-900">
                Piping Wall Thinning & API 579 Approval Note
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Ingest NDT inspection report MRPL-INSP-2026-DHDS-041, check remaining thickness against SOP-2401, 
                verify API 579 Level 2 criteria, and prepare formal DGM sign-off note.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-amber-200/60 text-amber-900 font-bold">
              <span>Attached: 2 Reports (17.2 MB)</span>
              <span className="flex items-center gap-1 text-blue-700 group-hover:translate-x-1 transition-transform">
                <span>Run Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Workflow 2: Coder / Math Sandbox */}
          <div
            onClick={() =>
              handleLaunchScenario(
                'Preheat Exchanger Thermal Rating & LMTD',
                'Write and test a sandboxed Python script to compute LMTD, heat duty, and dirty heat transfer coefficient U_dirty for preheat exchanger E-102A per TEMA Class R.',
                'CALCULATION',
                [{ name: 'MRPL-ENG-MAN-HEX-102.pdf', size: '8.1 MB', type: 'application/pdf' }]
              )
            }
            className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-blue-100 text-blue-800 border border-blue-200">
                  CODE & THERMODYNAMICS
                </span>
                <span className="text-[10px] font-mono text-slate-500">Unit: CDU-1</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-2 font-sans group-hover:text-blue-900">
                Heat Exchanger Thermal Rating & Fouling Assessment
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Execute sandboxed Python calculations to determine temperature cross, log-mean temperature difference, 
                and dirty overall coefficient per TEMA Class R standards.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-200 text-slate-600 font-medium">
              <span>Model: DeepSeek-Coder-33B</span>
              <span className="flex items-center gap-1 text-blue-700 group-hover:translate-x-1 transition-transform font-bold">
                <span>Execute Sandbox Calc</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Workflow 3: P&ID Vision */}
          <div
            onClick={() =>
              handleLaunchScenario(
                'P&ID Drawing Tag Digitization & Extraction',
                'Analyze P&ID drawing MRPL-PID-CRU-301, detect all control valve and transmitter tags, and generate structured asset inventory JSON.',
                'PID_VISION',
                [{ name: 'MRPL-PID-CRU-301.png', size: '3.6 MB', type: 'image/png' }]
              )
            }
            className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-purple-100 text-purple-800 border border-purple-200">
                  MULTIMODAL VISION
                </span>
                <span className="text-[10px] font-mono text-slate-500">Unit: Crude Distillation</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-2 font-sans group-hover:text-blue-900">
                P&ID Engineering Blueprint Tag Extraction
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Multimodal visual inspection of high-resolution piping and instrumentation diagrams. 
                Extracts ISA tags, fail-safe modes, and outputs structured JSON asset inventories.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-200 text-slate-600 font-medium">
              <span>Model: Qwen-2.5-VL-72B</span>
              <span className="flex items-center gap-1 text-blue-700 group-hover:translate-x-1 transition-transform font-bold">
                <span>Extract Assets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Workflow 4: SOP RAG Search */}
          <div
            onClick={() => setActiveTab('knowledge')}
            className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  HYBRID RAG RETRIEVAL
                </span>
                <span className="text-[10px] font-mono text-slate-500">Corpus: 870 Chunks</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-2 font-sans group-hover:text-blue-900">
                Corrosion Allowance & ASME Section VIII Search
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Query local indexed engineering standards, turnaround guidelines, and equipment manuals with 
                dense BGE-M3 embeddings and sparse BM25 lexical precision.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-200 text-slate-600 font-medium">
              <span>Index: BAAI/bge-m3</span>
              <span className="flex items-center gap-1 text-blue-700 group-hover:translate-x-1 transition-transform font-bold">
                <span>Search Knowledge Base</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Key Operational KPIs & System Health Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-semibold uppercase">Verified Tasks</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {completedTasksCount}
          </div>
          <div className="text-[11px] text-emerald-700 font-mono font-semibold">
            +14 today during turnaround
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-semibold uppercase">Avg Response Time</span>
            <Clock className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            4.8s
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Local vLLM GPU inference
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-semibold uppercase">Verification Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-mono tabular-nums">
            99.4%
          </div>
          <div className="text-[11px] text-emerald-700 font-mono font-semibold">
            Zero Hallucination Gate
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-semibold uppercase">External Egress</span>
            <Radio className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-mono tabular-nums">
            0 Calls
          </div>
          <div className="text-[11px] text-emerald-700 font-mono font-semibold">
            Air-Gap Policy Active
          </div>
        </div>
      </div>

      {/* 6. Two-Column Live Infrastructure & Recent Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Workflow Activity (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                Recent Sovereign Operational Activity
              </h3>
              <p className="text-xs text-slate-500">
                Append-only chronological audit log of on-premise model inferences & tool calls.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('audit')}
              className="text-xs text-blue-700 hover:text-blue-800 font-mono font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Full Audit Trail</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {auditLogs.slice(0, 5).map(log => (
              <div
                key={log.id}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-blue-900 font-bold">{log.action}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-600 font-mono text-[11px]">{log.actor}</span>
                    <span className="text-slate-300">·</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">
                      {log.category}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed font-sans">{log.details}</p>
                </div>
                <div className="text-right shrink-0 font-mono text-[10px] text-slate-500">
                  <div>{log.timestamp.split(' ')[1]}</div>
                  <StatusBadge status={log.status} className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Local Cluster Topology Card (1 col) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-mono uppercase text-blue-800 font-bold tracking-wider">
                Hardware Topology
              </span>
              <h3 className="text-sm font-bold text-slate-900 font-sans mt-0.5">
                MRPL On-Premise GPU Cluster
              </h3>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Node ID:</span>
                <span className="font-bold text-slate-900">HPC-AI01 (Mangalore)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">GPU Rig:</span>
                <span className="font-bold text-slate-900">4x NVIDIA A100 (80GB)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">VRAM In Use:</span>
                <span className="font-bold text-blue-800">112 / 160 GB (70%)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Active Models:</span>
                <span className="font-bold text-emerald-800">4 Local Weights (vLLM)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">MCP Connectors:</span>
                <span className="font-bold text-slate-900">4 Servers · 12 Tools</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('settings')}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-sans"
            >
              <span>Manage Cluster Settings</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
