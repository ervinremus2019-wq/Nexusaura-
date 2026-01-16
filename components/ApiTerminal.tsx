
import React, { useState, useEffect, useRef } from 'react';
import { processTerminalCommand } from '../services/geminiService';

interface Props {
  isAdmin: boolean;
}

interface CommandHistoryEntry {
  input: string;
  translated: string;
  timestamp: string;
  status: 'SUCCESS' | 'ERROR';
}

const ApiTerminal: React.FC<Props> = ({ isAdmin }) => {
  const [logs, setLogs] = useState<string[]>([
    "BOOT: NEXUS_API_BRIDGE_V78B_PROD",
    "HANDSHAKE: REDDIT_CORE_UPLINK_STABLE",
    "ETHICS: HUMAN_RIGHTS_PROTOCOL_V4_LOADED",
    "WATCHDOG: PROFIT_MONITOR_ACTIVE",
    "SYSTEM: AWAITING_SOVEREIGN_OR_AI_COMMAND..."
  ]);
  const [commandStream, setCommandStream] = useState<CommandHistoryEntry[]>([]);
  const [command, setCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || isProcessing) return;

    const rawInput = command.trim();
    const cmdLower = rawInput.toLowerCase();
    setCommand('');
    
    // Initial user entry in terminal
    setLogs(prev => [...prev, `nexus@aurora:~$ ${rawInput}`]);

    if (cmdLower === 'cls') {
      setLogs(["BOOT: NEXUS_API_BRIDGE_RESTARTED"]);
      setCommandStream([]);
      return;
    }

    setIsProcessing(true);
    
    // AI Agent Interpretation
    const aiResponse = await processTerminalCommand(rawInput, isAdmin);
    
    setIsProcessing(false);
    
    // Update Command Stream Dashboard
    const streamEntry: CommandHistoryEntry = {
      input: rawInput,
      translated: aiResponse.commandUsed.toUpperCase(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: aiResponse.commandUsed !== 'error' ? 'SUCCESS' : 'ERROR'
    };
    setCommandStream(prev => [streamEntry, ...prev].slice(0, 10));

    // Update Terminal Logs
    const newLogs = [...aiResponse.logs];
    if (aiResponse.output) newLogs.push(`>> ${aiResponse.output}`);
    
    if (aiResponse.commandUsed === 'audit_profit' || aiResponse.commandUsed === 'rule_check') {
      newLogs.push("NOTICE: Rule 2 and 6 monitored via Ervin Protocol.");
    }

    setLogs(prev => [...prev, ...newLogs].slice(-50));
  };

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center px-1">
        <div className="space-y-0.5">
          <h3 className="text-[10px] mono text-slate-500 uppercase tracking-widest font-black">Production API / Global Streams</h3>
          <p className="text-[8px] mono text-slate-700 uppercase">Interpretation & Execution Dashboard</p>
        </div>
        <div className="flex space-x-2">
           <button 
             onClick={() => setLogs(["BOOT: NEXUS_API_BRIDGE_RESTARTED"])}
             className="px-3 py-1 bg-slate-800 text-slate-500 text-[9px] mono rounded hover:text-slate-300 transition-colors uppercase"
           >
             Clear_Buffer
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
        {/* Main Terminal (Input/Output) */}
        <div className="lg:col-span-2 flex flex-col glass bg-[#010409]/95 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-rose-500/50"></div>
          
          <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto scrollbar-hide no-scrollbar">
            {logs.map((log, i) => (
              <div key={i} className="flex space-x-3 mb-1 group">
                <span className="text-slate-800 select-none opacity-50 font-bold tracking-tighter">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                <span className={`break-all ${
                  log.includes('ERR') || log.includes('ALERT') ? 'text-rose-500 font-bold' : 
                  log.includes('nexus@aurora') ? 'text-cyan-400 font-black tracking-tight' : 
                  log.startsWith('>>') ? 'text-purple-400 font-bold' :
                  'text-emerald-500/80'
                }`}>
                  {log}
                </span>
              </div>
            ))}
            {isProcessing && (
              <div className="flex space-x-3 animate-pulse py-2">
                <span className="text-slate-800">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-amber-500 font-black italic tracking-tighter">AI_AGENT: PARSING_INTENT...</span>
              </div>
            )}
            <div ref={logEndRef} />
          </div>

          <form onSubmit={handleCommand} className="p-4 bg-slate-900/30 border-t border-slate-800/50 flex items-center space-x-3">
            <span className="text-purple-500 font-black mono text-xs">nexus@aurora:~$</span>
            <input 
              type="text" 
              autoFocus
              disabled={isProcessing}
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Natural language input (e.g., 'check my profits' or 'scan reddit')..."
              className="bg-transparent border-none outline-none text-slate-100 w-full placeholder:text-slate-800 mono text-xs disabled:opacity-50"
            />
          </form>
        </div>

        {/* Interpretation Monitor (Real-time Stream) */}
        <div className="flex flex-col glass border border-slate-800 rounded-3xl overflow-hidden bg-slate-950/40">
           <div className="p-4 border-b border-slate-800 bg-slate-900/40 flex justify-between items-center">
              <span className="text-[9px] mono text-slate-500 uppercase font-black tracking-widest">Interpretation_Stream</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {commandStream.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-2 opacity-20">
                   <div className="w-10 h-10 border border-slate-700 rounded-full flex items-center justify-center text-xl mono tracking-tighter font-black">?</div>
                   <p className="text-[8px] mono uppercase tracking-widest text-center">Awaiting Translation<br/>Operations</p>
                </div>
              ) : (
                commandStream.map((entry, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-slate-800 rounded-xl space-y-2 animate-in slide-in-from-right-2 duration-300">
                     <div className="flex justify-between items-start">
                        <span className="text-[7px] mono text-slate-600 font-bold uppercase">{entry.timestamp}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[7px] mono font-black ${
                          entry.status === 'SUCCESS' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
                        }`}>
                          {entry.status}
                        </span>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] mono text-slate-400 italic">"{entry.input}"</p>
                        <p className="text-[10px] mono text-purple-400 font-black">
                           <span className="text-slate-600 mr-1">→</span> 
                           {entry.translated}
                        </p>
                     </div>
                  </div>
                ))
              )}
           </div>
           
           <div className="p-4 border-t border-slate-800 text-center">
              <p className="text-[8px] mono text-slate-600 uppercase tracking-widest font-black italic">
                ETHIC_LOCK: HUMAN_RIGHTS_V4
              </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass border border-slate-800 p-4 rounded-3xl flex items-center space-x-4 hover:border-cyan-500/30 transition-all group">
           <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
           </div>
           <div>
              <p className="text-[7px] mono text-slate-600 uppercase tracking-widest">Api Throughput</p>
              <p className="text-sm mono text-cyan-400 font-black">782 GB/s</p>
           </div>
        </div>
        <div className="glass border border-slate-800 p-4 rounded-3xl flex items-center space-x-4 hover:border-purple-500/30 transition-all group">
           <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
           </div>
           <div>
              <p className="text-[7px] mono text-slate-600 uppercase tracking-widest">Interpreter Load</p>
              <p className="text-sm mono text-purple-400 font-black">NOMINAL</p>
           </div>
        </div>
        <div className="glass border border-slate-800 p-4 rounded-3xl flex items-center space-x-4 hover:border-rose-500/30 transition-all group">
           <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 21a10.003 10.003 0 008.384-4.562l.054.091m-11.074-2.14l-.014-.055a6.003 6.003 0 0111.074 0l.014.055M7 11V9a5 5 0 0110 0v2m-1 6h.01M7 17h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
           </div>
           <div>
              <p className="text-[7px] mono text-slate-600 uppercase tracking-widest">Rule Enforcement</p>
              <p className="text-sm mono text-rose-400 font-black">SVRGN_LOCK</p>
           </div>
        </div>
      </div>
      
      <div className="p-3 bg-white/5 border border-white/5 rounded-2xl">
        <p className="text-[8px] mono text-slate-600 text-center uppercase font-black tracking-[0.2em] leading-relaxed">
          The interpretation engine adheres to Sovereign Protocol and International Human Rights Law. 
          <span className="text-rose-500 ml-2">Rule 3: 20 Year Sentence Automated logging active.</span>
        </p>
      </div>
    </div>
  );
};

export default ApiTerminal;
