import React from 'react';
import { GameCell } from './GameCell';
import { GameBoard as GameBoardType, GameStatus } from '../types/game';

interface GameBoardProps {
  board: GameBoardType;
  onCellClick: (index: number) => void;
  gameStatus: GameStatus;
  isDisabled: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  gameStatus,
  isDisabled
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl">
      {board.map((cell, index) => (
        <GameCell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinningCell={gameStatus.winningLine?.includes(index) || false}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
};