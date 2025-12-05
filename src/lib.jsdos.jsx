/**
 * Library entry point for jsdos bundle
 * Exports the main game components and functionality
 */

// Import CSS styles (will be extracted to separate file in build)
import './index.css';

import App from './App.jsx';
import { PlatformerCanvas } from './components/PlatformerCanvas';
import { GameUI } from './components/GameUI';
import { DialogSystem } from './components/DialogSystem';
import { PlatformerGame } from './game/PlatformerGame';

// Export main App component
export { App };

// Export individual components for custom integration
export { PlatformerCanvas, GameUI, DialogSystem };

// Export game engine
export { PlatformerGame };

// Export as default
export default App;

