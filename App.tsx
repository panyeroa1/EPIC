
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
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <Icon className="w-5 h-5 shrink-0" />
    <span className="font-semibold text-sm tracking-wide">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
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
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-indigo-400' : 'text-slate-500'}`}
  >
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-indigo-500/10' : ''}`}>
      <Icon className="w-6 h-6" />
    </div>
    <span className="text-[9px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

const App: React.FC = () => {
  const [activePillar, setActivePillar] = useState<Pillar>(Pillar.APEX);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
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
    <div className="min-h-screen bg-[#0f172a] flex text-slate-200 selection:bg-indigo-500/30">
      {/* Sidebar - Desktop Only */}
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col bg-slate-900/40 backdrop-blur-xl sticky top-0 h-screen hidden md:flex">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/30">
             <span className="font-bold text-white text-xl">E</span>
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tighter leading-none">EPIC GROUP</h1>
            <p className="text-[10px] text-indigo-400 font-mono font-bold tracking-[0.2em] mt-1 uppercase">Operating System</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem 
            pillar={Pillar.APEX} 
            active={activePillar === Pillar.APEX} 
            onClick={() => setActivePillar(Pillar.APEX)} 
            icon={ICONS.Dashboard}
            label="APEX Governance"
          />
          <SidebarItem 
            pillar={Pillar.INTELLIGENCE} 
            active={activePillar === Pillar.INTELLIGENCE} 
            onClick={() => setActivePillar(Pillar.INTELLIGENCE)} 
            icon={ICONS.Brain}
            label="Intelligence Engine"
          />
          <SidebarItem 
            pillar={Pillar.SPACES} 
            active={activePillar === Pillar.SPACES} 
            onClick={() => setActivePillar(Pillar.SPACES)} 
            icon={ICONS.Building}
            label="Physical Spaces"
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800 space-y-4">
           <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">System Status</p>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-xs font-semibold text-emerald-400">SEC Synchronized</span>
              </div>
           </div>
           <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-mono text-slate-500">{currentTime}</span>
              <span className="text-[10px] font-mono text-slate-500">v2.4.0-STABLE</span>
           </div>
        </div>
      </aside>

      {/* Mobile Nav - Fixed Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 px-6 py-3 flex justify-around items-center shadow-[0_-8px_30px_rgb(0,0,0,0.5)]">
         <MobileNavItem 
          active={activePillar === Pillar.APEX} 
          onClick={() => setActivePillar(Pillar.APEX)} 
          icon={ICONS.Dashboard} 
          label="Apex" 
         />
         <MobileNavItem 
          active={activePillar === Pillar.INTELLIGENCE} 
          onClick={() => setActivePillar(Pillar.INTELLIGENCE)} 
          icon={ICONS.Brain} 
          label="Intel" 
         />
         <MobileNavItem 
          active={activePillar === Pillar.SPACES} 
          onClick={() => setActivePillar(Pillar.SPACES)} 
          icon={ICONS.Building} 
          label="Spaces" 
         />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 pb-28 md:pb-10 max-w-7xl mx-auto w-full overflow-y-auto">
        <div className="mb-6 md:mb-12 flex items-center justify-between">
           <div className="block">
              <p className="text-[10px] md:text-sm font-semibold text-indigo-400/80 mb-1 uppercase tracking-widest md:normal-case md:tracking-normal">
                Command Interface
              </p>
              <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight">
                {activePillar === Pillar.APEX && 'Apex Overview'}
                {activePillar === Pillar.INTELLIGENCE && 'Intel Center'}
                {activePillar === Pillar.SPACES && 'Telemetry Hub'}
              </h1>
           </div>
           <div className="flex items-center gap-3 bg-slate-900/60 p-1 pr-3 md:pr-4 rounded-full border border-slate-800 shadow-xl">
              <img src="https://picsum.photos/seed/executive/40/40" alt="Profile" className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-slate-700" />
              <div className="hidden sm:block">
                <p className="text-[10px] md:text-xs font-bold text-slate-200 leading-none">Alex Commander</p>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-tighter">Clearance: L1</p>
              </div>
           </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;
