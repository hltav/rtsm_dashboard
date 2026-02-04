// "use client";
// import React, { useMemo } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   CircularProgress,
//   useTheme,
// } from "@mui/material";
// import { LineChart, axisClasses } from "@mui/x-charts";
// import { useBankrollContext } from "@/components/Providers/BankrollContext";
// import { formatCurrency } from "@/utils/formatCurrency";

// const MonthlyPLChart: React.FC = () => {
//   const theme = useTheme();
//   const { selectedBankroll, isLoading, error } = useBankrollContext();
//   const chartHeight = 300;

//   const chartMetrics = useMemo(() => {
//     const history = selectedBankroll?.history || [];
//     const monthlyPLMap = new Map<string, number>();

//     history
//       .slice()
//       .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//       .forEach((item) => {
//         const dateKey = new Date(item.date).toLocaleDateString("pt-BR", {
//           month: "short",
//           year: "numeric",
//         });

//         const isBetResult =
//           item.type === "BET_WON" ||
//           item.type === "BET_LOST" ||
//           item.type === "BET_VOID";

//         let profit = 0;
//         if (
//           isBetResult &&
//           item.actualReturn !== null &&
//           item.actualReturn !== undefined
//         ) {
//           profit = item.actualReturn;
//         }

//         monthlyPLMap.set(dateKey, (monthlyPLMap.get(dateKey) || 0) + profit);
//       });

//     const chartData: number[] = [];
//     const xAxisLabels: string[] = [];
//     let cumulative = 0;

//     for (const [month, profit] of monthlyPLMap.entries()) {
//       cumulative += profit;
//       chartData.push(cumulative);
//       xAxisLabels.push(month);
//     }

//     const values = chartData.length ? chartData : [0];
//     return {
//       chartData,
//       xAxisLabels,
//       minProfit: Math.min(...values),
//       maxProfit: Math.max(...values),
//     };
//   }, [selectedBankroll]);

//   const { chartData, xAxisLabels, minProfit, maxProfit } = chartMetrics;

//   const lineSeries = [
//     {
//       data: chartData,
//       label: "P/L Acumulado",
//       color: theme.palette.primary.main,
//       yAxisKey: "profitAxis",
//       valueFormatter: (v: number | null) =>
//         v !== null ? formatCurrency(v) : "",
//     },
//   ];

//   if (isLoading) {
//     return (
//       <Card sx={{ height: "100%" }}>
//         <CardContent
//           sx={{
//             height: chartHeight,
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

//   if (error || !selectedBankroll || xAxisLabels.length === 0) {
//     return (
//       <Card sx={{ height: "100%" }}>
//         <CardContent
//           sx={{
//             height: chartHeight,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             P/L Mensal
//           </Typography>
//           <Typography color="text.secondary">
//             {error
//               ? `Erro: ${error.message}`
//               : "Nenhum histórico de P/L disponível para a banca selecionada."}
//           </Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   const yMargin = (maxProfit - minProfit) * 0.1 || 10;

//   return (
//     <Card
//       sx={{
//         height: "100%",
//         bgcolor: "background.paper",
//         color: "text.primary",
//       }}
//       elevation={0}
//     >
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           P/L Mensal Acumulado – {selectedBankroll.name}
//         </Typography>

//         <Box sx={{ height: chartHeight, width: "100%" }}>
//           <LineChart
//             height={chartHeight}
//             series={lineSeries}
//             xAxis={[
//               {
//                 data: xAxisLabels,
//                 scaleType: "point",
//               },
//             ]}
//             yAxis={[
//               {
//                 id: "profitAxis",
//                 min: minProfit - yMargin,
//                 max: maxProfit + yMargin,
//               },
//             ]}
//             margin={{ top: 20, right: 30, left: 70, bottom: 50 }}
//             grid={{ horizontal: true }}
//             sx={{
//               [`& .${axisClasses.left} .${axisClasses.tickLabel}`]: {
//                 fill: theme.palette.text.primary,
//               },
//               [`& .${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
//                 fill: theme.palette.text.primary,
//                 transform: "rotate(-45deg)",
//                 textAnchor: "end",
//               },
//               [`& .MuiChartsAxis-directionY .MuiChartsAxis-line`]: {
//                 stroke: theme.palette.text.primary,
//               },
//               [`& .MuiChartsAxis-directionX .MuiChartsAxis-line`]: {
//                 stroke: theme.palette.text.primary,
//               },
//               "& .MuiChartsGrid-line": {
//                 stroke: theme.palette.text.disabled,
//                 opacity: 0.2,
//               },
//               "& .MuiLineElement-root": {
//                 stroke: theme.palette.primary.main,
//                 strokeWidth: 2,
//               },
//             }}
//           />
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default MonthlyPLChart;
"use client";
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { LineChart, axisClasses } from "@mui/x-charts";
import { useBankrollContext } from "@/components/Providers/BankrollContext";
import { formatCurrency } from "@/utils/formatCurrency";

const MonthlyPLChart: React.FC = () => {
  const theme = useTheme();
  const { selectedBankroll, isLoading, error } = useBankrollContext();
  const chartHeight = 300;

  const chartMetrics = useMemo(() => {
    const history = selectedBankroll?.histories || [];
    const monthlyPLMap = new Map<string, number>();

    history
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach((item) => {
        const dateKey = new Date(item.date).toLocaleDateString("pt-BR", {
          month: "short",
          year: "numeric",
        });

        // Calcula o P/L apenas para eventos de apostas
        const isBetResult =
          item.type === "BET_WON" ||
          item.type === "BET_LOST" ||
          item.type === "BET_VOID";

        if (isBetResult) {
          // P/L = diferença de saldo (balanceAfter - balanceBefore)
          const profit = item.balanceAfter - item.balanceBefore;
          monthlyPLMap.set(dateKey, (monthlyPLMap.get(dateKey) || 0) + profit);
        }
      });

    const chartData: number[] = [];
    const xAxisLabels: string[] = [];
    let cumulative = 0;

    for (const [month, profit] of monthlyPLMap.entries()) {
      cumulative += profit;
      chartData.push(cumulative);
      xAxisLabels.push(month);
    }

    const values = chartData.length ? chartData : [0];
    return {
      chartData,
      xAxisLabels,
      minProfit: Math.min(...values),
      maxProfit: Math.max(...values),
    };
  }, [selectedBankroll]);

  const { chartData, xAxisLabels, minProfit, maxProfit } = chartMetrics;

  const lineSeries = [
    {
      data: chartData,
      label: "P/L Acumulado",
      color: theme.palette.primary.main,
      yAxisKey: "profitAxis",
      valueFormatter: (v: number | null) =>
        v !== null ? formatCurrency(v) : "",
    },
  ];

  if (isLoading) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent
          sx={{
            height: chartHeight,
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

  if (error || !selectedBankroll || xAxisLabels.length === 0) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent
          sx={{
            height: chartHeight,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            P/L Mensal
          </Typography>
          <Typography color="text.secondary">
            {error
              ? `Erro: ${error.message}`
              : "Nenhum histórico de P/L disponível para a banca selecionada."}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const yMargin = (maxProfit - minProfit) * 0.1 || 10;

  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
      elevation={0}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          P/L Mensal Acumulado – {selectedBankroll.name}
        </Typography>

        <Box sx={{ height: chartHeight, width: "100%" }}>
          <LineChart
            height={chartHeight}
            series={lineSeries}
            xAxis={[
              {
                data: xAxisLabels,
                scaleType: "point",
              },
            ]}
            yAxis={[
              {
                id: "profitAxis",
                min: minProfit - yMargin,
                max: maxProfit + yMargin,
              },
            ]}
            margin={{ top: 20, right: 30, left: 70, bottom: 50 }}
            grid={{ horizontal: true }}
            sx={{
              [`& .${axisClasses.left} .${axisClasses.tickLabel}`]: {
                fill: theme.palette.text.primary,
              },
              [`& .${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                fill: theme.palette.text.primary,
                transform: "rotate(-45deg)",
                textAnchor: "end",
              },
              [`& .MuiChartsAxis-directionY .MuiChartsAxis-line`]: {
                stroke: theme.palette.text.primary,
              },
              [`& .MuiChartsAxis-directionX .MuiChartsAxis-line`]: {
                stroke: theme.palette.text.primary,
              },
              "& .MuiChartsGrid-line": {
                stroke: theme.palette.text.disabled,
                opacity: 0.2,
              },
              "& .MuiLineElement-root": {
                stroke: theme.palette.primary.main,
                strokeWidth: 2,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyPLChart;
