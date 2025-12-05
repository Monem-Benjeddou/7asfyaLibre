/**
 * Level
 * Level manager that loads and spawns entities
 */

import { Player } from '../entities/Player.js';
import { Platform } from '../entities/Platform.js';
import { Enemy } from '../entities/Enemy.js';
import { Collectible } from '../entities/Collectible.js';
import { VirusObsolescence } from '../entities/VirusObsolescence.js';
import { VerrouLogiciel } from '../entities/VerrouLogiciel.js';
import { NuageHorsZone } from '../entities/NuageHorsZone.js';
import { PingouinLibre } from '../entities/PingouinLibre.js';
import { KitReconditionnement } from '../entities/KitReconditionnement.js';
import { CleAutonomie } from '../entities/CleAutonomie.js';
import { BlocNIRD } from '../entities/BlocNIRD.js';

export class Level {
  constructor(levelData) {
    this.data = levelData;
    this.platforms = [];
    this.enemies = [];
    this.collectibles = [];
    this.player = null;
    this.goal = levelData.goal;
  }

  load(game) {
    // Clear existing entities
    this.platforms = [];
    this.enemies = [];
    this.collectibles = [];

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

    // Create enemies (support NIRD enemy types)
    if (this.data.enemies) {
      this.data.enemies.forEach(enemyData => {
        let enemy;
        const enemyType = enemyData.type || 'virus'; // Default to virus
        
        switch (enemyType) {
          case 'virus':
            enemy = new VirusObsolescence(
              enemyData.x,
              enemyData.y,
              enemyData.patrolLeft || enemyData.x - 50,
              enemyData.patrolRight || enemyData.x + 50
            );
            break;
          case 'verrou':
            enemy = new VerrouLogiciel(
              enemyData.x,
              enemyData.y,
              enemyData.patrolLeft || enemyData.x - 50,
              enemyData.patrolRight || enemyData.x + 50,
              enemyData.isFlying !== false
            );
            break;
          case 'nuage':
            enemy = new NuageHorsZone(
              enemyData.x,
              enemyData.y,
              enemyData.verticalRange || 50
            );
            break;
          default:
            // Fallback to basic enemy
            enemy = new Enemy(
              enemyData.x,
              enemyData.y,
              enemyData.patrolLeft || enemyData.x - 50,
              enemyData.patrolRight || enemyData.x + 50
            );
        }
        this.enemies.push(enemy);
        game.addEnemy(enemy);
      });
    }

    // Create collectibles (support NIRD collectible types)
    if (this.data.collectibles) {
      this.data.collectibles.forEach(collectibleData => {
        let collectible;
        const collectibleType = collectibleData.type || 'pingouin';
        
        switch (collectibleType) {
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
          blockData.collectibleType || 'pingouin'
        );
        game.addNirdBlock(block);
      });
    }
  }

  checkGoal(player) {
    const playerBounds = player.getBounds();
    const goalBounds = {
      left: this.goal.x - 25,
      right: this.goal.x + 25,
      top: this.goal.y - 25,
      bottom: this.goal.y + 25,
    };

    return (
      playerBounds.left < goalBounds.right &&
      playerBounds.right > goalBounds.left &&
      playerBounds.top < goalBounds.bottom &&
      playerBounds.bottom > goalBounds.top
    );
  }
}

