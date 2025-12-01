import React from 'react';

interface TerminalLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const TerminalLayout: React.FC<TerminalLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden ${className}`}>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-green-800"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-green-800"></div>
      </div>
      
      <div className="z-10 w-full max-w-2xl">
        <header className="mb-8 border-b border-green-900 pb-4 flex justify-between items-end">
            <div>
                <h1 className="text-xl md:text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-700 uppercase drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                    Kóðabrjótur_v1.0
                </h1>
                <p className="text-xs text-green-800 mt-1">SYSTEM_STATUS::SECURE</p>
            </div>
            <div className="text-xs text-green-700 animate-pulse hidden sm:block">
                ENCRYPTED_CONNECTION
            </div>
        </header>

        <main className="relative bg-zinc-950/80 border border-green-900/50 p-6 rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,0,0.05)]">
             <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-500"></div>
             <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500"></div>
             <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-500"></div>
             <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500"></div>
             
             {children}
        </main>
      </div>
    </div>
  );
};

export default TerminalLayout;