import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { Layout } from "../../../components/Layout";
import { db } from "../../../firebase/firebase";
import { useGetTodoItem } from "../../../hooks/useGetTodoItem";
import { todoItemState } from "../../../lib/todoStore";
import { TodoFormValues, TodoItem } from "../../../types";
import { NextPageWithLayout } from "../../_app";

const Edit: NextPageWithLayout = () => {
  const todoItem = useRecoilValue(todoItemState);
  const router = useRouter();

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
    await updateDoc(doc(db, "todos", todoItem!.id), {
      title: data.title,
      detail: data.detail,
      status: data.status,
      updatedAt: serverTimestamp(),
    });

    router.push("/todos");
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
