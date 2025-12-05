/**
 * Nuage Hors-Zone
 * Static or vertical-moving enemy representing data storage outside EU
 * and proprietary cloud dependency
 * Professional design with smooth animations
 */

import { Entity } from './Entity.js';
import { Physics } from '../game/Physics.js';
import { Collision } from '../game/Collision.js';

export class NuageHorsZone extends Entity {
  constructor(x, y, verticalRange = 50) {
    super(x, y, 40, 30);
    this.verticalRange = verticalRange;
    this.startY = y;
    this.verticalSpeed = 0.3;
    this.direction = 1; // 1 = down, -1 = up
    this.defeated = false;
    this.pulse = 0; // For pulsing effect
    this.animationFrame = 0;
    
    // Design constants
    this.COLORS = {
      cloudMain: '#8040A0',      // Purple cloud
      cloudDark: '#602080',      // Darker purple
      cloudLight: '#A060C0',     // Lighter purple
      server: '#404040',         // Dark gray server
      serverLight: '#606060',    // Light gray server
      alert: '#FF0000',          // Red alert
      outline: '#000000'         // Black outline
    };
  }

  update(deltaTime, platforms) {
    if (this.defeated) return;

    // Update animations
    this.animationFrame += deltaTime * 0.005;
    this.pulse += 0.08;

    // Vertical movement (limited range)
    if (this.direction > 0) {
      this.vy = this.verticalSpeed;
      if (this.y >= this.startY + this.verticalRange) {
        this.direction = -1;
      }
    } else {
      this.vy = -this.verticalSpeed;
      if (this.y <= this.startY) {
        this.direction = 1;
      }
    }

    this.y += this.vy;
  }

  checkPlayerCollision(player) {
    if (this.defeated) return null;

    const playerBounds = player.getBounds();
    const enemyBounds = this.getBounds();

    if (!Collision.checkAABB(playerBounds, enemyBounds)) {
      return null;
    }

    // This enemy damages on contact (can't be defeated by jumping)
    return 'damage';
  }

  defeat() {
    this.defeated = true;
  }

  render(ctx) {
    if (this.defeated) return;

    const { COLORS } = this;
    const pulseSize = 1 + Math.sin(this.pulse) * 0.08;
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const baseRadius = this.width / 2.5;

    // Cloud shape with professional pixel art style
    // Main cloud body (darker purple base)
    ctx.fillStyle = COLORS.cloudDark;
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius * pulseSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Main cloud body (purple)
    ctx.fillStyle = COLORS.cloudMain;
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius * pulseSize * 0.9, 0, Math.PI * 2);
    ctx.fill();
    
    // Cloud highlight (lighter purple)
    ctx.fillStyle = COLORS.cloudLight;
    ctx.beginPath();
    ctx.arc(centerX - baseRadius * 0.3, centerY - baseRadius * 0.3, baseRadius * 0.4 * pulseSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Cloud bumps for fluffy effect
    const bumpRadius = baseRadius * 0.6 * pulseSize;
    
    // Left bump
    ctx.fillStyle = COLORS.cloudMain;
    ctx.beginPath();
    ctx.arc(centerX - baseRadius * 0.7, centerY, bumpRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Right bump
    ctx.beginPath();
    ctx.arc(centerX + baseRadius * 0.7, centerY, bumpRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Top bump
    ctx.beginPath();
    ctx.arc(centerX, centerY - baseRadius * 0.6, bumpRadius * 0.8, 0, Math.PI * 2);
    ctx.fill();
    
    // Bottom bump
    ctx.beginPath();
    ctx.arc(centerX, centerY + baseRadius * 0.5, bumpRadius * 0.7, 0, Math.PI * 2);
    ctx.fill();
    
    // Black outline for all cloud parts
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius * pulseSize * 0.9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - baseRadius * 0.7, centerY, bumpRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + baseRadius * 0.7, centerY, bumpRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY - baseRadius * 0.6, bumpRadius * 0.8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY + baseRadius * 0.5, bumpRadius * 0.7, 0, Math.PI * 2);
    ctx.stroke();

    // Server icon in center (more detailed)
    const serverWidth = 18;
    const serverHeight = 14;
    
    // Server shadow
    ctx.fillStyle = '#202020';
    ctx.fillRect(centerX - serverWidth / 2 + 1, centerY - serverHeight / 2 + 1, serverWidth, serverHeight);
    
    // Server body
    ctx.fillStyle = COLORS.server;
    ctx.fillRect(centerX - serverWidth / 2, centerY - serverHeight / 2, serverWidth, serverHeight);
    
    // Server highlight
    ctx.fillStyle = COLORS.serverLight;
    ctx.fillRect(centerX - serverWidth / 2, centerY - serverHeight / 2, serverWidth, 3);
    
    // Server outline
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - serverWidth / 2, centerY - serverHeight / 2, serverWidth, serverHeight);
    
    // Server rack lines (horizontal)
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - serverWidth / 2 + 2, centerY - 3);
    ctx.lineTo(centerX + serverWidth / 2 - 2, centerY - 3);
    ctx.moveTo(centerX - serverWidth / 2 + 2, centerY);
    ctx.lineTo(centerX + serverWidth / 2 - 2, centerY);
    ctx.moveTo(centerX - serverWidth / 2 + 2, centerY + 3);
    ctx.lineTo(centerX + serverWidth / 2 - 2, centerY + 3);
    ctx.stroke();
    
    // Server status lights
    const lightVisible = Math.floor(this.animationFrame * 4) % 2 === 0;
    ctx.fillStyle = lightVisible ? '#00FF00' : '#004000';
    ctx.fillRect(centerX - 6, centerY - serverHeight / 2 + 1, 2, 2);
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(centerX + 4, centerY - serverHeight / 2 + 1, 2, 2);

    // Barred X over server (alert)
    ctx.strokeStyle = COLORS.alert;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX - 12, centerY - 10);
    ctx.lineTo(centerX + 12, centerY + 10);
    ctx.moveTo(centerX + 12, centerY - 10);
    ctx.lineTo(centerX - 12, centerY + 10);
    ctx.stroke();
  }
}

