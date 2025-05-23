
export const getRandomEmoji = (categoryEmojis) => {
  if (!categoryEmojis || categoryEmojis.length === 0) {
    console.warn("No emojis in category to pick from.");
    return '❓';
  }
  const randomIndex = Math.floor(Math.random() * categoryEmojis.length);
  return categoryEmojis[randomIndex];
};


export const getWinningLines = () => {
  return [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6],
  ];
};

/**
 * Checks if a given player has won on a specific board.
 * @param {Array} board - The current board state.
 * @param {number} player - The player to check for (1 or 2).
 * @param {Array<Array<number>>} winningLines - Pre-computed winning lines.
 * @returns {Array<number>|null} The winning line if a win is found, otherwise null.
 */
export const checkWin = (board, player, winningLines) => {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (
      board[a] && board[b] && board[c] &&
      board[a].player === player &&
      board[b].player === player &&
      board[c].player === player
    ) {
      return winningLines[i];
    }
  }
  return null;
};

/**
 * Simulates placing an emoji and handles the vanishing rule for a specific player.
 * Returns the new board and active emojis array without modifying the original.
 * @param {Array} currentBoard - The board state before the move.
 * @param {Array} currentPlayerActiveEmojis - The active emojis for the player making the move.
 * @param {number} player - The player making the move (1 or 2).
 * @param {number} index - The index to place the emoji.
 * @returns {{newBoard: Array, newActiveEmojis: Array}} The new board and active emojis list.
 */
export const simulateMove = (currentBoard, currentPlayerActiveEmojis, player, index) => {
  const newBoard = [...currentBoard];
  const newActiveEmojis = [...currentPlayerActiveEmojis];

  if (newActiveEmojis.length === 3) {
    const cellToRemoveIndex = newActiveEmojis[0].cellIndex;
    newBoard[cellToRemoveIndex] = null;
    newActiveEmojis.shift();
  }

  newBoard[index] = { player: player, emoji: 'X' }; 
  newActiveEmojis.push({ cellIndex: index, timestamp: Date.now() });

  return { newBoard, newActiveEmojis };
};