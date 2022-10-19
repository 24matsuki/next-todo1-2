import { Box, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { DeleteButton } from "../../components/DeleteButton";
import { EditButton } from "../../components/EditButton";
import { Layout } from "../../components/Layout";
import { useGetTodoItem } from "../../hooks/useGetTodoItem";
import { todoItemState } from "../../lib/todoStore";
import { NextPageWithLayout } from "../_app";

const Todo: NextPageWithLayout = () => {
  const todoItem = useRecoilValue(todoItemState);

  useGetTodoItem();

  return todoItem ? (
    <Box>
      <Text>Title: {todoItem.title}</Text>
      <Text>Detail: {todoItem.detail}</Text>
      <Text>Created: {todoItem.createdAt.toDate().toLocaleString()}</Text>
      {/* <Text>
        Created: {new Date(todoItem.createdAt?.seconds * 1000).toLocaleString()}
      </Text> */}
      <Text>
        Updated:{" "}
        {todoItem.updatedAt
          ? todoItem.updatedAt.toDate().toLocaleString()
          : "-----"}
      </Text>
      {/* <Text>
        Updated:{" "}
        {todoItem.updatedAt
          ? new Date(todoItem.updatedAt?.seconds * 1000).toLocaleString()
          : "-----"}
      </Text> */}
      <EditButton todoItem={todoItem} />
      <DeleteButton todoItem={todoItem} />
    </Box>
  ) : (
    <Text>TODOがありません</Text>
  );
};

Todo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Todo;
