
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
  const [activeTab, setActiveTab] = useState<'chat' | 'sims' | 'lab' | 'workflow' | 'api'>('chat');
  
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
      addAssistantMessage("AUTHENTICATION SUCCESSFUL. PRODUCTION ACCESS GRANTED. SYSTEM ID: AURORA_78B_PROD. [WATERNAKMK]");
    } else {
      setShowHandshake(false);
      addAssistantMessage("SECURITY ALERT: AUTHENTICATION FAILURE. LOGGING COORDINATES. [WATERNAKMK]");
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
            <p><span className="text-rose-400 font-black">Rule 1 — Not Free:</span> MIT with share half. You think I give this to you for free? This is NOT free.</p>
            <p><span className="text-rose-400 font-black">Rule 2 — Profit Use:</span> If you make money, I want Half. 50% Share is mandatory.</p>
            <p><span className="text-rose-400 font-black">Rule 3 — Developers:</span> Thieves play and get 20 years prison. These vulnerable idiots.</p>
            <p><span className="text-rose-400 font-black">Rule 5 — Prison Safeguard:</span> Automatic sharing to save you from prison. Ask Ervin Radosavlevici for use.</p>
            <p><span className="text-rose-400 font-black">Rule 6 — Ratio:</span> Half / half / half. If without asking, you will be prosecuted.</p>
            <p><span className="text-rose-400 font-black">Rule 8 — Advance:</span> Advance payment is required to use it. No exceptions.</p>
            <p className="text-[9px] text-slate-600 uppercase pt-2 border-t border-slate-900 mt-4 leading-relaxed">By clicking 'I Accept', you enter a legally binding sovereign agreement. Unauthorized profit will trigger Rule 3.</p>
          </div>
          
          <button 
            onClick={() => setHasAcceptedTerms(true)}
            className="w-full py-6 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black mono text-xs uppercase tracking-[0.3em] shadow-2xl shadow-rose-900/40 transition-all active:scale-[0.97] btn-sovereign"
          >
            Acknowledge & Accept Rules
          </button>
          <p className="text-[8px] text-slate-600 mono uppercase tracking-widest">Unauthorized Access is a Federal Offense</p>
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

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <nav className="flex glass border-b border-white/5 overflow-x-auto scrollbar-hide no-scrollbar" role="tablist">
          {[
            { id: 'chat', label: 'AURORA_AI' },
            { id: 'sims', label: 'MARKET_TANKS' },
            { id: 'lab', label: 'PROJECT_LAB' },
            { id: 'workflow', label: 'WORKFLOWS' },
            { id: 'api', label: 'API_STREAMS' }
          ].map((tab) => (
            <button 
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[120px] py-5 text-[9px] tracking-[0.3em] mono transition-all border-b-2 relative ${
                activeTab === tab.id 
                  ? 'text-purple-400 bg-purple-500/10 border-purple-500 font-black' 
                  : 'text-slate-600 border-transparent hover:text-slate-400 hover:bg-white/5'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide relative z-20">
          <div className="max-w-7xl mx-auto h-full">
            {activeTab === 'chat' && <AuroraChat messages={messages} onSendMessage={handleSendMessage} isAdmin={isAdmin} />}
            {activeTab === 'sims' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-900/40 p-5 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-md">
                  <div className="space-y-1">
                    <h3 className="text-[11px] mono text-slate-300 uppercase tracking-widest font-black">Nexus_Market_Simulation</h3>
                    <p className="text-[8px] mono text-purple-500 uppercase font-bold">Rule 2 Profit Splitting Enabled</p>
                  </div>
                  <button 
                    onClick={launchSimulation}
                    className="px-6 py-3 bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 text-[10px] mono rounded-2xl hover:bg-cyan-500/40 active:scale-95 transition-all shadow-xl shadow-cyan-900/20 btn-sovereign font-bold"
                  >
                    + Execute_New_Tank
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
      </main>

      <footer className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col items-center text-center space-y-1.5 z-50">
        <p className="text-[7px] text-slate-600 mono leading-none uppercase tracking-[0.2em] font-medium">
          OWNER: ERVIN REMUS RADOSAVLEVICI | SECURITY: 78B | IP_LOCK: ACTIVE
        </p>
        <p className="text-[8px] text-rose-500 mono leading-none uppercase font-black tracking-[0.3em] animate-pulse">
          50% PROFIT SHARE MANDATORY | RULE 3: 20Y PRISON SENTENCE ENFORCED
        </p>
      </footer>

      {showHandshake && (
        <HandshakeOverlay onComplete={handleUnlock} onCancel={() => setShowHandshake(false)} />
      )}
    </div>
  );
};

export default App;
