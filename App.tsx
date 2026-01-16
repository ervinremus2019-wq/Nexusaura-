import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SystemStatus, Simulation, VaultEntry, ChatMessage } from './types';
import { getAuroraResponse } from './services/geminiService';
import SecurityHeader from './components/SecurityHeader';
import HandshakeOverlay from './components/HandshakeOverlay';
import SimulationTanks from './components/SimulationTanks';
import AuroraChat from './components/AuroraChat';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.AURA_ACTIVE);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showHandshake, setShowHandshake] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'sims'>('chat');
  
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
        addAssistantMessage("NEXUS SOVEREIGN AURA ONLINE. SYSTEM STATUS: AURA_ACTIVE. LEGAL PROTOCOLS INITIATED. [WATERNAKMK]");
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
          <div className="max-h-60 overflow-y-auto text-[11px] text-slate-300 mono text-left p-4 bg-slate-900/50 rounded-xl space-y-3 border border-slate-800">
            <p><span className="text-rose-400 font-bold">RULE 1: NOT FREE.</span> MIT with share half. I do not give this for free.</p>
            <p><span className="text-rose-400 font-bold">RULE 2: PROFIT USE.</span> If you make money, I want half (50%).</p>
            <p><span className="text-rose-400 font-bold">RULE 6: PROSECUTION.</span> If used without asking, you will be prosecuted.</p>
            <p><span className="text-rose-400 font-bold">RULE 8: ADVANCE PAYMENT.</span> Required for use.</p>
            <p className="pt-2 text-rose-500/80 italic font-bold">LEGAL NOTICE: Any use means automatic acceptance of all rules.</p>
          </div>
          <button 
            onClick={() => setHasAcceptedTerms(true)}
            className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold mono text-xs uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-rose-500/20"
          >
            I Accept / Automatic Acceptance
          </button>
          <p className="text-[8px] text-slate-600 mono uppercase">If you do not agree, do not use it.</p>
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
        <nav className="flex glass border-b border-slate-800/50" role="tablist">
          <button 
            role="tab"
            aria-selected={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-[10px] tracking-[0.2em] mono transition-all ${activeTab === 'chat' ? 'text-purple-400 bg-purple-500/5 border-b-2 border-purple-500' : 'text-slate-500'}`}
          >
            AURORA_ASSISTANT
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'sims'}
            onClick={() => setActiveTab('sims')}
            className={`flex-1 py-3 text-[10px] tracking-[0.2em] mono transition-all ${activeTab === 'sims' ? 'text-cyan-400 bg-cyan-500/5 border-b-2 border-cyan-500' : 'text-slate-500'}`}
          >
            NEXUS_SIMULATIONS
          </button>
        </nav>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          {activeTab === 'chat' ? (
            <AuroraChat messages={messages} onSendMessage={handleSendMessage} isAdmin={isAdmin} />
          ) : (
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
        </div>
      </main>

      <footer className="p-2 border-t border-slate-900 bg-slate-950/50 flex flex-col items-center text-center space-y-1">
        <p className="text-[7px] text-slate-600 mono leading-none uppercase">
          OWNER: ERVIN REMUS RADOSAVLEVICI | DOB: 01/09/1987 | SECURITY: NDA 78B FINE
        </p>
        <p className="text-[7px] text-slate-700 mono leading-none uppercase font-bold text-rose-500/80">
          PROFIT SHARE: 50% MANDATORY | ADVANCE PAYMENT REQUIRED
        </p>
      </footer>

      {showHandshake && (
        <HandshakeOverlay onCancel={() => setShowHandshake(false)} onComplete={handleUnlock} />
      )}
    </div>
  );
};

export default App;