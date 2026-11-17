export interface HeroLine {
  n: string;
  label: string;
}

export const HERO_LINES: readonly HeroLine[] = [
  { n: "01", label: "Service client & SAV" },
  { n: "02", label: "Assistance administrative" },
  { n: "03", label: "Développement commercial" },
  { n: "04", label: "Recrutement & RH" },
];

export const HERO_CHIPS: readonly string[] = ["HUMAN & AI", "CONTINUITÉ", "DEPUIS 2016"];

export interface Stat {
  target: number;
  suffix: string;
  label: string;
}

export const STATS: readonly Stat[] = [
  { target: 126, suffix: "", label: "conseillers francophones dédiés" },
  { target: 95, suffix: "%", label: "de satisfaction client moyenne" },
  { target: 4, suffix: "\u00A0ans", label: "d’ancienneté moyenne des équipes" },
  { target: 97, suffix: "%", label: "de rétention des conseillers" },
  { target: 12, suffix: "\u00A0M", label: "d’interactions traitées par an" },
  { target: 500, suffix: "", label: "missions pilotées depuis 2016" },
];

export interface ProcessStep {
  n: string;
  title: string;
  text: string;
}

export const PROCESS_STEPS: readonly ProcessStep[] = [
  { n: "01", title: "Cadrage", text: "Nous clarifions vos enjeux, vos volumes et vos indicateurs de réussite." },
  { n: "02", title: "Recrutement", text: "Sélection de conseillers francophones alignés avec votre métier." },
  { n: "03", title: "Formation", text: "Immersion produit, culture et outils, validée par vos équipes." },
  { n: "04", title: "Lancement pilote", text: "Démarrage sur un périmètre restreint avec un suivi quotidien." },
  { n: "05", title: "Montée en charge", text: "Déploiement progressif, encadrement et coaching continus." },
  { n: "06", title: "Amélioration continue", text: "Revues mensuelles, plans d’action et optimisation par l’IA." },
];

export interface TimelineStat {
  target: number;
  suffix: string;
  label: string;
}

export const TIMELINE_STATS: readonly TimelineStat[] = [
  { target: 1, suffix: "\u00A0mois", label: "pour être opérationnel" },
  { target: 3, suffix: "\u00A0h", label: "pour obtenir votre devis" },
  { target: 6, suffix: "\u00A0étapes", label: "claires et mesurables" },
];

export interface ConvergencePill {
  label: string;
  x: number;
  y: number;
  rotate: number;
}

export const CONVERGENCE_PILLS: readonly ConvergencePill[] = [
  { label: "Vos process", x: -120, y: -60, rotate: -6 },
  { label: "Votre culture", x: 120, y: -60, rotate: 6 },
  { label: "Vos supports", x: -120, y: 60, rotate: 6 },
];

export const AI_TRANSCRIPT: readonly string[] = [
  "Client : mon colis n’est pas là.",
  "Conseiller : je vérifie le dossier.",
  "Colis bloqué au tri depuis 3 j.",
  "Je relance le transporteur à 9 h.",
  "Client : parfait, merci !",
];

export const AI_SUMMARY: readonly string[] = [
  "Colis bloqué 3 jours au centre de tri",
  "Transporteur relancé par le conseiller",
  "Client rassuré, satisfaction positive",
];

export const AI_ACTIONS: readonly string[] = [
  "Relancer le transporteur avant 12 h",
  "Envoyer un suivi par e-mail au client",
  "Clôturer le ticket sous 48 h",
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    q: "En combien de temps une équipe dédiée peut-elle démarrer ?",
    a: "Comptez environ un mois entre le cadrage et le lancement pilote : recrutement, formation et paramétrage des outils sont menés en parallèle.",
  },
  {
    q: "Les conseillers sont-ils vraiment dédiés à mon activité ?",
    a: "Oui. Vos conseillers sont formés à votre métier, à votre ton et à vos process, et encadrés par un manager SPM qui pilote la qualité au quotidien.",
  },
  {
    q: "Comment l’IA s’intègre-t-elle au travail des équipes ?",
    a: "L’IA transcrit, résume et propose des points d’action. Les conseillers gardent la main : elle leur fait gagner du temps, jamais de place.",
  },
  {
    q: "Quels indicateurs pouvons-nous suivre ?",
    a: "Satisfaction, délais de traitement, taux de résolution au premier contact et qualité des échanges, accessibles dans un tableau de bord partagé.",
  },
  {
    q: "Peut-on ajuster les volumes en cours de contrat ?",
    a: "Les équipes sont modulables : montée en charge saisonnière, renfort ponctuel ou réduction de périmètre selon vos besoins.",
  },
  {
    q: "Comment garantissez-vous la confidentialité des données ?",
    a: "Accès restreints, postes sécurisés, formation RGPD obligatoire et clauses contractuelles strictes pour chaque mission.",
  },
];

export const QUOTE = {
  text: "With this team, we didn’t just outsource a service: we gained partners who understand our culture and protect the relationship with our clients.",
  author: "Jane Doe",
  role: "Operations Director, E-commerce Company",
};

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: "#metiers", label: "Métiers" },
  { href: "#simulateur", label: "Simulateur" },
  { href: "#methode", label: "Méthode" },
  { href: "#faq", label: "FAQ" },
];
