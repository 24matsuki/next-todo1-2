import { Center, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { AuthForm } from "../components/AuthForm";
import { auth } from "../firebase/firebase";
import { AuthFormValues } from "../types";

const Signup: NextPage = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push("/todos");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Center h="100vh">
      <Stack spacing="4" p="14" rounded="lg" w="md">
        <Heading mb="4" textAlign="center">
          Sign Up
        </Heading>
        <AuthForm buttonName="Sign Up" onSubmit={onSubmit} />
        <Text align="center">
          Sign In は
          <NextLink href="/signin" passHref>
            <Link color="pink.400">こちら</Link>
          </NextLink>
        </Text>
      </Stack>
    </Center>
  );
};

export default Signup;
