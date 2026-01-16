
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface Props {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isAdmin: boolean;
}

const AuroraChat: React.FC<Props> = ({ messages, onSendMessage, isAdmin }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pb-4 pr-1 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center py-12 opacity-30 space-y-2">
            <div className="text-4xl">✨</div>
            <p className="text-[10px] mono uppercase tracking-[0.3em]">Awaiting Uplink</p>
            <p className="text-[8px] mono italic">"Aurora is listening..."</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-[11px] leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tr-none' 
                : `${isAdmin ? 'bg-purple-900/20 border border-purple-500/30' : 'bg-slate-900/60 border border-slate-800'} text-slate-300 rounded-tl-none`
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-[8px] font-bold mono uppercase ${isAdmin ? 'text-purple-400' : 'text-slate-500'}`}>
                    Aurora {isAdmin ? '(Production)' : '(Decoy)'}
                  </span>
                  {msg.isDecoy && <span className="text-[8px] text-slate-700 mono">[0% ACCURACY]</span>}
                </div>
              )}
              <div className="mono whitespace-pre-line">{msg.content}</div>
              <div className="text-[7px] text-slate-600 mono mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Query Aurora..."
          className="w-full bg-slate-900/50 border border-slate-800 rounded-full px-5 py-3 text-xs mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all"
        />
        <button 
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-4 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-all border border-purple-500/20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </form>
    </div>
  );
};

export default AuroraChat;
