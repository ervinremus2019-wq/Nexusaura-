
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
    // Simulated as individual downloads for this environment
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
    <div className="h-full flex flex-col space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center px-1">
        <div className="space-y-0.5">
          <h3 className="text-[10px] mono text-slate-500 uppercase tracking-widest font-black">Nexus / production_v78b</h3>
          <p className="text-[8px] mono text-slate-700 uppercase">Developed Assets Repository</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleDownloadAll}
            className="px-3 py-1.5 bg-purple-600/20 border border-purple-500/40 text-purple-400 text-[9px] mono rounded-lg hover:bg-purple-500/40 active:scale-95 transition-all shadow-lg shadow-purple-900/10"
          >
            DOWNLOAD_FULL_SUITE
          </button>
        </div>
      </div>

      <div className="flex-1 glass border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        <div className="flex border-b border-slate-800 bg-slate-900/40 overflow-x-auto no-scrollbar">
          {files.map((file, idx) => (
            <button 
              key={file.id}
              onClick={() => setSelectedFileIdx(idx)}
              className={`px-6 py-3 text-[10px] mono border-r border-slate-800 transition-all min-w-max flex items-center space-x-2 ${
                selectedFileIdx === idx ? 'bg-slate-800/80 text-purple-400 border-b-2 border-b-purple-500' : 'text-slate-600 hover:bg-slate-800/50'
              }`}
            >
              <span className="opacity-40">{idx + 1}.</span>
              <span>{file.name}</span>
            </button>
          ))}
        </div>
        
        <div className="flex-1 p-6 overflow-auto scrollbar-hide bg-[#020617]/50 relative">
           <div className="absolute top-0 right-0 p-4 opacity-50 pointer-events-none">
             <p className="text-[10px] mono text-slate-800 select-none">SHA-256: {Math.random().toString(16).substr(2, 20)}</p>
           </div>
           <pre className="text-[12px] mono text-slate-400 leading-relaxed font-medium">
             <code className="block">
               <span className="text-slate-700 select-none">// {files[selectedFileIdx].name} - Modified: {files[selectedFileIdx].lastModified}</span>
               {"\n\n"}
               {files[selectedFileIdx].content}
             </code>
           </pre>
        </div>

        <div className="p-4 border-t border-slate-800 flex justify-between items-center bg-slate-900/20">
          <p className="text-[9px] mono text-slate-600 uppercase">Ready for production export</p>
          <button 
            onClick={handleDownloadFile}
            className="text-[9px] mono text-purple-400 hover:underline flex items-center space-x-1"
          >
            <span>Export this file</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      <div className="p-4 glass border border-rose-500/20 rounded-2xl bg-rose-500/5 flex items-start space-x-3">
        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 animate-pulse" />
        <div className="space-y-1">
          <p className="text-[10px] mono text-rose-500/90 font-black uppercase">LEGAL_SAFEGUARD_PROTOCOL</p>
          <p className="text-[9px] mono text-slate-500 leading-relaxed uppercase">
            Rule 5 Enforcement: Source code visibility is provided for audit only. Redistribution without a 50% profit-sharing contract signed by <span className="text-rose-400">Ervin Remus Radosavlevici</span> will result in Rule 3 prosecution (20 years prison).
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectLab;
