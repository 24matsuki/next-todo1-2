import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Layout } from "../../components/Layout";
import { TodoForm } from "../../components/TodoForm";
import { db } from "../../firebase/firebase";
import { todoListState } from "../../lib/todoStore";
import { userState } from "../../lib/userStore";
import { TodoFormValues, TodoItem } from "../../types";
import { NextPageWithLayout } from "../_app";

const New: NextPageWithLayout = () => {
  const router = useRouter();
  const useUser = useRecoilValue(userState);
  const setTodoList = useSetRecoilState(todoListState);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormValues>();

  const onSubmit: SubmitHandler<TodoFormValues> = async (data) => {
    // Firestoreに追加
    const docRef = await addDoc(collection(db, "todos"), {
      // id: null,
      title: data.title,
      detail: data.detail,
      status: data.status,
      createdAt: serverTimestamp(),
      updatedAt: null,
      uid: useUser!.uid,
    });
    // await updateDoc(doc(db, "todos", docRef.id), {
    //   id: docRef.id,
    // });

    // recoil更新
    const docSnapshot = await getDoc(doc(db, "todos", docRef.id));
    setTodoList((oldTodoLIst) => [
      {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as TodoItem,
      ...oldTodoLIst,
    ]);

    router.push("/");
  };

  return (
    <TodoForm
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      heading="Create"
      buttonSubmit="Create"
    />
  );
};

New.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default New;
