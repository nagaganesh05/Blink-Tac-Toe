import React from 'react';
import classNames from 'classnames';

const HelpModal = React.memo(({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-gray-800 relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold"
          aria-label="Close help"
        >
          &times;
        </button>
        <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-700">Blink Tac Toe Rules</h2>
        <ol className="list-decimal list-inside space-y-4 text-lg leading-relaxed">
          <li>
            <strong className="text-blue-600">Board Structure:</strong> The game is played on a 3x3 grid. It can hold a maximum of 6 active emojis (3 per player) at any time.
          </li>
          <li>
            <strong className="text-blue-600">Emoji Categories:</strong> Each player selects a unique emoji category before the game starts. A random emoji from their chosen category is assigned on their turn.
          </li>
          <li>
            <strong className="text-blue-600">Turn-Based Play:</strong> Player 1 starts, then turns alternate. Place your emoji on any empty cell.
          </li>
          <li>
            <strong className="text-blue-600">Vanishing Rule:</strong>
            <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
              <li>Each player can only have 3 emojis on the board at a time.</li>
              <li>When a player attempts to place a 4th emoji, their *oldest* emoji (First-In, First-Out) is automatically removed from the board.</li>
              <li><strong className="text-red-600">Important:</strong> You *cannot* place your new emoji on the exact cell where your oldest emoji just disappeared from.</li>
              <li>The cell where an emoji vanishes becomes empty and reusable by either player.</li>
            </ul>
          </li>
          <li>
            <strong className="text-blue-600">Winning Condition:</strong> A player wins by forming a line of 3 of their own emojis horizontally, vertically, or diagonally. All winning emojis must belong to the same player.
          </li>
          <li>
            <strong className="text-blue-600">Game Ending:</strong> The game continues until one player wins. Draws are not possible. After a win, a "Player X Wins!" message is displayed, along with a "Play Again" button to restart the round.
          </li>
        </ol>
        <button
          onClick={onClose}
          className="mt-8 w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Got It!
        </button>
      </div>
    </div>
  );
});

export default HelpModal;
