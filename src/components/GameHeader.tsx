import React from 'react';
import { Puzzle, Volume2, VolumeX } from 'lucide-react';
import { useAudioContext } from '../context/AudioContext';

const GameHeader: React.FC = () => {
  const { isPlaying, toggleMusic } = useAudioContext();

  return (
    <header className="w-full text-center mb-4">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Puzzle className="w-8 h-8 text-pink-600" />
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
          Sliding Puzzle
        </h1>
        <button
          onClick={toggleMusic}
          className="p-2 rounded-full hover:bg-pink-100 transition-colors"
          aria-label={isPlaying ? 'Mute music' : 'Play music'}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6 text-pink-600" />
          ) : (
            <VolumeX className="w-6 h-6 text-pink-600" />
          )}
        </button>
      </div>
      <p className="text-gray-600 max-w-md mx-auto">
        Slide the pieces to recreate the original image. Challenge yourself with different difficulty levels!
      </p>
    </header>
  );
};

export default GameHeader;