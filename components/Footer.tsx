import { Flex } from "@chakra-ui/react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <Flex
      h="12"
      bgColor="gray.300"
      justify="center"
      align="center"
      w="full"
      position="fixed"
      bottom="0"
    >
      &copy;Hoge.inc
    </Flex>
  );
};
