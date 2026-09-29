import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Boxes,
  Terminal,
  Network,
  CheckSquare,
  ShieldAlert,
  FileCheck2,
  Flame,
  Search,
  CheckCircle2,
  ExternalLink,
  Layers,
  Lock,
  Workflow,
  Server,
  Zap,
  HelpCircle,
  FileCode,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { NavigationTab } from '../../types';

interface FeatureDoc {
  id: string;
  name: string;
  category: 'Core Agentic' | 'Models & Routing' | 'Knowledge & Tools' | 'Security & Governance' | 'Federated AI';
  targetTab: NavigationTab;
  tabLabel: string;
  badge: string;
  summary: string;
  implementationDetails: string[];
  techStack: string;
  standards: string;
}

export const DocumentationView: React.FC = () => {
  const { setActiveTab, runGoldenDemo } = useWorkbench();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const features: FeatureDoc[] = [
    {
      id: 'workbench',
      name: 'Agentic Planning & ReAct Execution Engine',
      category: 'Core Agentic',
      targetTab: 'workbench',
      tabLabel: 'AI Workbench',
      badge: 'Core Pipeline',
      summary:
        'Modern conversational AI workspace and autonomous multi-step reasoning agent that breaks high-level natural language industrial commands into classified tasks, dynamic plans, tool actions, and structured verifiable outputs.',
      implementationDetails: [
        'Streamlined conversational canvas with bottom prompt input dock, speech-to-text voice recognition, and one-click file attachments (+).',
        'Uses ReAct (Reason + Act) cycle: parses engineering requests, determines dependencies, and generates deterministic sub-task execution graphs.',
        'Executes steps sequentially with live status updates (Classifying -> Routing -> Planning -> Executing -> Verifying -> Approvals).',
        'Features a collapsible, tabbed Evidence & Verification inspector providing zero-hallucination verification without UI congestion.',
        'Includes an automated self-healing retry loop: if code sandbox execution or tool output throws an error, the agent modifies its parameters and re-executes.'
      ],
      techStack: 'Qwen-2.5-72B-Instruct, ReAct Loop, Structured JSON Schema',
      standards: 'OISD-118, API 570 Inspection Protocols'
    },
    {
      id: 'models',
      name: 'Dynamic Task-Based Model Routing',
      category: 'Models & Routing',
      targetTab: 'models',
      tabLabel: 'Models & Router',
      badge: 'Latency & VRAM Optimized',
      summary:
        'Intelligent heuristic and semantic classifier that selects the optimal local open-weight model for each task based on capability requirements, context length, and GPU VRAM constraints.',
      implementationDetails: [
        'Calculates capability fit scores across General Reasoning, Python Code Generation, Multimodal Vision, and Dense Retrieval.',
        'Routes Python math & calculations to DeepSeek-Coder-33B; complex engineering synthesis to Qwen-2.5-72B; P&ID diagrams to Qwen-2.5-VL.',
        'Prevents GPU VRAM exhaustion on local HPC nodes via active model offloading and quantization awareness (AWQ / GPTQ / FP8).',
        'Displays full transparent routing logs showing why a specific model won over candidate alternatives.'
      ],
      techStack: 'vLLM Inference Server, Triton Engine, FlashAttention-2',
      standards: 'MRPL Confidential Computing Tier-1'
    },
    {
      id: 'knowledge',
      name: 'Local Sovereign RAG (Retrieval-Augmented Generation)',
      category: 'Knowledge & Tools',
      targetTab: 'knowledge',
      tabLabel: 'Knowledge Base',
      badge: '100% On-Premise',
      summary:
        'Secure on-premise document search engine that ingests confidential refinery manuals, turnaround reports, equipment datasheets, and maintenance SOPs with zero external egress.',
      implementationDetails: [
        'Employs hybrid retrieval: dense vector embeddings (BAAI/bge-m3) combined with sparse BM25 keyword matching for exact asset tag precision.',
        'Maintains strict document metadata including classification level (Confidential / Restricted), plant unit, and revision timestamps.',
        'Chunks technical engineering documents preserving tabular formatting, corrosion limits, and cross-reference citations.',
        'Provides real-time vector search queries with cosine similarity scores and exact line citations.'
      ],
      techStack: 'BGE-M3 Embeddings, Local Milvus/FAISS Vector Index, BM25 Lexical',
      standards: 'ASME Section VIII Div 1 & 2, API 510/570'
    },
    {
      id: 'mcp',
      name: 'Model Context Protocol (MCP) Tool Integration',
      category: 'Knowledge & Tools',
      targetTab: 'mcp',
      tabLabel: 'MCP Tools',
      badge: 'Enterprise Standard',
      summary:
        'Open standard tool protocol allowing PRAGYA to securely query live refinery DCS (Yokogawa CENTUM), SAP PM work orders, Bentley asset tags, and Aspen Plus simulations.',
      implementationDetails: [
        'Standardized JSON-RPC protocol exposing structured tools with typed parameter schemas and safety annotations.',
        'Pre-execution policy gateway: every tool call is inspected for read-only vs. write-back permissions before dispatch.',
        'Directly accesses live process historians (OPC-UA / MQTT) without hardcoding proprietary API clients into model prompts.',
        'Simulates real industrial endpoints for temperature sensors, pressure transmitters, ultrasonic thickness gauges, and CMMS.'
      ],
      techStack: 'MCP SDK (Model Context Protocol), JSON-RPC 2.0, OPC-UA Bridge',
      standards: 'ISA-95 Enterprise-Control Integration, IEC 62443'
    },
    {
      id: 'sandbox',
      name: 'Sandboxed Python & Calculation Runtime',
      category: 'Security & Governance',
      targetTab: 'sandbox',
      tabLabel: 'Agent Sandbox',
      badge: 'gVisor Isolation',
      summary:
        'Zero-trust isolated container execution environment for running AI-generated Python scripts, engineering calculations, and data transformations safely on-premise.',
      implementationDetails: [
        'Enforces kernel-level isolation using gVisor sandbox with seccomp-bpf system call filters and disabled network sockets.',
        'Strict resource limits: 2.0 CPU cores, 4GB RAM ceiling, 30-second hard execution timeout per run.',
        'Captures stdout, stderr, execution duration, and memory utilization in real time.',
        'Allows refinery engineers to verify calculation logic (e.g. LMTD, Remaining Useful Life, corrosion rates) directly in the UI.'
      ],
      techStack: 'gVisor (runsc), Python 3.11 Runtime, NumPy, SciPy, Pandas',
      standards: 'NIST SP 800-190 Container Security, CIS Benchmark'
    },
    {
      id: 'approvals',
      name: 'Human-in-the-Loop High-Risk Approval Queue',
      category: 'Security & Governance',
      targetTab: 'approvals',
      tabLabel: 'Approvals Queue',
      badge: 'Zero Autonomous Hazard',
      summary:
        'Mandatory human sign-off gate for high-risk industrial decisions, shutdown advisories, pressure vessel re-ratings, and safety-critical equipment modifications.',
      implementationDetails: [
        'Automated risk classifier flags tasks affecting process safety, turnaround schedules, or API compliance as AWAITING_APPROVAL.',
        'Presents approvers (Lead Metallurgist, DGM Inspection) with side-by-side evidence: citations, calculation outputs, and raw model assertions.',
        'Requires mandatory reason comments for rejections or modifications to guarantee complete regulatory accountability.',
        'One-click sign-off automatically triggers certified artifact publishing and audit log finalization.'
      ],
      techStack: 'RBAC Policy Engine, Digital Signature Verification, Audit Hook',
      standards: 'Petroleum & Explosives Safety Organisation (PESO), OISD-118'
    },
    {
      id: 'artifacts',
      name: 'Certified Business Artifacts Vault',
      category: 'Core Agentic',
      targetTab: 'artifacts',
      tabLabel: 'Artifacts Vault',
      badge: 'Downloadable Assets',
      summary:
        'Enterprise document synthesis engine that compiles verified agent findings into real, standardized industrial deliverables with cryptographic SHA-256 integrity hashes.',
      implementationDetails: [
        'Generates formatted .docx Technical Approval Notes complete with executive summaries, findings, and signature blocks.',
        'Exports executable .py calculation scripts and .csv/.xlsx datasets for refinery metallurgical databases.',
        'Embeds SHA-256 cryptographic hashes for non-repudiation and forensic chain of custody.',
        'Allows direct in-browser inspection, live previewing, and immediate local file download.'
      ],
      techStack: 'Docx Templating, Cryptographic Hash Generator, Client Blob Exporter',
      standards: 'ISO 9001 Document Control, MRPL Quality Management'
    },
    {
      id: 'audit',
      name: 'Immutable Sovereign Audit & Security Trail',
      category: 'Security & Governance',
      targetTab: 'audit',
      tabLabel: 'Audit & Security',
      badge: 'Forensic Compliance',
      summary:
        'Cryptographically verifiable, tamper-evident chronological event log tracking every user prompt, model routing decision, tool invocation, and human sign-off.',
      implementationDetails: [
        'Every audit entry logs timestamp, actor identity, action type, cryptographic checksum, and full parameter payloads.',
        'Real-time egress monitor confirms 0 external internet calls, verifying strict compliance with the sovereign air-gap policy.',
        'Provides search, severity filtering, and JSON/CSV export capabilities for statutory OISD and DGMS safety inspections.',
        'Displays active node topology, memory residency, and container isolation health.'
      ],
      techStack: 'Append-Only Ledger, SHA-256 Hashing, RFC 5424 Syslog Schema',
      standards: 'DPDP Act 2023, ISO 27001, OISD Inspection Guidelines'
    },
    {
      id: 'federated',
      name: 'Multi-Refinery Federated Learning Dashboard',
      category: 'Federated AI',
      targetTab: 'federated',
      tabLabel: 'Federated Learning',
      badge: 'Data Sovereignty Preserved',
      summary:
        'Collaborative machine learning architecture enabling MRPL, IOCL, BPCL, and HPCL to improve domain models collectively without sharing confidential raw plant operational data.',
      implementationDetails: [
        'Federated Averaging (FedAvg) algorithm trains local LoRA adapters on MRPL equipment logs inside the sovereign perimeter.',
        'Only mathematical parameter weight gradients (delta updates) are encrypted and shared with the central aggregator.',
        'Differential privacy guarantee: noise injection mathematically prevents reverse-engineering of raw refinery sensor readings.',
        'Interactive training round monitor displays local loss, global convergence, and participating PSU refinery nodes.'
      ],
      techStack: 'PySyft / Flower Framework, LoRA / QLoRA Adapters, Differential Privacy',
      standards: 'Indian National Sovereign AI Framework, MeitY Guidelines'
    },
    {
      id: 'settings',
      name: 'Air-Gap Policy & Plant Identity Management',
      category: 'Security & Governance',
      targetTab: 'settings',
      tabLabel: 'Settings & Policy',
      badge: 'Air-Gap Control',
      summary:
        'Central administrative control center for toggling sovereign air-gap enforcement, configuring local GPU hardware clusters, and managing plant refinery nodes.',
      implementationDetails: [
        'Interactive toggle to simulate strict Air-Gap vs. Test Mode with egress call validation.',
        'Configuration of primary plant identity (MRPL Mangalore, Unit DHDS-2, FCCU, Crude Distillation Units).',
        'VRAM allocation and inference batch limits management for on-premise servers.',
        'System reset and sample data re-seeding controls for demonstration and evaluation testing.'
      ],
      techStack: 'Environment Configuration, Local State Management, Network Boundary Simulator',
      standards: 'Govt. of India Information Security Guidelines'
    }
  ];

  const categories = ['ALL', 'Core Agentic', 'Models & Routing', 'Knowledge & Tools', 'Security & Governance', 'Federated AI'];

  const filteredFeatures = features.filter(f => {
    const matchesCategory = selectedCategory === 'ALL' || f.category === selectedCategory;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.techStack.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.standards.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-6 text-slate-800 space-y-6">
      {/* Official Government & PSU Identity Top Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm relative overflow-hidden">
        {/* Subtle Tiranga Top Accent Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-white to-emerald-600" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                SIH 2026 · Problem Statement ID: SIH26117
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">
                Mangalore Refinery and Petrochemicals Limited (A Govt. of India Enterprise)
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span>PRAGYA System Documentation & Feature Architecture</span>
            </h1>

            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              Complete technical specification and functional implementation catalog for <strong>PRAGYA</strong> — 
              India&apos;s Sovereign On-Premise Agentic AI Workbench for confidential industrial workflows. Every feature
              below is fully implemented in this prototype with a direct interactive redirect button.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={runGoldenDemo}
              className="px-4 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-amber-300" />
              <span>Launch Golden Demo Pipeline</span>
            </button>
            <button
              onClick={() => setActiveTab('workbench')}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to AI Workbench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Overview Section: Sovereign Industrial AI */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Section 1 · Sovereign AI Product Vision</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Why PRAGYA: AI That Does The Work, Where The Data Lives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs leading-relaxed text-slate-600">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-blue-700" />
              <span>National Sovereignty & Air-Gap</span>
            </div>
            <p>
              Refineries and public sector enterprises handle critical infrastructure data, process piping diagrams, 
              corrosion thinning data, and turnaround maintenance reports that are legally protected under the Digital Personal 
              Data Protection (DPDP) Act 2023 and OISD-118. PRAGYA never sends a single byte over the public internet.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Workflow className="w-4 h-4 text-blue-700" />
              <span>Agentic Workflows, Not Just Chat</span>
            </div>
            <p>
              Unlike conventional chatbots that hallucinate text, PRAGYA is an autonomous execution workbench. 
              It reads real engineering standards (API 570, ASME VIII), calls live refinery DCS sensors via MCP, writes 
              sandboxed Python calculations, and prepares verifiable technical approval documents.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <CheckSquare className="w-4 h-4 text-blue-700" />
              <span>Zero-Hazard Human Sign-Off</span>
            </div>
            <p>
              Autonomous action in petrochemical facilities carries catastrophic safety risks. PRAGYA enforces an 
              unbypassable Human-in-the-Loop approval gate for safety-critical tasks, backed by tamper-evident cryptographic 
              audit trails for regulatory compliance with PESO and OISD.
            </p>
          </div>
        </div>
      </div>

      {/* End-to-End Execution Pipeline (Step-by-Step Architecture) */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider font-mono">
              <Layers className="w-4 h-4" />
              <span>Section 2 · Technical Pipeline Architecture</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              End-to-End 10-Stage Agentic Pipeline
            </h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline font-mono">
            Interactive Architecture: Click any step to test
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {[
            { step: '01', title: 'Task Request', desc: 'Natural Language & PDF ingest', tab: 'workbench' as NavigationTab },
            { step: '02', title: 'Classification', desc: 'Intent & Category parser', tab: 'workbench' as NavigationTab },
            { step: '03', title: 'Model Routing', desc: 'Dynamic vLLM selector', tab: 'models' as NavigationTab },
            { step: '04', title: 'Agentic Plan', desc: 'ReAct step-by-step logic', tab: 'workbench' as NavigationTab },
            { step: '05', title: 'Local RAG', desc: 'ASME & SOP retrieval', tab: 'knowledge' as NavigationTab },
            { step: '06', title: 'MCP Tools', desc: 'DCS & SAP sensor bridge', tab: 'mcp' as NavigationTab },
            { step: '07', title: 'Code Sandbox', desc: 'Isolated Python calculation', tab: 'sandbox' as NavigationTab },
            { step: '08', title: 'Verification', desc: 'Deterministic fact-check', tab: 'workbench' as NavigationTab },
            { step: '09', title: 'Human Sign-off', desc: 'DGM & Metallurgist gate', tab: 'approvals' as NavigationTab },
            { step: '10', title: 'Artifact Vault', desc: 'Certified .docx & SHA-256', tab: 'artifacts' as NavigationTab }
          ].map(item => (
            <button
              key={item.step}
              onClick={() => setActiveTab(item.tab)}
              className="text-left p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group cursor-pointer bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                  Step {item.step}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="font-bold text-xs text-slate-800 mt-2 group-hover:text-blue-800">
                {item.title}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Catalog & Live Implementation Redirection Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider font-mono">
            <BookOpen className="w-4 h-4" />
            <span>Section 3 · Comprehensive Feature Catalog & Implementation Jump</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Complete System Features & Live Verification
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Each feature contains deep implementation notes and a direct action button to inspect its live working dashboard.
          </p>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-700 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search features, tech, standards..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="space-y-5">
          {filteredFeatures.map((feat, idx) => (
            <div
              key={feat.id}
              className="p-5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all space-y-4"
            >
              {/* Feature Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900 font-sans">
                        {feat.name}
                      </h3>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {feat.category}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {feat.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Redirection Button */}
                <button
                  onClick={() => setActiveTab(feat.targetTab)}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  title={`Open the ${feat.tabLabel} dashboard to see this feature in action`}
                >
                  <span>Open {feat.tabLabel} Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Summary Description */}
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {feat.summary}
              </p>

              {/* Implementation Deep Dive */}
              <div className="bg-slate-50 rounded-md p-3.5 border border-slate-200 text-xs space-y-2">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-blue-700" />
                  <span>How This Feature Is Implemented Under The Hood:</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 pl-4 list-disc">
                  {feat.implementationDetails.map((detail, dIdx) => (
                    <li key={dIdx} className="leading-relaxed">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Tech Stack:</span>
                  <span className="text-slate-700 font-semibold">{feat.techStack}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Compliant Standards:</span>
                  <span className="text-blue-700 font-semibold">{feat.standards}</span>
                </div>
              </div>
            </div>
          ))}

          {filteredFeatures.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No features match your search query &ldquo;{searchQuery}&rdquo;. Try clearing filters.
            </div>
          )}
        </div>
      </div>

      {/* Industrial Compliance & Audit Matrix */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider font-mono">
            <ShieldAlert className="w-4 h-4" />
            <span>Section 4 · Statutory & Regulatory Compliance Matrix</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            MRPL Sovereign Regulatory Compliance Framework
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-semibold">
                <th className="py-2.5 px-3">Regulatory Body / Standard</th>
                <th className="py-2.5 px-3">Requirement</th>
                <th className="py-2.5 px-3">PRAGYA Implementation</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">DPDP Act 2023 (Govt. of India)</td>
                <td className="py-2.5 px-3">Data localization & strictly zero cross-border transfer of proprietary logs</td>
                <td className="py-2.5 px-3">Air-gapped on-premise execution with verified zero egress network rules</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    COMPLIANT
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">OISD-STD-118</td>
                <td className="py-2.5 px-3">Layouts, electrical safety, and inspection of hydrocarbon processing plants</td>
                <td className="py-2.5 px-3">Automated verification of piping wall thinning and corrosion rate margins</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    VERIFIED
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">API 570 / API 579 FFS</td>
                <td className="py-2.5 px-3">Piping inspection code and Fitness-For-Service engineering calculation standards</td>
                <td className="py-2.5 px-3">Sandboxed Python math verifying MAWP, t_min, and remaining life estimates</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ACTIVE
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">PESO Guidelines</td>
                <td className="py-2.5 px-3">High-risk pressure vessel re-rating and turnaround sign-offs require human responsibility</td>
                <td className="py-2.5 px-3">Human-in-the-Loop approval gate with mandatory rejection/approval comments</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ENFORCED
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
