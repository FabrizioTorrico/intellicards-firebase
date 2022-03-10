import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import router from "next/router";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Center,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../hocs/Layout";
import { signup } from "../state/auth/authActions";

export default function SignupPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.auth.loading);
  const register_success = useSelector((state) => state.auth.register_success);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Is not in correct format"
      ),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    re_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);

  const onSubmit = (data) => {
    console.log("data on signUpPage: ", data);

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(signup(data));
    }
  };

  if (typeof window !== "undefined" && isAuthenticated) router.push("/");
  if (register_success) router.push("/#login");

  return (
    <>
      <Layout title="Intellicards | Register">
        <Flex bg={"gray.200"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"} textAlign={"center"}>
              <Heading
                fontWeight={600}
                fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
                data-aos="fade-down"
              >
                Sign{" "}
                <Text as="span" color="main.500">
                  Up
                </Text>{" "}
              </Heading>
            </Stack>
            <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl id="username" isInvalid={errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input {...register("username")} type="text" />
                    <FormErrorMessage>
                      {errors.username?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <HStack>
                    <Box>
                      <FormControl
                        id="first_name"
                        isInvalid={errors.first_name}
                      >
                        <FormLabel>First Name</FormLabel>
                        <Input {...register("first_name")} type="text" />
                        <FormErrorMessage>
                          {errors.first_name?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="last_name" isInvalid={errors.last_name}>
                        <FormLabel>Last Name</FormLabel>
                        <Input {...register("last_name")} type="text" />
                        <FormErrorMessage>
                          {errors.last_name?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isInvalid={errors.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input {...register("email")} type="email" />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>
                  <HStack>
                    <Box>
                      <FormControl id="password" isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            autoComplete="on"
                          />

                          <InputRightElement h={"full"}>
                            <Button
                              type="button"
                              variant={"ghost"}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.password?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl
                        id="re_password"
                        isInvalid={errors.re_password}
                      >
                        <FormLabel>Re password</FormLabel>
                        <InputGroup>
                          <Input
                            {...register("re_password")}
                            type={showRePassword ? "text" : "password"}
                            autoComplete="on"
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              type="button"
                              variant={"ghost"}
                              onClick={() =>
                                setShowRePassword(
                                  (showRePassword) => !showRePassword
                                )
                              }
                            >
                              {showRePassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.re_password?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                  </HStack>

                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg="main.500"
                      colorScheme="main"
                      type="submit"
                    >
                      Sign up
                    </Button>
                  </Stack>
                </form>
                <Stack pt={6}>
                  <NextLink href="/#login">
                    <Text align={"center"}>
                      Already a user? <Link color={"blue.400"}>Login</Link>
                    </Text>
                  </NextLink>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Layout>

      <Modal isOpen={loading} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Center py={"4rem"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="main.500"
              size="xl"
            />
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
}
