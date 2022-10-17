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
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Layout } from "../../../components/Layout";
import { db } from "../../../firebase/firebase";
import { TodoFormValues, TodoItem } from "../../../types";
import { NextPageWithLayout } from "../../_app";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const docId = params!.id;
  const docSnap = await getDoc(doc(db, "todos", docId));
  const data = docSnap.data();
  const todoItem = JSON.parse(JSON.stringify(data));

  return { props: { todoItem } };
};

type Props = {
  todoItem: TodoItem;
};

const edit: NextPageWithLayout<Props> = ({ todoItem }) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: todoItem.title,
      detail: todoItem.detail,
      status: todoItem.status,
    },
  });

  const onSubmit: SubmitHandler<TodoFormValues> = async (data) => {
    await updateDoc(doc(db, "todos", todoItem.id), {
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

edit.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default edit;
