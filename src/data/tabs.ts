export interface TabCard {
  tag: string;
  title: string;
  text: string;
}

export interface TabData {
  id: string;
  label: string;
  cards: readonly TabCard[];
}

export const TABS: readonly TabData[] = [
  {
    id: "retail",
    label: "E-commerce",
    cards: [
      { tag: "Cas client", title: "Livraison & suivi de colis", text: "Réduction de 40 % des contacts entrants grâce à un suivi proactif." },
      { tag: "Cas client", title: "Retours & remboursements", text: "Un parcours de retour fluide qui préserve la fidélité des clients." },
      { tag: "Cas client", title: "Conseil avant-vente", text: "Des conseillers experts produits qui accompagnent chaque panier." },
      { tag: "Cas client", title: "Pics du Black Friday", text: "+60 conseillers mobilisés en 10 jours sans perte de qualité." },
      { tag: "Cas client", title: "Relance de paniers", text: "Récupération de 18 % des paniers abandonnés par appel et e-mail." },
    ],
  },
  {
    id: "services",
    label: "Services",
    cards: [
      { tag: "Cas client", title: "Assurance : gestion de sinistres", text: "Prise en charge en moins de 2 h avec un ton rassurant." },
      { tag: "Cas client", title: "Énergie : contrats & factures", text: "Un support dédié qui désamorce les litiges de facturation." },
      { tag: "Cas client", title: "Télécom : assistance technique", text: "Diagnostic guidé et résolution au premier contact dans 78 % des cas." },
      { tag: "Cas client", title: "Banque : onboarding clients", text: "Accompagnement pas à pas pour l’ouverture de compte." },
    ],
  },
  {
    id: "sante",
    label: "Santé",
    cards: [
      { tag: "Cas client", title: "Prise de rendez-vous", text: "Standard médical externalisé, ouvert 7j/7 avec rappel automatique." },
      { tag: "Cas client", title: "Suivi de patients", text: "Appels de suivi bienveillants menés par des équipes formées." },
      { tag: "Cas client", title: "Gestion administrative", text: "Dossiers, remboursements et pièces justificatives traités en 48 h." },
      { tag: "Cas client", title: "Téléassistance", text: "Une écoute attentive et une escalade claire vers les professionnels." },
      { tag: "Cas client", title: "Enquêtes de satisfaction", text: "Collecte et analyse d’avis pour améliorer le parcours patient." },
    ],
  },
  {
    id: "tech",
    label: "Tech & SaaS",
    cards: [
      { tag: "Cas client", title: "Support niveau 1", text: "Qualification et résolution des tickets avec base de connaissances partagée." },
      { tag: "Cas client", title: "Onboarding utilisateurs", text: "Des sessions de prise en main qui augmentent l’activation de 25 %." },
      { tag: "Cas client", title: "Succès client", text: "Suivi des comptes à risque et relances avant renouvellement." },
      { tag: "Cas client", title: "Prospection B2B", text: "Qualification de leads entrants et prise de démos commerciales." },
    ],
  },
];
