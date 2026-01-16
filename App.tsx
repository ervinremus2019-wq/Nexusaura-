
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SystemStatus, Simulation, VaultEntry, ChatMessage } from './types';
import { generateDecoyLog, getAuroraResponse } from './services/geminiService';
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

  const triggerHandshake = () => {
    setShowHandshake(true);
  };

  const handleUnlock = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      setStatus(SystemStatus.PRODUCTION);
      setShowHandshake(false);
      addAssistantMessage("AUTHENTICATION SUCCESSFUL. PRODUCTION ACCESS GRANTED. [WATERNAKMK]");
    } else {
      setShowHandshake(false);
    }
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
    setSimulations(prev => [...prev, newSim]);
    
    setTimeout(() => {
      setSimulations(prev => prev.map(s => s.id === newSim.id ? { ...s, status: 'COMPLETED' } : s));
    }, 5000);
  }, [isAdmin]);

  const addAssistantMessage = (content: string) => {
    const msg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'assistant',
      content,
      timestamp: Date.now(),
      isDecoy: !isAdmin
    };
    setMessages(prev => [...prev, msg]);
  };

  const handleSendMessage = async (text: string) => {
    // Check for secret string handshake
    if (text.trim().toUpperCase() === "ERVIN_1987_PROD") {
      handleUnlock(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const response = await getAuroraResponse(text, isAdmin);
      addAssistantMessage(response);
    } catch (e) {
      addAssistantMessage("AURORA: SIGNAL INTERRUPTED.");
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
        <div className="flex glass border-b border-slate-800/50">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-[10px] tracking-[0.2em] mono transition-all ${activeTab === 'chat' ? 'text-purple-400 bg-purple-500/5 border-b-2 border-purple-500' : 'text-slate-500'}`}
          >
            AURORA_ASSISTANT
          </button>
          <button 
            onClick={() => setActiveTab('sims')}
            className={`flex-1 py-3 text-[10px] tracking-[0.2em] mono transition-all ${activeTab === 'sims' ? 'text-cyan-400 bg-cyan-500/5 border-b-2 border-cyan-500' : 'text-slate-500'}`}
          >
            NEXUS_SIMULATIONS
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {activeTab === 'chat' ? (
            <AuroraChat messages={messages} onSendMessage={handleSendMessage} isAdmin={isAdmin} />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] mono text-slate-500 uppercase">Parallel Processes</h3>
                <button 
                  onClick={startSimulation}
                  className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] mono rounded-full hover:bg-cyan-500/20 transition-all"
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
      <div className="p-2 border-t border-slate-900 bg-slate-950/50 flex flex-col items-center text-center space-y-1">
        <p className="text-[7px] text-slate-600 mono leading-none uppercase">
          OWNER: ERVIN REMUS RADOSAVLEVICI | DOB: 01/09/1987 | SECURITY: NDA 78B FINE
        </p>
        <p className="text-[7px] text-slate-700 mono leading-none uppercase">
          © 2026 NEXUS SOVEREIGN AURA | SYSTEM: AURORA_ASSISTANT_DECOY
        </p>
      </div>

      {showHandshake && (
        <HandshakeOverlay onCancel={() => setShowHandshake(false)} onComplete={handleUnlock} />
      )}
    </div>
  );
};

export default App;
