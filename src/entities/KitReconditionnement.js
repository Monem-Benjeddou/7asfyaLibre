/**
 * Kit de Reconditionnement
 * Power-up item representing hardware reuse and reconditioning
 * Effect: +50 Points / +1 School Budget Level (cost reduction)
 * Power-up: Temporary speed or jump bonus
 */

import { Entity } from './Entity.js';

export class KitReconditionnement extends Entity {
  constructor(x, y) {
    super(x, y, 22, 22);
    this.collected = false;
    this.rotation = 0;
    this.points = 50;
    this.budgetBonus = 1;
    this.powerUpType = 'speed'; // 'speed' or 'jump'
    this.powerUpDuration = 5000; // 5 seconds
  }

  update(deltaTime) {
    // Rotate for visual effect
    this.rotation += 0.1;
  }

  collect() {
    this.collected = true;
    return {
      points: this.points,
      budget: this.budgetBonus,
      powerUp: {
        type: this.powerUpType,
        duration: this.powerUpDuration
      }
    };
  }

  render(ctx) {
    if (this.collected) return;

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);

    // Toolbox (brown box)
    ctx.fillStyle = '#A07840';
    ctx.fillRect(-11, -8, 22, 16);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(-11, -8, 22, 16);

    // Toolbox lid
    ctx.fillStyle = '#986830';
    ctx.fillRect(-11, -8, 22, 4);
    ctx.strokeRect(-11, -8, 22, 4);

    // Recycle arrow (green)
    ctx.fillStyle = '#50D010';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    
    // Arrow shape
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.lineTo(-4, 0);
    ctx.lineTo(-2, 0);
    ctx.lineTo(-2, 4);
    ctx.lineTo(2, 4);
    ctx.lineTo(2, 0);
    ctx.lineTo(4, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}

