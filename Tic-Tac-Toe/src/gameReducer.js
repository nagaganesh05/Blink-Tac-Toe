
export const EMOJI_CATEGORIES = {
  animals: ['🐶', '🐱', '🐵', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐷', '🐸'], 
  food: ['🍕', '🍟', '🍔', '🍩', '🍦', '🍪', '🥨', '🌮', '🍣', '🍝', '🍎', '🍓'], 
  sports: ['⚽️', '🏀', '🏈', '🎾', '⚾️', '🏐', '🏉', '🎱', '🎳', '🥊', '🏂', '🏄'], 
  emotions: ['😂', '🥰', '🤔', '😎', '🤩', '🥳', '😇', '😴', '🤯', '😱', '😭', '😡'], 
};


export const initialState = {
  board: Array(9).fill(null),
  player1ActiveEmojis: [], 
  player2ActiveEmojis: [], 
  currentPlayer: 1,
  winner: null, 
  winningLine: null, 
  gameStarted: false,
  showHelp: false,
  player1Category: null,
  player2Category: null,
  player1Score: 0,
  player2Score: 0,
  message: null, 
  gameMode: null, 
  isAiTurn: false, 
};


export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GAME_MODE': 
      return {
        ...initialState,
        gameMode: action.payload,
        player1Score: state.player1Score, 
        player2Score: state.player2Score,
      };

    case 'START_GAME':
      return {
        ...initialState,
        gameStarted: true,
        gameMode: state.gameMode, 
        player1Category: action.payload.player1Category,
        player2Category: action.payload.player2Category,
        player1Score: state.player1Score,
        player2Score: state.player2Score,
        isAiTurn: state.gameMode === 'vs-ai' && Math.random() < 0.5, 
        currentPlayer: state.gameMode === 'vs-ai' && state.isAiTurn ? 2 : 1, 
      };

    case 'PLACE_EMOJI': {
      const { index, emoji, player } = action.payload;
      const newBoard = [...state.board];
      const newActiveEmojis = player === 1 ? [...state.player1ActiveEmojis] : [...state.player2ActiveEmojis];

      if (newActiveEmojis.length === 3) {
        const cellToRemoveIndex = newActiveEmojis[0].cellIndex;
        newBoard[cellToRemoveIndex] = null;
        newActiveEmojis.shift();
      }

      newBoard[index] = { player, emoji };
      newActiveEmojis.push({ cellIndex: index, timestamp: Date.now() });

      return {
        ...state,
        board: newBoard,
        currentPlayer: player === 1 ? 2 : 1,
        player1ActiveEmojis: player === 1 ? newActiveEmojis : state.player1ActiveEmojis,
        player2ActiveEmojis: player === 2 ? newActiveEmojis : state.player2ActiveEmojis,
        message: null,
        isAiTurn: state.gameMode === 'vs-ai' && player === 1, 
      };
    }

    case 'SET_WINNER':
      return {
        ...state,
        winner: action.payload.player,
        winningLine: action.payload.line,
        player1Score: action.payload.player === 1 ? state.player1Score + 1 : state.player1Score,
        player2Score: action.payload.player === 2 ? state.player2Score + 1 : state.player2Score,
        isAiTurn: false, 
      };

    case 'RESET_GAME':
      return {
        ...initialState,
        gameMode: state.gameMode, 
        player1Category: state.player1Category,
        player2Category: state.player2Category,
        player1Score: state.player1Score,
        player2Score: state.player2Score,
        gameStarted: true,
        isAiTurn: state.gameMode === 'vs-ai' && Math.random() < 0.5,
        currentPlayer: state.gameMode === 'vs-ai' && state.isAiTurn ? 2 : 1,
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