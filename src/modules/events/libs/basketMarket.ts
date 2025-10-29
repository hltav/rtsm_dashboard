export const basketballMarket: Record<string, Record<string, string[]>> = {
  Resultado: {
    "Resultado Final": ["Casa", "Visitante"],
    "Empate (apenas em prorrogação)": ["Sim", "Não"],
  },
  Handicap: {
    "Handicap da Partida": [
      "-20", "-15", "-10", "-5", "0", "+5", "+10", "+15", "+20"
    ],
    "Handicap por Quarto": [
      "-10", "-5", "0", "+5", "+10"
    ],
  },
  Total: {
    "Total de Pontos (Over/Under)": [
      "Mais de 150.5", "Mais de 160.5", "Mais de 170.5",
      "Menos de 150.5", "Menos de 160.5", "Menos de 170.5"
    ],
    "Total de Pontos da Equipe da Casa": [
      "Mais de 75.5", "Mais de 80.5", "Mais de 85.5",
      "Menos de 75.5", "Menos de 80.5", "Menos de 85.5"
    ],
    "Total de Pontos da Equipe Visitante": [
      "Mais de 75.5", "Mais de 80.5", "Mais de 85.5",
      "Menos de 75.5", "Menos de 80.5", "Menos de 85.5"
    ],
  },
  Quarters: {
    "Vencedor 1º Quarto": ["Casa", "Visitante"],
    "Vencedor 2º Quarto": ["Casa", "Visitante"],
    "Vencedor 3º Quarto": ["Casa", "Visitante"],
    "Vencedor 4º Quarto": ["Casa", "Visitante"],
    "Total de Pontos por Quarto (Over/Under)": [
      "Mais de 40.5", "Mais de 45.5", "Menos de 40.5", "Menos de 45.5"
    ],
  },
  PlayerProps: {
    "Pontos do Jogador": ["Mais de 10.5", "Mais de 15.5", "Mais de 20.5", "Menos de 10.5", "Menos de 15.5", "Menos de 20.5"],
    "Rebotes do Jogador": ["Mais de 5.5", "Mais de 10.5", "Menos de 5.5", "Menos de 10.5"],
    "Assistências do Jogador": ["Mais de 5.5", "Mais de 10.5", "Menos de 5.5", "Menos de 10.5"],
    "Jogador faz Double Double?": ["Sim", "Não"],
    "Jogador faz Triple Double?": ["Sim", "Não"],
  },
  LiveMarkets: {
    "Próximo a Pontuar": ["Casa", "Visitante", "Sem pontuação"],
    "Próximo Quarto Vencedor": ["Casa", "Visitante"],
    "Total de Pontos Próximos 5 Minutos": ["Mais de 12.5", "Menos de 12.5"],
  },
  Futures: {
    "Campeão da Temporada": [],
    "Top 4 / Top 8": [],
    "MVP da Temporada": [],
    "Equipe com mais vitórias": [],
  },
};

export const getBasketballMarketOptions = (category: string, submarket: string): string[] => {
  return basketballMarket[category]?.[submarket] || [];
};
