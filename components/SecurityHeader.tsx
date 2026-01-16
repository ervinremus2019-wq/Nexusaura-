
import React from 'react';
import { SystemStatus } from '../types';

interface Props {
  status: SystemStatus;
  isAdmin: boolean;
  onLogoTap: () => void;
}

const SecurityHeader: React.FC<Props> = ({ status, isAdmin, onLogoTap }) => {
  return (
    <header className="p-4 glass sticky top-0 z-50 flex items-center justify-between border-b border-purple-500/10">
      <div 
        onClick={onLogoTap}
        className="flex items-center space-x-3 cursor-pointer select-none active:scale-95 transition-transform"
      >
        <div className={`w-9 h-9 flex items-center justify-center rounded-xl border ${isAdmin ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] text-purple-400' : 'border-slate-800 text-slate-600'}`}>
          <div className="relative">
             <span className="text-xs font-bold mono">NX</span>
             {isAdmin && <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>}
          </div>
        </div>
        <div>
          <h1 className="text-xs font-bold tracking-[0.15em] text-slate-100 uppercase">Nexus Sovereign</h1>
          <p className="text-[9px] text-purple-500 mono leading-none font-bold">AURORA_ASSISTANT</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className={`px-2 py-0.5 rounded-full text-[9px] mono font-bold border transition-all ${
          isAdmin 
            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
            : 'bg-slate-900 text-slate-600 border-slate-800'
        }`}>
          {status}
        </div>
      </div>
    </header>
  );
};

export default SecurityHeader;
