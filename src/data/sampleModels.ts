import { ModelInfo } from '../types';

export const LOCAL_MODELS: ModelInfo[] = [
  {
    id: 'qwen-2.5-72b-instruct-awq',
    name: 'Qwen-2.5-72B-Instruct (AWQ 4-bit)',
    family: 'Qwen 2.5',
    type: 'general',
    parameters: '72B (Quantized)',
    quantization: 'AWQ 4-bit INT4',
    vramRequirement: '48 GB VRAM (Dual A100-80G or H100)',
    contextLength: '32,768 tokens',
    endpoint: 'http://10.14.8.50:8000/v1/chat/completions (Local vLLM)',
    status: 'CONNECTED',
    isDefault: true,
    capabilities: [
      'Industrial Document Reasoning',
      'SOP Compliance Analysis',
      'Approval Note Synthesis',
      'Multi-step Agentic Planning',
      'Tool Calling (JSON / Function)'
    ],
    description: 'High-capability sovereign workhorse for complex multi-page industrial report comprehension, regulatory synthesis, and agentic reasoning.',
    latencyAvgMs: 820
  },
  {
    id: 'qwen-2.5-coder-32b-instruct',
    name: 'Qwen-2.5-Coder-32B-Instruct (FP16)',
    family: 'Qwen 2.5 Coder',
    type: 'coder',
    parameters: '32.5B',
    quantization: 'BF16 Native',
    vramRequirement: '64 GB VRAM (Single H100 or 2x A6000)',
    contextLength: '32,768 tokens',
    endpoint: 'http://10.14.8.51:8000/v1/chat/completions (Local vLLM)',
    status: 'CONNECTED',
    capabilities: [
      'Python Engineering Calculations',
      'API 579 / ASME FFS Math Modeling',
      'Thermodynamic Property Scripts',
      'Data Cleansing & CSV Generation',
      'Sandboxed Unit Test Generation'
    ],
    description: 'Specialized code synthesis model optimized for engineering scripts, numerical stability checks, and verifiable sandbox execution.',
    latencyAvgMs: 440
  },
  {
    id: 'qwen2-vl-7b-instruct',
    name: 'Qwen2-VL-7B-Instruct (Vision-Language)',
    family: 'Qwen2 VL',
    type: 'vision',
    parameters: '7.6B',
    quantization: 'AWQ 4-bit',
    vramRequirement: '16 GB VRAM (Single RTX 4090 / A5000)',
    contextLength: '16,384 tokens',
    endpoint: 'http://10.14.8.52:8000/v1/chat/completions (Local vLLM)',
    status: 'CONNECTED',
    capabilities: [
      'P&ID Tag Extraction',
      'Engineering Drawing Line-Diagram Analysis',
      'Corrosion Pit Visual Inspection',
      'Flange Face Defect Categorization',
      'Gauge & Dial Reading OCR'
    ],
    description: 'Multimodal vision-language model trained on technical schematics, piping & instrumentation diagrams (P&IDs), and plant inspection photography.',
    latencyAvgMs: 610
  },
  {
    id: 'bge-m3-dense-sparse',
    name: 'BAAI/bge-m3 (Dense + Sparse Hybrid Embedding)',
    family: 'BGE Embeddings',
    type: 'embedding',
    parameters: '560M',
    quantization: 'FP16 ONNX Runtime',
    vramRequirement: '4 GB VRAM / CPU Accelerated',
    contextLength: '8,192 tokens',
    endpoint: 'http://10.14.8.53:8000/embed (Local TEI)',
    status: 'CONNECTED',
    capabilities: [
      'Multi-lingual Technical Retrieval',
      'Dense Semantic Search (1024 dim)',
      'Sparse Lexical Matching (BM25 token weights)',
      'Long-context Document Chunking'
    ],
    description: 'State-of-the-art sovereign embedding engine powering PRAGYA local RAG with hybrid dense-lexical ranking for industrial manuals.',
    latencyAvgMs: 45
  },
  {
    id: 'llama-3.3-70b-instruct-gguf',
    name: 'Llama-3.3-70B-Instruct (Q4_K_M GGUF)',
    family: 'Llama 3.3',
    type: 'general',
    parameters: '70B',
    quantization: 'GGUF Q4_K_M',
    vramRequirement: '42 GB VRAM',
    contextLength: '128,000 tokens',
    endpoint: 'http://10.14.8.54:11434/api/generate (Local Ollama)',
    status: 'STANDBY',
    capabilities: [
      'Secondary Fallback Reasoning',
      'English Technical Summarization',
      'Air-gapped Redundancy'
    ],
    description: 'High-speed secondary fallback node configured for high-availability failover in case primary cluster experiences maintenance.',
    latencyAvgMs: 1100
  }
];

export function routeTaskToModel(taskText: string, hasImage: boolean = false, hasCode: boolean = false): {
  selectedModel: ModelInfo;
  detectedCapability: string;
  reason: string;
  candidates: { modelId: string; modelName: string; score: number; fitReason: string; selected: boolean }[];
} {
  const lower = taskText.toLowerCase();

  if (hasImage || lower.includes('drawing') || lower.includes('p&id') || lower.includes('tag') || lower.includes('photo') || lower.includes('visual')) {
    const visionModel = LOCAL_MODELS.find(m => m.type === 'vision') || LOCAL_MODELS[0];
    return {
      selectedModel: visionModel,
      detectedCapability: 'Multimodal Vision & Technical Diagram OCR',
      reason: 'Task requires visual schematic parsing, P&ID symbol detection, or inspection image artifact evaluation.',
      candidates: [
        { modelId: visionModel.id, modelName: visionModel.name, score: 98, fitReason: 'Native vision encoder + spatial token awareness', selected: true },
        { modelId: 'qwen-2.5-72b-instruct-awq', modelName: 'Qwen-2.5-72B', score: 40, fitReason: 'Text only; cannot parse raw image coordinates', selected: false },
        { modelId: 'qwen-2.5-coder-32b-instruct', modelName: 'Qwen-2.5-Coder', score: 25, fitReason: 'Optimized for scripts, no vision backbone', selected: false }
      ]
    };
  }

  if (hasCode || lower.includes('python') || lower.includes('script') || lower.includes('calculation') || lower.includes('calculate') || lower.includes('formula') || lower.includes('math') || lower.includes('fouling factor') || lower.includes('corrosion rate')) {
    const coderModel = LOCAL_MODELS.find(m => m.type === 'coder') || LOCAL_MODELS[0];
    return {
      selectedModel: coderModel,
      detectedCapability: 'Engineering Mathematics & Python Code Generation',
      reason: 'Task involves quantitative engineering calculations, formula validation, or sandboxed script generation.',
      candidates: [
        { modelId: coderModel.id, modelName: coderModel.name, score: 96, fitReason: 'Trained on 5.5T code tokens, high AST syntax adherence', selected: true },
        { modelId: 'qwen-2.5-72b-instruct-awq', modelName: 'Qwen-2.5-72B', score: 84, fitReason: 'Capable of code, but slower latency and larger VRAM footprint', selected: false },
        { modelId: 'llama-3.3-70b-instruct-gguf', modelName: 'Llama-3.3-70B', score: 72, fitReason: 'Standby node, higher inference latency', selected: false }
      ]
    };
  }

  // General industrial reasoning (Golden Demo & SOP comparison)
  const generalModel = LOCAL_MODELS.find(m => m.id === 'qwen-2.5-72b-instruct-awq') || LOCAL_MODELS[0];
  return {
    selectedModel: generalModel,
    detectedCapability: 'Industrial Document Reasoning & SOP Synthesis',
    reason: 'Selected because this model supports 32k context reasoning, zero-shot structured JSON tool-calling, and verified high adherence to enterprise SOP constraints.',
    candidates: [
      { modelId: generalModel.id, modelName: generalModel.name, score: 97, fitReason: 'Largest reasoning capacity, 32k context for multi-page reports', selected: true },
      { modelId: 'qwen-2.5-coder-32b-instruct', modelName: 'Qwen-Coder-32B', score: 76, fitReason: 'Better suited for pure code than nuanced regulatory prose', selected: false },
      { modelId: 'llama-3.3-70b-instruct-gguf', modelName: 'Llama-3.3-70B', score: 81, fitReason: 'Configured as standby fallback node', selected: false }
    ]
  };
}
