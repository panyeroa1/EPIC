
import React, { useState, useEffect } from 'react';
import { Pillar } from './types';
import { ICONS } from './constants';
import Intelligence from './components/Intelligence';
import ApexView from './components/ApexView';
import SpacesView from './components/SpacesView';

const SidebarItem: React.FC<{ 
  pillar: Pillar; 
  active: boolean; 
  onClick: () => void;
  icon: React.FC<any>;
  label: string;
}> = ({ pillar, active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-400 group relative ${
      active 
        ? 'bg-white text-black font-bold shadow-xl ios-shadow scale-[1.02]' 
        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
    }`}
  >
    <Icon className={`w-5 h-5 shrink-0 transition-colors ${active ? 'text-black' : 'group-hover:text-lime'}`} />
    <span className="text-[12px] font-bold tracking-tight">{label}</span>
    {active && (
      <div className="ml-auto w-1.5 h-1.5 bg-lime rounded-full shadow-[0_0_8px_#D9FF00]" />
    )}
  </button>
);

const MobileNavItem: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.FC<any>;
  label: string;
}> = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center gap-1 transition-all duration-300 flex-1 py-1 ${active ? 'text-lime' : 'text-zinc-500'}`}
  >
    <Icon className={`w-6 h-6 transition-transform ${active ? 'scale-110' : ''}`} />
    <span className="text-[9px] font-bold tracking-tight uppercase">{label}</span>
  </button>
);

const App: React.FC = () => {
  const [activePillar, setActivePillar] = useState<Pillar>(Pillar.APEX);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activePillar) {
      case Pillar.INTELLIGENCE: return <Intelligence />;
      case Pillar.APEX: return <ApexView />;
      case Pillar.SPACES: return <SpacesView />;
      default: return <ApexView />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex text-zinc-100 selection:bg-lime selection:text-black">
      {/* Sidebar - Desktop */}
      <aside className="w-80 border-r border-zinc-900/40 p-10 flex flex-col glass sticky top-0 h-screen hidden md:flex z-40">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
               <span className="font-black text-black text-xl italic">E</span>
            </div>
            <div>
              <h1 className="font-black text-2xl tracking-tighter uppercase text-white leading-none">EOS</h1>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] mt-1">v.24.05-PRM</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          <SidebarItem 
            pillar={Pillar.APEX} 
            active={activePillar === Pillar.APEX} 
            onClick={() => setActivePillar(Pillar.APEX)} 
            icon={ICONS.Dashboard}
            label="Apex Control"
          />
          <SidebarItem 
            pillar={Pillar.INTELLIGENCE} 
            active={activePillar === Pillar.INTELLIGENCE} 
            onClick={() => setActivePillar(Pillar.INTELLIGENCE)} 
            icon={ICONS.Brain}
            label="Neural Hub"
          />
          <SidebarItem 
            pillar={Pillar.SPACES} 
            active={activePillar === Pillar.SPACES} 
            onClick={() => setActivePillar(Pillar.SPACES)} 
            icon={ICONS.Building}
            label="Tele Ops"
          />
        </nav>

        <div className="mt-auto space-y-10">
           <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Security Link</p>
                <div className="w-2 h-2 bg-lime rounded-full shadow-[0_0_12px_#D9FF00]" />
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-lime/20 rounded-full" />
                 <span className="text-sm font-bold text-white tracking-tight leading-tight">Biometric Auth Active</span>
              </div>
           </div>
           <div className="flex justify-between items-center opacity-40 px-2 font-mono text-[11px]">
              <span className="tracking-tighter">{currentTime}</span>
              <span className="tracking-tighter">NODE_7G</span>
           </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl px-8 py-5 flex justify-around items-center ios-shadow">
         <MobileNavItem active={activePillar === Pillar.APEX} onClick={() => setActivePillar(Pillar.APEX)} icon={ICONS.Dashboard} label="Apex" />
         <MobileNavItem active={activePillar === Pillar.INTELLIGENCE} onClick={() => setActivePillar(Pillar.INTELLIGENCE)} icon={ICONS.Brain} label="Intel" />
         <MobileNavItem active={activePillar === Pillar.SPACES} onClick={() => setActivePillar(Pillar.SPACES)} icon={ICONS.Building} label="Ops" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-16 pb-40 md:pb-16 max-w-[1500px] mx-auto w-full overflow-y-auto">
        <div className="mb-12 md:mb-20 flex items-end justify-between border-b border-zinc-900/40 pb-10">
           <div>
              <p className="text-[11px] font-black text-lime mb-3 uppercase tracking-[0.4em]">
                {activePillar} INTERFACE
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                {activePillar === Pillar.APEX && 'Governance Oversight'}
                {activePillar === Pillar.INTELLIGENCE && 'Neural Intelligence'}
                {activePillar === Pillar.SPACES && 'Asset Telemetry'}
              </h1>
           </div>
           <div className="hidden xl:flex items-center gap-8">
              <div className="text-right">
                <p className="text-xs font-black text-zinc-100 uppercase">Alex Commander</p>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-1">Clearance_L1</p>
              </div>
              <div className="w-14 h-14 bg-zinc-900 rounded-2xl border border-white/10 p-1.5 shadow-lg">
                <img src="https://picsum.photos/seed/executive/100/100" alt="Profile" className="w-full h-full rounded-xl grayscale hover:grayscale-0 transition-all duration-500 cursor-crosshair object-cover" />
              </div>
           </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;