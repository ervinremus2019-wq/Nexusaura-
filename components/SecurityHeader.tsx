import React from 'react';
import { SystemStatus } from '../types';

interface Props {
  status: SystemStatus;
  isAdmin: boolean;
  onLogoTap: () => void;
}

const UNIVERSAL_ID = "rp_XSxeEG0hHDLrznQnGcQJ7ma0edt5WfwU";

const SecurityHeader: React.FC<Props> = ({ status, isAdmin, onLogoTap }) => {
  return (
    <header className="px-5 py-4 safe-area-inset-top glass border-b border-white/5 sticky top-0 z-[60] flex items-center justify-between shadow-lg">
      <div 
        className="flex items-center space-x-3 cursor-pointer select-none touch-target" 
        onClick={onLogoTap} 
        role="button" 
        aria-label="Access Sovereign Identity"
      >
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isAdmin 
            ? 'border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/20' 
            : 'border-slate-800 bg-slate-900'
        }`}>
          <span className={`text-[11px] font-black mono italic ${isAdmin ? 'text-purple-400' : 'text-slate-600'}`}>
            {UNIVERSAL_ID.slice(3, 5).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-black tracking-tight text-white leading-tight uppercase">Uplink_{UNIVERSAL_ID.slice(0, 8)}</h1>
          <div className="flex items-center space-x-1.5">
            <div className={`w-2 h-2 rounded-full ${status === 'PRODUCTION' ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`} aria-hidden="true" />
            <span className="text-[10px] font-bold text-slate-500 mono uppercase tracking-tight">
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className={`px-2.5 py-1 rounded-full text-[8px] mono font-black border transition-colors ${
          isAdmin ? 'text-purple-400 border-purple-500/30 bg-purple-500/5' : 'text-slate-600 border-slate-800'
        }`}>
          {isAdmin ? 'ADMIN' : 'GUEST'}
        </div>
        {isAdmin && (
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
        )}
      </div>
    </header>
  );
};

export default SecurityHeader;