import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Heading,
  Button,
  Flex,
  Badge,
  IconButton,
  Text,
  VStack,
  Icon,
  Spinner,
  Card,
  CardBody,
  Stack,
  Input,
  Select,
} from "@chakra-ui/react";
import {
  FiEdit,
  FiTrash2,
  FiChevronDown,
  FiPlus,
  FiAlertTriangle,
  FiDollarSign,
  FiBarChart,
} from "react-icons/fi";
import Footer from "../components/Footer";
import {
  SubmissionsService,
  Submission,
  CreateSubmissionDto,
  UpdateSubmissionDto,
} from "../api/services/submissions.service";
import colors from "../utils/colors";
import { toaster } from "../components/ui/toaster";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let color;

  switch (status) {
    case "Pending":
      color = "orange";
      break;
    case "Under Review":
      color = "blue";
      break;
    case "Quoted":
      color = "green";
      break;
    case "Declined":
      color = "red";
      break;
    default:
      color = "gray";
  }

  return <Badge colorScheme={color}>{status}</Badge>;
};

// Custom hook for disclosure
const useModalDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
};

// Custom table components
const TableContainer = ({ children }: { children: React.ReactNode }) => (
  <Box overflowX="auto">{children}</Box>
);

const Table = ({ children }: { children: React.ReactNode }) => (
  <Box as="table" width="100%" borderCollapse="collapse">
    {children}
  </Box>
);

const Thead = ({ children }: { children: React.ReactNode }) => (
  <Box as="thead" bg="gray.50">
    {children}
  </Box>
);

const Tbody = ({ children }: { children: React.ReactNode }) => (
  <Box as="tbody">{children}</Box>
);

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

// Custom dropdown components
const Menu = ({ children }: { children: React.ReactNode }) => (
  <Box position="relative" display="inline-block">
    {children}
  </Box>
);

const MenuButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Button size="sm" variant="outline" onClick={onClick}>
    {children}
    <Icon as={FiChevronDown} ml={2} />
  </Button>
);

const MenuList = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <Card.Root
      position="absolute"
      zIndex={10}
      top="100%"
      left={0}
      mt={1}
      minW="150px"
      shadow="md"
    >
      <CardBody p={0}>
        <VStack gap={0} align="stretch">
          {children}
        </VStack>
      </CardBody>
    </Card.Root>
  );
};

const MenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Button
    variant="ghost"
    justifyContent="flex-start"
    width="100%"
    py={2}
    px={3}
    borderRadius={0}
    fontWeight="normal"
    onClick={onClick}
  >
    {children}
  </Button>
);

// Custom modal components
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.5)"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Card.Root
        onClick={(e) => e.stopPropagation()}
        minW="400px"
        maxW="600px"
        maxH="90vh"
        overflow="auto"
      >
        <Box
          py={4}
          px={6}
          borderBottomWidth="1px"
          fontWeight="bold"
          fontSize="lg"
        >
          {title}
        </Box>
        <CardBody p={6}>{children}</CardBody>
        <Box
          py={4}
          px={6}
          borderTopWidth="1px"
          display="flex"
          justifyContent="flex-end"
        >
          {footer}
        </Box>
      </Card.Root>
    </Box>
  );
};

// New/Edit Submission Modal
const SubmissionModal = ({
  isOpen,
  onClose,
  currentSubmission,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentSubmission?: Submission;
  onSubmit: (data: CreateSubmissionDto | UpdateSubmissionDto) => void;
}) => {
  const isEdit = !!currentSubmission;
  const initialData: CreateSubmissionDto = {
    companyName: currentSubmission?.companyName || "",
    industry: currentSubmission?.industry || "",
    location: currentSubmission?.location || "",
    revenue: currentSubmission?.revenue || 0,
    pastClaimsCount: currentSubmission?.pastClaimsCount || 0,
    coverageAmount: currentSubmission?.coverageAmount || 0,
  };

  const [formData, setFormData] = useState<CreateSubmissionDto>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const modalFooter = (
    <>
      <Button variant="outline" mr={3} onClick={onClose}>
        Cancel
      </Button>
      <Button colorScheme="blue" onClick={handleSubmit}>
        {isEdit ? "Update" : "Create"}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Submission" : "New Submission"}
      footer={modalFooter}
    >
      <VStack gap={4} alignItems="stretch">
        <Box mb={4}>
          <Box as="label" display="block" mb={2} fontWeight="medium">
            Company Name *
          </Box>
          <Input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            width="100%"
            p={2}
            borderWidth="1px"
            borderRadius="md"
          />
        </Box>

        <Box mb={4}>
          <Box as="label" display="block" mb={2} fontWeight="medium">
            Industry *
          </Box>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderWidth: "1px",
              borderRadius: "0.375rem",
              borderColor: "inherit",
            }}
          >
            <option value="">Select industry</option>
            <option value="Construction">Construction</option>
            <option value="Mining">Mining</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Transportation">Transportation</option>
            <option value="Energy">Energy</option>
            <option value="Finance">Finance</option>
            <option value="Retail">Retail</option>
            <option value="Other">Other</option>
          </select>
        </Box>

        <Box mb={4}>
          <Box as="label" display="block" mb={2} fontWeight="medium">
            Location *
          </Box>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderWidth: "1px",
              borderRadius: "0.375rem",
              borderColor: "inherit",
            }}
          >
            <option value="">Select location</option>
            <option value="Flood Zone">Flood Zone</option>
            <option value="Earthquake Zone">Earthquake Zone</option>
            <option value="Coastal Area">Coastal Area</option>
            <option value="Urban Area">Urban Area</option>
            <option value="Rural Area">Rural Area</option>
            <option value="Other">Other</option>
          </select>
        </Box>

        <Box mb={4}>
          <Box as="label" display="block" mb={2} fontWeight="medium">
            Annual Revenue ($) *
          </Box>
          <Input
            type="number"
            min={0}
            name="revenue"
            value={formData.revenue}
            onChange={(e) => handleNumberChange("revenue", e.target.value)}
            width="100%"
            p={2}
            borderWidth="1px"
            borderRadius="md"
          />
        </Box>

        <Box mb={4}>
          <Box as="label" display="block" mb={2} fontWeight="medium">
            Past Claims Count *
          </Box>
          <Input
            type="number"
            min={0}
            name="pastClaimsCount"
            value={formData.pastClaimsCount}
            onChange={(e) =>
              handleNumberChange("pastClaimsCount", e.target.value)
            }
            width="100%"
            p={2}
            borderWidth="1px"
            borderRadius="md"
          />
        </Box>

        <Box mb={4}>
          <Box as="label" display="block" mb={2} fontWeight="medium">
            Coverage Amount ($) *
          </Box>
          <Input
            type="number"
            min={0}
            name="coverageAmount"
            value={formData.coverageAmount}
            onChange={(e) =>
              handleNumberChange("coverageAmount", e.target.value)
            }
            width="100%"
            p={2}
            borderWidth="1px"
            borderRadius="md"
          />
        </Box>
      </VStack>
    </Modal>
  );
};

const Submissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<
    Submission | undefined
  >(undefined);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useModalDisclosure();

  // Fetch all submissions
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const data = await SubmissionsService.getAllSubmissions();
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

  // Handle creating a new submission
  const handleCreateSubmission = async (data: CreateSubmissionDto) => {
    try {
      await SubmissionsService.createSubmission(data);
      toaster.create({
        title: "Submission created",
        type: "success",
        duration: 3000,
      });
      fetchSubmissions();
    } catch (err: any) {
      toaster.create({
        title: "Error creating submission",
        description: err.message || "Please try again",
        type: "error",
        duration: 5000,
      });
    }
  };

  // Handle updating a submission
  const handleUpdateSubmission = async (data: UpdateSubmissionDto) => {
    if (!currentSubmission) return;

    try {
      await SubmissionsService.updateSubmission(currentSubmission.id, data);
      toaster.create({
        title: "Submission updated",
        type: "success",
        duration: 3000,
      });
      fetchSubmissions();
    } catch (err: any) {
      toaster.create({
        title: "Error updating submission",
        description: err.message || "Please try again",
        type: "error",
        duration: 5000,
      });
    }
  };

  // Handle updating submission status
  const handleStatusChange = async (id: number, status: string) => {
    try {
      await SubmissionsService.updateSubmission(id, { status });
      toaster.create({
        title: "Status updated",
        type: "success",
        duration: 3000,
      });
      fetchSubmissions();
      setOpenMenuId(null); // Close the dropdown
    } catch (err: any) {
      toaster.create({
        title: "Error updating status",
        description: err.message || "Please try again",
        type: "error",
        duration: 5000,
      });
    }
  };

  // Handle deleting a submission
  const handleDeleteSubmission = async (id: number) => {
    try {
      await SubmissionsService.deleteSubmission(id);
      toaster.create({
        title: "Submission deleted",
        type: "success",
        duration: 3000,
      });
      fetchSubmissions();
    } catch (err: any) {
      toaster.create({
        title: "Error deleting submission",
        description: err.message || "Please try again",
        type: "error",
        duration: 5000,
      });
    }
  };

  // Toggle menu dropdown
  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Open modal with current submission for editing
  const openEditModal = (submission: Submission) => {
    setCurrentSubmission(submission);
    onOpen();
  };

  // Open modal for creating a new submission
  const openCreateModal = () => {
    setCurrentSubmission(undefined);
    onOpen();
  };

  // Handle form submission (create or update)
  const handleSubmit = (data: CreateSubmissionDto | UpdateSubmissionDto) => {
    if (currentSubmission) {
      handleUpdateSubmission(data);
    } else {
      handleCreateSubmission(data as CreateSubmissionDto);
    }
  };

  if (loading && submissions.length === 0) {
    return (
      <>
        <Navbar type="content" />
        <Box minH="100vh" display="flex" flexDirection="column">
          <Box as="main" flex="1" py={8} px={[4, 6, 8]} textAlign="center">
            <Spinner size="xl" />
            <Text mt={4}>Loading submissions...</Text>
          </Box>
        </Box>
        <Footer />
      </>
    );
  }

  if (error && submissions.length === 0) {
    return (
      <>
        <Navbar type="content" />
        <Box minH="100vh" display="flex" flexDirection="column">
          <Box as="main" flex="1" py={8} px={[4, 6, 8]} textAlign="center">
            <Icon as={FiAlertTriangle} boxSize={10} color="red.500" />
            <Text mt={4} fontSize="lg">
              Error: {error}
            </Text>
            <Button mt={4} colorScheme="blue" onClick={fetchSubmissions}>
              Try Again
            </Button>
          </Box>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar type="content" />
      <Box minH="100vh" display="flex" flexDirection="column" px={{ base: 4, md: 8 }}>
        <Box as="main" flex="1" py={8} px={[4, 6, 8]}>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading as="h1" size="xl">
              Submissions
            </Heading>
            <Button onClick={openCreateModal} colorScheme="blue" bg={colors.blue}>
              <Flex align="center">
                <Icon as={FiPlus} mr={2} />
                <Text>New Submission</Text>
              </Flex>
            </Button>
          </Flex>

          {loading && <Spinner size="sm" mr={2} />}

          {submissions.length === 0 ? (
            <Card.Root>
              <CardBody textAlign="center" py={10}>
                <Text color="gray.500" mb={4}>
                  No submissions found
                </Text>
                <Button bg={colors.blue} onClick={openCreateModal}>
                  Create Your First Submission
                </Button>
              </CardBody>
            </Card.Root>
          ) : (
            <TableContainer>
              <Table>
                <Thead>
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
                </Thead>
                <Tbody>
                  {submissions.map((submission) => (
                    <Tr key={submission.id}>
                      <Td fontWeight="medium">{submission.companyName}</Td>
                      <Td>{submission.industry}</Td>
                      <Td>{submission.location}</Td>
                      <Td isNumeric>${submission.revenue.toLocaleString()}</Td>
                      <Td isNumeric>{submission.riskScore || "-"}</Td>
                      <Td isNumeric>
                        ${submission.premium?.toLocaleString() || "-"}
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton onClick={() => toggleMenu(submission.id)}>
                            <StatusBadge status={submission.status} />
                          </MenuButton>
                          <MenuList isOpen={openMenuId === submission.id}>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(submission.id, "Pending")
                              }
                            >
                              Pending
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(
                                  submission.id,
                                  "Under Review"
                                )
                              }
                            >
                              Under Review
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(submission.id, "Quoted")
                              }
                            >
                              Quoted
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(submission.id, "Declined")
                              }
                            >
                              Declined
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                      <Td>
                        <Stack direction="row" gap={2}>
                          <IconButton
                            aria-label="Edit submission"
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(submission)}
                          >
                            <Icon as={FiEdit} />
                          </IconButton>
                          <IconButton
                            aria-label="Delete submission"
                            variant="ghost"
                            size="sm"
                            color="red.500"
                            onClick={() =>
                              handleDeleteSubmission(submission.id)
                            }
                          >
                            <Icon as={FiTrash2} />
                          </IconButton>
                        </Stack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>

      <SubmissionModal
        isOpen={isOpen}
        onClose={onClose}
        currentSubmission={currentSubmission}
        onSubmit={handleSubmit}
      />

      <Footer />
    </>
  );
};

export default Submissions;
