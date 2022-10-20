import { List, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { filteredTodoListState } from "../lib/todoStore";

import { TodoListItem } from "./TodoListItem";

export const TodoList: FC = () => {
  const filteredTodoList = useRecoilValue(filteredTodoListState);

  return filteredTodoList.length === 0 ? (
    <Text>TODOがありません</Text>
  ) : (
    <List pb="5">
      {filteredTodoList.map((todoItem) => (
        <TodoListItem key={todoItem.id} todoItem={todoItem} />
      ))}
    </List>
  );
};
