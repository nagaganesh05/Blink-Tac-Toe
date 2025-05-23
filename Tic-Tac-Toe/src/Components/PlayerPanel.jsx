import React from 'react';
import classNames from 'classnames';

const PlayerPanel = React.memo(({ player, isCurrentPlayer, emojiCategoryName, emojisInPlayCount }) => {
  const panelClasses = classNames(
    'flex flex-col items-center p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out',
    'w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px]',
    {
      'bg-blue-100 border-2 border-blue-500 transform scale-105': isCurrentPlayer,
      'bg-gray-100 border-2 border-gray-300': !isCurrentPlayer,
    }
  );

  return (
    <div className={panelClasses}>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Player {player}</h3>
      <p className="text-sm text-gray-600">Category: <span className="font-semibold">{emojiCategoryName ? emojiCategoryName.charAt(0).toUpperCase() + emojiCategoryName.slice(1) : 'N/A'}</span></p>
      <p className="text-sm text-gray-600">Active Emojis: <span className="font-semibold">{emojisInPlayCount} / 3</span></p>
      {isCurrentPlayer && <span className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full animate-pulse">Your Turn!</span>}
    </div>
  );
});

export default PlayerPanel;
