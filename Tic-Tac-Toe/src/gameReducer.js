// Define emoji categories (moved here to be imported by App.jsx and gameHelpers.js if needed)
export const EMOJI_CATEGORIES = {
    animals: ['🐶', '🐱', '🐵', '🐰'],
    food: ['🍕', '🍟', '🍔', '🍩'],
    sports: ['⚽️', '🏀', '🏈', '🎾'],
    emotions: ['😂', '🥰', '🤔', '😎'], // Custom category
  };
  
  // Initial state for the game
  export const initialState = {
    board: Array(9).fill(null), // Each cell: { player: 1/2, emoji: '🍕' }
    player1ActiveEmojis: [], // [{ cellIndex, timestamp }] - for FIFO tracking
    player2ActiveEmojis: [], // [{ cellIndex, timestamp }]
    currentPlayer: 1,
    winner: null, // null, 1, or 2
    winningLine: null, // [index1, index2, index3] for highlighting
    gameStarted: false,
    showHelp: false,
    player1Category: null,
    player2Category: null,
    player1Score: 0,
    player2Score: 0,
    message: null, // For temporary messages to the user (e.g., "Cannot place here!")
  };
  
  // Reducer function to manage game state transitions
  export const gameReducer = (state, action) => {
    switch (action.type) {
      case 'START_GAME':
        // Reset game state, but preserve scores from previous rounds
        return {
          ...initialState,
          gameStarted: true,
          player1Category: action.payload.player1Category,
          player2Category: action.payload.player2Category,
          player1Score: state.player1Score,
          player2Score: state.player2Score,
        };
  
      case 'PLACE_EMOJI': {
        const { index, emoji, player } = action.payload;
        const newBoard = [...state.board];
        const newActiveEmojis = player === 1 ? [...state.player1ActiveEmojis] : [...state.player2ActiveEmojis];
  
        // Vanishing Rule (FIFO Logic): If player has 3 emojis, remove the oldest
        if (newActiveEmojis.length === 3) {
          const cellToRemoveIndex = newActiveEmojis[0].cellIndex; // Get index of oldest emoji
          newBoard[cellToRemoveIndex] = null; // Clear the oldest emoji from the board
          newActiveEmojis.shift(); // Remove the oldest from the active list (FIFO)
        }
  
        // Place the new emoji
        newBoard[index] = { player, emoji };
        newActiveEmojis.push({ cellIndex: index, timestamp: Date.now() }); // Add new emoji to active list
  
        return {
          ...state,
          board: newBoard,
          currentPlayer: player === 1 ? 2 : 1, // Switch turn
          player1ActiveEmojis: player === 1 ? newActiveEmojis : state.player1ActiveEmojis,
          player2ActiveEmojis: player === 2 ? newActiveEmojis : state.player2ActiveEmojis,
          message: null, // Clear any previous messages
        };
      }
  
      case 'SET_WINNER':
        return {
          ...state,
          winner: action.payload.player,
          winningLine: action.payload.line,
          player1Score: action.payload.player === 1 ? state.player1Score + 1 : state.player1Score,
          player2Score: action.payload.player === 2 ? state.player2Score + 1 : state.player2Score,
        };
  
      case 'RESET_GAME':
        // Reset board and active emojis, but keep categories and scores for next round
        return {
          ...initialState,
          player1Category: state.player1Category,
          player2Category: state.player2Category,
          player1Score: state.player1Score,
          player2Score: state.player2Score,
          gameStarted: true, // Auto-start if categories are already selected
        };
  
      case 'TOGGLE_HELP':
        return {
          ...state,
          showHelp: !state.showHelp,
        };
  
      case 'SET_MESSAGE':
        return {
          ...state,
          message: action.payload,
        };
  
      default:
        return state;
    }
  };
  