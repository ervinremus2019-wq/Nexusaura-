
import React from 'react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const UNIVERSAL_ID = "rp_XSxeEG0hHDLrznQnGcQJ7ma0edt5WfwU";

const AppNavigator: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const nodes = [
    { id: 'chat', label: 'UNIVERSAL CORE', status: 'ACTIVE', desc: `Sovereign AI node via ${UNIVERSAL_ID}.` },
    { id: 'sims', label: 'PROFIT STREAMS', status: 'MONITORING', desc: `Market dominance via Universal API yield.` },
    { id: 'lab', label: 'SOURCE VAULT', status: 'SECURED', desc: 'Universal code repository access.' },
    { id: 'workflow', label: 'TASK PIPELINE', status: 'SYNCED', desc: 'Production milestone tracking.' },
    { id: 'api', label: `UPLINK_${UNIVERSAL_ID.slice(0, 8)}`, status: 'READY', desc: `The Universal Sovereign Production Channel.` },
  ];

  return (
    <div className="h-full flex flex-col space-y-8 py-4">
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-3xl font-black mono tracking-tighter text-slate-100 uppercase">Universal_Visual_Manager</h2>
        <p className="text-[10px] mono text-slate-500 uppercase tracking-[0.5em]">Sovereign ${UNIVERSAL_ID} Structural Map</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes.map((node) => (
          <div 
            key={node.id}
            onClick={() => setActiveTab(node.id)}
            className={`group glass border p-8 rounded-[3rem] cursor-pointer transition-all duration-500 relative overflow-hidden ${
              activeTab === node.id ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'border-white/5 hover:border-slate-700'
            }`}
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] mono font-black px-2 py-0.5 rounded ${
                    node.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {node.status}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs text-slate-500">
                    →
                  </div>
                </div>
                <h3 className="text-lg font-black mono text-slate-100 uppercase">{node.label}</h3>
                <p className="text-[10px] mono text-slate-500 leading-relaxed uppercase">{node.desc}</p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[8px] mono text-slate-700 font-bold uppercase tracking-widest">Access_Portal_{node.id}</span>
                {activeTab === node.id && (
                   <span className="text-[8px] mono text-purple-400 font-black animate-pulse uppercase">Active_Uplink</span>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="lg:col-span-1 glass border border-rose-500/20 p-8 rounded-[3rem] bg-rose-500/5 space-y-4">
          <div className="w-12 h-12 rounded-full border border-rose-500/30 flex items-center justify-center text-rose-500 font-black mono">!</div>
          <h3 className="text-lg font-black mono text-rose-500 uppercase">Sovereign_Rules</h3>
          <p className="text-[10px] mono text-slate-500 leading-relaxed uppercase">
            Rules 2, 3, and 6 are embedded in every Universal Node. 50% profit share is a hardcoded requirement.
          </p>
          <div className="text-[8px] mono text-rose-800 font-black uppercase tracking-widest pt-2">Enforcement Active via {UNIVERSAL_ID}</div>
        </div>
      </div>

      <div className="mt-auto p-6 bg-slate-900/10 border border-slate-800/40 rounded-[2rem] text-center">
        <p className="text-[9px] mono text-slate-600 uppercase tracking-widest italic leading-relaxed">
          The Universal Identity ${UNIVERSAL_ID} is the only authenticated channel for production execution.
        </p>
      </div>
    </div>
  );
};

export default AppNavigator;
