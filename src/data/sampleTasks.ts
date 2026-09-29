import { IndustrialTask } from '../types';

export const INITIAL_TASKS: IndustrialTask[] = [
  {
    id: 'TSK-MRPL-2026-0891',
    title: 'Analyze DHDS Turnaround Inspection Report & Synthesize SOP Approval Note',
    description: 'Analyze uploaded NDT inspection report MRPL-INSP-2026-DHDS-041 for Reactor R-02, compare ultrasonic wall thinning and nozzle N-04 cracks against SOP-2401, verify API 579 screening criteria, and generate a formal executive Approval Note.',
    category: 'INSPECTION',
    status: 'AWAITING_APPROVAL',
    createdAt: '2026-09-23 09:20:11',
    updatedAt: '2026-09-23 09:21:42',
    user: 'K. S. Rao (Lead Maintenance Metallurgist, MRPL)',
    plantUnit: 'Diesel Hydrodesulfurization (DHDS-2)',
    selectedModel: 'qwen-2.5-72b-instruct-awq',
    attachedFiles: [
      {
        name: 'MRPL-INSP-2026-DHDS-041.pdf',
        size: '12.4 MB',
        type: 'application/pdf'
      },
      {
        name: 'MRPL-SOP-MNT-2401-Excerpt.pdf',
        size: '1.2 MB',
        type: 'application/pdf'
      }
    ],
    riskLevel: 'HIGH',
    routingTrace: {
      task: 'Analyze DHDS Turnaround Inspection Report & Synthesize SOP Approval Note',
      detectedCapability: 'Industrial Document Reasoning & SOP Synthesis',
      selectedModelId: 'qwen-2.5-72b-instruct-awq',
      selectedModelName: 'Qwen-2.5-72B-Instruct (AWQ 4-bit)',
      routingReason: 'Task requires complex multi-page NDT report cross-referencing against safety threshold SOPs and formal executive artifact synthesis with strict zero-hallucination verification.',
      timestamp: '2026-09-23 09:20:13',
      candidateModels: [
        { modelId: 'qwen-2.5-72b-instruct-awq', modelName: 'Qwen-2.5-72B-Instruct', score: 98, fitReason: 'Highest context capacity (32k), excels at regulatory compliance synthesis', selected: true },
        { modelId: 'qwen-2.5-coder-32b-instruct', modelName: 'Qwen-2.5-Coder-32B', score: 72, fitReason: 'Coder model; secondary fit for prose synthesis', selected: false },
        { modelId: 'qwen2-vl-7b-instruct', modelName: 'Qwen2-VL-7B', score: 65, fitReason: 'Vision capability not strictly required as text already OCR-indexed', selected: false }
      ]
    },
    steps: [
      {
        id: 'stp-1',
        name: 'Task Classification',
        stage: 'CLASSIFYING',
        status: 'completed',
        timestamp: '09:20:12',
        durationMs: 420,
        modelOrTool: 'PRAGYA Intent Classifier',
        summary: 'Classified as Critical Equipment Inspection & Compliance Workflow.',
        details: 'Identified entity target: Reactor R-02; Input documents: NDT Inspection Report + Maintenance SOP.'
      },
      {
        id: 'stp-2',
        name: 'Dynamic Model Routing',
        stage: 'ROUTING',
        status: 'completed',
        timestamp: '09:20:13',
        durationMs: 310,
        modelOrTool: 'Sovereign Router',
        summary: 'Selected Qwen-2.5-72B-Instruct on local vLLM cluster.',
        details: 'Evaluated latency vs reasoning depth; assigned to Node 10.14.8.50 with strict air-gap boundary.'
      },
      {
        id: 'stp-3',
        name: 'Agentic Plan Construction',
        stage: 'PLANNING',
        status: 'completed',
        timestamp: '09:20:15',
        durationMs: 680,
        modelOrTool: 'Qwen-2.5-72B-Instruct',
        summary: 'Formulated 4-step execution DAG with safety checkpoints.',
        details: '1. Ingest NDT findings via mcp-fileops; 2. Retrieve SOP limits via mcp-docsearch; 3. Compare thickness & nozzle defects; 4. Call mcp-fileops generate_docx_artifact.'
      },
      {
        id: 'stp-4',
        name: 'Local Knowledge Retrieval & Tool Calls',
        stage: 'EXECUTING',
        status: 'completed',
        timestamp: '09:20:25',
        durationMs: 1420,
        modelOrTool: 'mcp-docsearch / search_sops',
        summary: 'Retrieved 3 grounded chunks from SOP-2401 (similarity 0.91) and parsed NDT metrics.',
        details: 'Extracted Wall Thinning: 4.7 mm (measured 77.8 mm vs nominal 82.5 mm); SOP Limit: 4.2 mm; Nozzle N-04 HAZ fissure: 3.2 mm.'
      },
      {
        id: 'stp-5',
        name: 'Policy Gateway Validation & Artifact Generation',
        stage: 'EXECUTING',
        status: 'completed',
        timestamp: '09:20:38',
        durationMs: 980,
        modelOrTool: 'mcp-fileops / generate_docx_artifact',
        summary: 'Policy Gateway approved tool call. Generated MRPL_DHDS_Reactor_Inspection_Approval_Note.docx.',
        details: 'All parameters validated against schema; cryptographic SHA-256 seal assigned.'
      },
      {
        id: 'stp-6',
        name: 'Multi-Criteria Grounding Verification',
        stage: 'VERIFYING',
        status: 'completed',
        timestamp: '09:20:42',
        durationMs: 540,
        modelOrTool: 'PRAGYA Verification Engine',
        summary: '4/4 Verification assertions PASSED with 0 hallucination indicators.',
        details: 'Verified against source document page numbers; citation grounding score: 99.2%.'
      },
      {
        id: 'stp-7',
        name: 'Human Review & Sign-Off Gate',
        stage: 'AWAITING_APPROVAL',
        status: 'pending',
        timestamp: '09:20:43',
        durationMs: 0,
        modelOrTool: 'Human-in-the-Loop Gateway',
        summary: 'Awaiting formal counter-signature from DGM (Inspection) or Lead Metallurgist.',
        details: 'High-risk asset action flagged due to required Level 2 FFS engineering calculation and weld repair.'
      }
    ],
    retrievedEvidence: [
      {
        sourceDoc: 'MRPL-INSP-2026-DHDS-041.pdf',
        page: 7,
        section: 'Summary of Ultrasonic Gauging',
        similarityScore: 0.94,
        excerpt: 'Shell Ring #3 circumferential band at 270° azimuth measured at 77.8 mm wall thickness (baseline nominal: 82.5 mm; corrosion allowance original: 6.0 mm). Total thinning is 4.7 mm.',
        verified: true
      },
      {
        sourceDoc: 'MRPL-SOP-MNT-2401.pdf',
        page: 14,
        section: 'Section 4.3.2 Permissible Wall Thinning',
        similarityScore: 0.92,
        excerpt: 'If localized ultrasonic thickness measurement indicates wall thinning exceeding 4.2 mm (measured thickness < 78.3 mm), an immediate Level 2 Fitness-for-Service (FFS) evaluation per API 579-1/ASME FFS-1 is mandatory.',
        verified: true
      },
      {
        sourceDoc: 'MRPL-INSP-2026-DHDS-041.pdf',
        page: 11,
        section: 'Nozzle N-04 Examination',
        similarityScore: 0.89,
        excerpt: 'Visual and dye penetrant testing revealed radial micro-fissuring along the weld toe heat-affected zone measuring 3.2 mm length, depth estimated at 0.6 mm.',
        verified: true
      },
      {
        sourceDoc: 'MRPL-SOP-MNT-2401.pdf',
        page: 29,
        section: 'Section 8.4 Approval Note Workflow',
        similarityScore: 0.88,
        excerpt: 'Any NDT finding indicating surface crack indications on nozzle N-04 welds requires a formal Approval Note counter-signed by the Deputy General Manager (Inspection).',
        verified: true
      }
    ],
    mcpCalls: [
      {
        server: 'mcp-docsearch',
        tool: 'search_sops',
        params: { query: 'permissible wall thinning DHDS reactor R-02', unit_filter: 'DHDS', top_k: 3 },
        status: 'PERMITTED',
        durationMs: 145,
        outputSummary: 'Found 3 chunks from SOP-2401 with >0.88 similarity scores.'
      },
      {
        server: 'mcp-fileops',
        tool: 'generate_docx_artifact',
        params: {
          template_id: 'MRPL_APPROVAL_NOTE_V3',
          metadata: { asset: 'Reactor R-02', unit: 'DHDS-2', risk: 'HIGH' },
          findings: ['Wall thinning 4.7mm exceeds 4.2mm SOP threshold', 'Nozzle N-04 HAZ micro-fissure requires weld overlay repair']
        },
        status: 'PERMITTED',
        durationMs: 380,
        outputSummary: 'Successfully created artifact ART-MRPL-2026-001 (DOCX, 48.2 KB).'
      },
      {
        server: 'mcp-fileops',
        tool: 'archive_audit_record',
        params: { task_id: 'TSK-MRPL-2026-0891', action_summary: 'Generated approval note for R-02 NDT inspection' },
        status: 'PERMITTED',
        durationMs: 82,
        outputSummary: 'SHA256 entry written to local immutable audit journal.'
      }
    ],
    verificationChecks: [
      {
        id: 'chk-1',
        label: 'Source Citation Grounding',
        status: 'passed',
        score: 99.2,
        description: 'All 4 critical engineering claims directly mapped to explicit page and section citations.',
        evidenceRef: 'MRPL-INSP-2026-DHDS-041 p.7, p.11; SOP-2401 p.14, p.29'
      },
      {
        id: 'chk-2',
        label: 'Mathematical & Threshold Accuracy',
        status: 'passed',
        score: 100,
        description: 'Calculated thinning (82.5 - 77.8 = 4.7 mm) accurately exceeds 4.2 mm limit. Delta: +0.5 mm beyond threshold.',
        evidenceRef: 'SOP-2401 Sec 4.3.2'
      },
      {
        id: 'chk-3',
        label: 'Policy Gateway Authorization',
        status: 'passed',
        score: 100,
        description: 'No outbound external network calls attempted. All MCP executions restricted to local sandbox.',
        evidenceRef: 'Air-gap Sovereign Perimeter Check'
      },
      {
        id: 'chk-4',
        label: 'Mandatory Governance Compliance',
        status: 'passed',
        score: 98.5,
        description: 'Requires DGM (Inspection) and Lead Materials Metallurgist counter-signatures per Section 8.4.',
        evidenceRef: 'SOP-2401 Sec 8.4'
      }
    ],
    generatedArtifactId: 'ART-MRPL-2026-001',
    approvalNote: {
      subject: 'TECHNICAL APPROVAL NOTE: Turnaround Inspection Findings & Mandatory Repairs for DHDS Reactor R-02',
      findings: [
        'Shell Ring #3 thickness measured at 77.8 mm (nominal: 82.5 mm). Thinning of 4.7 mm exceeds SOP-2401 screening limit of 4.2 mm.',
        'Nozzle N-04 inlet quench weld toe exhibits 3.2 mm micro-fissuring requiring dye penetrant mapping and gouge-and-weld restoration.',
        'Immediate Level 2 Fitness-For-Service (FFS) calculation per API 579-1 required before recommissioning pressurized hydrogen loop.'
      ],
      recommendedAction: 'Approve execution of weld overlay repair on Nozzle N-04 and authorize temporary operational pressure derating to 118 kg/cm² pending Level 2 FFS completion.',
      signOffRequiredFrom: 'Deputy General Manager (Inspection & Materials), MRPL',
      complianceStatus: 'NON-CONFORMANCE FLAGGED — APPROVAL REQUIRED'
    },
    approvalState: {
      status: 'PENDING'
    }
  },
  {
    id: 'TSK-MRPL-2026-0892',
    title: 'Thermodynamic Fouling Resistance Calculation for Heat Exchanger E-102A',
    description: 'Write, policy-check, and execute Python calculation for shell & tube preheat exchanger E-102A LMTD and dirty overall heat transfer coefficient U_dirty.',
    category: 'CALCULATION',
    status: 'COMPLETED',
    createdAt: '2026-09-22 14:10:00',
    updatedAt: '2026-09-22 14:11:15',
    user: 'M. Anand (Process Safety Engineer, MRPL)',
    plantUnit: 'Crude Distillation Unit (CDU-1)',
    selectedModel: 'qwen-2.5-coder-32b-instruct',
    riskLevel: 'LOW',
    steps: [
      {
        id: 's-1',
        name: 'Task Classification',
        stage: 'CLASSIFYING',
        status: 'completed',
        summary: 'Classified as Engineering Numerical Calculation.'
      },
      {
        id: 's-2',
        name: 'Dynamic Model Routing',
        stage: 'ROUTING',
        status: 'completed',
        summary: 'Routed to Qwen-2.5-Coder-32B on Node 10.14.8.51.'
      },
      {
        id: 's-3',
        name: 'Sandboxed Python Execution',
        stage: 'EXECUTING',
        status: 'completed',
        summary: 'AST policy validated. Executed in gVisor container in 142ms.'
      },
      {
        id: 's-4',
        name: 'Verification & Output',
        stage: 'VERIFYING',
        status: 'completed',
        summary: 'LMTD = 48.3 °C, U_dirty = 342.1 W/m²·K. Result within thermodynamic sanity bounds.'
      }
    ],
    generatedArtifactId: 'ART-MRPL-2026-002',
    approvalState: {
      status: 'APPROVED',
      reviewedBy: 'M. Anand',
      timestamp: '2026-09-22 14:11:30',
      comments: 'Calculations verified against Aspen HYSYS baseline model.'
    }
  },
  {
    id: 'TSK-MRPL-2026-0893',
    title: 'Crude Unit P&ID Instrumentation Tag Extraction from Drawing CRU-301',
    description: 'Multimodal vision parsing of piping & instrumentation diagram to extract all transmitter tags, control valves, and safety interlocks for CDU Column 1.',
    category: 'PID_VISION',
    status: 'COMPLETED',
    createdAt: '2026-09-21 16:30:00',
    updatedAt: '2026-09-21 16:32:00',
    user: 'S. Nambiar (Instrumentation & Controls Lead)',
    plantUnit: 'Atmospheric Distillation Unit (CDU-1)',
    selectedModel: 'qwen2-vl-7b-instruct',
    riskLevel: 'LOW',
    steps: [
      {
        id: 'p-1',
        name: 'Multimodal Vision Parsing',
        stage: 'EXECUTING',
        status: 'completed',
        summary: 'Identified 38 instrument bubbles (PT, TT, FT, LCV) with 99.4% OCR confidence.'
      }
    ],
    generatedArtifactId: 'ART-MRPL-2026-004',
    approvalState: {
      status: 'APPROVED',
      reviewedBy: 'S. Nambiar',
      timestamp: '2026-09-21 16:35:00',
      comments: 'Extracted JSON inventory matches plant P&ID database.'
    }
  }
];
