import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Text,
  Link,
  Field,
} from "@chakra-ui/react";

import { useState } from "react";
import { login } from "@/api/auth";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

interface LoginCardProps {
  onToggle: () => void;
}

export default function LoginCard({ onToggle }: LoginCardProps) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // setError(null);

    setUsernameError(!username);
    setPasswordError(!password);

    if (!username || !password) {
      setLoading(false);
      return;
    }

    try {
      const result = await login({ username, password });
      console.log("Login successful:", result);
      toaster.create({
        title: "Login Successful ",
        type: "success",
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: any) {
      // setError(err.message);
      toaster.create({
        title: "Login Failed ",
        description: err.message,
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} bg="white" rounded="xl" shadow="md">
      <Heading size="2xl" fontWeight="bold" mb={6}>
        Login
      </Heading>
      <VStack gap={4}>
        <Field.Root invalid={usernameError}>
          <Input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Field.ErrorText>Username is required</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={passwordError} mb={4}>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Field.ErrorText>Password is required</Field.ErrorText>
        </Field.Root>

        <Button
          w="100%"
          onClick={handleLogin}
          loading={loading}
          loadingText="Signing In..."
        >
          Sign In
        </Button>
        <Text fontSize="sm">
          Don&apos;t have an account?{" "}
          <Link color="blue.500" onClick={onToggle}>
            Sign up
          </Link>
        </Text>
      </VStack>
      <Toaster />
    </Box>
  );
}
