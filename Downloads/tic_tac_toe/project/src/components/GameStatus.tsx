import React from 'react';
import { GameStatus as GameStatusType, Player } from '../types/game';
import { Crown, Users, Loader2 } from 'lucide-react';

interface GameStatusProps {
  gameStatus: GameStatusType;
  currentPlayer: Player;
  isAiThinking: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  gameStatus,
  currentPlayer,
  isAiThinking
}) => {
  const getStatusMessage = () => {
    if (isAiThinking) {
      return (
        <div className="flex items-center gap-2 text-orange-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          AI is thinking...
        </div>
      );
    }

    if (gameStatus.state === 'won') {
      const winner = gameStatus.winner === 'X' ? 'You' : 'AI';
      const color = gameStatus.winner === 'X' ? 'text-blue-400' : 'text-emerald-400';
      return (
        <div className={`flex items-center gap-2 ${color}`}>
          <Crown className="w-5 h-5" />
          {winner} won!
        </div>
      );
    }

    if (gameStatus.state === 'draw') {
      return (
        <div className="flex items-center gap-2 text-yellow-400">
          <Users className="w-5 h-5" />
          It's a draw!
        </div>
      );
    }

    const player = currentPlayer === 'X' ? 'Your' : "AI's";
    const color = currentPlayer === 'X' ? 'text-blue-400' : 'text-emerald-400';
    return (
      <div className={`${color}`}>
        {player} turn
      </div>
    );
  };

  return (
    <div className="text-center">
      <div className="text-2xl font-bold mb-2">
        {getStatusMessage()}
      </div>
      <div className="text-sm text-white/70">
        {gameStatus.state === 'playing' ? 'Make your move' : 'Game Over'}
      </div>
    </div>
  );
};