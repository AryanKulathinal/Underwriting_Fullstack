import colors from "@/utils/colors";
import { Card, CardBody, Button,Text } from "@chakra-ui/react";

export const SubNotFound = () => {
  return (
    <Card.Root>
      <CardBody textAlign="center" py={10}>
        <Text color="gray.500" mb={4}>
          No submissions found
        </Text>
        <Button bg={colors.blue} onClick={()=>{}}>
          Create Your First Submission
        </Button>
      </CardBody>
    </Card.Root>
  );
};
