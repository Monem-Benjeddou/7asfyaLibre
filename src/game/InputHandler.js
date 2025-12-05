/**
 * Input Handler
 * Manages keyboard input for the game
 */

export class InputHandler {
  constructor() {
    this.keys = {};
    this.keydownHandler = this.handleKeyDown.bind(this);
    this.keyupHandler = this.handleKeyUp.bind(this);
    this.setupEventListeners();
  }

  handleKeyDown(e) {
    this.keys[e.key] = true;
    // Prevent default for game keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd', 'Escape'].includes(e.key)) {
      e.preventDefault();
    }
  }

  handleKeyUp(e) {
    this.keys[e.key] = false;
  }

  setupEventListeners() {
    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('keyup', this.keyupHandler);
  }

  isPressed(key) {
    return this.keys[key] || false;
  }

  // Helper methods for common controls
  isLeftPressed() {
    return this.isPressed('ArrowLeft') || this.isPressed('a') || this.isPressed('A');
  }

  isRightPressed() {
    return this.isPressed('ArrowRight') || this.isPressed('d') || this.isPressed('D');
  }

  isJumpPressed() {
    return this.isPressed(' ') || this.isPressed('ArrowUp') || this.isPressed('w') || this.isPressed('W');
  }

  isEscapePressed() {
    return this.isPressed('Escape');
  }

  cleanup() {
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('keyup', this.keyupHandler);
  }
}

