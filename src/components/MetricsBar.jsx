import { motion } from 'framer-motion';

/**
 * MetricsBar Component
 * Displays the four core metrics with animated progress bars
 */

const METRIC_CONFIG = {
  inclusivity: {
    label: 'Inclusivité',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-500/20',
  },
  responsibility: {
    label: 'Responsabilité',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-500/20',
  },
  sustainability: {
    label: 'Durabilité',
    color: 'bg-green-500',
    bgColor: 'bg-green-500/20',
  },
  bigTechDependence: {
    label: 'Dépendance Big Tech',
    color: 'bg-red-500',
    bgColor: 'bg-red-500/20',
  },
};

export function MetricsBar({ metrics }) {
  return (
    <div className="fixed top-4 right-4 w-56 md:w-64 bg-game-dark/90 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-gray-700 shadow-xl z-50 hidden sm:block">
      <h3 className="text-xs md:text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
        Métriques
      </h3>
      <div className="space-y-3">
        {Object.entries(metrics).map(([key, value]) => {
          const config = METRIC_CONFIG[key];
          if (!config) return null;

          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{config.label}</span>
                <span className="text-xs font-semibold text-white">{Math.round(value)}%</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${config.bgColor}`}>
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

