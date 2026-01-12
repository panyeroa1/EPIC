
import React from 'react';
import RiskMatrix from './RiskMatrix';
import { MOCK_PROJECTS, ICONS } from '../constants';

const ApexView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
       <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">APEX Governance</h2>
          <p className="text-sm text-slate-400">Executive Decision & Oversight Layer</p>
        </div>
        <button className="w-full sm:w-auto px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-rose-900/20 transition-all uppercase tracking-widest">
          Trigger System Lockdown
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RiskMatrix />
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="font-bold text-slate-200">Active Project Oversight</h3>
              <div className="flex flex-wrap gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> GREEN: 2
                </span>
                <span className="flex items-center gap-1.5 text-yellow-400">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" /> YELLOW: 1
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> RED: 1
                </span>
              </div>
            </div>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <table className="w-full text-left text-sm min-w-[600px]">
                <thead className="text-slate-400 font-medium border-b border-slate-800 bg-slate-950/20">
                  <tr>
                    <th className="p-4">Project Entity</th>
                    <th className="p-4 text-center">Permits</th>
                    <th className="p-4 text-center">Indemnity</th>
                    <th className="p-4">Risk Level</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {MOCK_PROJECTS.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-white">{project.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{project.lastUpdate}</div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center">
                          {project.permits ? 
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> : 
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center">
                          {project.indemnity ? 
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> : 
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />}
                        </div>
                      </td>
                      <td className="p-4">
                         <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter ${
                           project.risk === 'Critical' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                           project.risk === 'High' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                           project.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                           'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                         }`}>
                           {project.risk}
                         </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-indigo-400 hover:text-indigo-300 font-bold text-xs uppercase tracking-widest">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Hint */}
            <div className="md:hidden p-2 text-center border-t border-slate-800 bg-slate-950/20">
               <span className="text-[9px] text-slate-500 uppercase font-mono tracking-widest animate-pulse">Swipe to view full matrix</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6">
            <h3 className="font-bold text-white mb-5 flex items-center gap-2">
               <ICONS.Dashboard className="w-4 h-4 text-indigo-400" />
               Immutable Audit Trail
            </h3>
            <div className="space-y-5">
              {[
                { time: '14:22', action: 'Indemnity Signed - Project 1', user: 'SEC-Auth' },
                { time: '13:05', action: 'Permit Expired - Project 3', user: 'LGU-Bot' },
                { time: '11:40', action: 'New Blueprint Uploaded', user: 'Asset-Mgr' },
                { time: '09:12', action: 'System Backup Complete', user: 'Root' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 text-xs border-l border-slate-800 pl-4 relative">
                  <div className="absolute -left-1 top-1 w-2 h-2 bg-indigo-500 rounded-full border border-slate-900" />
                  <span className="text-slate-500 font-mono text-[10px]">{log.time}</span>
                  <div>
                    <div className="text-slate-200 font-semibold leading-tight">{log.action}</div>
                    <div className="text-[9px] text-slate-600 uppercase tracking-tighter font-mono mt-0.5">{log.user}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-5 md:p-6">
             <h3 className="text-rose-400 text-sm font-bold flex items-center gap-2 mb-4">
               <ICONS.Shield className="w-4 h-4" />
               Fail-Safe Rule Engine
             </h3>
             <ul className="text-[10px] space-y-3 text-rose-200/60 font-mono leading-relaxed">
               <li className="flex gap-2">
                  <span className="text-rose-500/50">01</span>
                  <span>IF (Permit == Approved AND Indemnity == Signed) → ACCESS_GRANTED</span>
               </li>
               <li className="flex gap-2">
                  <span className="text-rose-500/50">02</span>
                  <span>IF (Permit == Pending OR Indemnity == Missing) → SYSTEM_LOCKDOWN</span>
               </li>
               <li className="text-rose-400 font-bold border-t border-rose-900/30 pt-3 mt-3 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                 CURRENT: 1 Lockdown Active (Azure Bay)
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApexView;
