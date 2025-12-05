/**
 * Character Definitions
 * Defines characters that appear in the game
 */

export const CHARACTERS = {
  'it-staff': {
    id: 'it-staff',
    name: 'Équipe IT',
    description: 'Le personnel technique de l\'école',
    portrait: null, // Placeholder for future image
  },
  'teacher-1': {
    id: 'teacher-1',
    name: 'Mme. Dubois',
    description: 'Enseignante expérimentée, résistante au changement',
    portrait: null,
  },
  'teacher-2': {
    id: 'teacher-2',
    name: 'M. Martin',
    description: 'Enseignant technophile, ouvert aux nouvelles solutions',
    portrait: null,
  },
  'big-tech-agent': {
    id: 'big-tech-agent',
    name: 'Agent TechCorp',
    description: 'Représentant d\'une grande entreprise technologique',
    portrait: null,
  },
  'student-leader': {
    id: 'student-leader',
    name: 'Léa',
    description: 'Étudiante leader du club de codage',
    portrait: null,
  },
  'parent-rep': {
    id: 'parent-rep',
    name: 'M. Parent',
    description: 'Représentant des parents d\'élèves',
    portrait: null,
  },
};

/**
 * Get character by ID
 */
export function getCharacter(id) {
  return CHARACTERS[id] || null;
}


