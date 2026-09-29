import React, { useState } from 'react';
import {
  Boxes,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  Lock,
  ArrowRight,
  Database,
  FileCode,
  Search,
  FileCheck
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { StatusBadge } from '../common/StatusBadge';
import { McpServer, McpToolDefinition } from '../../types';

export const McpToolsView: React.FC = () => {
  const { mcpServers, addAuditLog } = useWorkbench();

  const [selectedServerId, setSelectedServerId] = useState<string>(mcpServers[0].id);
  const [testToolName, setTestToolName] = useState('search_sops');
  const [testParams, setTestParams] = useState(
    JSON.stringify({ query: 'DHDS reactor wall thinning criteria', unit_filter: 'DHDS', top_k: 3 }, null, 2)
  );
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const selectedServer = mcpServers.find(s => s.id === selectedServerId) || mcpServers[0];

  const handleSelectTool = (server: McpServer, tool: McpToolDefinition) => {
    setSelectedServerId(server.id);
    setTestToolName(tool.name);

    if (tool.name === 'search_sops') {
      setTestParams(JSON.stringify({ query: 'DHDS reactor wall thinning criteria', unit_filter: 'DHDS', top_k: 3 }, null, 2));
    } else if (tool.name === 'generate_docx_artifact') {
      setTestParams(JSON.stringify({ template_id: 'MRPL_APPROVAL_NOTE_V3', metadata: { asset: 'Reactor R-02' } }, null, 2));
    } else if (tool.name === 'execute_thermo_calc') {
      setTestParams(JSON.stringify({ python_code: 'import math\ndef lmtd(): return 48.3\nprint(lmtd())' }, null, 2));
    } else if (tool.name === 'direct_sql_admin_exec') {
      setTestParams(JSON.stringify({ sql: 'DROP TABLE refinery_assets;' }, null, 2));
    } else {
      setTestParams(JSON.stringify({ param1: 'sample_value' }, null, 2));
    }
  };

  const handleExecuteTool = () => {
    setIsRunning(true);
    setExecutionResult(null);

    const isBlocked = testToolName === 'direct_sql_admin_exec';

    setTimeout(() => {
      setIsRunning(false);
      if (isBlocked) {
        setExecutionResult({
          status: 'BLOCKED',
          policyDecision: 'DENIED BY POLICY GATEWAY',
          rule: 'RULE_PROHIBIT_ADMIN_SQL_EXECUTION',
          reason: 'Arbitrary database administration is strictly prohibited by refinery policy gateway.',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
        });

        addAuditLog({
          actor: 'Policy Gateway',
          action: 'TOOL_EXECUTION_BLOCKED',
          category: 'POLICY_GATEWAY',
          status: 'DENIED',
          details: `DEMO EVENT: Unauthorized tool invocation blocked by policy gateway. Attempted "mcp-database.${testToolName}".`,
          clientIp: '10.14.8.50'
        });
      } else {
        setExecutionResult({
          status: 'PERMITTED',
          policyDecision: 'APPROVED BY POLICY GATEWAY',
          executionDurationMs: 142,
          output: {
            success: true,
            recordsFound: 3,
            summary: 'Operation executed successfully inside sovereign on-premise container.',
            auditHash: 'SHA256: 4f98ba71...e20'
          },
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
        });

        addAuditLog({
          actor: 'MCP Gateway Client',
          action: 'TOOL_EXECUTION_PERMITTED',
          category: 'MCP_TOOL',
          status: 'SUCCESS',
          details: `Invoked "${selectedServer.id}.${testToolName}". Execution validated and sealed.`,
          clientIp: '10.14.8.50'
        });
      }
    }, 700);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-50 text-slate-800">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
            Model Context Protocol (MCP) Integration
          </h1>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
            Protocol Version: 2024-11-05
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          <strong className="text-slate-800 font-semibold">Model Context Protocol</strong> — a standardized interface that allows PRAGYA&apos;s
          agent to discover and invoke approved tools and internal resources without exposing raw system calls.
        </p>
      </div>

      {/* MCP Architecture Banner */}
      <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-2">
        <div className="text-xs font-mono uppercase text-blue-800 font-bold tracking-wider">
          Policy-Controlled MCP Tool Execution Architecture
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-700">
          <span className="p-2 rounded bg-slate-50 border border-slate-200 font-medium">Agent Request</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="p-2 rounded bg-blue-50 border border-blue-300 text-blue-900 font-bold">
            Backend Policy Gateway
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="p-2 rounded bg-slate-50 border border-slate-200 font-medium">MCP Client Adapter</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="p-2 rounded bg-slate-50 border border-slate-200 font-medium">Sandboxed MCP Server</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="p-2 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">
            Audited Output
          </span>
        </div>
      </div>

      {/* MCP Servers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mcpServers.map(server => (
          <div
            key={server.id}
            className={`p-4 rounded-lg border transition-all ${
              selectedServerId === server.id
                ? 'bg-blue-50/50 border-blue-400 shadow-xs ring-1 ring-blue-300'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 font-sans">{server.name}</h3>
                  <StatusBadge status={server.status} />
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                  ID: {server.id} · Endpoint: {server.endpoint}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans mb-3">
              {server.description}
            </p>

            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Available Tools</div>
              <div className="space-y-1">
                {server.tools.map(tool => (
                  <div
                    key={tool.name}
                    onClick={() => handleSelectTool(server, tool)}
                    className={`p-2 rounded-md border cursor-pointer transition-colors flex items-center justify-between text-xs font-mono ${
                      testToolName === tool.name
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-slate-900">{tool.name}</span>
                      <div className="text-[10px] text-slate-500 font-sans mt-0.5 font-normal">
                        {tool.description}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                          tool.policyAllowed
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        {tool.policyAllowed ? 'ALLOWED' : 'BLOCKED'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Tool Invocation & Policy Gateway Inspector */}
      <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Test Tool Invocation via Policy Gateway
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Policy Gateway Active
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Tool Parameters Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 font-medium">
              <span>Target: <strong className="text-slate-800">{selectedServer.id}.{testToolName}</strong></span>
              <span className="text-blue-700 font-semibold">JSON Schema Validated</span>
            </div>
            <textarea
              value={testParams}
              onChange={e => setTestParams(e.target.value)}
              rows={6}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600 leading-relaxed"
            />
            <button
              onClick={handleExecuteTool}
              disabled={isRunning}
              className="w-full py-2 px-4 rounded-md text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
              <span>{isRunning ? 'Evaluating Policy & Executing...' : 'Invoke Tool Through Policy Gateway'}</span>
            </button>
          </div>

          {/* Right: Policy Decision & Result Output */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 font-bold">Policy Gateway Evaluation</span>
                {executionResult && (
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] border ${
                      executionResult.status === 'PERMITTED'
                        ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                        : 'text-rose-800 bg-rose-50 border-rose-200'
                    }`}
                  >
                    {executionResult.policyDecision}
                  </span>
                )}
              </div>

              {!executionResult ? (
                <div className="py-12 text-center text-xs text-slate-500 font-mono">
                  Click &ldquo;Invoke Tool&rdquo; to test authorization and view execution response.
                </div>
              ) : (
                <pre className="p-3 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-800 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {JSON.stringify(executionResult, null, 2)}
                </pre>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>Security Rule: AST Allowlist</span>
              <span className="text-emerald-700 font-semibold">Network Isolation: Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
