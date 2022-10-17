import { FC } from "react";
import { Select } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { statusFilterState } from "../lib/todoStore";

export const StatusFilter: FC = () => {
  const setStatusFilter = useSetRecoilState(statusFilterState);

  return (
    <Select onChange={(e) => setStatusFilter(e.target.value)}>
      <option value="all">すべて</option>
      <option value="notStarted">未着手</option>
      <option value="inProgress">進行中</option>
      <option value="finished">完了</option>
    </Select>
  );
};
