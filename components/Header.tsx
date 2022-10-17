import { Button, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { auth } from "../firebase/firebase";
import { userState } from "../lib/userStore";

export const Header: FC = () => {
  const useUser = useRecoilValue(userState);

  return (
    <>
      <HStack h="20" bgColor="gray.200" px="10" gap="5">
        <Heading>
          <Link href="/todos">TODOアプリ</Link>
        </Heading>
        <Spacer />
        {/* アクセスコントロールしてからまた確認 */}
        <Text>{useUser?.email}でログイン中</Text>
        <Link href="/todos">TODO一覧</Link>
        <Link href="/todos/create">Create</Link>
        <Button onClick={() => signOut(auth)}>Logout</Button>
      </HStack>
    </>
  );
};
