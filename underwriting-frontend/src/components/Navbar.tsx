import { Heading, Spacer, Flex } from "@chakra-ui/react";
import PrimaryButton from "./buttons/Btn-Primary";
import SecondaryButton from "./buttons/Btn-Secondary";

const Navbar = () => {
  return (
    <Flex as="nav" align="center" mb={4} px={{ base: 4, md: 16 }} >
      <Heading size="2xl" fontWeight="bold" color="blue.600">
        ReinsurePro<span style={{ color: "#4A5568" }}>.io</span>
      </Heading>
      <Spacer />
      <Flex gap={4}>
        <SecondaryButton label="Login" to="/login" />
        <PrimaryButton label="Register" to="/register" />
      </Flex>
    </Flex>
  );
};

export default Navbar;
