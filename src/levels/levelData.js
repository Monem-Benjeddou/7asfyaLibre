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
    // Virus de l'Obsolescence (basic enemy)
    { type: 'virus', x: 500, y: 430, patrolLeft: 450, patrolRight: 550 },
    { type: 'virus', x: 1100, y: 380, patrolLeft: 1050, patrolRight: 1150 },
    // Verrou Logiciel (flying enemy)
    { type: 'verrou', x: 800, y: 320, patrolLeft: 750, patrolRight: 850, isFlying: true },
    // Nuage Hors-Zone (static/vertical enemy)
    { type: 'nuage', x: 1400, y: 280, verticalRange: 30 },
  ],
  collectibles: [
    // Pingouin Libre (main collectible)
    { type: 'pingouin', x: 300, y: 300 },
    { type: 'pingouin', x: 450, y: 400 },
    { type: 'pingouin', x: 750, y: 300 },
    // Kit de Reconditionnement (power-up)
    { type: 'kit', x: 1050, y: 350 },
    // Clé de l'Autonomie (rare/secret)
    { type: 'cle', x: 1350, y: 250 },
    { type: 'pingouin', x: 1650, y: 300 },
  ],
  nirdBlocks: [
    // Interactive NIRD blocks that spawn collectibles when hit
    { x: 350, y: 420, width: 32, height: 32, collectibleType: 'pingouin' },
    { x: 600, y: 320, width: 32, height: 32, collectibleType: 'kit' },
    { x: 950, y: 370, width: 32, height: 32, collectibleType: 'pingouin' },
    { x: 1250, y: 270, width: 32, height: 32, collectibleType: 'cle' },
  ],
};

