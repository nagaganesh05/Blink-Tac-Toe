import React from 'react';
import classNames from 'classnames';

const Cell = React.memo(({ index, cellData, onClick, isWinningCell }) => {
  const cellClasses = classNames(
    'flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40', 
    'bg-gray-100 border-2 border-gray-300 rounded-lg cursor-pointer text-5xl sm:text-6xl md:text-7xl',
    'hover:bg-gray-200 transition-all duration-200 ease-in-out',
    {
      'winning-cell bg-green-300 transform scale-105 shadow-lg': isWinningCell, 
      'cursor-not-allowed opacity-70': cellData, 
      'animate-pop-in': cellData, 
    }
  );

  return (
    <button className={cellClasses} onClick={onClick} disabled={!!cellData}>
      {cellData && (
        <span className="transform transition-transform duration-300 ease-out">
          {cellData.emoji}
        </span>
      )}
    </button>
  );
});

export default Cell;
