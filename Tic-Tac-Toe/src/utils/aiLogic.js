import { checkWin, simulateMove, getWinningLines } from './gameHelpers';

const WINNING_LINES = getWinningLines();

/**
 * AI's decision-making logic for Blink Tac Toe.
 * @param {Object} gameState - The current game state object.
 * @returns {number|null} The index of the cell the AI wants to play, or null if no valid move.
 */
export const getAiMove = (gameState) => {
  const { board, currentPlayer, player1ActiveEmojis, player2ActiveEmojis } = gameState;
  const aiPlayer = currentPlayer; // AI is current player
  const humanPlayer = aiPlayer === 1 ? 2 : 1;

  const currentAiActiveEmojis = aiPlayer === 1 ? player1ActiveEmojis : player2ActiveEmojis;
  const currentHumanActiveEmojis = humanPlayer === 1 ? player1ActiveEmojis : player2ActiveEmojis;

  const emptyCells = board.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1);

  const aiVanishingCell = currentAiActiveEmojis.length === 3 ? currentAiActiveEmojis[0].cellIndex : null;


  const getPossibleMoves = (player, activeEmojis, opponentActiveEmojis) => {
    const moves = [];
    for (const index of emptyCells) {
      if (player === aiPlayer && index === aiVanishingCell) {
        continue;
      }

      const { newBoard } = simulateMove(board, activeEmojis, player, index);
      moves.push({ index, newBoard });
    }
    return moves;
  };

  for (const { index, newBoard } of getPossibleMoves(aiPlayer, currentAiActiveEmojis, currentHumanActiveEmojis)) {
    if (checkWin(newBoard, aiPlayer, WINNING_LINES)) {
      return index;
    }
  }

 
  for (const { index, newBoard } of getPossibleMoves(humanPlayer, currentHumanActiveEmojis, currentAiActiveEmojis)) {
    if (checkWin(newBoard, humanPlayer, WINNING_LINES)) {
      return index; 
    }
  }


  const aiForkMove = findFork(board, emptyCells, aiPlayer, currentAiActiveEmojis, aiVanishingCell);
  if (aiForkMove !== null) {
    return aiForkMove;
  }

 
  const humanForkMove = findFork(board, emptyCells, humanPlayer, currentHumanActiveEmojis, aiVanishingCell); // Note: AI doesn't have a vanishing cell if it's the human's turn. aiVanishingCell is for AI's own oldest.
  if (humanForkMove !== null) {
    return humanForkMove;
  }


  if (emptyCells.includes(4) && aiVanishingCell !== 4) {
    return 4;
  }

  const corners = [0, 2, 6, 8];
  const oppositeCorners = { 0: 8, 2: 6, 6: 2, 8: 0 };
  for (const corner of corners) {
    if (board[corner]?.player === humanPlayer && emptyCells.includes(oppositeCorners[corner]) && aiVanishingCell !== oppositeCorners[corner]) {
      return oppositeCorners[corner];
    }
  }


  for (const corner of corners) {
    if (emptyCells.includes(corner) && aiVanishingCell !== corner) {
      return corner;
    }
  }

 
  const sides = [1, 3, 5, 7];
  for (const side of sides) {
    if (emptyCells.includes(side) && aiVanishingCell !== side) {
      return side;
    }
  }

  
  for (const index of emptyCells) {
    if (index !== aiVanishingCell) {
      return index;
    }
  }

  return null; 
};


/**
 * Helper to find a fork opportunity for a given player.
 * A fork is when a single move creates two or more lines where the player can win.
 * @param {Array} board - The current board state.
 * @param {Array<number>} emptyCells - List of empty cell indices.
 * @param {number} player - The player to check for a fork (1 or 2).
 * @param {Array} activeEmojis - The active emojis for the player.
 * @param {number|null} vanishingCell - The cell that would vanish for 'player' if they make a move.
 * @returns {number|null} The index of the cell that creates a fork, or null.
 */
const findFork = (board, emptyCells, player, activeEmojis, vanishingCell) => {
  for (const index of emptyCells) {
    if (index === vanishingCell) { 
      continue;
    }

    const { newBoard } = simulateMove(board, activeEmojis, player, index);
    let winningThreats = 0;

    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      let playerCount = 0;
      let emptyCount = 0;
      let emptySpot = -1;

      
      [newBoard[a], newBoard[b], newBoard[c]].forEach((cell, i) => {
        if (cell && cell.player === player) {
          playerCount++;
        } else if (cell === null) {
          emptyCount++;
          emptySpot = line[i];
        }
      });

      
      if (playerCount === 2 && emptyCount === 1) {
        winningThreats++;
      }
    }

    if (winningThreats >= 2) {
      return index; 
    }
  }
  return null;
};