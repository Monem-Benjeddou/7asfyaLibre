/**
 * Ending Definitions
 * Detailed information about each ending type
 */

import { ENDING_TYPES } from '../game/Endings';

export const ENDINGS = {
  [ENDING_TYPES.GREEN]: {
    id: ENDING_TYPES.GREEN,
    title: "Le Village Résistant",
    subtitle: "Fin Verte",
    description: "Hafsia Academy est devenue un modèle d'indépendance technologique.",
    requirements: {
      inclusivity: 70,
      responsibility: 70,
      sustainability: 70,
      bigTechDependence: 30,
    },
  },
  [ENDING_TYPES.YELLOW]: {
    id: ENDING_TYPES.YELLOW,
    title: "L'École Hybride",
    subtitle: "Fin Jaune",
    description: "L'école fonctionne, mais n'est pas exemplaire.",
    requirements: {
      // Balanced metrics, default ending
    },
  },
  [ENDING_TYPES.RED]: {
    id: ENDING_TYPES.RED,
    title: "Big Tech Academy",
    subtitle: "Fin Rouge",
    description: "L'école est maintenant sous le contrôle des grandes entreprises technologiques.",
    requirements: {
      bigTechDependence: 70,
    },
  },
  [ENDING_TYPES.SECRET]: {
    id: ENDING_TYPES.SECRET,
    title: "Héros Numérique",
    subtitle: "Fin Secrète",
    description: "Vous avez créé un modèle national d'excellence.",
    requirements: {
      inclusivity: 80,
      responsibility: 80,
      sustainability: 80,
      bigTechDependence: 20,
    },
  },
};

