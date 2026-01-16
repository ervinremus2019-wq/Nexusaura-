
import React, { useState } from 'react';

interface Props {
  isAdmin: boolean;
}

const ApiTerminal: React.FC<Props> = ({ isAdmin }) => {
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING_API_BRIDGE...",
    "HANDSHAKE_ESTABLISHED: REDDIT_CORE_UPLINK",
    "POLLING_STATUS: 200 OK",
    "PROFIT_WATCHDOG: ACTIVE",
    "ENFORCING_RULE_6_HEURISTICS..."
  ]);

  const addLog = () => {
    const newLog = `EVENT_${Math.floor(Math.random()*1000)}: UPLINK_SYNC_SUCCESS_BY_ERVIN`;
    setLogs(prev => [...prev, newLog].slice(-10));
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-[10px] mono text-slate-500 uppercase tracking-widest">Production API / Console</h3>
        <button 
          onClick={addLog}
          className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] mono rounded-lg hover:bg-emerald-500/20 active:scale-95 transition-all"
        >
          REFRESH_API
        </button>
      </div>

      <div className="glass bg-black/40 border border-slate-800 rounded-2xl p-6 font-mono text-[11px] min-h-[300px] flex flex-col">
        <div className="flex-1 space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="flex space-x-3">
              <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>
              <span className={log.includes('FAIL') ? 'text-rose-500' : 'text-emerald-500'}>
                {log}
              </span>
            </div>
          ))}
          <div className="flex space-x-3 animate-pulse">
            <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>
            <span className="text-purple-400">WAITING_FOR_SOVEREIGN_COMMAND_...</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center space-x-2">
          <span className="text-purple-500">nexus@aurora:~$</span>
          <input 
            type="text" 
            placeholder="sudo execute..."
            className="bg-transparent border-none outline-none text-slate-300 w-full placeholder:text-slate-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass border border-slate-800 p-4 rounded-xl text-center">
          <p className="text-[8px] mono text-slate-600 uppercase mb-1">API Throughput</p>
          <p className="text-lg mono text-cyan-400 font-bold">782 GB/s</p>
        </div>
        <div className="glass border border-slate-800 p-4 rounded-xl text-center">
          <p className="text-[8px] mono text-slate-600 uppercase mb-1">Security Score</p>
          <p className="text-lg mono text-purple-400 font-bold">100% SVRGN</p>
        </div>
      </div>
    </div>
  );
};

export default ApiTerminal;
