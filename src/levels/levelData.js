/**
 * Level Data
 * Level definitions for the platformer game
 */

export const level1 = {
  id: 'level1',
  width: 5000,
  height: 600,
  playerStart: { x: 100, y: 400 },
  goal: { x: 4900, y: 550 }, // Portal on ground level
  platforms: [
    // Ground - extended to full level width
    { x: 0, y: 550, width: 5000, height: 50 },
    // Floating platforms - first section
    { x: 400, y: 450, width: 200, height: 20 },
    { x: 700, y: 350, width: 200, height: 20 },
    { x: 1000, y: 400, width: 150, height: 20 },
    { x: 1300, y: 300, width: 200, height: 20 },
    { x: 1600, y: 350, width: 200, height: 20 },
    // Second section
    { x: 2000, y: 450, width: 200, height: 20 },
    { x: 2300, y: 350, width: 200, height: 20 },
    { x: 2600, y: 400, width: 150, height: 20 },
    { x: 2900, y: 300, width: 200, height: 20 },
    { x: 3200, y: 350, width: 200, height: 20 },
    // Third section
    { x: 3600, y: 450, width: 200, height: 20 },
    { x: 3900, y: 350, width: 200, height: 20 },
    { x: 4200, y: 400, width: 150, height: 20 },
    { x: 4500, y: 300, width: 200, height: 20 },
    { x: 4800, y: 350, width: 200, height: 20 },
  ],
  collectibles: [
    // Livre de Compétence (introduced by NPC 1 at x: 600) - appear ahead (x > 600)
    { type: 'livre', x: 800, y: 300 },
    { type: 'livre', x: 950, y: 400 },
    { type: 'livre', x: 1200, y: 250 },
    { type: 'livre', x: 1400, y: 300 },
    // Ordinateur Reconditionné (introduced by NPC 2 at x: 1500) - appear ahead (x > 1500)
    { type: 'ordinateur', x: 1700, y: 350 },
    { type: 'ordinateur', x: 2000, y: 400 },
    { type: 'ordinateur', x: 2300, y: 300 },
    { type: 'ordinateur', x: 2600, y: 350 },
    // Badge d'Autonomie (introduced by NPC 3 at x: 2800) - appear ahead (x > 2800)
    { type: 'badge', x: 3000, y: 250 },
    { type: 'badge', x: 3300, y: 300 },
    { type: 'badge', x: 3600, y: 200 },
    { type: 'badge', x: 3700, y: 350 },
  ],
  nirdBlocks: [
    // Interactive NIRD blocks (introduced by NPC 4 at x: 3800) - appear ahead (x > 3800)
    // These blocks spawn collectibles when hit
    { x: 4000, y: 420, width: 32, height: 32, collectibleType: 'livre' },
    { x: 4200, y: 320, width: 32, height: 32, collectibleType: 'ordinateur' },
    { x: 4400, y: 370, width: 32, height: 32, collectibleType: 'badge' },
    { x: 4600, y: 270, width: 32, height: 32, collectibleType: 'livre' },
    { x: 4800, y: 330, width: 32, height: 32, collectibleType: 'ordinateur' },
  ],
  // Fixed NPC characters with conversations - placed in areas without enemies
  npcs: [
    {
      id: 'npc1',
      x: 600,
      y: 550, // Ground level (will be adjusted to stand on ground)
      scenarioId: 'obsolescence-windows10',
    },
    {
      id: 'npc2',
      x: 1500,
      y: 550, // Ground level
      scenarioId: 'formation-logiciels-libres',
    },
    {
      id: 'npc3',
      x: 2800,
      y: 550, // Ground level
      scenarioId: 'logiciel-proprietaire',
    },
    {
      id: 'npc4',
      x: 3800,
      y: 550, // Ground level
      scenarioId: 'atelier-reparation',
    },
    {
      id: 'npc5',
      x: 4500,
      y: 550, // Ground level
      scenarioId: 'serveur-local',
    },
  ],
};

export const level2 = {
  id: 'level2',
  width: 6000,
  height: 600,
  playerStart: { x: 100, y: 400 },
  goal: { x: 5900, y: 550 }, // Portal on ground level
  platforms: [
    // Ground - extended to full level width
    { x: 0, y: 550, width: 6000, height: 50 },
    // Floating platforms - server room layout
    { x: 500, y: 450, width: 200, height: 20 },
    { x: 800, y: 350, width: 200, height: 20 },
    { x: 1100, y: 400, width: 150, height: 20 },
    { x: 1400, y: 300, width: 200, height: 20 },
    { x: 1700, y: 350, width: 200, height: 20 },
    // Second section
    { x: 2100, y: 450, width: 200, height: 20 },
    { x: 2400, y: 350, width: 200, height: 20 },
    { x: 2700, y: 400, width: 150, height: 20 },
    { x: 3000, y: 300, width: 200, height: 20 },
    { x: 3300, y: 350, width: 200, height: 20 },
    // Third section
    { x: 3700, y: 450, width: 200, height: 20 },
    { x: 4000, y: 350, width: 200, height: 20 },
    { x: 4300, y: 400, width: 150, height: 20 },
    { x: 4600, y: 300, width: 200, height: 20 },
    { x: 4900, y: 350, width: 200, height: 20 },
    // Fourth section
    { x: 5300, y: 450, width: 200, height: 20 },
    { x: 5600, y: 350, width: 200, height: 20 },
  ],
  collectibles: [
    // Serveur Local (introduced by NPC 1 at x: 800) - appear ahead (x > 800)
    { type: 'serveur', x: 1000, y: 300 },
    { type: 'serveur', x: 1200, y: 250 },
    { type: 'serveur', x: 1500, y: 350 },
    { type: 'serveur', x: 1800, y: 300 },
    // Can also include items from level 1 (already unlocked)
    { type: 'livre', x: 2200, y: 350 },
    { type: 'ordinateur', x: 2500, y: 300 },
    { type: 'badge', x: 3100, y: 250 },
    { type: 'serveur', x: 3500, y: 300 },
    { type: 'livre', x: 3800, y: 350 },
    { type: 'ordinateur', x: 4100, y: 300 },
    { type: 'serveur', x: 4400, y: 250 },
    { type: 'badge', x: 4700, y: 300 },
    { type: 'serveur', x: 5000, y: 350 },
    { type: 'serveur', x: 5400, y: 300 },
    { type: 'badge', x: 5700, y: 250 },
  ],
  nirdBlocks: [
    // Interactive NIRD blocks with serveur type
    { x: 1600, y: 420, width: 32, height: 32, collectibleType: 'serveur' },
    { x: 1900, y: 320, width: 32, height: 32, collectibleType: 'livre' },
    { x: 2600, y: 370, width: 32, height: 32, collectibleType: 'serveur' },
    { x: 3200, y: 270, width: 32, height: 32, collectibleType: 'badge' },
    { x: 3900, y: 330, width: 32, height: 32, collectibleType: 'serveur' },
    { x: 4500, y: 270, width: 32, height: 32, collectibleType: 'ordinateur' },
    { x: 5100, y: 330, width: 32, height: 32, collectibleType: 'serveur' },
    { x: 5500, y: 270, width: 32, height: 32, collectibleType: 'badge' },
  ],
  // Fixed NPC characters with conversations for level 2
  npcs: [
    {
      id: 'npc2-1',
      x: 800,
      y: 550, // Ground level
      scenarioId: 'serveur-souverainete',
    },
    {
      id: 'npc2-2',
      x: 2000,
      y: 550, // Ground level
      scenarioId: 'technicien-reseau',
    },
    {
      id: 'npc2-3',
      x: 3400,
      y: 550, // Ground level
      scenarioId: 'protection-donnees',
    },
    {
      id: 'npc2-4',
      x: 4200,
      y: 550, // Ground level
      scenarioId: 'logiciel-libre-avance',
    },
    {
      id: 'npc2-5',
      x: 5200,
      y: 550, // Ground level
      scenarioId: 'infrastructure-autonome',
    },
    {
      id: 'npc2-6',
      x: 5800,
      y: 550, // Ground level
      scenarioId: 'final-nird',
    },
  ],
};

