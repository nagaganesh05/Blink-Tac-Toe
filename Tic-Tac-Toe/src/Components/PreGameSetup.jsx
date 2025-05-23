import React, { useState } from 'react';
import classNames from 'classnames';

const PreGameSetup = React.memo(({ categories, onStartGame }) => {
  const [player1Category, setPlayer1Category] = useState('');
  const [player2Category, setPlayer2Category] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!player1Category || !player2Category) {
      setError('Please select a category for both players.');
      return;
    }
    if (player1Category === player2Category) {
      setError('Players must choose different emoji categories.');
      return;
    }
    setError('');
    onStartGame(player1Category, player2Category);
  };

  const isStartButtonDisabled = !player1Category || !player2Category || player1Category === player2Category;

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Select Your Emoji Categories</h2>
      {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}

      <div className="flex flex-col sm:flex-row justify-around items-center gap-6 mb-8">
        <div className="player-selection flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Player 1</h3>
          <select
            value={player1Category}
            onChange={(e) => setPlayer1Category(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg w-full max-w-[200px]"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="player-selection flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Player 2</h3>
          <select
            value={player2Category}
            onChange={(e) => setPlayer2Category(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg w-full max-w-[200px]"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className={classNames(
          'px-8 py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out',
          {
            'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105': !isStartButtonDisabled,
            'bg-gray-400 text-gray-200 cursor-not-allowed': isStartButtonDisabled,
          }
        )}
        onClick={handleStart}
        disabled={isStartButtonDisabled}
      >
        Start Game
      </button>
    </div>
  );
});

export default PreGameSetup;
