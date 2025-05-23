/**
 * Returns a random emoji from the given category array.
 * @param {string[]} categoryEmojis - An array of emoji strings.
 * @returns {string} A random emoji.
 */
export const getRandomEmoji = (categoryEmojis) => {
    if (!categoryEmojis || categoryEmojis.length === 0) {
      console.warn("No emojis in category to pick from.");
      return '❓'; // Fallback
    }
    const randomIndex = Math.floor(Math.random() * categoryEmojis.length);
    return categoryEmojis[randomIndex];
  };
  
  /**
   * Defines all possible winning lines on a 3x3 Tic Tac Toe board.
   * @returns {number[][]} An array of arrays, where each inner array represents a winning line's cell indices.
   */
  export const getWinningLines = () => {
    return [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];
  };
  