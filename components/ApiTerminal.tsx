import React, { useState, useEffect, useRef } from 'react';
import { processTerminalCommand } from '../services/geminiService';

interface Props {
  isAdmin: boolean;
}

const UNIVERSAL_ID = "rp_XSxeEG0hHDLrznQnGcQJ7ma0edt5WfwU";

interface CommandHistoryEntry {
  input: string;
  translated: string;
  timestamp: string;
  status: 'SUCCESS' | 'ERROR';
}

const ApiTerminal: React.FC<Props> = ({ isAdmin }) => {
  const [logs, setLogs] = useState<string[]>([
    `BOOT: UNIVERSAL_UPLINK_${UNIVERSAL_ID.slice(0, 12)}_LOADED`,
    "HANDSHAKE: SOVEREIGN_PROTOCOL_READY",
    "WATCHDOG: RADOSAVLEVICI_MONITORING_ACTIVE",
    "PRISON_JAIL: RULE_3_ENFORCEMENT_HOT",
    `SYSTEM: LISTENING_ON_${UNIVERSAL_ID.slice(0, 8)}...`
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
    setCommand('');
    setLogs(prev => [...prev, `${UNIVERSAL_ID.slice(0,6)}@svrgn:~$ ${rawInput}`]);

    setIsProcessing(true);
    const aiResponse = await processTerminalCommand(rawInput, isAdmin);
    setIsProcessing(false);
    
    const newLogs = [...aiResponse.logs];
    if (aiResponse.output) newLogs.push(`>> ${aiResponse.output}`);
    setLogs(prev => [...prev, ...newLogs].slice(-40));
  };

  return (
    <div className="h-full flex flex-col space-y-5 pt-6 pb-24 px-1" role="region" aria-label="Developer Console">
      <header className="flex justify-between items-center mb-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">Sovereign_Console</h2>
          <p className="text-[10px] mono text-slate-500 uppercase tracking-widest font-black">Secure Uplink Interface</p>
        </div>
        <button 
          onClick={() => setLogs([`BOOT: UPLINK_${UNIVERSAL_ID.slice(0,8)}_RESET`])}
          className="px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-[9px] mono text-slate-400 font-bold uppercase active:bg-slate-800"
        >
          Reset_Buffer
        </button>
      </header>

      <div className="flex-1 glass bg-[#010409]/95 border border-white/15 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-rose-500 to-cyan-500 opacity-50"></div>
        
        <div className="flex-1 p-6 font-mono text-[10px] overflow-y-auto scrollbar-hide no-scrollbar space-y-1.5 leading-relaxed font-bold">
          {logs.map((log, i) => (
            <div key={i} className="flex space-x-3 group">
              <span className="text-slate-800 select-none opacity-40 font-black tracking-tighter">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              <span className={`break-all ${
                log.includes('ERR') || log.includes('ALERT') || log.includes('PRISON') ? 'text-rose-500' : 
                log.includes(`${UNIVERSAL_ID.slice(0,6)}@svrgn`) ? 'text-cyan-400 font-black' : 
                log.startsWith('>>') ? 'text-purple-400' :
                'text-emerald-500/70'
              }`}>
                {log}
              </span>
            </div>
          ))}
          {isProcessing && (
            <div className="flex space-x-3 animate-pulse py-1">
              <span className="text-slate-800">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-amber-500 font-black italic tracking-tighter">UPLINK: ENCRYPTING_REQUEST...</span>
            </div>
          )}
          <div ref={logEndRef} />
        </div>

        <form onSubmit={handleCommand} className="p-5 bg-black/60 border-t border-white/10 flex items-center space-x-3">
          <span className="text-purple-500 font-black mono text-xs">{UNIVERSAL_ID.slice(0, 4)}:~$</span>
          <input 
            type="text" 
            autoFocus
            disabled={isProcessing}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="System command..."
            className="bg-transparent border-none outline-none text-slate-100 w-full placeholder:text-slate-800 mono text-xs disabled:opacity-50 font-bold"
            aria-label="Terminal command input"
          />
        </form>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
        <p className="text-[9px] mono text-slate-700 text-center uppercase font-black tracking-[0.1em] leading-relaxed">
          Channel {UNIVERSAL_ID} is 100% monitored. Rule 3 Active. Ervin & AGI Radosavlevici owners.
        </p>
      </div>
    </div>
  );
};

export default ApiTerminal;