import { DashboardStats } from "@/api/services/dashboard.service";
import colors from "@/utils/colors";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Icon,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FiPieChart, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "./ProgessBar";
import { customScrollbar } from "@/utils/customScrollbar";

interface CardProps {
  stats: DashboardStats | null;
}

const renderIndustryChart = (stats: DashboardStats | null) => {
  const navigate = useNavigate();
  if (!stats || !stats.submissionsByIndustry) return null;

  const industries = Object.entries(stats.submissionsByIndustry);

  if (industries.length === 0) {
    return (
      <Center py={6} bg="gray.50" borderRadius="md">
        <VStack>
          <Icon as={FiPieChart} w={10} h={10} color="gray.400" />
          <Text color="gray.500">No industry data available</Text>
          <Box>
            <Button
              size="sm"
              bg={colors.blue}
              color="white"
              variant="outline"
              width="350px"
              onClick={() => navigate("/submissions/new")}
            >
              <Icon as={FiPlus} mr={2} />
              Add Submission
            </Button>
          </Box>
        </VStack>
      </Center>
    );
  }

  const total = industries.reduce(
    (sum, [_, count]) => sum + (count as number),
    0
  );

  return (
    <Box mt={4} overflowY="auto" height="255px" css={customScrollbar}>
      <Box pr={4}>
        {industries.map(([industry, count]) => (
          <Box key={industry} mb={3}>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="sm">{industry}</Text>
              <Text fontSize="sm" fontWeight="bold">
                {count} ({Math.round(((count as number) / total) * 100)}%)
              </Text>
            </Flex>
            <ProgressBar value={((count as number) / total) * 100} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const IndustrySubmissions = ({ stats }: CardProps) => {
  return (
    <Card.Root variant="elevated" mb="6" p="4">
      <Card.Title fontSize="xl">Submissions By Industry</Card.Title>
      {renderIndustryChart(stats)}
    </Card.Root>
  );
};
