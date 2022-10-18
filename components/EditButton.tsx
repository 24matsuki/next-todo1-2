import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { FC } from "react";
import { TodoItem } from "../types";
import { useSetRecoilState } from "recoil";
import { todoItemState } from "../lib/todoStore";

type Props = {
  todoItem: TodoItem;
};

export const EditButton: FC<Props> = ({ todoItem }) => {
  const router = useRouter();
  const setTodoItem = useSetRecoilState(todoItemState);

  const handleEditClick = () => {
    setTodoItem(todoItem);
    router.push(`/todos/${todoItem.id}/edit`);
  };

  return (
    <IconButton
      variant="outline"
      colorScheme="teal"
      aria-label="EditButton"
      fontSize="20px"
      icon={<EditIcon />}
      onClick={handleEditClick}
    />
  );
};
