import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavigationTab,
  IndustrialTask,
  TaskStatus,
  KnowledgeDocument,
  ModelInfo,
  McpServer,
  AuditEvent,
  GeneratedArtifact,
  FederatedRound,
  ExecutionStep
} from '../types';
import { INITIAL_TASKS } from '../data/sampleTasks';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import { LOCAL_MODELS, routeTaskToModel } from '../data/sampleModels';
import { MCP_SERVERS } from '../data/sampleMcpServers';
import { SAMPLE_AUDIT_LOGS } from '../data/sampleAuditLogs';
import { SAMPLE_ARTIFACTS } from '../data/sampleArtifacts';
import { FEDERATED_ROUNDS } from '../data/sampleFederated';

interface WorkbenchContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  tasks: IndustrialTask[];
  currentTaskId: string;
  currentTask: IndustrialTask | undefined;
  setCurrentTaskId: (id: string) => void;
  createNewTask: (params: {
    title: string;
    description: string;
    category?: IndustrialTask['category'];
    files?: { name: string; size: string; type: string }[];
  }) => string;
  startTaskExecution: (taskId: string) => void;
  approveTask: (taskId: string, comments?: string) => void;
  rejectTask: (taskId: string, reason: string) => void;
  documents: KnowledgeDocument[];
  addDocument: (doc: Omit<KnowledgeDocument, 'id' | 'indexedAt' | 'chunkCount' | 'status'>) => void;
  models: ModelInfo[];
  mcpServers: McpServer[];
  auditLogs: AuditEvent[];
  addAuditLog: (log: Omit<AuditEvent, 'id' | 'timestamp'>) => void;
  artifacts: GeneratedArtifact[];
  addArtifact: (artifact: GeneratedArtifact) => void;
  federatedRounds: FederatedRound[];
  triggerFederatedRound: () => void;
  isAirGapEnforced: boolean;
  setAirGapEnforced: (val: boolean) => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  previewArtifact: GeneratedArtifact | null;
  setPreviewArtifact: (artifact: GeneratedArtifact | null) => void;
  runGoldenDemo: () => void;
  resetAllData: () => void;
}

const WorkbenchContext = createContext<WorkbenchContextType | undefined>(undefined);

export const WorkbenchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('workbench');
  const [tasks, setTasks] = useState<IndustrialTask[]>(INITIAL_TASKS);
  const [currentTaskId, setCurrentTaskId] = useState<string>(INITIAL_TASKS[0].id);
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(SAMPLE_DOCUMENTS);
  const [models] = useState<ModelInfo[]>(LOCAL_MODELS);
  const [mcpServers, setMcpServers] = useState<McpServer[]>(MCP_SERVERS);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(SAMPLE_AUDIT_LOGS);
  const [artifacts, setArtifacts] = useState<GeneratedArtifact[]>(SAMPLE_ARTIFACTS);
  const [federatedRounds, setFederatedRounds] = useState<FederatedRound[]>(FEDERATED_ROUNDS);
  const [isAirGapEnforced, setAirGapEnforced] = useState<boolean>(true);
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [previewArtifact, setPreviewArtifact] = useState<GeneratedArtifact | null>(null);

  const currentTask = tasks.find(t => t.id === currentTaskId) || tasks[0];

  const addAuditLog = (log: Omit<AuditEvent, 'id' | 'timestamp'>) => {
    const newEntry: AuditEvent = {
      id: `AUD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      clientIp: '10.14.8.10',
      ...log,
      sovereignBoundaryVerified: log.sovereignBoundaryVerified ?? isAirGapEnforced
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const addDocument = (docData: Omit<KnowledgeDocument, 'id' | 'indexedAt' | 'chunkCount' | 'status'>) => {
    const id = `DOC-USER-${Math.floor(100 + Math.random() * 900)}`;
    const newDoc: KnowledgeDocument = {
      id,
      indexedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      chunkCount: Math.max(12, docData.pageCount * 3),
      status: 'INDEXED',
      ...docData,
      chunks: [
        {
          id: `${id}-c1`,
          page: 1,
          text: `Extracted text excerpt from uploaded asset [${docData.title}]. Verified compliance against refinery engineering standards.`,
          embeddingPreview: [0.12, -0.44, 0.61, 0.22, -0.05, 0.18]
        }
      ]
    };
    setDocuments(prev => [newDoc, ...prev]);
    addAuditLog({
      actor: 'PRAGYA Local Document Ingestion Engine',
      action: 'DOCUMENT_PARSED_AND_INDEXED',
      category: 'RAG_RETRIEVAL',
      status: 'SUCCESS',
      details: `Indexed "${docData.title}" (${docData.pageCount} pages). Chunks: ${newDoc.chunkCount}. Vector embeddings generated locally via BGE-M3.`,
      clientIp: '10.14.8.10'
    });
  };

  const addArtifact = (newArt: GeneratedArtifact) => {
    setArtifacts(prev => [newArt, ...prev]);
  };

  const createNewTask = (params: {
    title: string;
    description: string;
    category?: IndustrialTask['category'];
    files?: { name: string; size: string; type: string }[];
  }): string => {
    const taskId = `TSK-MRPL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const category = params.category || 'INSPECTION';

    const hasImage = params.files?.some(f => f.name.endsWith('.png') || f.name.endsWith('.jpg') || f.name.endsWith('.svg')) || false;
    const hasCode = params.description.toLowerCase().includes('python') || params.description.toLowerCase().includes('calc');

    const routing = routeTaskToModel(params.description, hasImage, hasCode);

    const initialSteps: ExecutionStep[] = [
      {
        id: `s-${taskId}-1`,
        name: 'Task Ingestion & Classification',
        stage: 'CLASSIFYING',
        status: 'pending',
        summary: 'Classifying intent and security boundaries...'
      },
      {
        id: `s-${taskId}-2`,
        name: 'Sovereign Model Routing',
        stage: 'ROUTING',
        status: 'pending',
        summary: 'Evaluating candidate local LLMs on on-premise cluster...'
      },
      {
        id: `s-${taskId}-3`,
        name: 'Agentic Plan Generation',
        stage: 'PLANNING',
        status: 'pending',
        summary: 'Formulating tool execution graph...'
      },
      {
        id: `s-${taskId}-4`,
        name: 'Tool Execution & Knowledge Retrieval',
        stage: 'EXECUTING',
        status: 'pending',
        summary: 'Accessing local knowledge and executing MCP adapters...'
      },
      {
        id: `s-${taskId}-5`,
        name: 'Multi-Criteria Grounding Verification',
        stage: 'VERIFYING',
        status: 'pending',
        summary: 'Validating citations and sanity-checking claims...'
      },
      {
        id: `s-${taskId}-6`,
        name: 'Human-in-the-Loop Sign-Off',
        stage: 'AWAITING_APPROVAL',
        status: 'pending',
        summary: 'Waiting for engineer authorization...'
      }
    ];

    const newTask: IndustrialTask = {
      id: taskId,
      title: params.title,
      description: params.description,
      category,
      status: 'CREATED',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'K. S. Rao (Lead Maintenance Metallurgist, MRPL)',
      plantUnit: 'Diesel Hydrodesulfurization (DHDS-2)',
      selectedModel: routing.selectedModel.id,
      attachedFiles: params.files || [],
      riskLevel: category === 'INSPECTION' || category === 'MAINTENANCE_SOP' ? 'HIGH' : 'MEDIUM',
      routingTrace: {
        task: params.title,
        detectedCapability: routing.detectedCapability,
        candidateModels: routing.candidates,
        selectedModelId: routing.selectedModel.id,
        selectedModelName: routing.selectedModel.name,
        routingReason: routing.reason,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
      },
      steps: initialSteps,
      approvalState: {
        status: 'PENDING'
      }
    };

    setTasks(prev => [newTask, ...prev]);
    setCurrentTaskId(taskId);
    addAuditLog({
      taskId,
      actor: 'PRAGYA Task Orchestrator',
      action: 'TASK_CREATED',
      category: 'POLICY_GATEWAY',
      status: 'SUCCESS',
      details: `Initialized task "${params.title}" with category ${category}. Attached files: ${params.files?.length || 0}.`,
      clientIp: '10.14.8.10'
    });

    return taskId;
  };

  const startTaskExecution = (taskId: string) => {
    // Progressive state machine simulator
    const updateTaskStatus = (stage: TaskStatus, stepIndex: number, summaryText: string, extraUpdates: Partial<IndustrialTask> = {}) => {
      setTasks(prev =>
        prev.map(t => {
          if (t.id !== taskId) return t;

          const updatedSteps = t.steps.map((st, idx) => {
            if (idx < stepIndex) return { ...st, status: 'completed' as const };
            if (idx === stepIndex) {
              return {
                ...st,
                status: 'running' as const,
                timestamp: new Date().toTimeString().substring(0, 8),
                summary: summaryText
              };
            }
            return st;
          });

          return {
            ...t,
            status: stage,
            updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
            steps: updatedSteps,
            ...extraUpdates
          };
        })
      );
    };

    // Step 1: Classifying (300ms)
    setTimeout(() => {
      updateTaskStatus('CLASSIFYING', 0, 'Classifying task intent: Industrial Document Inspection & Regulatory Comparison.');
      addAuditLog({
        taskId,
        actor: 'Intent Classifier',
        action: 'TASK_CLASSIFICATION',
        category: 'MODEL_INFERENCE',
        status: 'SUCCESS',
        details: 'Classified task complexity: Multi-document cross-reference with strict zero-hallucination verification requirement.',
        clientIp: '10.14.8.50'
      });
    }, 400);

    // Step 2: Routing (1100ms)
    setTimeout(() => {
      updateTaskStatus('ROUTING', 1, 'Selecting model: Qwen-2.5-72B-Instruct on local vLLM cluster.');
      addAuditLog({
        taskId,
        actor: 'Sovereign Model Router',
        action: 'MODEL_ROUTED',
        category: 'MODEL_INFERENCE',
        status: 'SUCCESS',
        details: 'Routed to Qwen-2.5-72B (local vLLM instance at 10.14.8.50). VRAM: 48GB allocated. Air-gap confirmed.',
        clientIp: '10.14.8.50'
      });
    }, 1200);

    // Step 3: Planning (2200ms)
    setTimeout(() => {
      updateTaskStatus('PLANNING', 2, 'Constructing 4-step execution DAG with policy checkpoints.');
      addAuditLog({
        taskId,
        actor: 'Agent Planner (Qwen-2.5-72B)',
        action: 'EXECUTION_PLAN_GENERATED',
        category: 'MODEL_INFERENCE',
        status: 'SUCCESS',
        details: 'Generated execution graph: 1. OCR parse NDT metrics -> 2. Local RAG lookup on SOP-2401 -> 3. Compare thickness tolerances -> 4. Call mcp-fileops to draft DOCX.',
        clientIp: '10.14.8.50'
      });
    }, 2200);

    // Step 4: Executing (3400ms)
    setTimeout(() => {
      const sampleRetrieved = [
        {
          sourceDoc: 'MRPL-INSP-2026-DHDS-041.pdf',
          page: 7,
          section: 'Summary of Ultrasonic Gauging',
          similarityScore: 0.94,
          excerpt: 'Shell Ring #3 circumferential band at 270° azimuth measured at 77.8 mm wall thickness (baseline nominal: 82.5 mm). Total thinning is 4.7 mm.',
          verified: true
        },
        {
          sourceDoc: 'MRPL-SOP-MNT-2401.pdf',
          page: 14,
          section: 'Section 4.3.2 Permissible Wall Thinning',
          similarityScore: 0.92,
          excerpt: 'If localized ultrasonic thickness measurement indicates wall thinning exceeding 4.2 mm (measured thickness < 78.3 mm), an immediate Level 2 Fitness-for-Service evaluation is mandatory.',
          verified: true
        }
      ];

      const sampleMcp = [
        {
          server: 'mcp-docsearch',
          tool: 'search_sops',
          params: { query: 'wall thinning DHDS reactor R-02', unit_filter: 'DHDS' },
          status: 'PERMITTED' as const,
          durationMs: 120,
          outputSummary: 'Found 2 matching SOP clauses with 0.94 semantic similarity.'
        },
        {
          server: 'mcp-fileops',
          tool: 'generate_docx_artifact',
          params: { template_id: 'MRPL_APPROVAL_NOTE_V3' },
          status: 'PERMITTED' as const,
          durationMs: 310,
          outputSummary: 'Drafted Technical Approval Note DOCX in local memory.'
        }
      ];

      updateTaskStatus('EXECUTING', 3, 'Executing tool calls via Model Context Protocol (MCP) gateway...', {
        retrievedEvidence: sampleRetrieved,
        mcpCalls: sampleMcp
      });

      addAuditLog({
        taskId,
        actor: 'mcp-docsearch / search_sops',
        action: 'MCP_TOOL_EXECUTION',
        category: 'MCP_TOOL',
        status: 'SUCCESS',
        details: 'Invoked search_sops with query "wall thinning DHDS reactor R-02". Policy gateway validated permission.',
        clientIp: '10.14.8.53'
      });
    }, 3400);

    // Step 5: Verifying (4800ms)
    setTimeout(() => {
      const verifications = [
        {
          id: 'v-1',
          label: 'Factual Citation Grounding',
          status: 'passed' as const,
          score: 99.4,
          description: 'All quantitative findings mapped to exact page coordinates in SOP-2401 and NDT Report.',
          evidenceRef: 'SOP-2401 p.14, NDT-041 p.7'
        },
        {
          id: 'v-2',
          label: 'Mathematical Sanity Check',
          status: 'passed' as const,
          score: 100,
          description: 'Calculated wall thinning 4.7 mm (82.5 - 77.8 mm) correctly exceeds SOP limit of 4.2 mm.',
          evidenceRef: 'Delta = +0.5 mm beyond threshold'
        },
        {
          id: 'v-3',
          label: 'Sovereign Boundary Check',
          status: 'passed' as const,
          score: 100,
          description: 'Zero external HTTP/DNS egress requests detected during entire pipeline.',
          evidenceRef: 'Air-gap Firewall eBPF Verifier'
        }
      ];

      updateTaskStatus('VERIFYING', 4, 'Running multi-criteria grounding & hallucination verification...', {
        verificationChecks: verifications
      });

      addAuditLog({
        taskId,
        actor: 'Verification Engine',
        action: 'VERIFICATION_PASSED',
        category: 'POLICY_GATEWAY',
        status: 'SUCCESS',
        details: 'Automated sanity check completed: 3/3 checks passed with 100% boundary integrity.',
        clientIp: '10.14.8.10'
      });
    }, 4800);

    // Step 6: Awaiting Approval (6000ms)
    setTimeout(() => {
      const approvalNote = {
        subject: 'TECHNICAL APPROVAL NOTE: Turnaround Inspection Findings & Mandatory Repairs for DHDS Reactor R-02',
        findings: [
          'Shell Ring #3 thickness measured at 77.8 mm (nominal: 82.5 mm). Thinning of 4.7 mm exceeds SOP-2401 screening limit of 4.2 mm.',
          'Nozzle N-04 inlet quench weld toe exhibits 3.2 mm micro-fissuring requiring dye penetrant mapping and gouge-and-weld restoration.',
          'Mandates Level 2 Fitness-For-Service (FFS) evaluation per API 579-1 prior to high-pressure restart.'
        ],
        recommendedAction: 'Approve execution of weld overlay repair on Nozzle N-04 and authorize temporary operational pressure derating to 125 kg/cm² pending Level 2 FFS completion.',
        signOffRequiredFrom: 'Deputy General Manager (Inspection & Materials), MRPL',
        complianceStatus: 'NON-CONFORMANCE FLAGGED — SIGN-OFF REQUIRED'
      };

      setTasks(prev =>
        prev.map(t => {
          if (t.id !== taskId) return t;

          const completedSteps = t.steps.map((st, idx) => {
            if (idx <= 4) return { ...st, status: 'completed' as const };
            if (idx === 5) {
              return {
                ...st,
                status: 'pending' as const,
                timestamp: new Date().toTimeString().substring(0, 8),
                summary: 'Action required: Review findings and sign off on Approval Note.'
              };
            }
            return st;
          });

          return {
            ...t,
            status: 'AWAITING_APPROVAL',
            approvalNote,
            steps: completedSteps,
            generatedArtifactId: 'ART-MRPL-2026-001'
          };
        })
      );

      addAuditLog({
        taskId,
        actor: 'Human-in-the-Loop Gateway',
        action: 'AWAITING_HUMAN_APPROVAL',
        category: 'APPROVAL',
        status: 'REVIEW_REQUIRED',
        details: 'Task paused. Sensitive industrial engineering decision requires explicit human authorization.',
        clientIp: '10.14.8.10'
      });
    }, 6000);
  };

  const approveTask = (taskId: string, comments: string = 'Approved following physical NDT verification and metallurgical review.') => {
    const reviewer = 'K. S. Rao (Lead Maintenance Metallurgist, MRPL)';
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setTasks(prev =>
      prev.map(t => {
        if (t.id !== taskId) return t;
        const finalSteps = t.steps.map(s => ({ ...s, status: 'completed' as const }));
        return {
          ...t,
          status: 'COMPLETED',
          updatedAt: timestamp,
          steps: finalSteps,
          approvalState: {
            status: 'APPROVED',
            reviewedBy: reviewer,
            timestamp,
            comments
          }
        };
      })
    );

    // Also update related artifact status
    setArtifacts(prev =>
      prev.map(a => {
        if (a.taskId === taskId) {
          return { ...a, approvalStatus: 'APPROVED' };
        }
        return a;
      })
    );

    addAuditLog({
      taskId,
      actor: reviewer,
      action: 'HUMAN_APPROVAL_GRANTED',
      category: 'APPROVAL',
      status: 'SUCCESS',
      details: `Sign-off granted by ${reviewer}. Comments: "${comments}". Task transitioned to COMPLETED.`,
      clientIp: '10.14.8.12'
    });
  };

  const rejectTask = (taskId: string, reason: string) => {
    const reviewer = 'K. S. Rao (Lead Maintenance Metallurgist, MRPL)';
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setTasks(prev =>
      prev.map(t => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          status: 'FAILED',
          updatedAt: timestamp,
          approvalState: {
            status: 'REJECTED',
            reviewedBy: reviewer,
            timestamp,
            comments: `Rejected: ${reason}`
          }
        };
      })
    );

    setArtifacts(prev =>
      prev.map(a => {
        if (a.taskId === taskId) {
          return { ...a, approvalStatus: 'REJECTED' };
        }
        return a;
      })
    );

    addAuditLog({
      taskId,
      actor: reviewer,
      action: 'HUMAN_APPROVAL_REJECTED',
      category: 'APPROVAL',
      status: 'DENIED',
      details: `Sign-off rejected by ${reviewer}. Reason: "${reason}". Task terminated.`,
      clientIp: '10.14.8.12'
    });
  };

  const triggerFederatedRound = () => {
    const newRoundNum = federatedRounds.length + 1;
    const newRound: FederatedRound = {
      roundNumber: newRoundNum,
      status: 'RUNNING',
      startedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      globalLoss: 0.165,
      accuracyDelta: '+1.9% on Refinery Asset Defect Classification',
      participatingNodes: 3,
      differentialPrivacyBudget: 'ε = 1.15, δ = 1e-5',
      aggregationMethod: 'FedAvg with Secure MPC Aggregation'
    };

    setFederatedRounds(prev => [newRound, ...prev]);

    addAuditLog({
      actor: 'Federated Learning Coordinator (Flower)',
      action: 'FEDERATED_ROUND_STARTED',
      category: 'MODEL_INFERENCE',
      status: 'SUCCESS',
      details: `Started Round #${newRoundNum} across 3 participating refineries (MRPL, CPCL, IOCL). Raw data remains on-premise at each site.`,
      clientIp: '10.14.8.60'
    });

    setTimeout(() => {
      setFederatedRounds(prev =>
        prev.map(r =>
          r.roundNumber === newRoundNum
            ? { ...r, status: 'COMPLETED', completedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) }
            : r
        )
      );
      addAuditLog({
        actor: 'Federated Learning Coordinator (Flower)',
        action: 'FEDERATED_ROUND_COMPLETED',
        category: 'MODEL_INFERENCE',
        status: 'SUCCESS',
        details: `Round #${newRoundNum} completed successfully. Global weights updated and certified under differential privacy budget.`,
        clientIp: '10.14.8.60'
      });
    }, 3500);
  };

  const runGoldenDemo = () => {
    setActiveTab('workbench');
    setCurrentTaskId(INITIAL_TASKS[0].id);
    startTaskExecution(INITIAL_TASKS[0].id);
  };

  const resetAllData = () => {
    setTasks(INITIAL_TASKS);
    setCurrentTaskId(INITIAL_TASKS[0].id);
    setDocuments(SAMPLE_DOCUMENTS);
    setAuditLogs(SAMPLE_AUDIT_LOGS);
    setArtifacts(SAMPLE_ARTIFACTS);
    setFederatedRounds(FEDERATED_ROUNDS);
    setAirGapEnforced(true);
    setDemoMode(true);
  };

  return (
    <WorkbenchContext.Provider
      value={{
        activeTab,
        setActiveTab,
        tasks,
        currentTaskId,
        currentTask,
        setCurrentTaskId,
        createNewTask,
        startTaskExecution,
        approveTask,
        rejectTask,
        documents,
        addDocument,
        models,
        mcpServers,
        auditLogs,
        addAuditLog,
        artifacts,
        addArtifact,
        federatedRounds,
        triggerFederatedRound,
        isAirGapEnforced,
        setAirGapEnforced,
        demoMode,
        setDemoMode,
        previewArtifact,
        setPreviewArtifact,
        runGoldenDemo,
        resetAllData
      }}
    >
      {children}
    </WorkbenchContext.Provider>
  );
};

export const useWorkbench = () => {
  const context = useContext(WorkbenchContext);
  if (!context) {
    throw new Error('useWorkbench must be used within a WorkbenchProvider');
  }
  return context;
};
