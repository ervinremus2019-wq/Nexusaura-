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

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div 
        ref={scrollRef} 
        className="flex-1 space-y-4 overflow-y-auto pb-6 pr-1 scrollbar-hide touch-pan-y"
      >
        {messages.length === 0 && (
          <div className="text-center py-20 opacity-30 space-y-3">
            <div className="text-4xl animate-pulse">✨</div>
            <p className="text-[10px] mono uppercase tracking-[0.3em]">Awaiting Uplink</p>
            <p className="text-[8px] mono italic">"Aurora encryption active..."</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-300`}>
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
                  {msg.isDecoy && <span className="text-[8px] text-rose-800 mono font-bold bg-rose-500/5 px-1 rounded">[DECOY_MODE]</span>}
                </div>
              )}
              <div className="mono whitespace-pre-line break-words">{msg.content}</div>
              <div className="text-[7px] text-slate-600 mono mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-2 relative pb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setTimeout(scrollToBottom, 300)}
          placeholder="Query Nexus..."
          className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-4 text-xs mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all shadow-xl"
          autoComplete="off"
        />
        <button 
          type="submit"
          disabled={!input.trim()}
          className="absolute right-2 top-2 bottom-6 px-4 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-all border border-purple-500/20 disabled:opacity-30 disabled:hover:bg-purple-500/10 disabled:hover:text-purple-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AuroraChat;