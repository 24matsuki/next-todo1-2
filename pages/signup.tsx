import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { AuthForm } from "../components/AuthForm";
import { auth } from "../firebase/firebase";
import { AuthFormValues } from "../types";

const signup: NextPage = () => {
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
    <Flex justify="center" h="100vh" align="center" bgColor="gray.800">
      <Box p="14" rounded="lg" bgColor="gray.700" color="gray.100" w="md">
        <Heading mb="4" textAlign="center">
          SignUp
        </Heading>
        <AuthForm buttonName={`SignUp`} onSubmit={onSubmit} />
        <Text>
          SignUpは<Link href="/signin">こちら</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default signup;
