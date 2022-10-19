import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Layout } from "../../components/Layout";
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
      id: null,
      title: data.title,
      detail: data.detail,
      status: data.status,
      createdAt: serverTimestamp(),
      updatedAt: null,
      uid: useUser!.uid,
    });
    await updateDoc(doc(db, "todos", docRef.id), {
      id: docRef.id,
    });

    // recoil更新
    const docSnapshot = await getDoc(doc(db, "todos", docRef.id));
    setTodoList((oldTodoLIst) => [
      { ...(docSnapshot.data() as TodoItem) },
      ...oldTodoLIst,
    ]);

    router.push("/");
  };

  return (
    <>
      <Heading>Create</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.title)}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            placeholder="title"
            autoFocus={true}
            {...register("title", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.detail)}>
          <FormLabel htmlFor="detail">Detail</FormLabel>
          <Input
            id="detail"
            placeholder="detail"
            {...register("detail", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.detail && errors.detail.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="status">Status</FormLabel>
          <Select
            id="status"
            {...register("status", {
              required: "This is required",
            })}
          >
            <option value="notStarted">未着手</option>
            <option value="inProgress">進行中</option>
            <option value="finished">完了</option>
          </Select>
          <FormErrorMessage>
            {errors.status && errors.status.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

New.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default New;
