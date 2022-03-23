import {
  Flex,
  Center,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Avatar,
  Textarea,
} from "@chakra-ui/react";
import { useAuth } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import Container from "../../hocs/Container";
import { createFirestoreUser, usernameExists } from "../../firebase/firestore";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Completes the user information with username and biography
 */
export default function CompleteLogin() {
  window.scroll({
    top: 0,
    left: 0,
  });
  const router = useRouter();
  const { currentUser, refreshUserData } = useAuth();
  const [username, setUsername] = useState("");
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    //in the ...data just is the bio
    data = {
      ...data,
      username,
      photo_URL: currentUser.photoURL,
      name: currentUser.displayName,
    };
    console.log("data on CompleteLogin: ", data);
    if (await usernameExists(data.username)) {
      console.log("username exists");
      setError("username", { message: "username already exists" });
      return;
    }
    console.log("passed");
    await createFirestoreUser(currentUser.uid, data).then(async () => {
      router.push(`/${data.username}`);
      await refreshUserData(currentUser.uid);
    });
  };

  const onUsernameChange = (e) => {
    const value = e.target.value.toLowerCase().replaceAll(" ", "_");
    const re = /[^a-zñ0-9_.]/;
    if (re.test(value)) {
      setError("username", {
        message: "Sorry, your username contains invalid characters",
      });
      return;
    }
    if (value.length < 3) {
      setError("username", { message: "min length is 3" });
      return;
    }
    if (value.length > 15) {
      setError("username", { message: "max length is 15" });
      return;
    }
    clearErrors("username");
    setUsername(value);
  };

  return (
    <Container>
      <Center spacing={8} mx={"auto"} maxW={"lg"} py={12} textAlign="center">
        <Heading
          fontWeight={600}
          fontSize={{ base: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Complete your unique{" "}
          <Text as="span" color="main.500">
            User
          </Text>
        </Heading>
      </Center>
      <Stack direction={"row"} spacing="4rem">
        <Box
          maxW={"320px"}
          w={"full"}
          bg={"white"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          flex="1"
        >
          <Avatar
            size={"xl"}
            src={currentUser.photoURL}
            alt={"Avatar Alt"}
            mb={4}
            pos={"relative"}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {currentUser.displayName}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            @{username}
          </Text>
          <Text textAlign={"center"} color={"gray.700"} px={3}>
            {watch("bio")}
          </Text>
        </Box>

        <Box rounded={"lg"} bg={"white"} boxShadow={"2xl"} p={8} flex="1">
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="username" isInvalid={errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  onChange={onUsernameChange}
                  mb={errors.username ? "" : "28px"}
                  name="username"
                  autoComplete="true"
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="bio" isInvalid={errors.bio}>
                <FormLabel>Biography</FormLabel>
                <Textarea
                  mb={errors.bio ? "" : "28px"}
                  {...register("bio", {
                    maxLength: { value: 100, message: "max lenght is 20" },
                  })}
                />
                <FormErrorMessage display="block">
                  {errors.bio?.message}
                </FormErrorMessage>
              </FormControl>
              <Stack>
                <Button
                  colorScheme={"main.yellow"}
                  color={"white"}
                  type="submit"
                >
                  Finish
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
