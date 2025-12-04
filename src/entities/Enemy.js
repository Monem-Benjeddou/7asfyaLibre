/**
 * Enemy
 * Enemy entity with patrol AI
 */

import { Entity } from './Entity.js';
import { Physics } from '../game/Physics.js';
import { Collision } from '../game/Collision.js';

export class Enemy extends Entity {
  constructor(x, y, patrolLeft, patrolRight) {
    super(x, y, 30, 30);
    this.patrolLeft = patrolLeft;
    this.patrolRight = patrolRight;
    this.patrolSpeed = 2;
    this.direction = 1; // 1 = right, -1 = left
    this.color = '#FF0000'; // Red
    this.onGround = false;
    this.defeated = false;
  }

  update(deltaTime, platforms) {
    if (this.defeated) return;

    // Patrol movement
    if (this.direction > 0) {
      this.vx = this.patrolSpeed;
      if (this.x >= this.patrolRight) {
        this.direction = -1;
      }
    } else {
      this.vx = -this.patrolSpeed;
      if (this.x <= this.patrolLeft) {
        this.direction = 1;
      }
    }

    // Apply gravity
    this.onGround = false;
    Physics.applyGravity(this);

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Check platform collisions
    if (platforms) {
      for (const platform of platforms) {
        const collision = Collision.checkPlatformCollision(this, platform);
        if (collision) {
          if (collision.type === 'top') {
            this.y = collision.adjustY;
            this.vy = 0;
            this.onGround = true;
          } else if (collision.type === 'left') {
            this.x = collision.adjustX;
            this.vx = 0;
            this.direction = 1; // Turn around
          } else if (collision.type === 'right') {
            this.x = collision.adjustX;
            this.vx = 0;
            this.direction = -1; // Turn around
          }
        }
      }
    }
  }

  checkPlayerCollision(player) {
    if (this.defeated) return null;

    const playerBounds = player.getBounds();
    const enemyBounds = this.getBounds();

    if (!Collision.checkAABB(playerBounds, enemyBounds)) {
      return null;
    }

    // Check if player is landing on top of enemy
    const playerBottom = playerBounds.bottom;
    const enemyTop = enemyBounds.top;
    const playerVy = player.vy;

    // Player is above enemy and falling
    if (playerBottom <= enemyTop + 10 && playerVy > 0) {
      return 'defeated';
    }

    // Player hit enemy from side or bottom
    return 'damage';
  }

  defeat() {
    this.defeated = true;
  }

  render(ctx) {
    if (this.defeated) return;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x + 8, this.y + 8, 4, 4);
    ctx.fillRect(this.x + 18, this.y + 8, 4, 4);
  }
}

