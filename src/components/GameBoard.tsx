import React, { useEffect, useRef, useState } from 'react';
import { usePuzzleContext } from '../context/PuzzleContext';
import PuzzleGrid from './PuzzleGrid';
import GameControls from './GameControls';
import GameHeader from './GameHeader';
import WinModal from './WinModal';
import { formatTime } from '../utils/helpers';

const GameBoard: React.FC = () => {
  const { 
    isGameStarted, 
    isGameWon, 
    moves, 
    time, 
    startNewGame 
  } = usePuzzleContext();
  
  const [boardSize, setBoardSize] = useState<number>(320);
  const boardRef = useRef<HTMLDivElement>(null);
  const [showWinModal, setShowWinModal] = useState<boolean>(false);
  
  // Set board size based on viewport
  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current) {
        const maxSize = Math.min(
          window.innerWidth * 0.85, 
          window.innerHeight * 0.6, 
          500
        );
        setBoardSize(maxSize);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Show win modal when game is won
  useEffect(() => {
    if (isGameWon) {
      const timer = setTimeout(() => {
        setShowWinModal(true);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setShowWinModal(false);
    }
  }, [isGameWon]);
  
  return (
    <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-6">
      <GameHeader />
      
      <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center">
        <div 
          ref={boardRef}
          className="w-full max-w-md aspect-square flex items-center justify-center"
        >
          <div 
            className="relative overflow-hidden rounded-2xl shadow-xl"
            style={{ width: boardSize, height: boardSize }}
          >
            <PuzzleGrid size={boardSize} />
          </div>
        </div>
        
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div className="glassmorphism rounded-xl p-6 shadow-md">
            <div className="flex justify-between mb-4">
              <div className="text-center">
                <p className="text-pink-500 font-semibold">Moves</p>
                <p className="text-2xl font-bold">{moves}</p>
              </div>
              <div className="text-center">
                <p className="text-pink-500 font-semibold">Time</p>
                <p className="text-2xl font-bold timer">{formatTime(time)}</p>
              </div>
            </div>
            
            <GameControls />
          </div>
          
          <div className="glassmorphism rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-pink-700">How to Play</h3>
            <p className="text-gray-700 mb-3">
              Click or tap on tiles adjacent to the empty space to move them. Arrange the tiles to complete the image.
            </p>
            <p className="text-gray-700">
              Challenge yourself with different grid sizes and shuffle counts for varying difficulty levels.
            </p>
          </div>
        </div>
      </div>
      
      <WinModal 
        isOpen={showWinModal} 
        onClose={() => setShowWinModal(false)}
        moves={moves}
        time={time}
        onPlayAgain={() => {
          setShowWinModal(false);
          setTimeout(startNewGame, 300);
        }}
      />
    </div>
  );
};

export default GameBoard;