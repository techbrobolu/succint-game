// Utility functions for the sliding puzzle game

// Check if a piece can be moved
export function canMovePiece(
  grid: (number | null)[][],
  row: number,
  col: number
): boolean {
  if (grid[row][col] === null) return false;
  
  const directions = [
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
    [-1, 0]  // up
  ];
  
  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    
    if (
      newRow >= 0 && 
      newRow < grid.length && 
      newCol >= 0 && 
      newCol < grid[0].length &&
      grid[newRow][newCol] === null
    ) {
      return true;
    }
  }
  
  return false;
}

// Get position of the empty piece (null)
export function getEmptyPosition(grid: (number | null)[][]): [number, number] {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === null) {
        return [i, j];
      }
    }
  }
  
  // Default fallback (should never happen in a valid puzzle)
  return [grid.length - 1, grid[0].length - 1];
}

// Shuffle the puzzle by making random valid moves
export function shufflePuzzle(
  grid: (number | null)[][],
  moves: number
): (number | null)[][] {
  const shuffled = [...grid.map(row => [...row])];
  const gridSize = shuffled.length;
  
  // Get empty position
  let [emptyRow, emptyCol] = getEmptyPosition(shuffled);
  
  // Keep track of last move to avoid undoing it
  let lastMove: [number, number] = [-1, -1];
  
  for (let i = 0; i < moves; i++) {
    // Find valid adjacent cells
    const validMoves: [number, number][] = [];
    const directions = [
      [0, 1],  // right
      [1, 0],  // down
      [0, -1], // left
      [-1, 0]  // up
    ];
    
    for (const [dx, dy] of directions) {
      const newRow = emptyRow + dx;
      const newCol = emptyCol + dy;
      
      if (
        newRow >= 0 && 
        newRow < gridSize && 
        newCol >= 0 && 
        newCol < gridSize &&
        !(newRow === lastMove[0] && newCol === lastMove[1])
      ) {
        validMoves.push([newRow, newCol]);
      }
    }
    
    // Randomly select a valid move
    if (validMoves.length > 0) {
      const [moveRow, moveCol] = validMoves[Math.floor(Math.random() * validMoves.length)];
      
      // Swap
      shuffled[emptyRow][emptyCol] = shuffled[moveRow][moveCol];
      shuffled[moveRow][moveCol] = null;
      
      // Update last move and empty position
      lastMove = [emptyRow, emptyCol];
      emptyRow = moveRow;
      emptyCol = moveCol;
    }
  }
  
  // Ensure the puzzle is not already solved after shuffling
  if (isSolved(shuffled)) {
    return shufflePuzzle(grid, moves); // Try again
  }
  
  return shuffled;
}

// Check if the puzzle is solved
export function isSolved(grid: (number | null)[][]): boolean {
  const gridSize = grid.length;
  const totalPieces = gridSize * gridSize;
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const expectedValue = i * gridSize + j;
      
      // Last position should be empty (null)
      if (expectedValue === totalPieces - 1) {
        if (grid[i][j] !== null) return false;
      } else {
        // Other positions should have the correct index
        if (grid[i][j] !== expectedValue) return false;
      }
    }
  }
  
  return true;
}