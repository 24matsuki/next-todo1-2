import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import Link from "next/link";
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
    <Flex justify="center" h="100vh" align="center" bgColor="gray.800">
      <Box p="14" rounded="lg" bgColor="gray.700" color="gray.100" w="md">
        <Heading mb="4" textAlign="center">
          SignIn
        </Heading>
        <AuthForm buttonName={`SignIn`} onSubmit={onSubmit} />
        <Text>
          SignInは<Link href="/signup">こちら</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Signin;
