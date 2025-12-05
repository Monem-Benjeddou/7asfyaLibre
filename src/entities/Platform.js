/**
 * Platform
 * Static platform entity with Mario-style rendering
 */

import { Entity } from './Entity.js';

export class Platform extends Entity {
  constructor(x, y, width, height, isGround = false) {
    super(x, y, width, height);
    this.isGround = isGround; // True for ground platforms, false for floating platforms
  }

  update(deltaTime) {
    // Platforms don't move
  }

  render(ctx) {
    if (this.isGround) {
      // Render ground with grass on top
      this.renderGround(ctx);
    } else {
      // Render brick platform
      this.renderBrick(ctx);
    }
  }

  renderGround(ctx) {
    // Super Mario Bros. ground colors
    const groundColor = '#A85800'; // Orange-brown
    const grassColor = '#50D010'; // Green
    const darkBrown = '#783C08'; // Darker brown for mortar
    const highlightColor = '#C87820'; // Lighter brown for highlights
    const shadowColor = '#604010'; // Darker for shadows
    
    const brickWidth = 16;
    const brickHeight = 16;
    
    // Draw ground base
    ctx.fillStyle = groundColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw individual bricks with Super Mario pattern
    for (let by = 0; by < this.height; by += brickHeight) {
      for (let bx = 0; bx < this.width; bx += brickWidth) {
        const brickX = this.x + bx;
        const brickY = this.y + by;
        const row = Math.floor(by / brickHeight);
        const col = Math.floor(bx / brickWidth);
        
        // Offset pattern (every other row is offset)
        const offset = row % 2 === 0 ? 0 : brickWidth / 2;
        const actualX = brickX + offset;
        
        // Skip if offset goes outside bounds
        if (actualX >= this.x + this.width) continue;
        
        // Draw brick base
        ctx.fillStyle = groundColor;
        ctx.fillRect(actualX, brickY, brickWidth, brickHeight);
        
        // Draw highlight (top-left corner)
        ctx.fillStyle = highlightColor;
        ctx.fillRect(actualX, brickY, 4, 4);
        ctx.fillRect(actualX, brickY + 4, 2, 2);
        ctx.fillRect(actualX + 2, brickY + 4, 2, 2);
        
        // Draw shadow (bottom-right)
        ctx.fillStyle = shadowColor;
        ctx.fillRect(actualX + brickWidth - 4, brickY + brickHeight - 4, 4, 4);
        ctx.fillRect(actualX + brickWidth - 2, brickY + brickHeight - 6, 2, 2);
        
        // Draw mortar lines
        ctx.strokeStyle = darkBrown;
        ctx.lineWidth = 1;
        // Right edge
        ctx.beginPath();
        ctx.moveTo(actualX + brickWidth, brickY);
        ctx.lineTo(actualX + brickWidth, brickY + brickHeight);
        ctx.stroke();
        // Bottom edge
        ctx.beginPath();
        ctx.moveTo(actualX, brickY + brickHeight);
        ctx.lineTo(actualX + brickWidth, brickY + brickHeight);
        ctx.stroke();
      }
    }
    
    // Draw grass top (Super Mario style - 4 pixels with pattern)
    const grassHeight = 4;
    ctx.fillStyle = grassColor;
    ctx.fillRect(this.x, this.y, this.width, grassHeight);
    
    // Grass pattern (small bumps)
    ctx.fillStyle = '#40B010'; // Slightly darker green
    for (let gx = 0; gx < this.width; gx += 8) {
      // Small grass bumps
      ctx.fillRect(this.x + gx, this.y, 2, 2);
      ctx.fillRect(this.x + gx + 4, this.y + 1, 2, 2);
    }
    
    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  renderBrick(ctx) {
    // Super Mario Bros. brick colors
    const brickColor = '#A85800'; // Orange-brown
    const darkBrown = '#783C08'; // Darker brown for mortar
    const highlightColor = '#C87820'; // Lighter brown for highlights
    const shadowColor = '#604010'; // Darker for shadows
    
    const brickWidth = 16;
    const brickHeight = 16;
    
    // Draw brick base
    ctx.fillStyle = brickColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw individual bricks with Super Mario pattern
    for (let by = 0; by < this.height; by += brickHeight) {
      for (let bx = 0; bx < this.width; bx += brickWidth) {
        const brickX = this.x + bx;
        const brickY = this.y + by;
        const row = Math.floor(by / brickHeight);
        const col = Math.floor(bx / brickWidth);
        
        // Offset pattern (every other row is offset)
        const offset = row % 2 === 0 ? 0 : brickWidth / 2;
        const actualX = brickX + offset;
        
        // Skip if offset goes outside bounds
        if (actualX >= this.x + this.width) continue;
        
        // Draw brick base
        ctx.fillStyle = brickColor;
        ctx.fillRect(actualX, brickY, brickWidth, brickHeight);
        
        // Draw highlight (top-left corner) - 3D effect
        ctx.fillStyle = highlightColor;
        ctx.fillRect(actualX, brickY, 4, 4);
        ctx.fillRect(actualX, brickY + 4, 2, 2);
        ctx.fillRect(actualX + 2, brickY + 4, 2, 2);
        ctx.fillRect(actualX, brickY + 6, 1, 1);
        
        // Draw shadow (bottom-right) - 3D effect
        ctx.fillStyle = shadowColor;
        ctx.fillRect(actualX + brickWidth - 4, brickY + brickHeight - 4, 4, 4);
        ctx.fillRect(actualX + brickWidth - 2, brickY + brickHeight - 6, 2, 2);
        ctx.fillRect(actualX + brickWidth - 1, brickY + brickHeight - 8, 1, 1);
        
        // Draw mortar lines
        ctx.strokeStyle = darkBrown;
        ctx.lineWidth = 1;
        // Right edge
        ctx.beginPath();
        ctx.moveTo(actualX + brickWidth, brickY);
        ctx.lineTo(actualX + brickWidth, brickY + brickHeight);
        ctx.stroke();
        // Bottom edge
        ctx.beginPath();
        ctx.moveTo(actualX, brickY + brickHeight);
        ctx.lineTo(actualX + brickWidth, brickY + brickHeight);
        ctx.stroke();
      }
    }
    
    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

