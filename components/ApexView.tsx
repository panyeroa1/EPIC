
import React from 'react';
import RiskMatrix from './RiskMatrix';
import { MOCK_PROJECTS, ICONS } from '../constants';

const ApexView: React.FC = () => {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 xl:gap-20">
        <div className="lg:col-span-3 space-y-16">
          {/* Risk Heatmap */}
          <section>
            <div className="flex items-center justify-between mb-8 px-2">
               <div>
                 <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400">Risk Distribution</h3>
                 <p className="text-[10px] text-zinc-600 font-mono mt-1 uppercase tracking-tighter">HEURISTIC_MAPPING_V4</p>
               </div>
               <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-white/5 uppercase">Realtime_Feed</span>
            </div>
            <div className="rounded-3xl overflow-hidden ios-shadow border border-white/5">
              <RiskMatrix />
            </div>
          </section>
          
          {/* Table */}
          <section className="bg-zinc-925 border border-white/5 rounded-3xl overflow-hidden ios-shadow">
            <div className="p-8 border-b border-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-8 bg-zinc-900/30">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Project Compliance Matrix</h3>
              <div className="flex gap-6">
                {[
                  { label: 'G', color: 'bg-lime', count: 2, glow: 'shadow-[0_0_8px_#D9FF00]' },
                  { label: 'Y', color: 'bg-yellow-500', count: 1, glow: 'shadow-[0_0_8px_#EAB308]' },
                  { label: 'R', color: 'bg-rose-600', count: 1, glow: 'shadow-[0_0_8px_#E11D48]' }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${item.color} rounded-full ${item.glow}`} />
                    <span className="text-xs font-bold text-zinc-400">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-zinc-900/40 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <tr>
                    <th className="p-8 border-b border-zinc-900/50">Entity_ID</th>
                    <th className="p-8 border-b border-zinc-900/50 text-center">Permits</th>
                    <th className="p-8 border-b border-zinc-900/50 text-center">Indemnity</th>
                    <th className="p-8 border-b border-zinc-900/50">Status_Vector</th>
                    <th className="p-8 border-b border-zinc-900/50 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/40">
                  {MOCK_PROJECTS.map((project) => (
                    <tr key={project.id} className="hover:bg-zinc-900/50 transition-all duration-300 group">
                      <td className="p-8">
                        <div className="text-sm font-black uppercase italic tracking-tighter group-hover:text-lime transition-colors text-white">{project.name}</div>
                        <div className="text-[10px] text-zinc-600 font-mono mt-1.5 uppercase">MOD: {project.lastUpdate}</div>
                      </td>
                      <td className="p-8 text-center">
                         <div className={`w-2 h-2 mx-auto rounded-full transition-all duration-500 ${project.permits ? 'bg-lime shadow-[0_0_10px_#D9FF00]' : 'bg-zinc-800'}`} />
                      </td>
                      <td className="p-8 text-center">
                         <div className={`w-2 h-2 mx-auto rounded-full transition-all duration-500 ${project.indemnity ? 'bg-lime shadow-[0_0_10px_#D9FF00]' : 'bg-zinc-800'}`} />
                      </td>
                      <td className="p-8">
                         <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center justify-center min-w-[80px] ${
                           project.risk === 'Critical' ? 'bg-white text-black' :
                           project.risk === 'High' ? 'bg-rose-600/10 text-rose-500 border border-rose-500/20' :
                           project.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                           'bg-lime/10 text-lime border border-lime/20'
                         }`}>
                           {project.risk}
                         </span>
                      </td>
                      <td className="p-8 text-right">
                        <button className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors bg-white/5 py-2 px-4 rounded-full border border-white/5">Audit_Log</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar Audit */}
        <div className="space-y-12">
          <section className="bg-zinc-925 border border-white/5 p-10 rounded-3xl ios-shadow">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-12 flex items-center gap-3 text-zinc-400">
               <div className="w-1.5 h-1.5 bg-lime rounded-full shadow-[0_0_8px_#D9FF00]" />
               Sync History
            </h3>
            <div className="space-y-10 border-l border-zinc-800/60 pl-8">
              {[
                { time: '14:22', action: 'INDEMNITY_SIGN_PRJ_01', user: 'SEC_AUTH' },
                { time: '13:05', action: 'PERMIT_EXP_PRJ_03', user: 'LGU_BOT' },
                { time: '11:40', action: 'BLUEPRINT_MOD_04', user: 'ASSET_MGR' },
                { time: '09:12', action: 'CORE_SIG_SYNCED', user: 'SYSTEM' },
              ].map((log, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-lime transition-colors border border-zinc-950" />
                  <div className="text-[10px] text-zinc-600 font-mono mb-1.5 uppercase tracking-tighter">{log.time} // {log.user}</div>
                  <div className="text-xs font-black text-zinc-200 group-hover:text-white transition-colors uppercase italic tracking-tight">{log.action}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-lime text-black p-10 rounded-3xl ios-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
             <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
               <ICONS.Shield className="w-5 h-5" />
               Logic Gate
             </h3>
             <div className="space-y-5 text-[11px] font-bold uppercase italic leading-snug">
               <p className="tracking-tight">IF (PERMIT == OK && INDEMNITY == OK) → SIG_GREEN</p>
               <p className="opacity-40 tracking-tight">ELSE → FAIL_SAFE_LOCKDOWN</p>
               <div className="pt-8 border-t border-black/15 mt-8">
                  <p className="text-[9px] opacity-60 mb-2 uppercase font-black">Current_Heuristic:</p>
                  <p className="text-lg font-black tracking-tighter leading-none">1 ACTIVE LOCKDOWN</p>
               </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApexView;