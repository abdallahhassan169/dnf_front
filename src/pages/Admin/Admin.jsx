import React from "react";
import { Text, Box, Badge } from "@chakra-ui/react";
export default function Admin() {
  return (
    <Box mb={4} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold">
        Hello, {"Admin"}!
      </Text>
      <Badge colorScheme="green" fontSize="lg">
        You have {"5"} orders
      </Badge>
    </Box>
  );
}
