import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { Auth } from "../components/Auth";
import { useAccessControl } from "../hooks/useAccessControl";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  // useAccessControl();

  return (
    <ChakraProvider>
      <RecoilRoot>
        <Auth />
        {getLayout(<Component {...pageProps} />)}
      </RecoilRoot>
    </ChakraProvider>
  );
}
