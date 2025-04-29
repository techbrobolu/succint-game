import React from 'react';
import { Trophy, Clock, MousePointer, RotateCcw } from 'lucide-react';
import { formatTime } from '../utils/helpers';

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  moves: number;
  time: number;
  onPlayAgain: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ isOpen, onClose, moves, time, onPlayAgain }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="glassmorphism bg-white/90 rounded-2xl p-6 max-w-md w-full shadow-2xl celebrate"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Trophy className="w-10 h-10 text-yellow-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Puzzle Solved!
        </h2>
        
        <div className="bg-pink-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <MousePointer className="w-5 h-5 text-pink-500" />
              <span className="text-gray-700">Moves:</span>
            </div>
            <span className="font-bold text-pink-700">{moves}</span>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-pink-500" />
              <span className="text-gray-700">Time:</span>
            </div>
            <span className="font-bold text-pink-700">{formatTime(time)}</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;