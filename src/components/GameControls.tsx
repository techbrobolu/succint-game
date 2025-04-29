import React from 'react';
import { Play, RotateCcw, Settings } from 'lucide-react';
import { usePuzzleContext } from '../context/PuzzleContext';

const GameControls: React.FC = () => {
  const { 
    gridSize, 
    setGridSize, 
    shuffleCount, 
    setShuffleCount, 
    isGameStarted, 
    startNewGame 
  } = usePuzzleContext();
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium flex items-center gap-2">
          <Settings className="w-4 h-4 text-pink-500" />
          Grid Size: {gridSize}x{gridSize}
        </label>
        <input
          type="range"
          min="2"
          max="5"
          value={gridSize}
          onChange={(e) => setGridSize(parseInt(e.target.value))}
          disabled={isGameStarted}
          className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">
          Difficulty: {shuffleCount <= 30 ? 'Easy' : shuffleCount <= 100 ? 'Medium' : 'Hard'} 
          ({shuffleCount} moves)
        </label>
        <input
          type="range"
          min="20"
          max="200"
          step="10"
          value={shuffleCount}
          onChange={(e) => setShuffleCount(parseInt(e.target.value))}
          disabled={isGameStarted}
          className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
      </div>
      
      <div className="flex gap-2 mt-2">
        <button
          onClick={startNewGame}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg ${
            isGameStarted 
              ? 'bg-pink-200 text-pink-700' 
              : 'bg-pink-500 text-white hover:bg-pink-600'
          } py-3 font-semibold transition-colors`}
          disabled={isGameStarted}
        >
          <Play className="w-5 h-5" />
          {isGameStarted ? 'Game In Progress' : 'Start Game'}
        </button>
        
        {isGameStarted && (
          <button
            onClick={startNewGame}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg text-gray-700 transition-colors"
            title="Restart Game"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default GameControls;