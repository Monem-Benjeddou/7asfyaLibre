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
    this.animationFrame = 0; // For walking animation
    this.isJumping = false;
    this.fistRaised = false; // Victory animation
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
      this.isJumping = true;
      this.fistRaised = true; // Victory symbol when jumping
    }
    
    // Update animation
    if (this.onGround && Math.abs(this.vx) > 0) {
      this.animationFrame += 0.2;
    }
    
    // Reset fist raised after jump
    if (this.onGround && this.isJumping) {
      this.isJumping = false;
      setTimeout(() => { this.fistRaised = false; }, 300);
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
    // PM Student Character: Blue marine and Green uniform (ecocitoyenneté) with NIRD badge
    
    // Head (student, no hat)
    ctx.fillStyle = '#FFC080'; // Skin tone
    ctx.fillRect(this.x + 10, this.y + 8, 20, 18);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x + 10, this.y + 8, 20, 18);
    
    // Hair (dark brown)
    ctx.fillStyle = '#783C08';
    ctx.fillRect(this.x + 8, this.y + 8, 24, 6);
    ctx.strokeRect(this.x + 8, this.y + 8, 24, 6);
    
    // Eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x + 13, this.y + 15, 3, 3);
    ctx.fillRect(this.x + 24, this.y + 15, 3, 3);
    
    // Smile
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, 6, 0, Math.PI);
    ctx.stroke();
    
    // Body - Blue marine uniform (top part)
    ctx.fillStyle = '#0000C0'; // Blue marine
    ctx.fillRect(this.x + 8, this.y + 26, 24, 20);
    ctx.strokeRect(this.x + 8, this.y + 26, 24, 20);
    
    // Green part (ecocitoyenneté) - lower body
    ctx.fillStyle = '#50D010'; // Green
    ctx.fillRect(this.x + 8, this.y + 36, 24, 14);
    ctx.strokeRect(this.x + 8, this.y + 36, 24, 14);
    
    // NIRD Badge (visible on chest)
    ctx.fillStyle = '#FFFF00'; // Yellow badge
    ctx.fillRect(this.x + 16, this.y + 28, 8, 8);
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(this.x + 16, this.y + 28, 8, 8);
    // Badge text "N"
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 6px Arial';
    ctx.fillText('N', this.x + 18, this.y + 34);
    
    // Arms
    const armOffset = Math.sin(this.animationFrame) * 2; // Walking animation
    if (this.fistRaised) {
      // Raised fist (victory symbol when jumping)
      ctx.fillStyle = '#FFC080';
      ctx.fillRect(this.x + 4, this.y + 28, 6, 12);
      ctx.strokeRect(this.x + 4, this.y + 28, 6, 12);
      // Fist
      ctx.fillRect(this.x + 2, this.y + 26, 8, 6);
      ctx.strokeRect(this.x + 2, this.y + 26, 8, 6);
    } else {
      ctx.fillStyle = '#FFC080';
      ctx.fillRect(this.x + 4, this.y + 30 + armOffset, 6, 10);
      ctx.strokeRect(this.x + 4, this.y + 30 + armOffset, 6, 10);
    }
    
    ctx.fillStyle = '#FFC080';
    ctx.fillRect(this.x + 30, this.y + 30 - armOffset, 6, 10);
    ctx.strokeRect(this.x + 30, this.y + 30 - armOffset, 6, 10);
    
    // Legs - Green pants
    ctx.fillStyle = '#50D010';
    const legOffset = Math.sin(this.animationFrame + Math.PI) * 1;
    ctx.fillRect(this.x + 10, this.y + 45, 8, 5);
    ctx.fillRect(this.x + 22, this.y + 45, 8, 5);
    ctx.strokeRect(this.x + 10, this.y + 45, 8, 5);
    ctx.strokeRect(this.x + 22, this.y + 45, 8, 5);
    
    // Shoes
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x + 10, this.y + 50, 8, 3);
    ctx.fillRect(this.x + 22, this.y + 50, 8, 3);
  }
}

