import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { auth } from "../firebase/firebase";
import { userState } from "../lib/userStore";
import { AuthFormValues } from "../types";

export default function signup() {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    // e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // setUser(userCredential.user);
      router.push("/todos");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Flex justify="center" h="100vh" align="center" bgColor="gray.800">
      <Box p="14" rounded="lg" bgColor="gray.700" color="gray.100" w="md">
        <Heading mb="4" textAlign="center">
          SignUp
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="email"
              autoFocus={true}
              {...register("email", {
                required: "This is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt="4" isInvalid={Boolean(errors.password)}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register("password", {
                required: "This is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="6"
            w="full"
            colorScheme="teal"
            variant="outline"
            isLoading={isSubmitting}
            type="submit"
          >
            SignUp
          </Button>
        </form>
        <Text>
          ログインは<Link href="/signin">こちら</Link>
        </Text>
      </Box>
    </Flex>
  );
}
