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
    // Headmaster Character: Formal suit with tie and glasses
    
    // Head
    ctx.fillStyle = '#FFC080'; // Skin tone
    ctx.fillRect(this.x + 10, this.y + 5, 20, 20);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x + 10, this.y + 5, 20, 20);
    
    // Hair (gray/white for mature headmaster)
    ctx.fillStyle = '#C0C0C0'; // Gray hair
    ctx.fillRect(this.x + 8, this.y + 5, 24, 8);
    ctx.strokeRect(this.x + 8, this.y + 5, 24, 8);
    // Hair sides
    ctx.fillRect(this.x + 6, this.y + 8, 4, 10);
    ctx.fillRect(this.x + 30, this.y + 8, 4, 10);
    ctx.strokeRect(this.x + 6, this.y + 8, 4, 10);
    ctx.strokeRect(this.x + 30, this.y + 8, 4, 10);
    
    // Glasses (round frames)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    // Left lens
    ctx.beginPath();
    ctx.arc(this.x + 15, this.y + 13, 5, 0, Math.PI * 2);
    ctx.stroke();
    // Right lens
    ctx.beginPath();
    ctx.arc(this.x + 25, this.y + 13, 5, 0, Math.PI * 2);
    ctx.stroke();
    // Bridge
    ctx.beginPath();
    ctx.moveTo(this.x + 20, this.y + 13);
    ctx.lineTo(this.x + 20, this.y + 13);
    ctx.stroke();
    
    // Eyes (behind glasses)
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x + 13, this.y + 12, 2, 2);
    ctx.fillRect(this.x + 25, this.y + 12, 2, 2);
    
    // Mustache (professional)
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(this.x + 14, this.y + 18, 12, 3);
    ctx.strokeRect(this.x + 14, this.y + 18, 12, 3);
    
    // Suit jacket (dark blue/black formal)
    ctx.fillStyle = '#181818'; // Dark suit
    ctx.fillRect(this.x + 6, this.y + 25, 28, 22);
    ctx.strokeRect(this.x + 6, this.y + 25, 28, 22);
    
    // Suit lapels
    ctx.fillStyle = '#202020';
    ctx.fillRect(this.x + 6, this.y + 25, 28, 4);
    ctx.strokeRect(this.x + 6, this.y + 25, 28, 4);
    
    // Tie (red/blue formal tie)
    ctx.fillStyle = '#4040C8'; // Blue tie
    ctx.fillRect(this.x + 18, this.y + 27, 4, 18);
    ctx.strokeRect(this.x + 18, this.y + 27, 4, 18);
    // Tie knot
    ctx.fillRect(this.x + 17, this.y + 27, 6, 4);
    ctx.strokeRect(this.x + 17, this.y + 27, 6, 4);
    
    // Shirt collar (white)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x + 12, this.y + 27, 6, 3);
    ctx.fillRect(this.x + 22, this.y + 27, 6, 3);
    ctx.strokeRect(this.x + 12, this.y + 27, 6, 3);
    ctx.strokeRect(this.x + 22, this.y + 27, 6, 3);
    
    // NIRD Badge (on suit lapel)
    ctx.fillStyle = '#FFFF00'; // Yellow badge
    ctx.fillRect(this.x + 10, this.y + 28, 6, 6);
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(this.x + 10, this.y + 28, 6, 6);
    // Badge text "N"
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 5px Arial';
    ctx.fillText('N', this.x + 12, this.y + 32);
    
    // Arms (in suit)
    const armOffset = Math.sin(this.animationFrame) * 2; // Walking animation
    if (this.fistRaised) {
      // Raised arm (victory symbol when jumping)
      ctx.fillStyle = '#181818';
      ctx.fillRect(this.x + 2, this.y + 28, 6, 14);
      ctx.strokeRect(this.x + 2, this.y + 28, 6, 14);
      // Hand
      ctx.fillStyle = '#FFC080';
      ctx.fillRect(this.x + 0, this.y + 26, 8, 6);
      ctx.strokeRect(this.x + 0, this.y + 26, 8, 6);
    } else {
      ctx.fillStyle = '#181818';
      ctx.fillRect(this.x + 2, this.y + 30 + armOffset, 6, 12);
      ctx.strokeRect(this.x + 2, this.y + 30 + armOffset, 6, 12);
      // Hand
      ctx.fillStyle = '#FFC080';
      ctx.fillRect(this.x + 1, this.y + 40 + armOffset, 4, 4);
      ctx.strokeRect(this.x + 1, this.y + 40 + armOffset, 4, 4);
    }
    
    ctx.fillStyle = '#181818';
    ctx.fillRect(this.x + 32, this.y + 30 - armOffset, 6, 12);
    ctx.strokeRect(this.x + 32, this.y + 30 - armOffset, 6, 12);
    // Hand
    ctx.fillStyle = '#FFC080';
    ctx.fillRect(this.x + 35, this.y + 40 - armOffset, 4, 4);
    ctx.strokeRect(this.x + 35, this.y + 40 - armOffset, 4, 4);
    
    // Suit pants (dark)
    ctx.fillStyle = '#181818';
    const legOffset = Math.sin(this.animationFrame + Math.PI) * 1;
    ctx.fillRect(this.x + 10, this.y + 47, 8, 3);
    ctx.fillRect(this.x + 22, this.y + 47, 8, 3);
    ctx.strokeRect(this.x + 10, this.y + 47, 8, 3);
    ctx.strokeRect(this.x + 22, this.y + 47, 8, 3);
    
    // Formal shoes (black)
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x + 9, this.y + 50, 10, 3);
    ctx.fillRect(this.x + 21, this.y + 50, 10, 3);
    ctx.strokeRect(this.x + 9, this.y + 50, 10, 3);
    ctx.strokeRect(this.x + 21, this.y + 50, 10, 3);
  }
}

