import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  Badge,
  HStack,
  Icon,
  Button,
  Center,
  VStack,
  BoxProps,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  FiBarChart2,
  FiDollarSign,
  FiActivity,
  FiCheckCircle,
  FiAlertTriangle,
  FiFile,
  FiPlus,
  FiList,
  FiPieChart,
  FiFolderPlus,
} from "react-icons/fi";
import {
  DashboardService,
  DashboardStats,
} from "../api/services/dashboard.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import colors from "../utils/colors";

// Custom components to replace Chakra UI components with linter issues
interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  subtext: string;
}

const StatCard = ({ title, value, icon, subtext }: StatCardProps) => (
  <Box p={6} bg="blue.50" borderRadius="md" boxShadow="sm">
    <Text color="gray.500" fontSize="md">
      {title}
    </Text>
    <Heading size="xl" mt={2}>
      {value}
    </Heading>
    <HStack mt={2} color="gray.500">
      <Icon as={icon} />
      <Text>{subtext}</Text>
    </HStack>
  </Box>
);

interface ProgressBarProps {
  value: number;
  colorScheme?: string;
}

const ProgressBar = ({ value, colorScheme = "blue" }: ProgressBarProps) => (
  <Box h="8px" w="100%" bg="gray.100" borderRadius="full" overflow="hidden">
    <Box
      h="100%"
      w={`${value}%`}
      bg={colorScheme === "green" ? "green.500" : "blue.500"}
      borderRadius="full"
    />
  </Box>
);

interface CardProps extends BoxProps {
  children: React.ReactNode;
}

const Card = ({ children, mb, ...rest }: CardProps) => (
  <Box
    bg="white"
    p={5}
    borderRadius="md"
    boxShadow="md"
    borderColor="gray.200"
    borderWidth="1px"
    mb={mb || 0}
    {...rest}
  >
    {children}
  </Box>
);

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        setLoading(true);
        const data = await DashboardService.getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading dashboard data...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Icon as={FiAlertTriangle} w={10} h={10} color="red.500" />
        <Text mt={4} fontSize="lg">
          Error: {error}
        </Text>
        <Button
          mt={4}
          bg={colors.blue}
          color="white"
          width="100%"
          maxWidth="200px"
          onClick={() => window.location.reload()}
        >
          <Icon as={FiActivity} mr={2} />
          Try Again
        </Button>
      </Box>
    );
  }

  // Function to render the status indicators
  const renderStatusIndicator = (status: string, count: number) => {
    let color;
    let icon;

    switch (status) {
      case "pending":
        color = "orange";
        icon = FiFile;
        break;
      case "underReview":
        color = "blue";
        icon = FiActivity;
        break;
      case "quoted":
        color = "green";
        icon = FiCheckCircle;
        break;
      case "declined":
        color = "red";
        icon = FiAlertTriangle;
        break;
      default:
        color = "gray";
        icon = FiFile;
    }

    return (
      <HStack mb={2}>
        <Icon as={icon} color={`${color}.500`} />
        <Text fontWeight="medium" textTransform="capitalize">
          {status === "underReview" ? "Under Review" : status}: {count}
        </Text>
        <Badge colorScheme={color} ml="auto">
          {stats && stats.totalSubmissions > 0
            ? `${Math.round((count / stats.totalSubmissions) * 100)}%`
            : "0%"}
        </Badge>
      </HStack>
    );
  };

  // Function to render a simple bar chart for industry distribution
  const renderIndustryChart = () => {
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
      <Box mt={4}>
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
    );
  };

  // Function to render a simple month-by-month chart
  const renderMonthlyChart = () => {
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
              colorScheme="green"
            />
          </Box>
        ))}
      </Box>
    );
  };

  // Function to render the status distribution
  const renderStatusDistribution = () => {
    if (!stats || !stats.submissionStatuses) return null;

    const hasData = Object.values(stats.submissionStatuses).some(
      (count) => (count as number) > 0
    );

    if (!hasData) {
      return (
        <Center py={6} bg="gray.50" borderRadius="md">
          <VStack>
            <Icon as={FiList} w={10} h={10} color="gray.400" />
            <Text color="gray.500">No submission status data</Text>
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

    return (
      <Box>
        {renderStatusIndicator("pending", stats.submissionStatuses.pending)}
        <Box h="1px" bg="gray.200" my={2} />
        {renderStatusIndicator(
          "underReview",
          stats.submissionStatuses.underReview
        )}
        <Box h="1px" bg="gray.200" my={2} />
        {renderStatusIndicator("quoted", stats.submissionStatuses.quoted)}
        <Box h="1px" bg="gray.200" my={2} />
        {renderStatusIndicator("declined", stats.submissionStatuses.declined)}
      </Box>
    );
  };

  return (
    <>
      <Navbar type="content" />
      <Box
        minH="100%"
        display="flex"
        flexDirection="column"
        px={{ base: 4, md: 8 }}
      >
        <Box as="main" flex="1" py={8} px={[4, 6, 8]}>
          <Heading as="h1" size="xl" mb={6}>
            Underwriting Dashboard
          </Heading>

          {/* Top stats row */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
            <StatCard
              title="Total Submissions"
              value={stats?.totalSubmissions || 0}
              icon={FiFile}
              subtext="All risk submissions"
            />
            <StatCard
              title="Average Risk Score"
              value={stats?.avgRiskScore || 0}
              icon={FiBarChart2}
              subtext="Scale of 0-100"
            />
            <StatCard
              title="Total Premium"
              value={`$${stats?.totalPremium.toLocaleString() || 0}`}
              icon={FiDollarSign}
              subtext={`Average: $${stats?.avgPremium.toLocaleString() || 0}`}
            />
          </SimpleGrid>

          {/* Main content section */}
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
            {/* Left column - main charts */}
            <GridItem>
              <Card mb={6}>
                <Heading size="md" mb={4}>
                  Submission Status Distribution
                </Heading>
                {renderStatusDistribution()}
              </Card>

              <Card>
                <Heading size="md" mb={4}>
                  Monthly Submission Trend
                </Heading>
                {renderMonthlyChart()}
              </Card>
            </GridItem>

            {/* Right column - sidebar charts */}
            <GridItem>
              <Card mb={6}>
                <Heading size="md" mb={4}>
                  Submissions by Industry
                </Heading>
                {renderIndustryChart()}
              </Card>

              {/* Quick Actions Card */}
              <Card>
                <Heading size="md" mb={4}>
                  Quick Actions
                </Heading>
                <Flex direction="column" gap={3}>
                  <Button
                    bg={colors.blue}
                    color="white"
                    size="md"
                    width="100%"
                    onClick={() => navigate("/submissions/new")}
                  >
                    <Icon as={FiFolderPlus} mr={2} />
                    New Submission
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    width="100%"
                    onClick={() => navigate("/submissions")}
                  >
                    <Icon as={FiList} mr={2} />
                    View All Submissions
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    width="100%"
                    onClick={() => navigate("/quotes")}
                  >
                    <Icon as={FiActivity} mr={2} />
                    Manage Quotes
                  </Button>
                </Flex>
              </Card>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Dashboard;
