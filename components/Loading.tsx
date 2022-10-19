import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLoadingState } from "../lib/store";

type Props = {
  children: ReactNode;
};

export const Loading: FC<Props> = ({ children }) => {
  const isLoading = useRecoilValue(isLoadingState);

  // routerのloading
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleStart = () => setLoading(true);
  //   const handleComplete = () => setLoading(false);

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleComplete);
  //   };
  // });

  // return loading || isLoading ? (
  return isLoading ? (
    <Flex h="100vh" justify={`center`} align={`center`}>
      <Spinner size="xl" thickness="4px" color="teal" opacity="0.8" />
    </Flex>
  ) : (
    <>{children}</>
  );
};
