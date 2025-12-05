/**
 * Platformer Game
 * Main game class managing game loop and entities
 */

import { InputHandler } from './InputHandler.js';
import { Collision } from './Collision.js';
import { PingouinLibre } from '../entities/PingouinLibre.js';
import { KitReconditionnement } from '../entities/KitReconditionnement.js';
import { CleAutonomie } from '../entities/CleAutonomie.js';

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
    
    // Game entities (will be populated)
    this.player = null;
    this.platforms = [];
    this.enemies = [];
    this.collectibles = [];
    
    // Camera (will be set up later)
    this.camera = null;
    
    // Current level
    this.currentLevel = null;
    
    // Background clouds (Mario style)
    this.clouds = this.generateClouds();
    
    // Background elements
    this.backgroundElements = this.generateBackgroundElements();
    
    // Game loop
    this.lastTime = 0;
    this.animationFrameId = null;
    this.isRunning = false;
  }

  generateBackgroundElements() {
    const elements = [];
    const levelWidth = 2000;
    const groundY = 550;
    const ceilingY = 0;
    const wallHeight = 300;
    
    // School hallway background - multiple layers for depth
    
    // Layer 1: Far background (windows showing outside)
    for (let i = 0; i < 8; i++) {
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
    for (let i = 0; i < 12; i++) {
      elements.push({ 
        type: 'ceilingLight', 
        x: 50 + i * 160, 
        y: 20, 
        width: 60, 
        height: 15,
        layer: 2
      });
    }
    
    // Layer 3: Left wall lockers (full height)
    for (let i = 0; i < 20; i++) {
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
    for (let i = 0; i < 20; i++) {
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
    
    // Layer 4: Classroom doors with windows
    for (let i = 0; i < 6; i++) {
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
    
    // Layer 5: School signs/notices
    for (let i = 0; i < 5; i++) {
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
    
    return elements;
  }

  generateClouds() {
    // Generate clouds at different positions
    const clouds = [];
    for (let i = 0; i < 5; i++) {
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
    
    this.render();
    
    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
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
        // Reset player position
        this.currentLevel.load(this);
      }
      return;
    }

    // Update enemies
    this.enemies.forEach(enemy => {
      enemy.update(deltaTime, this.platforms);
      
      // Check enemy-player collision
      const collision = enemy.checkPlayerCollision(this.player);
      if (collision === 'defeated') {
        enemy.defeat();
        this.removeEnemy(enemy);
        this.addScore(50);
      } else if (collision === 'damage') {
        this.loseLife();
        if (this.gameState === 'playing') {
          // Reset player position
          this.currentLevel.load(this);
        }
      }
    });

    // Update NIRD blocks
    this.nirdBlocks.forEach(block => {
      block.update(deltaTime);
      
      // Check if player hits block from below
      const collectibleType = block.hitFromBelow(this.player);
      if (collectibleType && !block.collectibleSpawned) {
        block.collectibleSpawned = true;
        // Spawn collectible above block
        this.spawnCollectibleFromBlock(block, collectibleType);
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
          if (result.happiness) this.happiness += result.happiness;
          if (result.budget) this.budget += result.budget;
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

    // Check victory condition
    if (this.currentLevel && this.currentLevel.checkGoal(this.player)) {
      this.gameState = 'victory';
    }

    // Update camera
    if (this.camera && this.player) {
      this.camera.update(this.player, this.canvas.width, this.canvas.height);
    }

    // Update clouds
    this.updateClouds();
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
    this.nirdBlocks.forEach(block => block.render(this.ctx));
    this.collectibles.forEach(collectible => collectible.render(this.ctx));
    this.enemies.forEach(enemy => enemy.render(this.ctx));
    if (this.player) {
      this.player.render(this.ctx);
    }

    // Render goal flag
    if (this.currentLevel && this.currentLevel.goal) {
      this.renderGoal(this.ctx);
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

  renderGoal(ctx) {
    const goal = this.currentLevel.goal;
    const poleHeight = 100;
    const poleX = goal.x;
    const poleTopY = goal.y - poleHeight;
    
    // Draw flag pole (brown)
    ctx.fillStyle = '#783C08';
    ctx.fillRect(poleX - 3, poleTopY, 6, poleHeight);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(poleX - 3, poleTopY, 6, poleHeight);
    
    // Calculate flag height based on player progress (score/performance)
    // Higher score = higher flag position
    const maxScore = 500; // Adjust based on level design
    const flagHeightRatio = Math.min(this.score / maxScore, 1);
    const flagY = poleTopY + poleHeight - (poleHeight * flagHeightRatio);
    
    // Draw flag/banner with NIRD pillars
    const flagWidth = 40;
    const flagHeight = 30;
    
    // Flag background (white)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(poleX + 3, flagY - flagHeight, flagWidth, flagHeight);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(poleX + 3, flagY - flagHeight, flagWidth, flagHeight);
    
    // NIRD Pillars represented as colored sections
    const pillarHeight = flagHeight / 3;
    
    // Inclusion (Blue) - top section
    ctx.fillStyle = '#4040C8';
    ctx.fillRect(poleX + 3, flagY - flagHeight, flagWidth, pillarHeight);
    ctx.strokeRect(poleX + 3, flagY - flagHeight, flagWidth, pillarHeight);
    
    // Responsabilité (Orange) - middle section
    ctx.fillStyle = '#E08040';
    ctx.fillRect(poleX + 3, flagY - flagHeight + pillarHeight, flagWidth, pillarHeight);
    ctx.strokeRect(poleX + 3, flagY - flagHeight + pillarHeight, flagWidth, pillarHeight);
    
    // Durabilité (Green) - bottom section
    ctx.fillStyle = '#50D010';
    ctx.fillRect(poleX + 3, flagY - flagHeight + pillarHeight * 2, flagWidth, pillarHeight);
    ctx.strokeRect(poleX + 3, flagY - flagHeight + pillarHeight * 2, flagWidth, pillarHeight);
    
    // Pole top decoration
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(poleX, poleTopY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  setPlayer(player) {
    this.player = player;
  }

  addPlatform(platform) {
    this.platforms.push(platform);
  }

  addEnemy(enemy) {
    this.enemies.push(enemy);
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

  removeEnemy(enemy) {
    const index = this.enemies.indexOf(enemy);
    if (index > -1) {
      this.enemies.splice(index, 1);
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
    // Clear existing entities
    this.platforms = [];
    this.enemies = [];
    this.collectibles = [];
    this.nirdBlocks = [];
    this.player = null;
    // Load level
    level.load(this);
  }

  reset() {
    this.gameState = 'playing';
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.happiness = 0;
    this.budget = 0;
    this.independence = 0;
    // Reload current level
    if (this.currentLevel) {
      this.currentLevel.load(this);
    }
  }

  cleanup() {
    this.stop();
    if (this.input) {
      this.input.cleanup();
    }
  }
}

