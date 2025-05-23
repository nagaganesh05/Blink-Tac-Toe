import React from 'react';

const GameInfo = React.memo(({ currentPlayer, winner, player1Score, player2Score, onPlayAgain, message }) => {
  return (
    <div className="text-center mb-6">
      {winner ? (
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-xl shadow-lg mb-4 transform scale-105 animate-bounce-once">
          <h2 className="text-3xl font-extrabold mb-2">Player {winner} Wins! 🎉</h2>
          <button
            onClick={onPlayAgain}
            className="mt-3 px-6 py-3 bg-white text-emerald-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="bg-blue-600 text-white p-3 rounded-lg shadow-md mb-4">
          <p className="text-xl font-semibold">Current Turn: Player {currentPlayer}</p>
        </div>
      )}
      <div className="bg-gray-700 text-white p-2 rounded-lg shadow-md flex justify-center space-x-4 text-lg font-medium">
        <span>Player 1 Score: <span className="font-bold">{player1Score}</span></span>
        <span>|</span>
        <span>Player 2 Score: <span className="font-bold">{player2Score}</span></span>
      </div>
      {message && (
        <p className="mt-3 text-red-600 font-semibold text-lg animate-fade-in-out">
          {message}
        </p>
      )}
    </div>
  );
});

export default GameInfo;
