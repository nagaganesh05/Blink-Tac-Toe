import React from 'react';
import Cell from './Cell';

const Board = React.memo(({ board, onCellClick, winningLine }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50 shadow-inner rounded-xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      {board.map((cellData, index) => (
        <Cell
          key={index}
          index={index}
          cellData={cellData}
          onClick={() => onCellClick(index)}
          isWinningCell={winningLine && winningLine.includes(index)}
        />
      ))}
    </div>
  );
});

export default Board;
