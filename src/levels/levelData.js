/**
 * Level Data
 * Level definitions for the platformer game
 */

export const level1 = {
  width: 2000,
  height: 600,
  playerStart: { x: 100, y: 400 },
  goal: { x: 1900, y: 400 },
  platforms: [
    // Ground
    { x: 0, y: 550, width: 2000, height: 50 },
    // Floating platforms
    { x: 400, y: 450, width: 200, height: 20 },
    { x: 700, y: 350, width: 200, height: 20 },
    { x: 1000, y: 400, width: 150, height: 20 },
    { x: 1300, y: 300, width: 200, height: 20 },
    { x: 1600, y: 350, width: 200, height: 20 },
  ],
  enemies: [
    { x: 500, y: 430, patrolLeft: 450, patrolRight: 550 },
    { x: 1100, y: 380, patrolLeft: 1050, patrolRight: 1150 },
    { x: 1400, y: 280, patrolLeft: 1350, patrolRight: 1450 },
  ],
  collectibles: [
    { x: 300, y: 300 },
    { x: 450, y: 400 },
    { x: 750, y: 300 },
    { x: 1050, y: 350 },
    { x: 1350, y: 250 },
    { x: 1650, y: 300 },
  ],
};

