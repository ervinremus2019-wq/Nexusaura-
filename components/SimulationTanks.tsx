
import React from 'react';
import { Simulation } from '../types';

interface Props {
  simulations: Simulation[];
}

const SimulationTanks: React.FC<Props> = ({ simulations }) => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-24">
      {simulations.length === 0 && (
        <div className="h-48 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-3xl text-slate-600 bg-slate-950/20">
          <div className="w-12 h-12 border-2 border-slate-800 rounded-full flex items-center justify-center mb-4 text-2xl animate-pulse">!</div>
          <p className="text-[10px] mono uppercase tracking-[0.3em] font-black">Process_Tanks_Idle</p>
          <p className="text-[8px] mono mt-2">Rule 8: Payment required to launch.</p>
        </div>
      )}
      {[...simulations].reverse().map(sim => (
        <div 
          key={sim.id} 
          className="glass border border-slate-800 p-6 rounded-3xl space-y-4 relative overflow-hidden animate-in slide-in-from-bottom-4 duration-500 shadow-2xl"
        >
          {sim.status === 'RUNNING' && (
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-cyan-900">
               <div className="h-full bg-cyan-400 animate-progress shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            </div>
          )}
          
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <div className={`w-3 h-3 rounded-full mt-1.5 ${
                sim.status === 'RUNNING' ? 'bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.6)]' : 
                sim.status === 'FAILED' ? 'bg-rose-500' :
                'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              }`} />
              <div className="space-y-1">
                <p className="text-[11px] font-black mono text-slate-100 uppercase tracking-widest">{sim.id}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-[8px] mono text-slate-600 uppercase">Load: {sim.load}%</span>
                  <span className="text-[8px] mono text-slate-800">|</span>
                  <span className={`text-[8px] mono uppercase font-black ${
                    sim.threatLevel === 'HIGH' ? 'text-rose-500' : 'text-slate-600'
                  }`}>Threat: {sim.threatLevel}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] mono text-slate-600 uppercase leading-none mb-1 font-black">Valuation / Rule 2 Share</p>
              <p className={`text-xs mono font-black ${sim.status === 'RUNNING' ? 'text-slate-600 italic animate-pulse' : 'text-cyan-400'}`}>
                {sim.valuation || 'UPLINK_PENDING...'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-24 gap-1 h-3">
            {[...Array(24)].map((_, i) => (
              <div 
                key={i} 
                className={`rounded-sm transition-all duration-700 ${
                  sim.status === 'RUNNING' 
                    ? (Math.random() > 0.4 ? 'bg-cyan-500/60 shadow-[0_0_5px_rgba(34,211,238,0.3)]' : 'bg-slate-900') 
                    : sim.status === 'FAILED' ? 'bg-rose-900/40' : 'bg-emerald-500/20'
                }`}
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center text-[7px] mono text-slate-700 uppercase font-black">
            <span>Aura_Stream_Verified</span>
            <span>Security_Hash: 0x{sim.id.split('-')[1]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimulationTanks;
