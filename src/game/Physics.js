/**
 * Physics
 * Physics calculations for gravity and velocity
 */

export class Physics {
  static GRAVITY = 0.5;
  static FRICTION = 0.8;

  static applyGravity(entity) {
    if (!entity.onGround) {
      entity.vy += Physics.GRAVITY;
    }
  }

  static applyFriction(entity) {
    if (entity.onGround) {
      entity.vx *= Physics.FRICTION;
      // Stop very small velocities
      if (Math.abs(entity.vx) < 0.1) {
        entity.vx = 0;
      }
    }
  }

  static updateVelocity(entity, deltaTime) {
    // Velocity is already in pixels per frame, so no deltaTime scaling needed
    // But we can add it if needed for frame-rate independence
    entity.x += entity.vx;
    entity.y += entity.vy;
  }
}

