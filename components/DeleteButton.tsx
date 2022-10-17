import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { db } from "../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { FC } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../lib/todoStore";
import { TodoItem } from "../types";

type Props = {
  todoItem: TodoItem;
};

export const DeleteButton: FC<Props> = ({ todoItem }) => {
  const router = useRouter();
  const setTodoList = useSetRecoilState(todoListState);

  const handleClickDelete = async () => {
    await deleteDoc(doc(db, "todos", todoItem.id));
    setTodoList((oldTodoList) => {
      return oldTodoList.filter((todo) => todo !== todoItem);
    });
    router.push(`/todos`);
  };

  return (
    <IconButton
      variant="outline"
      colorScheme="teal"
      aria-label="DeleteButton"
      fontSize="20px"
      icon={<DeleteIcon />}
      onClick={handleClickDelete}
    />
  );
};
