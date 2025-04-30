import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";

import Navbar from "@/components/Navbar";

import PrimaryButton from "@/components/buttons/Btn-Primary";
import SecondaryButton from "@/components/buttons/Btn-Secondary";
import colors from "@/utils/colors";

const HomePage = () => {
  return (
    <Box minH="100vh" bg="white" py={6}>
      <Navbar />
      <Separator size="md" />
      {/* Hero Section */}
      <Flex
        px={{ base: 4, md: 16 }}
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        mt={8}
      >
        {/* Left Content */}
        <VStack align="start" gap={5} maxW="lg">
          <Heading as="h1" size="2xl" color={colors.blue}>
            Welcome to ReinsurePro,
          </Heading>
          <Heading as="h2" size="lg" color={colors.gray1}>
            Assess, Underwrite, Manage
          </Heading>
          <Text fontSize="md" color={colors.gray2} maxW="lg" textAlign="justify">
            Streamline reinsurance workflows with smart risk evaluation and
            underwriting automation — all in one platform built for insurers.
            Our solution leverages advanced algorithms and real-time data
            analytics to help insurers make informed decisions faster, reduce
            operational inefficiencies, and enhance collaboration across teams.
            Experience seamless integration with your existing systems, and
            elevate your risk management strategy to the next level.
          </Text>
          <HStack gap={4}>
            <PrimaryButton label="Login Now" to="/login" />
            <SecondaryButton label="View Dashboard" to="/dashboard" />
          </HStack>
        </VStack>

        {/* Right Image */}
        <Box mt={{ base: 10, md: 0 }} maxW="xl" w="full">
          <Image
            src="/home_bg.png"
            alt="Underwriting dashboard illustration"
            objectFit="contain"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
