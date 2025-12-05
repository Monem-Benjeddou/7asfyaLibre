export function GameUI({ score, lives, level }) {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
      <div className="bg-glass px-4 py-2 rounded-lg shadow-lg">
        <div className="text-text-primary text-lg font-bold">
          Score: <span className="text-warning">{score}</span>
        </div>
        <div className="text-text-primary text-lg font-bold mt-1">
          Lives: <span className="text-danger">{lives}</span>
        </div>
        <div className="text-text-secondary text-sm mt-1">
          Level: {level}
        </div>
      </div>
      
      <div className="bg-glass px-4 py-2 rounded-lg shadow-lg">
        <div className="text-text-secondary text-xs">
          <div>Arrow Keys / WASD: Move</div>
          <div>Space / Up: Jump</div>
        </div>
      </div>
    </div>
  );
}

