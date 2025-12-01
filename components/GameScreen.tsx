import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Share, RefreshCw, Terminal, CheckCircle, XCircle, Unlock } from 'lucide-react';

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
      setFeedback('CORRECT_PASSWORD_FRAGMENT');
      setTimeout(() => {
        handleNext();
      }, 1500);
    } else {
      setFeedback('ACCESS_DENIED');
      // Shake effect or error sound could go here
    }
  };

  const handleDeveloperSkip = () => {
    if (isAnswerRevealed && selectedOption === currentQuestion.correctAnswerIndex) return; // Already correct
    
    // Simulate correct answer
    setSelectedOption(currentQuestion.correctAnswerIndex);
    setIsAnswerRevealed(true);
    setFeedback('DEV_OVERRIDE::SUCCESS');
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
    // Reset current question state
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-green-950 h-2 rounded-full overflow-hidden border border-green-900">
        <div 
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${hackProgress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-green-600 font-mono">
        <span>DECRYPTING_SEQUENCE...</span>
        <span>{currentIndex + 1} / {questions.length}</span>
      </div>

      {/* Question Card */}
      <div className="mt-4 min-h-[300px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-0.5 text-xs border rounded ${
              currentQuestion.difficulty === 'Auðvelt' ? 'border-green-500 text-green-400' :
              currentQuestion.difficulty === 'Miðlungs' ? 'border-yellow-500 text-yellow-400' :
              'border-red-500 text-red-400'
            }`}>
              {currentQuestion.difficulty.toUpperCase()}
            </span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-green-100 mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-3">
            {currentQuestion.options.map((option, idx) => {
              let stateClasses = "border-green-800/50 hover:bg-green-900/30 hover:border-green-500/50";
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;

              if (isAnswerRevealed) {
                if (isCorrect) {
                  stateClasses = "bg-green-900/50 border-green-400 text-green-100 shadow-[0_0_10px_rgba(74,222,128,0.2)]";
                } else if (isSelected && !isCorrect) {
                  stateClasses = "bg-red-900/50 border-red-500 text-red-100";
                } else {
                  stateClasses = "opacity-50 border-green-900";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={isAnswerRevealed}
                  className={`w-full text-left p-4 border rounded-md transition-all duration-200 font-mono text-sm md:text-base flex items-center justify-between group ${stateClasses}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs opacity-50 font-bold">[{String.fromCharCode(65 + idx)}]</span>
                    {option}
                  </span>
                  {isAnswerRevealed && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                  {isAnswerRevealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback / Controls */}
        <div className="mt-8 flex items-center justify-between h-12">
            <div className={`font-bold font-mono text-sm transition-opacity duration-300 ${feedback ? 'opacity-100' : 'opacity-0'}`}>
                <span className={feedback === 'ACCESS_DENIED' ? 'text-red-500' : 'text-green-400'}>
                    &gt; {feedback}
                </span>
            </div>

            {isAnswerRevealed && selectedOption !== currentQuestion.correctAnswerIndex && (
                 <button 
                 onClick={handleRetry}
                 className="flex items-center gap-2 px-4 py-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-800/50 rounded text-xs uppercase tracking-wider transition-colors"
               >
                 <RefreshCw className="w-3 h-3" />
                 RETRY_CONNECTION
               </button>
            )}
        </div>
      </div>

      {/* Developer Tools */}
      <div className="pt-8 border-t border-green-900/30 flex justify-end">
        <button
          onClick={handleDeveloperSkip}
          className="group flex items-center gap-2 px-3 py-1.5 text-[10px] text-green-900 hover:text-green-500 border border-transparent hover:border-green-900 rounded transition-all duration-300"
          title="Bypass current firewall (Developer Mode)"
        >
          <Terminal className="w-3 h-3 group-hover:animate-pulse" />
          <span className="tracking-[0.2em] font-bold">DEV_SKIP_PROTOCOL</span>
        </button>
      </div>
    </div>
  );
};

export default GameScreen;