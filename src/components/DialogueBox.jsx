import { motion } from 'framer-motion';
import { CharacterPortrait } from './CharacterPortrait';
import { getCharacter } from '../data/characters';

/**
 * DialogueBox Component
 * Displays dialogue with character portrait
 */

export function DialogueBox({ dialogue, onComplete }) {
  const character = dialogue?.speaker ? getCharacter(dialogue.speaker) : null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-game-dark/95 backdrop-blur-md border-t border-gray-700 p-4 md:p-6 z-40"
    >
      <div className="max-w-4xl mx-auto flex gap-3 md:gap-4 items-start">
        {character && (
          <div className="flex-shrink-0 hidden sm:block">
            <CharacterPortrait character={character} size="lg" />
          </div>
        )}
        <div className="flex-1">
          {character && (
            <h4 className="text-base md:text-lg font-semibold text-white mb-2">
              {character.name}
            </h4>
          )}
          <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-4">
            {dialogue?.text}
          </p>
          {onComplete && (
            <button
              onClick={onComplete}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Continuer →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

