import React from 'react';
import GameBoard from './components/GameBoard';
import { PuzzleProvider } from './context/PuzzleContext';
import { AudioProvider } from './context/AudioContext';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <AudioProvider>
        <PuzzleProvider>
          <GameBoard />
        </PuzzleProvider>
      </AudioProvider>
    </div>
  );
}

export default App;