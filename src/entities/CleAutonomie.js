/**
 * Clé de l'Autonomie
 * Secret item / extra life representing digital autonomy and independence
 * Effect: +100 Points / +1 Life (Independence)
 */

import { Entity } from './Entity.js';

export class CleAutonomie extends Entity {
  constructor(x, y) {
    super(x, y, 20, 30);
    this.collected = false;
    this.rotation = 0;
    this.glowPulse = 0;
    this.points = 100;
    this.lifeBonus = 1;
  }

  update(deltaTime) {
    // Rotate and pulse for special effect
    this.rotation += 0.08;
    this.glowPulse += 0.2;
  }

  collect() {
    this.collected = true;
    return {
      points: this.points,
      life: this.lifeBonus
    };
  }

  render(ctx) {
    if (this.collected) return;

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const glowSize = 1 + Math.sin(this.glowPulse) * 0.3;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotation);

    // Glow effect (rainbow colors cycling)
    const glowColor = `hsl(${(this.glowPulse * 20) % 360}, 100%, 60%)`;
    ctx.fillStyle = glowColor;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(0, 0, 15 * glowSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Key body (golden)
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    // Key shaft
    ctx.fillRect(-3, -12, 6, 20);
    ctx.strokeRect(-3, -12, 6, 20);

    // Key head (circular)
    ctx.beginPath();
    ctx.arc(0, -12, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Key hole in head
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(0, -12, 3, 0, Math.PI * 2);
    ctx.fill();

    // Key teeth
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(-3, 8, 6, 4);
    ctx.strokeRect(-3, 8, 6, 4);
    ctx.fillRect(-1, 12, 2, 4);
    ctx.strokeRect(-1, 12, 2, 4);

    // Shield symbol on key
    ctx.fillStyle = '#0000C0';
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(-3, -4);
    ctx.lineTo(-3, 0);
    ctx.lineTo(0, 2);
    ctx.lineTo(3, 0);
    ctx.lineTo(3, -4);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    ctx.restore();
  }
}

