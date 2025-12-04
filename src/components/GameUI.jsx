export function GameUI({ score, lives, level }) {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
      <div className="bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm">
        <div className="text-white text-lg font-bold">
          Score: <span className="text-yellow-400">{score}</span>
        </div>
        <div className="text-white text-lg font-bold mt-1">
          Lives: <span className="text-red-400">{lives}</span>
        </div>
        <div className="text-white text-sm mt-1 opacity-75">
          Level: {level}
        </div>
      </div>
      
      <div className="bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm">
        <div className="text-white text-xs opacity-75">
          <div>Arrow Keys / WASD: Move</div>
          <div>Space / Up: Jump</div>
        </div>
      </div>
    </div>
  );
}

