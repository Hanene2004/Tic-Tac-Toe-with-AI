import React from 'react';
import { Player } from '../types/game';
import { X, Circle } from 'lucide-react';

interface GameCellProps {
  value: Player;
  onClick: () => void;
  isWinningCell: boolean;
  isDisabled: boolean;
}

export const GameCell: React.FC<GameCellProps> = ({
  value,
  onClick,
  isWinningCell,
  isDisabled
}) => {
  const getIcon = () => {
    if (value === 'X') {
      return <X className="w-12 h-12 text-blue-500" strokeWidth={3} />;
    }
    if (value === 'O') {
      return <Circle className="w-12 h-12 text-emerald-500" strokeWidth={3} />;
    }
    return null;
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled || value !== null}
      className={`
        aspect-square bg-white/10 backdrop-blur-sm rounded-2xl
        border-2 border-white/20 flex items-center justify-center
        transition-all duration-200 transform
        ${!isDisabled && value === null 
          ? 'hover:bg-white/20 hover:scale-105 hover:shadow-lg cursor-pointer' 
          : 'cursor-not-allowed'
        }
        ${isWinningCell ? 'bg-yellow-400/30 border-yellow-400/50 shadow-xl' : ''}
        ${value === null ? 'hover:border-white/40' : ''}
      `}
    >
      <div className={`
        transition-all duration-300 transform
        ${value ? 'scale-100' : 'scale-0'}
      `}>
        {getIcon()}
      </div>
    </button>
  );
};