export function GameOverScreen({ score, onRestart }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-game-dark border-2 border-red-500 rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Game Over</h1>
        <p className="text-white text-xl mb-6">You ran out of lives!</p>
        <div className="bg-game-darker rounded-lg p-4 mb-6">
          <p className="text-white text-lg">Final Score</p>
          <p className="text-yellow-400 text-3xl font-bold">{score}</p>
        </div>
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors text-lg"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

