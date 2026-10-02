/**
 * Moodle
 * Represents open-source learning platform (Inclusion - Compétence)
 * Effect: +55 Points / +12 Compétence / +8 Licences Libres
 */

import { Entity } from './Entity.js';

export class Moodle extends Entity {
  constructor(x, y) {
    super(x, y, 32, 32);
    this.type = 'moodle'; // Item type for story progression
    this.collected = false;
    this.bobOffset = 0;
    this.bobSpeed = 0.1;
    this.points = 55;
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
      competence: 12,  // Points de Compétence (Inclusion - learning platform)
      licencesLibres: 8  // Licences Libres (Responsabilité - free education tools)
    };
  }

  render(ctx) {
    if (this.collected) return;

    // Moodle learning platform representation (pixel art)
    // Book/learning icon (orange/blue - Moodle colors)
    ctx.fillStyle = '#F98012'; // Moodle orange
    ctx.fillRect(this.x + 6, this.y + 6, 20, 20);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + 6, this.y + 6, 20, 20);

    // Book pages (white lines)
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(this.x + 8, this.y + 10 + i * 5, 16, 2);
    }

    // M letter (Moodle logo - simplified)
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('M', this.x + 16, this.y + 22);
    ctx.textAlign = 'left';

    // Learning elements (small dots - students)
    ctx.fillStyle = '#4A86E8'; // Moodle blue
    ctx.beginPath();
    ctx.arc(this.x + 10, this.y + 12, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x + 22, this.y + 12, 1, 0, Math.PI * 2);
    ctx.fill();

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

