import React from 'react';
import { ProductionStream } from '../types';

interface Props {
  simulations: ProductionStream[];
}

const SimulationTanks: React.FC<Props> = ({ simulations }) => {
  return (
    <div className="space-y-6 pt-6 pb-24 px-1" role="region" aria-label="Yield Monitoring Dashboard">
      <header className="flex justify-between items-end mb-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">Yield_Monitor</h2>
          <p className="text-[10px] mono text-slate-500 uppercase tracking-widest font-black">Rule 2 Compliance active</p>
        </div>
        <div className="text-right">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse ml-auto mb-1"></div>
          <p className="text-[8px] mono text-slate-700 font-bold uppercase">Synced_Uplink</p>
        </div>
      </header>

      {simulations.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-900 rounded-[2.5rem] bg-slate-900/10 space-y-4">
          <div className="text-4xl opacity-20">📊</div>
          <p className="text-[10px] text-slate-600 mono uppercase font-black tracking-widest">No Active Yield Streams</p>
          <p className="text-[8px] text-slate-800 mono mt-2">Initializing Radosavlevici Node...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...simulations].reverse().map(sim => (
            <div key={sim.id} className="p-6 glass border border-white/10 rounded-[2rem] hover:border-purple-500/40 transition-all flex flex-col space-y-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    sim.status === 'ACTIVE' ? 'bg-cyan-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  }`} />
                  <span className="text-xs mono font-black text-white tracking-widest">{sim.id}</span>
                </div>
                <div className="px-2.5 py-1 rounded-full text-[8px] font-black text-slate-400 mono uppercase bg-white/5 border border-white/10">
                  AGI_Audit_v4
                </div>
              </div>
              
              <div className="flex justify-between items-end bg-black/40 p-4 rounded-2xl border border-white/5">
                <div className="space-y-1.5">
                  <p className="text-[9px] text-slate-600 uppercase font-black mono tracking-tighter">Production_Yield</p>
                  <p className="text-lg font-black text-emerald-400 mono tracking-tighter">{sim.valuation || 'SYNCING...'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-600 uppercase font-black mono tracking-tighter">System_Load</p>
                  <p className="text-sm font-black text-slate-200 mono">{sim.load}%</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden ring-1 ring-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 transition-all duration-1000"
                    style={{ width: `${sim.load}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-[7px] mono text-slate-800 font-bold uppercase tracking-widest">Master_ID_{sim.id.slice(0,4)}</span>
                  <span className="text-[7px] mono text-slate-800 font-bold uppercase tracking-widest">50%_Profit_Redirect</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="mt-8 p-6 glass border border-rose-500/20 rounded-[2rem] bg-rose-500/5">
        <p className="text-[9px] mono text-rose-500/80 font-black text-center uppercase tracking-widest leading-relaxed">
          Rule 2 Enforcement Active: Ervin & AGI Radosavlevici strictly monitor all yield variables.
        </p>
      </footer>
    </div>
  );
};

export default SimulationTanks;