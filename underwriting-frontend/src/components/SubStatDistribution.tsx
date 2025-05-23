import { DashboardStats } from "@/api/services/dashboard.service";

import { Card, Box } from "@chakra-ui/react";
import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiFile,
} from "react-icons/fi";

import { Chart, useChart } from "@chakra-ui/charts";
import { PieChart, Pie, Tooltip, Cell, LabelList, Legend } from "recharts";

interface CardProps {
  stats: DashboardStats | null;
}

const renderStatusData = (stats: DashboardStats) => {
  return [
    {
      name: "Pending",
      value: stats.submissionStatuses.pending,
      color: "#4169E1",
      icon: FiFile,
    },
    {
      name: "Under Review",
      value: stats.submissionStatuses.underReview,
      color: "#87CEEB",
      icon: FiActivity,
    },
    {
      name: "Quoted",
      value: stats.submissionStatuses.quoted,
      color: "#3182CE",
      icon: FiCheckCircle,
    },
    {
      name: "Declined",
      value: stats.submissionStatuses.declined,
      color: "#1E90FF",
      icon: FiAlertTriangle,
    },
  ];
};

const renderStatusDistribution = (stats: DashboardStats | null) => {
  if (!stats || !stats.submissionStatuses) return null;

  const statusData = renderStatusData(stats);
  const chartData = statusData.map((item) => ({
    name: item.name,
    value: item.value,
    color: item.color,
  }));

  const chart = useChart({ data: chartData });

  return (
    <Box
      height="250px"
      mt="4"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Chart.Root height = "250px" chart={chart} position="relative">
        <PieChart>
          <Tooltip cursor={false} />
          <Legend content={<Chart.Legend />} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            isAnimationActive={false}
          >
            <LabelList position="inside" fill="white" />
            {chartData.map((item) => (
              <Cell key={item.name} fill={item.color} />
            ))}
          </Pie>
        </PieChart>
      </Chart.Root>
    </Box>
  );
};

export const SubStatDistribution = ({ stats }: CardProps) => {
  return (
    <Card.Root variant="elevated" mb="6" p="4">
      <Card.Title fontSize="xl" mb="2">
        Submission Status Distribution
      </Card.Title>
      {renderStatusDistribution(stats)}
    </Card.Root>
  );
};
