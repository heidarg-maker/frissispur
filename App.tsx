import React, { useState, useEffect } from 'react';
import TerminalLayout from './components/TerminalLayout';
import GameScreen from './components/GameScreen';
import { fetchQuestions } from './services/geminiService';
import { GameState, Question } from './types';
import { Play, Loader2, Lock, ExternalLink, Trophy } from 'lucide-react';

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
          <div className="space-y-4">
            <div className="w-20 h-20 bg-green-900/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <Lock className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">SYSTEM LOCKED</h2>
            <p className="text-green-400/80 max-w-md mx-auto leading-relaxed">
              Öryggisvörn virk. Þú þarft að svara 10 erfiðum spurningum til að brjóta kóðann og fá aðgang að leyniskjalinu.
            </p>
            <p className="text-xs text-green-700 font-mono mt-4">
              [TARGET_LANGUAGE: ICELANDIC]
            </p>
          </div>

          <button
            onClick={startGame}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-black font-bold text-lg uppercase tracking-wider hover:bg-green-500 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] rounded-sm"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>HEFJA LEIK</span>
            <div className="absolute inset-0 border-2 border-white/20 rounded-sm group-hover:scale-105 transition-transform duration-300"></div>
          </button>
          
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      )}

      {gameState === GameState.LOADING && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="relative">
             <Loader2 className="w-16 h-16 text-green-500 animate-spin" />
             <div className="absolute inset-0 bg-green-500/20 blur-xl animate-pulse"></div>
          </div>
          <div className="font-mono text-green-400 text-sm animate-pulse">
            GENERATING_KEYS... <br/>
            LOADING_MODULES...
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
           <div className="w-24 h-24 bg-green-500 text-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(34,197,94,0.8)] animate-bounce">
                <Trophy className="w-10 h-10" />
            </div>
            
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 cyber-glitch">ACCESS GRANTED</h2>
            <p className="text-green-400">Kóðinn hefur verið brotinn.</p>
          </div>

          <div className="p-6 border border-green-500/30 bg-green-900/10 rounded-lg backdrop-blur-md space-y-6">
            <p className="text-sm text-green-300 uppercase tracking-widest">Leynilegur hlekkur (Secret Link):</p>
            
            <div className="bg-black/80 border-2 border-green-500 p-6 rounded relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-scan"></div>
                <p className="text-xl md:text-3xl font-bold text-green-400 font-mono break-all select-all selection:bg-green-500 selection:text-black">
                    https://ibb.co/0jfS097Z
                </p>
            </div>

            <button
                onClick={handleClaimReward}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-black font-bold uppercase tracking-widest hover:bg-green-500 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]"
            >
                <ExternalLink className="w-5 h-5" />
                Opna Hlekk
            </button>
          </div>
        </div>
      )}
    </TerminalLayout>
  );
};

export default App;