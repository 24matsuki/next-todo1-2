import { Box, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import React from "react";
import { useRecoilValue } from "recoil";
import { DeleteButton } from "../../components/DeleteButton";
import { EditButton } from "../../components/EditButton";
import { Layout } from "../../components/Layout";
import { db } from "../../firebase/firebase";
import { todoItemState } from "../../lib/todoStore";
import { TodoItem } from "../../types";
import { NextPageWithLayout } from "../_app";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // console.log(context);
  const docId = params!.id;
  const docSnap = await getDoc(doc(db, "todos", docId));
  const data = docSnap.data();
  const todoItem = JSON.parse(JSON.stringify(data));

  return { props: { todoItem } };
};

type Props = {
  todoItem: TodoItem;
};

const todo: NextPageWithLayout<Props> = ({ todoItem }) => {
  // const todoItem = useRecoilValue(todoItemState);

  return (
    <Box>
      <Text>Title: {todoItem.title}</Text>
      <Text>Detail: {todoItem.detail}</Text>
      <Text>
        Created: {new Date(todoItem.createdAt.seconds * 1000).toLocaleString()}
        {/* Created:{" "}
        {todoItem.createdAt &&
          todoItem.createdAt.toDate().toLocaleString()} */}
      </Text>
      <Text>
        {/* Updated: {new Date(todoItem.updatedAt.seconds * 1000).toLocaleString()} */}
        Updated:{" "}
        {todoItem.updatedAt
          ? new Date(todoItem.updatedAt.seconds * 1000).toLocaleString()
          : "-----"}
      </Text>
      <EditButton todoItem={todoItem} />
      <DeleteButton todoItem={todoItem} />
    </Box>
  );
};

todo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default todo;
