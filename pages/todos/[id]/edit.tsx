import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Layout } from "../../../components/Layout";
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
    } else console.log("!todoItem");
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
    <>
      <Heading>Edit</Heading>
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
          <Select id="status" {...register("status")}>
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
          Update
        </Button>
      </form>
    </>
  );
};

Edit.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Edit;
