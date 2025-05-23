import colors from "@/utils/colors";
import { Box, Spinner, Text } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Box minH="100vh" textAlign="center" py={250}>
      <Spinner size="xl" color={colors.blue} />
      <Text mt="4" color={colors.blue}>
        Loading...
      </Text>
    </Box>
  );
};
