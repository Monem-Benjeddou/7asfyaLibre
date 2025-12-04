/**
 * Collision
 * Collision detection utilities (AABB)
 */

export class Collision {
  /**
   * Check if two rectangles overlap (AABB collision)
   */
  static checkAABB(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  /**
   * Check collision between entity and platform
   * Returns collision info or null
   */
  static checkPlatformCollision(entity, platform) {
    const entityBounds = entity.getBounds();
    const platformBounds = platform.getBounds();

    if (!Collision.checkAABB(entityBounds, platformBounds)) {
      return null;
    }

    // Check if entity is falling and hitting platform from top
    const prevY = entity.y - entity.vy;
    const wasAbove = prevY + entity.height <= platformBounds.top;

    if (wasAbove && entity.vy >= 0) {
      // Landing on top of platform
      return {
        type: 'top',
        platform: platform,
        adjustY: platformBounds.top - entity.height,
      };
    }

    // Side collision
    if (entity.vx > 0 && entityBounds.right > platformBounds.left && entityBounds.left < platformBounds.left) {
      return {
        type: 'right',
        platform: platform,
        adjustX: platformBounds.left - entity.width,
      };
    }

    if (entity.vx < 0 && entityBounds.left < platformBounds.right && entityBounds.right > platformBounds.right) {
      return {
        type: 'left',
        platform: platform,
        adjustX: platformBounds.right,
      };
    }

    return null;
  }

  /**
   * Check collision between two entities
   */
  static checkEntityCollision(entity1, entity2) {
    const bounds1 = entity1.getBounds();
    const bounds2 = entity2.getBounds();
    return Collision.checkAABB(bounds1, bounds2);
  }
}

