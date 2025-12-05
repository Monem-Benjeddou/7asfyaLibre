/**
 * Ordinateur Reconditionné (Reconditioned Computer)
 * Represents hardware reuse and sustainability (Durabilité)
 * Effect: +50 Points / +3 Réemploi
 */

import { Entity } from './Entity.js';

export class KitReconditionnement extends Entity {
  constructor(x, y) {
    super(x, y, 28, 24);
    this.type = 'ordinateur'; // Item type for story progression
    this.collected = false;
    this.bobOffset = 0;
    this.bobSpeed = 0.12;
    this.points = 50;
  }

  update(deltaTime) {
    // Slight up/down movement (no rotation)
    this.bobOffset += this.bobSpeed;
    this.y += Math.sin(this.bobOffset) * 0.25;
  }

  collect() {
    this.collected = true;
    return {
      points: this.points,
      reemploi: 3  // Pièces de Réemploi (Durabilité)
    };
  }

  render(ctx) {
    if (this.collected) return;

    // Reconditioned computer/laptop (Durabilité theme)
    // Monitor/screen (gray)
    ctx.fillStyle = '#808080';
    ctx.fillRect(this.x + 2, this.y + 2, 24, 16);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + 2, this.y + 2, 24, 16);

    // Screen (dark blue - Linux desktop)
    ctx.fillStyle = '#0000A0';
    ctx.fillRect(this.x + 4, this.y + 4, 20, 12);
    ctx.strokeRect(this.x + 4, this.y + 4, 20, 12);

    // Screen content (terminal window)
    ctx.fillStyle = '#00FF00'; // Green terminal text
    ctx.fillRect(this.x + 6, this.y + 6, 8, 1);
    ctx.fillRect(this.x + 6, this.y + 8, 6, 1);
    ctx.fillRect(this.x + 6, this.y + 10, 10, 1);

    // Recycle symbol on screen (green)
    ctx.fillStyle = '#50D010';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    // Circular arrow
    ctx.beginPath();
    ctx.arc(this.x + 18, this.y + 12, 4, 0, Math.PI * 2);
    ctx.stroke();
    // Arrow inside
    ctx.beginPath();
    ctx.moveTo(this.x + 18, this.y + 8);
    ctx.lineTo(this.x + 16, this.y + 10);
    ctx.lineTo(this.x + 20, this.y + 10);
    ctx.lineTo(this.x + 18, this.y + 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Base/stand (brown - wooden)
    ctx.fillStyle = '#783C08';
    ctx.fillRect(this.x + 6, this.y + 18, 16, 4);
    ctx.strokeRect(this.x + 6, this.y + 18, 16, 4);
  }
}

