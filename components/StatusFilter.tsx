import { FC, useEffect } from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
} from "@chakra-ui/react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { statusFilterState } from "../lib/todoStore";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const StatusFilter: FC = () => {
  const setStatusFilter = useSetRecoilState(statusFilterState);
  const resetStatusFilter = useResetRecoilState(statusFilterState);

  useEffect(() => {
    return () => resetStatusFilter();
  }, []);

  return (
    <Box>
      <Select
        w="20"
        focusBorderColor="gray.200"
        variant="unstyled"
        _hover={{ color: "white" }}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">すべて</option>
        <option value="notStarted">未着手</option>
        <option value="inProgress">進行中</option>
        <option value="finished">完了</option>
      </Select>
    </Box>
  );
};
