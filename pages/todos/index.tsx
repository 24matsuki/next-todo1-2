import { Container, Heading } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ReactElement, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { db } from "../../firebase/firebase";
import { TodoList } from "../../components/TodoList";
import { NextPageWithLayout } from "../_app";
import { GetServerSideProps } from "next";
import { TodoItem } from "../../types";
import { StatusFilter } from "../../components/StatusFilter";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  filteredTodoListState,
  statusFilterState,
  todoListState,
} from "../../lib/todoStore";

export const getServerSideProps: GetServerSideProps = async () => {
  const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  const fetchedTodoList = JSON.parse(JSON.stringify(data));

  return { props: { fetchedTodoList } };
};

type Props = {
  fetchedTodoList: TodoItem[];
};

const index: NextPageWithLayout<Props> = ({ fetchedTodoList }) => {
  const setTodoList = useSetRecoilState(todoListState);
  const filteredTodoList = useRecoilValue(filteredTodoListState);
  const resetStatusFilter = useResetRecoilState(statusFilterState);

  useEffect(() => {
    setTodoList(fetchedTodoList);
    resetStatusFilter();
  }, []);

  return (
    <Container maxW="4xl">
      {/* <Heading>TODO一覧</Heading> */}
      <StatusFilter />
      <TodoList filteredTodoList={filteredTodoList} />
    </Container>
  );
};

index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default index;
