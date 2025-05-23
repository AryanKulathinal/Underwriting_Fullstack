import {
  Submission,
  UpdateSubmissionDto,
} from "@/api/services/submissions.service";
import {
  Box,
  Flex,
  Icon,
  Menu,
  Stack,
  IconButton,
  Button,
  Portal,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiBarChart,
  FiCheckCircle,
  FiDollarSign,
  FiEdit,
  FiFile,
  FiTrash2,
} from "react-icons/fi";
import { EditSubmission } from "./EditSubmission";

interface SubmissionProps {
  submissions: Submission[];
  menuSelect: (id: number, status: string) => void;
  openModal: (title: string, child?: ReactNode) => void;
  closeModal: (message?: string) => void;
  updateSubmission: (id:number,data: UpdateSubmissionDto) => void;
  handleDelete:(id:number)=>void;
}

const Tr = ({ children }: { children: React.ReactNode }) => (
  <Box as="tr" borderBottom="1px solid" borderColor="gray.200">
    {children}
  </Box>

);

const Th = ({
  children,
  isNumeric,
}: {
  children: React.ReactNode;
  isNumeric?: boolean;
}) => (
  <Box
    as="th"
    py={3}
    px={4}
    textAlign={isNumeric ? "right" : "left"}
    fontWeight="bold"
    fontSize="sm"
  >
    {children}
  </Box>
);

const Td = ({
  children,
  isNumeric,
  fontWeight,
}: {
  children: React.ReactNode;
  isNumeric?: boolean;
  fontWeight?: string;
}) => (
  <Box
    as="td"
    py={3}
    px={4}
    textAlign={isNumeric ? "right" : "left"}
    fontWeight={fontWeight}
  >
    {children}
  </Box>
);

export const SubmissionsList = ({
  submissions,
  menuSelect,
  openModal,
  closeModal,
  updateSubmission,
  handleDelete
}: SubmissionProps) => {
  return (
    <Box overflowX="auto">
      <Box as="table" width="100%" borderCollapse="collapse">
        <Box as="thead" bg="gray.50">
          <Tr>
            <Th>Company</Th>
            <Th>Industry</Th>
            <Th>Location</Th>
            <Th isNumeric>Revenue</Th>
            <Th isNumeric>
              <Box
                position="relative"
                display="inline-block"
                title="Risk Score"
              >
                <Flex align="center" justify="flex-end">
                  <Icon as={FiBarChart} mr={1} />
                  Score
                </Flex>
              </Box>
            </Th>
            <Th isNumeric>
              <Box
                position="relative"
                display="inline-block"
                title="Premium Amount"
              >
                <Flex align="center" justify="flex-end">
                  <Icon as={FiDollarSign} mr={1} />
                  Premium
                </Flex>
              </Box>
            </Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Box>
        <Box as="tbody">
          {submissions.map((submission) => (
            <Tr key={submission.id}>
              <Td fontWeight="medium">{submission.companyName}</Td>
              <Td>{submission.industry}</Td>
              <Td>{submission.location}</Td>
              <Td isNumeric>${submission.revenue.toLocaleString()}</Td>
              <Td isNumeric>{submission.riskScore || "-"}</Td>
              <Td isNumeric>${submission.premium?.toLocaleString() || "-"}</Td>
              <Td>
                <Menu.Root>
                  <Menu.Trigger asChild>
                    <Button variant="outline">{submission.status}</Button>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Item
                          value="Pending"
                          onClick={() => menuSelect(submission.id, "Pending")}
                        >
                          <FiFile />
                          <Box flex="1">Pending</Box>
                        </Menu.Item>
                        <Menu.Item
                          value="Under Review"
                          onClick={() =>
                            menuSelect(submission.id, "Under Review")
                          }
                        >
                          <FiActivity />
                          <Box flex="1">Under Review</Box>
                        </Menu.Item>
                        <Menu.Item
                          value="Quoted"
                          onClick={() => menuSelect(submission.id, "Quoted")}
                        >
                          <FiCheckCircle />
                          <Box flex="1">Quoted</Box>
                        </Menu.Item>
                        <Menu.Item
                          value="Declined"
                          onClick={() => menuSelect(submission.id, "Declined")}
                        >
                          <FiAlertTriangle />
                          <Box flex="1">Declined</Box>
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Td>
              <Td>
                <Stack direction="row" gap={2}>
                  <IconButton
                    aria-label="Edit submission"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      openModal(
                        "Edit Submission",
                        <EditSubmission
                          data={submission}
                          closeModal={closeModal}
                          update={updateSubmission}
                        />
                      )
                    }
                  >
                    <Icon as={FiEdit} />
                  </IconButton>

                  <IconButton
                    aria-label="Delete submission"
                    variant="ghost"
                    size="sm"
                    color="red.500"
                    onClick={() => handleDelete(submission.id)}
                  >
                    <Icon as={FiTrash2} />
                  </IconButton>
                </Stack>
              </Td>
            </Tr>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
