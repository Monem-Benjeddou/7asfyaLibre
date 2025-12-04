import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * ChoiceButton Component
 * Interactive choice button with effects preview
 */

export function ChoiceButton({ choice, onClick, disabled = false, showEffects = false }) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(choice);
    }
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, x: 5 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all
        ${disabled 
          ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed' 
          : 'bg-game-dark border-gray-600 hover:border-blue-500 hover:bg-gray-800 text-white cursor-pointer'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm md:text-base font-medium pr-2 md:pr-4">{choice.text}</span>
        {!disabled && (
          <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </div>
      {showEffects && choice.effects && !disabled && (
        <div className="mt-2 pt-2 border-t border-gray-700">
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.entries(choice.effects).map(([key, value]) => {
              const isPositive = value > 0;
              const labels = {
                inclusivity: 'Inclusivité',
                responsibility: 'Responsabilité',
                sustainability: 'Durabilité',
                bigTechDependence: 'Big Tech',
              };
              return (
                <span
                  key={key}
                  className={`px-2 py-1 rounded ${
                    isPositive
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {labels[key] || key}: {isPositive ? '+' : ''}{value}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </motion.button>
  );
}

