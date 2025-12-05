/**
 * Serveur Local (Local Server)
 * Represents data sovereignty and local infrastructure (Responsabilité)
 * Effect: +50 Points / +5 Compétence / +10 Licences Libres
 */

import { Entity } from './Entity.js';

export class ServeurLocal extends Entity {
  constructor(x, y) {
    super(x, y, 32, 32);
    this.type = 'serveur'; // Item type for story progression
    this.collected = false;
    this.bobOffset = 0;
    this.bobSpeed = 0.1;
    this.points = 50;
    this.ledPulse = 0;
  }

  update(deltaTime) {
    // Slight up/down movement (no rotation)
    this.bobOffset += this.bobSpeed;
    this.y += Math.sin(this.bobOffset) * 0.2;
    // LED pulse animation
    this.ledPulse += 0.2;
  }

  collect() {
    this.collected = true;
    return {
      points: this.points,
      competence: 5,  // Points de Compétence
      licencesLibres: 10  // Licences Libres (Responsabilité - data sovereignty)
    };
  }

  render(ctx) {
    if (this.collected) return;

    // Server rack representation (Responsabilité theme - data sovereignty)
    // Server rack frame (dark gray/black)
    ctx.fillStyle = '#181818';
    ctx.fillRect(this.x + 2, this.y + 2, 28, 28);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + 2, this.y + 2, 28, 28);

    // Server unit sections (3 horizontal sections)
    const sectionHeight = 8;
    for (let i = 0; i < 3; i++) {
      const sectionY = this.y + 4 + i * (sectionHeight + 1);
      
      // Server unit (dark gray)
      ctx.fillStyle = '#404040';
      ctx.fillRect(this.x + 4, sectionY, 24, sectionHeight);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(this.x + 4, sectionY, 24, sectionHeight);

      // Green LED indicators (pulsing)
      const ledAlpha = 0.5 + Math.sin(this.ledPulse + i) * 0.5;
      ctx.fillStyle = `rgba(0, 255, 0, ${ledAlpha})`;
      ctx.beginPath();
      ctx.arc(this.x + 8, sectionY + sectionHeight / 2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x + 14, sectionY + sectionHeight / 2, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Network ports/cables (yellow)
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(this.x + 20, this.y + 6, 2, 4);
    ctx.fillRect(this.x + 20, this.y + 14, 2, 4);
    ctx.fillRect(this.x + 20, this.y + 22, 2, 4);

    // NIRD badge on top (small)
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(this.x + 12, this.y + 2, 8, 4);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x + 12, this.y + 2, 8, 4);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 4px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('NIRD', this.x + 16, this.y + 5);
    ctx.textAlign = 'left';
  }
}

