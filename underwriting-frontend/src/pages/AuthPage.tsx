import { useState } from 'react';
import { Box, Center } from '@chakra-ui/react';
import LoginCard from '@/components/LoginCard';
import RegistrationCard from '@/components/RegistrationCard';

interface authProp{
  showReg : boolean;
}

export default function AuthPage({showReg}:authProp) {
  const [isRegistering, setIsRegistering] = useState(showReg);

  const toggleForm = () => setIsRegistering(prev => !prev);

  return (
    <Center minH="100vh" bg="gray.50">
      <Box w="400px">
        {isRegistering ? (
          <RegistrationCard onToggle={toggleForm} />
        ) : (
          <LoginCard onToggle={toggleForm} />
        )}
      </Box>
    </Center>
  );
}
