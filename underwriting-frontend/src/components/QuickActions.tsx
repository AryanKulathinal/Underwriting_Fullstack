import colors from "@/utils/colors";
import { Button, Card, Flex, Icon } from "@chakra-ui/react";
import { FiFolderPlus, FiList, FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Toaster,toaster } from "@/components/ui/toaster";

const underContruction = ()=>{
    toaster.create({
        title: "Feature under development..",
        type:"warning",
        duration: 3000
    })
}

export const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <Card.Root variant="elevated" p="4" mb="4" >
      <Card.Title fontSize="xl" mb="4">Quick Actions</Card.Title>
      <Flex direction="column" gap="3" mb="2">
        <Button
          bg={colors.blue}
          color="white"
          size="md"
          width="100%"
          onClick={() => underContruction()}
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
          onClick={() => underContruction()}
        >
          <Icon as={FiActivity} mr={2} />
          Manage Quotes
        </Button>
      </Flex>
      <Toaster/>
    </Card.Root>
  );
};
