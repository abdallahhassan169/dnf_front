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
import { Link, useNavigate } from "react-router-dom";
import { postApi } from "../../utilis/PostApi";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [userName, setUserName] = useState("");
  const toast = useToast();
  const nav = useNavigate();
  const [errs, setErrs] = React.useState([]);
  const handleRegister = async () => {
    if (
      email === "" ||
      password === "" ||
      phone === "" ||
      nationalId === "" ||
      userName === ""
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const data = await postApi("auth/register", {
        email,
        password,
        phone,
        national_id: nationalId,
        user_name: userName,
      });
      console.log(data);
      if (data?.status === 200 || (data?.status === 200 && data.exists)) {
        toast({
          title: "Success",
          description: data.exists
            ? "email already exists"
            : "Registered successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        nav("/otp", { state: { email } });
      }
      if (data?.response?.status !== 200) {
        setErrs(data?.response?.data?.errors);
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
            Register
          </Heading>
          <Text textAlign="center" color="gray.600">
            Please fill in the details to create an account
          </Text>
          <FormControl id="userName">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              bg="gray.50"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>
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
          <FormControl id="phone">
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              bg="gray.50"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>
          <FormControl id="nationalId">
            <FormLabel>National ID</FormLabel>
            <Input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="Enter your national ID"
              bg="gray.50"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleRegister}
            width="100%"
          >
            Register
          </Button>
          <Text>
            Have Account? {"   "}
            <Link to={"/"} style={{ color: "blue" }}>
              login
            </Link>
          </Text>
        </Stack>
        <ul>
          {" "}
          {errs?.map((e) => (
            <li style={{ color: "red" }}>{e.msg}</li>
          ))}
        </ul>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
