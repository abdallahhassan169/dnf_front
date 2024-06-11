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
import { postApi } from "../../utilis/PostApi";
import { useLocation, useNavigate } from "react-router-dom";
const OtpForm = () => {
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(null);
  const toast = useToast();
  const [errs, setErrs] = React.useState([]);
  const nav = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const handleVerify = async () => {
    if (email === "" || otp === "") {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const data = await postApi("auth/verify", {
        email: email ?? state.email,
        code: otp,
      });

      if (data?.status === 200) {
        toast({
          title: "Success",
          description: "Verified successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        nav("/");
      } else {
        console.log("errrr", data);
        setErrs([{ msg: data?.response?.data?.error }]);
        toast({
          title: "Error",
          description: data?.response?.data?.error,
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
            Verify OTP
          </Heading>
          <Text textAlign="center" color="gray.600">
            Please enter your email and OTP to verify your account
          </Text>
          {!state.email && (
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
          )}
          <FormControl id="otp">
            <FormLabel>OTP</FormLabel>
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              bg="gray.50"
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleVerify}
            width="100%"
          >
            Verify OTP
          </Button>
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

export default OtpForm;
