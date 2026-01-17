
import React from 'react';
import { SystemStatus } from '../types';

interface Props {
  status: SystemStatus;
  isAdmin: boolean;
  onLogoTap: () => void;
}

const SecurityHeader: React.FC<Props> = ({ status, isAdmin, onLogoTap }) => {
  return (
    <header className="px-6 py-5 glass sticky top-0 z-[60] flex items-center justify-between border-b border-white/5 shadow-2xl">
      <div 
        onClick={onLogoTap}
        className="flex items-center space-x-4 cursor-pointer select-none group"
      >
        <div className={`w-11 h-11 flex items-center justify-center rounded-[1rem] border transition-all duration-500 ${
          isAdmin 
            ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-purple-400' 
            : 'border-slate-800 bg-slate-900 text-slate-600 group-hover:border-slate-700'
        }`}>
          <div className="relative">
             <span className="text-[13px] font-black mono tracking-tighter italic">RS</span>
             {isAdmin && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full animate-ping"></div>}
          </div>
        </div>
        <div className="space-y-0.5">
          <h1 className="text-[11px] font-black tracking-[0.3em] text-slate-100 uppercase mono">Radosavlevici_Sovereign</h1>
          <p className={`text-[8px] mono leading-none font-bold uppercase tracking-widest ${isAdmin ? 'text-purple-400' : 'text-slate-600'}`}>
            Aurora_Assistant_78B
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden md:flex flex-col items-end mr-4">
           <span className="text-[7px] mono text-slate-600 uppercase tracking-widest">Uplink_Node</span>
           <span className="text-[9px] mono text-emerald-500 font-bold uppercase tracking-widest">Secure_SSL</span>
        </div>
        <div className={`px-4 py-1.5 rounded-xl text-[9px] mono font-black border tracking-[0.1em] transition-all duration-500 ${
          isAdmin 
            ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
            : 'bg-slate-900/80 text-slate-600 border-slate-800'
        }`}>
          {status}
        </div>
      </div>
    </header>
  );
};

export default SecurityHeader;
