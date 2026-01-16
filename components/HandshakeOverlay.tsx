
import React, { useState } from 'react';

interface Props {
  onComplete: (success: boolean) => void;
  onCancel: () => void;
}

const HandshakeOverlay: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const SECRET_PIN = "7821"; // Sample PIN

  const handleNum = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === SECRET_PIN) {
          onComplete(true);
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 600);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full max-w-xs space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-sm tracking-[0.3em] font-light text-slate-400">MOBILE HANDSHAKE</h2>
          <p className="text-xs text-slate-600 mono">NDA 78B SECURITY CLEARANCE REQUIRED</p>
        </div>

        <div className="flex justify-center space-x-4">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full border ${
                error ? 'border-red-500 bg-red-500' : 
                pin.length > i ? 'border-cyan-500 bg-cyan-500' : 'border-slate-700'
              } transition-all duration-200`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleNum(num.toString())}
              className="w-16 h-16 rounded-full glass border border-slate-800 flex items-center justify-center text-xl mono font-light active:bg-slate-800 transition-colors"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={onCancel}
            className="w-16 h-16 rounded-full flex items-center justify-center text-[10px] mono text-slate-600 uppercase"
          >
            Esc
          </button>
          <button
            onClick={() => handleNum('0')}
            className="w-16 h-16 rounded-full glass border border-slate-800 flex items-center justify-center text-xl mono font-light active:bg-slate-800 transition-colors"
          >
            0
          </button>
          <button 
             onClick={() => setPin(prev => prev.slice(0, -1))}
             className="w-16 h-16 rounded-full flex items-center justify-center text-[10px] mono text-slate-600 uppercase"
          >
            Del
          </button>
        </div>

        <p className="text-center text-[8px] text-slate-700 mono leading-relaxed uppercase">
          Attempting unauthorized access results in<br/>
          automatic system lockdown and 78B fine.
        </p>
      </div>
    </div>
  );
};

export default HandshakeOverlay;
