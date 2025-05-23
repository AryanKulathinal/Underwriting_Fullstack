import {
  CreateSubmissionDto,
} from "@/api/services/submissions.service";
import colors from "@/utils/colors";
import { customScrollbar } from "@/utils/customScrollbar";
import { VStack, Box, Input, Flex, Button } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

interface FormProps {
  closeModal: (message?: string) => void;
  create: (data: CreateSubmissionDto) => void;
}
const defaultFormData: CreateSubmissionDto = {
    id:0,
    companyName: "",
    industry: "",
    location: "",
    revenue: 0,
    pastClaimsCount: 0,
    coverageAmount: 0,
  };

export const CreateSubmission = ({  closeModal,create }: FormProps) => {
  const [formData, setFormData] = useState<CreateSubmissionDto>(defaultFormData);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Box height="400px">
      <Box overflowY="auto" height="350px" css={customScrollbar}>
        <Box pr="4">
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
              <Input
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Enter Industry"
                width="100%"
                p={2}
                borderWidth="1px"
                borderRadius="md"
              />
            </Box>

            <Box mb={4}>
              <Box as="label" display="block" mb={2} fontWeight="medium">
                Location *
              </Box>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter Location"
                width="100%"
                p={2}
                borderWidth="1px"
                borderRadius="md"
              />
            </Box>

            <Box mb={4}>
              <Box as="label" display="block" mb={2} fontWeight="medium">
                Annual Revenue ($) *
              </Box>
              <Input
                type="number"
                placeholder="1000"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
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
                placeholder="100000"
                name="pastClaimsCount"
                value={formData.pastClaimsCount}
                onChange={handleChange}
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
                placeholder="10000"
                name="coverageAmount"
                value={formData.coverageAmount}
                onChange={handleChange}
                width="100%"
                p={2}
                borderWidth="1px"
                borderRadius="md"
              />
            </Box>
          </VStack>
        </Box>
      </Box>
      <Flex justify="end"  px="6">
        <Button variant="outline" mr="4" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button
          bg={colors.blue}
          onClick={() => {
            console.log(formData)
            create(formData);
            closeModal();
          }}
        >
          Update
        </Button>
      </Flex>
    </Box>
  );
};
