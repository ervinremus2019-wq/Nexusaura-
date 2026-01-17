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
      content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>NEXUS SOVEREIGN AURA</title>\n</head>\n<body>\n  <div id="root"></div>\n  <!-- OWNERS: ERVIN & ADI RADOSAVLEVICI -->\n  <!-- RULE 6 ENFORCEMENT: 50% PROFIT SHARE REQUIRED -->\n</body>\n</html>`
    },
    {
      id: 'f2',
      name: 'audit_protocol.py',
      language: 'python',
      lastModified: '2026-03-11',
      content: `class AuditSystem:\n    def __init__(self):\n        self.sovereign = "Ervin Remus Radosavlevici"\n        self.auditor = "Adi Radosavlevici"\n        self.profit_share = 0.50\n\n    def validate_math(self, amount):\n        # Adi Radosavlevici Audit Protocol\n        if amount < 0:\n            raise Exception("RULE 8: INVALID CALCULATION")\n        return amount * self.profit_share\n\n    def enforce_rule_3(self, user_id):\n        # 20 years prison for thieves\n        return "PROSECUTION_BY_ERVIN"`
    },
    {
      id: 'f3',
      name: 'aurora_ai_bridge.ts',
      language: 'typescript',
      lastModified: '2026-03-12',
      content: `export const AuroraBridge = {\n  id: "AURORA-78B",\n  owners: ["ERVIN_RADOSAVLEVICI", "ADI_RADOSAVLEVICI"],\n  rules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],\n  executeAudit: async (amount: number) => {\n    const share = amount * 0.5;\n    return await AdiVault.verifyAndDeposit(share);\n  }\n};`
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
          <p className="text-[9px] mono text-slate-500 uppercase">Version 78B Repository | Audited by Adi Radosavlevici</p>
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
           <pre className="text-[13px] mono text-slate-400 leading-relaxed font-medium">
             <code className="block">
               <span className="text-slate-700 select-none">// FILE: {files[selectedFileIdx].name} | AUDIT: ADI_RADOSAVLEVICI</span>
               {"\n"}
               <span className="text-slate-700 select-none">// SECURITY: RULE_3_PRISON_ACTIVE</span>
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
            <span>EXTRACT_{files[selectedFileIdx].name}</span>
          </button>
        </div>
      </div>

      <div className="p-6 glass border border-rose-500/20 rounded-[2rem] bg-rose-500/5 flex items-start space-x-5">
        <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 animate-pulse" />
        <div className="space-y-1">
          <p className="text-[11px] mono text-rose-500 font-black uppercase tracking-[0.2em]">RULE_5_LEGAL_OVERRIDE_ACTIVE</p>
          <p className="text-[10px] mono text-slate-500 leading-relaxed uppercase">
            Audits managed by <span className="text-rose-400 font-bold">Adi Radosavlevici</span> to ensure 100% calculation accuracy.
            <span className="text-rose-900 font-black ml-2 underline">RULE 3 ENFORCED BY ERVIN REMUS RADOSAVLEVICI.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectLab;