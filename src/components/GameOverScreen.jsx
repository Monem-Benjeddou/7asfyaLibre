export function GameOverScreen({ score, onRestart }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-dark-1 via-dark-2 to-dark-1 flex items-center justify-center z-50">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent)]" />
      
      <div className="relative z-10 bg-glass border-2 border-danger/30 rounded-xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
        <h1 className="text-4xl font-bold text-danger mb-4 text-shadow">Game Over</h1>
        <p className="text-text-primary text-xl mb-6">Vous avez épuisé toutes vos vies !</p>
        <div className="bg-dark-1 rounded-lg p-4 mb-6 border border-danger/20">
          <p className="text-text-secondary text-lg">Score Final</p>
          <p className="text-warning text-3xl font-bold">{score}</p>
        </div>
        <button
          onClick={onRestart}
          className="btn-primary px-8 py-3 text-white font-bold rounded-lg text-lg"
        >
          Rejouer
        </button>
      </div>
    </div>
  );
}

