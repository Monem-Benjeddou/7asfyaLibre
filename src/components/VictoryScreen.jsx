export function VictoryScreen({ score, onRestart }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-dark-1 via-dark-2 to-dark-1 flex items-center justify-center z-50">
      {/* Radial gradient overlay with green glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent)]" />
      
      <div className="relative z-10 bg-glass border-2 border-resistance/30 rounded-xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
        <h1 className="text-4xl font-bold text-resistance mb-4 text-shadow">Autonomie Numérique Atteinte !</h1>
        <p className="text-text-primary text-xl mb-6">Vous avez atteint l'objectif !</p>
        <div className="bg-dark-1 rounded-lg p-4 mb-6 border border-resistance/20">
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

