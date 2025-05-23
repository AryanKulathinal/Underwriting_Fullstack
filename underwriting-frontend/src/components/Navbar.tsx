import { Heading, Flex, Text } from "@chakra-ui/react";
import PrimaryButton from "./buttons/Btn-Primary";
import SecondaryButton from "./buttons/Btn-Secondary";
import { useLogout } from "@/hooks/useLogout";
import colors from "@/utils/colors";
import { useLocation, useNavigate } from "react-router-dom";


interface NavbarProps {
  type?: "home" | "content";
}

const Navbar = ({ type }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Flex as="nav" justify="space-between" mb={4} px={{ base: 4, md: 16 }}>
      <Heading size="2xl" fontWeight="bold" color="blue.600">
        Underwriter<span style={{ color: "#4A5568" }}>.io</span>
      </Heading>
      {type === "content" && (
        <Flex gap={8}>
          <Text
            fontSize="lg"
            fontWeight="600"
            cursor="pointer"
            color={isActive("/dashboard") ? colors.blue : colors.gray2}
            alignSelf="center"
            _hover={{ color: colors.blue }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Text>
          <Text
            fontSize="lg"
            fontWeight="600"
            cursor="pointer"
            color={isActive("/submissions") ? colors.blue : colors.gray2}
            alignSelf="center"
            _hover={{ color: colors.blue }}
            onClick={() => navigate("/submissions")}
          >
            Submissions
          </Text>
        </Flex>
      )}

      {type === "home" && (
        <Flex gap={4}>
          <SecondaryButton
            label="Login"
            onClick={() => {
              navigate("/login");
            }}
          />
          <PrimaryButton
            label="Register"
            onClick={() => {
              navigate("/register");
            }}
          />
        </Flex>
      )}
      {type === "content" && (
        <Flex gap={4}>
          <PrimaryButton label="Log Out" onClick={logout} />
        </Flex>
      )}

    
      
    </Flex>
  );
};

export default Navbar;
