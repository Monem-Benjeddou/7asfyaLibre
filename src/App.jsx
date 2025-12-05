import { useState, useRef, useEffect } from 'react';
import { PlatformerCanvas } from './components/PlatformerCanvas';
import { GameUI } from './components/GameUI';
import { GameOverScreen } from './components/GameOverScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { DialogSystem } from './components/DialogSystem';
import MainMenu from './components/MainMenu';
import PauseMenu from './components/PauseMenu';

function App() {
  const [appState, setAppState] = useState('menu'); // 'menu', 'playing', 'paused'
  const [gameState, setGameState] = useState({
    gameState: 'playing',
    score: 0,
    lives: 3,
    level: 1,
    nirdResources: { competence: 0, reemploi: 0, licencesLibres: 0 },
    autonomy: 0,
    activeDialog: null,
  });

  const canvasRef = useRef(null);

  // Handle Escape key for pause menu
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && appState === 'playing' && !gameState.activeDialog) {
        if (canvasRef.current) {
          canvasRef.current.pause();
        }
        setAppState('paused');
      } else if (e.key === 'Escape' && appState === 'paused') {
        handleResume();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [appState, gameState.activeDialog]);

  const handleGameStateChange = (newState) => {
    setGameState(newState);
    // Update app state based on game state
    if (newState.gameState === 'paused' && appState === 'playing') {
      setAppState('paused');
    } else if (newState.gameState === 'playing' && appState === 'paused') {
      setAppState('playing');
    }
  };

  const handleStart = () => {
    setAppState('playing');
    // Game will start when PlatformerCanvas mounts
  };

  const handleResume = () => {
    if (canvasRef.current) {
      canvasRef.current.resume();
    }
    setAppState('playing');
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
      nirdResources: { competence: 0, reemploi: 0, licencesLibres: 0 },
      autonomy: 0,
      activeDialog: null,
    });
    setAppState('playing');
  };

  const handleMainMenu = () => {
    // Stop the game and reset state
    if (canvasRef.current) {
      const game = canvasRef.current.getGame();
      if (game) {
        game.stop();
      }
    }
    setAppState('menu');
    setGameState({
      gameState: 'playing',
      score: 0,
      lives: 3,
      level: 1,
      nirdResources: { competence: 0, reemploi: 0, licencesLibres: 0 },
      autonomy: 0,
      activeDialog: null,
    });
  };

  const handleCloseDialog = () => {
    if (canvasRef.current) {
      const game = canvasRef.current.getGame();
      if (game) {
        game.closeDialog();
      }
    }
  };

  const handleStats = () => {
    // TODO: Implement stats screen
    alert('Statistiques (à implémenter)');
  };

  const isDialogOpen = !!gameState.activeDialog;

  // Show main menu
  if (appState === 'menu') {
    return <MainMenu onStart={handleStart} onStats={handleStats} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-dark">
      {appState !== 'menu' && (
        <div style={{ pointerEvents: isDialogOpen ? 'none' : 'auto' }}>
          <PlatformerCanvas
            ref={canvasRef}
            onGameStateChange={handleGameStateChange}
          />
        </div>
      )}
      
      {gameState.gameState === 'playing' && appState === 'playing' && (
        <GameUI
          score={gameState.score}
          lives={gameState.lives}
          level={gameState.level}
          nirdResources={gameState.nirdResources}
          autonomy={gameState.autonomy}
        />
      )}

      {/* Dialog System */}
      <DialogSystem
        visible={!!gameState.activeDialog}
        conversation={gameState.activeDialog?.conversation}
        onClose={handleCloseDialog}
      />

      {/* Pause Menu */}
      {appState === 'paused' && (
        <PauseMenu
          onResume={handleResume}
          onRestart={handleRestart}
          onMainMenu={handleMainMenu}
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
          level={gameState.level}
          onRestart={handleRestart}
          onNextLevel={() => {
            if (canvasRef.current) {
              canvasRef.current.loadLevel(2);
              setGameState(prev => ({
                ...prev,
                gameState: 'playing',
                level: 2
              }));
              setAppState('playing');
            }
          }}
        />
      )}
    </div>
  );
}

export default App;
