/**
 * Platform
 * Static platform entity
 */

import { Entity } from './Entity.js';

export class Platform extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.color = '#8B4513'; // Brown
  }

  update(deltaTime) {
    // Platforms don't move
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Add a simple border for depth
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

