/**
 * LibreOffice
 * Represents open-source office suite (Inclusion - Compétence)
 * Effect: +45 Points / +10 Compétence / +6 Licences Libres
 */

import { Entity } from './Entity.js';

export class LibreOffice extends Entity {
  constructor(x, y) {
    super(x, y, 32, 32);
    this.type = 'libreoffice'; // Item type for story progression
    this.collected = false;
    this.bobOffset = 0;
    this.bobSpeed = 0.1;
    this.points = 45;
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
      competence: 10,  // Points de Compétence (Inclusion - learning office tools)
      licencesLibres: 6  // Licences Libres (Responsabilité - free office suite)
    };
  }

  render(ctx) {
    if (this.collected) return;

    // LibreOffice document representation (pixel art)
    // Document background (white/cream)
    ctx.fillStyle = '#F5F5DC';
    ctx.fillRect(this.x + 4, this.y + 4, 24, 24);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + 4, this.y + 4, 24, 24);

    // Document lines (text lines)
    ctx.fillStyle = '#000000';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(this.x + 8, this.y + 8 + i * 4, 16, 1);
    }

    // LibreOffice logo (simplified - blue circle with document)
    ctx.fillStyle = '#18A303'; // LibreOffice green
    ctx.beginPath();
    ctx.arc(this.x + 16, this.y + 12, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Document icon (top left corner)
    ctx.fillStyle = '#0066CC';
    ctx.fillRect(this.x + 6, this.y + 6, 6, 6);
    ctx.strokeRect(this.x + 6, this.y + 6, 6, 6);

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

