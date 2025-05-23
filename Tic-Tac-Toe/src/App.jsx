
import React, { useEffect, useCallback, useReducer, useMemo } from 'react';
import Board from './Components/Board'; 
import PlayerPanel from './Components/PlayerPanel';
import GameInfo from './Components/GameInfo';
import PreGameSetup from './Components/PreGameSetup';
import HelpModal from './Components/HelpModal';
import GameModeSelector from './Components/GameModeSelector';
import { gameReducer, initialState, EMOJI_CATEGORIES } from './gameReducer';
import { getWinningLines, getRandomEmoji, checkWin } from './utils/gameHelpers';
import { getAiMove } from './utils/aiLogic';
import classNames from 'classnames'; 

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
    gameMode,
    isAiTurn,
  } = gameState;

  const WINNING_LINES = useMemo(() => getWinningLines(), []);

  useEffect(() => {
    if (winner || !gameStarted) return;

    const lastPlayer = currentPlayer === 1 ? 2 : 1;
    const lastPlayerActiveEmojis = lastPlayer === 1 ? player1ActiveEmojis : player2ActiveEmojis;

    
    if (lastPlayerActiveEmojis.length >= 3) {
      const foundWinningLine = checkWin(board, lastPlayer, WINNING_LINES);
      if (foundWinningLine) {
        dispatch({ type: 'SET_WINNER', payload: { player: lastPlayer, line: foundWinningLine } });
        return;
      }
    }
  }, [board, currentPlayer, winner, gameStarted, player1ActiveEmojis, player2ActiveEmojis, WINNING_LINES]);


  
  useEffect(() => {

    if (gameStarted && gameMode === 'vs-ai' && isAiTurn && !winner) {
      dispatch({ type: 'SET_MESSAGE', payload: 'AI is thinking...' });
      const aiDelay = Math.random() * 800 + 400; 
      const timeoutId = setTimeout(() => {
        const aiMoveIndex = getAiMove({
          board,
          currentPlayer, 
          player1ActiveEmojis,
          player2ActiveEmojis,
        });

        if (aiMoveIndex !== null) {
          const aiEmojiCategory = player2Category; 
          const emoji = getRandomEmoji(EMOJI_CATEGORIES[aiEmojiCategory]);

          dispatch({
            type: 'PLACE_EMOJI',
            payload: {
              index: aiMoveIndex,
              emoji: emoji,
              player: currentPlayer, 
            },
          });
        } else {
          console.warn("AI could not find a move, but game is not over.");
          dispatch({ type: 'SET_MESSAGE', payload: 'AI paused.' });
        }
      }, aiDelay);

      return () => clearTimeout(timeoutId); 
    }
  }, [
    gameStarted,
    gameMode,
    isAiTurn,
    winner,
    currentPlayer, 
    player1ActiveEmojis, 
    player2ActiveEmojis, 
    player2Category, 
    board, 
    dispatch 
  ]);

  const handleCellClick = useCallback((index) => {
    if (gameMode === 'vs-ai' && isAiTurn) {
      dispatch({ type: 'SET_MESSAGE', payload: 'It\'s the AI\'s turn!' });
      setTimeout(() => dispatch({ type: 'SET_MESSAGE', payload: null }), 1500);
      return;
    }

    
    if (!gameStarted || winner || board[index]?.player) {
      if (board[index]?.player) { 
        dispatch({ type: 'SET_MESSAGE', payload: 'This cell is already occupied!' });
        setTimeout(() => dispatch({ type: 'SET_MESSAGE', payload: null }), 2000);
      }
      return;
    }

    const currentActiveEmojis = currentPlayer === 1 ? player1ActiveEmojis : player2ActiveEmojis;
    const oldestEmojiData = currentActiveEmojis.length === 3 ? currentActiveEmojis[0] : null;

    if (oldestEmojiData && index === oldestEmojiData.cellIndex) {
      dispatch({ type: 'SET_MESSAGE', payload: 'You cannot place your new emoji where your oldest emoji was!' });
      setTimeout(() => dispatch({ type: 'SET_MESSAGE', payload: null }), 3000);
      return;
    }


    const emojiCategory = currentPlayer === 1 ? player1Category : player2Category;
    const emoji = getRandomEmoji(EMOJI_CATEGORIES[emojiCategory]);
    dispatch({
      type: 'PLACE_EMOJI',
      payload: {
        index,
        emoji,
        player: currentPlayer,
      },
    });
  }, [gameMode, isAiTurn, gameStarted, winner, board, currentPlayer, player1ActiveEmojis, player2ActiveEmojis, player1Category, player2Category, dispatch]);


  const handleSelectGameMode = useCallback((mode) => {
    dispatch({ type: 'SET_GAME_MODE', payload: mode });
  }, [dispatch]);

  const handleStartGame = useCallback((p1Cat, p2Cat) => {
    dispatch({ type: 'START_GAME', payload: { player1Category: p1Cat, player2Category: p2Cat } });
  }, [dispatch]);


  const handlePlayAgain = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, [dispatch]);


  const toggleHelp = useCallback(() => {
    dispatch({ type: 'TOGGLE_HELP' });
  }, [dispatch]);

  return (
    <div className="font-inter min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-8 drop-shadow-md">
        Blink Tac Toe
      </h1>

      {!gameMode ? ( 
        <GameModeSelector onSelectMode={handleSelectGameMode} />
      ) : !gameStarted ? ( 
        <PreGameSetup
          categories={Object.keys(EMOJI_CATEGORIES)}
          onStartGame={handleStartGame}
          gameMode={gameMode} 
        />
      ) : (
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
            {gameMode === 'vs-ai' ? ( 
              <PlayerPanel
                player={2}
                isCurrentPlayer={currentPlayer === 2}
                emojiCategoryName={player2Category}
                emojisInPlayCount={player2ActiveEmojis.length}
                isAI={true} 
              />
            ) : ( 
              <PlayerPanel
                player={2}
                isCurrentPlayer={currentPlayer === 2}
                emojiCategoryName={player2Category}
                emojisInPlayCount={player2ActiveEmojis.length}
              />
            )}
          </div>
        </>
      )}

      <button
        className="mt-10 px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={toggleHelp}
      >
        {showHelp ? 'Hide Rules' : 'Show Rules'}
      </button>
      {gameMode && (
         <button
            className="mt-4 px-6 py-3 bg-gray-500 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => dispatch({ type: 'SET_GAME_MODE', payload: null })}
          >
            Change Mode
          </button>
      )}


      {showHelp && <HelpModal onClose={toggleHelp} />}
    </div>
  );
}

export default App;
