
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
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-sm transition-all duration-500 group ${
      active 
        ? 'bg-white text-black font-bold' 
        : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
    }`}
  >
    <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? 'text-black' : 'group-hover:text-lime'}`} />
    <span className="text-[11px] uppercase tracking-[0.15em] font-bold">{label}</span>
    {active && <div className="ml-auto w-1 h-1 bg-lime rounded-full" />}
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
    className={`flex flex-col items-center gap-1 transition-all duration-300 flex-1 py-1 ${active ? 'text-lime' : 'text-zinc-600'}`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
    {active && <div className="w-1 h-1 bg-lime rounded-full mt-1" />}
  </button>
);

const App: React.FC = () => {
  const [activePillar, setActivePillar] = useState<Pillar>(Pillar.APEX);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
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
    <div className="min-h-screen bg-black flex text-white selection:bg-lime selection:text-black">
      {/* Sidebar - Desktop */}
      <aside className="w-72 border-r border-zinc-900 p-8 flex flex-col glass sticky top-0 h-screen hidden md:flex">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-lime rounded-none flex items-center justify-center">
               <span className="font-black text-black text-lg italic">E</span>
            </div>
            <h1 className="font-black text-xl tracking-tighter uppercase">EOS</h1>
          </div>
          <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-[0.4em] mt-2">Executive Operating System</p>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem 
            pillar={Pillar.APEX} 
            active={activePillar === Pillar.APEX} 
            onClick={() => setActivePillar(Pillar.APEX)} 
            icon={ICONS.Dashboard}
            label="Apex Center"
          />
          <SidebarItem 
            pillar={Pillar.INTELLIGENCE} 
            active={activePillar === Pillar.INTELLIGENCE} 
            onClick={() => setActivePillar(Pillar.INTELLIGENCE)} 
            icon={ICONS.Brain}
            label="Intel Engine"
          />
          <SidebarItem 
            pillar={Pillar.SPACES} 
            active={activePillar === Pillar.SPACES} 
            onClick={() => setActivePillar(Pillar.SPACES)} 
            icon={ICONS.Building}
            label="Physical Ops"
          />
        </nav>

        <div className="mt-auto space-y-8">
           <div className="p-4 border border-zinc-800 bg-zinc-950/50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Core Status</p>
                <div className="w-1.5 h-1.5 bg-lime rounded-full shadow-[0_0_8px_#D9FF00]" />
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-white uppercase tracking-tight">System Optimized</span>
              </div>
           </div>
           <div className="flex justify-between items-center opacity-40">
              <span className="text-[10px] font-mono tracking-tighter">{currentTime}</span>
              <span className="text-[10px] font-mono tracking-tighter">SEC-OK</span>
           </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-t border-zinc-900 px-8 py-4 flex justify-around items-center">
         <MobileNavItem active={activePillar === Pillar.APEX} onClick={() => setActivePillar(Pillar.APEX)} icon={ICONS.Dashboard} label="Apex" />
         <MobileNavItem active={activePillar === Pillar.INTELLIGENCE} onClick={() => setActivePillar(Pillar.INTELLIGENCE)} icon={ICONS.Brain} label="Intel" />
         <MobileNavItem active={activePillar === Pillar.SPACES} onClick={() => setActivePillar(Pillar.SPACES)} icon={ICONS.Building} label="Ops" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 pb-32 md:pb-12 max-w-[1400px] mx-auto w-full overflow-y-auto">
        <div className="mb-10 md:mb-16 flex items-end justify-between border-b border-zinc-900 pb-8">
           <div>
              <p className="text-[10px] font-black text-lime mb-2 uppercase tracking-[0.3em]">
                {activePillar} INTERFACE
              </p>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                {activePillar === Pillar.APEX && 'Global Governance'}
                {activePillar === Pillar.INTELLIGENCE && 'Neural Intelligence'}
                {activePillar === Pillar.SPACES && 'Asset Telemetry'}
              </h1>
           </div>
           <div className="hidden lg:flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-black text-white uppercase">Alex Commander</p>
                <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">L1_ACCESS_SIG</p>
              </div>
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 p-1">
                <img src="https://picsum.photos/seed/executive/80/80" alt="Profile" className="w-full h-full grayscale hover:grayscale-0 transition-all cursor-crosshair" />
              </div>
           </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;