import React from 'react';
import classNames from 'classnames';

const GameModeSelector = React.memo(({ onSelectMode }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Choose Game Mode</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <button
          onClick={() => onSelectMode('2-player')}
          className={classNames(
            'px-8 py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out',
            'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
          )}
        >
          2-Player Mode
        </button>
        <button
          onClick={() => onSelectMode('vs-ai')}
          className={classNames(
            'px-8 py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out',
            'bg-purple-600 text-white hover:bg-purple-700 transform hover:scale-105'
          )}
        >
          Vs. AI
        </button>
      </div>
    </div>
  );
});

export default GameModeSelector;