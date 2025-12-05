/**
 * Ending System
 * Calculates and determines game endings based on final metrics
 */

export const ENDING_TYPES = {
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
  SECRET: 'secret',
};

/**
 * Calculate ending based on metrics
 * @param {Object} metrics - Final metrics object
 * @returns {Object} Ending information
 */
export function calculateEnding(metrics) {
  const {
    inclusivity,
    responsibility,
    sustainability,
    bigTechDependence,
  } = metrics;

  // Secret Ending: Perfect balance
  if (
    inclusivity >= 80 &&
    responsibility >= 80 &&
    sustainability >= 80 &&
    bigTechDependence <= 20
  ) {
    return {
      type: ENDING_TYPES.SECRET,
      title: "Héros Numérique",
      description: "Vous avez créé un modèle national. Hafsia Academy est devenue une référence en matière d'indépendance technologique, de durabilité et d'inclusion. Votre approche équilibrée a inspiré d'autres écoles à travers le pays.",
      cinematic: "Une cérémonie nationale célèbre votre réussite. Des représentants du ministère de l'éducation visitent votre école. Les médias parlent de la 'Résistance Digitale' comme d'un mouvement national.",
    };
  }

  // Green Ending: High positive metrics, low Big Tech dependence
  if (
    inclusivity >= 70 &&
    responsibility >= 70 &&
    sustainability >= 70 &&
    bigTechDependence <= 30
  ) {
    return {
      type: ENDING_TYPES.GREEN,
      title: "Le Village Résistant",
      description: "Hafsia Academy est devenue un modèle d'indépendance technologique. L'école fonctionne avec des solutions open-source, respecte la vie privée des étudiants, et maintient un budget équilibré. La communauté est fière de votre école.",
      cinematic: "L'école prospère avec des solutions durables. Les enseignants sont satisfaits, les étudiants s'épanouissent, et la communauté vous soutient. Vous avez créé un véritable 'village résistant' contre le Big Tech.",
    };
  }

  // Red Ending: High Big Tech dependence
  if (bigTechDependence >= 70) {
    return {
      type: ENDING_TYPES.RED,
      title: "Big Tech Academy",
      description: "Hafsia Academy est maintenant entièrement sous le contrôle des grandes entreprises technologiques. Les coûts de licence s'accumulent, les données des étudiants sont collectées, et l'école a perdu son indépendance. Le budget est épuisé.",
      cinematic: "Des agents Big Tech parcourent les couloirs. Les enseignants sont frustrés par les restrictions. Les étudiants se sentent surveillés. L'école que vous dirigiez n'est plus vraiment vôtre.",
    };
  }

  // Yellow Ending: Balanced but not exceptional
  return {
    type: ENDING_TYPES.YELLOW,
    title: "L'École Hybride",
    description: "Hafsia Academy fonctionne, mais n'est pas exemplaire. Vous avez fait des compromis entre solutions propriétaires et open-source. L'école survit, mais n'excelle pas. Certains enseignants sont satisfaits, d'autres non.",
    cinematic: "L'école continue de fonctionner avec un mélange de solutions. Certains jours sont meilleurs que d'autres. Vous avez évité le pire, mais n'avez pas créé le meilleur. La route vers l'indépendance est encore longue.",
  };
}

/**
 * Get ending color class for styling
 */
export function getEndingColorClass(type) {
  const colors = {
    [ENDING_TYPES.GREEN]: 'text-game-green',
    [ENDING_TYPES.YELLOW]: 'text-game-yellow',
    [ENDING_TYPES.RED]: 'text-game-red',
    [ENDING_TYPES.SECRET]: 'text-purple-400',
  };
  return colors[type] || 'text-gray-400';
}


