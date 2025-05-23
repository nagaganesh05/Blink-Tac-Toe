import React, { useEffect, useCallback, useReducer, useMemo } from 'react';
import Board from './Components/Board';
import PlayerPanel from './Components/PlayerPanel';
import GameInfo from './Components/GameInfo';
import PreGameSetup from './Components/PreGameSetup';
import HelpModal from './Components/HelpModal';
import { gameReducer, initialState, EMOJI_CATEGORIES } from './gameReducer';
import { getWinningLines, getRandomEmoji } from './utils/gameHelpers';

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const {
    board,
    player1ActiveEmojis,
    player2ActiveEmojis,
    currentPlayer,
    winner,
    winningLine,
    gameStarted,
    showHelp,
    player1Category,
    player2Category,
    player1Score,
    player2Score,
    message,
  } = gameState;

  // Memoize winning lines as they are constant and don't change
  const WINNING_LINES = useMemo(() => getWinningLines(), []);

  // Effect to check for a winner after each move
  useEffect(() => {
    if (winner || !gameStarted) return; // No need to check if already won or game not started

    // Only check for win if current player has at least 3 emojis on the board
    const activeEmojisCount = currentPlayer === 1 ? player1ActiveEmojis.length : player2ActiveEmojis.length;
    if (activeEmojisCount < 3) return;

    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      const cellA = board[a];
      const cellB = board[b];
      const cellC = board[c];

      // Check if all three cells in a line are occupied by the current player
      if (
        cellA && cellB && cellC &&
        cellA.player === currentPlayer &&
        cellB.player === currentPlayer &&
        cellC.player === currentPlayer
      ) {
        dispatch({ type: 'SET_WINNER', payload: { player: currentPlayer, line: WINNING_LINES[i] } });
        return; // Found a winner, stop checking
      }
    }
  }, [board, currentPlayer, winner, gameStarted, player1ActiveEmojis, player2ActiveEmojis, WINNING_LINES]);


  // Handler for cell clicks
  const handleCellClick = useCallback((index) => {
    // Prevent placing if game not started, already won, or cell is already occupied
    if (!gameStarted || winner || board[index]?.player) {
      if (board[index]?.player) {
        dispatch({ type: 'SET_MESSAGE', payload: 'This cell is already occupied!' });
        setTimeout(() => dispatch({ type: 'SET_MESSAGE', payload: null }), 2000); // Clear message after 2 seconds
      }
      return;
    }

    const currentActiveEmojis = currentPlayer === 1 ? player1ActiveEmojis : player2ActiveEmojis;
    const oldestEmojiData = currentActiveEmojis.length === 3 ? currentActiveEmojis[0] : null;

    // Vanishing Rule: Cannot place over where the oldest emoji was placed
    if (oldestEmojiData && index === oldestEmojiData.cellIndex) {
      dispatch({ type: 'SET_MESSAGE', payload: 'You cannot place your new emoji where your oldest emoji was!' });
      setTimeout(() => dispatch({ type: 'SET_MESSAGE', payload: null }), 3000); // Clear message after 3 seconds
      return;
    }

    // Get a random emoji from the current player's selected category
    const emojiCategory = currentPlayer === 1 ? player1Category : player2Category;
    const emoji = getRandomEmoji(EMOJI_CATEGORIES[emojiCategory]);

    // Dispatch action to place the emoji and update state
    dispatch({
      type: 'PLACE_EMOJI',
      payload: {
        index,
        emoji,
        player: currentPlayer,
      },
    });
  }, [gameStarted, winner, board, currentPlayer, player1ActiveEmojis, player2ActiveEmojis, player1Category, player2Category]);

  // Handler to start the game after category selection
  const handleStartGame = useCallback((p1Cat, p2Cat) => {
    dispatch({ type: 'START_GAME', payload: { player1Category: p1Cat, player2Category: p2Cat } });
  }, []);

  // Handler to reset the game for a new round
  const handlePlayAgain = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  // Handler to toggle the help modal visibility
  const toggleHelp = useCallback(() => {
    dispatch({ type: 'TOGGLE_HELP' });
  }, []);

  return (
    <div className="font-inter min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-8 drop-shadow-md">
        Blink Tac Toe
      </h1>

      {!gameStarted ? (
        // Show pre-game setup if game hasn't started
        <PreGameSetup
          categories={Object.keys(EMOJI_CATEGORIES)}
          onStartGame={handleStartGame}
        />
      ) : (
        // Show game board and info if game has started
        <>
          <GameInfo
            currentPlayer={currentPlayer}
            winner={winner}
            player1Score={player1Score}
            player2Score={player2Score}
            onPlayAgain={handlePlayAgain}
            message={message}
          />
          <Board
            board={board}
            onCellClick={handleCellClick}
            winningLine={winningLine}
          />
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 w-full max-w-2xl">
            <PlayerPanel
              player={1}
              isCurrentPlayer={currentPlayer === 1}
              emojiCategoryName={player1Category}
              emojisInPlayCount={player1ActiveEmojis.length}
            />
            <PlayerPanel
              player={2}
              isCurrentPlayer={currentPlayer === 2}
              emojiCategoryName={player2Category}
              emojisInPlayCount={player2ActiveEmojis.length}
            />
          </div>
        </>
      )}

      <button
        className="mt-10 px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={toggleHelp}
      >
        {showHelp ? 'Hide Rules' : 'Show Rules'}
      </button>

      {showHelp && <HelpModal onClose={toggleHelp} />}
    </div>
  );
}

export default App;
