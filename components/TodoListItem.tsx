import { HStack, ListItem, Select, Text } from "@chakra-ui/react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSetRecoilState } from "recoil";
import { todoItemState, todoListState } from "../lib/todoStore";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { FC } from "react";
import { TodoItem } from "../types";
import { useRouter } from "next/router";

type Props = {
  todoItem: TodoItem;
};

export const TodoListItem: FC<Props> = ({ todoItem }) => {
  const setTodoItem = useSetRecoilState(todoItemState);
  const setTodoList = useSetRecoilState(todoListState);
  const router = useRouter();

  const handleChangeStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const status = e.target.value;

    // Firestoreの更新
    const docRef = doc(db, "todos", todoItem.id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });

    // recoilの更新
    const docSnap = await getDoc(docRef);
    const updatedAt = docSnap.data()?.updatedAt;
    setTodoList((oldTodoList) => {
      return oldTodoList.map((todo) => {
        if (todo === todoItem) return { ...todo, status, updatedAt };
        return todo;
      });
    });
  };

  const handleTitleClick = () => {
    setTodoItem(todoItem);
    router.push(`/todos/${todoItem.id}`);
  };

  return (
    <ListItem>
      <HStack p="4" mb="1" bgColor="blue.900" boxShadow="dark-lg" rounded="sm">
        <Text
          flex={1}
          cursor="pointer"
          _hover={{ color: "white" }}
          onClick={handleTitleClick}
        >
          {todoItem.title}
        </Text>
        <Select
          variant="unstyled"
          w="18"
          _hover={{ color: "white" }}
          value={todoItem.status}
          onChange={handleChangeStatus}
        >
          <option value="notStarted">未着手</option>
          <option value="inProgress">進行中</option>
          <option value="finished">完了</option>
        </Select>
        <EditButton todoItem={todoItem} />
        <DeleteButton todoItem={todoItem} />
      </HStack>
    </ListItem>
  );
};
