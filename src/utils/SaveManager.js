/**
 * Save Manager
 * Handles localStorage operations for game progress persistence
 */

const SAVE_KEY = 'nird-game-progress';

export class SaveManager {
  /**
   * Save game progress to localStorage
   * @param {Object} gameState - Current game state
   * @param {number} gameState.currentLevel - Current level number
   * @param {Set} gameState.unlockedItems - Set of unlocked item types
   * @param {Set} gameState.visitedNpcs - Set of visited NPC IDs
   * @param {boolean} gameState.level1Completed - Whether level 1 is completed
   * @param {boolean} gameState.level2Completed - Whether level 2 is completed
   */
  static saveProgress(gameState) {
    try {
      const saveData = {
        currentLevel: gameState.currentLevel || 1,
        unlockedLevels: this.getUnlockedLevels(gameState),
        unlockedItems: Array.from(gameState.unlockedItems || []),
        visitedNpcs: Array.from(gameState.visitedNpcs || []),
        level1Completed: gameState.level1Completed || false,
        level2Completed: gameState.level2Completed || false,
        timestamp: Date.now()
      };
      
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      return true;
    } catch (error) {
      console.error('Error saving progress:', error);
      return false;
    }
  }

  /**
   * Load saved progress from localStorage
   * @returns {Object|null} Saved progress data or null if not found
   */
  static loadProgress() {
    try {
      const savedData = localStorage.getItem(SAVE_KEY);
      if (!savedData) {
        return null;
      }
      
      const parsed = JSON.parse(savedData);
      return {
        currentLevel: parsed.currentLevel || 1,
        unlockedLevels: parsed.unlockedLevels || [1],
        unlockedItems: new Set(parsed.unlockedItems || []),
        visitedNpcs: new Set(parsed.visitedNpcs || []),
        level1Completed: parsed.level1Completed || false,
        level2Completed: parsed.level2Completed || false,
        timestamp: parsed.timestamp || 0
      };
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  }

  /**
   * Clear all saved progress
   */
  static clearProgress() {
    try {
      localStorage.removeItem(SAVE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing progress:', error);
      return false;
    }
  }

  /**
   * Get highest unlocked level
   * @param {Object} gameState - Current game state
   * @returns {number} Highest unlocked level (1 or 2)
   */
  static getUnlockedLevel(gameState) {
    if (gameState.level2Completed) return 2;
    if (gameState.level1Completed) return 2; // Level 2 unlocked when level 1 completed
    return 1;
  }

  /**
   * Get array of unlocked levels
   * @param {Object} gameState - Current game state
   * @returns {number[]} Array of unlocked level numbers
   */
  static getUnlockedLevels(gameState) {
    const levels = [1]; // Level 1 always unlocked
    if (gameState.level1Completed || gameState.level2Completed) {
      levels.push(2);
    }
    return levels;
  }
}

