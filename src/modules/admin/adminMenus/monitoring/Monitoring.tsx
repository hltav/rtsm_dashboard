// "use client";
// import React, { useState } from "react";
// import { Box, Container, Grid } from "@mui/material";
// import CriticalErrors from "./components/CriticalErros";
// import DashboardFooter from "./components/DashboardFooter";
// import DatabaseMetrics from "./components/DatabaseMetrics";
// import SystemMonitoringHeader from "./components/MonitoringHeader";
// import PerformanceReport from "./components/PerformanceReport";
// import RecentRequests from "./components/RecentRequests";
// import {
//   generateMockDatabaseMetrics,
//   generateMockRequests,
//   generateMockErrors,
// } from "../../props/monitoring/mocks.generators";

// const Monitoring = () => {
//   const [period, setPeriod] = useState("24h");
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const [dbMetrics, setDbMetrics] = useState(generateMockDatabaseMetrics());
//   const [requests, setRequests] = useState(generateMockRequests());
//   const [errors, setErrors] = useState(generateMockErrors());

//   const refreshData = () => {
//     setIsRefreshing(true);
//     setTimeout(() => {
//       setDbMetrics(generateMockDatabaseMetrics());
//       setRequests(generateMockRequests());
//       setErrors(generateMockErrors());
//       setIsRefreshing(false);
//     }, 800);
//   };

//   return (
//     <Box sx={{ width:"100%", minHeight: "100vh", py: 4 }}>
//       <Container maxWidth="xl">
//         {/* Header */}
//         <SystemMonitoringHeader
//           period={period}
//           setPeriod={setPeriod}
//           refreshData={refreshData}
//           isRefreshing={isRefreshing}
//         />

//         {/* Database Metrics */}
//         <Box sx={{ mb: 4 }}>
//           <DatabaseMetrics dbMetrics={dbMetrics} />
//         </Box>

//         {/* Middle Grid */}
//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={8}>
//             <RecentRequests requests={requests} />
//           </Grid>

//           <Grid item xs={12} lg={4}>
//             <CriticalErrors errors={errors} />
//           </Grid>
//         </Grid>

//         {/* Performance */}
//         <Box sx={{ mt: 4 }}>
//           <PerformanceReport
//             period={period}
//             data={{
//               throughput: "1.2k",
//               latencyP95: 184,
//               successRate: 99.98,
//             }}
//           />
//         </Box>

//         {/* Footer */}
//         <DashboardFooter version="2.4.0-stable" />
//       </Container>
//     </Box>
//   );
// };

// export default Monitoring;

"use client";
import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import CriticalErrors from "./components/CriticalErros";
import DashboardFooter from "./components/DashboardFooter";
import DatabaseMetrics from "./components/DatabaseMetrics";
import SystemMonitoringHeader from "./components/MonitoringHeader";
import PerformanceReport from "./components/PerformanceReport";
import RecentRequests from "./components/RecentRequests";
import { generateMockErrors } from "../../props/monitoring/mocks.generators";
import { useDatabaseMetrics } from "../../hooks/useDatabaseMetrics.hook";
import { useRequestMetrics } from "../../hooks/useRequestMetrics.hook";

const Monitoring = () => {
  const [period, setPeriod] = useState("24h");

  const { metrics, history, loading } = useDatabaseMetrics(5000);

  const { data: requestMetrics } = useRequestMetrics(10000);
  const [errors] = useState(generateMockErrors());

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <SystemMonitoringHeader
          period={period}
          setPeriod={setPeriod}
          refreshData={() => window.location.reload()}
          isRefreshing={loading}
        />

        <Box sx={{ mb: 4 }}>
          {metrics && (
            <DatabaseMetrics
              dbMetrics={metrics}
              history={history}
              loading={loading}
            />
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <RecentRequests
              requests={requestMetrics?.slowestRequests ?? []}
              avgDuration={requestMetrics?.avgDuration}
              total={requestMetrics?.total}
            />
          </Grid>

          <Grid item xs={12} lg={4}>
            <CriticalErrors errors={errors} />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <PerformanceReport
            period={period}
            data={{
              throughput: "1.2k",
              latencyP95: 184,
              successRate: 99.98,
            }}
          />
        </Box>

        <DashboardFooter version="2.4.0-stable" />
      </Container>
    </Box>
  );
};

export default Monitoring;
