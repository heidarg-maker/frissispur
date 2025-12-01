
import React from 'react';

interface TerminalLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const TerminalLayout: React.FC<TerminalLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen relative overflow-hidden bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4 ${className}`}>
      
      {/* Retro 3D Grid Background */}
      <div className="retro-grid"></div>
      
      {/* Vignette & Scanlines */}
      <div className="crt-overlay"></div>
      <div className="crt-scanlines"></div>

      {/* Main Container "Monitor" */}
      <div className="z-10 w-full max-w-3xl relative">
        
        {/* Monitor Header */}
        <div className="flex justify-between items-center mb-2 px-1">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full opacity-50"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-50"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full opacity-80 animate-pulse"></div>
            </div>
            <div className="text-[10px] text-green-800 tracking-[0.2em] font-bold">TERMINAL_ID: 8824-X</div>
        </div>

        {/* Content Box */}
        <main className="relative bg-black/90 border border-green-800 shadow-[0_0_50px_rgba(0,255,65,0.15)] backdrop-blur-sm">
             {/* Decor corners */}
             <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-l-2 border-t-2 border-green-500"></div>
             <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-r-2 border-t-2 border-green-500"></div>
             <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-l-2 border-b-2 border-green-500"></div>
             <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-r-2 border-b-2 border-green-500"></div>
             
             {/* Header Bar */}
             <header className="border-b border-green-900/50 bg-green-950/20 p-4 flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-green-400 drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]">
                    KÓÐABRJÓTUR <span className="text-green-800 text-sm">v2.1</span>
                </h1>
                <div className="flex gap-4 text-[10px] md:text-xs text-green-700 font-mono">
                    <span>MEM: 64TB</span>
                    <span className="animate-pulse text-green-500">CONN: SECURE</span>
                </div>
             </header>

             <div className="p-6 md:p-8">
                {children}
             </div>
        </main>
        
        {/* Monitor Footer */}
        <div className="mt-2 flex justify-between text-[10px] text-green-900/50 px-2 font-mono uppercase">
            <span>System Ready</span>
            <span>© 2025 CyberCorp</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalLayout;
