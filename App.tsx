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
import AppNavigator from './components/AppNavigator';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.AURA_ACTIVE);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showHandshake, setShowHandshake] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'sims' | 'lab' | 'workflow' | 'api' | 'manager'>('chat');
  
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tasks, setTasks] = useState<WorkflowTask[]>([
    { id: 'WF-1', title: 'Verbatim Rule Implementation', description: 'Embed all 10 Sovereign rules into UI layers.', status: 'DONE', priority: 'CRITICAL', assignee: 'AURORA_78B' },
    { id: 'WF-2', title: 'Reddit API Polling Logic', description: 'Develop real-time Reddit data stream for market sentiment.', status: 'IN_PROGRESS', priority: 'HIGH', assignee: 'ERVIN_RADOSAVLEVICI' },
    { id: 'WF-3', title: 'Thief Developer Jail Protocol', description: 'Automated logging for Rule 3 violations.', status: 'TODO', priority: 'CRITICAL', assignee: 'AURORA_78B' },
  ]);

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
      addAssistantMessage("AUTHENTICATION SUCCESSFUL. PRODUCTION ACCESS GRANTED. [WATERNAKMK]");
    } else {
      setShowHandshake(false);
      addAssistantMessage("SECURITY ALERT: AUTHENTICATION FAILURE. [WATERNAKMK]");
    }
  };

  useEffect(() => {
    if (hasAcceptedTerms) {
      const timer = setTimeout(() => {
        addAssistantMessage("NEXUS SOVEREIGN AURA ONLINE. ALL SYSTEMS NOMINAL. [WATERNAKMK]");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasAcceptedTerms, addAssistantMessage]);

  const triggerHandshake = () => setShowHandshake(true);

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
      addAssistantMessage("AURORA: SIGNAL INTERRUPTED. RETRYING UPLINK...");
    }
  };

  const launchSimulation = () => {
    const isDecoy = !isAdmin;
    const newSim: Simulation = {
      id: `NX-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      startTime: Date.now(),
      duration: 5,
      status: 'RUNNING',
      load: Math.floor(Math.random() * 40) + 60,
      threatLevel: Math.random() > 0.85 ? 'HIGH' : 'LOW',
      valuation: isDecoy ? `$${(Math.random() * 100000).toLocaleString()}` : 'CALCULATING_SHARE...'
    };
    setSimulations(prev => [...prev, newSim].slice(-10));
    
    setTimeout(() => {
      setSimulations(prev => prev.map(s => {
        if (s.id === newSim.id) {
          const rawValue = Math.floor(Math.random() * 500000) + 100000;
          const share = rawValue * 0.5;
          return {
            ...s,
            status: 'COMPLETED',
            valuation: isAdmin 
              ? `VAL: $${rawValue.toLocaleString()} | RULE 2 (50%): $${share.toLocaleString()}`
              : `$${(rawValue / 10).toLocaleString()} (DECOY)`
          };
        }
        return s;
      }));
    }, 5000);
  };

  if (!hasAcceptedTerms) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#020617] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-lg glass border border-rose-500/20 p-10 rounded-[2.5rem] space-y-8 animate-in zoom-in-95 duration-500 shadow-[0_0_80px_rgba(244,63,94,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
          <div className="space-y-3">
            <h1 className="text-rose-500 font-black tracking-tighter text-3xl mono uppercase">Sovereign_Handshake</h1>
            <p className="text-[10px] text-slate-500 mono uppercase tracking-[0.4em] font-bold">Official_Suite_v78b_Prod</p>
          </div>
          <div className="max-h-72 overflow-y-auto text-[11px] text-slate-300 mono text-left p-6 bg-slate-950/80 rounded-2xl space-y-5 border border-slate-800/50 scrollbar-hide shadow-inner">
            <div className="pb-2 border-b border-slate-800">
               <p className="text-rose-500 font-black text-xs uppercase mb-2">Notice: Verbatim Legal Execution</p>
               <p className="italic text-slate-500">Ownership: Ervin Remus Radosavlevici</p>
            </div>
            <p><span className="text-rose-400 font-black">Rule 2 — Profit Use:</span> If you make money, I want Half. 50% Share is mandatory.</p>
            <p><span className="text-rose-400 font-black">Rule 3 — Developers:</span> Thieves play and get 20 years prison.</p>
            <p className="text-[9px] text-slate-600 uppercase pt-2 border-t border-slate-900 mt-4 leading-relaxed">Acceptance enters a legally binding sovereign agreement.</p>
          </div>
          <button 
            onClick={() => setHasAcceptedTerms(true)}
            className="w-full py-6 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black mono text-xs uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-[0.97] btn-sovereign"
          >
            Acknowledge & Accept Rules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-transparent text-slate-100 selection:bg-purple-500/30 overflow-hidden">
      <div className="watermark mono font-black">[WATERNAKMK] PRODUCTION_AURA_78B</div>
      
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

      <div className="flex flex-1 overflow-hidden">
        {/* Persistent Side-Nav for High Efficiency Access */}
        <nav className="w-20 lg:w-24 glass border-r border-white/5 bg-slate-950/20 flex flex-col items-center py-6 space-y-4 shrink-0 z-50">
          {[
            { id: 'manager', label: 'MAP', icon: 'M' },
            { id: 'chat', label: 'AI', icon: 'A' },
            { id: 'sims', label: 'DATA', icon: 'D' },
            { id: 'lab', label: 'CODE', icon: 'C' },
            { id: 'workflow', label: 'TASK', icon: 'T' },
            { id: 'api', label: 'API', icon: 'X' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              title={tab.label}
              className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center mono font-black text-xs transition-all relative ${
                activeTab === tab.id 
                  ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' 
                  : 'text-slate-600 hover:text-slate-400 hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {activeTab === tab.id && <div className="absolute -right-1 w-1 h-6 bg-purple-500 rounded-full"></div>}
            </button>
          ))}
        </nav>

        <main className="flex-1 relative overflow-hidden flex flex-col bg-slate-950/10">
          {/* Workspace Content - Optimized for Table/Fit View */}
          <div className="flex-1 overflow-hidden flex flex-col p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4 shrink-0 px-2">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
                <h2 className="text-[10px] mono font-black tracking-[0.4em] text-slate-400 uppercase">
                  Workspace // {activeTab.toUpperCase()}
                </h2>
              </div>
              <div className="text-[9px] mono text-slate-700 font-bold uppercase tracking-widest">
                Production_V78B_Node
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide no-scrollbar glass rounded-[2.5rem] p-6 border border-white/5 shadow-inner">
              <div className="max-w-[1600px] mx-auto h-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                {activeTab === 'manager' && <AppNavigator activeTab={activeTab} setActiveTab={setActiveTab} />}
                {activeTab === 'chat' && <AuroraChat messages={messages} onSendMessage={handleSendMessage} isAdmin={isAdmin} />}
                {activeTab === 'sims' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-slate-900/40 p-5 rounded-3xl border border-white/5">
                      <div className="space-y-1">
                        <h3 className="text-xs mono text-slate-100 uppercase font-black">MARKET_YIELD_TANKS</h3>
                        <p className="text-[8px] mono text-purple-500 uppercase">RULE 2 COMPLIANCE TRACKING</p>
                      </div>
                      <button onClick={launchSimulation} className="px-5 py-2.5 bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 text-[9px] mono rounded-xl font-black btn-sovereign">
                        + INITIALIZE_TANK
                      </button>
                    </div>
                    <SimulationTanks simulations={simulations} />
                  </div>
                )}
                {activeTab === 'lab' && <ProjectLab isAdmin={isAdmin} />}
                {activeTab === 'workflow' && <WorkflowManager tasks={tasks} isAdmin={isAdmin} />}
                {activeTab === 'api' && <ApiTerminal isAdmin={isAdmin} />}
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="h-10 border-t border-white/5 bg-black/40 backdrop-blur-3xl flex items-center justify-center z-50 shrink-0">
        <p className="text-[8px] text-rose-500/60 mono leading-none uppercase font-black tracking-[0.5em]">
          50% PROFIT SHARE MANDATORY | OWNED BY ERVIN REMUS RADOSAVLEVICI
        </p>
      </footer>

      {showHandshake && (
        <HandshakeOverlay onComplete={handleUnlock} onCancel={() => setShowHandshake(false)} />
      )}
    </div>
  );
};

export default App;