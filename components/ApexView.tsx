
import React from 'react';
import RiskMatrix from './RiskMatrix';
import { MOCK_PROJECTS, ICONS } from '../constants';

const ApexView: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-12">
          {/* Main Risk Heatmap */}
          <section>
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xs font-black uppercase tracking-[0.3em]">Global Risk Vector</h3>
               <span className="text-[9px] font-mono text-zinc-600">REALTIME_FEEDS: ACTIVE</span>
            </div>
            <RiskMatrix />
          </section>
          
          {/* Project Matrix Table */}
          <section className="bg-zinc-950 border border-zinc-900 rounded-none overflow-hidden">
            <div className="p-6 border-b border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Governance Oversight</h3>
              <div className="flex gap-4">
                {[
                  { label: 'G', color: 'bg-lime', count: 2 },
                  { label: 'Y', color: 'bg-yellow-500', count: 1 },
                  { label: 'R', color: 'bg-rose-600', count: 1 }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 ${item.color} rounded-none shadow-[0_0_5px_currentColor]`} />
                    <span className="text-[9px] font-mono text-zinc-500">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-zinc-900/40 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                  <tr>
                    <th className="p-6 border-b border-zinc-900">Entity_ID</th>
                    <th className="p-6 border-b border-zinc-900 text-center">Permits</th>
                    <th className="p-6 border-b border-zinc-900 text-center">Indemnity</th>
                    <th className="p-6 border-b border-zinc-900">Compliance_Risk</th>
                    <th className="p-6 border-b border-zinc-900 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {MOCK_PROJECTS.map((project) => (
                    <tr key={project.id} className="hover:bg-zinc-900/30 transition-colors group">
                      <td className="p-6">
                        <div className="text-xs font-black uppercase italic tracking-tighter group-hover:text-lime transition-colors">{project.name}</div>
                        <div className="text-[9px] text-zinc-600 font-mono mt-1">LAST_MOD: {project.lastUpdate}</div>
                      </td>
                      <td className="p-6 text-center">
                         <div className={`w-1.5 h-1.5 mx-auto rounded-none ${project.permits ? 'bg-lime' : 'bg-zinc-800'}`} />
                      </td>
                      <td className="p-6 text-center">
                         <div className={`w-1.5 h-1.5 mx-auto rounded-none ${project.indemnity ? 'bg-lime' : 'bg-zinc-800'}`} />
                      </td>
                      <td className="p-6">
                         <span className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest ${
                           project.risk === 'Critical' ? 'bg-white text-black' :
                           project.risk === 'High' ? 'text-rose-500' :
                           project.risk === 'Medium' ? 'text-yellow-500' :
                           'text-lime'
                         }`}>
                           {project.risk}
                         </span>
                      </td>
                      <td className="p-6 text-right">
                        <button className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Audit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar Audit/Rules */}
        <div className="space-y-12">
          <section className="bg-zinc-950 border border-zinc-900 p-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
               <div className="w-1 h-1 bg-lime" />
               Immutable Log
            </h3>
            <div className="space-y-8 border-l border-zinc-900 pl-6">
              {[
                { time: '14:22', action: 'INDEMNITY_SIGN_PRJ_01', user: 'SEC_AUTH' },
                { time: '13:05', action: 'PERMIT_EXP_PRJ_03', user: 'LGU_BOT' },
                { time: '11:40', action: 'BLUEPRINT_UPLOAD_04', user: 'ASSET_MGR' },
                { time: '09:12', action: 'CORE_BACKUP_SIG', user: 'SYSTEM' },
              ].map((log, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[27px] top-1 w-1 h-1 bg-zinc-800 group-hover:bg-lime transition-colors" />
                  <div className="text-[9px] text-zinc-600 font-mono mb-1">{log.time} // {log.user}</div>
                  <div className="text-[10px] font-black text-white group-hover:text-lime transition-colors uppercase italic">{log.action}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-lime text-black p-8">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
               <ICONS.Shield className="w-4 h-4" />
               Fail-Safe Rule
             </h3>
             <div className="space-y-4 text-[10px] font-bold uppercase leading-tight italic">
               <p>IF (PERMIT == OK AND INDEMNITY == OK) → SIG_GREEN</p>
               <p className="opacity-40">ELSE → SYSTEM_LOCKDOWN_MODE</p>
               <div className="pt-6 border-t border-black/20 mt-6">
                  <p className="text-[8px] opacity-60 mb-2">CURRENT_STATE:</p>
                  <p className="text-base font-black tracking-tighter">1 ACTIVE LOCKDOWN</p>
               </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApexView;