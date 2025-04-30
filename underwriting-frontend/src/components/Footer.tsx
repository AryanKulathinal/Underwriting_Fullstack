import { Box, Text, Flex } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="blue.500" color="white" p={4} mt={8}>
      <Flex justify="center" align="center">
        <Text>&copy; 2025 Your Company Name. All Rights Reserved.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
