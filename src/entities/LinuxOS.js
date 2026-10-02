/**
 * Linux OS (Operating System)
 * Represents open-source operating system (Inclusion - Compétence)
 * Effect: +40 Points / +8 Compétence / +5 Licences Libres
 */

import { Entity } from './Entity.js';

export class LinuxOS extends Entity {
  constructor(x, y) {
    super(x, y, 32, 32);
    this.type = 'linux'; // Item type for story progression
    this.collected = false;
    this.bobOffset = 0;
    this.bobSpeed = 0.1;
    this.points = 40;
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
      competence: 8,  // Points de Compétence (Inclusion - learning open-source OS)
      licencesLibres: 5  // Licences Libres (Responsabilité - free software)
    };
  }

  render(ctx) {
    if (this.collected) return;

    // Linux penguin/Tux representation (simplified pixel art)
    // Body (white/light gray)
    ctx.fillStyle = '#E0E0E0';
    ctx.beginPath();
    ctx.arc(this.x + 16, this.y + 20, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Head (white)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x + 16, this.y + 10, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Eyes (black)
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x + 13, this.y + 8, 2, 2);
    ctx.fillRect(this.x + 17, this.y + 8, 2, 2);

    // Beak (orange/yellow)
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(this.x + 16, this.y + 11);
    ctx.lineTo(this.x + 14, this.y + 14);
    ctx.lineTo(this.x + 18, this.y + 14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Feet (orange)
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(this.x + 12, this.y + 28, 4, 3);
    ctx.fillRect(this.x + 16, this.y + 28, 4, 3);

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

