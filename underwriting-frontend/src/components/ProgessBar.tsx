import { Box } from "@chakra-ui/react";

interface ProgressBarProps {
  value: number;
  colorScheme?: string;
}

export const ProgressBar = ({ value, colorScheme = "blue" }: ProgressBarProps) => (
  <Box h="10px" w="100%" bg="gray.100" borderRadius="full" overflow="hidden">
    <Box
      h="100%"
      w={`${value}%`}
      bg={colorScheme === "green" ? "green.500" : "blue.500"}
      borderRadius="full"
    />
  </Box>
);
