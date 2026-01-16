
import React from 'react';
import { VaultEntry } from '../types';

interface Props {
  entries: VaultEntry[];
}

const SecretVault: React.FC<Props> = ({ entries }) => {
  return (
    <div className="space-y-3">
      {entries.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-slate-600 mono text-xs uppercase tracking-widest">
          Vault is empty
        </div>
      ) : (
        entries.map((entry, idx) => (
          <div 
            key={entry.id} 
            className="p-3 rounded-lg border-l-2 glass border-slate-800 animate-in slide-in-from-right-4"
            style={{ 
              borderColor: entry.type === 'SECURITY' ? '#f43f5e' : entry.type === 'LOG' ? '#06b6d4' : '#10b981',
              animationDelay: `${idx * 50}ms`
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`text-[8px] font-bold mono uppercase ${
                entry.type === 'SECURITY' ? 'text-rose-500' : entry.type === 'LOG' ? 'text-cyan-500' : 'text-emerald-500'
              }`}>
                {entry.type}
              </span>
              <span className="text-[8px] text-slate-600 mono">{entry.timestamp}</span>
            </div>
            <p className="text-[11px] font-medium leading-relaxed text-slate-300 mono whitespace-pre-line">
              {entry.data}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default SecretVault;
