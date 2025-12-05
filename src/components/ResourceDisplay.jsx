/**
 * ResourceDisplay
 * Reusable component for displaying a NIRD resource
 */

export function ResourceDisplay({ type, value, icon }) {
  const getColorClasses = () => {
    switch (type) {
      case 'competence':
        return {
          bg: 'bg-blue-600',
          border: 'border-blue-400',
          text: 'text-blue-100',
          iconBg: 'bg-blue-500'
        };
      case 'reemploi':
        return {
          bg: 'bg-green-600',
          border: 'border-green-400',
          text: 'text-green-100',
          iconBg: 'bg-green-500'
        };
      case 'licencesLibres':
        return {
          bg: 'bg-orange-600',
          border: 'border-orange-400',
          text: 'text-orange-100',
          iconBg: 'bg-orange-500'
        };
      default:
        return {
          bg: 'bg-gray-600',
          border: 'border-gray-400',
          text: 'text-gray-100',
          iconBg: 'bg-gray-500'
        };
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'competence':
        return 'Compétence';
      case 'reemploi':
        return 'Réemploi';
      case 'licencesLibres':
        return 'Licences Libres';
      default:
        return type;
    }
  };

  const colors = getColorClasses();

  return (
    <div className={`
      ${colors.bg} ${colors.border} ${colors.text}
      border-2 rounded-lg px-4 py-2 flex items-center gap-3
      backdrop-blur-sm bg-opacity-90 shadow-lg
    `}>
      {icon && (
        <div className={`${colors.iconBg} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}>
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-xs opacity-80">{getLabel()}</span>
        <span className="text-xl font-bold">{value}</span>
      </div>
    </div>
  );
}

