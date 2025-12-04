import { motion } from 'framer-motion';
import { Trophy, AlertCircle, XCircle, Star } from 'lucide-react';
import { getEndingColorClass } from '../game/Endings';
import { MetricsBar } from './MetricsBar.jsx';

/**
 * EndingScreen Component
 * Displays the game ending with cinematic description
 */

const ENDING_ICONS = {
  green: Trophy,
  yellow: AlertCircle,
  red: XCircle,
  secret: Star,
};

export function EndingScreen({ ending, metrics, onRestart }) {
  const Icon = ENDING_ICONS[ending.type] || Trophy;
  const colorClass = getEndingColorClass(ending.type);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-game-darker via-game-dark to-game-darker">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full bg-game-dark/90 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl p-8 md:p-12"
        >
          {/* Ending Icon */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className={`p-4 rounded-full ${colorClass.replace('text-', 'bg-')}/20`}>
              <Icon className={`w-16 h-16 ${colorClass}`} />
            </div>
          </motion.div>

          {/* Ending Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`text-4xl md:text-5xl font-bold text-center mb-4 ${colorClass}`}
          >
            {ending.title}
          </motion.h1>

          {/* Ending Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4 mb-8"
          >
            <p className="text-xl text-gray-300 text-center leading-relaxed">
              {ending.description}
            </p>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-200 leading-relaxed italic">
                "{ending.cinematic}"
              </p>
            </div>
          </motion.div>

          {/* Final Metrics */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">
              Métriques Finales
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(metrics).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center"
                >
                  <div className="text-xs text-gray-400 mb-1 uppercase">
                    {key === 'inclusivity' && 'Inclusivité'}
                    {key === 'responsibility' && 'Responsabilité'}
                    {key === 'sustainability' && 'Durabilité'}
                    {key === 'bigTechDependence' && 'Big Tech'}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {Math.round(value)}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Restart Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center"
          >
            <button
              onClick={onRestart}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-lg"
            >
              Rejouer
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

