import { motion } from 'framer-motion';

/**
 * RelationshipMeter Component
 * Displays relationship levels with characters
 */

const RELATIONSHIP_CONFIG = {
  teachers: {
    label: 'Enseignants',
    color: 'bg-yellow-500',
  },
  students: {
    label: 'Étudiants',
    color: 'bg-blue-500',
  },
  community: {
    label: 'Communauté',
    color: 'bg-green-500',
  },
  bigTechAgents: {
    label: 'Agents Big Tech',
    color: 'bg-red-500',
  },
};

export function RelationshipMeter({ relationships }) {
  return (
    <div className="fixed bottom-4 left-4 w-48 md:w-56 bg-game-dark/90 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-gray-700 shadow-xl z-50 hidden sm:block">
      <h3 className="text-xs md:text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
        Relations
      </h3>
      <div className="space-y-3">
        {Object.entries(relationships).map(([key, value]) => {
          const config = RELATIONSHIP_CONFIG[key];
          if (!config) return null;

          const status = value >= 70 ? 'positive' : value <= 30 ? 'negative' : 'neutral';
          const statusColor = 
            status === 'positive' ? 'text-green-400' :
            status === 'negative' ? 'text-red-400' : 'text-yellow-400';

          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{config.label}</span>
                <span className={`text-xs font-semibold ${statusColor}`}>
                  {Math.round(value)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-gray-700">
                <motion.div
                  className={`h-full ${config.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

