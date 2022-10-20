import { HStack, Spacer } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Layout } from "../components/Layout";
import { TodoList } from "../components/TodoList";
import { NextPageWithLayout } from "./_app";
import { StatusFilter } from "../components/StatusFilter";
import { CreateButton } from "../components/CreateButton";

const Todos: NextPageWithLayout = () => {
  return (
    <>
      <HStack pt="4">
        <CreateButton />
        <Spacer />
        <StatusFilter />
      </HStack>
      <TodoList />
    </>
  );
};

Todos.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Todos;
