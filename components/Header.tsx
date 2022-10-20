import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { auth } from "../firebase/firebase";
import { userState } from "../lib/userStore";

export const Header: FC = () => {
  const useUser = useRecoilValue(userState);
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth);
    router.replace("/signin");
  };

  return (
    <Box pos="fixed" top="0" w="full" left="0" zIndex="1">
      <HStack h="20" bgColor="blue.900" px="10" gap="5">
        <Heading>
          <Link href="/">TODOList</Link>
        </Heading>
        <Spacer />
        <Box textAlign="end">
          <Text>{useUser?.email}</Text>
          <Text>でログイン中</Text>
        </Box>
        <Button
          colorScheme="pink"
          variant="outline"
          rounded="sm"
          _hover={{ bgColor: "blue.940" }}
          onClick={handleSignOut}
        >
          Sign Out
          <ArrowRightIcon ml={2} w={3} />
        </Button>
      </HStack>
    </Box>
  );
};
