/**
 * Dialog Scenarios
 * NIRD-themed interactive dialogue scenarios for door interactions
 */

export const dialogScenarios = [
  {
    id: 'obsolescence-windows10',
    title: 'Alerte Obsolescence',
    description: 'Un ordinateur dans la salle 103 ne fonctionne plus car Windows 10 n\'est plus supporté. Que faites-vous ?',
    choices: [
      {
        id: 'bigtech',
        text: 'Acheter un nouvel ordinateur sous licence',
        cost: { licencesLibres: -20 },
        reward: { autonomy: -5 },
        description: 'Solution rapide mais coûteuse et non durable',
        isNird: false
      },
      {
        id: 'nird',
        text: 'Réinstaller avec Linux et pièces de réemploi',
        cost: { reemploi: -5, competence: -3 },
        reward: { autonomy: +10 },
        description: 'Solution durable et autonome',
        isNird: true
      }
    ]
  },
  {
    id: 'logiciel-proprietaire',
    title: 'Demande Logiciel Propriétaire',
    description: 'Un enseignant demande l\'achat d\'une licence Microsoft Office pour toute l\'école. Comment réagissez-vous ?',
    choices: [
      {
        id: 'acheter',
        text: 'Acheter les licences demandées',
        cost: { licencesLibres: -30 },
        reward: { autonomy: -10 },
        description: 'Coûteux et crée une dépendance',
        isNird: false
      },
      {
        id: 'libreoffice',
        text: 'Proposer LibreOffice et former les enseignants',
        cost: { competence: -5 },
        reward: { autonomy: +15, competence: +3 },
        description: 'Économique et renforce les compétences',
        isNird: true
      }
    ]
  },
  {
    id: 'breche-securite',
    title: 'Brèche de Sécurité / Données',
    description: 'Une alerte de sécurité indique que les données des élèves sont stockées sur un serveur hors UE. Que faites-vous ?',
    choices: [
      {
        id: 'ignorer',
        text: 'Ignorer l\'alerte pour l\'instant',
        cost: {},
        reward: { autonomy: -5 },
        description: 'Risque pour la vie privée',
        isNird: false
      },
      {
        id: 'migrer',
        text: 'Migrer vers un serveur local avec logiciels libres',
        cost: { competence: -8, reemploi: -5 },
        reward: { autonomy: +20, licencesLibres: +5 },
        description: 'Protection des données et autonomie',
        isNird: true
      }
    ]
  },
  {
    id: 'tablettes-obsoletes',
    title: 'Tablettes Obsolètes',
    description: 'Les tablettes de l\'école sont trop lentes et ne supportent plus les mises à jour. Quelle solution choisissez-vous ?',
    choices: [
      {
        id: 'remplacer',
        text: 'Remplacer toutes les tablettes par des modèles récents',
        cost: { licencesLibres: -40 },
        reward: { autonomy: -15 },
        description: 'Coûteux et non durable',
        isNird: false
      },
      {
        id: 'reconditionner',
        text: 'Reconditionner avec Linux et optimiser',
        cost: { reemploi: -10, competence: -5 },
        reward: { autonomy: +15, reemploi: +5 },
        description: 'Durabilité et économie',
        isNird: true
      }
    ]
  },
  {
    id: 'cloud-proprietaire',
    title: 'Dépendance au Cloud Propriétaire',
    description: 'L\'école utilise un service cloud propriétaire pour le stockage. Le contrat arrive à échéance. Que faites-vous ?',
    choices: [
      {
        id: 'renouveler',
        text: 'Renouveler le contrat cloud propriétaire',
        cost: { licencesLibres: -25 },
        reward: { autonomy: -8 },
        description: 'Continuation de la dépendance',
        isNird: false
      },
      {
        id: 'nextcloud',
        text: 'Migrer vers Nextcloud auto-hébergé',
        cost: { competence: -6, reemploi: -3 },
        reward: { autonomy: +18, licencesLibres: +8 },
        description: 'Autonomie numérique totale',
        isNird: true
      }
    ]
  }
];

/**
 * Get a random scenario
 */
export function getRandomScenario() {
  return dialogScenarios[Math.floor(Math.random() * dialogScenarios.length)];
}

/**
 * Get a scenario by ID
 */
export function getScenarioById(id) {
  return dialogScenarios.find(scenario => scenario.id === id);
}

