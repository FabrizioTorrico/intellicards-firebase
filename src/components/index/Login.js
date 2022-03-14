import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { loginWithGoogle } from "../../firebase/auth";
import Image from "../Image";

export default function Login() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);

  const onSubmit = (data) => {
    console.log("data on logInPage: ", data);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      my={{ base: 0, md: 16 }}
      _before={{
        content: "''",
        background: "transparent no-repeat center center scroll",
        height: "1000px",
        width: "100%",
        backgroundSize: "contain",
        backgroundImage: "url('/img/loginBackground.png')",
        position: "absolute",
        zIndex: "-1",
      }}
      id="login"
    >
      <Stack spacing={8} maxW={"lg"} py={{ base: 0, md: 12 }} px={6}>
        <Stack align={"center"} textAlign={"center"}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            data-aos="fade-down"
          >
            Ready to{" "}
            <Text as="span" color="main.500">
              Reach
            </Text>{" "}
            your goals?
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"2xl"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="username" isInvalid={errors.username}>
                <FormLabel>Username - email</FormLabel>
                <Input
                  type="text"
                  {...register("username")}
                  mb={errors.username ? "" : "28px"}
                  name="username"
                  autoComplete="true"
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  autoComplete="off"
                  {...register("password")}
                  mb={errors.password ? "" : "28px"}
                />
                <FormErrorMessage display="block">
                  {errors.password?.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox colorScheme={"main"} {...register("remember")}>
                    Remember me
                  </Checkbox>
                  <NextLink href="/#">
                    <Link color={"main.600"}>Forgot password?</Link>
                  </NextLink>
                </Stack>
                <Button
                  colorScheme={"main.yellow"}
                  color={"white"}
                  type="submit"
                >
                  Log in
                </Button>
                <hr className="solid" />
                <Stack direction="row">
                  <NextLink href={"/signup"}>
                    <Button colorScheme={"main"} color={"white"} type="button">
                      <a>Create new account</a>
                    </Button>
                  </NextLink>
                  <Button onClick={loginWithGoogle}>
                    <Image
                      src="/img/google-logo.png"
                      height="25px"
                      width="25px"
                    />
                    Log in With Google
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
