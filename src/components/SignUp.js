import { useState } from "react";
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
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  Center,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { createUserForAuth } from "../firebase/auth";

/**
 * opens a modal to create a user with first name, last name, email and password. After this, Complete login should be called
 * @param {props} props
 * @property {function} onClose closes the modal
 */
export default function Signup({ onClose }) {
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
    createUserForAuth(data);
    onClose();
  };

  return (
    <ModalContent>
      <ModalHeader>Create your account</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody pb={6}>
          <HStack>
            <Box>
              <FormControl id="first_name" isInvalid={errors.first_name}>
                <FormLabel>First Name</FormLabel>
                <Input
                  {...register("first_name")}
                  type="text"
                  placeholder="First name"
                />
                <FormErrorMessage>
                  {errors.first_name?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="last_name" isInvalid={errors.last_name}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  {...register("last_name")}
                  type="text"
                  placeholder="Last name"
                />
                <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
            />
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
                    placeholder="password"
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
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </Box>

            <Box>
              <FormControl id="re_password" isInvalid={errors.re_password}>
                <FormLabel>Re password</FormLabel>
                <InputGroup>
                  <Input
                    {...register("re_password")}
                    type={showRePassword ? "text" : "password"}
                    autoComplete="on"
                    placeholder="re password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() =>
                        setShowRePassword((showRePassword) => !showRePassword)
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
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="main" mr={3} type="submit">
            Sign up
          </Button>
          <Button onClick={onClose} type="button">
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </ModalContent>
  );
}
