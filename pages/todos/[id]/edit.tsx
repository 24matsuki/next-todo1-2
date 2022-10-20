import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Layout } from "../../../components/Layout";
import { TodoForm } from "../../../components/TodoForm";
import { db } from "../../../firebase/firebase";
import { useGetTodoItem } from "../../../hooks/useGetTodoItem";
import { todoItemState, todoListState } from "../../../lib/todoStore";
import { TodoFormValues } from "../../../types";
import { NextPageWithLayout } from "../../_app";

const Edit: NextPageWithLayout = () => {
  const todoItem = useRecoilValue(todoItemState);
  const router = useRouter();
  const setTodoList = useSetRecoilState(todoListState);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormValues>();

  useGetTodoItem();

  useEffect(() => {
    if (todoItem) {
      setValue("title", todoItem.title);
      setValue("detail", todoItem.detail);
      setValue("status", todoItem.status);
    }
  }, [todoItem]);

  const onSubmit: SubmitHandler<TodoFormValues> = async (data) => {
    const { title, detail, status } = data;

    // Firestoreの更新
    const docRef = doc(db, "todos", todoItem!.id);
    await updateDoc(docRef, {
      title,
      detail,
      status,
      updatedAt: serverTimestamp(),
    });

    // recoilの更新
    const docSnap = await getDoc(docRef);
    const updatedAt = docSnap.data()?.updatedAt;
    setTodoList((oldTodoList) => {
      return oldTodoList.map((todo) => {
        if (todo === todoItem)
          return { ...todo, title, detail, status, updatedAt };
        return todo;
      });
    });

    router.push("/");
  };

  return (
    <TodoForm
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      heading="Edit"
      buttonSubmit="Update"
    />
  );
};

Edit.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Edit;
