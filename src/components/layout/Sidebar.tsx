import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  BookOpen,
  Boxes,
  Terminal,
  Network,
  CheckSquare,
  ShieldAlert,
  FileCheck2,
  Settings,
  Flame,
  Activity,
  FileText
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { NavigationTab } from '../../types';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, tasks } = useWorkbench();

  const pendingApprovalsCount = tasks.filter(t => t.status === 'AWAITING_APPROVAL').length;

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Home & Portal', icon: LayoutDashboard },
    { id: 'docs', label: 'Documentation & Specs', icon: FileText, badge: 'GUIDE', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'workbench', label: 'AI Workbench', icon: Flame },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'models', label: 'Models & Router', icon: Cpu },
    { id: 'mcp', label: 'MCP Tools', icon: Boxes },
    { id: 'sandbox', label: 'Agent Sandbox', icon: Terminal },
    { id: 'federated', label: 'Federated Learning', icon: Network },
    {
      id: 'approvals',
      label: 'Approvals Queue',
      icon: CheckSquare,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    { id: 'audit', label: 'Audit & Security', icon: ShieldAlert },
    { id: 'artifacts', label: 'Artifacts Vault', icon: FileCheck2 },
    { id: 'settings', label: 'Settings & Policy', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 select-none justify-between text-slate-700">
      {/* Navigation List */}
      <div className="p-3">
        <div className="px-3 pt-2 pb-3 border-b border-slate-200 mb-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            On-Premise Industrial AI
          </div>
          <div className="text-xs text-slate-800 font-bold truncate mt-0.5">
            MRPL Mangalore Refinery
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-900 font-bold border-l-4 border-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded border ${
                      item.badgeColor || 'bg-amber-100 text-amber-800 border-amber-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Cluster Hardware Footer Info */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <div className="p-2.5 rounded border border-slate-200 bg-slate-50 space-y-1.5 text-[11px] font-mono">
          <div className="flex items-center justify-between text-slate-700 font-semibold">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>vLLM Model Server</span>
            </span>
            <span className="text-emerald-700 text-[10px] bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
              ONLINE
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>HPC GPU VRAM</span>
            <span className="text-slate-800 font-semibold">112 / 160 GB</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-[70%]" />
          </div>
          <div className="text-[10px] text-slate-400 pt-0.5 flex justify-between">
            <span>Air-Gap Node</span>
            <span className="text-emerald-600 font-medium">0 Egress</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
