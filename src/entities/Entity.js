/**
 * Entity
 * Base class for all game entities
 */

export class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vx = 0; // velocity x
    this.vy = 0; // velocity y
    this.onGround = false;
  }

  update(deltaTime) {
    // Update position based on velocity
    this.x += this.vx;
    this.y += this.vy;
  }

  render(ctx) {
    // Base render - will be overridden by subclasses
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height,
    };
  }
}

