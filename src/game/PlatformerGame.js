/**
 * Platformer Game
 * Main game class managing game loop and entities
 */

import { InputHandler } from './InputHandler.js';
import { Collision } from './Collision.js';
import { NirdResources } from './NirdResources.js';
import { PingouinLibre } from '../entities/PingouinLibre.js';
import { KitReconditionnement } from '../entities/KitReconditionnement.js';
import { CleAutonomie } from '../entities/CleAutonomie.js';
import { ServeurLocal } from '../entities/ServeurLocal.js';
import { getConversationById } from '../data/conversations.js';
import { SaveManager } from '../utils/SaveManager.js';

export class PlatformerGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.input = new InputHandler();
    
    // Game state
    this.gameState = 'playing'; // 'playing', 'paused', 'gameOver', 'victory'
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    
    // NIRD Resources system
    this.nirdResources = new NirdResources();
    
    // Game entities (will be populated)
    this.player = null;
    this.platforms = [];
    this.collectibles = [];
    
    // Camera (will be set up later)
    this.camera = null;
    
    // Current level
    this.currentLevel = null;
    
    // Background clouds and elements will be generated after level is set
    this.clouds = [];
    this.backgroundElements = [];
    
    // NPCs for dialog interactions (will be populated when level is set)
    this.npcs = [];
    this.visitedNpcs = new Set(); // Track which NPCs have been visited
    this.activeDialog = null; // Current active conversation
    
    // Story progression system
    this.unlockedItems = new Set(); // Track which item types are unlocked
    // Level completion tracking
    this.level1Completed = false;
    this.level2Completed = false;
    // NPC positions for item unlocking (level-specific)
    this.npcPositions = {
      level1: {
        'livre': 600,        // NPC 1 (Professeur)
        'ordinateur': 1500,  // NPC 2 (Enseignant)
        'badge': 2800,       // NPC 3 (Technicien)
        'bloc': 3800         // NPC 4 (Élève)
      },
      level2: {
        'serveur': 800       // NPC 1 (Administrateur Système)
      }
    };
    
    // Game loop
    this.lastTime = 0;
    this.animationFrameId = null;
    this.isRunning = false;
  }

  generateBackgroundElements() {
    const elements = [];
    // Use level width from current level data, default to 2000 if not set
    const levelWidth = this.currentLevel?.data?.width || 2000;
    const groundY = 550;
    const ceilingY = 0;
    const wallHeight = 300;
    
    // Check if level 2 (server room) or level 1 (school hallway)
    if (this.level === 2) {
      // Server room background - tech theme
      
      // Layer 1: Server racks on walls
      const rackCount = Math.ceil(levelWidth / 200);
      for (let i = 0; i < rackCount; i++) {
        // Left wall server racks
        elements.push({ 
          type: 'serverRack', 
          x: 0, 
          y: groundY - 200, 
          width: 30, 
          height: 200,
          side: 'left',
          number: i + 1,
          layer: 1
        });
        // Right wall server racks
        elements.push({ 
          type: 'serverRack', 
          x: levelWidth - 30, 
          y: groundY - 200, 
          width: 30, 
          height: 200,
          side: 'right',
          number: i + 1,
          layer: 1
        });
      }
      
      // Layer 2: LED indicator lights on ceiling
      const lightCount = Math.ceil(levelWidth / 120);
      for (let i = 0; i < lightCount; i++) {
        elements.push({ 
          type: 'ledLight', 
          x: 50 + i * 120, 
          y: 20, 
          width: 20, 
          height: 10,
          color: i % 3 === 0 ? 'green' : (i % 3 === 1 ? 'red' : 'yellow'),
          layer: 2
        });
      }
      
      // Layer 3: Network cables/harnesses
      const cableCount = Math.floor(levelWidth / 300);
      for (let i = 0; i < cableCount; i++) {
        elements.push({ 
          type: 'networkCable', 
          x: 100 + i * 300, 
          y: groundY - 150, 
          width: 80, 
          height: 10,
          layer: 3
        });
      }
      
      // Layer 4: Server room signs
      const signCount = Math.floor(levelWidth / 400);
      for (let i = 0; i < signCount; i++) {
        elements.push({ 
          type: 'serverSign', 
          x: 200 + i * 400, 
          y: groundY - 250, 
          width: 100, 
          height: 40,
          text: i % 2 === 0 ? 'NIRD' : 'LOCAL',
          layer: 4
        });
      }
    } else {
      // Level 1: School hallway background - multiple layers for depth
      
      // Layer 1: Far background (windows showing outside)
      const windowCount = Math.ceil(levelWidth / 250);
      for (let i = 0; i < windowCount; i++) {
        elements.push({ 
          type: 'window', 
          x: 100 + i * 250, 
          y: 80, 
          width: 120, 
          height: 140,
          layer: 1 // Far background
        });
      }
      
      // Layer 2: Ceiling lights (recessed)
      const lightCount = Math.ceil(levelWidth / 160);
      for (let i = 0; i < lightCount; i++) {
        elements.push({ 
          type: 'ceilingLight', 
          x: 50 + i * 160, 
          y: 20, 
          width: 60, 
          height: 15,
          layer: 2
        });
      }
      
      // Layer 3: Left wall lockers (full height) - spaced every 100px
      const lockerCount = Math.ceil(levelWidth / 100);
      for (let i = 0; i < lockerCount; i++) {
        elements.push({ 
          type: 'locker', 
          x: 0, 
          y: groundY - 120, 
          width: 30, 
          height: 120,
          side: 'left',
          number: i + 1,
          layer: 3
        });
      }
      
      // Layer 3: Right wall lockers
      for (let i = 0; i < lockerCount; i++) {
        elements.push({ 
          type: 'locker', 
          x: levelWidth - 30, 
          y: groundY - 120, 
          width: 30, 
          height: 120,
          side: 'right',
          number: i + 1,
          layer: 3
        });
      }
      
      // Layer 4: Classroom doors with windows - spaced every 300px
      const doorCount = Math.floor(levelWidth / 300);
      for (let i = 0; i < doorCount; i++) {
        elements.push({ 
          type: 'classroomDoor', 
          x: 150 + i * 300, 
          y: groundY - 180, 
          width: 80, 
          height: 180,
          roomNumber: `10${i + 1}`,
          layer: 4
        });
      }
      
      // Layer 5: School signs/notices - spaced every 350px
      const signCount = Math.floor(levelWidth / 350);
      for (let i = 0; i < signCount; i++) {
        elements.push({ 
          type: 'schoolSign', 
          x: 200 + i * 350, 
          y: groundY - 250, 
          width: 80, 
          height: 50,
          text: i % 2 === 0 ? 'NIRD' : 'LIBRE',
          layer: 5
        });
      }
      
      // Layer 6: Floor tiles pattern (decorative)
      elements.push({ 
        type: 'floorPattern', 
        x: 0, 
        y: groundY, 
        width: levelWidth, 
        height: 20,
        layer: 6
      });
      
      // Layer 7: Wall baseboards
      elements.push({ 
        type: 'baseboard', 
        x: 0, 
        y: groundY - 5, 
        width: levelWidth, 
        height: 5,
        layer: 7
      });
    }
    
    return elements;
  }

  generateClouds() {
    // Generate clouds at different positions - more clouds for longer level
    const clouds = [];
    const levelWidth = this.currentLevel?.data?.width || 2000;
    const cloudCount = Math.ceil(levelWidth / 400) + 5; // More clouds for longer level
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: i * 400 + Math.random() * 200,
        y: 50 + Math.random() * 150,
        width: 60 + Math.random() * 40,
        height: 30 + Math.random() * 20,
        speed: 0.1 + Math.random() * 0.1, // Slow parallax movement
      });
    }
    return clouds;
  }

  renderClouds(ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    this.clouds.forEach(cloud => {
      // Draw simple pixelated cloud (rounded rectangles)
      const x = cloud.x;
      const y = cloud.y;
      const w = cloud.width;
      const h = cloud.height;

      // Main cloud body
      ctx.fillRect(x, y + h / 2, w, h / 2);
      // Left bump
      ctx.fillRect(x - w / 4, y + h / 3, w / 2, h / 2);
      // Right bump
      ctx.fillRect(x + w / 2, y + h / 3, w / 2, h / 2);
      // Top bump
      ctx.fillRect(x + w / 4, y, w / 2, h / 2);

      // Add black outline for pixelated look
      ctx.strokeRect(x, y + h / 2, w, h / 2);
      ctx.strokeRect(x - w / 4, y + h / 3, w / 2, h / 2);
      ctx.strokeRect(x + w / 2, y + h / 3, w / 2, h / 2);
      ctx.strokeRect(x + w / 4, y, w / 2, h / 2);
    });
  }

  renderSun(ctx) {
    // Draw sun in top right corner
    const sunX = (this.currentLevel?.data?.width || 2000) - 80;
    const sunY = 30;
    const sunSize = 40;
    
    ctx.fillStyle = '#FFFF00';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    
    // Draw sun circle
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Draw sun rays
    ctx.strokeStyle = '#FFFF00';
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const startX = sunX + Math.cos(angle) * sunSize;
      const startY = sunY + Math.sin(angle) * sunSize;
      const endX = sunX + Math.cos(angle) * (sunSize + 10);
      const endY = sunY + Math.sin(angle) * (sunSize + 10);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }

  renderBackgroundElements(ctx) {
    // Sort elements by layer (render far to near)
    const sortedElements = [...this.backgroundElements].sort((a, b) => (a.layer || 0) - (b.layer || 0));
    
    sortedElements.forEach(element => {
      switch (element.type) {
        case 'window':
          this.renderWindow(ctx, element);
          break;
        case 'ceilingLight':
          this.renderCeilingLight(ctx, element);
          break;
        case 'locker':
          this.renderLocker(ctx, element);
          break;
        case 'classroomDoor':
          this.renderClassroomDoor(ctx, element);
          break;
        case 'schoolSign':
          this.renderSchoolSign(ctx, element);
          break;
        case 'floorPattern':
          this.renderFloorPattern(ctx, element);
          break;
        case 'baseboard':
          this.renderBaseboard(ctx, element);
          break;
        // Legacy support
        case 'hill':
          this.renderHill(ctx, element);
          break;
        case 'building':
          this.renderBuilding(ctx, element);
          break;
        case 'bookshelf':
          this.renderBookshelf(ctx, element);
          break;
        case 'desk':
          this.renderDesk(ctx, element);
          break;
        case 'pipe':
          this.renderPipe(ctx, element);
          break;
        case 'wire':
          this.renderWire(ctx, element);
          break;
      }
    });
  }

  renderHill(ctx, hill) {
    const { x, y, width, height } = hill;
    const groundY = 550;
    
    // Draw green hill - 8-bit palette
    ctx.fillStyle = '#50D010';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    
    // Draw curved hill shape
    ctx.beginPath();
    ctx.moveTo(x, groundY);
    ctx.quadraticCurveTo(x + width / 2, y, x + width, groundY);
    ctx.lineTo(x + width, groundY + 10);
    ctx.lineTo(x, groundY + 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Add texture dots (darker green)
    ctx.fillStyle = '#58C800';
    for (let i = 0; i < 3; i++) {
      const dotX = x + (width / 4) * (i + 1);
      const dotY = y + height / 2;
      ctx.fillRect(dotX, dotY, 2, 2);
    }
  }

  renderLocker(ctx, locker) {
    const { x, y, width, height, side, number } = locker;
    
    // Professional school locker design
    // Main body - blue-gray
    ctx.fillStyle = '#4040C8';
    ctx.fillRect(x, y, width, height);
    
    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // 3D effect - highlight on top
    ctx.fillStyle = '#6060E8';
    ctx.fillRect(x + 2, y + 2, width - 4, 4);
    
    // 3D effect - shadow on bottom
    ctx.fillStyle = '#2020A0';
    ctx.fillRect(x + 2, y + height - 4, width - 4, 2);
    
    // Vertical divider (locker door seam)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x + width / 2, y + height);
    ctx.stroke();
    
    // Lock/handle (circular)
    const lockX = x + width / 2;
    const lockY = y + height / 2;
    ctx.fillStyle = '#C0C0C0'; // Silver
    ctx.beginPath();
    ctx.arc(lockX, lockY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Lock center
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(lockX, lockY, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Locker number
    if (number) {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(number.toString(), lockX, lockY - 8);
      ctx.textAlign = 'left';
    }
    
    // Ventilation slits (top and bottom)
    ctx.fillStyle = '#2020A0';
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(x + 4 + i * 7, y + 6, 4, 2);
      ctx.fillRect(x + 4 + i * 7, y + height - 8, 4, 2);
    }
  }
  
  renderWindow(ctx, window) {
    const { x, y, width, height } = window;
    
    // Window frame - brown/wood
    ctx.fillStyle = '#783C08';
    ctx.fillRect(x, y, width, height);
    
    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);
    
    // Window panes (4 panes)
    const paneWidth = width / 2 - 4;
    const paneHeight = height / 2 - 4;
    
    // Render sky and clouds inside each window pane using clipping
    const panes = [
      { x: x + 4, y: y + 4, w: paneWidth, h: paneHeight },
      { x: x + width / 2 + 2, y: y + 4, w: paneWidth, h: paneHeight },
      { x: x + 4, y: y + height / 2 + 2, w: paneWidth, h: paneHeight },
      { x: x + width / 2 + 2, y: y + height / 2 + 2, w: paneWidth, h: paneHeight }
    ];
    
    panes.forEach(pane => {
      // Save context and clip to pane area
      ctx.save();
      ctx.beginPath();
      ctx.rect(pane.x, pane.y, pane.w, pane.h);
      ctx.clip();
      
      // Draw sky background
      ctx.fillStyle = '#40A0FF';
      ctx.fillRect(pane.x, pane.y, pane.w, pane.h);
      
      // Draw clouds that are visible through this window pane
      // Clouds are already rendered globally, but we need to render them again
      // in the clipped area to ensure they show through windows
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      
      this.clouds.forEach(cloud => {
        const cloudX = cloud.x;
        const cloudY = cloud.y;
        const cloudW = cloud.width;
        const cloudH = cloud.height;
        
        // Check if cloud overlaps with this window pane
        if (cloudX + cloudW > pane.x && cloudX < pane.x + pane.w &&
            cloudY + cloudH > pane.y && cloudY < pane.y + pane.h) {
          // Draw cloud (same style as renderClouds)
          const w = cloudW;
          const h = cloudH;
          
          // Main cloud body
          ctx.fillRect(cloudX, cloudY + h / 2, w, h / 2);
          // Left bump
          ctx.fillRect(cloudX - w / 4, cloudY + h / 3, w / 2, h / 2);
          // Right bump
          ctx.fillRect(cloudX + w / 2, cloudY + h / 3, w / 2, h / 2);
          // Top bump
          ctx.fillRect(cloudX + w / 4, cloudY, w / 2, h / 2);
          
          // Cloud outlines
          ctx.strokeRect(cloudX, cloudY + h / 2, w, h / 2);
          ctx.strokeRect(cloudX - w / 4, cloudY + h / 3, w / 2, h / 2);
          ctx.strokeRect(cloudX + w / 2, cloudY + h / 3, w / 2, h / 2);
          ctx.strokeRect(cloudX + w / 4, cloudY, w / 2, h / 2);
        }
      });
      
      ctx.restore();
    });
    
    // Window cross (mullions) - draw on top
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    // Vertical
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x + width / 2, y + height);
    // Horizontal
    ctx.moveTo(x, y + height / 2);
    ctx.lineTo(x + width, y + height / 2);
    ctx.stroke();
    
    // Window reflection (highlight)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(x + 6, y + 6, paneWidth - 4, 8);
    ctx.fillRect(x + width / 2 + 4, y + 6, paneWidth - 4, 8);
    
    // Window sill (bottom ledge)
    ctx.fillStyle = '#986830';
    ctx.fillRect(x - 2, y + height, width + 4, 4);
    ctx.strokeRect(x - 2, y + height, width + 4, 4);
  }
  
  renderCeilingLight(ctx, light) {
    const { x, y, width, height } = light;
    
    // Recessed ceiling light
    // Ceiling recess
    ctx.fillStyle = '#808080';
    ctx.fillRect(x, y, width, height);
    
    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Light fixture (white/yellow glow)
    ctx.fillStyle = '#FFFF80';
    ctx.fillRect(x + 4, y + 2, width - 8, height - 4);
    
    // Light bulb
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x + width / 2, y + height / 2, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Light rays (subtle)
    ctx.strokeStyle = 'rgba(255, 255, 128, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI * 2) / 4;
      ctx.beginPath();
      ctx.moveTo(x + width / 2, y + height / 2);
      ctx.lineTo(
        x + width / 2 + Math.cos(angle) * 15,
        y + height / 2 + Math.sin(angle) * 15
      );
      ctx.stroke();
    }
  }
  
  renderClassroomDoor(ctx, door) {
    const { x, y, width, height, roomNumber } = door;
    
    // Door frame
    ctx.fillStyle = '#783C08';
    ctx.fillRect(x - 4, y, width + 8, height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 4, y, width + 8, height);
    
    // Door panel (wood)
    ctx.fillStyle = '#986830';
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Door panels (raised sections)
    ctx.fillStyle = '#A07840';
    // Top panel
    ctx.fillRect(x + 4, y + 4, width - 8, height / 3 - 4);
    ctx.strokeRect(x + 4, y + 4, width - 8, height / 3 - 4);
    // Middle panel
    ctx.fillRect(x + 4, y + height / 3 + 2, width - 8, height / 3 - 4);
    ctx.strokeRect(x + 4, y + height / 3 + 2, width - 8, height / 3 - 4);
    // Bottom panel
    ctx.fillRect(x + 4, y + (height * 2) / 3 + 2, width - 8, height / 3 - 6);
    ctx.strokeRect(x + 4, y + (height * 2) / 3 + 2, width - 8, height / 3 - 6);
    
    // Door window (small window at top)
    ctx.fillStyle = '#40A0FF';
    ctx.fillRect(x + 8, y + 8, width - 16, 30);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 8, y + 8, width - 16, 30);
    
    // Window cross
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y + 8);
    ctx.lineTo(x + width / 2, y + 38);
    ctx.moveTo(x + 8, y + 23);
    ctx.lineTo(x + width - 8, y + 23);
    ctx.stroke();
    
    // Door handle
    ctx.fillStyle = '#C0C0C0';
    ctx.beginPath();
    ctx.arc(x + width - 12, y + height / 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Room number sign
    if (roomNumber) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + width / 2 - 15, y + 45, 30, 12);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + width / 2 - 15, y + 45, 30, 12);
      
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(roomNumber, x + width / 2, y + 54);
      ctx.textAlign = 'left';
    }
  }

  renderNpc(ctx, npc) {
    const groundY = 550; // Ground level
    const personX = npc.x - 12; // Center person at NPC position
    const personY = groundY; // NPC stands on ground - feet at ground level
    
    // Person is a simple NPC character (teacher/student)
    // Head
    ctx.fillStyle = '#FFC080'; // Skin tone
    ctx.fillRect(personX + 6, personY - 40, 12, 12);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(personX + 6, personY - 40, 12, 12);
    
    // Hair
    ctx.fillStyle = '#783C08'; // Brown hair
    ctx.fillRect(personX + 6, personY - 42, 12, 4);
    ctx.strokeRect(personX + 6, personY - 42, 12, 4);
    
    // Eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(personX + 8, personY - 36, 2, 2);
    ctx.fillRect(personX + 14, personY - 36, 2, 2);
    
    // Body (shirt/jacket)
    ctx.fillStyle = '#4040FF'; // Blue shirt
    ctx.fillRect(personX + 4, personY - 28, 16, 20);
    ctx.strokeRect(personX + 4, personY - 28, 16, 20);
    
    // Arms
    ctx.fillStyle = '#FFC080'; // Skin tone
    ctx.fillRect(personX, personY - 26, 4, 16);
    ctx.fillRect(personX + 20, personY - 26, 4, 16);
    ctx.strokeRect(personX, personY - 26, 4, 16);
    ctx.strokeRect(personX + 20, personY - 26, 4, 16);
    
    // Hands
    ctx.fillRect(personX - 1, personY - 10, 3, 3);
    ctx.fillRect(personX + 22, personY - 10, 3, 3);
    ctx.strokeRect(personX - 1, personY - 10, 3, 3);
    ctx.strokeRect(personX + 22, personY - 10, 3, 3);
    
    // Legs (pants)
    ctx.fillStyle = '#4040C8'; // Darker blue pants
    ctx.fillRect(personX + 6, personY - 8, 6, 8);
    ctx.fillRect(personX + 12, personY - 8, 6, 8);
    ctx.strokeRect(personX + 6, personY - 8, 6, 8);
    ctx.strokeRect(personX + 12, personY - 8, 6, 8);
    
    // Feet (shoes) - on ground
    ctx.fillStyle = '#783C08'; // Brown shoes
    ctx.fillRect(personX + 5, personY, 8, 4);
    ctx.fillRect(personX + 11, personY, 8, 4);
    ctx.strokeRect(personX + 5, personY, 8, 4);
    ctx.strokeRect(personX + 11, personY, 8, 4);
    
    // "Come Here" bubble above head - only show if not visited
    if (!this.visitedNpcs.has(npc.id)) {
      const time = Date.now() / 500;
      const pulse = Math.sin(time) * 0.2 + 0.8; // Pulse between 0.8 and 1.0
      const bubbleY = personY - 55;
      const bubbleWidth = 50;
      const bubbleHeight = 20;
      
      // Speech bubble background (white with black border)
      ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
      ctx.fillRect(personX - 5, bubbleY - bubbleHeight / 2, bubbleWidth, bubbleHeight);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(personX - 5, bubbleY - bubbleHeight / 2, bubbleWidth, bubbleHeight);
      
      // Bubble tail pointing down
      ctx.beginPath();
      ctx.moveTo(personX + 12, bubbleY + bubbleHeight / 2);
      ctx.lineTo(personX + 8, bubbleY + bubbleHeight / 2 + 5);
      ctx.lineTo(personX + 16, bubbleY + bubbleHeight / 2 + 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // "Come Here" text
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Come Here', personX + 20, bubbleY + 3);
      ctx.textAlign = 'left';
    }
  }
  
  renderBulletinBoard(ctx, board) {
    const { x, y, width, height } = board;
    
    // Cork board background
    ctx.fillStyle = '#A07840';
    ctx.fillRect(x, y, width, height);
    
    // Black frame
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);
    
    // Inner frame (wood)
    ctx.fillStyle = '#783C08';
    ctx.fillRect(x + 4, y + 4, width - 8, 6);
    ctx.fillRect(x + 4, y + height - 10, width - 8, 6);
    ctx.fillRect(x + 4, y + 4, 6, height - 8);
    ctx.fillRect(x + width - 10, y + 4, 6, height - 8);
    
    // Cork texture (dots)
    ctx.fillStyle = '#986830';
    for (let i = 0; i < 20; i++) {
      const dotX = x + 10 + (i % 5) * 18;
      const dotY = y + 15 + Math.floor(i / 5) * 15;
      ctx.fillRect(dotX, dotY, 2, 2);
    }
    
    // Pinned papers
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + 15, y + 20, 25, 20);
    ctx.fillRect(x + 50, y + 25, 20, 15);
    ctx.fillRect(x + 20, y + 50, 30, 18);
    
    // Paper outlines
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 15, y + 20, 25, 20);
    ctx.strokeRect(x + 50, y + 25, 20, 15);
    ctx.strokeRect(x + 20, y + 50, 30, 18);
    
    // Pins (red)
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(x + 18, y + 22, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 53, y + 27, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 23, y + 52, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  renderSchoolSign(ctx, sign) {
    const { x, y, width, height, text } = sign;
    
    // Sign background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x, y, width, height);
    
    // Black border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);
    
    // Sign pole
    ctx.fillStyle = '#783C08';
    ctx.fillRect(x + width / 2 - 2, y + height, 4, 20);
    ctx.strokeRect(x + width / 2 - 2, y + height, 4, 20);
    
    // Text
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, x + width / 2, y + height / 2 + 5);
    ctx.textAlign = 'left';
    
    // Decorative arrow (pointing right)
    ctx.fillStyle = '#4040C8';
    ctx.beginPath();
    ctx.moveTo(x + width - 10, y + height / 2);
    ctx.lineTo(x + width - 5, y + height / 2 - 5);
    ctx.lineTo(x + width - 5, y + height / 2 + 5);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  
  renderFloorPattern(ctx, pattern) {
    const { x, y, width, height } = pattern;
    
    // Floor tiles (checkerboard pattern)
    const tileSize = 40;
    
    for (let tx = 0; tx < width; tx += tileSize) {
      for (let ty = 0; ty < height; ty += tileSize) {
        const tileX = x + tx;
        const tileY = y + ty;
        const isEven = (Math.floor(tx / tileSize) + Math.floor(ty / tileSize)) % 2 === 0;
        
        // Tile color
        ctx.fillStyle = isEven ? '#E0E0E0' : '#D0D0D0';
        ctx.fillRect(tileX, tileY, tileSize, tileSize);
        
        // Tile outline
        ctx.strokeStyle = '#B0B0B0';
        ctx.lineWidth = 1;
        ctx.strokeRect(tileX, tileY, tileSize, tileSize);
      }
    }
  }
  
  renderBaseboard(ctx, baseboard) {
    const { x, y, width, height } = baseboard;
    
    // Baseboard (wood trim)
    ctx.fillStyle = '#986830';
    ctx.fillRect(x, y, width, height);
    
    // Top highlight
    ctx.fillStyle = '#A07840';
    ctx.fillRect(x, y, width, 1);
    
    // Bottom shadow
    ctx.fillStyle = '#783C08';
    ctx.fillRect(x, y + height - 1, width, 1);
    
    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
  }

  renderBuilding(ctx, building) {
    const { x, y, width, height, color, windows } = building;
    
    // Building body - use provided color or map to 8-bit palette
    let buildingColor = color;
    if (color === '#9370db') buildingColor = '#8040A0'; // Purple
    if (color === '#ffb347') buildingColor = '#E08040'; // Orange
    if (color === '#90ee90') buildingColor = '#A0D080'; // Light Green
    
    ctx.fillStyle = buildingColor;
    ctx.fillRect(x, y, width, height);
    
    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Windows
    ctx.fillStyle = '#4040A0';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    
    const windowRows = Math.floor(windows / 2) || 2;
    const windowCols = 2;
    const windowWidth = (width - 20) / windowCols;
    const windowHeight = (height - 40) / windowRows;
    
    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < windowCols; col++) {
        const winX = x + 10 + col * (windowWidth + 5);
        const winY = y + 20 + row * (windowHeight + 5);
        ctx.fillRect(winX, winY, windowWidth, windowHeight);
        ctx.strokeRect(winX, winY, windowWidth, windowHeight);
        
        // Window cross
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(winX + windowWidth / 2, winY);
        ctx.lineTo(winX + windowWidth / 2, winY + windowHeight);
        ctx.moveTo(winX, winY + windowHeight / 2);
        ctx.lineTo(winX + windowWidth, winY + windowHeight / 2);
        ctx.stroke();
      }
    }
  }

  renderBookshelf(ctx, bookshelf) {
    const { x, y, width, height } = bookshelf;
    
    // Bookshelf frame - 8-bit palette
    ctx.fillStyle = '#783C08';
    ctx.fillRect(x, y, width, height);
    
    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Shelf lines
    ctx.strokeStyle = '#000000';
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(x, y + (height / 4) * i);
      ctx.lineTo(x + width, y + (height / 4) * i);
      ctx.stroke();
    }
    
    // Books (colorful - 8-bit palette)
    const bookColors = ['#FF0000', '#4040FF', '#FFFF00', '#50D010', '#FF00FF'];
    const bookWidth = width / 5;
    
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = bookColors[i % bookColors.length];
      ctx.fillRect(x + i * bookWidth, y, bookWidth - 1, height);
      
      // Black outline
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + i * bookWidth, y, bookWidth - 1, height);
    }
  }

  renderDesk(ctx, desk) {
    const { x, y, width, height, hasCRT } = desk;
    const groundY = 550;
    
    // Desk top - 8-bit palette
    ctx.fillStyle = '#A07840';
    ctx.fillRect(x, groundY - height, width, 10);
    
    // Black outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, groundY - height, width, 10);
    
    // Desk legs
    ctx.fillStyle = '#A07840';
    ctx.fillRect(x + 5, groundY - height + 10, 5, height - 10);
    ctx.fillRect(x + width - 10, groundY - height + 10, 5, height - 10);
    ctx.strokeRect(x + 5, groundY - height + 10, 5, height - 10);
    ctx.strokeRect(x + width - 10, groundY - height + 10, 5, height - 10);
    
    // Monitor
    if (hasCRT) {
      // Old CRT monitor
      ctx.fillStyle = '#808080';
      ctx.fillRect(x + 10, groundY - height - 30, 25, 20);
      ctx.fillRect(x + 12, groundY - height - 50, 21, 20);
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(x + 10, groundY - height - 30, 25, 20);
      ctx.strokeRect(x + 12, groundY - height - 50, 21, 20);
      
      // Screen
      ctx.fillStyle = '#0000A0';
      ctx.fillRect(x + 14, groundY - height - 48, 17, 16);
    } else {
      // Flat screen monitor
      ctx.fillStyle = '#181818';
      ctx.fillRect(x + 10, groundY - height - 25, 30, 2);
      ctx.fillRect(x + 12, groundY - height - 35, 26, 10);
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(x + 10, groundY - height - 25, 30, 2);
      ctx.strokeRect(x + 12, groundY - height - 35, 26, 10);
      
      // Screen
      ctx.fillStyle = '#0000A0';
      ctx.fillRect(x + 14, groundY - height - 33, 22, 8);
    }
    
    // Computer tower
    ctx.fillStyle = '#181818';
    ctx.fillRect(x + 45, groundY - height + 5, 10, 15);
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(x + 45, groundY - height + 5, 10, 15);
    
    // Chair - 8-bit palette
    const chairX = x + width / 2 - 8;
    const chairY = groundY - height + 15;
    
    // Chair back
    ctx.fillStyle = '#986830';
    ctx.fillRect(chairX, chairY, 16, 3);
    ctx.fillRect(chairX + 6, chairY - 15, 4, 15);
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(chairX, chairY, 16, 3);
    ctx.strokeRect(chairX + 6, chairY - 15, 4, 15);
    
    // Chair seat
    ctx.fillStyle = '#986830';
    ctx.fillRect(chairX, chairY + 3, 16, 3);
    ctx.strokeRect(chairX, chairY + 3, 16, 3);
    
    // Chair legs
    ctx.fillRect(chairX + 2, chairY + 6, 2, 8);
    ctx.fillRect(chairX + 12, chairY + 6, 2, 8);
    ctx.strokeRect(chairX + 2, chairY + 6, 2, 8);
    ctx.strokeRect(chairX + 12, chairY + 6, 2, 8);
  }

  renderPipe(ctx, pipe) {
    const { x, y, width, height, horizontal } = pipe;
    
    // Pipe color - 8-bit palette (green for NIRD theme)
    ctx.fillStyle = '#50D010'; // Green pipe
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    
    if (horizontal) {
      // Horizontal pipe
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
      
      // Pipe ends
      ctx.fillRect(x - 5, y - 5, 5, height + 10);
      ctx.fillRect(x + width, y - 5, 5, height + 10);
      ctx.strokeRect(x - 5, y - 5, 5, height + 10);
      ctx.strokeRect(x + width, y - 5, 5, height + 10);
      
      // "Forge des Communs" sign at entrance
      const signX = x - 5;
      const signY = y - 25;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(signX - 15, signY, 50, 18);
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(signX - 15, signY, 50, 18);
      
      // Text "FORGE"
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 8px Arial';
      ctx.fillText('FORGE', signX - 12, signY + 8);
      ctx.fillText('COMMUNS', signX - 12, signY + 16);
    } else {
      // Vertical pipe
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
      
      // Pipe ends
      ctx.fillRect(x - 5, y - 5, width + 10, 5);
      ctx.fillRect(x - 5, y + height, width + 10, 5);
      ctx.strokeRect(x - 5, y - 5, width + 10, 5);
      ctx.strokeRect(x - 5, y + height, width + 10, 5);
      
      // "Forge des Communs" sign at top entrance
      const signX = x - 20;
      const signY = y - 25;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(signX, signY, 50, 18);
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(signX, signY, 50, 18);
      
      // Text
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 8px Arial';
      ctx.fillText('FORGE', signX + 3, signY + 8);
      ctx.fillText('COMMUNS', signX + 3, signY + 16);
    }
    
    // Pipe details (darker shade for depth)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 2, y + 2, width - 4, height - 4);
  }

  renderWire(ctx, wire) {
    const { x, y, endX, endY, color } = wire;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  updateClouds() {
    // Move clouds slowly (parallax effect)
    this.clouds.forEach(cloud => {
      cloud.x += cloud.speed;
      // Reset cloud position when it goes off screen
      if (cloud.x > (this.currentLevel?.data?.width || 2000) + 200) {
        cloud.x = -200;
      }
    });
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  gameLoop() {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (this.gameState === 'playing') {
      this.update(deltaTime);
    }
    
    // Always render (even when paused, to show paused state)
    this.render();
    
    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
  }

  resume() {
    if (this.gameState === 'paused') {
      this.gameState = 'playing';
    }
  }

  pause() {
    if (this.gameState === 'playing' && !this.activeDialog) {
      this.gameState = 'paused';
    }
  }

  update(deltaTime) {
    if (!this.player || this.gameState !== 'playing') return;

    // Update player (include NIRD blocks as platforms for collision)
    const allPlatforms = [...this.platforms, ...this.nirdBlocks];
    const playerResult = this.player.update(deltaTime, this.input, allPlatforms);
    
    // Check if player fell off world
    if (playerResult === 'fell') {
      this.loseLife();
      if (this.gameState === 'playing') {
        // Clear all entities before reloading
        this.clearAllEntities();
        // Reset player position
        this.currentLevel.load(this);
      }
      return;
    }

    // Update NIRD blocks (only interactive if 'bloc' is unlocked)
    this.nirdBlocks.forEach(block => {
      block.update(deltaTime);
      
      // Only allow interaction if blocks are unlocked
      if (this.unlockedItems.has('bloc')) {
        // Check if player hits block from below
        const collectibleType = block.hitFromBelow(this.player);
        if (collectibleType && !block.collectibleSpawned) {
          block.collectibleSpawned = true;
          // Spawn collectible above block
          this.spawnCollectibleFromBlock(block, collectibleType);
        }
      }
    });

    // Update collectibles
    this.collectibles.forEach(collectible => {
      collectible.update(deltaTime);
      
      // Check collectible-player collision
      if (Collision.checkEntityCollision(this.player, collectible) && !collectible.collected) {
        const result = collectible.collect();
        
        // Handle different collectible types
        if (typeof result === 'object') {
          // NIRD collectibles return objects with stats
          this.addScore(result.points || 0);
          
          // Add NIRD resources
          if (result.competence) {
            this.nirdResources.addCompetence(result.competence);
          }
          if (result.reemploi) {
            this.nirdResources.addReemploi(result.reemploi);
          }
          if (result.licencesLibres) {
            this.nirdResources.addLicencesLibres(result.licencesLibres);
          }
          
          // Legacy support
          if (result.life) this.lives += result.life;
          if (result.powerUp) {
            this.applyPowerUp(result.powerUp);
          }
        } else {
          // Legacy collectibles return just points
          this.addScore(result);
        }
        
        this.removeCollectible(collectible);
      }
    });

    // Check victory condition (portal collision)
    if (this.currentLevel && this.currentLevel.checkGoal(this.player)) {
      // For level 1, check if player has 20% autonomy to pass through portal
      if (this.level === 1) {
        const autonomy = this.nirdResources.calculateAutonomy();
        if (autonomy >= 20) {
          this.gameState = 'victory';
          this.level1Completed = true;
          // Save progress after level completion
          this.saveProgress();
        } else {
          // Show message that autonomy is too low (could be a temporary message)
          // For now, just prevent victory - could add a UI message later
        }
      } else {
        // Level 2 - no autonomy requirement
        this.gameState = 'victory';
        this.level2Completed = true;
        // Save progress after level completion
        this.saveProgress();
      }
    }

    // Update camera
    if (this.camera && this.player) {
      this.camera.update(this.player, this.canvas.width, this.canvas.height);
    }

    // Update clouds
    this.updateClouds();

    // Check NPC collisions for dialog triggers
    if (!this.activeDialog) {
      this.checkNpcCollisions();
    }
  }

  checkNpcCollisions() {
    if (!this.player) return;

    for (const npc of this.npcs) {
      // Check if player is near the NPC
      const playerCenterX = this.player.x + this.player.width / 2;
      const playerCenterY = this.player.y + this.player.height / 2;
      const npcX = npc.x;
      const npcY = npc.y;
      
      const distanceX = Math.abs(playerCenterX - npcX);
      const distanceY = Math.abs(playerCenterY - npcY);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Show person marker when player is within showPersonRange
      npc.personVisible = distance < npc.showPersonRange && !this.visitedNpcs.has(npc.id);

      // Trigger dialog when player is very close (within dialogTriggerRange)
      if (distance < npc.dialogTriggerRange && !this.visitedNpcs.has(npc.id)) {
        this.triggerDialog(npc);
        break; // Only trigger one dialog at a time
      }
    }
  }

  triggerDialog(npc) {
    // Get the specific conversation for this NPC
    // Support both scenarioId and conversationId for compatibility
    const conversationId = npc.scenarioId || npc.conversationId;
    const conversation = getConversationById(conversationId);
    if (conversation) {
      this.activeDialog = {
        conversation: conversation,
        npc: npc
      };
    }
  }

  closeDialog() {
    if (this.activeDialog && this.activeDialog.npc) {
      // Mark NPC as visited when conversation ends
      this.visitedNpcs.add(this.activeDialog.npc.id);
      
      // Unlock item type if conversation introduces one
      const conversation = this.activeDialog.conversation;
      if (conversation && conversation.introducesItem) {
        this.unlockedItems.add(conversation.introducesItem);
      }
      
      // Save progress after unlocking items
      this.saveProgress();
    }
    this.activeDialog = null;
  }

  getNpcPositionForItem(itemType) {
    // Get level-specific NPC positions
    const levelKey = `level${this.level}`;
    const levelPositions = this.npcPositions[levelKey] || {};
    return levelPositions[itemType] || 0;
  }

  render() {
    // Clear the entire canvas first to prevent artifacts
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Clear canvas with school hallway background
    this.renderSchoolHallway(this.ctx);
    
    // Apply camera transform if available
    if (this.camera) {
      this.ctx.save();
      this.ctx.translate(-this.camera.x, -this.camera.y);
    }
    
    // Render background elements (windows, lights, etc.)
    // Windows will render clouds inside them (not globally)
    this.renderBackgroundElements(this.ctx);
    
    // Render entities (order matters: background to foreground)
    this.platforms.forEach(platform => platform.render(this.ctx));
    
    // Render NIRD blocks (only interactive if 'bloc' is unlocked)
    this.nirdBlocks.forEach(block => {
      // Blocks are visible but only interactive if unlocked
      if (this.unlockedItems.has('bloc')) {
        block.render(this.ctx);
      } else {
        // Render as inactive/grayed out
        block.renderInactive(this.ctx);
      }
    });
    
    // Filter and render collectibles based on story progression
    this.collectibles
      .filter(collectible => {
        if (!collectible.type) return false;
        if (!this.unlockedItems.has(collectible.type)) return false;
        // Check if ahead of introducing NPC
        const npcX = this.getNpcPositionForItem(collectible.type);
        return collectible.x > npcX;
      })
      .forEach(collectible => collectible.render(this.ctx));
    
    // Render NPCs (before player so they appear behind)
    // Always render NPCs, but show question mark only if not visited
    this.npcs.forEach(npc => {
      this.renderNpc(this.ctx, npc);
    });
    
    if (this.player) {
      this.player.render(this.ctx);
    }

    // Render portal (only for level 1, level 2 uses different goal)
    if (this.currentLevel && this.currentLevel.goal && this.level === 1) {
      this.renderPortal(this.ctx);
    } else if (this.currentLevel && this.currentLevel.goal && this.level === 2) {
      // Level 2 can have a different goal or portal too
      this.renderPortal(this.ctx);
    }
    
    // Restore transform
    if (this.camera) {
      this.ctx.restore();
    }
  }
  
  renderSchoolHallway(ctx) {
    const canvas = this.canvas;
    const groundY = 550;
    const ceilingY = 0;
    const wallHeight = 300;
    
    // Check if level 2 (server room) or level 1 (school hallway)
    if (this.level === 2) {
      // Server room theme - darker, tech-focused
      // Ceiling (dark gray)
      ctx.fillStyle = '#2A2A2A';
      ctx.fillRect(0, 0, canvas.width, wallHeight);
      
      // Left wall (dark gray with tech texture)
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(0, 0, 30, canvas.height);
      
      // Right wall
      ctx.fillRect(canvas.width - 30, 0, 30, canvas.height);
      
      // Wall texture (server rack vertical lines)
      ctx.strokeStyle = '#0A0A0A';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(15 + i * 3, 0);
        ctx.lineTo(15 + i * 3, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(canvas.width - 15 - i * 3, 0);
        ctx.lineTo(canvas.width - 15 - i * 3, canvas.height);
        ctx.stroke();
      }
      
      // Floor (dark tile pattern)
      ctx.fillStyle = '#404040';
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
      
      // Floor tiles pattern (darker)
      const tileSize = 40;
      for (let tx = 0; tx < canvas.width; tx += tileSize) {
        const isEven = Math.floor(tx / tileSize) % 2 === 0;
        ctx.fillStyle = isEven ? '#505050' : '#404040';
        ctx.fillRect(tx, groundY, tileSize, canvas.height - groundY);
        
        // Tile outline
        ctx.strokeStyle = '#303030';
        ctx.lineWidth = 1;
        ctx.strokeRect(tx, groundY, tileSize, canvas.height - groundY);
      }
      
      // Wall shadows (depth effect)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(30, 0, 5, canvas.height);
      ctx.fillRect(canvas.width - 35, 0, 5, canvas.height);
      
      // Ceiling shadow (where it meets walls)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, wallHeight - 5, canvas.width, 5);
    } else {
      // Level 1: School hallway theme (original)
      // Ceiling (light beige/cream)
      ctx.fillStyle = '#F0E8D8';
      ctx.fillRect(0, 0, canvas.width, wallHeight);
      
      // Left wall (light beige with texture)
      ctx.fillStyle = '#E8D8C8';
      ctx.fillRect(0, 0, 30, canvas.height);
      
      // Right wall
      ctx.fillRect(canvas.width - 30, 0, 30, canvas.height);
      
      // Wall texture (subtle vertical lines)
      ctx.strokeStyle = '#D8C8B8';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(15 + i * 3, 0);
        ctx.lineTo(15 + i * 3, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(canvas.width - 15 - i * 3, 0);
        ctx.lineTo(canvas.width - 15 - i * 3, canvas.height);
        ctx.stroke();
      }
      
      // Floor (tile pattern)
      ctx.fillStyle = '#D0D0D0';
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
      
      // Floor tiles pattern
      const tileSize = 40;
      for (let tx = 0; tx < canvas.width; tx += tileSize) {
        const isEven = Math.floor(tx / tileSize) % 2 === 0;
        ctx.fillStyle = isEven ? '#E0E0E0' : '#D0D0D0';
        ctx.fillRect(tx, groundY, tileSize, canvas.height - groundY);
        
        // Tile outline
        ctx.strokeStyle = '#B0B0B0';
        ctx.lineWidth = 1;
        ctx.strokeRect(tx, groundY, tileSize, canvas.height - groundY);
      }
      
      // Wall shadows (depth effect)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(30, 0, 5, canvas.height);
      ctx.fillRect(canvas.width - 35, 0, 5, canvas.height);
      
      // Ceiling shadow (where it meets walls)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, wallHeight - 5, canvas.width, 5);
    }
  }

  renderPortal(ctx) {
    const goal = this.currentLevel.goal;
    const portalWidth = 60;
    const portalHeight = 40;
    const portalX = goal.x - portalWidth / 2;
    const portalY = goal.y - portalHeight; // Portal bottom is at ground level
    
    // Check autonomy for level 1
    const autonomy = this.nirdResources.calculateAutonomy();
    const canPass = this.level === 1 ? autonomy >= 20 : true;
    
    // Portal animation (pulsing effect)
    const time = Date.now() / 500;
    const pulse = Math.sin(time) * 0.2 + 0.8; // Pulse between 0.6 and 1.0
    
    // Portal outer glow (cyan/magenta for tech portal)
    const glowAlpha = canPass ? (0.3 + Math.sin(time * 2) * 0.2) : 0.1;
    ctx.fillStyle = canPass ? `rgba(0, 255, 255, ${glowAlpha})` : `rgba(128, 128, 128, ${glowAlpha})`;
    ctx.beginPath();
    ctx.arc(goal.x, portalY + portalHeight / 2, portalWidth / 2 + 10 * pulse, 0, Math.PI * 2);
    ctx.fill();
    
    // Portal frame (dark border)
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(portalX - 2, portalY - 2, portalWidth + 4, portalHeight + 4);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(portalX - 2, portalY - 2, portalWidth + 4, portalHeight + 4);
    
    // Portal interior (animated swirling effect)
    if (canPass) {
      // Active portal - cyan/magenta swirl
      const gradient = ctx.createLinearGradient(portalX, portalY, portalX + portalWidth, portalY + portalHeight);
      gradient.addColorStop(0, `rgba(0, 255, 255, ${0.6 * pulse})`);
      gradient.addColorStop(0.5, `rgba(255, 0, 255, ${0.6 * pulse})`);
      gradient.addColorStop(1, `rgba(0, 255, 255, ${0.6 * pulse})`);
      ctx.fillStyle = gradient;
    } else {
      // Inactive portal - gray
      ctx.fillStyle = `rgba(80, 80, 80, ${0.4})`;
    }
    ctx.fillRect(portalX, portalY, portalWidth, portalHeight);
    
    // Portal center (darker center for depth)
    ctx.fillStyle = canPass ? `rgba(0, 100, 100, ${0.8})` : `rgba(40, 40, 40, ${0.8})`;
    ctx.beginPath();
    ctx.arc(goal.x, portalY + portalHeight / 2, portalWidth / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Portal particles/sparkles (if active)
    if (canPass) {
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 8; i++) {
        const angle = (time * 0.5 + i * Math.PI / 4) % (Math.PI * 2);
        const radius = (portalWidth / 3) * (0.5 + Math.sin(time + i) * 0.3);
        const particleX = goal.x + Math.cos(angle) * radius;
        const particleY = portalY + portalHeight / 2 + Math.sin(angle) * radius;
        ctx.fillRect(particleX - 1, particleY - 1, 2, 2);
      }
    }
    
    // Portal label (autonomy requirement for level 1)
    if (this.level === 1) {
      ctx.fillStyle = canPass ? '#00FF00' : '#FF0000';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      const requirementText = canPass ? '20% ✓' : '20% requis';
      ctx.fillText(requirementText, goal.x, portalY + portalHeight + 5);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
    }
  }

  setPlayer(player) {
    this.player = player;
  }

  addPlatform(platform) {
    this.platforms.push(platform);
  }

  addCollectible(collectible) {
    this.collectibles.push(collectible);
  }

  addNirdBlock(block) {
    this.nirdBlocks.push(block);
  }

  spawnCollectibleFromBlock(block, collectibleType) {
    let collectible;
    const spawnX = block.x + block.width / 2;
    const spawnY = block.y - 30;
    
    switch (collectibleType) {
      case 'livre':
        collectible = new PingouinLibre(spawnX, spawnY);
        break;
      case 'ordinateur':
        collectible = new KitReconditionnement(spawnX, spawnY);
        break;
      case 'badge':
        collectible = new CleAutonomie(spawnX, spawnY);
        break;
      case 'serveur':
        collectible = new ServeurLocal(spawnX, spawnY);
        break;
      // Legacy support
      case 'pingouin':
        collectible = new PingouinLibre(spawnX, spawnY);
        break;
      case 'kit':
        collectible = new KitReconditionnement(spawnX, spawnY);
        break;
      case 'cle':
        collectible = new CleAutonomie(spawnX, spawnY);
        break;
      default:
        collectible = new PingouinLibre(spawnX, spawnY);
    }
    
    this.addCollectible(collectible);
  }

  applyPowerUp(powerUp) {
    if (powerUp.type === 'speed') {
      // Temporarily increase player speed
      const originalSpeed = this.player.speed;
      this.player.speed *= 1.5;
      setTimeout(() => {
        this.player.speed = originalSpeed;
      }, powerUp.duration);
    } else if (powerUp.type === 'jump') {
      // Temporarily increase jump force
      const originalJump = this.player.jumpForce;
      this.player.jumpForce *= 1.3;
      setTimeout(() => {
        this.player.jumpForce = originalJump;
      }, powerUp.duration);
    }
  }

  removeCollectible(collectible) {
    const index = this.collectibles.indexOf(collectible);
    if (index > -1) {
      this.collectibles.splice(index, 1);
    }
  }

  addScore(points) {
    this.score += points;
  }

  loseLife() {
    this.lives--;
    if (this.lives <= 0) {
      this.gameState = 'gameOver';
    }
  }

  setLevel(level) {
    this.currentLevel = level;
    // Update level number based on level data id
    if (level.data.id === 'level1') {
      this.level = 1;
    } else if (level.data.id === 'level2') {
      this.level = 2;
    }
    // If level number wasn't set, keep current level number
    
    // Clear existing entities
    this.platforms = [];
    this.collectibles = [];
    this.nirdBlocks = [];
    this.player = null;
    
    // Regenerate background elements and clouds based on level width
    this.backgroundElements = this.generateBackgroundElements();
    this.clouds = this.generateClouds();
    
    // Load level (this will also load NPCs)
    level.load(this);
    
    // Initialize NPCs from level data and update npcPositions
    if (level.data.npcs) {
      this.npcs = level.data.npcs.map(npcData => ({
        ...npcData,
        personVisible: false, // Whether the person marker is visible
        showPersonRange: 100, // Distance to show person
        dialogTriggerRange: 50 // Distance to trigger dialog
      }));
      
      // Update npcPositions based on current level NPCs
      const levelKey = `level${this.level}`;
      if (!this.npcPositions[levelKey]) {
        this.npcPositions[levelKey] = {};
      }
      // Store NPC positions for item filtering
      level.data.npcs.forEach(npc => {
        const conversation = getConversationById(npc.scenarioId || npc.conversationId);
        if (conversation && conversation.introducesItem) {
          this.npcPositions[levelKey][conversation.introducesItem] = npc.x;
        }
      });
    } else {
      this.npcs = [];
    }
  }

  clearAllEntities() {
    // Clear all entity arrays to prevent duplicates
    this.platforms = [];
    this.collectibles = [];
    this.nirdBlocks = [];
    this.player = null;
  }

  reset() {
    this.gameState = 'playing';
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.nirdResources.reset();
    this.visitedNpcs.clear();
    this.unlockedItems.clear(); // Reset story progression
    this.activeDialog = null;
    // Clear all entities before reloading
    this.clearAllEntities();
    // Reload current level
    if (this.currentLevel) {
      this.currentLevel.load(this);
    }
  }

  saveProgress() {
    SaveManager.saveProgress({
      currentLevel: this.level,
      unlockedItems: this.unlockedItems,
      visitedNpcs: this.visitedNpcs,
      level1Completed: this.level1Completed,
      level2Completed: this.level2Completed
    });
  }

  loadProgress() {
    const saved = SaveManager.loadProgress();
    if (saved) {
      this.level = saved.currentLevel || 1;
      this.unlockedItems = saved.unlockedItems || new Set();
      this.visitedNpcs = saved.visitedNpcs || new Set();
      this.level1Completed = saved.level1Completed || false;
      this.level2Completed = saved.level2Completed || false;
      return true;
    }
    return false;
  }

  cleanup() {
    this.stop();
    if (this.input) {
      this.input.cleanup();
    }
  }
}

