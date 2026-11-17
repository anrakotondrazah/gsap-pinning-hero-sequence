export interface Problem {
  id: string;
  category: string;
  title: string;
  text: string;
}

export const PROBLEMS: readonly Problem[] = [
  {
    id: "turnover",
    category: "Ressources",
    title: "Un turnover qui épuise vos équipes",
    text: "Recruter, former, remplacer : le cycle ne s’arrête jamais. Nous stabilisons vos effectifs avec des conseillers fidélisés.",
  },
  {
    id: "pics",
    category: "Volume",
    title: "Des pics d’activité impossibles à absorber",
    text: "Soldes, relances, incidents : nos équipes modulables absorbent les variations sans dégrader la qualité.",
  },
  {
    id: "couts",
    category: "Budget",
    title: "Des coûts fixes qui pèsent sur la marge",
    text: "Passez d’une charge fixe à un coût maîtrisé, aligné sur votre activité réelle et vos objectifs.",
  },
  {
    id: "qualite",
    category: "Qualité",
    title: "Une qualité de service inégale",
    text: "Écoutes, coaching et indicateurs partagés : la qualité devient mesurable et constante d’un conseiller à l’autre.",
  },
  {
    id: "recrutement",
    category: "Talents",
    title: "Un recrutement long et incertain",
    text: "Nous disposons d’un vivier de profils francophones qualifiés, prêts à être formés à votre métier.",
  },
  {
    id: "pilotage",
    category: "Pilotage",
    title: "Un manque de visibilité sur la performance",
    text: "Tableaux de bord en continu, revues mensuelles et analyse par l’IA pour décider avec des faits.",
  },
  {
    id: "culture",
    category: "Culture",
    title: "La peur de perdre le lien avec vos clients",
    text: "Vos conseillers portent votre culture et votre ton : vos clients ne voient pas de rupture, seulement de la continuité.",
  },
];
