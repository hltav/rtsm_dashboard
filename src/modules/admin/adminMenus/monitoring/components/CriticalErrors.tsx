// "use client";
// import React from "react";
// import {
//   Card,
//   CardContent,
//   Box,
//   Typography,
//   Button,
//   Chip,
//   useTheme,
// } from "@mui/material";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import { RecentError } from "../../../schemas/monitoring/errorMetrics.schema";

// interface CriticalErrorsProps {
//   errors: RecentError[];
//   total?: number;
//   onOpenLogs?: () => void;
// }

// const CriticalErrors: React.FC<CriticalErrorsProps> = ({
//   errors,
//   onOpenLogs,
// }) => {
//   const theme = useTheme();

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         borderRadius: 3,
//         border: 1,
//         borderColor: "divider",
//         height: "100%",
//       }}
//     >
//       <CardContent>
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             mb: 3,
//           }}
//         >
//           <ErrorOutlineIcon color="error" />
//           <Typography variant="h6" fontWeight="600">
//             Erros Críticos
//           </Typography>
//         </Box>

//         {/* Error List */}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           {errors.length === 0 ? (
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               textAlign="center"
//             >
//               Nenhum erro nas últimas 24h
//             </Typography>
//           ) : (
//             errors.map((error, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   p: 2,
//                   borderRadius: 2,
//                   borderLeft: `4px solid ${theme.palette.error.main}`,
//                   bgcolor:
//                     theme.palette.mode === "dark"
//                       ? "rgba(255,255,255,0.04)"
//                       : "rgba(0,0,0,0.03)",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mb: 0.5,
//                   }}
//                 >
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       fontWeight: 700,
//                       letterSpacing: 1,
//                       color: "error.main",
//                       fontFamily: "monospace",
//                     }}
//                   >
//                     {error.path}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {new Date(error.timestamp).toLocaleTimeString("pt-BR")}
//                   </Typography>
//                 </Box>

//                 <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
//                   {error.message}
//                 </Typography>

//                 <Chip
//                   label="CRÍTICO"
//                   size="small"
//                   color="error"
//                   sx={{ fontSize: 10, fontWeight: 700 }}
//                 />
//               </Box>
//             ))
//           )}

//           {/* Open Logs Button */}
//           <Button
//             variant="outlined"
//             onClick={onOpenLogs}
//             sx={{
//               mt: 1,
//               borderStyle: "dashed",
//               textTransform: "none",
//               color: "text.primary",
//               borderColor: "text.primary",
//               "&:hover": {
//                 borderStyle: "solid",
//               },
//             }}
//           >
//             Abrir Log de Erros Completo
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default CriticalErrors;

"use client";
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
  useTheme,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { RecentError } from "../../../schemas/monitoring/errorMetrics.schema";

interface CriticalErrorsProps {
  errors: RecentError[];
  total?: number;
  onOpenLogs?: () => void;
}

const CriticalErrors: React.FC<CriticalErrorsProps> = ({
  errors,
  onOpenLogs,
}) => {
  const theme = useTheme();

  // Ajuste fino aqui (altura aproximada de 1 card de erro + gap)
  const ROW_HEIGHT = 88; // px (tweak se precisar)
  const GAP = 16; // gap: 2 => 16px
  const MAX_ROWS = 5;

  // Altura total para "reservar" espaço de 5 cards (inclui gaps entre eles)
  const listHeight = useMemo(() => {
    const gaps = GAP * (MAX_ROWS - 1);
    return ROW_HEIGHT * MAX_ROWS + gaps;
  }, []);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <ErrorOutlineIcon color="error" />
          <Typography variant="h6" fontWeight="600">
            Erros Críticos
          </Typography>
        </Box>

        {/* Viewport fixo: reserva 5 cards e ativa scroll depois disso */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              height: listHeight, // ✅ sempre mantém espaço de 5 cards
              overflowY: errors.length > MAX_ROWS ? "auto" : "hidden", // ✅ scroll só quando passar de 5
              pr: errors.length > MAX_ROWS ? 1 : 0, // ✅ espaço pro scrollbar não “amassar” conteúdo
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {errors.length === 0 ? (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Nenhum erro nas últimas 24h
                  </Typography>
                </Box>
              ) : (
                errors.map((error, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      borderLeft: `4px solid ${theme.palette.error.main}`,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0.03)",
                      minHeight: ROW_HEIGHT, // ✅ ajuda a manter cada card com “tamanho padrão”
                      boxSizing: "border-box",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          letterSpacing: 1,
                          color: "error.main",
                          fontFamily: "monospace",
                        }}
                      >
                        {error.path}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(error.timestamp).toLocaleTimeString("pt-BR")}
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                      {error.message}
                    </Typography>

                    <Chip
                      label="CRÍTICO"
                      size="small"
                      color="error"
                      sx={{ fontSize: 10, fontWeight: 700 }}
                    />
                  </Box>
                ))
              )}
            </Box>
          </Box>

          {/* Open Logs Button (fora do viewport, fica sempre visível) */}
          <Button
            variant="outlined"
            onClick={onOpenLogs}
            sx={{
              mt: 1,
              borderStyle: "dashed",
              textTransform: "none",
              color: "text.primary",
              borderColor: "text.primary",
              "&:hover": {
                borderStyle: "solid",
              },
            }}
          >
            Abrir Log de Erros Completo
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CriticalErrors;
