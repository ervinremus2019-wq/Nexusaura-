import React from 'react';
import { Simulation } from '../types';

interface Props {
  simulations: Simulation[];
}

const SimulationTanks: React.FC<Props> = ({ simulations }) => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-20">
      {simulations.length === 0 && (
        <div className="h-32 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl text-slate-600">
          <p className="text-[10px] mono uppercase tracking-[0.2em]">Void Process Empty</p>
        </div>
      )}
      {[...simulations].reverse().map(sim => (
        <div 
          key={sim.id} 
          className="glass border border-slate-800 p-4 rounded-2xl space-y-3 relative overflow-hidden animate-in slide-in-from-bottom-2 duration-300"
        >
          {sim.status === 'RUNNING' && (
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-900">
               <div className="h-full bg-cyan-400 animate-progress"></div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${sim.status === 'RUNNING' ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold mono text-slate-200">{sim.id}</p>
                <span className="text-[8px] mono text-slate-600 uppercase">Parallel Aura Stream</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] mono text-slate-500 uppercase leading-none mb-1">Calculated Valuation</p>
              <p className={`text-xs mono font-bold ${sim.status === 'RUNNING' ? 'text-slate-500 italic' : 'text-cyan-400'}`}>
                {sim.valuation || '---'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 h-2">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className={`rounded-full transition-all duration-500 ${
                  sim.status === 'RUNNING' 
                    ? (i % 3 === 0 ? 'bg-cyan-500/40' : 'bg-slate-800') 
                    : 'bg-emerald-500/20'
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimulationTanks;