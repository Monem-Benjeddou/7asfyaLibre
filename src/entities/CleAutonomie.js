/**
 * Badge d'Autonomie Numérique (Digital Autonomy Badge)
 * Represents digital independence and free licenses (Responsabilité)
 * Effect: +100 Points / +10 Licences Libres / +1 Life
 */

import { Entity } from './Entity.js';

export class CleAutonomie extends Entity {
  constructor(x, y) {
    super(x, y, 24, 24);
    this.type = 'badge'; // Item type for story progression
    this.collected = false;
    this.glowPulse = 0;
    this.bobOffset = 0;
    this.bobSpeed = 0.1;
    this.points = 100;
    this.lifeBonus = 1;
  }

  update(deltaTime) {
    // Pulse glow effect and slight bob (no rotation)
    this.glowPulse += 0.15;
    this.bobOffset += this.bobSpeed;
    this.y += Math.sin(this.bobOffset) * 0.2;
  }

  collect() {
    this.collected = true;
    return {
      points: this.points,
      licencesLibres: 10,  // Licences Libres / Budget (Responsabilité)
      life: this.lifeBonus
    };
  }

  render(ctx) {
    if (this.collected) return;

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const glowSize = 1 + Math.sin(this.glowPulse) * 0.2;

    // Glow effect (orange - responsibility theme)
    const glowAlpha = 0.2 + Math.sin(this.glowPulse) * 0.15;
    ctx.fillStyle = `rgba(255, 165, 0, ${glowAlpha})`;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 14 * glowSize, 0, Math.PI * 2);
    ctx.fill();

    // Badge/medal (circular, orange/gold - responsibility)
    ctx.fillStyle = '#E08040'; // Orange
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner circle (gold)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // NIRD symbol in center (shield with N)
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', centerX, centerY);

    // Ribbon at bottom (orange)
    ctx.fillStyle = '#E08040';
    ctx.fillRect(this.x + 8, this.y + 18, 8, 4);
    ctx.strokeRect(this.x + 8, this.y + 18, 8, 4);
    // Ribbon ends
    ctx.beginPath();
    ctx.moveTo(this.x + 8, this.y + 18);
    ctx.lineTo(this.x + 6, this.y + 20);
    ctx.lineTo(this.x + 8, this.y + 22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x + 16, this.y + 18);
    ctx.lineTo(this.x + 18, this.y + 20);
    ctx.lineTo(this.x + 16, this.y + 22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }
}

