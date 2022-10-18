import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoItemState, todoListState } from "../lib/todoStore";

export const useGetTodoItem = () => {
  const router = useRouter();
  const todoList = useRecoilValue(todoListState);
  const setTodoItem = useSetRecoilState(todoItemState);

  useEffect(() => {
    const todoItemId = router.query.id;
    const newTodoItem = todoList.find((todo) => todo.id === todoItemId);
    setTodoItem(newTodoItem);
  }, [todoList]);
};
