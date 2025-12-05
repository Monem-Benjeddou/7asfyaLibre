/**
 * Nextcloud
 * Represents self-hosted cloud storage (Responsabilité - data sovereignty)
 * Effect: +50 Points / +6 Compétence / +12 Licences Libres
 */

import { Entity } from './Entity.js';

export class Nextcloud extends Entity {
  constructor(x, y) {
    super(x, y, 32, 32);
    this.type = 'nextcloud'; // Item type for story progression
    this.collected = false;
    this.bobOffset = 0;
    this.bobSpeed = 0.1;
    this.points = 50;
  }

  update(deltaTime) {
    // Slight up/down movement
    this.bobOffset += this.bobSpeed;
    this.y += Math.sin(this.bobOffset) * 0.2;
  }

  collect() {
    this.collected = true;
    return {
      points: this.points,
      competence: 6,  // Points de Compétence
      licencesLibres: 12  // Licences Libres (Responsabilité - data sovereignty)
    };
  }

  render(ctx) {
    if (this.collected) return;

    // Nextcloud cloud representation (pixel art)
    // Cloud shape (white/light blue)
    ctx.fillStyle = '#0082C9'; // Nextcloud blue
    ctx.beginPath();
    ctx.arc(this.x + 12, this.y + 16, 6, 0, Math.PI * 2);
    ctx.arc(this.x + 18, this.y + 16, 6, 0, Math.PI * 2);
    ctx.arc(this.x + 15, this.y + 12, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Cloud outline
    ctx.strokeStyle = '#0066AA';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x + 12, this.y + 16, 6, 0, Math.PI * 2);
    ctx.arc(this.x + 18, this.y + 16, 6, 0, Math.PI * 2);
    ctx.arc(this.x + 15, this.y + 12, 5, 0, Math.PI * 2);
    ctx.stroke();

    // Files/folders inside cloud (white)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x + 13, this.y + 14, 4, 4);
    ctx.fillRect(this.x + 16, this.y + 16, 4, 4);

    // NIRD badge (small, top right)
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(this.x + 22, this.y + 2, 8, 4);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x + 22, this.y + 2, 8, 4);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 4px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('NIRD', this.x + 26, this.y + 5);
    ctx.textAlign = 'left';
  }
}

