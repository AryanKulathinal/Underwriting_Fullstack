import Navbar from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { Box, Grid, GridItem, Separator, SimpleGrid } from "@chakra-ui/react";
import { FiBarChart2, FiDollarSign, FiFile } from "react-icons/fi";
import {
  DashboardStats,
  DashboardService,
} from "@/api/services/dashboard.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { SubStatDistribution } from "@/components/SubStatDistribution";
import { MonthlyChart } from "@/components/MonthlyChart";
import { IndustrySubmissions } from "@/components/IndustrySubmissions";
import { QuickActions } from "@/components/QuickActions";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const na = "not found";




  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await DashboardService.getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.Message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <Box minH="100vh" bg="white" py={6}>
      <Navbar type="content" />
      <Separator size="md" />
      <Box px={{ base: 4, md: 16 }}>
        <SimpleGrid columns={3} gap={6} mb="8" mt="2">
          <StatCard
            title="Total Submissions"
            value={stats?.totalSubmissions || na}
            icon={FiFile}
            subtext="All Risk Submissions"
          />
          <StatCard
            title="Average Risk Score"
            value={stats?.avgRiskScore || na}
            icon={FiBarChart2}
            subtext="Scale of 0-100"
          />
          <StatCard
            title="Total Premium"
            value={stats?.totalPremium || na}
            icon={FiDollarSign}
            subtext={`Average: $${stats?.avgPremium.toLocaleString()}` || na}
          />
        </SimpleGrid>
        <Grid templateColumns="2fr 1fr" gap={6}>
          <GridItem>
            <Grid templateColumns="repeat(2,1fr)" gap={6}>
              <GridItem>
                <SubStatDistribution stats={stats} />
              </GridItem>
              <GridItem>
                <IndustrySubmissions stats={stats} />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <MonthlyChart stats={stats} />
            <QuickActions />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;

