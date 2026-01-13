
import React from 'react';
import { ICONS } from '../constants';

const SpacesView: React.FC = () => {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-20">
        {/* Visual Validation */}
        <div className="lg:col-span-2 bg-zinc-925 border border-white/5 rounded-3xl overflow-hidden group ios-shadow">
          <div className="relative aspect-video sm:aspect-[21/9] bg-black flex items-center justify-center overflow-hidden">
             <img 
               src="https://picsum.photos/seed/construction/1600/900" 
               alt="Site Feed" 
               className="w-full h-full object-cover opacity-40 grayscale group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-1000"
             />
             <div className="absolute top-8 left-8 bg-zinc-100 text-black px-5 py-2 text-[11px] font-black uppercase tracking-[0.3em] italic rounded-full flex items-center gap-3 ios-shadow">
               <div className="w-2 h-2 bg-rose-600 rounded-full animate-pulse" />
               Live: Sector_07G
             </div>
             
             {/* Dynamic Overlay */}
             <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="bg-black/80 p-8 rounded-3xl border border-white/10 backdrop-blur-2xl ios-shadow">
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-3">Neural_Progress_Index</p>
                  <p className="text-4xl font-black text-lime italic tracking-tighter leading-none">82.4%_SIG</p>
                </div>
                <button className="w-16 h-16 bg-white hover:bg-lime transition-all duration-500 rounded-2xl flex items-center justify-center group/btn ios-shadow active:scale-90">
                  <ICONS.Building className="w-7 h-7 text-black group-hover/btn:scale-110 transition-transform duration-500" />
                </button>
             </div>
          </div>
          
          <div className="p-8 grid grid-cols-3 gap-10 border-t border-zinc-900 bg-zinc-900/40">
             {[
               { label: 'CONCRETE', status: 'STABLE', color: 'text-lime' },
               { label: 'SKELETON', status: 'SYNCING', color: 'text-white' },
               { label: 'CURTAIN', status: 'QUEUED', color: 'text-zinc-600' }
             ].map(item => (
               <div key={item.label} className="text-center">
                 <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-2">{item.label}</p>
                 <p className={`text-xs font-black italic tracking-tighter ${item.color}`}>{item.status}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Permits Matrix */}
        <div className="bg-zinc-925 border border-white/5 rounded-3xl p-10 flex flex-col ios-shadow">
           <div className="flex items-center gap-4 text-white mb-12">
             <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
               <ICONS.Building className="w-5 h-5 text-lime" />
             </div>
             <h3 className="text-xs font-black uppercase tracking-[0.4em]">Permit Sync</h3>
           </div>
           <div className="flex-1 space-y-12 border-l border-zinc-800/60 pl-10">
              {[
                { title: 'EXCAVATION_PRM', stage: 'APPROVED', date: '12_MAY', status: 'success' },
                { title: 'ELECTRICAL_LOD', stage: 'INSPECTION_PENDING', date: '25_MAY', status: 'warning' },
                { title: 'OCCUPANCY_CERT', stage: 'QUEUED_SEC', date: 'TBD', status: 'muted' },
                { title: 'DENR_ECC_SYNC', stage: 'FINAL_REVIEW', date: '01_JUN', status: 'info' },
              ].map((permit, i) => (
                <div key={i} className="group relative">
                   <div className={`absolute -left-[45px] top-1.5 w-2.5 h-2.5 rounded-full transition-all duration-500 border border-zinc-950 ${
                     permit.status === 'success' ? 'bg-lime shadow-[0_0_10px_#D9FF00]' :
                     permit.status === 'warning' ? 'bg-white animate-pulse' :
                     'bg-zinc-800'
                   }`} />
                   <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="text-xs font-black text-white italic tracking-tighter group-hover:text-lime transition-colors leading-none">{permit.title}</h4>
                      <span className="text-[9px] text-zinc-600 font-mono italic">{permit.date}</span>
                   </div>
                   <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest opacity-60 leading-none">{permit.stage}</p>
                </div>
              ))}
           </div>
           <button className="mt-14 w-full py-5 bg-white hover:bg-lime text-black text-[11px] font-black uppercase tracking-[0.4em] italic transition-all duration-500 rounded-2xl active:scale-95 ios-shadow">
             Matrix_Report_V2
           </button>
        </div>
      </div>
    </div>
  );
};

export default SpacesView;