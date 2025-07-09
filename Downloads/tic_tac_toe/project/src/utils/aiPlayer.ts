import { GameBoard, Player } from '../types/game';

export class AIPlayer {
  private difficulty: 'easy' | 'medium' | 'hard';
  
  constructor(difficulty: 'easy' | 'medium' | 'hard' = 'hard') {
    this.difficulty = difficulty;
  }

  public getBestMove(board: GameBoard): number {
    switch (this.difficulty) {
      case 'easy':
        return this.getRandomMove(board);
      case 'medium':
        return Math.random() < 0.7 ? this.getMinimaxMove(board) : this.getRandomMove(board);
      case 'hard':
      default:
        return this.getMinimaxMove(board);
    }
  }

  private getRandomMove(board: GameBoard): number {
    const availableMoves = board
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null) as number[];
    
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  private getMinimaxMove(board: GameBoard): number {
    let bestMove = 0;
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = this.minimax(board, 0, false);
        board[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  }

  private minimax(board: GameBoard, depth: number, isMaximizing: boolean): number {
    const winner = this.checkWinner(board);
    
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (this.isBoardFull(board)) return 0;

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = this.minimax(board, depth + 1, false);
          board[i] = null;
          maxScore = Math.max(score, maxScore);
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = this.minimax(board, depth + 1, true);
          board[i] = null;
          minScore = Math.min(score, minScore);
        }
      }
      return minScore;
    }
  }

  private checkWinner(board: GameBoard): Player {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  private isBoardFull(board: GameBoard): boolean {
    return board.every(cell => cell !== null);
  }

  public setDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
    this.difficulty = difficulty;
  }
}