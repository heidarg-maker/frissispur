
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { RefreshCw, CheckCircle, XCircle, Terminal } from 'lucide-react';

interface GameScreenProps {
  questions: Question[];
  onWin: () => void;
  onReset: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ questions, onWin, onReset }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [hackProgress, setHackProgress] = useState(0);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    // Calculate progress based on current index
    setHackProgress(Math.round((currentIndex / questions.length) * 100));
  }, [currentIndex, questions.length]);

  const handleOptionClick = (index: number) => {
    if (isAnswerRevealed) return;
    
    setSelectedOption(index);
    setIsAnswerRevealed(true);

    if (index === currentQuestion.correctAnswerIndex) {
      setFeedback('PASSWORD_FRAGMENT_ACCEPTED');
      setTimeout(() => {
        handleNext();
      }, 1500);
    } else {
      setFeedback('ACCESS_DENIED // SECURITY ALERT');
    }
  };

  const handleDeveloperSkip = () => {
    if (isAnswerRevealed && selectedOption === currentQuestion.correctAnswerIndex) return;
    
    setSelectedOption(currentQuestion.correctAnswerIndex);
    setIsAnswerRevealed(true);
    setFeedback('ROOT_OVERRIDE_ENABLED');
    setTimeout(() => {
      handleNext();
    }, 800);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      onWin();
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setFeedback('');
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setFeedback('');
  };

  return (
    <div className="space-y-8">
      {/* Progress HUD */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-green-600 uppercase tracking-widest">
            <span>Decryption Progress</span>
            <span>Level {currentIndex + 1}/{questions.length}</span>
        </div>
        <div className="w-full bg-green-950/30 h-1 relative overflow-hidden">
            <div 
            className="absolute top-0 left-0 h-full bg-green-500 shadow-[0_0_10px_#00ff41] transition-all duration-500 ease-out"
            style={{ width: `${hackProgress}%` }}
            />
        </div>
      </div>

      {/* Question Interface */}
      <div className="relative">
          {/* Difficulty Badge */}
          <div className="absolute -top-3 right-0">
             <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider border bg-black ${
              currentQuestion.difficulty === 'Auðvelt' ? 'border-green-600 text-green-400' :
              currentQuestion.difficulty === 'Miðlungs' ? 'border-yellow-600 text-yellow-400' :
              'border-red-600 text-red-500 animate-pulse'
            }`}>
              Warning: {currentQuestion.difficulty}
            </span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 mt-4 leading-relaxed drop-shadow-md">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;
              
              let buttonStyle = "border-green-800/50 hover:bg-green-900/40 hover:border-green-500 text-green-300";
              let glowEffect = "";

              if (isAnswerRevealed) {
                if (isCorrect) {
                  buttonStyle = "bg-green-900/60 border-green-400 text-white";
                  glowEffect = "shadow-[0_0_15px_rgba(0,255,65,0.4)]";
                } else if (isSelected && !isCorrect) {
                  buttonStyle = "bg-red-900/40 border-red-500 text-red-200";
                  glowEffect = "shadow-[0_0_15px_rgba(255,0,0,0.3)]";
                } else {
                  buttonStyle = "opacity-30 border-green-900 text-green-800";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={isAnswerRevealed}
                  className={`relative group w-full text-left p-4 border transition-all duration-200 clip-corner ${buttonStyle} ${glowEffect}`}
                >
                  {/* Hover scan effect */}
                  {!isAnswerRevealed && (
                      <div className="absolute inset-0 bg-green-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 pointer-events-none"></div>
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <span className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs border border-current bg-black/50 font-bold">
                            {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-mono text-sm md:text-base tracking-wide">{option}</span>
                    </span>
                    {isAnswerRevealed && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {isAnswerRevealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                  </div>
                </button>
              );
            })}
          </div>
      </div>

      {/* Terminal Footer / Feedback */}
      <div className="mt-8 min-h-[3rem] border-t border-green-900/30 pt-4 flex items-center justify-between">
            <div className={`font-mono text-xs md:text-sm tracking-wide ${feedback ? 'animate-pulse' : ''}`}>
                <span className={feedback.includes('DENIED') ? 'text-red-500' : 'text-green-400'}>
                    {feedback && `> ${feedback}`}
                </span>
            </div>

            {isAnswerRevealed && selectedOption !== currentQuestion.correctAnswerIndex && (
                 <button 
                 onClick={handleRetry}
                 className="flex items-center gap-2 px-4 py-2 bg-red-950/30 text-red-400 hover:bg-red-900/50 border border-red-800 hover:border-red-500 rounded-none clip-corner-sm text-xs uppercase tracking-wider transition-all"
               >
                 <RefreshCw className="w-3 h-3" />
                 Re-Initialize
               </button>
            )}
      </div>

      {/* Stealth Developer Tool */}
      <div className="fixed top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-200 z-50">
        <button
          onClick={handleDeveloperSkip}
          className="flex items-center gap-2 px-3 py-1 bg-black border border-green-500 text-green-500 font-bold font-mono text-xs hover:bg-green-900"
          title="DEV_OVERRIDE"
        >
             <Terminal className="w-3 h-3" />
             DEV_SKIP
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
