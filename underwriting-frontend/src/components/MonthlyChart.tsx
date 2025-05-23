import { DashboardStats } from "@/api/services/dashboard.service";
import colors from "@/utils/colors";
import { Card, Center, VStack, Text, Icon, Box, Flex } from "@chakra-ui/react";
import { FiBarChart2 } from "react-icons/fi";
import { ProgressBar } from "./ProgessBar";

interface CardProps {
  stats: DashboardStats | null;
}

const renderMonthlyChart = (stats: DashboardStats | null) => {
  if (!stats || !stats.submissionsByMonth) return null;

  const months = Object.entries(stats.submissionsByMonth);

  if (months.length === 0) {
    return (
      <Center py={6} bg="gray.50" borderRadius="md">
        <VStack>
          <Icon as={FiBarChart2} w={10} h={10} color="gray.400" />
          <Text color="gray.500">No monthly trend data available yet</Text>
          <Text fontSize="sm" color="gray.500">
            Data will appear as new submissions are added
          </Text>
        </VStack>
      </Center>
    );
  }

  const maxCount = Math.max(...months.map(([_, count]) => count as number));

  return (
    <Box mt={4}>
      {months.map(([month, count]) => (
        <Box key={month} mb={3}>
          <Flex justify="space-between" mb={1}>
            <Text fontSize="sm">{month}</Text>
            <Text fontSize="sm" fontWeight="bold">
              {count}
            </Text>
          </Flex>
          <ProgressBar
            value={((count as number) / maxCount) * 100}
            colorScheme={colors.blue}
          />
        </Box>
      ))}
    </Box>
  );
};

export const MonthlyChart = ({ stats }: CardProps) => {
  return (
    <Card.Root variant="elevated" p="4" mb="4">
      <Card.Title fontSize="xl">Monthly Submission Trend</Card.Title>
      {renderMonthlyChart(stats)}
    </Card.Root>
  );
};
