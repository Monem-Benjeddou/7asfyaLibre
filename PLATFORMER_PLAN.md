# 2D Platformer Game Plan - Super Mario Style

## Overview
Build an interactive 2D platformer game similar to Super Mario with player movement, enemies, platforms, collectibles, and multiple levels.

## Technology Stack
- **Canvas API** or **Phaser.js** (lightweight 2D game framework)
- **React** for UI wrapper
- **TypeScript/JavaScript** for game logic
- **Simple sprite system** (colored rectangles initially, can upgrade to images)

## Core Features

### 1. Game Engine Architecture
- Game loop with requestAnimationFrame
- Entity-Component system (Player, Enemy, Platform, Collectible)
- Physics system (gravity, collision detection)
- Camera system (follows player)
- Input handler (keyboard controls)

### 2. Player Character
- Movement: Left/Right arrow keys or A/D
- Jump: Spacebar or Up arrow
- Physics: Gravity, velocity, acceleration
- Collision detection with platforms
- Sprite animation (walking, jumping, idle)
- Lives system (3 lives)

### 3. Game World
- Tile-based level system
- Platforms (ground, floating platforms)
- Boundaries (screen edges, death zones)
- Background layers (parallax scrolling)
- Level data stored in JSON/arrays

### 4. Enemies
- Basic enemy AI (patrol left/right)
- Collision with player (damage/death)
- Can be defeated by jumping on top
- Different enemy types (optional)

### 5. Collectibles
- Coins/items to collect
- Score system
- Power-ups (optional: speed boost, invincibility)

### 6. Level System
- Multiple levels (3-5 levels)
- Level progression
- Win condition (reach end flag/goal)
- Level restart on death

### 7. UI Elements
- Score display
- Lives counter
- Level indicator
- Game over screen
- Victory screen
- Pause menu

## Implementation Structure

```
src/
├── game/
│   ├── Game.js              # Main game class
│   ├── GameLoop.js          # Animation loop
│   ├── InputHandler.js      # Keyboard input
│   ├── Camera.js            # Camera system
│   ├── Physics.js           # Physics calculations
│   └── Collision.js         # Collision detection
├── entities/
│   ├── Player.js            # Player entity
│   ├── Enemy.js             # Enemy entity
│   ├── Platform.js         # Platform entity
│   ├── Collectible.js      # Coin/item entity
│   └── Entity.js           # Base entity class
├── levels/
│   ├── Level.js            # Level manager
│   ├── TileMap.js          # Tile map system
│   └── levelData.js        # Level definitions
├── graphics/
│   ├── Renderer.js         # Canvas renderer
│   ├── Sprite.js           # Sprite system
│   └── Animation.js        # Sprite animations
└── ui/
    ├── GameUI.jsx          # Game UI overlay
    ├── GameOver.jsx       # Game over screen
    └── Victory.jsx        # Victory screen
```

## Detailed Implementation Plan

### Phase 1: Core Engine (1-2 hours)
1. Set up Canvas element in React
2. Create Game class with game loop
3. Implement InputHandler for keyboard controls
4. Basic renderer to draw on canvas
5. Camera system to follow player

### Phase 2: Player & Physics (1-2 hours)
1. Create Player entity class
2. Implement movement (left/right)
3. Implement jump with gravity
4. Basic collision detection with ground
5. Player sprite/visual representation

### Phase 3: World & Platforms (1 hour)
1. Tile-based level system
2. Platform entities
3. Level data structure (arrays)
4. Render platforms
5. Player-platform collision

### Phase 4: Enemies (1 hour)
1. Enemy entity class
2. Basic AI (patrol movement)
3. Enemy-player collision
4. Enemy defeat mechanics (jump on top)

### Phase 5: Collectibles & Scoring (30 min)
1. Collectible entities (coins)
2. Collection detection
3. Score system
4. Score display in UI

### Phase 6: Level System (1 hour)
1. Multiple level definitions
2. Level progression
3. Win condition (goal/flag)
4. Level restart on completion

### Phase 7: Polish & UI (1 hour)
1. Lives system
2. Game over screen
3. Victory screen
4. Pause functionality
5. Sound effects (optional)
6. Particle effects (optional)

## Technical Details

### Physics
- Gravity: ~0.5 pixels/frame²
- Jump force: -12 pixels/frame
- Player speed: 5 pixels/frame
- Friction: 0.8 (ground friction)

### Collision Detection
- AABB (Axis-Aligned Bounding Box) collision
- Platform collision from top only
- Enemy collision from sides/top

### Level Format
```javascript
{
  width: 2000,
  height: 600,
  tiles: [
    // 0 = empty, 1 = ground, 2 = platform, 3 = enemy, 4 = coin, 5 = goal
    [1,1,1,1,0,0,0,2,2,0,0,1,1,1,1],
    // ... more rows
  ],
  playerStart: { x: 100, y: 400 },
  goal: { x: 1900, y: 400 }
}
```

## Quick Start Options

### Option A: Canvas API (Recommended for speed)
- Pure JavaScript Canvas
- Full control, lightweight
- Fast to implement
- Good performance

### Option B: Phaser.js
- Game framework
- Built-in physics
- More features out of box
- Slightly heavier

### Option C: Three.js 2D (as originally mentioned)
- Use orthographic camera
- 3D engine for 2D game
- More complex but flexible

## Estimated Time: 6-8 hours for full implementation

## Priority Features (MVP - 3-4 hours)
1. Player movement & jump
2. Platforms & collision
3. Basic enemy
4. One playable level
5. Score system
6. Game over/restart

## Nice-to-Have Features
- Multiple levels
- Animated sprites
- Sound effects
- Particle effects
- Power-ups
- Different enemy types
- Parallax background

