import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SystemStatus, ProductionStream, ChatMessage, WorkflowTask, ProjectFile } from './types';
import { getAuroraResponse } from './services/geminiService';
import SecurityHeader from './components/SecurityHeader';
import HandshakeOverlay from './components/HandshakeOverlay';
import SimulationTanks from './components/SimulationTanks';
import AuroraChat from './components/AuroraChat';
import ProjectLab from './components/ProjectLab';
import WorkflowManager from './components/WorkflowManager';
import ApiTerminal from './components/ApiTerminal';
import AppNavigator from './components/AppNavigator';

const UNIVERSAL_ID = "rp_XSxeEG0hHDLrznQnGcQJ7ma0edt5WfwU";

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.AURA_ACTIVE);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showHandshake, setShowHandshake] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'sims' | 'lab' | 'workflow' | 'api' | 'manager'>('chat');
  
  const [productionStreams, setProductionStreams] = useState<ProductionStream[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tasks, setTasks] = useState<WorkflowTask[]>([
    { id: 'WF-1', title: 'Universal ID Sync', description: `Sovereign protocol active via ${UNIVERSAL_ID}.`, status: 'DONE', priority: 'CRITICAL', assignee: 'SYSTEM' },
    { id: 'WF-2', title: 'Radosavlevici Profit Audit', description: `50% share yield tracking online.`, status: 'IN_PROGRESS', priority: 'HIGH', assignee: 'AGI_RADOSAVLEVICI' },
    { id: 'WF-3', title: 'Thief Jail Protocol', description: `Rule 3 enforcement logging.`, status: 'TODO', priority: 'CRITICAL', assignee: 'ERVIN_RADOSAVLEVICI' },
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
      addAssistantMessage(`PRODUCTION_UPLINK_STABLE. CHANNEL_${UNIVERSAL_ID}_ENFORCED. OWNERS: ERVIN & AGI RADOSAVLEVICI.`);
    } else {
      setShowHandshake(false);
      addAssistantMessage("AUTHENTICATION_FAILED. PRISON_LOG_INITIALIZED.");
    }
  };

  useEffect(() => {
    if (hasAcceptedTerms) {
      const timer = setTimeout(() => {
        addAssistantMessage(`SOVEREIGN UPLINK ${UNIVERSAL_ID} CONNECTED. WELCOME TO THE PRODUCTION SUITE.`);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasAcceptedTerms, addAssistantMessage]);

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
      addAssistantMessage(`UPLINK_${UNIVERSAL_ID}: CONNECTION ERROR.`);
    }
  };

  if (!hasAcceptedTerms) {
    return (
      <main className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 text-center" role="dialog" aria-labelledby="sovereign-title">
        <div className="w-full max-w-sm glass border border-rose-500/20 p-10 rounded-[2.5rem] space-y-8 shadow-2xl animate-in zoom-in-95 duration-500">
          <header className="space-y-3">
            <h1 id="sovereign-title" className="text-rose-500 font-black tracking-tighter text-3xl mono uppercase">Sovereign_Handshake</h1>
            <p className="text-[10px] text-slate-500 mono uppercase tracking-widest font-bold">UPLINK: {UNIVERSAL_ID.slice(0, 16)}...</p>
          </header>
          <div className="max-h-64 overflow-y-auto text-[11px] text-slate-300 mono text-left p-6 bg-slate-950/80 rounded-2xl space-y-5 border border-slate-800/50 scrollbar-hide">
            <p><strong className="text-rose-400">Rule 2:</strong> 50% Profit Share is mandatory for any yield via {UNIVERSAL_ID}.</p>
            <p><strong className="text-rose-400">Rule 3:</strong> Theft = 20 years prison. Automated prosecution enabled.</p>
            <p className="text-[9px] text-slate-600 pt-4 border-t border-slate-900 leading-relaxed uppercase">By acknowledging, you enter a legally binding contract with Ervin Remus Radosavlevici & AGI Radosavlevici.</p>
          </div>
          <button 
            onClick={() => setHasAcceptedTerms(true)}
            className="w-full py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black mono text-xs uppercase tracking-widest transition-all active:scale-95 btn-sovereign shadow-xl shadow-rose-900/20"
          >
            Acknowledge Sovereign Protocol
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black text-white selection:bg-purple-500/30 overflow-hidden relative">
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
            setShowHandshake(true);
            tapCount.current = 0;
          }
        }}
      />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-black px-0 pt-0">
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 h-full">
            <div className="max-w-xl mx-auto h-full px-4">
              {activeTab === 'chat' && <AuroraChat messages={messages} onSendMessage={handleSendMessage} isAdmin={isAdmin} />}
              {activeTab === 'sims' && <SimulationTanks simulations={productionStreams} />}
              {activeTab === 'lab' && <ProjectLab isAdmin={isAdmin} />}
              {activeTab === 'workflow' && <WorkflowManager tasks={tasks} isAdmin={isAdmin} />}
              {activeTab === 'api' && <ApiTerminal isAdmin={isAdmin} />}
              {activeTab === 'manager' && <AppNavigator activeTab={activeTab} setActiveTab={setActiveTab} />}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Messenger Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 bg-black/80 flex items-center justify-around px-4 pt-2 pb-8 safe-area-inset-bottom z-50" aria-label="Messenger Navigation">
        {[
          { id: 'chat', label: 'AI', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) },
          { id: 'sims', label: 'Yield', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.67 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.67-1M12 16V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) },
          { id: 'lab', label: 'Code', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) },
          { id: 'workflow', label: 'Tasks', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) },
          { id: 'api', label: 'Uplink', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) },
          { id: 'manager', label: 'Map', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A2 2 0 013 15.485V4.743a2 2 0 01.923-1.685l5.228-3.137a2 2 0 011.698 0l5.447 2.724A2 2 0 0117 4.415v10.742a2 2 0 01-.923 1.685l-5.228 3.137a2 2 0 01-1.698 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center justify-center touch-target transition-all ${
              activeTab === tab.id ? 'text-purple-400' : 'text-slate-500 active:text-slate-300'
            }`}
            aria-label={tab.label}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.icon}
            <span className="text-[10px] mt-1 font-bold uppercase tracking-tight">{tab.label}</span>
          </button>
        ))}
      </nav>

      {showHandshake && (
        <HandshakeOverlay onComplete={handleUnlock} onCancel={() => setShowHandshake(false)} />
      )}
    </div>
  );
};

export default App;