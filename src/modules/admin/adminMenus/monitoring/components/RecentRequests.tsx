"use client";
import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { getMethodColor } from "../../../props/monitoring/metricCard.props";
import { BarChart3 } from "lucide-react";
import { SlowRequest } from "../../../schemas/monitoring/requestMetrics.schema";

interface RecentRequestsProps {
  requests: SlowRequest[];
  avgDuration?: string;
  total?: number;
  onViewAll?: () => void;
}

const RecentRequests: React.FC<RecentRequestsProps> = ({
  requests,
  onViewAll,
}) => {
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
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BarChart3 color="primary" />
            <Typography variant="h6" fontWeight="600">
              Requisições Recentes
            </Typography>
          </Box>

          <Button
            size="small"
            onClick={onViewAll}
            sx={{ textTransform: "none" }}
          >
            Ver Todas
          </Button>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Endpoint</TableCell>
                <TableCell>Método</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tempo</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {requests.map((req, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell sx={{ fontFamily: "monospace", fontSize: 13 }}>
                    {req.path}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={req.method}
                      size="small"
                      color={getMethodColor(req.method)}
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "success.main",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "success.main",
                        }}
                      />
                      200
                    </Box>
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                    {req.duration}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RecentRequests;
