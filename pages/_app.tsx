import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { Auth } from "../components/Auth";
import { GetDocs } from "../components/GetDocs";
import { Loading } from "../components/Loading";
import { theme } from "../styles/theme";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Auth />
        <GetDocs />
        <Box bgColor={`blue.950`} color="gray.200" minH="100vh">
          <Loading>{getLayout(<Component {...pageProps} />)}</Loading>
        </Box>
      </RecoilRoot>
    </ChakraProvider>
  );
}
