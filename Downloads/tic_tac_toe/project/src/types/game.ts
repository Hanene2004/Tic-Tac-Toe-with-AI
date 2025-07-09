export type Player = 'X' | 'O' | null;

export type GameBoard = Player[];

export type GameState = 'playing' | 'won' | 'draw';

export interface GameStatus {
  state: GameState;
  winner: Player;
  winningLine: number[] | null;
}

export interface Score {
  player: number;
  ai: number;
  draws: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';