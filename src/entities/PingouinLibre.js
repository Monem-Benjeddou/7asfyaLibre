/**
 * Pingouin Libre (Tux Penguin)
 * Main scoring item representing free software promotion (Linux, Open Source)
 * Effect: +10 Points / +1 Student Happiness Level
 */

import { Entity } from './Entity.js';

export class PingouinLibre extends Entity {
  constructor(x, y) {
    super(x, y, 24, 24);
    this.collected = false;
    this.bobOffset = 0;
    this.bobSpeed = 0.15;
    this.points = 10;
    this.happinessBonus = 1;
  }

  update(deltaTime) {
    // Slight up/down movement to attract attention
    this.bobOffset += this.bobSpeed;
    this.y += Math.sin(this.bobOffset) * 0.3;
  }

  collect() {
    this.collected = true;
    return {
      points: this.points,
      happiness: this.happinessBonus
    };
  }

  render(ctx) {
    if (this.collected) return;

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    // Tux penguin - green and white
    // Body (white belly)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 2, 10, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Body (green back)
    ctx.fillStyle = '#50D010';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 10, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Head (white)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 8, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(centerX - 4, centerY - 10, 2, 2);
    ctx.fillRect(centerX + 2, centerY - 10, 2, 2);

    // Beak (orange/yellow)
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 6);
    ctx.lineTo(centerX - 2, centerY - 4);
    ctx.lineTo(centerX + 2, centerY - 4);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    // Feet
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(centerX - 6, centerY + 10, 4, 3);
    ctx.fillRect(centerX + 2, centerY + 10, 4, 3);
    ctx.strokeRect(centerX - 6, centerY + 10, 4, 3);
    ctx.strokeRect(centerX + 2, centerY + 10, 4, 3);
  }
}

