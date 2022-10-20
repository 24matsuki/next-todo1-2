import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  Spacer,
} from "@chakra-ui/react";
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

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption placement="top">TODO 詳細画面</TableCaption>
          <Tbody>
            <Tr>
              <Th>Title</Th>
              <Td>{todoItem?.title}</Td>
            </Tr>
            <Tr>
              <Th>Detail</Th>
              <Td>{todoItem?.detail}</Td>
            </Tr>
            <Tr>
              <Th>Status</Th>
              <Td>{todoItem?.status}</Td>
            </Tr>
            <Tr>
              <Th>CreatedAt</Th>
              <Td>{todoItem?.createdAt?.toDate().toLocaleString()}</Td>
            </Tr>
            <Tr>
              <Th>UpdatedAt</Th>
              <Td>
                {todoItem?.updatedAt
                  ? todoItem?.updatedAt.toDate().toLocaleString()
                  : "-----"}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt="2">
        <Spacer />
        <EditButton todoItem={todoItem!} />
        <DeleteButton todoItem={todoItem!} />
      </HStack>
    </>
  );
};

Todo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Todo;
