
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
  <div className={`border-b border-zinc-800 transition-all duration-500 ${isOpen ? 'bg-zinc-900/30' : ''}`}>
    <button 
      onClick={onToggle}
      className="w-full py-4 md:py-5 flex items-center justify-between text-left px-3 md:px-4 group"
    >
      <div className="flex items-center gap-3 md:gap-4">
        <div className={`transition-colors duration-300 ${isOpen ? 'text-lime' : 'text-zinc-500 group-hover:text-white'}`}>
          {icon}
        </div>
        <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isOpen ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{title}</span>
      </div>
      <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-lime scale-125' : 'bg-zinc-800'}`} />
    </button>
    
    {isOpen && (
      <div className="px-6 md:px-12 pb-6 md:pb-8 animate-in slide-in-from-top-4 duration-500">
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 md:gap-4 text-[11px] md:text-xs text-zinc-400 leading-relaxed group/item">
              <span className="text-lime font-mono text-[8px] md:text-[9px] mt-0.5 shrink-0">[{idx + 1}]</span>
              <span className="group-hover/item:text-white transition-colors">{item}</span>
            </li>
          ))}
          {items.length === 0 && <li className="text-[8px] md:text-[9px] text-zinc-600 font-mono uppercase italic tracking-widest">Vector Zero: No Data Detected</li>}
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
    const phases = ["INITIALIZING", "NEURAL_OCR", "LEGAL_HEURISTICS", "SEC_SYNC", "GOV_ALIGNMENT", "SUMMARIZING"];
    if (loading) {
      setProgress(0);
      setProcessingPhase(phases[0]);
      let currentPhaseIdx = 0;
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) return prev + Math.random() * 8;
          if (prev < 99) return prev + 0.5;
          return prev;
        });
        if (Math.random() > 0.7 && currentPhaseIdx < phases.length - 1) {
          currentPhaseIdx++;
          setProcessingPhase(phases[currentPhaseIdx]);
        }
      }, 400);
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
      else { setError("NEURAL_ENGINE_FAILURE: LINK INTERRUPTED"); }
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
    <div className="space-y-8 md:space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Ingestion Zone */}
        <section className="bg-zinc-950 border border-zinc-900 rounded-none p-5 md:p-8 space-y-6 md:space-y-8 flex flex-col min-h-[400px] md:min-h-[500px] relative">
          <div className="flex items-center gap-3">
            <ICONS.Shield className="w-4 h-4 md:w-5 md:h-5 text-lime" />
            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Secure Data Node</h3>
          </div>
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 border border-zinc-900 flex flex-col items-center justify-center p-6 md:p-10 transition-all cursor-pointer group hover:bg-zinc-900/40 relative ${fileName ? 'bg-lime/5' : ''}`}
          >
            {loading && (
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                 <div className="w-full h-[2px] bg-lime absolute top-0 animate-[scan_1.5s_linear_infinite] shadow-[0_0_15px_#D9FF00]" />
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".txt,image/*" />
            
            {!fileName ? (
              <div className="text-center space-y-4 md:space-y-6">
                <div className="w-12 h-12 md:w-16 md:h-16 border border-zinc-800 flex items-center justify-center mx-auto group-hover:border-lime transition-colors">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-zinc-500 group-hover:text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest">Mount Intelligence Asset</h4>
                  <p className="text-[8px] md:text-[10px] text-zinc-600 mt-2 font-mono">SUPPORTED: TXT_UTF8, JPG_RAW, PNG_ALPHA</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 md:space-y-6 animate-in zoom-in-95 duration-500">
                <div className="text-lime">
                   <ICONS.Brain className={`w-10 h-10 md:w-12 md:h-12 mx-auto ${loading ? 'animate-pulse' : ''}`} />
                </div>
                <h4 className="text-white font-black text-xs md:text-sm uppercase italic tracking-tighter px-4 truncate max-w-full">{fileName}</h4>
                {!loading && (
                  <button onClick={(e) => { e.stopPropagation(); setFileName(null); setAnalysis(null); }} className="text-[8px] md:text-[10px] font-black text-zinc-600 hover:text-white uppercase tracking-widest transition-colors">Terminate Ingestion</button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Intelligence Matrix Output */}
        <section className="bg-black border border-zinc-900 rounded-none flex flex-col min-h-[400px] md:min-h-[500px]">
          <div className="p-5 md:p-8 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ICONS.Brain className="w-4 h-4 md:w-5 md:h-5 text-lime" />
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Matrix Engine</h3>
            </div>
            {analysis && <div className="text-[8px] md:text-[9px] font-mono text-zinc-600">STATE: OUTPUT_READY</div>}
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 space-y-8 md:space-y-12">
                <div className="w-full max-w-[280px] md:max-w-[300px] space-y-8 md:space-y-10">
                  <div className="relative h-[2px] w-full bg-zinc-900">
                    <div className="absolute top-0 left-0 h-full bg-lime" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[9px] md:text-[10px] font-black text-white italic tracking-widest">{processingPhase}</p>
                      <p className="text-[7px] md:text-[8px] text-zinc-600 font-mono">NEURAL_VPC_PROCESSING</p>
                    </div>
                    <span className="text-2xl md:text-3xl font-black text-lime italic">{Math.floor(progress)}%</span>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 md:p-12 space-y-4 md:space-y-6">
                <p className="text-[10px] md:text-xs text-rose-500 font-black uppercase tracking-[0.2em]">{error}</p>
                <button onClick={() => {setFileName(null); setLoading(false); setError(null);}} className="text-[8px] md:text-[9px] text-zinc-600 underline uppercase tracking-widest">Hard Reset System</button>
              </div>
            ) : analysis ? (
              <div className="animate-in fade-in duration-700">
                <div className="p-5 md:p-8 bg-white text-black mb-0">
                   <h4 className="text-[8px] md:text-[9px] font-black uppercase mb-3 md:mb-4 tracking-[0.3em]">Executive Summary_</h4>
                   <p className="text-[12px] md:text-sm font-bold leading-relaxed">{analysis.summary}</p>
                </div>
                <AccordionSection title="Compliance Issues" items={analysis.complianceIssues} icon={<ICONS.Shield className="w-3 h-3 md:w-4 md:h-4" />} isOpen={openSection === 'compliance'} onToggle={() => setOpenSection(openSection === 'compliance' ? null : 'compliance')} />
                <AccordionSection title="Regulatory Risks" items={analysis.regulatoryRisks} icon={<ICONS.Dashboard className="w-3 h-3 md:w-4 md:h-4" />} isOpen={openSection === 'risks'} onToggle={() => setOpenSection(openSection === 'risks' ? null : 'risks')} />
                <AccordionSection title="Suggested Actions" items={analysis.suggestedActions} icon={<svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>} isOpen={openSection === 'actions'} onToggle={() => setOpenSection(openSection === 'actions' ? null : 'actions')} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-10 p-12">
                <ICONS.Brain className="w-16 h-16 md:w-20 md:h-20 text-zinc-500 mb-6" />
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-center">Node Standby</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <style>{`
        @keyframes scan { 
          0% { top: 0%; opacity: 0; } 
          10% { opacity: 1; } 
          90% { opacity: 1; } 
          100% { top: 100%; opacity: 0; } 
        }
      `}</style>
    </div>
  );
};

export default Intelligence;
