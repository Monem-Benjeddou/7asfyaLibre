/**
 * Conversations
 * NIRD-themed conversations between player and NPCs
 * Undertale-style: player on left, NPC on right
 */

export const conversations = [
  {
    id: 'obsolescence-windows10',
    title: 'Conversation avec le Professeur',
    speaker: 'Professeur',
    introducesItem: 'livre', // Introduces Livre de Compétence
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur ! Je vois que vous inspectez notre école numérique.'
      },
      {
        speaker: 'player',
        text: 'Bonjour. En effet, je souhaite m\'assurer que notre établissement respecte bien les principes du NIRD.'
      },
      {
        speaker: 'npc',
        text: 'Excellente initiative ! Le NIRD, c\'est notre engagement pour un Numérique Inclusif, Responsable et Durable.'
      },
      {
        speaker: 'player',
        text: 'Pouvez-vous me détailler ce que signifie concrètement "Inclusif" dans notre contexte scolaire ?'
      },
      {
        speaker: 'npc',
        text: 'Bien sûr, Monsieur le Directeur. L\'inclusion numérique signifie que nous donnons à tous - élèves, enseignants, personnel - les moyens de maîtriser le numérique.'
      },
      {
        speaker: 'npc',
        text: 'Dans notre établissement, nous formons systématiquement aux logiciels libres. C\'est un choix pédagogique et éthique qui permet à chacun d\'apprendre et de contribuer.'
      },
      {
        speaker: 'player',
        text: 'Comment cela se traduit-il dans la pratique quotidienne ?'
      },
      {
        speaker: 'npc',
        text: 'Nous avons remplacé les logiciels propriétaires coûteux par des alternatives libres : LibreOffice pour la bureautique, GIMP pour l\'image, Blender pour la 3D.'
      },
      {
        speaker: 'npc',
        text: 'Ces outils sont non seulement gratuits, mais ils permettent à nos élèves de comprendre, modifier et partager. C\'est l\'essence même de l\'inclusion numérique.'
      },
      {
        speaker: 'npc',
        text: 'Sur votre chemin, vous trouverez des Livres de Compétence. Ils représentent le savoir partagé et les compétences numériques que nous transmettons. Chaque livre collecté renforce notre inclusion numérique.'
      },
      {
        speaker: 'player',
        text: 'Très bien. Je vais continuer mon inspection pour évaluer l\'ensemble de notre démarche NIRD.'
      },
      {
        speaker: 'npc',
        text: 'Parfait, Monsieur le Directeur. N\'hésitez pas si vous avez d\'autres questions sur nos pratiques pédagogiques.'
      }
    ]
  },
  {
    id: 'logiciel-proprietaire',
    title: 'Conversation avec le Technicien',
    speaker: 'Technicien',
    introducesItem: 'badge', // Introduces Badge d'Autonomie
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur ! Vous vous intéressez à notre atelier de reconditionnement ?'
      },
      {
        speaker: 'player',
        text: 'Oui, je souhaite comprendre comment nous appliquons le principe de durabilité dans notre établissement.'
      },
      {
        speaker: 'npc',
        text: 'La durabilité est le deuxième pilier du NIRD. Nous prolongeons systématiquement la vie de nos équipements numériques.'
      },
      {
        speaker: 'player',
        text: 'Quelle est votre méthode pour prolonger la durée de vie de nos équipements ?'
      },
      {
        speaker: 'npc',
        text: 'Le réemploi est notre priorité, Monsieur le Directeur. Au lieu de jeter un ordinateur obsolète, nous le reconditionnons avec Linux.'
      },
      {
        speaker: 'npc',
        text: 'Un ordinateur de 10 ans fonctionne parfaitement avec Linux et des logiciels libres. C\'est beaucoup plus léger et performant que les systèmes propriétaires récents.'
      },
      {
        speaker: 'player',
        text: 'C\'est effectivement une approche écologique et économique.'
      },
      {
        speaker: 'npc',
        text: 'Exactement ! Le réemploi réduit nos déchets électroniques et optimise notre budget. C\'est bénéfique pour l\'environnement et nos finances.'
      },
      {
        speaker: 'npc',
        text: 'Notre atelier de reconditionnement forme également les élèves. Ils apprennent à réparer et à donner une seconde vie aux machines. C\'est une compétence précieuse.'
      },
      {
        speaker: 'npc',
        text: 'L\'autonomie numérique, c\'est aussi maîtriser nos outils. Vous trouverez des Badges d\'Autonomie sur votre chemin - ils représentent notre indépendance technologique et notre engagement pour les licences libres.'
      },
      {
        speaker: 'player',
        text: 'Excellente initiative pédagogique. Je vais noter cela dans mon rapport.'
      },
      {
        speaker: 'npc',
        text: 'Merci, Monsieur le Directeur. Chaque appareil reconditionné, c\'est un pas de plus vers notre autonomie numérique.'
      }
    ]
  },
  {
    id: 'formation-logiciels-libres',
    title: 'Conversation avec l\'Enseignant',
    speaker: 'Enseignant',
    introducesItem: 'ordinateur', // Introduces Ordinateur Reconditionné
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur ! Vous visitez nos salles de classe ?'
      },
      {
        speaker: 'player',
        text: 'Oui, je souhaite voir comment les logiciels libres sont intégrés dans l\'enseignement.'
      },
      {
        speaker: 'npc',
        text: 'C\'est un aspect fondamental de notre approche NIRD. Nous enseignons avec des outils que les élèves peuvent utiliser chez eux gratuitement.'
      },
      {
        speaker: 'player',
        text: 'Quels sont les avantages pédagogiques de cette approche ?'
      },
      {
        speaker: 'npc',
        text: 'Les élèves développent de vraies compétences numériques, pas juste la maîtrise d\'un logiciel propriétaire. Ils comprennent comment fonctionnent les outils.'
      },
      {
        speaker: 'npc',
        text: 'De plus, cela réduit les inégalités : tous les élèves ont accès aux mêmes outils, même à la maison.'
      },
      {
        speaker: 'npc',
        text: 'Notre atelier de reconditionnement est un exemple parfait. Nous transformons de vieux ordinateurs en machines performantes avec Linux. Vous verrez des Ordinateurs Reconditionnés sur votre parcours - ils symbolisent notre engagement pour la durabilité.'
      },
      {
        speaker: 'player',
        text: 'Excellente approche. Je note cela dans mon rapport.'
      }
    ]
  },
  {
    id: 'atelier-reparation',
    title: 'Conversation avec l\'Élève',
    speaker: 'Élève',
    introducesItem: 'bloc', // Introduces interactive NIRD blocks
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur !'
      },
      {
        speaker: 'player',
        text: 'Bonjour. Que fais-tu ici ?'
      },
      {
        speaker: 'npc',
        text: 'Je participe à l\'atelier de réparation ! On apprend à reconditionner les ordinateurs.'
      },
      {
        speaker: 'player',
        text: 'C\'est intéressant. Qu\'as-tu appris ?'
      },
      {
        speaker: 'npc',
        text: 'J\'ai appris à installer Linux et à réparer des ordinateurs. C\'est super ! On donne une seconde vie aux machines.'
      },
      {
        speaker: 'npc',
        text: 'Et en plus, c\'est bon pour l\'environnement. On ne jette plus les ordinateurs !'
      },
      {
        speaker: 'npc',
        text: 'Dans l\'atelier, on utilise des blocs interactifs pour apprendre. Vous verrez des Blocs NIRD sur votre parcours - sautez dessus pour découvrir des ressources cachées !'
      },
      {
        speaker: 'player',
        text: 'Très bien. Continue comme ça, c\'est une excellente initiative.'
      }
    ]
  },
  {
    id: 'serveur-local',
    title: 'Conversation avec l\'Administrateur',
    speaker: 'Administrateur',
    introducesItem: null, // Final conversation, no new items
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur. Vous inspectez notre infrastructure numérique ?'
      },
      {
        speaker: 'player',
        text: 'Oui, je souhaite comprendre comment nous gérons nos données.'
      },
      {
        speaker: 'npc',
        text: 'Nous avons migré vers un serveur local avec des logiciels libres. Toutes nos données restent dans l\'établissement.'
      },
      {
        speaker: 'player',
        text: 'Pourquoi ce choix plutôt qu\'un service cloud ?'
      },
      {
        speaker: 'npc',
        text: 'C\'est plus sûr pour les données des élèves, et cela nous donne une vraie autonomie. Plus de dépendance aux grandes entreprises !'
      },
      {
        speaker: 'npc',
        text: 'C\'est le troisième pilier du NIRD : la responsabilité. Nous maîtrisons nos outils et nos données.'
      },
      {
        speaker: 'npc',
        text: 'Votre inspection est presque terminée, Monsieur le Directeur. Le drapeau NIRD vous attend au bout du couloir. Il symbolise notre engagement complet pour un numérique inclusif, responsable et durable.'
      },
      {
        speaker: 'player',
        text: 'Parfait. C\'est exactement le type d\'initiative que je souhaite promouvoir.'
      }
    ]
  },
  // Level 2 Conversations - Server Room Theme
  {
    id: 'serveur-souverainete',
    title: 'Conversation avec l\'Administrateur Système',
    speaker: 'Administrateur Système',
    introducesItem: 'serveur', // Introduces Serveur Local
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur ! Vous visitez notre salle serveur ?'
      },
      {
        speaker: 'player',
        text: 'Oui, je souhaite comprendre notre infrastructure de données.'
      },
      {
        speaker: 'npc',
        text: 'Excellente question ! La souveraineté des données est fondamentale pour le NIRD.'
      },
      {
        speaker: 'player',
        text: 'Qu\'entendez-vous par souveraineté des données ?'
      },
      {
        speaker: 'npc',
        text: 'C\'est le fait que nos données restent sous notre contrôle total. Toutes les données de l\'école sont stockées sur nos serveurs locaux, pas dans le cloud d\'une entreprise étrangère.'
      },
      {
        speaker: 'player',
        text: 'Quels sont les avantages de cette approche ?'
      },
      {
        speaker: 'npc',
        text: 'D\'abord, la sécurité : nos données ne transitent pas par des serveurs externes. Ensuite, l\'autonomie : nous ne dépendons pas d\'un service qui peut changer ses conditions ou ses prix.'
      },
      {
        speaker: 'npc',
        text: 'Enfin, la conformité : nous respectons le RGPD en gardant les données des élèves sur notre territoire.'
      },
      {
        speaker: 'npc',
        text: 'Sur votre chemin dans cette salle serveur, vous trouverez des Serveurs Locaux. Chaque serveur collecté représente notre infrastructure autonome et notre maîtrise des données.'
      },
      {
        speaker: 'player',
        text: 'Très bien. Je vais continuer mon inspection.'
      }
    ]
  },
  {
    id: 'technicien-reseau',
    title: 'Conversation avec le Technicien Réseau',
    speaker: 'Technicien Réseau',
    introducesItem: null, // Expands on network infrastructure
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur ! Vous inspectez notre réseau ?'
      },
      {
        speaker: 'player',
        text: 'Oui, je souhaite comprendre comment notre réseau est configuré.'
      },
      {
        speaker: 'npc',
        text: 'Notre réseau est entièrement basé sur des solutions libres. Nous utilisons des routeurs et des switchs configurés avec des logiciels open source.'
      },
      {
        speaker: 'player',
        text: 'Pourquoi ce choix plutôt que des équipements propriétaires ?'
      },
      {
        speaker: 'npc',
        text: 'Les solutions libres nous donnent un contrôle total. Nous pouvons auditer le code, le modifier si nécessaire, et nous ne sommes pas liés à un fournisseur unique.'
      },
      {
        speaker: 'npc',
        text: 'De plus, c\'est plus économique et plus sécurisé : la communauté open source identifie et corrige les failles rapidement.'
      },
      {
        speaker: 'player',
        text: 'Excellente approche. Je note cela dans mon rapport.'
      }
    ]
  },
  {
    id: 'protection-donnees',
    title: 'Conversation avec le Responsable Protection des Données',
    speaker: 'Responsable Protection',
    introducesItem: null, // Expands on data protection
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur ! Vous vous intéressez à la protection des données ?'
      },
      {
        speaker: 'player',
        text: 'Oui, c\'est un aspect crucial du NIRD.'
      },
      {
        speaker: 'npc',
        text: 'Absolument ! La protection des données est au cœur de notre responsabilité numérique.'
      },
      {
        speaker: 'player',
        text: 'Comment garantissez-vous la protection des données des élèves ?'
      },
      {
        speaker: 'npc',
        text: 'Toutes nos données sont chiffrées, sauvegardées régulièrement, et stockées uniquement sur nos serveurs locaux. Nous n\'utilisons aucun service cloud externe.'
      },
      {
        speaker: 'npc',
        text: 'Nous avons également mis en place des politiques strictes d\'accès et des audits réguliers. Chaque accès est tracé.'
      },
      {
        speaker: 'player',
        text: 'C\'est rassurant. Merci pour ces précisions.'
      }
    ]
  },
  {
    id: 'logiciel-libre-avance',
    title: 'Conversation avec le Développeur',
    speaker: 'Développeur',
    introducesItem: null, // Expands on advanced free software
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur ! Vous visitez notre infrastructure de développement ?'
      },
      {
        speaker: 'player',
        text: 'Oui, je souhaite comprendre comment nous développons nos outils.'
      },
      {
        speaker: 'npc',
        text: 'Tous nos outils de développement sont libres : Git pour le versionnement, des IDE open source, et des frameworks libres.'
      },
      {
        speaker: 'player',
        text: 'Quels sont les avantages de cette approche pour l\'école ?'
      },
      {
        speaker: 'npc',
        text: 'Cela permet à nos élèves de développer des compétences transférables. Ils apprennent avec les mêmes outils qu\'ils utiliseront dans leur carrière, sans dépendre de licences coûteuses.'
      },
      {
        speaker: 'npc',
        text: 'De plus, nous contribuons à l\'écosystème du logiciel libre en partageant nos développements.'
      },
      {
        speaker: 'player',
        text: 'Excellente initiative pédagogique.'
      }
    ]
  },
  {
    id: 'infrastructure-autonome',
    title: 'Conversation avec l\'Ingénieur Infrastructure',
    speaker: 'Ingénieur Infrastructure',
    introducesItem: null, // Expands on autonomous infrastructure
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur ! Vous inspectez notre infrastructure complète ?'
      },
      {
        speaker: 'player',
        text: 'Oui, je souhaite avoir une vue d\'ensemble de notre autonomie numérique.'
      },
      {
        speaker: 'npc',
        text: 'Notre infrastructure est entièrement autonome. Nous avons nos propres serveurs, notre propre réseau, et nos propres outils de gestion.'
      },
      {
        speaker: 'player',
        text: 'Comment cela se traduit-il concrètement ?'
      },
      {
        speaker: 'npc',
        text: 'Nous ne dépendons d\'aucun service externe pour nos données critiques. Même en cas de panne internet, notre réseau local continue de fonctionner.'
      },
      {
        speaker: 'npc',
        text: 'C\'est l\'essence de l\'autonomie numérique : maîtriser notre infrastructure de A à Z.'
      },
      {
        speaker: 'player',
        text: 'C\'est impressionnant. Je vais noter cela dans mon rapport.'
      }
    ]
  },
  {
    id: 'final-nird',
    title: 'Conversation Finale - Vision NIRD',
    speaker: 'Directeur Technique',
    introducesItem: null, // Final conversation
    messages: [
      {
        speaker: 'npc',
        text: 'Bonjour Monsieur le Directeur ! Votre inspection touche à sa fin.'
      },
      {
        speaker: 'player',
        text: 'Oui, j\'ai pu constater l\'excellence de notre mise en œuvre du NIRD.'
      },
      {
        speaker: 'npc',
        text: 'Notre école est un modèle de Numérique Inclusif, Responsable et Durable. Nous avons réussi à créer un écosystème numérique complet et autonome.'
      },
      {
        speaker: 'player',
        text: 'Quels sont les résultats concrets de cette approche ?'
      },
      {
        speaker: 'npc',
        text: 'Nos élèves maîtrisent les outils libres, notre budget est optimisé, nos données sont sécurisées, et nous réduisons notre impact environnemental.'
      },
      {
        speaker: 'npc',
        text: 'Le drapeau NIRD vous attend au bout de cette salle serveur. Il symbolise notre engagement complet et notre réussite dans cette démarche.'
      },
      {
        speaker: 'player',
        text: 'Parfait. Cette inspection confirme que nous sommes sur la bonne voie.'
      },
      {
        speaker: 'npc',
        text: 'Merci, Monsieur le Directeur. Ensemble, nous construisons un numérique meilleur.'
      }
    ]
  }
];

/**
 * Get a conversation by ID
 */
export function getConversationById(id) {
  return conversations.find(conversation => conversation.id === id);
}

