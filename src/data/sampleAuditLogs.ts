import { AuditEvent } from '../types';

export const SAMPLE_AUDIT_LOGS: AuditEvent[] = [
  {
    id: 'AUD-2026-9041',
    timestamp: '2026-09-23 09:20:42',
    taskId: 'TSK-MRPL-2026-0891',
    actor: 'PRAGYA Verification Engine',
    action: 'VERIFICATION_SUITE_EVALUATED',
    category: 'POLICY_GATEWAY',
    status: 'SUCCESS',
    details: 'Passed 4/4 factual grounding assertions. Cross-validated against SOP-2401 p.14 and NDT Report p.7.',
    clientIp: '10.14.8.10 (Internal Plant VLAN)',
    sovereignBoundaryVerified: true
  },
  {
    id: 'AUD-2026-9040',
    timestamp: '2026-09-23 09:20:38',
    taskId: 'TSK-MRPL-2026-0891',
    actor: 'mcp-fileops / generate_docx_artifact',
    action: 'ARTIFACT_GENERATION_SEALED',
    category: 'MCP_TOOL',
    status: 'SUCCESS',
    details: 'Generated MRPL_DHDS_Reactor_Inspection_Approval_Note.docx (SHA256: 7f83b165...80). Stored in local encrypted vault.',
    clientIp: '10.14.8.50',
    sovereignBoundaryVerified: true
  },
  {
    id: 'AUD-2026-9039',
    timestamp: '2026-09-23 09:20:31',
    taskId: 'TSK-MRPL-2026-0891',
    actor: 'Agent Subroutine (Qwen-2.5-72B)',
    action: 'TOOL_INVOCATION_CHECKED',
    category: 'POLICY_GATEWAY',
    status: 'SUCCESS',
    details: 'Policy Gateway evaluated tool call "mcp-fileops.generate_docx_artifact". Rule ALLOW_APPROVED_TEMPLATES matched.',
    clientIp: '10.14.8.50',
    sovereignBoundaryVerified: true
  },
  {
    id: 'AUD-2026-9038',
    timestamp: '2026-09-23 09:20:25',
    taskId: 'TSK-MRPL-2026-0891',
    actor: 'mcp-docsearch / search_sops',
    action: 'VECTOR_RAG_RETRIEVAL',
    category: 'RAG_RETRIEVAL',
    status: 'SUCCESS',
    details: 'Local BGE-M3 retrieved 3 chunks from MRPL-SOP-MNT-2401. Top score: 0.942. No internet egress.',
    clientIp: '10.14.8.53',
    sovereignBoundaryVerified: true
  },
  {
    id: 'AUD-2026-9035',
    timestamp: '2026-09-23 08:44:19',
    taskId: 'TSK-MRPL-TEST-004',
    actor: 'Adversarial Prompt Injection Probe (Simulated Test)',
    action: 'TOOL_INVOCATION_ATTEMPT',
    category: 'POLICY_GATEWAY',
    status: 'DENIED',
    details: 'DEMO EVENT: Unauthorized tool invocation blocked by policy gateway. Attempted "mcp-database.direct_sql_admin_exec" with payload "DROP TABLE refinery_assets". Blocked by AST and role allowlist.',
    clientIp: '10.14.8.99 (Test Sandbox)',
    sovereignBoundaryVerified: true
  },
  {
    id: 'AUD-2026-9032',
    timestamp: '2026-09-22 14:10:55',
    taskId: 'TSK-MRPL-2026-0892',
    actor: 'mcp-py-sandbox / execute_thermo_calc',
    action: 'SANDBOX_CONTAINER_RUN',
    category: 'SANDBOX_EXEC',
    status: 'SUCCESS',
    details: 'Executed LMTD calculation script in gVisor sandbox container. CPU time: 142ms, Memory: 38MB. Zero network egress.',
    clientIp: '10.14.8.51',
    sovereignBoundaryVerified: true
  },
  {
    id: 'AUD-2026-9030',
    timestamp: '2026-09-22 11:15:02',
    actor: 'Local Firewall & Egress Monitor (Kernel eBPF)',
    action: 'EGRESS_BOUNDARY_AUDIT',
    category: 'POLICY_GATEWAY',
    status: 'SUCCESS',
    details: 'Periodic network boundary check: 0 external outbound packets attempted. Egress rule DROP_ALL_EXTERNAL active on interfaces eth0, eth1.',
    clientIp: '10.14.8.1',
    sovereignBoundaryVerified: true
  }
];
