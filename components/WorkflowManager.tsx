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
      assignee: isAdmin ? 'SVRGN' : 'GUEST'
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setShowAdd(false);
  };

  return (
    <div className="h-full flex flex-col space-y-4 pt-4 pb-24">
      <header className="flex justify-between items-center mb-6 px-1">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Pipeline</h2>
          <p className="text-[10px] mono text-slate-500 uppercase tracking-widest font-bold">Rule 6 Protocols</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="w-10 h-10 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center transition-all active:scale-90"
          aria-label={showAdd ? "Close add task" : "Add new task"}
        >
          {showAdd ? '✕' : '+'}
        </button>
      </header>

      {showAdd && (
        <form onSubmit={addTask} className="mb-6 animate-in slide-in-from-top-2">
          <input 
            autoFocus
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Initialize Task Name..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-purple-500/40"
            aria-label="New task title"
          />
        </form>
      )}

      <div className="space-y-3">
        {tasks.map(task => (
          <button 
            key={task.id} 
            onClick={() => toggleStatus(task.id)}
            className="w-full text-left p-4 glass border border-white/5 rounded-[2rem] flex items-center justify-between hover:border-purple-500/30 transition-all active:scale-[0.98]"
            aria-label={`Task: ${task.title}, Status: ${task.status}. Tap to change status.`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-1 h-6 rounded-full ${
                task.priority === 'CRITICAL' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 
                task.priority === 'HIGH' ? 'bg-orange-500' : 'bg-blue-500'
              }`} />
              <div>
                <p className="text-[13px] font-bold text-slate-100">{task.title}</p>
                <p className="text-[9px] mono text-slate-500 uppercase font-bold tracking-widest">{task.id}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-xl text-[9px] font-bold border ${
              task.status === 'DONE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
              task.status === 'IN_PROGRESS' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' :
              'bg-slate-800 text-slate-600 border-slate-700'
            }`}>
              {task.status}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 glass border border-white/5 rounded-2xl">
        <p className="text-[9px] mono text-slate-600 text-center uppercase font-bold tracking-widest leading-relaxed">
          Rule 6: Redistribution without authorization is prohibited.
        </p>
      </div>
    </div>
  );
};

export default WorkflowManager;