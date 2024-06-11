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
  useToast,
} from "@chakra-ui/react";
import { postApi } from "../utilis/PostApi";

export default function TradeCard() {
  const [qty, setQty] = React.useState(0);
  const toast = useToast();
  const [data, setData] = React.useState([]);
  const add = () => {
    setQty(qty + 1);
  };
  const sub = () => {
    setQty(qty - 1);
  };
  const getData = async () => {
    const res = await postApi("users/get_user_data");
    setData(res.rows[0]);
  };
  React.useEffect(() => {
    getData();
  }, []);
  const onPurchase = async () => {
    const data = await postApi("orders/make_order", {
      qty,
    });
    if (data.status === 200) {
      setQty(0);
      getData();
      toast({
        title: "Success",
        description: "your order sent successfully.",
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
  };
  return (
    <Box p={4}>
      <Box mb={4} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          Hello, {data.user_name}!
        </Text>
        <Badge colorScheme="green" fontSize="lg">
          You have {data.byscles_num} Bicycles with total (
          {data.byscles_num * 5950} SAR)
        </Badge>
      </Box>
      <Card maxW="sm" mx="auto">
        <CardBody>
          <Image
            // src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            src="https://img.freepik.com/free-photo/white-bicycle-standing-park-morning-fitness-loneliness_1153-6768.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1717977600&semt=sph"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md"> Bicycle</Heading>
            <Text>
              This bicycle is perfect for off-road trails, city rides, and
              everything in between. It's designed for riders who love adventure
              and the outdoors, offering a smooth and comfortable ride on any
              terrain.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              5950 SAR
            </Text>
            <Text color="green" fontSize="2xl">
              (total is : {5950 * qty} SAR)
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
            <Button
              colorScheme="green"
              width="100%"
              isDisabled={qty === 0}
              onClick={onPurchase}
            >
              Order Now
            </Button>
          </Stack>
        </CardFooter>
      </Card>
    </Box>
  );
}
