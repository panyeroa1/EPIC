
import React, { useState, useRef, useEffect } from 'react';
import { analyzeDocument, analyzeImageDocument } from '../services/geminiService';
import { ICONS } from '../constants';

interface AnalysisData {
  complianceIssues: string[];
  regulatoryRisks: string[];
  suggestedActions: string[];
  summary: string;
}

interface ComplianceItem {
  id: string;
  label: string;
  checked: boolean;
  description: string;
}

const AccordionSection: React.FC<{
  title: string;
  items: string[];
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  accentColor: string;
}> = ({ title, items, icon, isOpen, onToggle, accentColor }) => (
  <div className={`border border-slate-800 rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'bg-slate-900/40 ring-1 ring-inset ' + accentColor : 'bg-slate-950/50'}`}>
    <button 
      onClick={onToggle}
      className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-md bg-slate-900 border border-slate-800 ${isOpen ? 'text-white' : 'text-slate-400'}`}>
          {icon}
        </div>
        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${isOpen ? 'text-white' : 'text-slate-400'}`}>{title}</span>
      </div>
      <svg 
        className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    {isOpen && (
      <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
        <ul className="space-y-3 mt-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-slate-300 leading-relaxed group">
              <span className="text-indigo-500/50 mt-1 shrink-0 font-bold text-[10px]">0{idx + 1}</span>
              <span className="group-hover:text-white transition-colors">{item}</span>
            </li>
          ))}
          {items.length === 0 && <li className="text-[10px] text-slate-600 italic uppercase font-mono">No entries identified in this vector.</li>}
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

  const [checklist, setChecklist] = useState<ComplianceItem[]>([
    { id: 'permit', label: 'Permit Approved', checked: false, description: 'LGU Building/Operational Permit verified.' },
    { id: 'indemnity', label: 'Indemnity Signed', checked: false, description: 'Legal liability waiver executed by all parties.' },
    { id: 'sec', label: 'SEC Filing Active', checked: false, description: 'Corporate entity status cleared with SEC.' },
    { id: 'lgu', label: 'LGU Clearance', checked: false, description: 'Barangay and local government health/safety clearance.' },
  ]);

  useEffect(() => {
    let interval: any;
    const phases = [
      "Initializing CDP Protocol...",
      "Extracting OCR Neural Data...",
      "Mapping Legal Heuristics...",
      "Cross-referencing SEC Standards...",
      "Simulating LGU Codes...",
      "Finalizing Executive Summary..."
    ];

    if (loading) {
      setProgress(0);
      setProcessingPhase(phases[0]);
      let currentPhaseIdx = 0;

      interval = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) return prev + Math.random() * 5;
          if (prev < 98) return prev + 0.5;
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
    setLoading(true);
    setAnalysis(null);
    setError(null);

    const reader = new FileReader();

    const processResult = (result: any) => {
      if (result) {
        setAnalysis(result);
        setOpenSection('compliance');
      } else {
        setError("Analysis engine failure. Check API keys.");
      }
      setLoading(false);
    };

    if (file.type.startsWith('image/')) {
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const result = await analyzeImageDocument(base64, file.type, "EPIC Group SEC Compliance Standards");
        processResult(result);
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      reader.onload = async (event) => {
        const text = event.target?.result as string;
        const result = await analyzeDocument(text, "EPIC Group SEC Compliance Standards");
        processResult(result);
      };
      reader.readAsText(file);
    } else {
      setError("Unsupported format. Use TXT or Images.");
      setLoading(false);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const resetIngestion = () => {
    setFileName(null);
    setAnalysis(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isFullyCompliant = checklist.filter(i => i.checked).length === checklist.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingestion Zone */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 space-y-4 flex flex-col min-h-[400px] md:h-[540px] relative overflow-hidden">
          <div className="flex items-center gap-2 text-indigo-400">
            <ICONS.Shield className="w-5 h-5" />
            <h3 className="font-semibold text-slate-200">Secure Data Ingestion</h3>
          </div>
          
          <div 
            onClick={triggerUpload}
            className={`flex-1 min-h-[250px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all cursor-pointer group relative overflow-hidden ${
              fileName ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50 shadow-inner'
            }`}
          >
            {loading && (
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                 <div className="w-full h-1 bg-indigo-500/50 absolute top-0 animate-[scan_2s_linear_infinite] shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                 <style>{`@keyframes scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }`}</style>
              </div>
            )}

            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".txt,image/*" />
            
            {!fileName ? (
              <div className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform border border-slate-700">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-sm md:text-base">Ingest Asset</h4>
                <p className="text-[10px] md:text-xs text-slate-500 mt-2 leading-relaxed">Drop TXT or JPG/PNG<br/>for autonomous scan.</p>
              </div>
            ) : (
              <div className="text-center animate-in zoom-in-95 duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className={`w-6 h-6 md:w-8 md:h-8 text-indigo-400 ${loading ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold truncate max-w-[200px] md:max-w-[240px] px-4 text-xs md:text-sm mx-auto">{fileName}</h4>
                <p className="text-[9px] md:text-[10px] text-indigo-400 mt-2 uppercase tracking-[0.2em] font-black">
                  {loading ? 'Processing...' : 'Asset Ready'}
                </p>
                {!loading && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); resetIngestion(); }}
                    className="mt-6 px-4 py-2 text-[10px] md:text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                  >
                    Replace Asset
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="bg-slate-950/50 rounded-lg p-3 md:p-4 border border-slate-800">
            <h5 className="text-[9px] md:text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <ICONS.Shield className="w-3 h-3" />
              Privacy Protocol
            </h5>
            <p className="text-[9px] md:text-[10px] text-slate-500 leading-relaxed italic">
              Encrypted VPC processing. Data isolation strictly enforced. AICPA SOC 2.
            </p>
          </div>
        </section>

        {/* Matrix Output */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 flex flex-col h-[500px] md:h-[540px]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-indigo-400">
              <ICONS.Brain className="w-5 h-5" />
              <h3 className="font-semibold text-slate-200">Intelligence Matrix</h3>
            </div>
            {analysis && (
               <button className="text-[9px] font-bold text-slate-500 hover:text-indigo-400 uppercase tracking-widest border border-slate-800 px-2 py-1.5 rounded transition-colors">
                 Audit Log
               </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-[240px] space-y-8">
                  <div className="relative h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="text-center space-y-4">
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-6 h-6 border-2 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
                      <span className="text-xl font-mono font-bold text-indigo-400">{Math.floor(progress)}%</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-tight animate-pulse">{processingPhase}</p>
                      <p className="text-[8px] text-slate-600 font-mono mt-1 tracking-widest uppercase">Matching SEC Heuristics...</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-10 h-10 text-rose-500/30">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <p className="text-xs text-rose-400 font-medium">{error}</p>
                <button onClick={resetIngestion} className="text-[10px] text-slate-500 underline uppercase tracking-widest font-bold">Restart Ingestion</button>
              </div>
            ) : analysis ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                   <h4 className="text-[9px] font-bold text-indigo-400 uppercase mb-2 tracking-widest">Executive Summary</h4>
                   <p className="text-xs md:text-sm text-slate-300 leading-relaxed italic">"{analysis.summary}"</p>
                </div>
                <AccordionSection title="Compliance Issues" items={analysis.complianceIssues} accentColor="ring-amber-500/20" icon={<svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} isOpen={openSection === 'compliance'} onToggle={() => setOpenSection(openSection === 'compliance' ? null : 'compliance')} />
                <AccordionSection title="Regulatory Risks" items={analysis.regulatoryRisks} accentColor="ring-rose-500/20" icon={<ICONS.Shield className="w-4 h-4 text-rose-500" />} isOpen={openSection === 'risks'} onToggle={() => setOpenSection(openSection === 'risks' ? null : 'risks')} />
                <AccordionSection title="Suggested Actions" items={analysis.suggestedActions} accentColor="ring-indigo-500/20" icon={<svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>} isOpen={openSection === 'actions'} onToggle={() => setOpenSection(openSection === 'actions' ? null : 'actions')} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-3 opacity-30">
                <div className="w-14 h-14 md:w-16 md:h-16 border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center">
                  <ICONS.Brain className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Idle Matrix</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Manual Checklist */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 animate-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <ICONS.Shield className="w-5 h-5" />
            <h3 className="font-bold tracking-tight text-slate-200">Governance Framework</h3>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-colors text-center ${isFullyCompliant ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
            Registry: {checklist.filter(i => i.checked).length} / {checklist.length} Validated
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {checklist.map((item) => (
            <div 
              key={item.id} 
              onClick={() => { setChecklist(prev => prev.map(i => i.id === item.id ? { ...i, checked: !i.checked } : i)); }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 group ${item.checked ? 'bg-emerald-500/5 border-emerald-500/30 shadow-lg shadow-emerald-900/10' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-wide transition-colors ${item.checked ? 'text-emerald-400' : 'text-slate-500'}`}>{item.label}</span>
                <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-800 group-hover:border-slate-600'}`}>
                  {item.checked && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
              </div>
              <p className="text-[10px] text-slate-600 leading-tight group-hover:text-slate-500 transition-colors">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate RAG */}
      <div className="bg-slate-950/30 border border-slate-800/50 rounded-xl p-5 md:p-6 overflow-hidden">
        <header className="flex items-center justify-between mb-5">
           <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Corporate RAG Matrix</h4>
           <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter">4 Active Sources</span>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {[{ name: 'SOP_Legal_2024.pdf', size: '2.4 MB' }, { name: 'LGU_Codes_v2.doc', size: '1.1 MB' }, { name: 'SEC_Guidelines.pdf', size: '4.8 MB' }, { name: 'Group_Master.reg', size: '0.4 MB' }].map((item) => (
             <div key={item.name} className="p-3 bg-slate-900/50 border border-slate-800/80 rounded-lg flex flex-col gap-1 hover:border-indigo-500/30 hover:bg-slate-900 cursor-pointer transition-all group">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-indigo-500/40 rounded-full group-hover:bg-indigo-400 transition-colors" />
                 <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200 truncate transition-colors">{item.name}</span>
               </div>
               <span className="text-[9px] text-slate-700 font-mono ml-3.5">{item.size}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Intelligence;
