import React from 'react';
import { usePuzzleContext } from '../context/PuzzleContext';
import { imageUrl } from '../utils/constants';

interface PuzzlePieceProps {
  index: number;
  gridSize: number;
  size: number;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ index, gridSize, size }) => {
  const { imageDimensions } = usePuzzleContext();
  
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  
  // Calculate the position of the piece in the source image
  const calculateImagePosition = () => {
    if (!imageDimensions) return {};
    
    const pieceWidth = imageDimensions.width / gridSize;
    const pieceHeight = imageDimensions.height / gridSize;
    
    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: `${imageDimensions.width}px ${imageDimensions.height}px`,
      backgroundPosition: `-${col * pieceWidth}px -${row * pieceHeight}px`,
    };
  };
  
  return (
    <div
      className="puzzle-piece w-full h-full absolute inset-0 flex items-center justify-center"
      style={{
        ...calculateImagePosition(),
        transform: `translate(0, 0)`,
      }}
    >
      <div className="absolute inset-0.5 border border-white/10"></div>
    </div>
  );
};

export default PuzzlePiece;