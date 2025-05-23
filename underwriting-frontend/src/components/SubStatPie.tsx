import { DashboardStats } from "@/api/services/dashboard.service";
import colors from "@/utils/colors";
import {
  Card,
  Center,
  Icon,
  VStack,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiFile,
  FiList,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { BarList, BarListData, useChart } from "@chakra-ui/charts";

interface CardProps {
  stats: DashboardStats | null;
}

const renderStatusData = (stats: DashboardStats) => {
  return [
    {
      name: "Pending",
      value: stats.submissionStatuses.pending,
      color: "orange",
      icon: FiFile,
    },
    {
      name: "Under Review",
      value: stats.submissionStatuses.underReview,
      color: "blue",
      icon: FiActivity,
    },
    {
      name: "Quoted",
      value: stats.submissionStatuses.quoted,
      color: "green",
      icon: FiCheckCircle,
    },
    {
      name: "Declined",
      value: stats.submissionStatuses.declined,
      color: "red",
      icon: FiAlertTriangle,
    },
  ];
};

const renderStatusDistribution = (stats: DashboardStats | null) => {
  const navigate = useNavigate();
  if (!stats || !stats.submissionStatuses) return null;
  const hasData = Object.values(stats.submissionStatuses).some(
    (count) => (count as number) > 0
  );
  if (!hasData) {
    return (
      <Center py={6} bg="gray.50" borderRadius="md">
        <VStack>
          <Icon as={FiList} w={10} h={10} color={colors.gray2} />
          <Text color={colors.gray1}>No submission status data</Text>
          <Box>
            <Button
              size="sm"
              bg={colors.blue}
              color="white"
              variant="outline"
              width="700px"
              onClick={() => navigate("/submissions/new")}
            >
              <Icon as={FiPlus} mr={2} />
              Create First Submission
            </Button>
          </Box>
        </VStack>
      </Center>
    );
  }

  const statusData = renderStatusData(stats);
  const chartData = statusData.map((item) => ({
    name: item.name,
    value: item.value,
  }));
  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: chartData,
    series: [{ name: "name", color: `${colors.blue}`, }],
  });

  const getPercent = (value:number)=>{
    return Math.round((value / stats.totalSubmissions) * 100)
  }

  return (
    <Box mt="4">
      <BarList.Root fontWeight="semibold"  chart={chart} >
        <BarList.Content >
          <BarList.Bar tooltip/>
          <BarList.Value color="black" valueFormatter={(value) => `${getPercent(value)}%`}/>
        </BarList.Content>
      </BarList.Root>
    </Box>
  );
};

export const SubStatDistribution = ({ stats }: CardProps) => {
  return (
    <Card.Root variant="elevated" mb="6" p="4">
      <Card.Title fontSize="xl" mb="2">Submission Status Distribution</Card.Title>
      {renderStatusDistribution(stats)}
    </Card.Root>
  );
};
