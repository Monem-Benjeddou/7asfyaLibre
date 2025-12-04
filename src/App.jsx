import { useState, useRef } from 'react';
import { PlatformerCanvas } from './components/PlatformerCanvas';
import { GameUI } from './components/GameUI';
import { GameOverScreen } from './components/GameOverScreen';
import { VictoryScreen } from './components/VictoryScreen';

function App() {
  const [gameState, setGameState] = useState({
    gameState: 'playing',
    score: 0,
    lives: 3,
    level: 1,
  });

  const canvasRef = useRef(null);

  const handleGameStateChange = (newState) => {
    setGameState(newState);
  };

  const handleRestart = () => {
    if (canvasRef.current) {
      canvasRef.current.reset();
    }
    setGameState({
      gameState: 'playing',
      score: 0,
      lives: 3,
      level: 1,
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-game-darker">
      <PlatformerCanvas
        ref={canvasRef}
        onGameStateChange={handleGameStateChange}
      />
      
      {gameState.gameState === 'playing' && (
        <GameUI
          score={gameState.score}
          lives={gameState.lives}
          level={gameState.level}
        />
      )}

      {gameState.gameState === 'gameOver' && (
        <GameOverScreen
          score={gameState.score}
          onRestart={handleRestart}
        />
      )}

      {gameState.gameState === 'victory' && (
        <VictoryScreen
          score={gameState.score}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
