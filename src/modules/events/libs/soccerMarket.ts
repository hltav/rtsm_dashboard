export const soccerMarket: Record<
  string,
  Record<string, { options: string[] }>
> = {
  Resultado: {
    "Resultado Final": {
      options: ["Casa", "Empate", "Fora"],
    },
    "Empate Anula Aposta": { options: ["Casa", "Fora"] },
    "Dupla Chance": {
      options: ["Casa ou Empate", "Fora ou Empate", "Casa ou Fora"],
    },
    "Placar Exato": {
      options: [
        "0-0",
        "1-0",
        "2-0",
        "2-1",
        "3-0",
        "3-1",
        "3-2",
        "1-1",
        "2-2",
        "3-3",
        "0-1",
        "0-2",
        "1-2",
        "0-3",
        "1-3",
        "2-3",
      ],
    },
    "Intervalo/Final": {
      options: [
        "Casa/Casa",
        "Casa/Empate",
        "Casa/Fora",
        "Empate/Casa",
        "Empate/Empate",
        "Empate/Fora",
        "Fora/Casa",
        "Fora/Empate",
        "Fora/Fora",
      ],
    },
  },
  Gols: {
    "Gols (Over/Under)": {
      options: [
        "Mais de 0.5",
        "Mais de 1.5",
        "Mais de 2.5",
        "Mais de 3.5",
        "Mais de 4.5",
        "Menos de 0.5",
        "Menos de 1.5",
        "Menos de 2.5",
        "Menos de 3.5",
        "Menos de 4.5",
      ],
    },
    "Ambas as Equipes Marcam (BTTS)": {
      options: [
        "Ambos marcam - Sim",
        "Ambos marcam - Não",
        "Ambos marcam e + 2.5 gols - Sim",
        "Ambos marcam e + 2.5 gols - Não",
        "Ambos marcam ou + 2.5 gols - Sim",
        "Ambos marcam ou + 2.5 gols - Não",
      ],
    },
    "Total Exato de Gols": { options: ["0", "1", "2", "3", "4", "5", "6+"] },
    "Equipe Marca": {
      options: ["Casa: Sim", "Casa: Não", "Fora: Sim", "Fora: Não"],
    },
    "Marcador de Gols": {
      options: [
        "Primeiro a marcar",
        "Último a marcar",
        "A qualquer momento",
        "Dois ou mais gols",
        "Hat-trick",
      ],
    },
  },
  Handicap: {
    "Handicap Europeu": { options: ["-2", "-1", "+1", "+2"] },
    "Handicap Asiático": {
      options: [
        "-2.0",
        "-1.75",
        "-1.5",
        "-1.25",
        "-1",
        "-0.75",
        "-0.5",
        "-0.25",
        "0",
        "+0.25",
        "+0.5",
        "+0.75",
        "+1",
        "+1.25",
        "+1.5",
        "+1.75",
        "+2.0",
      ],
    },
  },
  Escanteios: {
    "Escanteios (Over/Under)": {
      options: [
        "Mais de 5.5",
        "Mais de 6.5",
        "Mais de 7.5",
        "Mais de 8.5",
        "Mais de 9.5",
        "Mais de 10.5",
        "Mais de 11.5",
        "Mais de 12.5",
        "Menos de 5.5",
        "Menos de 6.5",
        "menos de 7.5",
        "menos de 8.5",
        "menos de 9.5",
        "menos de 10.5",
        "menos de 11.5",
        "menos de 12.5",
      ],
    },
    "Escanteios por Equipe": { options: ["Casa", "Fora"] },
    "Handicap de Escanteios": { options: ["Casa -1.5", "Fora +1.5"] },
    "Primeiro Escanteio": { options: ["Casa", "Fora"] },
    "Último Escanteio": { options: ["Casa", "Fora"] },
  },
  Cartões: {
    "Cartões (Over/Under)": {
      options: [
        "Mais de 2.5",
        "Mais de 3.5",
        "Mais de 4.5",
        "Mais de 5.5",
        "Menos de 2.5",
        "Menos de 3.5",
        "Menos de 4.5",
        "Menos de 5.5",
      ],
    },
    "Cartões por Equipe": { options: ["Casa", "Fora"] },
    "Cartões por Jogador": { options: ["Qualquer jogador"] },
    "Primeiro Cartão": { options: ["Casa", "Fora"] },
    "Cartão Vermelho?": { options: ["Sim", "Não"] },
  },
  Tempos: {
    "Resultado do 1º Tempo": { options: ["Casa", "Empate", "Fora"] },
    "Resultado do 2º Tempo": { options: ["Casa", "Empate", "Fora"] },
    "Ambas Marcam por Tempo": { options: ["1º Tempo", "2º Tempo"] },
    "Gols por Tempo": {
      options: ["Mais de 0.5 no 1º Tempo", "Mais de 0.5 no 2º Tempo"],
    },
    "Handicap por Tempo": {
      options: ["Casa -0.5 1º Tempo", "Fora +0.5 2º Tempo"],
    },
  },
  Minutagem: {
    "Gol entre minutos": {
      options: ["0-10", "11-20", "21-30", "31-45", "46-60", "61-75", "76-90+"],
    },
    "Momento do Primeiro Gol": {
      options: ["0-15", "16-30", "31-45+", "Sem gol"],
    },
    "Gol nos minutos finais": { options: ["Sim (75-90+)", "Não"] },
  },
  "Especiais e Exóticos": {
    "Gol Contra": { options: ["Sim", "Não"] },
    "Pênalti no Jogo": { options: ["Sim", "Não"] },
    "Pênalti Convertido": { options: ["Sim", "Não"] },
    "Jogador Expulso": { options: ["Sim", "Não"] },
    "Número Par/Ímpar de Gols": { options: ["Par", "Ímpar"] },
    "Gol nos Dois Tempos": { options: ["Sim", "Não"] },
    "Vence Sem Sofrer Gol": { options: ["Sim", "Não"] },
    "Ambas Marcam em Ambos os Tempos": { options: ["Sim", "Não"] },
    "Resultado Combinado (Vitória + Ambas Marcam)": {
      options: ["Casa + Sim", "Fora + Sim"],
    },
  },
  "Live Markets": {
    "Próximo Gol": { options: ["Casa", "Fora", "Sem mais gols"] },
    "Próximo Escanteio": { options: ["Casa", "Fora"] },
    "Próxima Finalização Perigosa": { options: ["Casa", "Fora"] },
    "Resultado dos Próximos 10 Minutos": {
      options: ["Casa", "Empate", "Fora"],
    },
    "Gols a partir de agora": {
      options: ["Mais de 0.5", "Mais de 1.5", "Nenhum"],
    },
  },
  "Futures / Longo Prazo": {
    "Campeão do Campeonato": { options: [] },
    "Top 4 / Top 6 / Top 10": { options: [] },
    "Artilheiro da Competição": { options: [] },
    Rebaixamento: { options: [] },
    "Classificação para Competições Internacionais": { options: [] },
    "Duelo de Temporada (quem termina acima)": {
      options: ["Time A vs Time B"],
    },
  },
  "Combinações e Criar Aposta": {
    "Bet Builder": {
      options: [
        "Ambas marcam + Total de Gols",
        "Ambas marcam ou mais de 2.5 gols",
        "Jogador X marca + Equipe vence",
        "Total de Escanteios + Cartões + Resultado Final",
        "Handicap + BTTS + Over",
      ],
    },
    "Combos Populares": {
      options: [
        "Vitória + Over 2.5",
        "Ambas Marcam + Over 2.5",
        "Empate + Under 2.5",
      ],
    },
  },
};

export const getSoccerMarketOptions = (
  category: string,
  submarket: string
): string[] => {
  const data = soccerMarket[category]?.[submarket];

  if (!data) return [];

  if ("options" in data) return data.options;

  if (Array.isArray(data)) return data;

  return [];
};
