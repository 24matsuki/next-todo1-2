import { Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Box h="100vh">
      <Header />
      {children}
      <Footer />
    </Box>
  );
};
