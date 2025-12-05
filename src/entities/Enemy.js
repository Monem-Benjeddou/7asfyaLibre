/**
 * Enemy
 * Base enemy entity with patrol AI
 * Professional design with animations
 */

import { Entity } from './Entity.js';
import { Physics } from '../game/Physics.js';
import { Collision } from '../game/Collision.js';

export class Enemy extends Entity {
  constructor(x, y, patrolLeft, patrolRight) {
    super(x, y, 32, 32);
    this.patrolLeft = patrolLeft;
    this.patrolRight = patrolRight;
    this.patrolSpeed = 1.0;
    this.direction = 1; // 1 = right, -1 = left
    this.onGround = false;
    this.defeated = false;
    this.animationFrame = 0;
    this.walkCycle = 0;
    
    // Design constants
    this.COLORS = {
      body: '#FF0000',      // Red - 8-bit palette
      bodyDark: '#CC0000',  // Darker red
      bodyLight: '#FF4040', // Lighter red
      eyes: '#000000',      // Black eyes
      outline: '#000000'    // Black outline
    };
  }

  update(deltaTime, platforms) {
    if (this.defeated) return;

    // Update animation (slower)
    this.animationFrame += deltaTime * 0.001;
    this.walkCycle = Math.sin(this.animationFrame * 1) * 0.5;

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

    const { COLORS } = this;
    const walkOffset = this.walkCycle * 1.5;

    // Enemy body with 3D effect
    // Shadow layer
    ctx.fillStyle = COLORS.bodyDark;
    ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
    
    // Main body (red)
    ctx.fillStyle = COLORS.body;
    ctx.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    
    // Highlight (top-left)
    ctx.fillStyle = COLORS.bodyLight;
    ctx.fillRect(this.x + 2, this.y + 2, 12, 8);
    ctx.fillRect(this.x + 2, this.y + 2, 8, 12);
    
    // Shadow (bottom-right)
    ctx.fillStyle = COLORS.bodyDark;
    ctx.fillRect(this.x + this.width - 10, this.y + this.height - 6, 8, 4);
    ctx.fillRect(this.x + this.width - 6, this.y + this.height - 10, 4, 8);
    
    // Black outline
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Draw eyes (animated blink - slower)
    const blink = Math.floor(this.animationFrame * 0.5) % 20 < 2;
    if (!blink) {
      ctx.fillStyle = COLORS.eyes;
      // Left eye
      ctx.fillRect(this.x + 9, this.y + 10, 5, 5);
      // Right eye
      ctx.fillRect(this.x + 18, this.y + 10, 5, 5);
      
      // Eye highlights
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(this.x + 10, this.y + 11, 2, 2);
      ctx.fillRect(this.x + 19, this.y + 11, 2, 2);
    } else {
      // Blinking - draw as lines
      ctx.strokeStyle = COLORS.eyes;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.x + 9, this.y + 12);
      ctx.lineTo(this.x + 14, this.y + 12);
      ctx.moveTo(this.x + 18, this.y + 12);
      ctx.lineTo(this.x + 23, this.y + 12);
      ctx.stroke();
    }
    
    // Mouth (simple line)
    ctx.strokeStyle = COLORS.eyes;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x + 10, this.y + 20);
    ctx.lineTo(this.x + 22, this.y + 20);
    ctx.stroke();
    
    // Legs/feet (animated walk cycle)
    ctx.fillStyle = COLORS.bodyDark;
    const leftFootY = this.y + this.height - 2 + walkOffset;
    const rightFootY = this.y + this.height - 2 - walkOffset;
    ctx.fillRect(this.x + 6, leftFootY, 5, 2);
    ctx.fillRect(this.x + 21, rightFootY, 5, 2);
  }
}

