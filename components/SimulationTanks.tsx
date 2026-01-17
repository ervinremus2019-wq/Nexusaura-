import React from 'react';
import { Simulation } from '../types';

interface Props {
  simulations: Simulation[];
}

const SimulationTanks: React.FC<Props> = ({ simulations }) => {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {simulations.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-[2rem] text-slate-600 bg-slate-950/20">
          <p className="text-[12px] mono uppercase tracking-[0.4em] font-black opacity-30">Nexus_Data_Tanks_Inactive</p>
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <table className="w-full text-left mono text-[11px] border-separate border-spacing-y-2">
            <thead className="text-[9px] text-slate-600 uppercase tracking-widest sticky top-0 bg-slate-950/20 backdrop-blur z-10">
              <tr>
                <th className="px-6 py-4 font-black">Portal_ID</th>
                <th className="px-6 py-4 font-black text-center">Status</th>
                <th className="px-6 py-4 font-black">Sys_Load</th>
                <th className="px-6 py-4 font-black text-right">Rule_2_Valuation</th>
                <th className="px-6 py-4 font-black text-center">Threat</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {[...simulations].reverse().map(sim => (
                <tr 
                  key={sim.id} 
                  className="glass border border-white/5 hover:border-purple-500/30 transition-all group group-hover:bg-white/5"
                >
                  <td className="px-6 py-6 font-black text-slate-100 rounded-l-3xl border-l border-t border-b border-white/5">{sim.id}</td>
                  <td className="px-6 py-6 text-center border-t border-b border-white/5">
                    <div className="flex items-center justify-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        sim.status === 'RUNNING' ? 'bg-cyan-400 animate-pulse' : 
                        sim.status === 'FAILED' ? 'bg-rose-500' : 'bg-emerald-500'
                      }`} />
                      <span className={`text-[9px] font-black uppercase ${
                         sim.status === 'RUNNING' ? 'text-cyan-400' : 
                         sim.status === 'FAILED' ? 'text-rose-400' : 'text-emerald-400'
                      }`}>{sim.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-t border-b border-white/5">
                    <div className="flex items-center space-x-3 w-32">
                      <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${sim.status === 'RUNNING' ? 'bg-purple-500' : 'bg-slate-700'}`}
                          style={{ width: `${sim.load}%` }}
                        />
                      </div>
                      <span className="text-slate-500 font-bold">{sim.load}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right font-black text-emerald-400 tracking-tighter border-t border-b border-white/5">
                    {sim.valuation || 'ESTIMATING...'}
                  </td>
                  <td className="px-6 py-6 text-center rounded-r-3xl border-r border-t border-b border-white/5">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                      sim.threatLevel === 'HIGH' ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-800 text-slate-600'
                    }`}>
                      {sim.threatLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SimulationTanks;