
import React, { useState } from 'react';
import { ProjectFile } from '../types';

interface Props {
  isAdmin: boolean;
}

const ProjectLab: React.FC<Props> = ({ isAdmin }) => {
  const [selectedFileIdx, setSelectedFileIdx] = useState<number>(0);
  
  const files: ProjectFile[] = [
    {
      id: 'f1',
      name: 'index.html',
      language: 'html',
      lastModified: '2026-03-12',
      content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>NEXUS SOVEREIGN AURA</title>\n</head>\n<body>\n  <div id="root"></div>\n  <!-- RULE 6 ENFORCEMENT: 50% PROFIT SHARE REQUIRED -->\n</body>\n</html>`
    },
    {
      id: 'f2',
      name: 'core_protocol.py',
      language: 'python',
      lastModified: '2026-03-11',
      content: `class SovereignAura:\n    def __init__(self):\n        self.owner = "Ervin Remus Radosavlevici"\n        self.profit_share = 0.50\n\n    def validate_payment(self, amount):\n        if amount < self.calculate_advance():\n            raise Exception("RULE 8: ADVANCE REQUIRED")\n        return True\n\n    def prosecute_thief(self, user_id):\n        # Logic for Rule 3: 20 years prison\n        Log.security("THIEF_DETECTED", user_id)\n        return "PROSECUTION_INITIATED"`
    },
    {
      id: 'f3',
      name: 'aurora_ai_bridge.ts',
      language: 'typescript',
      lastModified: '2026-03-12',
      content: `export const AuroraBridge = {\n  id: "AURORA-78B",\n  owner: "ERVIN_RADOSAVLEVICI",\n  mode: process.env.IS_ERVIN ? "PRODUCTION" : "DECOY",\n  rules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],\n  shareProfit: async (amount: number) => {\n    const share = amount * 0.5;\n    return await ErvinVault.deposit(share);\n  }\n};`
    },
    {
      id: 'f4',
      name: 'reddit_api_connector.js',
      language: 'javascript',
      lastModified: '2026-03-10',
      content: `const RedditOnly = {\n  apiKey: process.env.REDDIT_SECRET,\n  pollMarket: () => {\n    // Extract sentiment for Ervin's profit projections\n    return fetch('https://api.reddit.com/r/investing/top');\n  }\n};`
    },
    {
      id: 'f5',
      name: 'global_workflow.config',
      language: 'plaintext',
      lastModified: '2026-03-12',
      content: `WORKFLOW_ID=NX-78B\nENFORCE_SOVEREIGNTY=TRUE\nPROFIT_TARGET=50%\nUSER_GUEST_ACCESS=DECOY_ONLY\nOWNER_ACCESS=FULL_PRODUCTION`
    }
  ];

  const handleDownloadFile = () => {
    const file = files[selectedFileIdx];
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    files.forEach((file, idx) => {
      setTimeout(() => {
        const blob = new Blob([file.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nexus_project_${file.name}`;
        a.click();
        URL.revokeObjectURL(url);
      }, idx * 300);
    });
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in slide-in-from-right-10 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/40 p-6 rounded-[2rem] border border-white/5 backdrop-blur-md">
        <div className="space-y-1">
          <h3 className="text-sm mono text-slate-100 uppercase tracking-widest font-black">Production_Code_Vault</h3>
          <p className="text-[9px] mono text-slate-500 uppercase">Version 78B Repository / Ervin Sovereign Suite</p>
        </div>
        <button 
          onClick={handleDownloadAll}
          className="w-full sm:w-auto px-6 py-3 bg-purple-600/20 border border-purple-500/40 text-purple-400 text-[10px] mono rounded-2xl hover:bg-purple-500/40 active:scale-95 transition-all shadow-xl font-black btn-sovereign"
        >
          EXPORT_FULL_PRODUCTION_REPOSITORY
        </button>
      </div>

      <div className="flex-1 glass border border-slate-800 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex bg-slate-950/60 border-b border-white/5 overflow-x-auto scrollbar-hide no-scrollbar">
          {files.map((file, idx) => (
            <button 
              key={file.id}
              onClick={() => setSelectedFileIdx(idx)}
              className={`px-8 py-5 text-[10px] mono transition-all border-r border-white/5 shrink-0 flex items-center space-x-3 ${
                selectedFileIdx === idx ? 'bg-purple-500/10 text-purple-400 border-b-2 border-b-purple-500' : 'text-slate-600 hover:bg-white/5'
              }`}
            >
              <span className="opacity-20 text-[8px]">{idx + 1}.</span>
              <span className="font-bold tracking-widest">{file.name}</span>
            </button>
          ))}
        </div>
        
        <div className="flex-1 p-8 overflow-auto scrollbar-hide bg-[#020617]/40 relative">
           <div className="absolute top-4 right-8 p-3 opacity-20 pointer-events-none text-right">
             <p className="text-[10px] mono text-slate-500 uppercase font-black tracking-widest">Sovereign_Hash</p>
             <p className="text-[8px] mono text-slate-700">SHA-256: {Math.random().toString(16).substr(2, 24).toUpperCase()}</p>
           </div>
           <pre className="text-[13px] mono text-slate-400 leading-relaxed font-medium">
             <code className="block">
               <span className="text-slate-700 select-none">// FILE: {files[selectedFileIdx].name} | LAST_AUTH_CHANGE: {files[selectedFileIdx].lastModified}</span>
               {"\n"}
               <span className="text-slate-700 select-none">// SECURITY_PROTOCOL: RULE_MANDATORY_SHARE_50</span>
               {"\n\n"}
               {files[selectedFileIdx].content}
             </code>
           </pre>
        </div>

        <div className="p-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center bg-slate-950/40 gap-4">
          <p className="text-[9px] mono text-slate-600 uppercase tracking-widest">System Ready for Production Deployment</p>
          <button 
            onClick={handleDownloadFile}
            className="flex items-center space-x-3 text-[10px] mono text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/5 px-6 py-2 rounded-xl border border-purple-500/10 font-bold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>EXTRACT_{files[selectedFileIdx].name}</span>
          </button>
        </div>
      </div>

      <div className="p-6 glass border border-rose-500/20 rounded-[2rem] bg-rose-500/5 flex items-start space-x-5">
        <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
        <div className="space-y-1">
          <p className="text-[11px] mono text-rose-500 font-black uppercase tracking-[0.2em]">RULE_5_LEGAL_OVERRIDE_ACTIVE</p>
          <p className="text-[10px] mono text-slate-500 leading-relaxed uppercase">
            Redistribution without a signed profit-sharing contract from <span className="text-rose-400 font-bold">Ervin Remus Radosavlevici</span> triggers immediate Rule 3 enforcement. 
            <span className="text-rose-900 font-black ml-2 underline decoration-rose-900/40">20 YEARS PRISON MANDATORY.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectLab;
