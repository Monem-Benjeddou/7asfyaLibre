import { useState, useCallback } from 'react';
import { GameEngine } from '../game/GameEngine';

/**
 * Custom hook for game state management
 */
export function useGameState() {
  const [gameEngine] = useState(() => new GameEngine());
  const [state, setState] = useState(() => gameEngine.getState());

  const makeChoice = useCallback((choice) => {
    const result = gameEngine.makeChoice(choice);
    setState(gameEngine.getState());
    return result;
  }, [gameEngine]);

  const advanceChapter = useCallback((nextChapterId) => {
    gameEngine.advanceChapter(nextChapterId);
    setState(gameEngine.getState());
  }, [gameEngine]);

  const checkGameEnd = useCallback((getChapter) => {
    const ended = gameEngine.checkGameEnd(getChapter);
    if (ended) {
      setState(gameEngine.getState());
    }
    return ended;
  }, [gameEngine]);

  const resetGame = useCallback(() => {
    gameEngine.reset();
    setState(gameEngine.getState());
  }, [gameEngine]);

  const isChoiceAvailable = useCallback((choice) => {
    return gameEngine.isChoiceAvailable(choice);
  }, [gameEngine]);

  return {
    state,
    makeChoice,
    advanceChapter,
    checkGameEnd,
    resetGame,
    isChoiceAvailable,
    metrics: state.metrics,
    relationships: state.relationships,
    currentChapterId: state.currentChapterId,
    gameState: state.gameState,
    ending: state.ending,
  };
}

