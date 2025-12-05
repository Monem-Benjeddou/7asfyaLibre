export function VictoryScreen({ score, level, onRestart, onNextLevel }) {
  const isLevel2Completed = level === 2;
  const hasNextLevel = level === 1;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-dark-1 via-dark-2 to-dark-1 flex items-center justify-center z-50">
      {/* Radial gradient overlay with green glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent)]" />
      
      <div className="relative z-10 bg-glass border-2 border-resistance/30 rounded-xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
        {isLevel2Completed ? (
          <>
            <h1 className="text-4xl font-bold text-resistance mb-4 text-shadow">Félicitations !</h1>
            <p className="text-text-primary text-xl mb-6">Vous avez complété tous les niveaux !</p>
            <p className="text-text-secondary mb-6">Votre école est maintenant un modèle de NIRD.</p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-resistance mb-4 text-shadow">Niveau {level} Terminé !</h1>
            <p className="text-text-primary text-xl mb-6">Vous avez atteint l'objectif !</p>
          </>
        )}
        <div className="bg-dark-1 rounded-lg p-4 mb-6 border border-resistance/20">
          <p className="text-text-secondary text-lg">Score Final</p>
          <p className="text-warning text-3xl font-bold">{score}</p>
        </div>
        <div className="flex flex-col gap-3">
          {hasNextLevel && onNextLevel && (
            <button
              onClick={onNextLevel}
              className="btn-primary px-8 py-3 text-white font-bold rounded-lg text-lg hover:shadow-lg transition-shadow"
            >
              Niveau Suivant
            </button>
          )}
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg text-lg transition-colors"
          >
            {isLevel2Completed ? 'Rejouer' : 'Recommencer'}
          </button>
        </div>
      </div>
    </div>
  );
}

