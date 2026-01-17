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
      description: 'Custom task.',
      status: 'TODO',
      priority: 'HIGH',
      assignee: isAdmin ? 'OWNER' : 'GUEST'
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setShowAdd(false);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs mono text-slate-400 font-black uppercase tracking-[0.2em]">Live_Dev_Stream</h3>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[9px] mono rounded-xl font-black hover:bg-purple-500/20"
        >
          {showAdd ? 'CANCEL_ADD' : '+ NEW_TASK'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={addTask} className="mb-6 animate-in slide-in-from-top-2">
          <input 
            autoFocus
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Initialize Task Name..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-xs mono text-slate-100 placeholder:text-slate-700 focus:outline-none focus:border-purple-500/40"
          />
        </form>
      )}

      <div className="flex-1 overflow-y-auto pr-1 space-y-2">
        {tasks.map(task => (
          <div 
            key={task.id} 
            onClick={() => toggleStatus(task.id)}
            className="glass border border-white/5 px-6 py-4 rounded-3xl flex items-center justify-between hover:border-purple-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-6">
              <div className={`w-1 h-6 rounded-full ${
                task.priority === 'CRITICAL' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 
                task.priority === 'HIGH' ? 'bg-orange-500' : 'bg-blue-500'
              }`} />
              <div>
                <p className="text-[11px] mono text-slate-100 font-black uppercase group-hover:text-purple-400 transition-colors">{task.title}</p>
                <p className="text-[8px] mono text-slate-700 uppercase font-bold tracking-widest">{task.id} | {task.assignee}</p>
              </div>
            </div>
            <div className={`px-4 py-1.5 rounded-xl text-[9px] mono font-black border tracking-tight ${
              task.status === 'DONE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
              task.status === 'IN_PROGRESS' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' :
              'bg-slate-900 text-slate-600 border-slate-800'
            }`}>
              {task.status}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-slate-900/10 border border-slate-800/40 rounded-2xl">
        <p className="text-[8px] mono text-slate-700 text-center uppercase italic font-bold tracking-widest leading-relaxed">
          Dev_Pipeline_Audited_by_Aurora // Rule 6: Redistribution without authorization is prohibited.
        </p>
      </div>
    </div>
  );
};

export default WorkflowManager;