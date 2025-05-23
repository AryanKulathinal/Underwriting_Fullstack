import {
  Box,
  Button,
  createOverlay,
  Dialog,
  Flex,
  Icon,
  Portal,
  Separator,
  Text,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import {
  CreateSubmissionDto,
  Submission,
  SubmissionsService,
  UpdateSubmissionDto,
} from "@/api/services/submissions.service";
import { ReactNode, useEffect, useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import colors from "@/utils/colors";
import { FiPlus } from "react-icons/fi";
import { SubNotFound } from "@/components/SubNotFound";
import { SubmissionsList } from "@/components/SubmissionsList";
import { CreateSubmission } from "@/components/CreateSubmission";

interface ModalProps {
  title: string;
  description?: string;
  content?: ReactNode;
}

const modal = createOverlay<ModalProps>((props: ModalProps) => {
  const { title, description, content, ...rest } = props;
  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body spaceY="4">
              {description && (
                <Dialog.Description>{description}</Dialog.Description>
              )}
              {content}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

const openModal = (title: string, child?: ReactNode) => {
  modal.open("a", {
    title: title,
    content: child,
  });
};

const closeModal = (msg?: string) => {
  const returnValue = { message: msg };
  modal.close("a", returnValue);
};

const Submissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const data = await SubmissionsService.getAllSubmissions();
      data.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      setSubmissions(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch submissions");
      toaster.create({
        title: "Error fetching submissions",
        description: err.message || "Please try again later",
        type: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmission = async (data: CreateSubmissionDto) => {
    try {
      await SubmissionsService.createSubmission(data);
      fetchSubmissions();
      setTimeout(() => {
        toaster.create({
          title: "Submission created",
          type: "success",
          duration: 3000,
        });
      }, 1000);
    } catch (err: any) {
      toaster.create({
        title: "Error creating submission",
        description: err.message || "Please try again",
        type: "error",
        duration: 5000,
      });
    }
  };

  const handleUpdateSubmission = async (
    id: number,
    data: UpdateSubmissionDto
  ) => {
    try {
      await SubmissionsService.updateSubmission(id, data);
      await fetchSubmissions();
      setTimeout(() => {
        toaster.create({
          title: "Submission updated",
          type: "success",
          duration: 3000,
        });
      }, 1000);
    } catch (err: any) {
      toaster.create({
        title: "Error updating submission",
        description: err.message || "Please try again",
        type: "error",
        duration: 5000,
      });
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await SubmissionsService.updateSubmission(id, { status });

      fetchSubmissions();
      setTimeout(() => {
        toaster.create({
          title: "Status updated",
          type: "success",
          duration: 3000,
        });
      }, 1000);
    } catch (err: any) {
      toaster.create({
        title: "Error updating status",
        description: err.message || "Please try again",
        type: "error",
        duration: 5000,
      });
    }
  };

  const handleDeleteSubmission = async (id: number) => {
    try {
      await SubmissionsService.deleteSubmission(id);
      fetchSubmissions();
      setTimeout(() => {
        toaster.create({
          title: "Submission deleted",
          type: "success",
          duration: 3000,
        });
      }, 1000);
    } catch (err: any) {
      toaster.create({
        title: "Error deleting submission",
        description: err.message || "Please try again",
        type: "error",
        duration: 5000,
      });
    }
  };

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
        <Flex justify="end" align="center" mb="4" mt="4">
          <Button bg={colors.blue} onClick={()=>{openModal("Create Submission",<CreateSubmission create={handleCreateSubmission} closeModal={closeModal}/>)}}>
            <Flex align="center">
              <Icon as={FiPlus} mr={2} />
              <Text>New Submission</Text>
            </Flex>
          </Button>
        </Flex>
        {submissions.length === 0 ? (
          <SubNotFound />
        ) : (
          <SubmissionsList
            submissions={submissions}
            menuSelect={handleStatusChange}
            openModal={openModal}
            closeModal={closeModal}
            updateSubmission={handleUpdateSubmission}
            handleDelete={handleDeleteSubmission}
          />
        )}
      </Box>
      <modal.Viewport />
      <Toaster />
    </Box>
  );
};

export default Submissions;
