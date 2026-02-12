export type MainCountry =
  | "Mundo"
  | "Europa"
  | "América do Sul"
  | "América do Norte, Central e Caribe"
  | "Asia"
  | "África"
  | "Oceania";


  export const CONTINENT_ICONS:  Partial<Record<string, string>>= {
  Mundo: '/globo_icons/mundo2.png',
  Europa: '/globo_icons/europa2.png',
  'América do Sul': '/globo_icons/america_do_sul2.png',
  'América do Norte, Central e Caribe':
    '/globo_icons/america_do_norte_e_central2.png',
  Asia: '/globo_icons/asia2.png',
  África: '/globo_icons/africa2.png',
  Oceania: '/globo_icons/oceania2.png',
};
