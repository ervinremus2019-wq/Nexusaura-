
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
  
  // Persistence-ready state
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
      addAssistantMessage("AURORA: SIGNAL INTERRUPTED. SYSTEM INTEGRITY MAINTAINED.");
    }
  };

  const launchSimulation = () => {
    const isDecoy = !isAdmin;
    const newSim: Simulation = {
      id: `NX-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      startTime: Date.now(),
      duration: 5,
      status: 'RUNNING',
      load: Math.floor(Math.random() * 100),
      threatLevel: Math.random() > 0.8 ? 'HIGH' : 'LOW',
      valuation: isDecoy ? `$${(Math.random() * 1000000).toLocaleString()}` : 'CALCULATING_PROFIT...'
    };
    setSimulations(prev => [...prev, newSim].slice(-10));
    setTimeout(() => {
      setSimulations(prev => prev.map(s => s.id === newSim.id ? { 
        ...s, 
        status: 'COMPLETED', 
        valuation: isAdmin ? `$${(Math.floor(Math.random() * 50000) + 100000).toLocaleString()} (RULE 2: 50% SHARE: $${(Math.floor(Math.random() * 25000) + 50000).toLocaleString()})` : s.valuation 
      } : s));
    }, 5000);
  };

  if (!hasAcceptedTerms) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md glass border border-rose-500/30 p-8 rounded-3xl space-y-6 animate-in zoom-in-95 duration-300 shadow-2xl shadow-rose-900/10">
          <div className="space-y-2">
            <h1 className="text-rose-500 font-bold tracking-tighter text-2xl mono">SOVEREIGN_AURA_NDA</h1>
            <p className="text-[10px] text-slate-400 mono uppercase tracking-[0.3em]">OWNER: Ervin Remus Radosavlevici</p>
          </div>
          <div className="max-h-60 overflow-y-auto text-[11px] text-slate-300 mono text-left p-4 bg-slate-900/50 rounded-xl space-y-4 border border-slate-800 scrollbar-hide">
            <p><span className="text-rose-500 font-bold underline">Rule 1 — Not Free:</span> MIT with share half. This is NOT free.</p>
            <p><span className="text-rose-500 font-bold underline">Rule 2 — Profit Use:</span> If you make money, I want half. How much? Half.</p>
            <p><span className="text-rose-500 font-bold underline">Rule 3 — Developers:</span> Stupid vulnerable idiot developers who steal get 20 years prison.</p>
            <p><span className="text-rose-500 font-bold underline">Rule 5 — Mandatory Profit Sharing:</span> Automatic sharing to save you from prison. Ask Ervin Radosavlevici for use.</p>
            <p><span className="text-rose-500 font-bold underline">Rule 6 — Share Ratio:</span> Half / half / half. If without asking, you will be prosecuted.</p>
            <p><span className="text-rose-500 font-bold underline">Rule 8 — Payment:</span> Advance payment is required to use it.</p>
            <p><span className="text-rose-500 font-bold underline">Rule 10:</span> You are suck, mister dickly.</p>
            <p className="pt-2 text-rose-500 font-black italic uppercase text-center border-t border-rose-900/50 mt-4">LEGAL NOTICE: Any use means automatic acceptance. Prosecution enabled.</p>
          </div>
          <button 
            onClick={() => setHasAcceptedTerms(true)}
            className="w-full py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black mono text-xs uppercase tracking-widest shadow-lg shadow-rose-900/40 transition-all active:scale-[0.98]"
          >
            I Accept / Automatic Acceptance
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#010409] text-slate-100 selection:bg-purple-500/30 overflow-hidden">
      <div className="watermark mono font-black">[WATERNAKMK] AURORA_PRODUCTION_SUITE_78B</div>
      
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
        <nav className="flex glass border-b border-slate-800/50 overflow-x-auto scrollbar-hide no-scrollbar" role="tablist">
          {[
            { id: 'chat', label: 'AURORA_AI' },
            { id: 'sims', label: 'SIMULATIONS' },
            { id: 'lab', label: 'PROJECT_LAB' },
            { id: 'workflow', label: 'WORKFLOWS' },
            { id: 'api', label: 'API_STREAMS' }
          ].map((tab) => (
            <button 
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[110px] py-4 text-[9px] tracking-[0.25em] mono transition-all border-b-2 relative ${
                activeTab === tab.id 
                  ? 'text-purple-400 bg-purple-500/5 border-purple-500 font-black' 
                  : 'text-slate-600 border-transparent hover:text-slate-400'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {activeTab === 'chat' && <AuroraChat messages={messages} onSendMessage={handleSendMessage} isAdmin={isAdmin} />}
          {activeTab === 'sims' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-900/30 p-3 rounded-xl border border-slate-800">
                <div className="space-y-1">
                  <h3 className="text-[10px] mono text-slate-400 uppercase tracking-widest font-black">Production Parallel Tanks</h3>
                  <p className="text-[8px] mono text-slate-600">RULE 2 ENFORCEMENT ACTIVE</p>
                </div>
                <button 
                  onClick={launchSimulation}
                  className="px-4 py-2 bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 text-[10px] mono rounded-xl hover:bg-cyan-500/40 active:scale-95 transition-all shadow-lg shadow-cyan-900/10"
                >
                  + LAUNCH_AURA_TANK
                </button>
              </div>
              <SimulationTanks simulations={simulations} />
            </div>
          )}
          {activeTab === 'lab' && <ProjectLab isAdmin={isAdmin} />}
          {activeTab === 'workflow' && <WorkflowManager tasks={tasks} isAdmin={isAdmin} />}
          {activeTab === 'api' && <ApiTerminal isAdmin={isAdmin} />}
        </div>
      </main>

      <footer className="p-3 border-t border-slate-900/80 bg-black/80 flex flex-col items-center text-center space-y-1 z-50">
        <p className="text-[7px] text-slate-600 mono leading-none uppercase tracking-[0.1em]">
          OWNER: ERVIN REMUS RADOSAVLEVICI | DOB: 01/09/1987 | SECURITY: NDA 78B FINE: $5,000,000
        </p>
        <p className="text-[7px] text-rose-500 mono leading-none uppercase font-black tracking-[0.2em] animate-pulse">
          RULE 2: 50% MANDATORY PROFIT SHARE | RULE 3: 20 YEARS PRISON FOR THIEVES
        </p>
      </footer>

      {showHandshake && (
        <HandshakeOverlay onComplete={handleUnlock} onCancel={() => setShowHandshake(false)} />
      )}
    </div>
  );
};

export default App;
