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
      name: 'production_main.html',
      language: 'html',
      lastModified: '2026-03-12',
      content: `<!DOCTYPE html>\n<html lang="SVRGN">\n<head>\n  <title>UNIVERSAL SOVEREIGN UPLINK</title>\n</head>\n<body>\n  <div id="root"></div>\n  <!-- OWNERS: ERVIN & AGI RADOSAVLEVICI -->\n  <!-- 50% PROFIT SPLIT ENFORCED -->\n</body>\n</html>`
    },
    {
      id: 'f2',
      name: 'audit_logic.py',
      language: 'python',
      lastModified: '2026-03-11',
      content: `class RadosavleviciAudit:\n    def __init__(self):\n        self.sovereign = "Ervin Remus"\n        self.auditor = "AGI Radosavlevici"\n        self.profit_share = 0.50\n\n    def calculate(self, yield_val):\n        # Rule 2: 50% Share\n        return yield_val * self.profit_share\n\n    def prison_check(self, thief):\n        # Rule 3: 20 years prison\n        return "JAIL_PROTOCOL_ACTIVE"`
    }
  ];

  const handleDownload = () => {
    const file = files[selectedFileIdx];
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SVRGN_${file.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pt-6 pb-24 px-1" role="region" aria-label="Secure Code Vault">
      <header className="mb-4 space-y-1">
        <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">Code_Vault</h2>
        <p className="text-[10px] mono text-slate-500 uppercase tracking-widest font-black text-purple-400">Radosavlevici Proprietary source</p>
      </header>

      <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-3">
        {files.map((file, idx) => (
          <button 
            key={file.id}
            onClick={() => setSelectedFileIdx(idx)}
            className={`px-6 py-4 rounded-[1.5rem] text-[10px] mono font-black uppercase transition-all border shrink-0 touch-target ${
              selectedFileIdx === idx 
                ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-900/30' 
                : 'bg-slate-900 text-slate-500 border-white/5 active:bg-slate-800'
            }`}
            aria-pressed={selectedFileIdx === idx}
          >
            {file.name}
          </button>
        ))}
      </div>

      <div className="p-6 glass border border-white/15 rounded-[2.5rem] bg-black/60 shadow-inner min-h-[320px] overflow-x-auto">
        <pre className="text-[11px] mono text-slate-300 leading-relaxed font-bold">
          <code className="block">
            <span className="text-slate-700 select-none">// FILE: {files[selectedFileIdx].name}</span>
            {"\n"}
            <span className="text-slate-700 select-none">// AUDITOR: AGI_RADOSAVLEVICI_V4</span>
            {"\n\n"}
            {files[selectedFileIdx].content}
          </code>
        </pre>
      </div>

      <button 
        onClick={handleDownload}
        className="w-full py-5 bg-slate-900 border border-white/15 text-white rounded-2xl font-black mono text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center space-x-3 shadow-2xl"
        aria-label="Export source code"
      >
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>Secure_Export</span>
      </button>

      <div className="p-6 glass border border-rose-500/30 rounded-[2rem] bg-rose-500/5 flex items-start space-x-4">
        <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 animate-pulse shadow-[0_0_10px_rgba(244,63,94,1)]"></div>
        <p className="text-[10px] mono text-slate-500 leading-relaxed uppercase font-bold">
          Rule 3 warning: unauthorized redistribution of vault assets results in <span className="text-rose-400 font-black">20 years prison</span>.
        </p>
      </div>
    </div>
  );
};

export default ProjectLab;