
import React from 'react';
import { ICONS } from '../constants';

const SpacesView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Validation */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group shadow-2xl">
          <div className="relative aspect-video sm:aspect-[16/9] bg-slate-950 flex items-center justify-center overflow-hidden">
             <img 
               src="https://picsum.photos/seed/construction/1200/675" 
               alt="Site Feed" 
               className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
             />
             <div className="absolute top-4 left-4 bg-rose-600 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-rose-900/40">
               <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
               Live: Sector 7G
             </div>
             <div className="absolute inset-0 border-[10px] md:border-[20px] border-white/5 pointer-events-none" />
             <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end gap-2">
                <div className="bg-black/80 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/10 shadow-2xl">
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">AI Progress Check</p>
                  <p className="text-sm md:text-xl font-black text-white">82.4% Verified</p>
                </div>
                <div className="flex gap-2">
                   <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 backdrop-blur-sm transition-all shadow-xl">
                      <ICONS.Building className="w-5 h-5 text-white" />
                   </button>
                </div>
             </div>
          </div>
          <div className="p-4 grid grid-cols-3 gap-2 border-t border-slate-800 bg-slate-900/50">
             <div className="text-center py-2">
               <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter mb-1">Concrete</p>
               <p className="text-[10px] text-emerald-400 font-black">COMPLETED</p>
             </div>
             <div className="text-center border-x border-slate-800 py-2">
               <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter mb-1">Steel</p>
               <p className="text-[10px] text-indigo-400 font-black">IN PROGRESS</p>
             </div>
             <div className="text-center py-2">
               <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter mb-1">Curtain</p>
               <p className="text-[10px] text-slate-600 font-black">QUEUED</p>
             </div>
          </div>
        </div>

        {/* LGU Compliance Tracker */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 flex flex-col shadow-xl">
           <div className="flex items-center gap-2 text-indigo-400 mb-6">
             <ICONS.Building className="w-4 h-4" />
             <h3 className="font-bold text-slate-200">LGU Compliance Tracker</h3>
           </div>
           <div className="flex-1 space-y-6">
              {[
                { title: 'Excavation Permit', stage: 'Approved', date: 'May 12, 2024', status: 'success' },
                { title: 'Electrical Load-Out', stage: 'Pending Inspection', date: 'May 25, 2024', status: 'warning' },
                { title: 'Occupancy Cert.', stage: 'Application Filed', date: 'TBD', status: 'muted' },
                { title: 'DENR ECC', stage: 'Final Review', date: 'June 01, 2024', status: 'info' },
              ].map((permit, i) => (
                <div key={i} className="flex gap-4 items-start group">
                   <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 shadow-sm ${
                     permit.status === 'success' ? 'bg-emerald-500 shadow-emerald-500/30' :
                     permit.status === 'warning' ? 'bg-amber-500 animate-pulse' :
                     permit.status === 'info' ? 'bg-indigo-500 shadow-indigo-500/30' :
                     'bg-slate-700'
                   }`} />
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-black text-white leading-tight truncate group-hover:text-indigo-400 transition-colors">{permit.title}</h4>
                        <span className="text-[8px] text-slate-600 font-mono shrink-0 uppercase">{permit.date}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-medium">{permit.stage}</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-black rounded border border-slate-700 transition-all uppercase tracking-[0.2em]">
             Export Matrix Report
           </button>
        </div>
      </div>
    </div>
  );
};

export default SpacesView;
