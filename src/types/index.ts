export type NavigationTab =
  | 'overview'
  | 'docs'
  | 'workbench'
  | 'knowledge'
  | 'models'
  | 'mcp'
  | 'sandbox'
  | 'federated'
  | 'approvals'
  | 'audit'
  | 'artifacts'
  | 'settings';

export type TaskStatus =
  | 'CREATED'
  | 'CLASSIFYING'
  | 'ROUTING'
  | 'PLANNING'
  | 'EXECUTING'
  | 'VERIFYING'
  | 'AWAITING_APPROVAL'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED'
  | 'POLICY_DENIED';

export type ModelType = 'general' | 'coder' | 'vision' | 'embedding';
export type ModelStatus = 'CONNECTED' | 'LOCAL' | 'MOCK' | 'UNAVAILABLE' | 'STANDBY';

export interface ModelInfo {
  id: string;
  name: string;
  family: string;
  type: ModelType;
  parameters: string;
  quantization: string;
  vramRequirement: string;
  contextLength: string;
  endpoint: string;
  status: ModelStatus;
  isDefault?: boolean;
  capabilities: string[];
  description: string;
  latencyAvgMs: number;
}

export interface RoutingTrace {
  task: string;
  detectedCapability: string;
  candidateModels: {
    modelId: string;
    modelName: string;
    score: number;
    fitReason: string;
    selected: boolean;
  }[];
  selectedModelId: string;
  selectedModelName: string;
  routingReason: string;
  timestamp: string;
}

export interface ExecutionStep {
  id: string;
  name: string;
  stage: TaskStatus;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'denied';
  timestamp?: string;
  durationMs?: number;
  modelOrTool?: string;
  summary: string;
  details?: string;
  payload?: any;
  result?: any;
}

export interface VerificationCheck {
  id: string;
  label: string;
  status: 'passed' | 'warning' | 'failed' | 'pending';
  score?: number;
  description: string;
  evidenceRef?: string;
}

export interface IndustrialTask {
  id: string;
  title: string;
  description: string;
  category: 'INSPECTION' | 'MAINTENANCE_SOP' | 'CALCULATION' | 'PID_VISION' | 'KNOWLEDGE_SEARCH' | 'CUSTOM';
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  user: string;
  plantUnit: string;
  selectedModel?: string;
  attachedFiles?: {
    name: string;
    size: string;
    type: string;
    previewUrl?: string;
  }[];
  steps: ExecutionStep[];
  routingTrace?: RoutingTrace;
  retrievedEvidence?: {
    sourceDoc: string;
    page: number;
    section: string;
    similarityScore: number;
    excerpt: string;
    verified: boolean;
  }[];
  mcpCalls?: {
    server: string;
    tool: string;
    params: Record<string, any>;
    status: 'PERMITTED' | 'BLOCKED' | 'FAILED';
    durationMs: number;
    outputSummary: string;
  }[];
  verificationChecks?: VerificationCheck[];
  generatedArtifactId?: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  approvalNote?: {
    subject: string;
    findings: string[];
    recommendedAction: string;
    signOffRequiredFrom: string;
    complianceStatus: string;
  };
  approvalState?: {
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    reviewedBy?: string;
    timestamp?: string;
    comments?: string;
  };
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'SOP' | 'INSPECTION_REPORT' | 'EQUIPMENT_MANUAL' | 'SAFETY_STANDARD' | 'REGULATORY';
  format: 'PDF' | 'DOCX' | 'TXT';
  size: string;
  pageCount: number;
  chunkCount: number;
  indexedAt: string;
  sourceUnit: string;
  clearanceLevel: 'RESTRICTED' | 'CONFIDENTIAL' | 'INTERNAL';
  status: 'INDEXED' | 'PROCESSING' | 'FAILED';
  summary: string;
  tags: string[];
  chunks?: {
    id: string;
    page: number;
    text: string;
    embeddingPreview: number[];
  }[];
}

export interface McpToolDefinition {
  name: string;
  description: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  policyAllowed: boolean;
  parameters: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
  invocationsCount: number;
  lastUsed?: string;
}

export interface McpServer {
  id: string;
  name: string;
  description: string;
  version: string;
  protocolVersion: string;
  status: 'CONNECTED' | 'MOCK' | 'DISCONNECTED' | 'BLOCKED';
  endpoint: string;
  tools: McpToolDefinition[];
  allowedRoles: string[];
}

export interface FederatedNode {
  id: string;
  name: string;
  location: string;
  status: 'ONLINE' | 'TRAINING' | 'SYNCED' | 'OFFLINE';
  localDataCount: number;
  lastRoundLoss: number;
  computeNode: string;
  privacyEpsilon: number;
}

export interface FederatedRound {
  roundNumber: number;
  status: 'COMPLETED' | 'RUNNING' | 'SCHEDULED';
  startedAt: string;
  completedAt?: string;
  globalLoss: number;
  accuracyDelta: string;
  participatingNodes: number;
  differentialPrivacyBudget: string;
  aggregationMethod: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  taskId?: string;
  actor: string;
  action: string;
  category: 'MODEL_INFERENCE' | 'RAG_RETRIEVAL' | 'MCP_TOOL' | 'SANDBOX_EXEC' | 'POLICY_GATEWAY' | 'APPROVAL';
  status: 'SUCCESS' | 'DENIED' | 'FAILED' | 'REVIEW_REQUIRED';
  details: string;
  clientIp?: string;
  sovereignBoundaryVerified?: boolean;
}

export interface GeneratedArtifact {
  id: string;
  taskId: string;
  name: string;
  format: 'DOCX' | 'PY' | 'XLSX' | 'PDF' | 'JSON';
  size: string;
  generatedAt: string;
  verified: boolean;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  description: string;
  content: string;
  downloadUrl?: string;
  sha256Hash?: string;
  signOffBy?: string;
}
