BLINK TAC TOE
A modern take on the classic Tic-Tac-Toe, featuring a unique "vanishing" emoji rule  and an AI opponent!

Tech Stack
This game is built with React, leveraging hooks like useState, useEffect, useCallback, and useReducer for efficient state management and component lifecycle. Tailwind CSS is used for rapid and responsive styling.

Emoji Categories
Players can choose their favorite emoji theme before starting the game. Here are the categories available:

Animals: 🐶, 🐱, 🐵, 🐰
Food: 🍕, 🍟, 🍔, 🍩
Sports: ⚽️, 🏀, 🏈, 🎾
Emotions: 😂, 🥰, 🤔, 😎


How the "Vanishing" Feature Works
The core mechanic of Blink Tac Toe is the "vanishing" rule, which introduces a dynamic strategic layer.

Limited Active Emojis: Each player can only have a maximum of 3 of their emojis on the board at any given time.
First-In, First-Out (FIFO): When a player makes a move that would result in them having a 4th emoji on the board, their oldest emoji (the one placed earliest) automatically vanishes from its cell.
Forbidden Placement: Crucially, a player cannot place their new emoji on the exact cell where their oldest emoji just disappeared from. This prevents immediate re-occupation and adds a tactical constraint.
Reusable Cells: Once an emoji vanishes, its cell becomes empty again and is available for either player to use on subsequent turns.
This feature is implemented using an activeEmojis array within the game state for each player. This array stores objects containing the cellIndex and a timestamp when the emoji was placed. Before placing a new emoji, the game checks the length of the current player's activeEmojis array. If it's 3, the cellIndex of the first (oldest) emoji in the array is retrieved, that cell is cleared on the board, and the oldest emoji is shift()-ed out of the activeEmojis array. The new emoji is then push()-ed into the array.

Potential Improvements with More Time
Given more development time, here are a few areas I'd love to enhance:

More Sophisticated AI: The current AI uses a rule-based system (check for win, block, fork, block fork, center, corners, sides). A more advanced AI could benefit from:
Minimax Algorithm: This would allow the AI to look deeper into future moves and counter-moves, potentially playing a perfect game.
Difficulty Levels: Implementing different AI difficulties by adjusting the depth of the Minimax search or adding randomness to its choices.
Enhanced User Experience:
Animations & Transitions: More fluid animations for emoji placement, vanishing, and winning lines to make the game feel even more polished.
Sound Effects: Subtle sound cues for emoji placement, winning, and turn changes.
Draw Detection: While the vanishing rule makes draws less common, formal draw detection and messaging would be a good addition.
Game Customization:
Custom Board Sizes: Allow players to choose different board sizes (e.g., 4x4) which would require adjusting winning line logic.
Custom Vanishing Limit: Let players set how many active emojis they can have (e.g., 2, 4, etc.).
Performance Optimizations: While React's memo and useCallback/useMemo are used, further profiling could identify and optimize any remaining performance bottlenecks.