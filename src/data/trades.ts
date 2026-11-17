export interface Trade {
  id: string;
  category: string;
  title: string;
  text: string;
  stat: { value: string; label: string };
  href: string;
  linkLabel: string;
}

export const TRADES: readonly Trade[] = [
  {
    id: "service-client",
    category: "Relation client",
    title: "Service client",
    text: "Des conseillers francophones qui répondent par téléphone, e-mail et chat avec votre ton et vos exigences de qualité.",
    stat: { value: "95 %", label: "de satisfaction client" },
    href: "#contact",
    linkLabel: "Découvrir le service client",
  },
  {
    id: "sav",
    category: "Relation client",
    title: "SAV & réclamations",
    text: "Traitement des retours, suivi des litiges et résolution au premier contact pour protéger votre réputation.",
    stat: { value: "82 %", label: "résolus au premier contact" },
    href: "#contact",
    linkLabel: "Découvrir le SAV",
  },
  {
    id: "assistance-admin",
    category: "Back-office",
    title: "Assistance administrative",
    text: "Saisie, gestion de dossiers, relances de pièces et suivi des échéances par des équipes rigoureuses.",
    stat: { value: "48 h", label: "de délai moyen de traitement" },
    href: "#contact",
    linkLabel: "Découvrir l’assistance",
  },
  {
    id: "prospection",
    category: "Commercial",
    title: "Prospection téléphonique",
    text: "Qualification de leads, prise de rendez-vous et relance de prospects avec des scripts co-construits.",
    stat: { value: "x2,4", label: "de rendez-vous qualifiés" },
    href: "#contact",
    linkLabel: "Découvrir la prospection",
  },
  {
    id: "developpement-commercial",
    category: "Commercial",
    title: "Développement commercial",
    text: "Des télévendeurs et des commerciaux sédentaires qui font croître votre portefeuille client durablement.",
    stat: { value: "+28 %", label: "de chiffre d’affaires moyen" },
    href: "#contact",
    linkLabel: "Découvrir le développement",
  },
  {
    id: "recrutement",
    category: "Ressources humaines",
    title: "Recrutement",
    text: "Sourcing, présélection et entretiens : nous alimentons vos équipes en profils prêts à démarrer.",
    stat: { value: "21 j", label: "pour présenter les profils" },
    href: "#contact",
    linkLabel: "Découvrir le recrutement",
  },
  {
    id: "rh",
    category: "Ressources humaines",
    title: "Gestion RH & paie",
    text: "Administration du personnel, contrats, plannings et accompagnement des managers au quotidien.",
    stat: { value: "100 %", label: "de conformité réglementaire" },
    href: "#contact",
    linkLabel: "Découvrir la gestion RH",
  },
  {
    id: "formation",
    category: "Ressources humaines",
    title: "Formation & coaching",
    text: "Parcours d’intégration, montée en compétences et coaching qualité animés par des formateurs SPM.",
    stat: { value: "3 sem.", label: "d’intégration structurée" },
    href: "#contact",
    linkLabel: "Découvrir la formation",
  },
  {
    id: "moderation",
    category: "Digital",
    title: "Modération & réseaux sociaux",
    text: "Animation des communautés, modération des contenus et réponses aux avis en temps réel.",
    stat: { value: "7j/7", label: "de présence en ligne" },
    href: "#contact",
    linkLabel: "Découvrir la modération",
  },
  {
    id: "ia",
    category: "Human & AI",
    title: "Pilotage & IA conversationnelle",
    text: "Transcription, résumés et points d’action automatiques pour décupler la qualité d’analyse de chaque échange.",
    stat: { value: "-35 %", label: "de temps de post-appel" },
    href: "#contact",
    linkLabel: "Découvrir l’IA",
  },
];
