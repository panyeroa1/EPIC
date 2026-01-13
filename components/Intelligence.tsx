
import React, { useState, useRef, useEffect } from 'react';
import { analyzeDocument, analyzeImageDocument } from '../services/geminiService';
import { ICONS } from '../constants';

interface AnalysisData {
  complianceIssues: string[];
  regulatoryRisks: string[];
  suggestedActions: string[];
  summary: string;
}

const AccordionSection: React.FC<{
  title: string;
  items: string[];
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, items, icon, isOpen, onToggle }) => (
  <div className={`border-b border-zinc-900/40 transition-all duration-500 ${isOpen ? 'bg-zinc-900/30' : 'hover:bg-zinc-925/50'}`}>
    <button 
      onClick={onToggle}
      className="w-full py-5 md:py-6 flex items-center justify-between text-left px-4 md:px-8 group"
    >
      <div className="flex items-center gap-4 md:gap-6">
        <div className={`transition-colors duration-400 ${isOpen ? 'text-lime scale-110' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
          {icon}
        </div>
        <span className={`text-[11px] md:text-[13px] font-bold uppercase tracking-widest transition-colors ${isOpen ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'}`}>{title}</span>
      </div>
      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-lime shadow-[0_0_10px_#D9FF00]' : 'bg-zinc-800'}`} />
    </button>
    
    {isOpen && (
      <div className="px-8 md:px-20 pb-8 md:pb-12 animate-in slide-in-from-top-6 duration-600">
        <ul className="space-y-5">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-4 md:gap-5 text-sm text-zinc-400 leading-relaxed group/item">
              <span className="text-lime font-mono text-[10px] mt-1 shrink-0 font-bold">0{idx + 1}</span>
              <span className="group-hover/item:text-zinc-100 transition-colors font-light">{item}</span>
            </li>
          ))}
          {items.length === 0 && <li className="text-[10px] text-zinc-600 font-mono uppercase italic tracking-widest">Vector Zero: System Normal</li>}
        </ul>
      </div>
    )}
  </div>
);

const Intelligence: React.FC = () => {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingPhase, setProcessingPhase] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>('compliance');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: any;
    const phases = ["SYS_INIT", "NEURAL_OCR", "LEGAL_MAP", "SEC_SYNC", "GOV_ALIGN", "FINALIZING"];
    if (loading) {
      setProgress(0);
      setProcessingPhase(phases[0]);
      let currentPhaseIdx = 0;
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) return prev + Math.random() * 6;
          if (prev < 99) return prev + 0.3;
          return prev;
        });
        if (Math.random() > 0.8 && currentPhaseIdx < phases.length - 1) {
          currentPhaseIdx++;
          setProcessingPhase(phases[currentPhaseIdx]);
        }
      }, 500);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setLoading(true); setAnalysis(null); setError(null);
    const reader = new FileReader();
    const processResult = (result: any) => {
      if (result) { setAnalysis(result); setOpenSection('compliance'); }
      else { setError("LINK_FAILURE: NEURAL CORE DISCONNECTED"); }
      setLoading(false);
    };
    if (file.type.startsWith('image/')) {
      reader.onload = async (event) => {
        const result = await analyzeImageDocument(event.target?.result as string, file.type, "EPIC_SEC_STD_2024");
        processResult(result);
      }; reader.readAsDataURL(file);
    } else {
      reader.onload = async (event) => {
        const result = await analyzeDocument(event.target?.result as string, "EPIC_SEC_STD_2024");
        processResult(result);
      }; reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-10 md:space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        {/* Ingestion Node */}
        <section className="bg-zinc-925 border border-white/5 rounded-3xl p-8 md:p-12 space-y-8 md:space-y-12 flex flex-col min-h-[450px] md:min-h-[550px] relative ios-shadow">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
              <ICONS.Shield className="w-5 h-5 text-lime" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">Analysis Ingress</h3>
              <p className="text-[10px] text-zinc-600 font-mono mt-0.5">SECURE_LINK_ENCRYPTED</p>
            </div>
          </div>
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 border-2 border-dashed border-zinc-800/60 bg-zinc-950/40 rounded-3xl flex flex-col items-center justify-center p-8 md:p-12 transition-all duration-500 cursor-pointer group hover:bg-zinc-900/30 relative overflow-hidden ${fileName ? 'bg-lime/5 border-lime/30' : 'hover:border-lime/30'}`}
          >
            {loading && (
              <div className="absolute inset-0 pointer-events-none z-10">
                 <div className="w-full h-1 bg-lime absolute top-0 animate-[scan_2s_linear_infinite] shadow-[0_0_25px_#D9FF00]" />
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".txt,image/*" />
            
            {!fileName ? (
              <div className="text-center space-y-6 md:space-y-8">
                <div className="w-16 h-16 md:w-20 md:h-20 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto group-hover:border-lime group-hover:scale-105 transition-all duration-500">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-zinc-600 group-hover:text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-zinc-100 font-black text-xs md:text-sm uppercase tracking-widest">Deploy Data Asset</h4>
                  <p className="text-[10px] md:text-xs text-zinc-600 mt-3 font-medium px-4">Upload documents for neural compliance validation</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6 md:space-y-8 animate-in zoom-in-95 duration-500">
                <div className="text-lime drop-shadow-[0_0_15px_rgba(217,255,0,0.4)]">
                   <ICONS.Brain className={`w-12 h-12 md:w-16 md:h-16 mx-auto ${loading ? 'animate-pulse' : ''}`} />
                </div>
                <h4 className="text-white font-black text-sm md:text-base uppercase italic tracking-tighter px-6 truncate max-w-full">{fileName}</h4>
                {!loading && (
                  <button onClick={(e) => { e.stopPropagation(); setFileName(null); setAnalysis(null); }} className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors py-2 px-6 border border-zinc-800 rounded-full hover:border-zinc-700">Detach Asset</button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Results Matrix */}
        <section className="bg-zinc-925/90 border border-white/5 rounded-3xl flex flex-col min-h-[450px] md:min-h-[550px] ios-shadow backdrop-blur-xl">
          <div className="p-8 md:p-12 border-b border-zinc-900/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <ICONS.Brain className="w-5 h-5 text-lime" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">Neural Insights</h3>
                <p className="text-[10px] text-zinc-600 font-mono mt-0.5">PROCESSING_CORE_STABLE</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center p-12 space-y-12">
                <div className="w-full max-w-[300px] space-y-12">
                  <div className="relative h-[3px] w-full bg-zinc-900 rounded-full">
                    <div className="absolute top-0 left-0 h-full bg-lime rounded-full shadow-[0_0_12px_#D9FF00]" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-black text-zinc-100 tracking-widest uppercase">{processingPhase}</p>
                      <p className="text-[8px] text-zinc-600 font-mono uppercase tracking-tighter">VPC_TUNNELING_ACTIVE</p>
                    </div>
                    <span className="text-4xl font-black text-lime italic tracking-tighter">{Math.floor(progress)}%</span>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
                <p className="text-xs text-rose-500 font-black uppercase tracking-widest">{error}</p>
                <button onClick={() => {setFileName(null); setLoading(false); setError(null);}} className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest border-b border-zinc-800 pb-1 hover:text-white">Emergency Reset</button>
              </div>
            ) : analysis ? (
              <div className="animate-in fade-in duration-800">
                <div className="p-8 md:p-12 bg-white text-black mb-0 rounded-none">
                   <h4 className="text-[10px] font-black uppercase mb-4 tracking-[0.4em] opacity-40">Executive Summary_</h4>
                   <p className="text-base md:text-lg font-bold leading-snug tracking-tight">{analysis.summary}</p>
                </div>
                <AccordionSection title="Compliance Map" items={analysis.complianceIssues} icon={<ICONS.Shield className="w-4 h-4" />} isOpen={openSection === 'compliance'} onToggle={() => setOpenSection(openSection === 'compliance' ? null : 'compliance')} />
                <AccordionSection title="Risk Matrix" items={analysis.regulatoryRisks} icon={<ICONS.Dashboard className="w-4 h-4" />} isOpen={openSection === 'risks'} onToggle={() => setOpenSection(openSection === 'risks' ? null : 'risks')} />
                <AccordionSection title="Action Vectors" items={analysis.suggestedActions} icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>} isOpen={openSection === 'actions'} onToggle={() => setOpenSection(openSection === 'actions' ? null : 'actions')} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 p-12">
                <ICONS.Brain className="w-20 h-20 text-zinc-700 mb-8" />
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-center text-zinc-600">Cognitive Hub Idle</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <style>{`
        @keyframes scan { 
          0% { top: 0%; opacity: 0; } 
          15% { opacity: 1; } 
          85% { opacity: 1; } 
          100% { top: 100%; opacity: 0; } 
        }
      `}</style>
    </div>
  );
};

export default Intelligence;