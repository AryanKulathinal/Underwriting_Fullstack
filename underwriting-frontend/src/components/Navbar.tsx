import { Heading, Spacer, Flex, Text, Box } from "@chakra-ui/react";
import PrimaryButton from "./buttons/Btn-Primary";
import SecondaryButton from "./buttons/Btn-Secondary";
import { useNavigate, useLocation } from "react-router-dom";
import colors from "../utils/colors";

type NavbarProps = {
  type?: "home" | "content";
};

const Navbar = ({ type = "home" }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check which tab is active
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <Flex
      as="nav"
      align="center"
      mb={4}
      px={{ base: 4, md: 16 }}
      py={3}
      position="relative"
    >
      {/* Logo - always on the left */}
      <Heading size="2xl" fontWeight="bold" color="blue.600">
        ReinsurePro<span style={{ color: "#4A5568" }}>.io</span>
      </Heading>

      {/* Navigation tabs centered in content mode */}
      {type === "content" && (
        <Flex
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          justify="center"
          zIndex="1"
         
        >
          <Text
            fontWeight={600}
            cursor="pointer"
            color={isActive("/dashboard") ? colors.blue : colors.gray2}
            mx={4}
            onClick={() => navigate("/dashboard")}
            _hover={{ color: colors.blue }}
            transition="color 0.2s"
          >
            Dashboard
          </Text>
          <Text
            fontWeight={600}
            cursor="pointer"
            color={isActive("/submissions") ? colors.blue : colors.gray2}
            mx={4}
            onClick={() => navigate("/submissions")}
            _hover={{ color: colors.blue }}
            transition="color 0.2s"
          >
            Submissions
          </Text>
        </Flex>
      )}

      <Spacer />

      {/* Right side: Login/Register or Logout */}
      {type === "home" ? (
        <Flex gap={4}>
          <SecondaryButton label="Login" to="/login" />
          <PrimaryButton label="Register" to="/register" />
        </Flex>
      ) : (
        <PrimaryButton label="Logout" to="/" onClick={handleLogout} />
      )}
    </Flex>
  );
};

export default Navbar;
