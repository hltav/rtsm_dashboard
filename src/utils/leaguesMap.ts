export interface LeagueTranslation {
  name: string;
  flag?: string;
  logo?: string;
}

export const leagueTranslations: Record<string, LeagueTranslation> = {
  //Competições Continentais
  "FIFA World Cup": {
    name: "Copa do Mundo FIFA",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },

  "UEFA Champions League": {
    name: "UEFA Champions League",
    logo: `/badges_leagues/uefa_champions_league.png`,
  },
  "UEFA Europa League": {
    name: "UEFA Europa League",
    logo: `/badges_leagues/uefa_europa_league.png`,
  },
  "UEFA Conference League": {
    name: "UEFA Conference League",
    logo: `/badges_leagues/uefa_conference_league.png`,
  },
  "Copa Libertadores": {
    name: "Conmebol Libertadores",
    logo: `/badges_leagues/conmebol_libertadores.png`,
  },
  "Copa Sudamericana": {
    name: "Conmebol Sul-Americana",
    logo: `/badges_leagues/conmebol_sudamericana.png`,
  },

  // Ligas Principais
  "Brazilian Serie A": {
    name: "Brasileirão Betano",
    logo: `/badges_leagues/brasileirao_betano_serie_a.png`,
  },
  "English Premier League": {
    name: "Premier League",
    logo: `/badges_leagues/england_premier_league.png`,
  },
  "German Bundesliga": {
    name: "Bundesliga",
    logo: `/badges_leagues/german_bundesliga.png`,
  },
  "Italian Serie A": {
    name: "Série A",
    logo: `/badges_leagues/italy_seriea.png`,
  },
  "French Ligue 1": {
    name: "França Ligue 1",
    logo: `/badges_leagues/french_ligue1.png`,
  },
  "Spanish La Liga": {
    name: "La Liga",
    logo: `/badges_leagues/spain_la_liga.png`,
  },
  "Portuguese Primeira Liga": {
    name: "Liga Portugal Betclic",
    logo: `/badges_leagues/liga_portugal_betclick.png`,
  },
  "Dutch Eredivisie": {
    name: "Holanda Eredivisie",
    logo: `/badges_leagues/dutch_eredivisie.png`,
  },
  "Argentinian Primera Division": {
    name: "Primeira Divisão Argentina",
    logo: `/badges_leagues/liga_profissional_argentina.png`,
  },
  "Uruguayan Primera Division": {
    name: "Liga AUF Uruguai",
    logo: `/badges_leagues/liga_uruguaia.png`,
  },

  //Ligas de Segundo Escalão
  "Greek Superleague Greece": {
    name: "Grecia Superliga",
    logo: `/badges_leagues/greece_superleague.png`,
  },
  "Scottish Premier League": {
    name: "Escocia Premiership",
    logo: `/badges_leagues/scottish_premiership.png`,
  },
  "Belgian Pro League": {
    name: "Jupiler Pro League ",
    logo: `/badges_leagues/belgium_pro_league.png`,
  },
  "Turkish Super Lig": {
    name: "Turquia Super Lig",
    logo: `/badges_leagues/turkey_super_lig.png`,
  },
  "Danish Superliga": {
    name: "Dinamarca SuperLiga",
    logo: `/badges_leagues/danish_superliga.png`,
  },
  "American Major League Soccer": {
    name: "Major League Soccer MLS",
    logo: `/badges_leagues/major_league_soccer.png`,
  },
  "Swedish Allsvenskan": {
    name: "Suecia Allsvenskan ",
    logo: `/badges_leagues/allsvenskan.png`,
  },
  "Ukrainian Premier League": {
    name: "Premier League Ucrânia",
    logo: `/badges_leagues/ucrania_premier_league.png`,
  },
  "Colombia Categoría Primera A": {
    name: "Liga BetPlay DIMAYOR Colômbia",
    logo: `/badges_leagues/liga_betplay_colombia.png`,
  },
  "Australian A-League": {
    name: "A-League Austrália",
    logo: `/badges_leagues/a_league_australia.png`,
  },
  "Norwegian Eliteserien": {
    name: "Eliteserien Noruega",
    logo: `/badges_leagues/eliteserien_noruega.png`,
  },
  "Bolivian Primera División": {
    name: "Liga Profissional Bolívia",
    logo: `/badges_leagues/bolivia_copa_tigo.png`,
  },
  "Ecuadorian Serie A": {
    name: "LigaPro Ecuabet Equador",
    logo: `/badges_leagues/liga_pro_ecuador.png`,
  },
  "Paraguayan Primera Division": {
    name: "Primera Divisão Paraguai",
    logo: `/badges_leagues/copa_de_primera_paraguay.png`,
  },
  "Peruvian Primera Division": {
    name: "Liga 1 Betsson Peru",
    logo: `/badges_leagues/liga1_peru.png`,
  },
  "Chinese Super League": {
    name: "Superliga Chinesa",
    logo: `/badges_leagues/chinese_super_league.png`,
  },
  "Russian Football Premier League": {
    name: "Premier League Rússia",
    logo: `/badges_leagues/russian_premier_league.png`,
  },

  // Copas Nacionais
  "FA Cup": { name: "Copa da Inglaterra", logo: `/badges_leagues/fa_cup.png` },
  "Copa del Rey": {
    name: "Copa do Rei",
    logo: `/badges_leagues/copa_del_rey.png`,
  },
  "Coupe de France": {
    name: "Copa da França",
    logo: `/badges_leagues/coupe_de_france.png`,
  },
  "DFB-Pokal": {
    name: "Copa da Alemanha",
    logo: `/badges_leagues/dfb_pokal.png`,
  },
  "Copa do Brasil": {
    name: "Copa do Brasil",
    logo: `/badges_leagues/copa_do_brasil.png`,
  },
  "Coppa Italia": {
    name: "Coppa Italia",
    logo: `/badges_leagues/coppa_italia.png`,
  },
  "Dutch KNVB Cup": {
    name: "KNVB Copa da Holanda",
    logo: `/badges_leagues/knvb_beker_holanda.png`,
  },
  "Copa Argentina": {
    name: "Copa Argentina",
    logo: `/badges_leagues/copa_argentina.png`,
  },
  "Taca de Liga": {
    name: "Copa da Liga Portuguesa",
    logo: `/badges_leagues/taca_da_liga_portugal.png`,
  },
  "Taca de Portugal": {
    name: "Copa de Portugal",
    logo: `/badges_leagues/taca_de_portugal.png`,
  },
  "Coupe de la Ligue": {
    name: "Copa da Liga Francesa",
    logo: `/badges_leagues/coupe_de_la_ligue_france.png`,
  },
  "EFL Cup": {
    name: "Copa da Liga Inglesa",
    logo: `/badges_leagues/efl_carabao_cup.png`,
  },
  "FA Community Shield": {
    name: "Supercopa da Inglaterra",
    logo: `/badges_leagues/fa_community_shield.png`,
  },

  // Segundas Divisões
  "Brazilian Serie B": { name: "Brasileirão Série B", flag: "BR" },
  "English League Championship": { name: "Championship", flag: "GB" },
  "Italian Serie B": { name: "Série B Italiana", flag: "IT" },
  "Scottish Championship": {
    name: "Championship Escocia",
    logo: `/badges_leagues/Flag_of_Scotland.svg`,
  },
  "English League 1": {
    name: "League One ",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "English League 2": {
    name: "League Two ",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "Italian Serie C Girone C": { name: "Série C Italiana", flag: "IT" },
  "German 2. Bundesliga": { name: "2. Bundesliga Alemã", flag: "DE" },
  "Spanish La Liga 2": { name: "La Liga 2 Espanhola", flag: "ES" },
  "French Ligue 2": { name: "Ligue 2 Francesa", flag: "FR" },
  "Swedish Superettan": { name: "Superettan Sueca", flag: "SE" },
  "Polish Ekstraklasa": { name: "Ekstraklasa Polônia", flag: "PL" },

  // 🌍🏆 Competições Internacionais

  "American NASL": { name: "NASL - EUA", flag: "US" },
  "Norwegian 1. Divisjon": { name: "1. Divisjon Norueguesa", flag: "NO" },
  "Welsh Premier League": {
    name: "Premier League Galesa",
    logo: `/badges_leagues/Flag_of_Wales.png`,
  },
  "UEFA Nations League": {
    name: "UEFA Nations League",
    logo: `/badges_leagues/uefa-nations-league.png`,
  },
  "African Cup of Nations": {
    name: "Copa das Nações Africanas",
    logo: `/badges_leagues/caf.svg`,
  },
  "Confederations Cup": {
    name: "Copa das Confederações",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
  "Copa America": {
    name: "Copa América",
    logo: `/badges_leagues/conmebol-logo.svg`,
  },
  "UEFA European Championships": {
    name: "Campeonato Europeu",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "FIFA Club World Cup": {
    name: "Mundial de Clubes",
    logo: `/badges_leagues/fifa_club_world_cup.png`,
  },
  "International Champions Cup": {
    name: "International Champions Cup",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
  "Supercoppa Italiana": {
    name: "Supercopa Italiana",
    logo: `/badges_leagues/italia_super_cup.png`,
  },
  "Supercopa de Espana": {
    name: "Supercopa da Espanha",
    logo: `/badges_leagues/supercopa_de_espana.png`,
  },
  "UEFA Super Cup": {
    name: "Supercopa da UEFA",
    logo: `/badges_leagues/uefa_super_cup.png`,
  },
  "Venezuela Primera Division": {
    name: "Venezuela Liga FutVE",
    logo: `/badges_leagues/liga_fut_venezuela.png`,
  },

  // Ligas Específicas

  "Moroccan Championship": { name: "Campeonato Marroquino", flag: "MA" },
  "American NWSL": { name: "NWSL", flag: "US" },
  "European Cup": {
    name: "Copa Europeia",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "UEFA Cup": { name: "Copa da UEFA", logo: `/badges_leagues/UEFA_Logo.png` },
  "Football League First Division": {
    name: "Primeira Divisão Inglesa Histórica",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "Football League Super Cup": {
    name: "Supercopa Inglesa",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "International Friendlies": {
    name: "Amistosos Internacionais",
    logo: `/badges_leagues/amistoso.png`,
  },
  "FIFA Womens World Cup": {
    name: "Copa do Mundo Feminina",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
  "UEFA European Under-21 Championship": {
    name: "Euro Sub-21",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "Club Friendlies": {
    name: "Amistosos de Clubes",
    logo: `/badges_leagues/amistoso.png`,
  },
  "English National League": {
    name: "National League Inglesa",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "Argentinian Primera B Nacional": {
    name: "Primeira B Nacional Argentina",
    flag: "AR",
  },
  "Albanian Superliga": { name: "Superliga Albanesa", flag: "AL" },
  "Andorran 1a Divisió": { name: "Primeira Divisão Andorrana", flag: "AD" },
  "Armenian Premier League": { name: "Premier League Armênia", flag: "AM" },
  "Australia ACT NPL": { name: "NPL ACT Australiana", flag: "AU" },
  "Austrian Bundesliga": { name: "Bundesliga Austríaca", flag: "AT" },
  "Belarus Vyscha Liga": { name: "Vyscha Liga Bielorrussa", flag: "BY" },
  "Belgian First Division B": { name: "Primeira Divisão B Belga", flag: "BE" },
  "Bosnian Premier Liga": { name: "Premier Liga Bósnia", flag: "BA" },
  "Brazilian Serie C": { name: "Brasileirão Série C", flag: "BR" },
  "Bulgarian First League": { name: "Primeira Liga Búlgara", flag: "BG" },
  "Chile Primera Division": { name: "Primeira División Chilena", flag: "CL" },
  "China League One": { name: "China League One", flag: "CN" },
  "Croatian First Football League": {
    name: "Primeira Liga Croata",
    flag: "HR",
  },
  "Cypriot First Division": { name: "Primeira Divisão Cipriota", flag: "CY" },
  "Czech First League": { name: "Primeira Liga Tcheca", flag: "CZ" },
  "Danish 2nd Division": { name: "Segunda Divisão Dinamarquesa", flag: "DK" },
  "Japanese J1 League": { name: "J1 League Japonesa", flag: "JP" },
  "Estonian Meistriliiga": { name: "Meistriliiga Estoniana", flag: "EE" },
  "Faroe Islands Premier League": {
    name: "Premier League das Ilhas Faroé",
    flag: "FO",
  },
  "Finnish Veikkausliiga": { name: "Veikkausliiga Finlandesa", flag: "FI" },
  "French Championnat National": {
    name: "Championnat National Francês",
    flag: "FR",
  },
  "Georgian Erovnuli Liga": { name: "Erovnuli Liga Georgiana", flag: "GE" },
  "Germany Liga 3": { name: "3. Liga Alemã", flag: "DE" },
  "Greek Super League 2": { name: "Super League 2 Grega", flag: "GR" },
  "Dutch Eerste Divisie": { name: "Eerste Divisie Holandesa", flag: "NL" },
  "Icelandic Úrvalsdeild karla": { name: "Úrvalsdeild Islandesa", flag: "IS" },
  "Irish Premier Division": { name: "Premier Division Irlandesa", flag: "IE" },
  "Israeli Premier League": { name: "Premier League Israelense", flag: "IL" },
  "Italy Serie D Girone D": { name: "Série D Italiana", flag: "IT" },
  "English Northern Premier League Premier Division": {
    name: "Northern Premier League Inglaterra",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "English Isthmian League Premier Division": {
    name: "Isthmian League Inglaterra",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "English Southern Premier League South Division": {
    name: "Southern Premier League Inglaterra",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "Kazakhstan Premier League": { name: "Premier League Cazaque", flag: "KZ" },
  "Latvian Higher League": { name: "Liga Letônia", flag: "LV" },
  "Lithuanian A Lyga": { name: "A Lyga Lituana", flag: "LT" },
  "Macedonian First League": { name: "Primeira Liga Macedônia", flag: "MK" },
  "Maltese Premier League": { name: "Premier League Maltesa", flag: "MT" },
  "Mexican Liga de Expansión MX": { name: "Liga de Expansión MX", flag: "MX" },
  "Moldovan National Division": {
    name: "Divisão Nacional Moldava",
    flag: "MD",
  },
  "Montenegrin First League": {
    name: "Primeira Liga Montenegrina",
    flag: "ME",
  },
  "Moroccan Botola 2": { name: "Botola 2 Marroquina", flag: "MA" },
  "Northern Irish Premiership": {
    name: "Premiership da Irlanda do Norte",
    logo: `/badges_leagues/Flag_of_Northern_Ireland.svg`,
  },
  "Polish I liga": { name: "I Liga Polonesa", flag: "PL" },
  "Portuguese LigaPro": { name: "LigaPro Portuguesa", flag: "PT" },
  "Qatar Stars League": { name: "Liga do Qatar", flag: "QA" },
  "Romanian Liga II": { name: "Liga II Romena", flag: "RO" },
  "Russian Football National League": {
    name: "Liga Nacional Russa",
    flag: "RU",
  },
  "San-Marino Campionato": { name: "Campeonato Sanmarinense", flag: "SM" },
  "Saudi-Arabian Pro League": { name: "Liga Profissional Saudita", flag: "SA" },
  "Scottish League 1": {
    name: "League One Escocia",
    logo: `/badges_leagues/Flag_of_Scotland.svg`,
  },
  "Scottish League 2": {
    name: "League Two Escocia",
    logo: `/badges_leagues/Flag_of_Scotland.svg`,
  },
  "Serbian Super Liga": { name: "Super Liga Sérvia", flag: "RS" },
  "Slovak First Football League": {
    name: "Primeira Liga Eslovaca",
    flag: "SK",
  },
  "Primera División RFEF Group 1": { name: "Primera RFEF Grupo 1", flag: "ES" },
  "Swedish Division 1 North": { name: "Division 1 Norte Sueca", flag: "SE" },
  "Swiss Super League": { name: "Super Liga Suíça", flag: "CH" },
  "Turkish 1 Lig": { name: "1. Lig Turca", flag: "TR" },
  "Ukrainian First League": { name: "Primeira Liga Ucraniana", flag: "UA" },
  "UAE Pro League": { name: "Liga dos Emirados Árabes", flag: "AE" },
  "Turkish 2 Lig": { name: "2. Lig Turca", flag: "TR" },
  "English National League North": {
    name: "National League Norte",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "English National League South": {
    name: "National League Sul",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "Danish 1st Division": { name: "Primeira Divisão Dinamarquesa", flag: "DK" },
  "American USL Championship": { name: "USL Championship", flag: "US" },
  "South Korean K League 1": { name: "K League 1 Sul-Coreana", flag: "KR" },
  "Hungarian NB I": { name: "NB I Húngara", flag: "HU" },
  "Romanian Liga I": { name: "Liga I Romena", flag: "RO" },
  "Slovenian 1. SNL": { name: "1. SNL Eslovena", flag: "SI" },
  "Azerbaijani Premier League": {
    name: "Premier League Azerbaijana",
    flag: "AZ",
  },
  "Luxembourg National Division": {
    name: "Divisão Nacional Luxemburguesa",
    flag: "LU",
  },
  "German Regionalliga Nord": { name: "Regionalliga Norte Alemã", flag: "DE" },
  "Swiss Challenge League": { name: "Challenge League Suíça", flag: "CH" },
  "AFC Champions League Elite": {
    name: "Liga dos Campeões da AFC",
    logo: `/badges_leagues/afc.svg`,
  },
  "CAF Champions League": {
    name: "Liga dos Campeões da CAF",
    logo: `/badges_leagues/caf.svg`,
  },
  "CONCACAF Champions Cup": {
    name: "Copa dos Campeões da CONCACAF",
    logo: `/badges_leagues/concacaf-logo.svg`,
  },
  "Scottish FA Cup": {
    name: "Copa da Escócia",
    logo: `/badges_leagues/Flag_of_Scotland.svg`,
  },
  "CONCACAF Central American Cup": {
    name: "Copa da América Central",
    logo: `/badges_leagues/concacaf-logo.svg`,
  },
  "Iranian Azadegan League": { name: "Liga Azadegan Iraniana", flag: "IR" },
  "Iranian Persian Gulf Pro League": {
    name: "Liga do Golfo Pérsico Iraniana",
    flag: "IR",
  },
  "Thai Premier League": { name: "Liga Tailandesa", flag: "TH" },
  "Thai League 2": { name: "Liga 2 Tailandesa", flag: "TH" },
  "Kenyan Premier League": { name: "Premier League Queniana", flag: "KE" },

  "Italy Serie D Girone B": { name: "Série D Italiana Girone B", flag: "IT" },
  "Italy Serie D Girone C": { name: "Série D Italiana Girone C", flag: "IT" },
  "Italy Serie D Girone E": { name: "Série D Italiana Girone E", flag: "IT" },
  "Italy Serie D Girone F": { name: "Série D Italiana Girone F", flag: "IT" },
  "Italy Serie D Girone G": { name: "Série D Italiana Girone G", flag: "IT" },
  "Italy Serie D Girone H": { name: "Série D Italiana Girone H", flag: "IT" },
  "Italy Serie D Girone I": { name: "Série D Italiana Girone I", flag: "IT" },
  "Italy Serie D Girone A": { name: "Série D Italiana Girone A", flag: "IT" },

  "FA Trophy": { name: "FA Trophy", flag: "GB" },
  "Malaysian Premier League": { name: "Liga Premier da Malásia", flag: "MY" },
  "Indonesian Super League": { name: "Liga Super Indonésia", flag: "ID" },
  "Indian Super League": { name: "Superliga Indiana", flag: "IN" },
  "Malaysian Super League": { name: "Superliga da Malásia", flag: "MY" },
  "Cambodia C-League": { name: "C-League Cambojana", flag: "KH" },
  "Uzbekistan Super League": { name: "Superliga do Uzbequistão", flag: "UZ" },
  "Singapore Premier League": {
    name: "Premier League de Singapura",
    flag: "SG",
  },
  "Austrian Erste Liga": { name: "Erste Liga Austríaca", flag: "AT" },
  "Indian I-League": { name: "I-League Indiana", flag: "IN" },
  "South African Premier Soccer League": {
    name: "Premier Soccer League Sul-Africana",
    flag: "ZA",
  },
  "Vietnamese V.League 1": { name: "V.League 1 Vietnamita", flag: "VN" },
  "AFC Champions League Two": {
    name: "Liga dos Campeões da AFC 2",
    logo: `/badges_leagues/afc.svg`,
  },
  "Australian A-League Women": {
    name: "A-League Feminina Australiana",
    flag: "AU",
  },
  "Nicaragua Primera Division": {
    name: "Primera División Nicaraguense",
    flag: "NI",
  },

  "Swedish Division 1 South": { name: "Division 1 Sul Sueca", flag: "SE" },
  "EFL Trophy": { name: "EFL Trophy", flag: "GB" },
  "English Womens Super League": {
    name: "Superliga Feminina Inglesa",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "UEFA Womens Euro": {
    name: "Euro Feminino",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "AFC Asian Cup": { name: "Copa da Ásia", logo: `/badges_leagues/afc.svg` },
  "OFC Nations Cup": {
    name: "Copa das Nações da OFC",
    logo: `/badges_leagues/ofc.svg`,
  },
  "CONCACAF Gold Cup": {
    name: "Copa Ouro da CONCACAF",
    logo: `/badges_leagues/concacaf-logo.svg`,
  },

  "Mexican Primera League": { name: "Liga MX", flag: "MX" },
  "Chile Primera B": { name: "Primera B Chilena", flag: "CL" },
  "Bolivian Nacional B Copa Simón Bolívar": {
    name: "Nacional B Bolívia",
    flag: "BO",
  },
  "Colombian Categoría Primera B": { name: "Primera B Colombiana", flag: "CO" },
  "Paraguayan División Intermedia": {
    name: "División Intermedia Paraguaia",
    flag: "PY",
  },
  "Peruvian Segunda División": { name: "Segunda Divisão Peruana", flag: "PE" },
  "Uruguayan Segunda División": {
    name: "Segunda Divisão Uruguaia",
    flag: "UY",
  },
  "Venezuelan Segunda Division": {
    name: "Segunda Divisão Venezuelana",
    flag: "VE",
  },
  "Jamaican Premier League": { name: "Premier League Jamaicana", flag: "JM" },
  "Costa-Rica Liga FPD": { name: "Liga FPD Costa Rica", flag: "CR" },
  "El Salvador Primera Division": {
    name: "Primera División Salvadorenha",
    flag: "SV",
  },
  "Guatemala Liga Nacional": { name: "Liga Nacional Guatemalteca", flag: "GT" },
  "Honduras Liga Nacional de Futbol": {
    name: "Liga Nacional Hondurenha",
    flag: "HN",
  },
  "Panama Liga Panamena de Futbol": { name: "Liga Panamenha", flag: "PA" },
  "Canadian Premier League": { name: "Premier League Canadense", flag: "CA" },
  "American USL League One": { name: "USL League One", flag: "US" },
  "USL League Two": { name: "USL League Two", flag: "US" },
  "MLS Next Pro": { name: "MLS Next Pro", flag: "US" },
  "American USL Super League": { name: "USL Super League", flag: "US" },
  "American NWSL Challenge Cup": { name: "NWSL Challenge Cup", flag: "US" },

  // EUROPA

  "German Regionalliga West": { name: "Regionalliga Oeste Alemã", flag: "DE" },
  "German Regionalliga SudWest": {
    name: "Regionalliga Sudoeste Alemã",
    flag: "DE",
  },
  "German Regionalliga Bayern": { name: "Regionalliga Bayern", flag: "DE" },
  "German Regionalliga Nordost": {
    name: "Regionalliga Nordeste Alemã",
    flag: "DE",
  },
  "Primera División RFEF Group 2": { name: "Primera RFEF Grupo 2", flag: "ES" },

  "Italian Serie C Girone A": { name: "Série C Italiana Girone A", flag: "IT" },
  "Italian Serie C Girone B": { name: "Série C Italiana Girone B", flag: "IT" },
  "Scottish Highland League": {
    name: "Highland League Escocia",
    logo: `/badges_leagues/Flag_of_Scotland.svg`,
  },
  "Scottish Lowland League": {
    name: "Lowland League Escocia",
    logo: `/badges_leagues/Flag_of_Scotland.svg`,
  },
  "Northern Irish Premier Intermediate League": {
    name: "Premier Intermediate League",
    logo: `/badges_leagues/Flag_of_Northern_Ireland.svg`,
  },
  "Northern Irish Championship": {
    name: "Championship da Irlanda do Norte",
    logo: `/badges_leagues/Flag_of_Northern_Ireland.svg`,
  },
  "Welsh Cymru North-South": {
    name: "Cymru North-South Galesa",
    logo: `/badges_leagues/Flag_of_Wales.png`,
  },
  "Welsh League Cup": {
    name: "Copa da Liga Galesa",
    logo: `/badges_leagues/Flag_of_Wales.png`,
  },
  "Dutch Tweede Divisie": { name: "Tweede Divisie Holandesa", flag: "NL" },

  "Croatian Druga HNL": { name: "Druga HNL Croata", flag: "HR" },
  "Cypriot Second Division": { name: "Segunda Divisão Cipriota", flag: "CY" },
  "Czech National Football League": {
    name: "Liga Nacional Tcheca",
    flag: "CZ",
  },
  "Estonian Esiliiga": { name: "Esiliiga Estoniana", flag: "EE" },
  "Faroe Islands 1. deild": { name: "1. Deild das Ilhas Faroé", flag: "FO" },
  "Finnish Ykkönen": { name: "Ykkönen Finlandesa", flag: "FI" },
  "Finnish Ykkösliiga": { name: "Ykkösliiga Finlandesa", flag: "FI" },
  "French National 2 Group A": {
    name: "National 2 Grupo A Francês",
    flag: "FR",
  },
  "French National 2 Group B": {
    name: "National 2 Grupo B Francês",
    flag: "FR",
  },
  "French National 2 Group C": {
    name: "National 2 Grupo C Francês",
    flag: "FR",
  },
  "French National 2 Group D": {
    name: "National 2 Grupo D Francês",
    flag: "FR",
  },
  "French Trophée des Champions": { name: "Supercopa da França", flag: "FR" },
  "Georgian Erovnuli Liga 2": { name: "Erovnuli Liga 2 Georgiana", flag: "GE" },
  "Gibraltarian National League": {
    name: "Liga Nacional de Gibraltar",
    flag: "GI",
  },
  "Hungarian NB II": { name: "NB II Húngara", flag: "HU" },
  "Icelandic 1 deild karla": { name: "1. Deild Islandesa", flag: "IS" },
  "Israeli Liga Leumit": { name: "Liga Leumit Israelense", flag: "IL" },
  "Kosovan Superleague": { name: "Superliga do Kosovo", flag: "XK" },
  "Latvian First League": { name: "Primeira Liga Letã", flag: "LV" },
  "Lithuanian I Lyga": { name: "I Lyga Lituana", flag: "LT" },
  "Montenegrin Second League": {
    name: "Segunda Liga Montenegrina",
    flag: "ME",
  },
  "Polish II liga": { name: "II Liga Polonesa", flag: "PL" },
  "Portuguese Liga 3": { name: "Liga 3 Portuguesa", flag: "PT" },
  "Russian FNL 2 Group 1": { name: "FNL 2 Grupo 1 Russa", flag: "RU" },
  "Russian FNL 2 Group 2": { name: "FNL 2 Grupo 2 Russa", flag: "RU" },
  "Russian FNL 2 Group 3": { name: "FNL 2 Grupo 3 Russa", flag: "RU" },
  "Russian FNL 2 Group 4": { name: "FNL 2 Grupo 4 Russa", flag: "RU" },
  "Russian FNL 2 Division A Gold Group": {
    name: "FNL 2 Divisão A Gold Russa",
    flag: "RU",
  },
  "Russian FNL 2 Division A Silver Group": {
    name: "FNL 2 Divisão A Silver Russa",
    flag: "RU",
  },
  "Serbian Prva Liga": { name: "Prva Liga Sérvia", flag: "RS" },
  "Slovenian 2 SNL": { name: "2. SNL Eslovena", flag: "SI" },
  "Slovakian 2 Liga": { name: "2. Liga Eslovaca", flag: "SK" },
  "Swiss Promotion League": { name: "Promotion League Suíça", flag: "CH" },
  "Swiss Cup": { name: "Copa da Suíça", flag: "CH" },
  "Turkish Cup": { name: "Copa da Turquia", flag: "TR" },
  "Ukrainian Second League": { name: "Segunda Liga Ucraniana", flag: "UA" },
  "German Super Cup": { name: "Supercopa da Alemanha", flag: "DE" },
  "Andorran Segona Divisió": { name: "Segunda Divisão Andorrana", flag: "AD" },
  "Andorran Cup": { name: "Copa de Andorra", flag: "AD" },
  "Albanian Kategoria e Parë": { name: "Segunda Divisão Albanesa", flag: "AL" },
  "Armenian First League": { name: "Primeira Liga Armênia", flag: "AM" },
  "Armenian Cup": { name: "Copa da Armênia", flag: "AM" },
  "Azerbaijan First Division": {
    name: "Primeira Divisão Azerbaijana",
    flag: "AZ",
  },
  "Azerbaijan Cup": { name: "Copa do Azerbaijão", flag: "AZ" },
  "Bosnian First League": { name: "Primeira Liga da Bósnia", flag: "BA" },
  "Bosnian First League of Srpska": {
    name: "Primeira Liga da Srpska",
    flag: "BA",
  },
  "Bulgarian Second League": { name: "Segunda Liga Búlgara", flag: "BG" },
  "Belarusian First League": { name: "Primeira Liga Bielorrussa", flag: "BY" },
  "Belarus Coppa": { name: "Copa da Bielorrússia", flag: "BY" },
  "Denmark DBU Pokalen": { name: "Copa da Dinamarca", flag: "DK" },
  "Denmark 3 Division": { name: "3ª Divisão Dinamarquesa", flag: "DK" },
  "Denmark Series Group 1": { name: "Denmark Series Grupo 1", flag: "DK" },
  "Denmark Series Group 2": { name: "Denmark Series Grupo 2", flag: "DK" },
  "Denmark Series Group 3": { name: "Denmark Series Grupo 3", flag: "DK" },
  "Denmark Series Group 4": { name: "Denmark Series Grupo 4", flag: "DK" },
  "Austrian Regionalliga West": {
    name: "Regionalliga Oeste Austríaca",
    flag: "AT",
  },
  "Austrian Regionalliga Ost": {
    name: "Regionalliga Leste Austríaca",
    flag: "AT",
  },
  "Austrian Regionalliga Mitte": {
    name: "Regionalliga Centro Austríaca",
    flag: "AT",
  },

  // INGLATERRA - Ligas Regionais
  "English Northern Premier League Division One East": {
    name: "Northern Premier Div One Leste",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "English Northern Premier League Division One Midlands": {
    name: "Northern Premier Div One Midlands",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "English Northern Premier League Division One West": {
    name: "Northern Premier Div One Oeste",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "English Southern Premier League Central Division": {
    name: "Southern Premier Central",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "English Southern Premier League Central Division One": {
    name: "Southern Premier Central Div One",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },

  "England Non League Div One Isthmian North": {
    name: "Non League Isthmian Norte",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "England Non League Div One Isthmian South": {
    name: "Non League Isthmian Sul",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "England Non League Div One Southern SW": {
    name: "Non League Southern Sudoeste",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "England Non League Div One Southern Central": {
    name: "Non League Southern Central",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "English Womens Super League 2": {
    name: "Super League 2 Feminina",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },

  // ESPANHA - Ligas Regionais
  "Spanish Segunda RFEF Group 1": { name: "Segunda RFEF Grupo 1", flag: "ES" },
  "Spanish Segunda RFEF Group 2": { name: "Segunda RFEF Grupo 2", flag: "ES" },
  "Spanish Segunda RFEF Group 3": { name: "Segunda RFEF Grupo 3", flag: "ES" },
  "Spanish Segunda RFEF Group 4": { name: "Segunda RFEF Grupo 4", flag: "ES" },
  "Spanish Segunda RFEF Group 5": { name: "Segunda RFEF Grupo 5", flag: "ES" },
  "Spanish Primera RFEF Group 1": { name: "Primera RFEF Grupo 1", flag: "ES" },
  "Spanish Primera RFEF Group 2": { name: "Primera RFEF Grupo 2", flag: "ES" },
  "Spanish Tercera Federación Group 1": {
    name: "Tercera Federación Grupo 1",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 2": {
    name: "Tercera Federación Grupo 2",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 3": {
    name: "Tercera Federación Grupo 3",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 4": {
    name: "Tercera Federação Grupo 4",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 5": {
    name: "Tercera Federación Grupo 5",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 6": {
    name: "Tercera Federación Grupo 6",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 7": {
    name: "Tercera Federación Grupo 7",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 8": {
    name: "Tercera Federación Grupo 8",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 9": {
    name: "Tercera Federación Grupo 9",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 10": {
    name: "Tercera Federación Grupo 10",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 11": {
    name: "Tercera Federación Grupo 11",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 12": {
    name: "Tercera Federación Grupo 12",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 13": {
    name: "Tercera Federación Grupo 13",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 14": {
    name: "Tercera Federación Grupo 14",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 15": {
    name: "Tercera Federación Grupo 15",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 16": {
    name: "Tercera Federación Grupo 16",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 17": {
    name: "Tercera Federación Grupo 17",
    flag: "ES",
  },
  "Spanish Tercera Federación Group 18": {
    name: "Tercera Federación Grupo 18",
    flag: "ES",
  },
  "Spanish Liga F": { name: "Liga F Espanhola", flag: "ES" },
  "Spanish Copa Federacion": { name: "Copa Federação Espanhola", flag: "ES" },
  "Supercopa de Espana Femenina": {
    name: "Supercopa Feminina da Espanha",
    flag: "ES",
  },

  // HOLANDA - Ligas Regionais
  "Netherlands Derde Divisie Saturday": {
    name: "Derde Divisie Sábado",
    flag: "NL",
  },
  "Netherlands Derde Divisie Sunday": {
    name: "Derde Divisie Domingo",
    flag: "NL",
  },
  "Netherlands Eredivisie Women": { name: "Eredivisie Feminina", flag: "NL" },

  // ÁSIA
  "Japanese J2 League": { name: "J2 League Japonesa", flag: "JP" },
  "Japanese J3 League": { name: "J3 League Japonesa", flag: "JP" },
  "Japan Football League": { name: "Japan Football League", flag: "JP" },
  "Japan Emperors Cup": { name: "Copa do Imperador", flag: "JP" },
  "Japanese JLeague Cup": { name: "Copa J.League", flag: "JP" },
  "South Korean K League 2": { name: "K League 2 Sul-Coreana", flag: "KR" },
  "Korean K3 League": { name: "K3 League Sul-Coreana", flag: "KR" },
  "Korea Cup": { name: "Copa da Coreia", flag: "KR" },
  "China league Two": { name: "China League Two", flag: "CN" },
  "China FA Cup": { name: "Copa da China", flag: "CN" },
  "Hong-Kong Premier League": {
    name: "Premier League de Hong Kong",
    flag: "HK",
  },
  "Taiwan Football Premier League": {
    name: "Liga Premier de Taiwan",
    flag: "TW",
  },
  "Taiwan Mulan Football League": { name: "Mulan Football League", flag: "TW" },
  "Macau Liga de Elite": { name: "Liga de Elite de Macau", flag: "MO" },
  "Indian I-League 2nd Division": {
    name: "I-League Segunda Divisão",
    flag: "IN",
  },
  "Bangladesh Premier League": {
    name: "Premier League de Bangladesh",
    flag: "BD",
  },
  "Myanmar National League": { name: "Liga Nacional de Mianmar", flag: "MM" },
  "Vietnam V.League 2": { name: "V.League 2 Vietnamita", flag: "VN" },
  "Vietnamese Cup": { name: "Copa do Vietnã", flag: "VN" },
  "Philippines Football League": { name: "Liga Filipina", flag: "PH" },
  "Kyrgyz Premier League": {
    name: "Premier League do Quirguistão",
    flag: "KG",
  },
  "Lao Premier League": { name: "Premier League do Laos", flag: "LA" },
  "Nepalese A Division": { name: "Divisão A do Nepal", flag: "NP" },
  "Pakistan Premier League": {
    name: "Premier League do Paquistão",
    flag: "PK",
  },
  "Palestinian West Bank Premier League": {
    name: "Premier League da Palestina",
    flag: "PS",
  },
  "Maldives Dhivehi Premier League": {
    name: "Premier League das Maldivas",
    flag: "MV",
  },
  "Bahrain Premier League": { name: "Premier League do Bahrein", flag: "BH" },
  "Kuwait Premier League": { name: "Premier League do Kuwait", flag: "KW" },
  "Kuwait Division 1": { name: "Divisão 1 do Kuwait", flag: "KW" },
  "Kuwait Crown Prince Cup": {
    name: "Copa do Príncipe Herdeiro Kuwait",
    flag: "KW",
  },
  "Kuwait Emir Cup": { name: "Copa do Emir Kuwait", flag: "KW" },
  "Emir of Qatar Cup": { name: "Copa do Emir do Qatar", flag: "QA" },
  "Qatar QSL Cup": { name: "QSL Cup do Qatar", flag: "QA" },
  "Oman Professional League": { name: "Liga Profissional de Omã", flag: "OM" },
  "UAE League Cup": { name: "Copa da Liga dos EAU", flag: "AE" },
  "Saudi First Division League": {
    name: "Primeira Divisão Saudita",
    flag: "SA",
  },
  "Saudi King Cup": { name: "Copa do Rei Saudita", flag: "SA" },
  "Saudi Super Cup": { name: "Supercopa Saudita", flag: "SA" },
  "Jordanian Pro League": { name: "Liga Profissional da Jordânia", flag: "JO" },
  "Iraqi Premier League": { name: "Premier League do Iraque", flag: "IQ" },
  "Lebanese Premier League": { name: "Premier League do Líbano", flag: "LB" },
  "Syrian Premier League": { name: "Premier League da Síria", flag: "SY" },
  "Tajikistan Vysshaya Liga": {
    name: "Vysshaya Liga do Tajiquistão",
    flag: "TJ",
  },
  "Kazakhstan First League": {
    name: "Primeira Liga do Cazaquistão",
    flag: "KZ",
  },
  "Kazakhstan Cup": { name: "Copa do Cazaquistão", flag: "KZ" },
  "Turkmenistan Yokary Liga": {
    name: "Yokary Liga do Turcomenistão",
    flag: "TM",
  },
  "Mongolian Premier League": {
    name: "Premier League da Mongólia",
    flag: "MN",
  },
  "ASEAN Club Championship": {
    name: "Campeonato de Clubes da ASEAN",
    logo: `/badges_leagues/afc.svg`,
  },
  "AFC Challenge League": {
    name: "Liga Challenge da AFC",
    logo: `/badges_leagues/afc.svg`,
  },
  "AFC Womens Champions League": {
    name: "Liga dos Campeões Feminina da AFC",
    logo: `/badges_leagues/afc.svg`,
  },
  "Asian Cup Women": {
    name: "Copa da Ásia Feminina",
    logo: `/badges_leagues/afc.svg`,
  },

  // ÁFRICA
  "Egyptian Premier League": { name: "Premier League Egípcia", flag: "EG" },
  "Egypt League Cup": { name: "Copa da Liga Egípcia", flag: "EG" },
  "Tunisian Ligue 1": { name: "Ligue 1 Tunisiana", flag: "TN" },
  "Algerian Ligue 1": { name: "Ligue 1 Argelina", flag: "DZ" },
  "Nigerian NPFL": { name: "NPFL Nigeriana", flag: "NG" },
  "Ghanaian Premier League": { name: "Premier League de Gana", flag: "GH" },
  "Senegal Ligue 1": { name: "Ligue 1 Senegalesa", flag: "SN" },
  "DR Congo Ligue 1": { name: "Ligue 1 do Congo", flag: "CD" },
  "Angolan Girabola": { name: "Girabola Angolana", flag: "AO" },
  "Zambia Super League": { name: "Super Liga da Zâmbia", flag: "ZM" },
  "Zimbabwean Premier Soccer League": {
    name: "Premier League do Zimbábue",
    flag: "ZW",
  },
  "Ethiopian Premier League": { name: "Premier League da Etiópia", flag: "ET" },
  "Ugandan Premier League": { name: "Premier League de Uganda", flag: "UG" },
  "Rwandan National Soccer League": {
    name: "Liga Nacional de Ruanda",
    flag: "RW",
  },
  "Burundi Ligue A": { name: "Ligue A do Burundi", flag: "BI" },
  "Somali Premier League": { name: "Premier League da Somália", flag: "SO" },
  "Sudani Premier League": { name: "Premier League do Sudão", flag: "SD" },
  "Libyan Premier League": { name: "Premier League da Líbia", flag: "LY" },
  "Mauritania Premier League": {
    name: "Premier League da Mauritânia",
    flag: "MR",
  },
  "Gambia GFA League": { name: "GFA League da Gâmbia", flag: "GM" },
  "Guinea Ligue 1": { name: "Ligue 1 da Guiné", flag: "GN" },
  "Ivory Coast Ligue 1": { name: "Ligue 1 da Costa do Marfim", flag: "CI" },
  "Burkina Faso 1ere Division": {
    name: "Primeira Divisão de Burkina Faso",
    flag: "BF",
  },
  "Benin Championnat National": {
    name: "Campeonato Nacional do Benin",
    flag: "BJ",
  },
  "Liberian LFA First Division": {
    name: "Primeira Divisão da Libéria",
    flag: "LR",
  },
  "Botswana Premier League": { name: "Premier League de Botsuana", flag: "BW" },
  "Eswatini Premier League": { name: "Premier League de Eswatini", flag: "SZ" },
  "CAF Confederation Cup": {
    name: "Copa das Confederações da CAF",
    logo: `/badges_leagues/caf.svg`,
  },
  "CECAFA Club Cup": {
    name: "Copa de Clubes CECAFA",
    logo: `/badges_leagues/caf.svg`,
  },
  "COSAFA Cup": { name: "Copa COSAFA", logo: `/badges_leagues/caf.svg` },
  "South-Africa 8 Cup": { name: "Copa Sul-Africana", flag: "ZA" },
  "Africa Cup of Nations Women": {
    name: "Copa Africana de Nações Feminina",
    logo: `/badges_leagues/caf.svg`,
  },
  "CAF Womens Olympic Qualifying Tournament": {
    name: "Qualificatória Olímpica CAF Feminina",
    logo: `/badges_leagues/caf.svg`,
  },

  // OCEANIA
  "New-Zealand Football Championship": {
    name: "Campeonato Neozelandês",
    flag: "NZ",
  },
  "New Zealand National League Championship": {
    name: "Liga Nacional da Nova Zelândia",
    flag: "NZ",
  },
  "New Zealand Northern League": {
    name: "Liga Norte da Nova Zelândia",
    flag: "NZ",
  },
  "New Zealand Central League": {
    name: "Liga Central da Nova Zelândia",
    flag: "NZ",
  },
  "New Zealand Southern League": {
    name: "Liga Sul da Nova Zelândia",
    flag: "NZ",
  },
  "Australia FFA Cup": { name: "FFA Cup Australiana", flag: "AU" },
  "Australian Championship": { name: "Campeonato Australiano", flag: "AU" },
  "Australia Northern NSW NPL": { name: "NPL Norte NSW", flag: "AU" },
  "Australia New South Wales NPL": { name: "NPL NSW", flag: "AU" },
  "Australia Victoria NPL": { name: "NPL Victoria", flag: "AU" },
  "Australia Brisbane Premier League": {
    name: "Premier League Brisbane",
    flag: "AU",
  },
  "Australia Queensland NPL": { name: "NPL Queensland", flag: "AU" },
  "Australia Western Australia NPL": {
    name: "NPL Austrália Ocidental",
    flag: "AU",
  },
  "Australia South Australia NPL": { name: "NPL Sul da Austrália", flag: "AU" },
  "Australia Northern Territory Premier League": {
    name: "Premier League Território Norte",
    flag: "AU",
  },
  "Australia Tasmania NPL": { name: "NPL Tasmânia", flag: "AU" },
  "Fijian Premier League": { name: "Premier League de Fiji", flag: "FJ" },
  "OFC Mens Champions League": {
    name: "Liga dos Campeões da OFC",
    logo: `/badges_leagues/ofc.svg`,
  },

  // BRASIL - Estaduais
  "Brazilian Campeonato Acreano": { name: "Campeonato Acreano", flag: "BR" },
  "Brazilian Campeonato Alagoano": { name: "Campeonato Alagoano", flag: "BR" },
  "Brazilian Campeonato Amapaense": {
    name: "Campeonato Amapaense",
    flag: "BR",
  },
  "Brazilian Campeonato Amazonense": {
    name: "Campeonato Amazonense",
    flag: "BR",
  },
  "Brazilian Campeonato Baiano": { name: "Campeonato Baiano", flag: "BR" },
  "Brazilian Campeonato Brasiliense": {
    name: "Campeonato Brasiliense",
    flag: "BR",
  },
  "Brazilian Campeonato Capixaba": { name: "Campeonato Capixaba", flag: "BR" },
  "Spanish Segunda División B Group 3": {
    name: "Segunda Divisão B da Espanha - Grupo 3",
    flag: "ES",
  },
  "Spanish Segunda División B Group 4": {
    name: "Segunda Divisão B da Espanha - Grupo 4",
    flag: "ES",
  },
  "Spanish Segunda División B Group 5": {
    name: "Segunda Divisão B da Espanha - Grupo 5",
    flag: "ES",
  },
  "Svenska Cupen": { name: "Copa da Suécia", flag: "SE" },
  "Irish First Division": { name: "Primeira Divisão da Irlanda", flag: "IE" },
  "FA Womens League Cup": {
    name: "Copa da Liga Feminina da Inglaterra",
    flag: "GB",
  },
  "Scottish League Cup": {
    name: "Copa da Liga Escocia",
    logo: `/badges_leagues/Flag_of_Scotland.svg`,
  },
  "UEFA Womens Champions League": {
    name: "Liga dos Campeões Feminina da UEFA",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "Dominican LDF": { name: "Liga Dominicana de Futebol", flag: "DO" },
  "Ecuadorian Serie B": { name: "Série B do Equador", flag: "EC" },
  "Liechtenstein Cup": { name: "Copa do Liechtenstein", flag: "LI" },
  "Olympics Soccer": {
    name: "Futebol Olímpico",
    logo: `/badges_leagues/olympic-games.svg`,
  },
  "Brazil Serie D": { name: "Série D do Brasil", flag: "BR" },
  "FIFA Arab Cup": {
    name: "Copa Árabe FIFA",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
  "Copa Colombia": { name: "Copa Colômbia", flag: "CO" },
  "Finnish Cup": { name: "Copa da Finlândia", flag: "FI" },
  "Italy Coppa Italia Serie C": { name: "Coppa Italia Série C", flag: "IT" },
  "Malaysia Cup": { name: "Copa da Malásia", flag: "MY" },
  "Russia Cup": { name: "Copa da Rússia", flag: "RU" },
  "SAFF Championship": {
    name: "Campeonato SAFF",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
  "San Marino Coppa Titano": { name: "Coppa Titano de San Marino", flag: "SM" },
  "Slovenia Cup": { name: "Copa da Eslovênia", flag: "SI" },
  "US Open Cup": { name: "Copa dos EUA", flag: "US" },
  "Brazil Brasileiro Women": { name: "Brasileirão Feminino", flag: "BR" },
  "Denmark Elitedivisionen": {
    name: "Elitedivisionen da Dinamarca",
    flag: "DK",
  },
  "France Première Ligue": {
    name: "Primeira Liga Feminina da França",
    flag: "FR",
  },
  "Germany Women Bundesliga": {
    name: "Bundesliga Feminina da Alemanha",
    flag: "DE",
  },
  "Italy Serie A Women": { name: "Série A Feminina da Itália", flag: "IT" },
  "Mexico Liga MX Femenil": { name: "Liga MX Feminil do México", flag: "MX" },
  "Norway Toppserien": { name: "Toppserien da Noruega", flag: "NO" },
  "Sweden Damallsvenskan": { name: "Damallsvenskan da Suécia", flag: "SE" },
  "Argentina Primera B Metropolitana": {
    name: "Primera B Metropolitana da Argentina",
    flag: "AR",
  },
  "Portugal Liga 3": { name: "Liga 3 de Portugal", flag: "PT" },
  "Russia FNL 2 Group 1": { name: "FNL 2 da Rússia - Grupo 1", flag: "RU" },
  "Russia FNL 2 Group 2": { name: "FNL 2 da Rússia - Grupo 2", flag: "RU" },
  "Russia FNL 2 Group 3": { name: "FNL 2 da Rússia - Grupo 3", flag: "RU" },
  "Russia FNL 2 Group 4": { name: "FNL 2 da Rússia - Grupo 4", flag: "RU" },
  "USA NISA": { name: "NISA - EUA", flag: "US" },
  "Aruban Division di Honor": { name: "Divisão de Honra de Aruba", flag: "AW" },
  "Bermuda Premier League": { name: "Premier League das Bermudas", flag: "BM" },
  "Guadeloupe Division dHonneur": {
    name: "Divisão de Honra da Guadalupe",
    flag: "GP",
  },
  "Lebanon Premier League": { name: "Premier League do Líbano", flag: "LB" },
  "Zimbabwe Premier Soccer League": {
    name: "Premier Soccer League do Zimbábue",
    flag: "ZW",
  },
  "SheBelieves Cup": {
    name: "SheBelieves Cup",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
  "CONCACAF Nations League": {
    name: "Liga das Nações CONCACAF",
    logo: `/badges_leagues/concacaf-logo.svg`,
  },
  "Leagues Cup": {
    name: "Copa das Ligas",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
  "Copa Chile": { name: "Copa do Chile", flag: "CL" },
  "Olympics Soccer Women": {
    name: "Futebol Olímpico Feminino",
    logo: `/badges_leagues/olympic-games.svg`,
  },
  "International Friendlies Women": {
    name: "Amistosos Internacionais Femininos",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
  "DFB-Pokal Frauen": { name: "Copa da Alemanha Feminina", flag: "DE" },
  "Campeonato Nacional Feminino": {
    name: "Campeonato Nacional Feminino",
    flag: "DE",
  },
  "UEFA Womens Nations League": {
    name: "Liga das Nações Feminina UEFA",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "UEFA European Under-19 Championship": {
    name: "Campeonato Europeu Sub-19 UEFA",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "UEFA European Under-17 Championship": {
    name: "Campeonato Europeu Sub-17 UEFA",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "FIFA U-17 World Cup": {
    name: "Copa do Mundo Sub-17 FIFA",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
  "UEFA Youth League": {
    name: "Liga Jovem UEFA",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "Argentinian Copa de la Liga Profesional": {
    name: "Copa da Liga Profissional Argentina",
    flag: "AR",
  },
  "CONMEBOL Pre-Olympic Tournament": {
    name: "Torneio Pré-Olímpico CONMEBOL",
    flag: "BR",
  },
  "CONCACAF W Gold Cup": {
    name: "Copa Ouro Feminina CONCACAF",
    logo: `/badges_leagues/concacaf-logo.svg`,
  },
  "FA Womens Challenge Cup": { name: "Copa Feminina Challenge FA", flag: "GB" },
  "Chile Segunda División": { name: "Segunda Divisão do Chile", flag: "CL" },
  "Russia FNL 2 Division A Gold Group": {
    name: "FNL 2 Rússia - Grupo Ouro",
    flag: "RU",
  },
  "Russia FNL 2 Division A Silver Group": {
    name: "FNL 2 Rússia - Grupo Prata",
    flag: "RU",
  },
  "USL Super League": { name: "USL Super League", flag: "US" },
  "Copa Paraguay": { name: "Copa do Paraguai", flag: "PY" },
  "Asian Games Soccer": {
    name: "Futebol nos Jogos Asiáticos",
    logo: `/badges_leagues/afc.svg`,
  },
  "Pan American Games Soccer": {
    name: "Futebol nos Jogos Pan-Americanos",
    logo: `/badges_leagues/panamericana.svg`,
  },
  "Pacific Games Soccer": {
    name: "Futebol nos Jogos do Pacífico",
    logo: `/badges_leagues/afc.svg`,
  },
  "World Cup Qualifying AFC": {
    name: "Eliminatórias Copa do Mundo AFC",
    logo: `/badges_leagues/afc.svg`,
  },
  "World Cup Qualifying CAF": {
    name: "Eliminatórias Copa do Mundo CAF",
    logo: `/badges_leagues/caf.svg`,
  },
  "World Cup Qualifying CONMEBOL": {
    name: "Eliminatórias Copa do Mundo CONMEBOL",
    logo: `/badges_leagues/conmebol-logo.svg`,
  },
  "World Cup Qualifying CONCACAF": {
    name: "Eliminatórias Copa do Mundo CONCACAF",
    logo: `/badges_leagues/concacaf-logo.svg`,
  },
  "World Cup Qualifying OFC": {
    name: "Eliminatórias Copa do Mundo OFC",
    logo: `/badges_leagues/ofc.svg`,
  },
  "World Cup Qualifying UEFA": {
    name: "Eliminatórias Copa do Mundo UEFA",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "UEFA European Championships Qualifying": {
    name: "Eliminatórias do Campeonato Europeu UEFA",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "African Cup of Nations Qualifying": {
    name: "Eliminatórias Copa Africana de Nações",
    logo: `/badges_leagues/caf.svg`,
  },
  "AFC Asian Cup Qualifying": {
    name: "Eliminatórias Copa Asiática AFC",
    logo: `/badges_leagues/afc.svg`,
  },
  "CONCACAF Gold Cup Qualifying": {
    name: "Eliminatórias Copa Ouro CONCACAF",
    logo: `/badges_leagues/concacaf-logo.svg`,
  },
  "Argentina Torneo Federal A": {
    name: "Torneio Federal A da Argentina",
    flag: "AR",
  },
  "Argentinian Primera C": { name: "Primera C Argentina", flag: "AR" },
  "Copa AUF Uruguay": { name: "Copa AUF Uruguai", flag: "UY" },
  "Canadian Northern Super League": {
    name: "Canadian Northern Super League",
    flag: "CA",
  },
  "Coppa Italia Women": { name: "Coppa Itália Feminina", flag: "IT" },
  "Norwegian Cupen": { name: "Copa da Noruega", flag: "NO" },
  "Copa Ecuador": { name: "Copa do Equador", flag: "EC" },
  "Irish FAI Cup": { name: "Copa FAI da Irlanda", flag: "IE" },
  "CONCACAF W Champions Cup": {
    name: "Copa das Campeãs Feminina CONCACAF",
    logo: `/badges_leagues/concacaf-logo.svg`,
  },
  "FIFA U20 World Cup": {
    name: "Copa do Mundo Sub-20 FIFA",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
  "English Premier League Summer Series": {
    name: "Série de Verão da Premier League Inglesa",
    logo: `/badges_leagues/Flag_of_England.svg`,
  },
  "Emirates Cup": { name: "Copa Emirates", flag: "AE" },
  "USL Cup": { name: "USL Cup", flag: "US" },
  "Copa America Femenina": {
    name: "Copa América Feminina",
    logo: `/badges_leagues/conmebol-logo.svg`,
  },
  "Lithuanian Football Cup": { name: "Copa da Lituânia", flag: "LT" },
  "Lithuanian Supercup": { name: "Supercopa da Lituânia", flag: "LT" },
  "Copa Venezuela": { name: "Copa da Venezuela", flag: "VE" },
  "Supercopa de Venezuela": { name: "Supercopa da Venezuela", flag: "VE" },
  "Mexican Campeon de Campeones": {
    name: "Copa dos Campeões do México",
    flag: "MX",
  },
  "Argentinian Supercopa Internacional": {
    name: "Supercopa Internacional Argentina",
    flag: "AR",
  },
  "Argentinian Trofeo de Campeones": {
    name: "Troféu de Campeões Argentina",
    flag: "AR",
  },
  "Recopa Sudamericana": {
    name: "Recopa Sul-Americana",
    logo: `/badges_leagues/Conmebol_Recopa.png`,
  },
  "Copa Paulista": { name: "Copa Paulista", flag: "BR" },
  "Brazilian Copa do Nordeste": { name: "Copa do Nordeste", flag: "BR" },
  "Brazilian Copa Verde": { name: "Copa Verde", flag: "BR" },
  "CAFA Nations Cup": {
    name: "Copa das Nações CAFA",
    logo: `/badges_leagues/afc.svg`,
  },
  "Brazilian Campeonato Catarinense": {
    name: "Campeonato Catarinense",
    flag: "BR",
  },
  "Brazilian Campeonato Carioca": { name: "Campeonato Carioca", flag: "BR" },
  "Brazilian Campeonato Cearense": { name: "Campeonato Cearense", flag: "BR" },
  "Brazilian Campeonato Gaucho": { name: "Campeonato Gaúcho", flag: "BR" },
  "Brazilian Copa FGF": { name: "Copa FGF", flag: "BR" },
  "FIFA Intercontinental Cup": {
    name: "Copa Intercontinental FIFA",
    logo: `/badges_leagues/FIFA_Intercontinental_Cup.png`,
  },
  "Supercopa de Chile": { name: "Supercopa do Chile", flag: "CL" },
  "UEFA Womens Europa Cup": {
    name: "Liga Europa Feminina UEFA",
    logo: `/badges_leagues/UEFA_Logo.png`,
  },
  "CONCACAF Caribbean Cup": {
    name: "Copa do Caribe CONCACAF",
    logo: `/badges_leagues/concacaf-logo.svg`,
  },
  "Copa Libertadores Femenina": {
    name: "Copa Libertadores Feminina",
    logo: `/badges_leagues/conmebol-logo.svg`,
  },
  "Latvian Cup": { name: "Copa da Letônia", flag: "LV" },
  "FIFA Womens U17 World Cup": {
    name: "Copa do Mundo Sub-17 Feminina FIFA",
    logo: `/badges_leagues/fifa_logo_1.png`,
  },
};

export const translateLeague = (league: string): LeagueTranslation => {
  return leagueTranslations[league] || { name: league };
};
