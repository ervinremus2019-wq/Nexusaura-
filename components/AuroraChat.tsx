import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface Props {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isAdmin: boolean;
}

const UNIVERSAL_ID = "rp_XSxeEG0hHDLrznQnGcQJ7ma0edt5WfwU";

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
    <div className="flex flex-col h-full overflow-hidden" role="log" aria-label="Conversation Thread" aria-live="polite">
      <div 
        ref={scrollRef} 
        className="flex-1 space-y-5 overflow-y-auto px-1 pt-6 pb-32 scrollbar-hide"
      >
        {messages.length === 0 && (
          <div className="text-center py-24 opacity-40 space-y-4">
            <div className="text-5xl animate-bounce">🛡️</div>
            <p className="text-[11px] mono uppercase tracking-[0.3em] font-black">Secure Uplink Established</p>
            <p className="text-[9px] mono italic font-bold text-slate-500">Awaiting instructions for {UNIVERSAL_ID.slice(0, 8)}...</p>
          </div>
        )}
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`max-w-[85%] px-5 py-3.5 text-sm leading-relaxed shadow-lg ${
              msg.role === 'user' 
                ? 'chat-bubble-user' 
                : 'chat-bubble-ai'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-[9px] font-black mono uppercase ${isAdmin ? 'text-purple-400' : 'text-slate-500'}`}>
                    Sovereign_{UNIVERSAL_ID.slice(0, 4)}
                  </span>
                  {!msg.isDecoy && (
                    <span className="text-[7px] text-emerald-400 mono font-black bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-tighter">Production_Link</span>
                  )}
                </div>
              )}
              <div className="whitespace-pre-line break-words font-medium">{msg.content}</div>
              <div className={`text-[8px] mt-2 font-black mono uppercase flex justify-between items-center ${msg.role === 'user' ? 'text-white/40' : 'text-slate-600'}`}>
                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="ml-4 opacity-50">{UNIVERSAL_ID.slice(-6)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 left-4 right-4 z-40">
        <form 
          onSubmit={handleSubmit} 
          className="flex items-center space-x-2 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-full p-1.5 shadow-2xl ring-1 ring-white/5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Command Sovereign..."
            className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:ring-0 font-medium"
            aria-label="Type message"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center transition-all active:scale-90 disabled:opacity-20 disabled:grayscale shadow-lg shadow-purple-900/30"
            aria-label="Send"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuroraChat;