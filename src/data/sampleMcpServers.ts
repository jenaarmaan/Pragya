import { McpServer } from '../types';

export const MCP_SERVERS: McpServer[] = [
  {
    id: 'mcp-docsearch',
    name: 'MRPL Document Search MCP',
    description: 'Model Context Protocol adapter connecting sovereign agents to on-premise BGE-M3 vector indexes and local document stores.',
    version: '1.4.2',
    protocolVersion: '2024-11-05',
    status: 'CONNECTED',
    endpoint: 'mcp://localhost:8401/rpc (stdio / local socket)',
    allowedRoles: ['engineer', 'inspector', 'operator', 'admin'],
    tools: [
      {
        name: 'search_sops',
        description: 'Queries refinery Standard Operating Procedures using hybrid dense-sparse vector search.',
        riskLevel: 'LOW',
        policyAllowed: true,
        invocationsCount: 1420,
        lastUsed: '12 mins ago',
        parameters: [
          { name: 'query', type: 'string', description: 'Semantic search phrase or plant equipment code', required: true },
          { name: 'unit_filter', type: 'string', description: 'Refinery unit e.g. DHDS, CDU, FCC', required: false },
          { name: 'top_k', type: 'number', description: 'Number of chunks to return (max 10)', required: false }
        ]
      },
      {
        name: 'retrieve_equipment_manual',
        description: 'Fetches certified TEMA datasheets and vendor specifications by tag ID.',
        riskLevel: 'LOW',
        policyAllowed: true,
        invocationsCount: 812,
        lastUsed: '45 mins ago',
        parameters: [
          { name: 'equipment_tag', type: 'string', description: 'Tag code e.g. R-02, E-102A, P-204B', required: true }
        ]
      },
      {
        name: 'get_pi_historian_tag',
        description: 'Retrieves plant SCADA PI historian sensor values (read-only timestamped telemetry).',
        riskLevel: 'MEDIUM',
        policyAllowed: true,
        invocationsCount: 654,
        lastUsed: '2 hours ago',
        parameters: [
          { name: 'tag_name', type: 'string', description: 'OSIsoft PI tag identifier', required: true },
          { name: 'time_range_hours', type: 'number', description: 'Historical telemetry lookback window', required: true }
        ]
      }
    ]
  },
  {
    id: 'mcp-fileops',
    name: 'MRPL File Operations MCP',
    description: 'Sandboxed I/O service providing local document parsing, structured report generation, and confidential archival.',
    version: '2.1.0',
    protocolVersion: '2024-11-05',
    status: 'CONNECTED',
    endpoint: 'mcp://localhost:8402/rpc (air-gapped storage broker)',
    allowedRoles: ['engineer', 'admin'],
    tools: [
      {
        name: 'read_inspection_log',
        description: 'Parses local NDT inspection PDF or scanned test logs using sovereign local OCR.',
        riskLevel: 'LOW',
        policyAllowed: true,
        invocationsCount: 1120,
        lastUsed: '4 mins ago',
        parameters: [
          { name: 'file_path', type: 'string', description: 'Relative path within secure air-gap inbox', required: true }
        ]
      },
      {
        name: 'generate_docx_artifact',
        description: 'Creates a corporate formatted DOCX Approval Note or Technical Memo with MRPL headers.',
        riskLevel: 'MEDIUM',
        policyAllowed: true,
        invocationsCount: 432,
        lastUsed: 'Just now',
        parameters: [
          { name: 'template_id', type: 'string', description: 'MRPL_APPROVAL_NOTE_V3', required: true },
          { name: 'metadata', type: 'object', description: 'Equipment tag, author, severity, unit', required: true },
          { name: 'findings', type: 'array', description: 'Structured findings list with citations', required: true }
        ]
      },
      {
        name: 'archive_audit_record',
        description: 'Cryptographically hashes and writes an immutable audit record to the local journal.',
        riskLevel: 'LOW',
        policyAllowed: true,
        invocationsCount: 2315,
        lastUsed: '1 min ago',
        parameters: [
          { name: 'task_id', type: 'string', description: 'Task execution reference', required: true },
          { name: 'action_summary', type: 'string', description: 'Summary of audited event', required: true }
        ]
      }
    ]
  },
  {
    id: 'mcp-py-sandbox',
    name: 'MRPL Python Sandbox MCP',
    description: 'Secure, isolated container execution environment enforcing strict AST policy rules and execution quotas.',
    version: '3.0.1',
    protocolVersion: '2024-11-05',
    status: 'CONNECTED',
    endpoint: 'mcp://localhost:8403/rpc (gVisor/Docker isolated sandbox)',
    allowedRoles: ['engineer', 'ai-agent', 'admin'],
    tools: [
      {
        name: 'execute_thermo_calc',
        description: 'Executes approved thermodynamic heat exchanger LMTD and fouling factor equations.',
        riskLevel: 'LOW',
        policyAllowed: true,
        invocationsCount: 567,
        lastUsed: '32 mins ago',
        parameters: [
          { name: 'python_code', type: 'string', description: 'Sandboxed Python calculation script', required: true },
          { name: 'timeout_sec', type: 'number', description: 'Hard timeout threshold (default: 5s)', required: false }
        ]
      },
      {
        name: 'validate_flange_rating',
        description: 'Checks ASME B16.5 flange pressure-temperature rating against process design conditions.',
        riskLevel: 'LOW',
        policyAllowed: true,
        invocationsCount: 389,
        lastUsed: '1 hour ago',
        parameters: [
          { name: 'flange_class', type: 'string', description: 'e.g. 300#, 600#, 1500#', required: true },
          { name: 'temperature_c', type: 'number', description: 'Design temperature in Celsius', required: true },
          { name: 'material_group', type: 'string', description: 'e.g. 1.25Cr-0.5Mo (Group 1.9)', required: true }
        ]
      },
      {
        name: 'plot_corrosion_trend',
        description: 'Generates API 570 remaining life decay curve and thickness loss trend chart.',
        riskLevel: 'LOW',
        policyAllowed: true,
        invocationsCount: 290,
        lastUsed: '4 hours ago',
        parameters: [
          { name: 'historical_measurements', type: 'array', description: 'Array of {year: number, thickness: number}', required: true }
        ]
      }
    ]
  },
  {
    id: 'mcp-database',
    name: 'MRPL Plant Database MCP (SAP PM / LIMS)',
    description: 'Read-only gateway to enterprise asset maintenance registers and refinery laboratory quality data.',
    version: '1.2.0',
    protocolVersion: '2024-11-05',
    status: 'CONNECTED',
    endpoint: 'mcp://localhost:8404/rpc (isolated internal gateway)',
    allowedRoles: ['engineer', 'admin'],
    tools: [
      {
        name: 'query_sap_pm_workorder',
        description: 'Fetches existing SAP Plant Maintenance work order history for refinery assets.',
        riskLevel: 'LOW',
        policyAllowed: true,
        invocationsCount: 778,
        lastUsed: '18 mins ago',
        parameters: [
          { name: 'asset_tag', type: 'string', description: 'Refinery tag e.g. R-02, P-101A', required: true }
        ]
      },
      {
        name: 'query_lims_lab_sample',
        description: 'Queries LIMS laboratory certified sulfur content, API gravity, and catalyst poison assay.',
        riskLevel: 'LOW',
        policyAllowed: true,
        invocationsCount: 412,
        lastUsed: '3 hours ago',
        parameters: [
          { name: 'stream_id', type: 'string', description: 'Refinery process stream ID', required: true }
        ]
      },
      {
        name: 'direct_sql_admin_exec',
        description: 'Direct DDL/DML arbitrary database administration execution (STRICTLY PROHIBITED).',
        riskLevel: 'HIGH',
        policyAllowed: false,
        invocationsCount: 0,
        lastUsed: 'Blocked on 2026-09-21',
        parameters: [
          { name: 'sql', type: 'string', description: 'Raw SQL statement', required: true }
        ]
      }
    ]
  }
];
