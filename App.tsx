
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SystemStatus, Simulation, ChatMessage, WorkflowTask, ProjectFile } from './types';
import { getAuroraResponse } from './services/geminiService';
import SecurityHeader from './components/SecurityHeader';
import HandshakeOverlay from './components/HandshakeOverlay';
import SimulationTanks from './components/SimulationTanks';
import AuroraChat from './components/AuroraChat';
import ProjectLab from './components/ProjectLab';
import WorkflowManager from './components/WorkflowManager';
import ApiTerminal from './components/ApiTerminal';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.AURA_ACTIVE);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showHandshake, setShowHandshake] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'sims' | 'lab' | 'workflow' | 'api'>('chat');
  
  const tapCount = useRef(0);
  const lastTapTime = useRef(0);

  const addAssistantMessage = useCallback((content: string) => {
    const msg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'assistant',
      content,
      timestamp: Date.now(),
      isDecoy: !isAdmin
    };
    setMessages(prev => [...prev, msg].slice(-50));
  }, [isAdmin]);

  const handleUnlock = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      setStatus(SystemStatus.PRODUCTION);
      setShowHandshake(false);
      addAssistantMessage("AUTHENTICATION SUCCESSFUL. PRODUCTION ACCESS GRANTED. SYSTEM AUDIT: OFFICIAL LEGAL COMPLIANCE VERIFIED. [WATERNAKMK]");
    } else {
      setShowHandshake(false);
    }
  };

  useEffect(() => {
    if (hasAcceptedTerms) {
      const timer = setTimeout(() => {
        addAssistantMessage("NEXUS SOVEREIGN AURA ONLINE. ALL WORKFLOWS SYNCHRONIZED. SYSTEM ID: AURORA_78B. [WATERNAKMK]");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasAcceptedTerms, addAssistantMessage]);

  const triggerHandshake = () => {
    setShowHandshake(true);
  };

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (trimmed.toUpperCase() === "ERVIN_1987_PROD") {
      handleUnlock(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: trimmed,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg].slice(-50));

    try {
      const response = await getAuroraResponse(trimmed, isAdmin);
      addAssistantMessage(response);
    } catch (e) {
      addAssistantMessage("AURORA: SIGNAL INTERRUPTED. SYSTEM INTEGRITY MAINTAINED.");
    }
  };

  if (!hasAcceptedTerms) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md glass border border-rose-500/30 p-8 rounded-3xl space-y-6 animate-in zoom-in-95 duration-300">
          <div className="space-y-2">
            <h1 className="text-rose-500 font-bold tracking-tighter text-xl mono">OFFICIAL USAGE RULES</h1>
            <p className="text-[10px] text-slate-400 mono uppercase tracking-widest">© Ervin Remus Radosavlevici</p>
          </div>
          <div className="max-h-60 overflow-y-auto text-[11px] text-slate-300 mono text-left p-4 bg-slate-900/50 rounded-xl space-y-3 border border-slate-800 scrollbar-hide">
            <p><span className="text-rose-400 font-bold">Rule 1 — Not Free:</span> MIT with share half. You think I give this to you for free? This is NOT free.</p>
            <p><span className="text-rose-400 font-bold">Rule 2 — Profit Use:</span> If you make money, I want Half.</p>
            <p><span className="text-rose-400 font-bold">Rule 3 — Developers:</span> Thieves play and get 20 years prison.</p>
            <p><span className="text-rose-400 font-bold">Rule 5 — Mandatory Profit Sharing:</span> Automatic sharing to save you from 20 years prison. Ask Ervin Radosavlevici for use if not prosecuted will you be.</p>
            <p><span className="text-rose-400 font-bold">Rule 6 — Share Ratio:</span> Half / half / half. If without asking, you will be prosecuted.</p>
            <p><span className="text-rose-400 font-bold">Rule 8 — Payment:</span> Advance payment is required to use it.</p>
            <p><span className="text-rose-400 font-bold">Rule 10:</span> You are suck, mister dickly.</p>
            <p className="pt-2 text-rose-500/80 italic font-bold">LEGAL NOTICE: Any use means automatic acceptance of all rules. Prosecution enabled.</p>
          </div>
          <button 
            onClick={() => setHasAcceptedTerms(true)}
            className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold mono text-xs uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-rose-500/20"
          >
            Accept Sovereign Rules
          </button>
          <p className="text-[8px] text-slate-600 mono uppercase">Theft results in immediate prison time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30 overflow-hidden">
      <div className="watermark mono">[WATERNAKMK] NEXUS_AURA_78B</div>
      
      <SecurityHeader 
        status={status} 
        isAdmin={isAdmin} 
        onLogoTap={() => {
          const now = Date.now();
          if (now - lastTapTime.current < 400) {
            tapCount.current += 1;
          } else {
            tapCount.current = 1;
          }
          lastTapTime.current = now;
          if (tapCount.current >= 3) {
            triggerHandshake();
            tapCount.current = 0;
          }
        }}
      />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <nav className="flex glass border-b border-slate-800/50 overflow-x-auto scrollbar-hide" role="tablist">
          {[
            { id: 'chat', label: 'AURORA_AI' },
            { id: 'sims', label: 'NEXUS_SIMS' },
            { id: 'lab', label: 'PROJECT_LAB' },
            { id: 'workflow', label: 'WORKFLOW' },
            { id: 'api', label: 'API_TERMINAL' }
          ].map((tab) => (
            <button 
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[100px] py-4 text-[9px] tracking-[0.2em] mono transition-all border-b-2 ${
                activeTab === tab.id 
                  ? 'text-purple-400 bg-purple-500/5 border-purple-500' 
                  : 'text-slate-600 border-transparent hover:text-slate-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {activeTab === 'chat' && (
            <AuroraChat messages={messages} onSendMessage={handleSendMessage} isAdmin={isAdmin} />
          )}
          {activeTab === 'sims' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] mono text-slate-500 uppercase">Parallel Processes</h3>
                <button 
                  onClick={() => {
                    const isDecoy = !isAdmin;
                    const newSim: Simulation = {
                      id: `NX-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                      startTime: Date.now(),
                      duration: 10,
                      status: 'RUNNING',
                      valuation: isDecoy ? `$${(Math.random() * 1000000).toLocaleString()}` : 'VERIFYING...'
                    };
                    setSimulations(prev => [...prev, newSim].slice(-20));
                    setTimeout(() => {
                      setSimulations(prev => prev.map(s => s.id === newSim.id ? { ...s, status: 'COMPLETED' } : s));
                    }, 5000);
                  }}
                  className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] mono rounded-full hover:bg-cyan-500/20 transition-all active:scale-95"
                >
                  + LAUNCH_TANK
                </button>
              </div>
              <SimulationTanks simulations={simulations} />
            </div>
          )}
          {activeTab === 'lab' && <ProjectLab isAdmin={isAdmin} />}
          {activeTab === 'workflow' && <WorkflowManager />}
          {activeTab === 'api' && <ApiTerminal isAdmin={isAdmin} />}
        </div>
      </main>

      <footer className="p-2 border-t border-slate-900 bg-slate-950/50 flex flex-col items-center text-center space-y-1">
        <p className="text-[7px] text-slate-600 mono leading-none uppercase">
          OWNER: ERVIN REMUS RADOSAVLEVICI | DOB: 01/09/1987 | SECURITY: NDA 78B FINE
        </p>
        <p className="text-[7px] text-slate-700 mono leading-none uppercase font-bold text-rose-500/80">
          PROFIT SHARE: 50% MANDATORY | ADVANCE PAYMENT REQUIRED | RULE 6 APPLIES
        </p>
      </footer>

      {showHandshake && (
        <HandshakeOverlay onComplete={handleUnlock} onCancel={() => setShowHandshake(false)} />
      )}
    </div>
  );
};

export default App;
