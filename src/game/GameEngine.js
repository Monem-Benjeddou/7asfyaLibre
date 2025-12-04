/**
 * Game Engine
 * Core game state management and logic
 */

import { Metrics } from './Metrics';
import { Relationships } from './Relationships';
import { calculateEnding } from './Endings';

export class GameEngine {
  constructor() {
    this.metrics = new Metrics();
    this.relationships = new Relationships();
    this.currentChapterId = 'chapter-1';
    this.choiceHistory = [];
    this.gameState = 'playing'; // 'playing', 'ended'
    this.ending = null;
  }

  /**
   * Get current game state
   */
  getState() {
    return {
      currentChapterId: this.currentChapterId,
      metrics: this.metrics.getMetrics(),
      relationships: this.relationships.getRelationships(),
      choiceHistory: [...this.choiceHistory],
      gameState: this.gameState,
      ending: this.ending,
    };
  }

  /**
   * Make a choice and apply its effects
   * @param {Object} choice - Choice object with effects and relationshipChanges
   */
  makeChoice(choice) {
    if (this.gameState !== 'playing') {
      return;
    }

    // Record choice
    this.choiceHistory.push({
      chapterId: this.currentChapterId,
      choiceId: choice.id,
      choiceText: choice.text,
      timestamp: Date.now(),
    });

    // Apply metric effects
    if (choice.effects) {
      this.metrics.applyEffects(choice.effects);
    }

    // Apply relationship changes
    if (choice.relationshipChanges) {
      this.relationships.applyChanges(choice.relationshipChanges);
    }

    return {
      metrics: this.metrics.getMetrics(),
      relationships: this.relationships.getRelationships(),
    };
  }

  /**
   * Advance to next chapter
   * @param {string} nextChapterId - ID of next chapter
   */
  advanceChapter(nextChapterId) {
    this.currentChapterId = nextChapterId;
  }

  /**
   * Check if game should end
   * @param {Function} getChapter - Function to get chapter data
   */
  checkGameEnd(getChapter) {
    const chapter = getChapter(this.currentChapterId);
    
    // If no next chapter, calculate ending
    if (!chapter || !chapter.nextChapter) {
      this.endGame();
      return true;
    }
    
    return false;
  }

  /**
   * End the game and calculate ending
   */
  endGame() {
    this.gameState = 'ended';
    this.ending = calculateEnding(this.metrics.getMetrics());
  }

  /**
   * Reset game to initial state
   */
  reset() {
    this.metrics.reset();
    this.relationships.reset();
    this.currentChapterId = 'chapter-1';
    this.choiceHistory = [];
    this.gameState = 'playing';
    this.ending = null;
  }

  /**
   * Get metrics for display
   */
  getMetrics() {
    return this.metrics.getMetrics();
  }

  /**
   * Get relationships for display
   */
  getRelationships() {
    return this.relationships.getRelationships();
  }

  /**
   * Check if a choice is available based on conditions
   * @param {Object} choice - Choice object with optional conditions
   */
  isChoiceAvailable(choice) {
    if (!choice.conditions) {
      return true;
    }

    // Check metric conditions
    if (choice.conditions.metrics) {
      const metrics = this.metrics.getMetrics();
      for (const [metric, condition] of Object.entries(choice.conditions.metrics)) {
        if (condition.min !== undefined && metrics[metric] < condition.min) {
          return false;
        }
        if (condition.max !== undefined && metrics[metric] > condition.max) {
          return false;
        }
      }
    }

    // Check relationship conditions
    if (choice.conditions.relationships) {
      const relationships = this.relationships.getRelationships();
      for (const [relationship, condition] of Object.entries(choice.conditions.relationships)) {
        if (condition.min !== undefined && relationships[relationship] < condition.min) {
          return false;
        }
        if (condition.max !== undefined && relationships[relationship] > condition.max) {
          return false;
        }
      }
    }

    // Check choice history conditions
    if (choice.conditions.previousChoices) {
      for (const requiredChoice of choice.conditions.previousChoices) {
        const found = this.choiceHistory.some(
          ch => ch.chapterId === requiredChoice.chapterId && ch.choiceId === requiredChoice.choiceId
        );
        if (!found) {
          return false;
        }
      }
    }

    return true;
  }
}

