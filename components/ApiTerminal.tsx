
import React, { useState, useEffect, useRef } from 'react';

interface Props {
  isAdmin: boolean;
}

const ApiTerminal: React.FC<Props> = ({ isAdmin }) => {
  const [logs, setLogs] = useState<string[]>([
    "BOOT: NEXUS_API_BRIDGE_V78B_PROD",
    "HANDSHAKE: REDDIT_CORE_UPLINK_STABLE",
    "STATUS: 200 OK / THROUGHPUT_READY",
    "WATCHDOG: PROFIT_MONITOR_ACTIVE",
    "ENFORCEMENT: RULE_6_POLICIES_LOADED",
    "SYSTEM: AWAITING_SOVEREIGN_COMMAND..."
  ]);
  const [command, setCommand] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmd = command.toLowerCase().trim();
    const newLogs = [...logs, `nexus@aurora:~$ ${command}`];

    if (cmd === 'help') {
      newLogs.push("AVAILABLE: [poll_reddit, audit_profit, rule_check, cls, status]");
    } else if (cmd === 'poll_reddit') {
      newLogs.push("POLLING: r/investing... r/stocks...");
      newLogs.push("SENTIMENT_ANALYSIS: BULLISH_FOR_SOVEREIGN_AURA");
      newLogs.push("DATA_BRIDGE: REDDIT_ONLY_STABLE");
    } else if (cmd === 'audit_profit') {
      newLogs.push(isAdmin ? "AUDIT_RESULT: 100% COMPLIANCE. ERVIN_SHARE=50% Verified." : "AUDIT_RESULT: [REDACTED] - RULE 8 VIOLATION DETECTED.");
    } else if (cmd === 'rule_check') {
      newLogs.push("ACTIVE_POLICIES: RULES_1_THRU_10_VERIFIED.");
    } else if (cmd === 'status') {
      newLogs.push(`SYSTEM: ${isAdmin ? 'PRODUCTION' : 'DECOY_MODE'}`);
      newLogs.push("THROUGHPUT: 782 GB/s [SVRGN]");
    } else if (cmd === 'cls') {
      setLogs(["BOOT: NEXUS_API_BRIDGE_RESTARTED"]);
      setCommand('');
      return;
    } else {
      newLogs.push(`ERR: COMMAND_NOT_FOUND: ${cmd}`);
    }

    setLogs(newLogs.slice(-20));
    setCommand('');
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center px-1">
        <div className="space-y-0.5">
          <h3 className="text-[10px] mono text-slate-500 uppercase tracking-widest font-black">Production API Terminal</h3>
          <p className="text-[8px] mono text-slate-700 uppercase">Reddit Core Bridge / Sovereignty Console</p>
        </div>
        <div className="flex items-center space-x-2">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
           <span className="text-[8px] mono text-emerald-500 font-black uppercase">Reddit_Sync_Active</span>
        </div>
      </div>

      <div className="glass bg-[#010409]/90 border border-slate-800 rounded-3xl p-6 font-mono text-[11px] min-h-[350px] flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-rose-500 opacity-30"></div>
        
        <div className="flex-1 space-y-1.5 overflow-y-auto pr-2 scrollbar-hide no-scrollbar">
          {logs.map((log, i) => (
            <div key={i} className="flex space-x-3 group">
              <span className="text-slate-700 select-none">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              <span className={`break-all ${
                log.includes('ERR') ? 'text-rose-500' : 
                log.includes('nexus@aurora') ? 'text-cyan-400 font-bold' : 
                'text-emerald-500/90'
              }`}>
                {log}
              </span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        <form onSubmit={handleCommand} className="mt-4 pt-4 border-t border-slate-800/50 flex items-center space-x-2">
          <span className="text-purple-500 font-black">nexus@aurora:~$</span>
          <input 
            type="text" 
            autoFocus
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type 'help' for commands..."
            className="bg-transparent border-none outline-none text-slate-100 w-full placeholder:text-slate-800 mono text-xs"
          />
        </form>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass border border-slate-800 p-5 rounded-3xl text-center bg-slate-900/10 shadow-lg">
          <p className="text-[8px] mono text-slate-600 uppercase mb-2 tracking-[0.2em]">Reddit Throughput</p>
          <p className="text-xl mono text-cyan-400 font-black">782 GB/s</p>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="w-4/5 h-full bg-cyan-500 animate-pulse"></div>
          </div>
        </div>
        <div className="glass border border-slate-800 p-5 rounded-3xl text-center bg-slate-900/10 shadow-lg">
          <p className="text-[8px] mono text-slate-600 uppercase mb-2 tracking-[0.2em]">Security Rating</p>
          <p className="text-xl mono text-purple-400 font-black">100% SVRGN</p>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="w-full h-full bg-purple-500"></div>
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
        <p className="text-[8px] mono text-rose-500/80 text-center uppercase font-black">
          CRITICAL: Unauthorized command execution triggers Rule 3 (20 years prison).
        </p>
      </div>
    </div>
  );
};

export default ApiTerminal;
