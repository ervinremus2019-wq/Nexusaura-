
import React from 'react';
import { WorkflowTask } from '../types';

const WorkflowManager: React.FC = () => {
  const tasks: WorkflowTask[] = [
    { id: 'WF-1', title: 'Implement Verbatim Sovereign Rules UI', status: 'DONE', priority: 'CRITICAL' },
    { id: 'WF-2', title: 'Configure Aurora Dual-Personality AI Bridge', status: 'DONE', priority: 'CRITICAL' },
    { id: 'WF-3', title: 'Develop Parallel Process Valuation Tanks', status: 'IN_PROGRESS', priority: 'HIGH' },
    { id: 'WF-4', title: 'Audit Security for Thief Developers (Rule 3)', status: 'TODO', priority: 'HIGH' },
    { id: 'WF-5', title: 'Production Export Mechanism Deployment', status: 'TODO', priority: 'LOW' },
  ];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-[10px] mono text-slate-500 uppercase tracking-widest">Global Workflows</h3>
        <span className="text-[8px] mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">LIVE_TRACKING</span>
      </div>

      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="glass border border-slate-800 p-4 rounded-xl flex items-center justify-between group hover:border-slate-700 transition-all">
            <div className="flex items-center space-x-4">
              <div className={`w-1.5 h-6 rounded-full ${
                task.priority === 'CRITICAL' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 
                task.priority === 'HIGH' ? 'bg-orange-500' : 'bg-blue-500'
              }`} />
              <div>
                <p className="text-[10px] mono text-slate-200">{task.title}</p>
                <p className="text-[8px] mono text-slate-600 uppercase">{task.id} / Priority: {task.priority}</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded text-[8px] mono font-bold border ${
              task.status === 'DONE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
              task.status === 'IN_PROGRESS' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' :
              'bg-slate-800 text-slate-500 border-slate-700'
            }`}>
              {task.status}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center space-y-2 opacity-50">
        <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center text-slate-600">+</div>
        <p className="text-[9px] mono uppercase text-slate-600 tracking-widest">Add New Workflow</p>
      </div>
    </div>
  );
};

export default WorkflowManager;
