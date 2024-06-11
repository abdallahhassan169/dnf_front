import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Divider,
  Text,
  ButtonGroup,
  Heading,
  Button,
  Box,
  Badge,
} from "@chakra-ui/react";

export default function TradeCard() {
  const [qty, setQty] = React.useState(0);
  const add = () => {
    setQty(qty + 1);
  };
  const sub = () => {
    setQty(qty - 1);
  };
  return (
    <Box p={4}>
      <Box mb={4} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          Hello, {"userName"}!
        </Text>
        <Badge colorScheme="green" fontSize="lg">
          You have {"5"} orders
        </Badge>
      </Box>
      <Card maxW="sm" mx="auto">
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
          <Stack>
            <ButtonGroup
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button colorScheme="blue" onClick={add}>
                +
              </Button>
              <Text
                style={{
                  fontSize: "20px",
                  marginRight: "20px",
                  marginLeft: "20px",
                }}
              >
                {qty}
              </Text>
              <Button colorScheme="blue" onClick={sub} isDisabled={qty === 0}>
                -
              </Button>
            </ButtonGroup>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Stack width="100%">
            <Button colorScheme="green" width="100%">
              Order Now
            </Button>
          </Stack>
        </CardFooter>
      </Card>
    </Box>
  );
}
