import { Container } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Layout } from "../components/Layout";
import { TodoList } from "../components/TodoList";
import { NextPageWithLayout } from "./_app";
import { StatusFilter } from "../components/StatusFilter";

const Todos: NextPageWithLayout = () => {
  return (
    <Container maxW="4xl">
      <StatusFilter />
      <TodoList />
    </Container>
  );
};

Todos.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Todos;
