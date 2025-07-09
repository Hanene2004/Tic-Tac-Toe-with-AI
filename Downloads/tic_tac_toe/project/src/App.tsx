import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { ScoreBoard } from './components/ScoreBoard';
import { DifficultySelector } from './components/DifficultySelector';
import { useGameLogic } from './hooks/useGameLogic';
import { RefreshCw, Gamepad2 } from 'lucide-react';

function App() {
  const {
    board,
    currentPlayer,
    gameStatus,
    score,
    isAiThinking,
    makeMove,
    resetGame,
    resetScore,
    setDifficulty
  } = useGameLogic();

  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('hard');

  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard') => {
    setCurrentDifficulty(difficulty);
    setDifficulty(difficulty);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gamepad2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Tic Tac Toe AI</h1>
          </div>
          <p className="text-white/70">Challenge the AI and test your skills!</p>
        </div>

        {/* Game Status */}
        <GameStatus
          gameStatus={gameStatus}
          currentPlayer={currentPlayer}
          isAiThinking={isAiThinking}
        />

        {/* Game Board */}
        <GameBoard
          board={board}
          onCellClick={makeMove}
          gameStatus={gameStatus}
          isDisabled={currentPlayer === 'O' || isAiThinking}
        />

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 text-white transition-all duration-200 transform hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            New Game
          </button>
        </div>

        {/* Difficulty and Score */}
        <div className="grid grid-cols-1 gap-4">
          <DifficultySelector
            currentDifficulty={currentDifficulty}
            onDifficultyChange={handleDifficultyChange}
          />
          <ScoreBoard score={score} onReset={resetScore} />
        </div>

        {/* Footer */}
        <div className="text-center text-white/50 text-sm">
          <p>You are X • AI is O • Good luck!</p>
        </div>
      </div>
    </div>
  );
}

export default App;