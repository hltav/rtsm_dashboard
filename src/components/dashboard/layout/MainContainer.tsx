// "use client";

// import React from "react";
// import { Box } from "@mui/material";

// interface MainContainerProps {
//   open: boolean;
//   children: React.ReactNode;
// }

// export const MainContainer: React.FC<MainContainerProps> = ({
//   open,
//   children,
// }) => {
//   return (
//     <Box
//       sx={{
//         width: {
//           xs: "100%",
//           md: `calc(100% - ${open ? 5 : 20}px)`,
//         },
//         mt: "64px",
//         ml: {
//           xs: 0,
//           md: open ? "5px" : "20px",
//         },
//       }}
//     >
//       {children}
//     </Box>
//   );
// };
