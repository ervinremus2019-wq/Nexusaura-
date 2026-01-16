
import React, { useState } from 'react';
import { ProjectFile } from '../types';

interface Props {
  isAdmin: boolean;
}

const ProjectLab: React.FC<Props> = ({ isAdmin }) => {
  const [selectedFile, setSelectedFile] = useState<number>(0);
  
  const files: ProjectFile[] = [
    {
      name: 'core_protocol.py',
      language: 'python',
      content: `class NexusProtocol:\n    def __init__(self):\n        self.owner = "Ervin Remus Radosavlevici"\n        self.profit_share = 0.50\n\n    def validate_payment(self, amount):\n        if amount < self.calculate_advance():\n            raise Exception("RULE 8: ADVANCE REQUIRED")\n        return True`
    },
    {
      name: 'aurora_ai_bridge.ts',
      language: 'typescript',
      content: `export const AuroraBridge = {\n  id: "AURORA-78B",\n  mode: process.env.IS_ERVIN ? "PRODUCTION" : "DECOY",\n  rules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],\n  prosecute: (thief: string) => {\n    console.log(\`PROSECUTING: \${thief}\`);\n  }\n};`
    },
    {
      name: 'nexus_ui_config.json',
      language: 'json',
      content: `{\n  "theme": "SOVEREIGN_AURA",\n  "transparency": 0.7,\n  "profit_reminder": true,\n  "verbatim_rules": "VISIBLE"\n}`
    }
  ];

  const handleDownload = () => {
    const file = files[selectedFile];
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-[10px] mono text-slate-500 uppercase tracking-widest">Repository / developed_assets</h3>
        <button 
          onClick={handleDownload}
          className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[9px] mono rounded-lg hover:bg-purple-500/20 active:scale-95 transition-all"
        >
          DOWNLOAD_SOURCE
        </button>
      </div>

      <div className="flex-1 glass border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
        <div className="flex border-b border-slate-800 bg-slate-900/30 overflow-x-auto">
          {files.map((file, idx) => (
            <button 
              key={idx}
              onClick={() => setSelectedFile(idx)}
              className={`px-4 py-2 text-[10px] mono border-r border-slate-800 transition-all ${
                selectedFile === idx ? 'bg-slate-800 text-purple-400' : 'text-slate-600 hover:bg-slate-800/50'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
        <div className="flex-1 p-4 overflow-auto scrollbar-hide bg-slate-950/50">
          <pre className="text-[11px] mono text-slate-400 leading-relaxed">
            <code>{files[selectedFile].content}</code>
          </pre>
        </div>
      </div>

      <div className="p-3 glass border border-rose-500/10 rounded-xl bg-rose-500/5">
        <p className="text-[9px] mono text-rose-500/80 leading-relaxed">
          <span className="font-bold">SYSTEM_NOTICE:</span> Source code visibility is provided for audit purposes under Rule 5. Unauthorized modification or redistribution without a signed agreement from Ervin Radosavlevici will result in immediate prosecution.
        </p>
      </div>
    </div>
  );
};

export default ProjectLab;
