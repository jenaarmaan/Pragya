import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  CheckCircle2,
  Sliders,
  ArrowRight,
  Server,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { StatusBadge } from '../common/StatusBadge';
import { routeTaskToModel } from '../../data/sampleModels';

export const ModelRouterView: React.FC = () => {
  const { models } = useWorkbench();

  // Interactive routing simulator state
  const [testPrompt, setTestPrompt] = useState(
    'Write a Python script to calculate heat exchanger fouling factor Rf and LMTD per TEMA Class R.'
  );
  const [hasImage, setHasImage] = useState(false);
  const [hasCode, setHasCode] = useState(true);

  // Endpoint configuration state
  const [customEndpoint, setCustomEndpoint] = useState('http://10.14.8.50:8000/v1');
  const [adapterType, setAdapterType] = useState('vLLM (OpenAI-compatible)');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const routingResult = routeTaskToModel(testPrompt, hasImage, hasCode);

  const handleSimulate = (prompt: string, img: boolean = false, code: boolean = false) => {
    setTestPrompt(prompt);
    setHasImage(img);
    setHasCode(code);
  };

  const handleSaveEndpoint = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-50 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
              Model Registry & Sovereign Task Router
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
              Open-Weight Local LLMs
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Dynamic, policy-governed task router directing industrial prompts to specialized local models.
            All weights execute on MRPL on-premise GPU clusters without external cloud telemetry.
          </p>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div>
        <div className="text-xs font-mono uppercase text-slate-600 mb-3 flex items-center justify-between font-bold">
          <span>Registered On-Premise Models</span>
          <span className="text-emerald-700 font-semibold">4 Connected · 1 Standby (Zero Cloud Dependency)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {models.map(model => (
            <div
              key={model.id}
              className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-sans">{model.name}</h3>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {model.family} · {model.parameters}
                    </div>
                  </div>
                  <StatusBadge status={model.status} />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans mb-3">
                  {model.description}
                </p>

                <div className="space-y-1.5 p-2.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
                  <div className="flex justify-between">
                    <span>Quantization:</span>
                    <span className="text-slate-900 font-semibold">{model.quantization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VRAM Footprint:</span>
                    <span className="text-slate-900 font-semibold">{model.vramRequirement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Context Window:</span>
                    <span className="text-blue-800 font-bold">{model.contextLength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Latency:</span>
                    <span className="text-emerald-700 font-bold">{model.latencyAvgMs} ms</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 mb-1.5 font-bold">
                  Core Specializations
                </div>
                <div className="flex flex-wrap gap-1">
                  {model.capabilities.slice(0, 3).map((cap, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Model Routing Simulator & Trace */}
      <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Dynamic Task-Based Model Routing Simulator
            </h3>
          </div>
          <span className="text-xs font-mono text-blue-800 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Real-Time Evaluation Engine
          </span>
        </div>

        {/* Quick Simulator Prompts */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() =>
              handleSimulate(
                'Analyze industrial inspection report and check wall thinning against SOP-2401',
                false,
                false
              )
            }
            className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-700 text-xs font-mono font-medium cursor-pointer transition-colors"
          >
            Scenario A: SOP & Inspection (General LLM)
          </button>
          <button
            onClick={() =>
              handleSimulate(
                'Write a Python script to calculate heat exchanger fouling factor Rf and LMTD',
                false,
                true
              )
            }
            className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-700 text-xs font-mono font-medium cursor-pointer transition-colors"
          >
            Scenario B: Engineering Calc (Coder LLM)
          </button>
          <button
            onClick={() =>
              handleSimulate(
                'Parse engineering P&ID drawing and extract all pressure transmitter and valve tags',
                true,
                false
              )
            }
            className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-700 text-xs font-mono font-medium cursor-pointer transition-colors"
          >
            Scenario C: P&ID Drawing (Vision-Language LLM)
          </button>
        </div>

        {/* Simulator Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-1 font-sans">
            Simulated User Task Request
          </label>
          <textarea
            value={testPrompt}
            onChange={e => setTestPrompt(e.target.value)}
            rows={2}
            className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-xs text-slate-900 font-sans focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none"
          />
        </div>

        {/* Model Routing Trace Visualization */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
          <div className="text-xs font-mono uppercase text-blue-800 font-bold tracking-wider">
            Model Routing Trace
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
            {/* Detected Capability */}
            <div className="p-3 rounded-md bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Detected Capability</span>
              <div className="text-slate-900 font-bold text-[11px] leading-tight">
                {routingResult.detectedCapability}
              </div>
            </div>

            {/* Selected Model */}
            <div className="p-3 rounded-md bg-blue-50 border border-blue-300 space-y-1">
              <span className="text-[10px] text-blue-800 uppercase font-bold">Selected Model</span>
              <div className="text-blue-900 font-bold text-[11px] truncate">
                {routingResult.selectedModel.name}
              </div>
            </div>

            {/* Candidate Models Score */}
            <div className="p-3 rounded-md bg-white border border-slate-200 space-y-1 md:col-span-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Candidate Evaluation</span>
              <div className="flex items-center gap-4 text-[11px] flex-wrap">
                {routingResult.candidates.map(c => (
                  <div key={c.modelId} className="flex items-center gap-1.5">
                    <span className={c.selected ? 'text-blue-900 font-bold' : 'text-slate-500'}>
                      {c.modelName}: {c.score}pts
                    </span>
                    {c.selected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Explanation Quote */}
          <div className="p-3 rounded-md bg-white border border-slate-200 text-xs text-slate-700 font-sans leading-relaxed">
            <span className="font-bold text-blue-800 font-mono">Routing Explanation: </span>
            {routingResult.reason}
          </div>
        </div>
      </div>

      {/* Local Model Endpoint Configuration */}
      <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-sans">
            Configurable Local Inference Endpoint Adapter
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Connect PRAGYA to any OpenAI-compatible local server (vLLM, Ollama, LocalAI, TGI).
            Zero external network calls or cloud credentials required.
          </p>
        </div>

        <form onSubmit={handleSaveEndpoint} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-mono text-slate-600 mb-1 font-semibold">
              Local Endpoint URL
            </label>
            <input
              type="text"
              value={customEndpoint}
              onChange={e => setCustomEndpoint(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-600 mb-1 font-semibold">
              Adapter Driver
            </label>
            <select
              value={adapterType}
              onChange={e => setAdapterType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="vLLM (OpenAI-compatible)">vLLM (OpenAI-compatible v1/chat/completions)</option>
              <option value="Ollama Engine">Ollama Engine (api/generate)</option>
              <option value="HuggingFace TGI">Hugging Face Text Generation Inference (TGI)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Server className="w-3.5 h-3.5" />
              <span>{savedSuccess ? 'Connection Verified' : 'Update Inference Route'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
