import colors from "@/utils/colors";
import { Box, Button, Icon,Text } from "@chakra-ui/react";
import { FiActivity, FiAlertTriangle } from "react-icons/fi";

interface ErrorProps{
    message : string;
}

export const Error =({message}:ErrorProps)=>{
    return (
        <Box textAlign="center" py={10}>
          <Icon as={FiAlertTriangle} w={10} h={10} color="red.500" />
          <Text mt={4} fontSize="lg">
            Error: {message}
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