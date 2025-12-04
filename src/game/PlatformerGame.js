/**
 * Platformer Game
 * Main game class managing game loop and entities
 */

import { InputHandler } from './InputHandler.js';
import { Collision } from './Collision.js';

export class PlatformerGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.input = new InputHandler();
    
    // Game state
    this.gameState = 'playing'; // 'playing', 'paused', 'gameOver', 'victory'
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    
    // Game entities (will be populated)
    this.player = null;
    this.platforms = [];
    this.enemies = [];
    this.collectibles = [];
    
    // Camera (will be set up later)
    this.camera = null;
    
    // Current level
    this.currentLevel = null;
    
    // Game loop
    this.lastTime = 0;
    this.animationFrameId = null;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  gameLoop() {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (this.gameState === 'playing') {
      this.update(deltaTime);
    }
    
    this.render();
    
    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
  }

  update(deltaTime) {
    if (!this.player || this.gameState !== 'playing') return;

    // Update player
    const playerResult = this.player.update(deltaTime, this.input, this.platforms);
    
    // Check if player fell off world
    if (playerResult === 'fell') {
      this.loseLife();
      if (this.gameState === 'playing') {
        // Reset player position
        this.currentLevel.load(this);
      }
      return;
    }

    // Update enemies
    this.enemies.forEach(enemy => {
      enemy.update(deltaTime, this.platforms);
      
      // Check enemy-player collision
      const collision = enemy.checkPlayerCollision(this.player);
      if (collision === 'defeated') {
        enemy.defeat();
        this.removeEnemy(enemy);
        this.addScore(50);
      } else if (collision === 'damage') {
        this.loseLife();
        if (this.gameState === 'playing') {
          // Reset player position
          this.currentLevel.load(this);
        }
      }
    });

    // Update collectibles
    this.collectibles.forEach(collectible => {
      collectible.update(deltaTime);
      
      // Check collectible-player collision
      if (Collision.checkEntityCollision(this.player, collectible) && !collectible.collected) {
        const points = collectible.collect();
        this.addScore(points);
        this.removeCollectible(collectible);
      }
    });

    // Check victory condition
    if (this.currentLevel && this.currentLevel.checkGoal(this.player)) {
      this.gameState = 'victory';
    }

    // Update camera
    if (this.camera && this.player) {
      this.camera.update(this.player, this.canvas.width, this.canvas.height);
    }
  }

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Apply camera transform if available
    if (this.camera) {
      this.ctx.save();
      this.ctx.translate(-this.camera.x, -this.camera.y);
    }
    
    // Render entities (order matters: background to foreground)
    this.platforms.forEach(platform => platform.render(this.ctx));
    this.collectibles.forEach(collectible => collectible.render(this.ctx));
    this.enemies.forEach(enemy => enemy.render(this.ctx));
    if (this.player) {
      this.player.render(this.ctx);
    }

    // Render goal flag
    if (this.currentLevel && this.currentLevel.goal) {
      this.renderGoal(this.ctx);
    }
    
    // Restore transform
    if (this.camera) {
      this.ctx.restore();
    }
  }

  renderGoal(ctx) {
    const goal = this.currentLevel.goal;
    // Draw flag pole
    ctx.fillStyle = '#654321';
    ctx.fillRect(goal.x - 2, goal.y - 50, 4, 50);
    // Draw flag
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(goal.x, goal.y - 40, 30, 20);
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText('🏁', goal.x + 5, goal.y - 20);
  }

  setPlayer(player) {
    this.player = player;
  }

  addPlatform(platform) {
    this.platforms.push(platform);
  }

  addEnemy(enemy) {
    this.enemies.push(enemy);
  }

  addCollectible(collectible) {
    this.collectibles.push(collectible);
  }

  removeCollectible(collectible) {
    const index = this.collectibles.indexOf(collectible);
    if (index > -1) {
      this.collectibles.splice(index, 1);
    }
  }

  removeEnemy(enemy) {
    const index = this.enemies.indexOf(enemy);
    if (index > -1) {
      this.enemies.splice(index, 1);
    }
  }

  addScore(points) {
    this.score += points;
  }

  loseLife() {
    this.lives--;
    if (this.lives <= 0) {
      this.gameState = 'gameOver';
    }
  }

  setLevel(level) {
    this.currentLevel = level;
    // Clear existing entities
    this.platforms = [];
    this.enemies = [];
    this.collectibles = [];
    this.player = null;
    // Load level
    level.load(this);
  }

  reset() {
    this.gameState = 'playing';
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    // Reload current level
    if (this.currentLevel) {
      this.currentLevel.load(this);
    }
  }

  cleanup() {
    this.stop();
    if (this.input) {
      this.input.cleanup();
    }
  }
}

