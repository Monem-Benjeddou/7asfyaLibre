/**
 * Camera
 * Camera system that follows the player
 */

export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  update(player, canvasWidth, canvasHeight) {
    if (!player) return;

    // Follow player horizontally, keep player centered
    const targetX = player.x - canvasWidth / 2 + player.width / 2;
    
    // Smooth camera movement (lerp)
    this.x += (targetX - this.x) * 0.1;

    // Keep camera within level bounds (if level has bounds)
    // For now, just prevent negative values
    if (this.x < 0) {
      this.x = 0;
    }

    // Vertical camera (optional - can follow player or stay fixed)
    // For platformer, usually we only follow horizontally
    this.y = 0;
  }

  reset() {
    this.x = 0;
    this.y = 0;
  }
}

