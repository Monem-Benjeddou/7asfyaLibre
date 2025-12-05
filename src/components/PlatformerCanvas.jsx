import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { PlatformerGame } from '../game/PlatformerGame';
import { Level } from '../levels/Level';
import { level1, level2 } from '../levels/levelData';
import { Camera } from '../game/Camera';
import { SaveManager } from '../utils/SaveManager.js';

export const PlatformerCanvas = forwardRef(({ onGameStateChange }, ref) => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 600;

    // Initialize game
    const game = new PlatformerGame(canvas);
    gameRef.current = game;

    // Initialize camera
    const camera = new Camera();
    game.camera = camera;

    // Load saved progress
    const saved = game.loadProgress();
    let initialLevel = level1;
    let initialLevelNumber = 1;
    
    if (saved) {
      initialLevelNumber = saved.currentLevel || 1;
      // Determine which level to load
      if (initialLevelNumber === 2 && (saved.level1Completed || saved.unlockedLevels?.includes(2))) {
        initialLevel = level2;
      }
      // Set level number explicitly
      game.level = initialLevelNumber;
    }

    // Load level
    const level = new Level(initialLevel);
    game.setLevel(level);
    game.level = initialLevelNumber; // Ensure level number is set correctly

    // Start game loop
    game.start();

    // Cleanup on unmount
    return () => {
      game.cleanup();
    };
  }, []);

  // Expose reset function and game instance to parent
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (gameRef.current) {
        gameRef.current.reset();
        // Load saved level or default to level 1
        const saved = SaveManager.loadProgress();
        let levelToLoad = level1;
        let levelNumber = 1;
        if (saved && saved.currentLevel === 2 && saved.level1Completed) {
          levelToLoad = level2;
          levelNumber = 2;
        }
        const level = new Level(levelToLoad);
        gameRef.current.setLevel(level);
        gameRef.current.level = levelNumber;
      }
    },
    getGame: () => gameRef.current,
    resume: () => {
      if (gameRef.current) {
        gameRef.current.resume();
      }
    },
    pause: () => {
      if (gameRef.current) {
        gameRef.current.pause();
      }
    },
    loadLevel: (levelNumber) => {
      if (gameRef.current) {
        let levelData;
        if (levelNumber === 2) {
          levelData = level2;
        } else {
          levelData = level1;
        }
        // Set level number before loading level
        gameRef.current.level = levelNumber;
        // Reset game state to playing
        gameRef.current.gameState = 'playing';
        const level = new Level(levelData);
        gameRef.current.setLevel(level);
        // Ensure game is running
        if (!gameRef.current.running) {
          gameRef.current.start();
        }
      }
    },
  }));

  // Expose game instance to parent
  useEffect(() => {
    if (gameRef.current && onGameStateChange) {
      // Create a function to get game state
      const getGameState = () => {
        const resources = gameRef.current.nirdResources.getResources();
        return {
          gameState: gameRef.current.gameState,
          score: gameRef.current.score,
          lives: gameRef.current.lives,
          level: gameRef.current.level,
          nirdResources: resources,
          autonomy: gameRef.current.nirdResources.calculateAutonomy(),
          activeDialog: gameRef.current.activeDialog,
        };
      };

      // Poll game state (could be improved with events)
      const interval = setInterval(() => {
        if (gameRef.current) {
          onGameStateChange(getGameState());
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [onGameStateChange]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      style={{ 
        background: '#40A0FF',
        imageRendering: 'pixelated'
      }}
    />
  );
});

