import { List, Text } from "@chakra-ui/react";
import { FC } from "react";
import { TodoItem } from "../types";

import { TodoListItem } from "./TodoListItem";

type Props = {
  filteredTodoList: TodoItem[];
};

export const TodoList: FC<Props> = ({ filteredTodoList }) => {
  return (
    <List>
      {/* ここの?↓訂正すること */}
      {filteredTodoList?.length > 0 ? (
        filteredTodoList.map((todoItem) => (
          <TodoListItem key={todoItem.id} todoItem={todoItem} />
        ))
      ) : (
        <Text>TODOがありません</Text>
      )}
    </List>
  );
};
