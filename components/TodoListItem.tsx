import { Flex, ListItem, Select, Text } from "@chakra-ui/react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../lib/todoStore";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { FC } from "react";
import { TodoItem } from "../types";
import Link from "next/link";

type Props = {
  todoItem: TodoItem;
};

export const TodoListItem: FC<Props> = ({ todoItem }) => {
  const setTodoList = useSetRecoilState(todoListState);

  const handleChangeStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // Firestoreの更新
    const docRef = doc(db, "todos", todoItem.id);
    await updateDoc(docRef, {
      status: e.target.value,
      updatedAt: serverTimestamp(),
    });

    // recoilの更新
    const docSnap = await getDoc(docRef);
    const { status, updatedAt } = docSnap.data();
    setTodoList((oldTodoList) => {
      return oldTodoList.map((todo) => {
        if (todo === todoItem) return { ...todo, status, updatedAt };
        return todo;
      });
    });
  };

  return (
    <ListItem>
      <Flex gap="4">
        <Text flex={1}>
          <Link href={`/todos/${todoItem.id}`}>{todoItem.title}</Link>
        </Text>
        <Select w="30" value={todoItem.status} onChange={handleChangeStatus}>
          <option value="notStarted">未着手</option>
          <option value="inProgress">進行中</option>
          <option value="finished">完了</option>
        </Select>
        <EditButton todoItem={todoItem} />
        <DeleteButton todoItem={todoItem} />
      </Flex>
    </ListItem>
  );
};
