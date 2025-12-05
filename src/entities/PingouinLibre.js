/**
 * Livre de Compétence (Competence Book)
 * Represents digital literacy and knowledge sharing (Inclusion)
 * Effect: +10 Points / +5 Compétence
 */

import { Entity } from './Entity.js';

export class PingouinLibre extends Entity {
  constructor(x, y) {
    super(x, y, 24, 24);
    this.type = 'livre'; // Item type for story progression
    this.collected = false;
    this.bobOffset = 0;
    this.bobSpeed = 0.15;
    this.points = 10;
  }

  update(deltaTime) {
    // Slight up/down movement to attract attention (no rotation)
    this.bobOffset += this.bobSpeed;
    this.y += Math.sin(this.bobOffset) * 0.3;
  }

  collect() {
    this.collected = true;
    return {
      points: this.points,
      competence: 5  // Points de Compétence (Inclusion)
    };
  }

  render(ctx) {
    if (this.collected) return;

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    // Book representing knowledge and competence (Inclusion)
    // Book cover (blue - digital/inclusion theme)
    ctx.fillStyle = '#4040C8'; // Blue
    ctx.fillRect(this.x + 4, this.y + 2, 16, 20);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + 4, this.y + 2, 16, 20);

    // Book pages (white)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x + 6, this.y + 4, 12, 16);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x + 6, this.y + 4, 12, 16);

    // Book spine (darker blue)
    ctx.fillStyle = '#202080';
    ctx.fillRect(this.x + 4, this.y + 2, 3, 20);
    ctx.strokeRect(this.x + 4, this.y + 2, 3, 20);

    // Text lines on pages (representing knowledge)
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x + 8, this.y + 7, 8, 1);
    ctx.fillRect(this.x + 8, this.y + 10, 6, 1);
    ctx.fillRect(this.x + 8, this.y + 13, 7, 1);
    ctx.fillRect(this.x + 8, this.y + 16, 5, 1);

    // NIRD badge on cover (small)
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(this.x + 10, this.y + 5, 4, 4);
    ctx.strokeRect(this.x + 10, this.y + 5, 4, 4);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 3px Arial';
    ctx.fillText('N', this.x + 11, this.y + 8);
  }
}

