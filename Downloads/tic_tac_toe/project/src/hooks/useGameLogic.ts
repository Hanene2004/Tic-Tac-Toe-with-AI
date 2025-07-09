import { useState, useCallback } from 'react';
import { GameBoard, Player, GameStatus, Score } from '../types/game';
import { AIPlayer } from '../utils/aiPlayer';

export const useGameLogic = () => {
  const [board, setBoard] = useState<GameBoard>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    state: 'playing',
    winner: null,
    winningLine: null
  });
  const [score, setScore] = useState<Score>({ player: 0, ai: 0, draws: 0 });
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiPlayer] = useState(() => new AIPlayer('hard'));

  const checkWinner = useCallback((board: GameBoard): GameStatus => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return {
          state: 'won',
          winner: board[a],
          winningLine: line
        };
      }
    }

    if (board.every(cell => cell !== null)) {
      return {
        state: 'draw',
        winner: null,
        winningLine: null
      };
    }

    return {
      state: 'playing',
      winner: null,
      winningLine: null
    };
  }, []);

  const makeMove = useCallback((index: number) => {
    if (board[index] || gameStatus.state !== 'playing' || isAiThinking) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newGameStatus = checkWinner(newBoard);
    setGameStatus(newGameStatus);

    if (newGameStatus.state === 'won') {
      setScore(prev => ({
        ...prev,
        player: currentPlayer === 'X' ? prev.player + 1 : prev.player,
        ai: currentPlayer === 'O' ? prev.ai + 1 : prev.ai
      }));
    } else if (newGameStatus.state === 'draw') {
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    }

    if (newGameStatus.state === 'playing' && currentPlayer === 'X') {
      setCurrentPlayer('O');
      setIsAiThinking(true);
      
      // AI makes move after a short delay for better UX
      setTimeout(() => {
        const aiMove = aiPlayer.getBestMove(newBoard);
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = 'O';
        setBoard(aiBoard);

        const aiGameStatus = checkWinner(aiBoard);
        setGameStatus(aiGameStatus);

        if (aiGameStatus.state === 'won') {
          setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
        } else if (aiGameStatus.state === 'draw') {
          setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
        }

        if (aiGameStatus.state === 'playing') {
          setCurrentPlayer('X');
        }
        setIsAiThinking(false);
      }, 500);
    }
  }, [board, currentPlayer, gameStatus.state, isAiThinking, checkWinner, aiPlayer]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameStatus({
      state: 'playing',
      winner: null,
      winningLine: null
    });
    setIsAiThinking(false);
  }, []);

  const resetScore = useCallback(() => {
    setScore({ player: 0, ai: 0, draws: 0 });
  }, []);

  const setDifficulty = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    aiPlayer.setDifficulty(difficulty);
  }, [aiPlayer]);

  return {
    board,
    currentPlayer,
    gameStatus,
    score,
    isAiThinking,
    makeMove,
    resetGame,
    resetScore,
    setDifficulty
  };
};