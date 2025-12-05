/**
 * Chapter Data Structure
 * Defines all chapters with dialogues, choices, and effects
 */

export const CHAPTERS = {
  'chapter-1': {
    id: 'chapter-1',
    title: "L'Ordinateur Fatigué",
    cinematic: {
      description: "Vous entrez dans la salle informatique de Hafsia Academy. Trente ordinateurs anciens s'alignent le long des murs, leurs écrans clignotent faiblement. Des câbles poussiéreux s'entremêlent sur le sol. Le personnel IT vous regarde avec inquiétude.",
      background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 50%, #1a2a3a 100%)',
      characters: ['it-staff'],
    },
    dialogues: [
      {
        id: 'dialogue-1',
        speaker: 'it-staff',
        text: "Bienvenue, Directeur. Comme vous pouvez le voir, notre équipement est en fin de vie. Les ordinateurs ont plus de 10 ans, les écrans clignotent, et les mises à jour Windows ne fonctionnent plus correctement. Nous devons prendre une décision rapidement.",
        portrait: null,
      },
      {
        id: 'dialogue-2',
        speaker: 'it-staff',
        text: "Que devrions-nous faire ? Acheter de nouveaux PC avec Windows, migrer vers Linux, ou essayer de réparer certains ordinateurs ?",
        portrait: null,
      },
    ],
    choices: [
      {
        id: 'choice-1',
        text: "Acheter de nouveaux PC avec Windows",
        effects: {
          sustainability: -20,
          bigTechDependence: +15,
          responsibility: -5,
        },
        relationshipChanges: {
          teachers: +5, // Teachers happy with familiar system
          students: 0,
        },
        nextDialogue: 'dialogue-3a',
        consequences: {
          budget: -5000,
          message: "Vous avez dépensé une grande partie du budget. Les enseignants sont satisfaits, mais l'école dépend maintenant davantage de Microsoft.",
        },
      },
      {
        id: 'choice-2',
        text: "Installer Linux sur les ordinateurs existants",
        effects: {
          sustainability: +20,
          bigTechDependence: -15,
          responsibility: +10,
          inclusivity: -10, // Some teachers may resist
        },
        relationshipChanges: {
          teachers: -10, // Some teachers worried about learning curve
          students: +5,
        },
        nextDialogue: 'dialogue-3b',
        consequences: {
          budget: -500,
          message: "Vous avez économisé de l'argent et réduit la dépendance au Big Tech, mais certains enseignants sont inquiets.",
        },
      },
      {
        id: 'choice-3',
        text: "Réparer certains PC et installer Linux progressivement",
        effects: {
          sustainability: +10,
          bigTechDependence: -5,
          inclusivity: -5,
        },
        relationshipChanges: {
          teachers: -5,
          students: +3,
        },
        nextDialogue: 'dialogue-3c',
        consequences: {
          budget: -1000,
          message: "Approche équilibrée : vous économisez de l'argent tout en préparant la transition.",
        },
      },
    ],
    followUpDialogues: {
      'dialogue-3a': {
        id: 'dialogue-3a',
        speaker: 'it-staff',
        text: "Très bien. Nous allons commander les nouveaux PC. Cela résoudra les problèmes immédiats, mais le budget sera serré pour le reste de l'année.",
        portrait: null,
      },
      'dialogue-3b': {
        id: 'dialogue-3b',
        speaker: 'it-staff',
        text: "Excellente décision. Linux est gratuit et fonctionne bien sur du matériel ancien. Nous devrons former les enseignants, mais c'est un investissement pour l'avenir.",
        portrait: null,
      },
      'dialogue-3c': {
        id: 'dialogue-3c',
        speaker: 'it-staff',
        text: "Approche prudente. Nous réparerons ce qui peut l'être et migrerons progressivement. Cela donnera le temps aux enseignants de s'adapter.",
        portrait: null,
      },
    },
    nextChapter: 'chapter-2',
  },
  'chapter-2': {
    id: 'chapter-2',
    title: "Le Cloud Mûr",
    cinematic: {
      description: "Quelques semaines plus tard, vous assistez à une réunion dans la salle des professeurs. Les enseignants discutent avec animation. Des papiers sont éparpillés sur les tables. Soudain, un homme en costume élégant entre - c'est un agent d'une grande entreprise technologique.",
      background: 'linear-gradient(135deg, #2d1b3d 0%, #3d2b4d 50%, #1a0f2e 100%)',
      characters: ['teacher-1', 'teacher-2', 'big-tech-agent'],
    },
    dialogues: [
      {
        id: 'dialogue-1',
        speaker: 'teacher-1',
        text: "Directeur, nous avons un problème. Nous utilisons Google Drive pour partager les documents, mais nous sommes préoccupés par le RGPD et la vie privée des étudiants.",
        portrait: null,
      },
      {
        id: 'dialogue-2',
        speaker: 'teacher-2',
        text: "Oui, et les coûts commencent à s'accumuler. Certains d'entre nous pensent qu'il serait mieux d'héberger nos propres serveurs.",
        portrait: null,
      },
      {
        id: 'dialogue-3',
        speaker: 'big-tech-agent',
        text: "Bonjour ! J'ai entendu parler de vos préoccupations. TechCorp peut vous offrir un espace cloud gratuit avec toutes les fonctionnalités dont vous avez besoin. Il suffit de signer cet accord de partage de données...",
        portrait: null,
      },
    ],
    choices: [
      {
        id: 'choice-1',
        text: "Garder Google Drive (solution simple)",
        effects: {
          bigTechDependence: +20,
          responsibility: -15,
          inclusivity: +5, // Easy for teachers
        },
        relationshipChanges: {
          teachers: +5,
          community: -10, // Parents worried about privacy
        },
        nextDialogue: 'dialogue-4a',
        conditions: {
          // Available if previous choice was Windows
          previousChoices: [
            { chapterId: 'chapter-1', choiceId: 'choice-1' },
          ],
        },
      },
      {
        id: 'choice-2',
        text: "Héberger Nextcloud localement",
        effects: {
          sustainability: +15,
          bigTechDependence: -20,
          responsibility: +15,
          inclusivity: -10, // Requires learning
        },
        relationshipChanges: {
          teachers: -10,
          students: +10,
          community: +10,
        },
        nextDialogue: 'dialogue-4b',
        conditions: {
          // Easier if Linux was chosen
          previousChoices: [
            { chapterId: 'chapter-1', choiceId: 'choice-2' },
          ],
        },
      },
      {
        id: 'choice-3',
        text: "Hébergement partagé avec d'autres écoles",
        effects: {
          sustainability: +10,
          bigTechDependence: -10,
          responsibility: +10,
          inclusivity: -5,
        },
        relationshipChanges: {
          teachers: -5,
          community: +5,
        },
        nextDialogue: 'dialogue-4c',
      },
      {
        id: 'choice-4',
        text: "Refuser l'offre Big Tech et chercher une alternative",
        effects: {
          bigTechDependence: -15,
          responsibility: +10,
          sustainability: +5,
        },
        relationshipChanges: {
          teachers: -5,
          community: +10,
          bigTechAgents: -20,
        },
        nextDialogue: 'dialogue-4d',
      },
    ],
    followUpDialogues: {
      'dialogue-4a': {
        id: 'dialogue-4a',
        speaker: 'teacher-1',
        text: "C'est pratique, mais je me demande si nous faisons le bon choix pour nos étudiants...",
        portrait: null,
      },
      'dialogue-4b': {
        id: 'dialogue-4b',
        speaker: 'teacher-2',
        text: "Excellente décision ! Nous contrôlons nos données et nous apprenons ensemble. C'est un investissement pour l'avenir.",
        portrait: null,
      },
      'dialogue-4c': {
        id: 'dialogue-4c',
        speaker: 'teacher-1',
        text: "Une solution de compromis. Nous partageons les coûts et les responsabilités avec d'autres écoles. C'est raisonnable.",
        portrait: null,
      },
      'dialogue-4d': {
        id: 'dialogue-4d',
        speaker: 'big-tech-agent',
        text: "Très bien... mais sachez que vous manquez une opportunité. Si vous changez d'avis, nous serons là. *Il sort avec un sourire froid*",
        portrait: null,
      },
    },
    nextChapter: null, // End of game for now
  },
};

/**
 * Get chapter by ID
 */
export function getChapter(id) {
  return CHAPTERS[id] || null;
}

/**
 * Get all chapters
 */
export function getAllChapters() {
  return Object.values(CHAPTERS);
}


