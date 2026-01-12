
import React from 'react';
import { ICONS } from '../constants';

const SpacesView: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Visual Validation Feed */}
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 rounded-none overflow-hidden group">
          <div className="relative aspect-video sm:aspect-[21/9] bg-black flex items-center justify-center">
             <img 
               src="https://picsum.photos/seed/construction/1600/900" 
               alt="Site Feed" 
               className="w-full h-full object-cover opacity-30 grayscale group-hover:opacity-50 transition-opacity duration-1000"
             />
             <div className="absolute top-6 left-6 bg-white text-black px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] italic flex items-center gap-3">
               <div className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse" />
               LIVE_FEED: SECTOR_07G
             </div>
             <div className="absolute inset-0 border border-white/5 pointer-events-none" />
             
             {/* Dynamic Overlay Elements */}
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="bg-black/90 p-6 border border-zinc-800 backdrop-blur-xl">
                  <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest mb-2">NEURAL_PROGRESS_INDEX</p>
                  <p className="text-3xl font-black text-lime italic tracking-tighter">82.4%_OK</p>
                </div>
                <button className="w-14 h-14 bg-white hover:bg-lime transition-colors flex items-center justify-center group/btn">
                  <ICONS.Building className="w-6 h-6 text-black group-hover/btn:scale-110 transition-transform" />
                </button>
             </div>
          </div>
          
          <div className="p-6 grid grid-cols-3 gap-6 border-t border-zinc-900">
             {[
               { label: 'CONCRETE', status: 'STABLE', color: 'text-lime' },
               { label: 'STEEL_SKELETON', status: 'SYNCING', color: 'text-white' },
               { label: 'CURTAIN_WALL', status: 'PENDING', color: 'text-zinc-600' }
             ].map(item => (
               <div key={item.label} className="text-center group-hover:translate-y-[-2px] transition-transform">
                 <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">{item.label}</p>
                 <p className={`text-[10px] font-black italic tracking-tighter ${item.color}`}>{item.status}</p>
               </div>
             ))}
          </div>
        </div>

        {/* LGU Compliance Matrix */}
        <div className="bg-zinc-950 border border-zinc-900 p-8 flex flex-col">
           <div className="flex items-center gap-3 text-white mb-10">
             <ICONS.Building className="w-4 h-4 text-lime" />
             <h3 className="text-xs font-black uppercase tracking-[0.3em]">Permit Telemetry</h3>
           </div>
           <div className="flex-1 space-y-10 border-l border-zinc-900 pl-8">
              {[
                { title: 'EXCAVATION_PRM', stage: 'APPROVED', date: '12_MAY', status: 'success' },
                { title: 'ELECTRICAL_LOD', stage: 'INSPECTION_PENDING', date: '25_MAY', status: 'warning' },
                { title: 'OCCUPANCY_CERT', stage: 'QUEUED_SYSTEM', date: 'TBD', status: 'muted' },
                { title: 'DENR_ECC_SIG', stage: 'FINAL_REVIEW', date: '01_JUN', status: 'info' },
              ].map((permit, i) => (
                <div key={i} className="group relative">
                   <div className={`absolute -left-[35px] top-1 w-2 h-2 rounded-none transition-all ${
                     permit.status === 'success' ? 'bg-lime' :
                     permit.status === 'warning' ? 'bg-white animate-pulse' :
                     'bg-zinc-800'
                   }`} />
                   <div className="flex justify-between items-start gap-4 mb-1">
                      <h4 className="text-[11px] font-black text-white italic tracking-tighter group-hover:text-lime transition-colors">{permit.title}</h4>
                      <span className="text-[8px] text-zinc-600 font-mono italic">{permit.date}</span>
                   </div>
                   <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">{permit.stage}</p>
                </div>
              ))}
           </div>
           <button className="mt-12 w-full py-4 bg-white hover:bg-lime text-black text-[10px] font-black uppercase tracking-[0.3em] italic transition-all">
             GENERATE_ENTITY_MATRIX
           </button>
        </div>
      </div>
    </div>
  );
};

export default SpacesView;