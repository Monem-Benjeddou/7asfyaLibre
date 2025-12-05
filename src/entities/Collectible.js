/**
 * Collectible
 * Coin/item entity that can be collected
 */

import { Entity } from './Entity.js';

export class Collectible extends Entity {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = '#FFFF00'; // Yellow - 8-bit palette
    this.collected = false;
    this.rotation = 0;
    this.points = 10;
  }

  update(deltaTime) {
    // Rotate for visual effect
    this.rotation += 0.1;
  }

  collect() {
    this.collected = true;
    return this.points;
  }

  render(ctx) {
    if (this.collected) return;

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);

    // Draw coin as a circle - 8-bit yellow
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
    ctx.fill();

    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add shine effect
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-3, -3, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

