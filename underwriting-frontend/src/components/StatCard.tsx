import colors from "@/utils/colors";
import { Box, Text, Heading, HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  subtext: string;
}

export const StatCard = ({ title, value, icon, subtext }: StatCardProps) => {
  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="sm">
      <Heading size="xl" fontWeight="semi-bold">
        {title}
      </Heading>
      <Heading size="xl" color={colors.blue} mt="2">
        {value}
      </Heading>
      <HStack mt="2" color={colors.gray2}>
        <Icon as={icon} />
        <Text>{subtext}</Text>
      </HStack>
    </Box>
  );
};
