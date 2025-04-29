import React from 'react';
import PuzzlePiece from './PuzzlePiece';
import { usePuzzleContext } from '../context/PuzzleContext';

interface PuzzleGridProps {
  size: number;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ size }) => {
  const { grid, gridSize, isGameStarted, movePiece } = usePuzzleContext();
  
  // If game hasn't started, show the full image
  if (!isGameStarted) {
    return (
      <div className="w-full h-full">
        <img 
          src="../public/Succinct.png" 
          alt="Complete Puzzle" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  return (
    <div 
      className="w-full h-full bg-gray-100 grid puzzle-container"
      style={{ 
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) => (
        row.map((piece, colIndex) => (
          <div 
            key={`${rowIndex}-${colIndex}`}
            onClick={() => movePiece(rowIndex, colIndex)}
            className="relative overflow-hidden"
          >
            {piece !== null && (
              <PuzzlePiece 
                index={piece} 
                gridSize={gridSize}
                size={size / gridSize}
              />
            )}
          </div>
        ))
      ))}
    </div>
  );
};

export default PuzzleGrid;