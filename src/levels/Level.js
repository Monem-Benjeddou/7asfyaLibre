/**
 * Level
 * Level manager that loads and spawns entities
 */

import { Player } from '../entities/Player.js';
import { Platform } from '../entities/Platform.js';
import { Enemy } from '../entities/Enemy.js';
import { Collectible } from '../entities/Collectible.js';

export class Level {
  constructor(levelData) {
    this.data = levelData;
    this.platforms = [];
    this.enemies = [];
    this.collectibles = [];
    this.player = null;
    this.goal = levelData.goal;
  }

  load(game) {
    // Clear existing entities
    this.platforms = [];
    this.enemies = [];
    this.collectibles = [];

    // Create player
    this.player = new Player(
      this.data.playerStart.x,
      this.data.playerStart.y
    );
    game.setPlayer(this.player);

    // Create platforms
    this.data.platforms.forEach(platformData => {
      const platform = new Platform(
        platformData.x,
        platformData.y,
        platformData.width,
        platformData.height
      );
      this.platforms.push(platform);
      game.addPlatform(platform);
    });

    // Create enemies
    if (this.data.enemies) {
      this.data.enemies.forEach(enemyData => {
        const enemy = new Enemy(
          enemyData.x,
          enemyData.y,
          enemyData.patrolLeft,
          enemyData.patrolRight
        );
        this.enemies.push(enemy);
        game.addEnemy(enemy);
      });
    }

    // Create collectibles
    if (this.data.collectibles) {
      this.data.collectibles.forEach(collectibleData => {
        const collectible = new Collectible(
          collectibleData.x,
          collectibleData.y
        );
        this.collectibles.push(collectible);
        game.addCollectible(collectible);
      });
    }
  }

  checkGoal(player) {
    const playerBounds = player.getBounds();
    const goalBounds = {
      left: this.goal.x - 25,
      right: this.goal.x + 25,
      top: this.goal.y - 25,
      bottom: this.goal.y + 25,
    };

    return (
      playerBounds.left < goalBounds.right &&
      playerBounds.right > goalBounds.left &&
      playerBounds.top < goalBounds.bottom &&
      playerBounds.bottom > goalBounds.top
    );
  }
}

