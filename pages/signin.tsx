import { Center, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { AuthForm } from "../components/AuthForm";
import { auth } from "../firebase/firebase";
import { AuthFormValues } from "../types";

const Signin: NextPage = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Center h="100vh">
      <Stack spacing="4" p="14" rounded="lg" w="md">
        <Heading mb="4" textAlign="center">
          Sign In
        </Heading>
        <AuthForm buttonName="Sign In" onSubmit={onSubmit} />
        <Text align="center">
          Sign Up は
          <NextLink href="/signup" passHref>
            <Link color="pink.400">こちら</Link>
          </NextLink>
        </Text>
      </Stack>
    </Center>
  );
};

export default Signin;
