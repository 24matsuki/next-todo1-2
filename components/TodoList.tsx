import { Flex, List, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { filteredTodoListState } from "../lib/todoStore";

import { TodoListItem } from "./TodoListItem";

export const TodoList: FC = () => {
  const filteredTodoList = useRecoilValue(filteredTodoListState);

  if (filteredTodoList.length === 0) return <Text>TODOがありません</Text>;

  return (
    <List>
      {filteredTodoList.map((todoItem) => (
        <TodoListItem key={todoItem.id} todoItem={todoItem} />
      ))}
    </List>
  );
};
