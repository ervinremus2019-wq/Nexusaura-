
import React, { useState, useEffect, useRef } from 'react';
import { processTerminalCommand } from '../services/geminiService';

interface Props {
  isAdmin: boolean;
}

const ApiTerminal: React.FC<Props> = ({ isAdmin }) => {
  const [logs, setLogs] = useState<string[]>([
    "BOOT: NEXUS_API_BRIDGE_V78B_PROD",
    "HANDSHAKE: REDDIT_CORE_UPLINK_STABLE",
    "STATUS: 200 OK / THROUGHPUT_READY",
    "ETHICS: HUMAN_RIGHTS_PROTOCOL_V4_LOADED",
    "WATCHDOG: PROFIT_MONITOR_ACTIVE",
    "SYSTEM: AWAITING_SOVEREIGN_OR_AI_COMMAND..."
  ]);
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
    setLogs(prev => [...prev, `nexus@aurora:~$ ${rawInput}`]);

    // Manual quick commands
    if (cmdLower === 'cls') {
      setLogs(["BOOT: NEXUS_API_BRIDGE_RESTARTED"]);
      return;
    }

    setIsProcessing(true);
    
    // AI Agent Processing
    const aiResponse = await processTerminalCommand(rawInput, isAdmin);
    
    setIsProcessing(false);
    
    const newLogs = [...aiResponse.logs];
    if (aiResponse.output) newLogs.push(`>> ${aiResponse.output}`);
    
    // Append a standard rule footer for specific commands
    if (aiResponse.commandUsed === 'audit_profit' || aiResponse.commandUsed === 'rule_check') {
      newLogs.push("NOTICE: Rule 2 and 6 are being strictly monitored.");
    }

    setLogs(prev => [...prev, ...newLogs].slice(-50));
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center px-1">
        <div className="space-y-0.5">
          <h3 className="text-[10px] mono text-slate-500 uppercase tracking-widest font-black">Production API Terminal</h3>
          <p className="text-[8px] mono text-slate-700 uppercase">AI-Powered Natural Language Interface</p>
        </div>
        <div className="flex items-center space-x-2">
           <div className={`w-1.5 h-1.5 rounded-full ${isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'} animate-ping`}></div>
           <span className="text-[8px] mono text-emerald-500 font-black uppercase">
             {isProcessing ? 'AI_PROCESSING...' : 'AI_AGENT_IDLE'}
           </span>
        </div>
      </div>

      <div className="glass bg-[#010409]/90 border border-slate-800 rounded-3xl p-6 font-mono text-[11px] min-h-[400px] flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-rose-500 opacity-30"></div>
        
        <div className="flex-1 space-y-1.5 overflow-y-auto pr-2 scrollbar-hide no-scrollbar">
          {logs.map((log, i) => (
            <div key={i} className="flex space-x-3 group">
              <span className="text-slate-700 select-none">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              <span className={`break-all ${
                log.includes('ERR') || log.includes('ALERT') ? 'text-rose-500' : 
                log.includes('nexus@aurora') ? 'text-cyan-400 font-bold' : 
                log.startsWith('>>') ? 'text-purple-400 font-medium' :
                'text-emerald-500/90'
              }`}>
                {log}
              </span>
            </div>
          ))}
          {isProcessing && (
            <div className="flex space-x-3 animate-pulse">
              <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-amber-500 font-bold italic">AI_AGENT: TRANSLATING_NATURAL_LANGUAGE...</span>
            </div>
          )}
          <div ref={logEndRef} />
        </div>

        <form onSubmit={handleCommand} className="mt-4 pt-4 border-t border-slate-800/50 flex items-center space-x-2">
          <span className="text-purple-500 font-black">nexus@aurora:~$</span>
          <input 
            type="text" 
            autoFocus
            disabled={isProcessing}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Talk to AI Agent or type command..."
            className="bg-transparent border-none outline-none text-slate-100 w-full placeholder:text-slate-800 mono text-xs disabled:opacity-50"
          />
        </form>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass border border-slate-800 p-4 rounded-2xl text-center bg-slate-900/10">
          <p className="text-[7px] mono text-slate-600 uppercase mb-1 tracking-widest">Throughput</p>
          <p className="text-sm mono text-cyan-400 font-black tracking-tighter">782 GB/s</p>
        </div>
        <div className="glass border border-slate-800 p-4 rounded-2xl text-center bg-slate-900/10">
          <p className="text-[7px] mono text-slate-600 uppercase mb-1 tracking-widest">AI Status</p>
          <p className="text-sm mono text-purple-400 font-black tracking-tighter">NOMINAL</p>
        </div>
        <div className="glass border border-slate-800 p-4 rounded-2xl text-center bg-slate-900/10">
          <p className="text-[7px] mono text-slate-600 uppercase mb-1 tracking-widest">Ethic Lock</p>
          <p className="text-sm mono text-emerald-400 font-black tracking-tighter">V4_HRL</p>
        </div>
      </div>
      
      <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
        <p className="text-[8px] mono text-slate-500 text-center uppercase font-black tracking-widest">
          Sovereign AI Ethics Protocol: Operative within International Human Rights Law. 
          <span className="text-rose-500 ml-2 italic">Rule 3 Still Enforced.</span>
        </p>
      </div>
    </div>
  );
};

export default ApiTerminal;
