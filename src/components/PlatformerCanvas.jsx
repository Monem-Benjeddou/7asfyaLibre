import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { PlatformerGame } from '../game/PlatformerGame';
import { Level } from '../levels/Level';
import { level1 } from '../levels/levelData';
import { Camera } from '../game/Camera';

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

    // Load level
    const level = new Level(level1);
    game.setLevel(level);

    // Start game loop
    game.start();

    // Cleanup on unmount
    return () => {
      game.cleanup();
    };
  }, []);

  // Expose reset function to parent
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (gameRef.current) {
        gameRef.current.reset();
        const level = new Level(level1);
        gameRef.current.setLevel(level);
      }
    },
  }));

  // Expose game instance to parent
  useEffect(() => {
    if (gameRef.current && onGameStateChange) {
      // Create a function to get game state
      const getGameState = () => ({
        gameState: gameRef.current.gameState,
        score: gameRef.current.score,
        lives: gameRef.current.lives,
        level: gameRef.current.level,
      });

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
        background: 'linear-gradient(to bottom, #87CEEB 0%, #98D8E8 100%)',
        imageRendering: 'pixelated'
      }}
    />
  );
});

