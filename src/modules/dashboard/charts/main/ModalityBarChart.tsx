// import React, { useMemo } from "react";
// import { BarChart } from "@mui/x-charts";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import { useTheme } from "@mui/material";
// import { axisClasses } from "@mui/x-charts/ChartsAxis";
// import { useEvents } from "@/modules/events/hooks/useEvents";
// import { colors } from "../interface/colors.interface";

// interface ModalityBarChartProps {
//   selectedBankrollId: number | null;
// }

// const ModalityBarChart: React.FC<ModalityBarChartProps> = ({
//   selectedBankrollId,
// }) => {
//   const theme = useTheme();
//   const { events, loading } = useEvents();
//   const chartHeight = 300;
//   const filteredEvents = useMemo(() => {
//     if (selectedBankrollId === null) return events;
//     return events.filter((e) => e.bankrollId === selectedBankrollId);
//   }, [events, selectedBankrollId]);

//   const modalityChartData = useMemo(() => {
//     const map: { [key: string]: number } = {};

//     filteredEvents.forEach((event) => {
//       const modality = event.market || "Sem aposta";
//       if (!map[modality]) {
//         map[modality] = 0;
//       }
//       map[modality]++;
//     });

//     return Object.keys(map)
//       .map((mod) => ({
//         name: mod,
//         wagers: map[mod],
//       }))
//       .sort((a, b) => b.wagers - a.wagers);
//   }, [filteredEvents]);

//   // const xAxisData = modalityChartData.map((d) => d.name);
//   const xAxisData = ["Mercados"];

//   const barSeries = modalityChartData.map((d, index) => ({
//     data: [d.wagers], // cada série só tem um valor
//     label: d.name, // nome da modalidade
//     color: colors[index % colors.length], // pega cor ciclando
//     barWidth: 8,
//   }));

//   if (loading) {
//     return (
//       <Card sx={{ height: "100%" }}>
//         <CardContent
//           sx={{
//             height: 350,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <CircularProgress />
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card sx={{ height: "100%" }} elevation={0}>
//       <CardContent>
//         <Box sx={{ height: chartHeight, width: "100%" }}>
//           {modalityChartData.length > 0 ? (
//             <BarChart
//               height={chartHeight}
//               series={barSeries}
//               xAxis={[
//                 { data: xAxisData, scaleType: "band", categoryGapRatio: 0.93 },
//               ]}
//               yAxis={[{ label: "Qtd. Apostas" }]}
//               margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
//               grid={{ horizontal: true }}
//               sx={{
//                 [`& .${axisClasses.left} .${axisClasses.tickLabel}`]: {
//                   fill: theme.palette.text.secondary,
//                 },
//                 [`& .${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
//                   fill: theme.palette.text.secondary,
//                 },
//               }}
//             />
//           ) : (
//             <Box
//               sx={{
//                 height: 300,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Typography color="text.secondary">
//                 Nenhuma aposta cadastrada para exibir.
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default ModalityBarChart;

import React, { useMemo, useState } from "react";
import { BarChart } from "@mui/x-charts";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEvents } from "@/modules/events/hooks/useEvents";
import { colors } from "../interface/colors.interface";

interface ModalityBarChartProps {
  selectedBankrollId: number | null;
}

const ModalityBarChart: React.FC<ModalityBarChartProps> = ({
  selectedBankrollId,
}) => {
  const theme = useTheme();
  const { events, loading } = useEvents();
  const chartHeight = 300;

  // Estados para seleção hierárquica
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [selectedSelection, setSelectedSelection] = useState<string | null>(
    null,
  );

  // Filtra eventos pelo bankroll
  const filteredEvents = useMemo(() => {
    if (selectedBankrollId === null) return events;
    return events.filter((e) => e.bankrollId === selectedBankrollId);
  }, [events, selectedBankrollId]);

  // Gera dados do gráfico conforme seleção
  const modalityChartData = useMemo(() => {
    const map: { [key: string]: number } = {};

    filteredEvents.forEach((event) => {
      let key = "Sem aposta";

      if (selectedCategory === "all") {
        key = event.marketCategory || "Sem categoria";
      } else if (selectedMarket === null) {
        if (event.marketCategory === selectedCategory) {
          key = event.market || "Sem mercado";
        }
      } else if (selectedSelection === null) {
        if (event.market === selectedMarket) {
          key = event.selection || "Sem opção";
        }
      } else {
        if (event.selection === selectedSelection) {
          key = event.selection;
        }
      }

      if (!map[key]) map[key] = 0;
      map[key]++;
    });

    return Object.keys(map)
      .map((mod) => ({
        name: mod,
        wagers: map[mod],
      }))
      .sort((a, b) => b.wagers - a.wagers);
  }, [filteredEvents, selectedCategory, selectedMarket, selectedSelection]);

  const barSeries = modalityChartData.map((d, index) => ({
    label: d.name,
    data: [d.wagers], // apenas um valor por série
    color: colors[index % colors.length], // cor única por série
    barWidth: 8,
  }));

  if (loading) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent
          sx={{
            height: 350,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  // Opções únicas para cada nível
  const categories = [...new Set(events.map((e) => e.marketCategory))];
  const markets =
    selectedCategory !== "all"
      ? [
          ...new Set(
            events
              .filter((e) => e.marketCategory === selectedCategory)
              .map((e) => e.market),
          ),
        ]
      : [];
  const selections =
    selectedMarket !== null
      ? [
          ...new Set(
            events
              .filter((e) => e.market === selectedMarket)
              .map((e) => e.selection),
          ),
        ]
      : [];

  return (
    <Card sx={{ height: "100%" }} elevation={0}>
      <CardContent>
        {/* Selects hierárquicos */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedMarket(null);
              setSelectedSelection(null);
            }}
          >
            <MenuItem value="all">Todos os tipos</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>

          {selectedCategory !== "all" && (
            <Select
              value={selectedMarket || ""}
              displayEmpty
              onChange={(e) => {
                setSelectedMarket(e.target.value);
                setSelectedSelection(null);
              }}
            >
              <MenuItem value="">Todos os mercados</MenuItem>
              {markets.map((mkt) => (
                <MenuItem key={mkt} value={mkt}>
                  {mkt}
                </MenuItem>
              ))}
            </Select>
          )}

          {selectedMarket && (
            <Select
              value={selectedSelection || ""}
              displayEmpty
              onChange={(e) => setSelectedSelection(e.target.value)}
            >
              <MenuItem value="">Todas as opções</MenuItem>
              {selections.map((sel) => (
                <MenuItem key={sel} value={sel}>
                  {sel}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>

        {/* Gráfico */}
        <Box sx={{ height: chartHeight, width: "100%" }}>
          {modalityChartData.length > 0 ? (
            <BarChart
              height={chartHeight}
              series={barSeries}
              xAxis={[
                {
                  data: modalityChartData.map((d) => d.name),
                  scaleType: "band",
                  categoryGapRatio: 0.93,
                },
              ]}
              yAxis={[{ label: "Qtd. Apostas" }]}
              margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
              grid={{ horizontal: true }}
              sx={{
                [`& .${axisClasses.left} .${axisClasses.tickLabel}`]: {
                  fill: theme.palette.text.secondary,
                },
                [`& .${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                  fill: theme.palette.text.secondary,
                  transform: "rotate(-45deg)",
                  textAnchor: "end",
                },
              }}
            />
          ) : (
            <Box
              sx={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="text.secondary">
                Nenhuma aposta cadastrada para exibir.
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModalityBarChart;
