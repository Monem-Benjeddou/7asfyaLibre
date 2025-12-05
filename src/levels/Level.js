/**
 * Level
 * Level manager that loads and spawns entities
 */

import { Player } from '../entities/Player.js';
import { Platform } from '../entities/Platform.js';
import { Collectible } from '../entities/Collectible.js';
import { PingouinLibre } from '../entities/PingouinLibre.js';
import { KitReconditionnement } from '../entities/KitReconditionnement.js';
import { CleAutonomie } from '../entities/CleAutonomie.js';
import { ServeurLocal } from '../entities/ServeurLocal.js';
import { BlocNIRD } from '../entities/BlocNIRD.js';

export class Level {
  constructor(levelData) {
    this.data = levelData;
    this.platforms = [];
    this.collectibles = [];
    this.player = null;
    this.goal = levelData.goal;
  }

  load(game) {
    // Clear existing entities in Level
    this.platforms = [];
    this.collectibles = [];
    
    // Also clear game's entity arrays to prevent duplicates
    // (This is safe even if called multiple times)
    if (game.platforms) game.platforms.length = 0;
    if (game.collectibles) game.collectibles.length = 0;
    if (game.nirdBlocks) game.nirdBlocks.length = 0;

    // Create player
    this.player = new Player(
      this.data.playerStart.x,
      this.data.playerStart.y
    );
    game.setPlayer(this.player);

    // Create platforms
    this.data.platforms.forEach((platformData, index) => {
      // First platform is usually ground, or check if it's at the bottom
      const isGround = index === 0 || platformData.y >= (this.data.height - 100);
      const platform = new Platform(
        platformData.x,
        platformData.y,
        platformData.width,
        platformData.height,
        isGround
      );
      this.platforms.push(platform);
      game.addPlatform(platform);
    });

    // Create collectibles (support NIRD collectible types)
    if (this.data.collectibles) {
      this.data.collectibles.forEach(collectibleData => {
        let collectible;
        const collectibleType = collectibleData.type || 'pingouin';
        
        switch (collectibleType) {
          case 'livre':
            collectible = new PingouinLibre(collectibleData.x, collectibleData.y);
            break;
          case 'ordinateur':
            collectible = new KitReconditionnement(collectibleData.x, collectibleData.y);
            break;
          case 'badge':
            collectible = new CleAutonomie(collectibleData.x, collectibleData.y);
            break;
          case 'serveur':
            collectible = new ServeurLocal(collectibleData.x, collectibleData.y);
            break;
          // Legacy support
          case 'pingouin':
            collectible = new PingouinLibre(collectibleData.x, collectibleData.y);
            break;
          case 'kit':
            collectible = new KitReconditionnement(collectibleData.x, collectibleData.y);
            break;
          case 'cle':
            collectible = new CleAutonomie(collectibleData.x, collectibleData.y);
            break;
          default:
            collectible = new Collectible(collectibleData.x, collectibleData.y);
        }
        this.collectibles.push(collectible);
        game.addCollectible(collectible);
      });
    }

    // Create NIRD blocks
    if (this.data.nirdBlocks) {
      this.data.nirdBlocks.forEach(blockData => {
        const block = new BlocNIRD(
          blockData.x,
          blockData.y,
          blockData.width || 32,
          blockData.height || 32,
          blockData.collectibleType || 'livre'
        );
        game.addNirdBlock(block);
      });
    }
  }

  checkGoal(player) {
    const playerBounds = player.getBounds();
    // Portal is on the ground, check horizontal collision and if player is on/near ground
    const portalWidth = 60;
    const portalHeight = 40;
    const goalBounds = {
      left: this.goal.x - portalWidth / 2,
      right: this.goal.x + portalWidth / 2,
      top: this.goal.y - portalHeight,
      bottom: this.goal.y, // Portal bottom is at ground level
    };

    // Check horizontal collision
    const horizontalCollision = (
      playerBounds.left < goalBounds.right &&
      playerBounds.right > goalBounds.left
    );
    
    // Check if player is on or near the ground (within portal height)
    const verticalCollision = (
      playerBounds.bottom >= goalBounds.top &&
      playerBounds.top <= goalBounds.bottom
    );

    return horizontalCollision && verticalCollision;
  }
}

