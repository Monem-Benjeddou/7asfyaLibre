import { ResourceDisplay } from './ResourceDisplay';

export function GameUI({ score, lives, level, nirdResources, autonomy }) {
  const resources = nirdResources || { competence: 0, reemploi: 0, licencesLibres: 0 };
  const autonomyValue = autonomy || 0;

  return (
    <div className="absolute top-4 left-4 right-4 pointer-events-none z-10">
      <div className="flex justify-between items-start gap-4">
        {/* Left: NIRD Resources */}
        <div className="flex flex-col gap-2">
          <ResourceDisplay 
            type="competence" 
            value={resources.competence || 0} 
            icon="📚"
          />
          <ResourceDisplay 
            type="reemploi" 
            value={resources.reemploi || 0} 
            icon="♻️"
          />
          <ResourceDisplay 
            type="licencesLibres" 
            value={resources.licencesLibres || 0} 
            icon="🔓"
          />
        </div>

        {/* Center: Autonomy Indicator */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="bg-glass px-4 py-3 rounded-lg shadow-lg border-2 border-purple-400">
            <div className="text-center mb-2">
              <span className="text-text-primary text-sm font-bold">Autonomie NIRD</span>
              <span className="text-purple-300 text-xl font-bold ml-2">{autonomyValue}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-6 border-2 border-gray-600 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 transition-all duration-300 flex items-center justify-center"
                style={{ width: `${Math.min(100, Math.max(0, autonomyValue))}%` }}
              >
                {autonomyValue > 10 && (
                  <span className="text-white text-xs font-bold">{autonomyValue}%</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

