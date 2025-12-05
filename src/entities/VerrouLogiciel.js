/**
 * Verrou Logiciel
 * Flying/jumping enemy representing expensive software licenses and closed ecosystems
 * Equivalent to Koopa Troopa - harder to reach, requires jumping
 * Professional design with smooth animations
 */

import { Entity } from './Entity.js';
import { Physics } from '../game/Physics.js';
import { Collision } from '../game/Collision.js';

export class VerrouLogiciel extends Entity {
  constructor(x, y, patrolLeft, patrolRight, isFlying = true) {
    super(x, y, 32, 32);
    this.patrolLeft = patrolLeft;
    this.patrolRight = patrolRight;
    this.patrolSpeed = 1.0;
    this.direction = 1;
    this.isFlying = isFlying;
    this.flyingHeight = y;
    this.flyingOffset = 0;
    this.rotation = 0; // For rotating key
    this.animationFrame = 0;
    this.onGround = false;
    this.defeated = false;
    
    // Design constants
    this.COLORS = {
      lockGold: '#FFD700',      // Gold lock
      lockGoldDark: '#CC9900',  // Darker gold
      lockGoldLight: '#FFE640', // Lighter gold
      lockSilver: '#C0C0C0',    // Silver parts
      lockSilverDark: '#808080', // Darker silver
      keyhole: '#000000',       // Black keyhole
      outline: '#000000'        // Black outline
    };
  }

  update(deltaTime, platforms) {
    if (this.defeated) return;

    // Update animation (slower)
    this.animationFrame += deltaTime * 0.001;
    
    // Rotate key (slower rotation)
    this.rotation += 0.03;

    if (this.isFlying) {
      // Flying movement - up and down pattern (slower)
      this.flyingOffset = Math.sin(this.rotation * 1) * 15;
      this.y = this.flyingHeight + this.flyingOffset;
      
      // Horizontal patrol
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
      this.x += this.vx;
    } else {
      // Ground-based with jumping
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
              this.direction = 1;
            } else if (collision.type === 'right') {
              this.x = collision.adjustX;
              this.vx = 0;
              this.direction = -1;
            }
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
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    ctx.save();
    ctx.translate(centerX, centerY);

    // Lock body with 3D effect
    // Shadow layer
    ctx.fillStyle = COLORS.lockGoldDark;
    ctx.fillRect(-16, -12, 32, 24);
    
    // Main lock body (gold)
    ctx.fillStyle = COLORS.lockGold;
    ctx.fillRect(-15, -11, 30, 22);
    
    // Highlight (top-left)
    ctx.fillStyle = COLORS.lockGoldLight;
    ctx.fillRect(-13, -9, 12, 6);
    ctx.fillRect(-13, -9, 6, 12);
    
    // Shadow (bottom-right)
    ctx.fillStyle = COLORS.lockGoldDark;
    ctx.fillRect(7, 5, 6, 4);
    ctx.fillRect(9, 3, 4, 6);
    
    // Black outline
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 2;
    ctx.strokeRect(-15, -11, 30, 22);
    
    // Lock shackle (top arch)
    ctx.fillStyle = COLORS.lockSilver;
    ctx.beginPath();
    ctx.arc(0, -11, 8, Math.PI, 0, false);
    ctx.fill();
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Lock body details (silver center)
    ctx.fillStyle = COLORS.lockSilver;
    ctx.fillRect(-10, -6, 20, 12);
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 1;
    ctx.strokeRect(-10, -6, 20, 12);
    
    // Inner highlight
    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(-8, -4, 16, 2);
    
    // Keyhole
    ctx.fillStyle = COLORS.keyhole;
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-2, 0, 4, 8);
    
    // Keyhole highlight
    ctx.fillStyle = '#404040';
    ctx.beginPath();
    ctx.arc(-1, -1, 2, 0, Math.PI * 2);
    ctx.fill();

    // Rotating key above lock
    ctx.save();
    ctx.rotate(this.rotation);
    
    // Key shadow
    ctx.fillStyle = COLORS.lockSilverDark;
    ctx.fillRect(-4, -26, 8, 14);
    
    // Key body (silver)
    ctx.fillStyle = COLORS.lockSilver;
    ctx.fillRect(-3, -25, 6, 12);
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 1;
    ctx.strokeRect(-3, -25, 6, 12);
    
    // Key head (larger)
    ctx.fillStyle = COLORS.lockSilver;
    ctx.fillRect(-7, -29, 14, 8);
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 1;
    ctx.strokeRect(-7, -29, 14, 8);
    
    // Key head details (teeth)
    ctx.fillStyle = COLORS.lockSilverDark;
    ctx.fillRect(-5, -27, 2, 2);
    ctx.fillRect(3, -27, 2, 2);
    ctx.fillRect(-3, -25, 2, 2);
    ctx.fillRect(1, -25, 2, 2);
    
    ctx.restore();

    ctx.restore();
  }
}

