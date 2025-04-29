import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { shufflePuzzle, isSolved, canMovePiece, getEmptyPosition } from '../utils/puzzle-utils';
import { imageUrl } from '../utils/constants';

interface PuzzleContextType {
  grid: (number | null)[][];
  setGrid: React.Dispatch<React.SetStateAction<(number | null)[][]>>;
  gridSize: number;
  setGridSize: React.Dispatch<React.SetStateAction<number>>;
  shuffleCount: number;
  setShuffleCount: React.Dispatch<React.SetStateAction<number>>;
  moves: number;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  isGameStarted: boolean;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isGameWon: boolean;
  setIsGameWon: React.Dispatch<React.SetStateAction<boolean>>;
  movePiece: (row: number, col: number) => void;
  startNewGame: () => void;
  imageDimensions: { width: number; height: number } | null;
}

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export const PuzzleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gridSize, setGridSize] = useState<number>(3);
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [shuffleCount, setShuffleCount] = useState<number>(30);
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  
  // Initialize grid
  useEffect(() => {
    const initGrid = () => {
      const newGrid: (number | null)[][] = [];
      const totalPieces = gridSize * gridSize;
      
      for (let i = 0; i < gridSize; i++) {
        const row: (number | null)[] = [];
        for (let j = 0; j < gridSize; j++) {
          const index = i * gridSize + j;
          row.push(index === totalPieces - 1 ? null : index);
        }
        newGrid.push(row);
      }
      
      setGrid(newGrid);
    };
    
    initGrid();
  }, [gridSize]);
  
  // Load image dimensions
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, []);
  
  // Timer
  useEffect(() => {
    let interval: number | undefined;
    
    if (isGameStarted && !isGameWon) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameStarted, isGameWon]);
  
  // Check for win
  useEffect(() => {
    if (isGameStarted && grid.length > 0 && isSolved(grid)) {
      setIsGameWon(true);
      setIsGameStarted(false);
    }
  }, [grid, isGameStarted]);
  
  const movePiece = useCallback(
    (row: number, col: number) => {
      if (!isGameStarted || isGameWon) return;
      
      if (canMovePiece(grid, row, col)) {
        const newGrid = [...grid.map(row => [...row])];
        const [emptyRow, emptyCol] = getEmptyPosition(grid);
        
        newGrid[emptyRow][emptyCol] = grid[row][col];
        newGrid[row][col] = null;
        
        setGrid(newGrid);
        setMoves((prev) => prev + 1);
      }
    },
    [grid, isGameStarted, isGameWon]
  );
  
  const startNewGame = useCallback(() => {
    const initialGrid: (number | null)[][] = [];
    const totalPieces = gridSize * gridSize;
    
    for (let i = 0; i < gridSize; i++) {
      const row: (number | null)[] = [];
      for (let j = 0; j < gridSize; j++) {
        const index = i * gridSize + j;
        row.push(index === totalPieces - 1 ? null : index);
      }
      initialGrid.push(row);
    }
    
    const shuffledGrid = shufflePuzzle(initialGrid, shuffleCount);
    setGrid(shuffledGrid);
    setMoves(0);
    setTime(0);
    setIsGameStarted(true);
    setIsGameWon(false);
  }, [gridSize, shuffleCount]);
  
  return (
    <PuzzleContext.Provider
      value={{
        grid,
        setGrid,
        gridSize,
        setGridSize,
        shuffleCount,
        setShuffleCount,
        moves,
        setMoves,
        time,
        isGameStarted,
        setIsGameStarted,
        isGameWon,
        setIsGameWon,
        movePiece,
        startNewGame,
        imageDimensions
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzleContext = () => {
  const context = useContext(PuzzleContext);
  if (context === undefined) {
    throw new Error('usePuzzleContext must be used within a PuzzleProvider');
  }
  return context;
};