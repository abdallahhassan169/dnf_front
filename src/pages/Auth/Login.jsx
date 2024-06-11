import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { color } from "framer-motion";
import { useAuth } from "../../contexts/Auth";
import { postApi } from "../../utilis/PostApi";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { login } = useAuth();
  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const data = await postApi("auth/login", {
        email,
        password,
      });
      if (data.status === 200) {
        login(data);
        toast({
          title: "Success",
          description: "Logged in successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Incorrect Data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        maxW="md"
        mx="auto"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <Stack spacing={4}>
          <Heading textAlign="center" size="lg">
            Login
          </Heading>
          <Text textAlign="center" color="gray.600">
            Please enter your email and password to log in
          </Text>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              bg="gray.50"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              bg="gray.50"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleLogin}
            width="100%"
          >
            Log In
          </Button>
          <Text>
            Don't Have Account? {"   "}
            <Link to={"/register"} style={{ color: "blue" }}>
              register
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginForm;
