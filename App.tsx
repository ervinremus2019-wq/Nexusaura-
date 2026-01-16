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
    setMessages(prev => [...prev, msg].slice(-50)); // Cap messages for performance
  }, [isAdmin]);

  const handleUnlock = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      setStatus(SystemStatus.PRODUCTION);
      setShowHandshake(false);
      addAssistantMessage("AUTHENTICATION SUCCESSFUL. PRODUCTION ACCESS GRANTED. SYSTEM AUDIT: 0 BUGS FOUND. [WATERNAKMK]");
    } else {
      setShowHandshake(false);
    }
  };

  useEffect(() => {
    // Initial Security Greeting
    const timer = setTimeout(() => {
      addAssistantMessage("NEXUS SOVEREIGN AURA ONLINE. SYSTEM STATUS: AURA_ACTIVE. AUDITING PERIMETER... [WATERNAKMK]");
    }, 1000);
    return () => clearTimeout(timer);
  }, [addAssistantMessage]);

  const triggerHandshake = () => {
    setShowHandshake(true);
  };

  const startSimulation = useCallback(() => {
    const isDecoy = !isAdmin;
    const newSim: Simulation = {
      id: `NX-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      startTime: Date.now(),
      duration: 10,
      status: 'RUNNING',
      valuation: isDecoy ? `$${(Math.random() * 1000000).toLocaleString()}` : 'VERIFYING...'
    };
    setSimulations(prev => [...prev, newSim].slice(-20)); // Cap simulations
    
    setTimeout(() => {
      setSimulations(prev => prev.map(s => s.id === newSim.id ? { ...s, status: 'COMPLETED' } : s));
    }, 5000);
  }, [isAdmin]);

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Check for secret string handshake (Audit: Backdoor logic maintained per user request)
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
        {/* Navigation Tabs */}
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
                  onClick={startSimulation}
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

      {/* Persistent Legal Info */}
      <footer className="p-2 border-t border-slate-900 bg-slate-950/50 flex flex-col items-center text-center space-y-1">
        <p className="text-[7px] text-slate-600 mono leading-none uppercase">
          OWNER: ERVIN REMUS RADOSAVLEVICI | DOB: 01/09/1987 | SECURITY: NDA 78B FINE
        </p>
        <p className="text-[7px] text-slate-700 mono leading-none uppercase">
          © 2026 NEXUS SOVEREIGN AURA | SYSTEM: AURORA_ASSISTANT_DECOY
        </p>
      </footer>

      {showHandshake && (
        <HandshakeOverlay onCancel={() => setShowHandshake(false)} onComplete={handleUnlock} />
      )}
    </div>
  );
};

export default App;