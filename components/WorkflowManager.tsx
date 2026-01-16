
import React, { useState } from 'react';
import { WorkflowTask } from '../types';

interface Props {
  tasks: WorkflowTask[];
  isAdmin: boolean;
}

const WorkflowManager: React.FC<Props> = ({ tasks: initialTasks, isAdmin }) => {
  const [tasks, setTasks] = useState<WorkflowTask[]>(initialTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus: WorkflowTask['status'] = 
          t.status === 'TODO' ? 'IN_PROGRESS' : 
          t.status === 'IN_PROGRESS' ? 'DONE' : 'TODO';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: WorkflowTask = {
      id: `WF-${Math.floor(Math.random() * 1000)}`,
      title: newTaskTitle,
      description: 'Custom task added via Sovereign Interface.',
      status: 'TODO',
      priority: 'HIGH',
      assignee: isAdmin ? 'OWNER' : 'GUEST'
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="flex justify-between items-center px-1">
        <div className="space-y-0.5">
          <h3 className="text-[10px] mono text-slate-500 uppercase tracking-widest font-black">Global Development Workflows</h3>
          <p className="text-[8px] mono text-slate-700 uppercase">Real-time Task Synchronization</p>
        </div>
        <span className="text-[8px] mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-black animate-pulse uppercase">Live_Aura_Tracking</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {tasks.map(task => (
          <div 
            key={task.id} 
            onClick={() => toggleStatus(task.id)}
            className="glass border border-slate-800 p-5 rounded-2xl flex items-center justify-between group hover:border-purple-500/30 transition-all cursor-pointer shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-1.5 h-8 rounded-full ${
                task.priority === 'CRITICAL' ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 
                task.priority === 'HIGH' ? 'bg-orange-500' : 'bg-blue-500'
              }`} />
              <div className="space-y-1">
                <p className="text-[11px] mono text-slate-200 font-black uppercase tracking-tight">{task.title}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-[8px] mono text-slate-600 uppercase">{task.id}</span>
                  <span className="text-[8px] mono text-slate-800">|</span>
                  <span className="text-[8px] mono text-slate-500 uppercase">Lead: {task.assignee}</span>
                </div>
              </div>
            </div>
            <div className={`px-4 py-1.5 rounded-xl text-[8px] mono font-black border transition-all ${
              task.status === 'DONE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' :
              task.status === 'IN_PROGRESS' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]' :
              'bg-slate-900/60 text-slate-500 border-slate-800'
            }`}>
              {task.status}
            </div>
          </div>
        ))}
      </div>

      {showAdd ? (
        <form onSubmit={addTask} className="animate-in slide-in-from-top-2 duration-200">
          <input 
            autoFocus
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter Task Name..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-4 text-xs mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/30 transition-all"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button type="button" onClick={() => setShowAdd(false)} className="text-[9px] mono text-slate-600 hover:text-slate-400 px-4 py-2 uppercase">Cancel</button>
            <button type="submit" className="bg-purple-600/20 border border-purple-500/30 text-purple-400 text-[9px] mono px-6 py-2 rounded-xl uppercase hover:bg-purple-500/40 transition-all font-black">Confirm_Add</button>
          </div>
        </form>
      ) : (
        <button 
          onClick={() => setShowAdd(true)}
          className="w-full p-6 border border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center space-y-2 group hover:border-purple-500/20 transition-all hover:bg-purple-500/5 opacity-50 hover:opacity-100"
        >
          <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-600 text-xl group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all">+</div>
          <p className="text-[9px] mono uppercase text-slate-600 tracking-[0.3em] group-hover:text-purple-400">Initialize New Development Stream</p>
        </button>
      )}

      <div className="p-4 bg-slate-900/10 border border-slate-800 rounded-2xl mt-4">
        <p className="text-[8px] mono text-slate-700 leading-relaxed uppercase italic">
          Workflow integrity is audited by Aurora-78B. Completion of critical tasks triggers Rule 2 profit verification.
        </p>
      </div>
    </div>
  );
};

export default WorkflowManager;
