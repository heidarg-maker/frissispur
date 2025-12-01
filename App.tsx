
import React, { useState } from 'react';
import TerminalLayout from './components/TerminalLayout';
import GameScreen from './components/GameScreen';
import { fetchQuestions } from './services/geminiService';
import { GameState, Question } from './types';
import { Play, Loader2, Lock, ExternalLink, Trophy, ShieldAlert } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startGame = async () => {
    setGameState(GameState.LOADING);
    try {
      const q = await fetchQuestions();
      setQuestions(q);
      setGameState(GameState.PLAYING);
    } catch (e) {
      setError("Failed to initialize game sequence.");
      setGameState(GameState.IDLE);
    }
  };

  const handleWin = () => {
    setGameState(GameState.WON);
  };

  const handleReset = () => {
    setGameState(GameState.IDLE);
    setQuestions([]);
    setError(null);
  };

  const handleClaimReward = () => {
    window.location.href = "https://ibb.co/0jfS097Z";
  };

  return (
    <TerminalLayout>
      {gameState === GameState.IDLE && (
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-6">
            <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse"></div>
                <div className="w-24 h-24 bg-black border border-green-500 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(0,255,65,0.3)] clip-corner">
                    <Lock className="w-10 h-10 text-green-400" />
                </div>
            </div>
            
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-wider drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">SYSTEM LOCKED</h2>
                <div className="h-px w-32 bg-green-900 mx-auto"></div>
            </div>

            <p className="text-green-400/90 max-w-md mx-auto leading-relaxed font-mono text-sm md:text-base">
              <span className="text-green-600 mr-2">>></span>
              Öryggisvörn virk. Þú þarft að svara 10 erfiðum spurningum til að brjóta kóðann og fá aðgang að leyniskjalinu.
            </p>
            
            <div className="flex justify-center gap-4 text-xs text-green-800 font-mono border-t border-green-900/30 pt-4">
                <span className="flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> ENCRYPTION: AES-256</span>
                <span>LANG: ICELANDIC</span>
            </div>
          </div>

          <button
            onClick={startGame}
            className="relative group inline-flex items-center gap-3 px-10 py-5 bg-green-600 text-black font-bold text-lg uppercase tracking-widest hover:bg-green-500 transition-all duration-300 clip-corner shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:-translate-y-1"
          >
            <Play className="w-6 h-6 fill-current" />
            <span>HEFJA LEIK</span>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>
          </button>
          
          {error && <p className="text-red-500 text-sm mt-4 bg-red-950/20 p-2 border border-red-900">{error}</p>}
        </div>
      )}

      {gameState === GameState.LOADING && (
        <div className="flex flex-col items-center justify-center py-20 space-y-8">
          <div className="relative">
             <Loader2 className="w-20 h-20 text-green-500 animate-spin" />
             <div className="absolute inset-0 bg-green-500/20 blur-xl animate-pulse"></div>
          </div>
          <div className="font-mono text-green-400 text-sm space-y-1 text-center">
            <p className="animate-pulse">ESTABLISHING_UPLINK...</p>
            <p className="text-green-700 text-xs">Fetching encryption keys from Gemini Core...</p>
          </div>
          
          {/* Fake loader bar */}
          <div className="w-48 h-1 bg-green-950 overflow-hidden">
             <div className="h-full bg-green-500 w-full animate-[shimmer_2s_infinite_linear] origin-left"></div>
          </div>
        </div>
      )}

      {gameState === GameState.PLAYING && (
        <GameScreen
          questions={questions}
          onWin={handleWin}
          onReset={handleReset}
        />
      )}

      {gameState === GameState.WON && (
        <div className="text-center space-y-8 animate-in zoom-in duration-500">
           <div className="relative inline-block">
                <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20"></div>
                <div className="w-24 h-24 bg-green-950 border-2 border-green-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.6)] clip-corner">
                    <Trophy className="w-12 h-12 text-yellow-400 drop-shadow-lg" />
                </div>
            </div>
            
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 cyber-glitch drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">ACCESS GRANTED</h2>
            <p className="text-green-400 font-mono tracking-widest text-sm">ENCRYPTION BYPASSED SUCCESSFULLY</p>
          </div>

          <div className="p-8 border-2 border-green-500/50 bg-black/50 backdrop-blur-md space-y-6 relative overflow-hidden">
            {/* Animated scanline overlay on box */}
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 animate-[scan_3s_infinite_linear]"></div>
            
            <p className="text-xs text-green-600 uppercase tracking-[0.2em] mb-4">Secret Data Payload:</p>
            
            <div className="bg-black border border-green-500 p-6 relative group select-all">
                <div className="absolute -inset-1 bg-green-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="relative text-2xl md:text-3xl font-bold text-green-400 font-mono break-all selection:bg-green-500 selection:text-black">
                    https://ibb.co/0jfS097Z
                </p>
            </div>

            <button
                onClick={handleClaimReward}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-black font-bold uppercase tracking-widest hover:bg-green-400 transition-all clip-corner shadow-[0_0_25px_rgba(0,255,65,0.4)]"
            >
                <ExternalLink className="w-5 h-5" />
                EXECUTE LINK
            </button>
          </div>
        </div>
      )}
    </TerminalLayout>
  );
};

export default App;
