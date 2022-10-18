import { Flex, List, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { filteredTodoListState } from "../lib/todoStore";

import { TodoListItem } from "./TodoListItem";

export const TodoList: FC = () => {
  const filteredTodoList = useRecoilValue(filteredTodoListState);

  if (filteredTodoList.length === 0)
    return (
      <Flex justify={`center`}>
        <Spinner mt="20" size="xl" thickness="4px" color="teal" opacity="0.8" />
      </Flex>
    );

  return (
    <List>
      {filteredTodoList.map((todoItem) => (
        <TodoListItem key={todoItem.id} todoItem={todoItem} />
      ))}
    </List>
  );
};
