/**
 * Virus de l'Obsolescence
 * Basic enemy representing obsolete hardware due to Windows 10 EOL
 * Equivalent to Goomba - slow, predictable movement
 * Professional pixel art design with animations
 */

import { Entity } from './Entity.js';
import { Physics } from '../game/Physics.js';
import { Collision } from '../game/Collision.js';

export class VirusObsolescence extends Entity {
  constructor(x, y, patrolLeft, patrolRight) {
    super(x, y, 32, 32);
    this.patrolLeft = patrolLeft;
    this.patrolRight = patrolRight;
    this.patrolSpeed = 0.8; // Slow, predictable
    this.direction = 1; // 1 = right, -1 = left
    this.onGround = false;
    this.defeated = false;
    this.animationFrame = 0;
    this.walkCycle = 0;
    
    // Design constants
    this.COLORS = {
      body: '#FF4040',      // Bright red
      bodyDark: '#CC0000',  // Darker red for depth
      bodyLight: '#FF8080', // Lighter red for highlight
      circuit: '#000000',   // Black for circuit lines
      alert: '#FFFF00',     // Yellow for alert
      outline: '#000000'    // Black outline
    };
  }

  update(deltaTime, platforms) {
    if (this.defeated) return;

    // Update animation (slower)
    this.animationFrame += deltaTime * 0.001;
    this.walkCycle = Math.sin(this.animationFrame * 1) * 0.5;

    // Slow, predictable patrol movement
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
    const walkOffset = this.walkCycle * 1.5;

    // Main body with 3D effect
    // Base body (darker red)
    ctx.fillStyle = COLORS.bodyDark;
    ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
    
    // Main body (bright red)
    ctx.fillStyle = COLORS.body;
    ctx.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    
    // Highlight (top-left)
    ctx.fillStyle = COLORS.bodyLight;
    ctx.fillRect(this.x + 2, this.y + 2, 10, 6);
    ctx.fillRect(this.x + 2, this.y + 2, 6, 10);
    
    // Shadow (bottom-right)
    ctx.fillStyle = COLORS.bodyDark;
    ctx.fillRect(this.x + this.width - 8, this.y + this.height - 6, 6, 4);
    ctx.fillRect(this.x + this.width - 6, this.y + this.height - 8, 4, 6);
    
    // Black outline
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    
    // Circuit board pattern (broken/obsolete)
    ctx.strokeStyle = COLORS.circuit;
    ctx.lineWidth = 1;
    
    // Horizontal circuit lines
    ctx.beginPath();
    ctx.moveTo(this.x + 4, this.y + 10);
    ctx.lineTo(this.x + 12, this.y + 10);
    ctx.moveTo(this.x + 20, this.y + 10);
    ctx.lineTo(this.x + 28, this.y + 10);
    ctx.moveTo(this.x + 4, this.y + 22);
    ctx.lineTo(this.x + 12, this.y + 22);
    ctx.moveTo(this.x + 20, this.y + 22);
    ctx.lineTo(this.x + 28, this.y + 22);
    ctx.stroke();
    
    // Vertical circuit lines (broken)
    ctx.beginPath();
    ctx.moveTo(this.x + 8, this.y + 6);
    ctx.lineTo(this.x + 8, this.y + 14);
    ctx.moveTo(this.x + 24, this.y + 18);
    ctx.lineTo(this.x + 24, this.y + 26);
    ctx.stroke();
    
    // Broken processor chip (center)
    ctx.fillStyle = COLORS.circuit;
    ctx.fillRect(centerX - 6, centerY - 6, 12, 12);
    
    // Crack lines through chip
    ctx.strokeStyle = COLORS.alert;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 6, centerY - 6);
    ctx.lineTo(centerX + 6, centerY + 6);
    ctx.moveTo(centerX + 6, centerY - 6);
    ctx.lineTo(centerX - 6, centerY + 6);
    ctx.stroke();
    
    // Alert indicator (blinking - slower)
    const alertVisible = Math.floor(this.animationFrame * 0.75) % 2 === 0;
    if (alertVisible) {
      ctx.fillStyle = COLORS.alert;
      ctx.fillRect(this.x + 24, this.y + 4, 4, 4);
    }
    
    // Legs/feet (animated walk cycle)
    ctx.fillStyle = COLORS.bodyDark;
    const leftFootY = this.y + this.height - 2 + walkOffset;
    const rightFootY = this.y + this.height - 2 - walkOffset;
    ctx.fillRect(this.x + 6, leftFootY, 4, 2);
    ctx.fillRect(this.x + 22, rightFootY, 4, 2);
  }
}

