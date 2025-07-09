import React from 'react';
import { Brain, Zap, Target } from 'lucide-react';

interface DifficultySelectorProps {
  currentDifficulty: 'easy' | 'medium' | 'hard';
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onDifficultyChange
}) => {
  const difficulties = [
    { value: 'easy', label: 'Easy', icon: Zap, color: 'text-green-400' },
    { value: 'medium', label: 'Medium', icon: Target, color: 'text-yellow-400' },
    { value: 'hard', label: 'Hard', icon: Brain, color: 'text-red-400' }
  ] as const;

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 shadow-xl">
      <h3 className="text-sm font-semibold text-white mb-3 text-center">AI Difficulty</h3>
      <div className="flex gap-2">
        {difficulties.map(({ value, label, icon: Icon, color }) => (
          <button
            key={value}
            onClick={() => onDifficultyChange(value)}
            className={`
              flex-1 flex flex-col items-center gap-1 p-2 rounded-lg transition-all
              ${currentDifficulty === value 
                ? 'bg-white/20 border border-white/30' 
                : 'bg-white/5 hover:bg-white/10 border border-transparent'
              }
            `}
          >
            <Icon className={`w-4 h-4 ${color}`} />
            <span className="text-xs text-white/90">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};