/**
 * Bloc NIRD
 * Interactive block that reveals NIRD collectibles when hit from below
 * Brown brick block with NIRD symbol or open book instead of "?"
 */

import { Entity } from './Entity.js';

export class BlocNIRD extends Entity {
  constructor(x, y, width, height, collectibleType = 'pingouin') {
    super(x, y, width, height);
    this.hit = false;
    this.hitAnimation = 0;
    this.collectibleType = collectibleType; // 'pingouin', 'kit', 'cle'
    this.collectibleSpawned = false;
    this.collectible = null;
  }

  update(deltaTime) {
    // Blocks don't move, but handle hit animation
    if (this.hit) {
      this.hitAnimation += 0.2;
      if (this.hitAnimation > 1) {
        this.hitAnimation = 1;
      }
    }
  }

  hitFromBelow(player) {
    if (this.hit) return null;

    const playerBounds = player.getBounds();
    const blockBounds = this.getBounds();

    // Check if player is below and moving up (jumping into block)
    // Player's top should be near block's bottom, and player should be moving upward
    if (playerBounds.top >= blockBounds.bottom - 15 && 
        playerBounds.top <= blockBounds.bottom + 5 &&
        player.vy < 0 &&
        playerBounds.left < blockBounds.right &&
        playerBounds.right > blockBounds.left) {
      this.hit = true;
      // Stop player from going through block
      player.y = blockBounds.bottom;
      player.vy = 0;
      return this.collectibleType;
    }

    return null;
  }

  render(ctx) {
    // Brown brick block with NIRD symbol
    const brickColor = '#A85800';
    const brickDark = '#783C08';
    
    // Hit animation - move up slightly
    const offsetY = this.hit ? -Math.sin(this.hitAnimation * Math.PI) * 4 : 0;
    const renderY = this.y + offsetY;

    // Draw brick block
    ctx.fillStyle = brickColor;
    ctx.fillRect(this.x, renderY, this.width, this.height);
    
    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, renderY, this.width, this.height);
    
    // Brick texture (darker brown lines)
    ctx.strokeStyle = brickDark;
    ctx.lineWidth = 1;
    
    // Horizontal lines
    for (let i = 0; i < this.height; i += 4) {
      ctx.beginPath();
      ctx.moveTo(this.x, renderY + i);
      ctx.lineTo(this.x + this.width, renderY + i);
      ctx.stroke();
    }
    
    // Vertical lines with offset pattern
    const brickWidth = 16;
    for (let i = 0; i < this.width; i += brickWidth) {
      const offset = Math.floor(i / brickWidth) % 2 === 0 ? 0 : 2;
      ctx.beginPath();
      ctx.moveTo(this.x + i, renderY + offset);
      ctx.lineTo(this.x + i, renderY + this.height);
      ctx.stroke();
    }

    // NIRD symbol or open book icon
    const centerX = this.x + this.width / 2;
    const centerY = renderY + this.height / 2;

    // Draw open book icon (simpler than NIRD text in pixel art)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(centerX - 8, centerY - 6, 16, 10);
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(centerX - 8, centerY - 6, 16, 10);
    
    // Book pages (lines)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 6);
    ctx.lineTo(centerX, centerY + 4);
    ctx.stroke();
    
    // Book lines (text)
    for (let i = -4; i < 4; i += 2) {
      ctx.beginPath();
      ctx.moveTo(centerX - 6, centerY + i);
      ctx.lineTo(centerX - 1, centerY + i);
      ctx.moveTo(centerX + 1, centerY + i);
      ctx.lineTo(centerX + 6, centerY + i);
      ctx.stroke();
    }
  }
}

