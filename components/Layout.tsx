import { Box, Container } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Container pt="20" maxW="lg">
        {children}
      </Container>
    </Box>
  );
};
