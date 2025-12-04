/**
 * Player
 * Player entity with movement and jump
 */

import { Entity } from './Entity.js';
import { Physics } from '../game/Physics.js';
import { Collision } from '../game/Collision.js';

export class Player extends Entity {
  constructor(x, y) {
    super(x, y, 40, 50);
    this.speed = 5;
    this.jumpForce = -12;
    this.onGround = false;
    this.canJump = false;
    this.color = '#4CAF50'; // Green
  }

  update(deltaTime, input, platforms) {
    // Handle horizontal movement
    if (input.isLeftPressed()) {
      this.vx = -this.speed;
    } else if (input.isRightPressed()) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }

    // Handle jump
    if (input.isJumpPressed() && this.canJump && this.onGround) {
      this.vy = this.jumpForce;
      this.onGround = false;
      this.canJump = false;
    }

    // Apply physics
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
            this.canJump = true;
          } else if (collision.type === 'left') {
            this.x = collision.adjustX;
            this.vx = 0;
          } else if (collision.type === 'right') {
            this.x = collision.adjustX;
            this.vx = 0;
          }
        }
      }
    }

    // Apply friction when on ground
    if (this.onGround) {
      Physics.applyFriction(this);
    }

    // Reset jump ability if not pressing jump
    if (!input.isJumpPressed()) {
      this.canJump = true;
    }

    // Boundary checks (prevent falling off world)
    if (this.y > 1000) {
      // Fell off - will be handled by game
      return 'fell';
    }
  }

  render(ctx) {
    // Draw player as a rectangle
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw eyes for character
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x + 10, this.y + 10, 5, 5);
    ctx.fillRect(this.x + 25, this.y + 10, 5, 5);
  }
}

