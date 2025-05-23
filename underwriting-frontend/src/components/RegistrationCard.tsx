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
import { register } from "@/api/auth";
import { Toaster, toaster } from "@/components/ui/toaster";

interface RegistrationCardProps {
  onToggle: () => void;
}

export default function RegistrationCard({ onToggle }: RegistrationCardProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    // setError(null);

    setNameError(!name);
    setUsernameError(!username);
    setPasswordError(!password);

    if (!name || !username || !password) {
      setLoading(false);
      return;
    }

    try {
      const result = await register({ name, username, password });
      console.log("Registration successful:", result);
      toaster.create({
        title: "Registration Successful ",
        type: "success",
        duration: 3000,
        action: {
          label: "Go to Login",
          onClick: () => onToggle(),
        },
      });
    } catch (err: any) {
      // setError(err.message);
      toaster.create({
        title: "Registration Failed ",
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
        Register
      </Heading>
      <VStack gap={4}>
        <Field.Root invalid={nameError}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Field.ErrorText>Name is required</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={usernameError}>
          <Input
            placeholder="username"
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
          onClick={handleRegister}
          loading={loading}
          loadingText="Signing Up..."
        >
          {" "}
          Sign Up
        </Button>
        <Text fontSize="sm">
          Already have an account?{" "}
          <Link color="blue.500" onClick={onToggle}>
            Sign in
          </Link>
        </Text>
      </VStack>
      <Toaster />
    </Box>
  );
}
