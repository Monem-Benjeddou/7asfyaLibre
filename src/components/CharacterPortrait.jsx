import { User } from 'lucide-react';

/**
 * CharacterPortrait Component
 * Displays character portrait or placeholder
 */

export function CharacterPortrait({ character, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center border-2 border-gray-500 shadow-lg`}>
      {character?.portrait ? (
        <img
          src={character.portrait}
          alt={character.name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <User className="w-1/2 h-1/2 text-gray-400" />
      )}
    </div>
  );
}


