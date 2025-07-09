import React from 'react';
import { Score } from '../types/game';
import { Trophy, User, Bot, Minus } from 'lucide-react';

interface ScoreBoardProps {
  score: Score;
  onReset: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, onReset }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Score
        </h3>
        <button
          onClick={onReset}
          className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <User className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-white/70">You</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{score.player}</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Minus className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-white/70">Draws</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">{score.draws}</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white/70">AI</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{score.ai}</div>
        </div>
      </div>
    </div>
  );
};