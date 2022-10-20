import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { FC } from "react";
import { FieldErrorsImpl, SubmitHandler } from "react-hook-form";
import { TodoFormValues } from "../types";

type Props = {
  onSubmit: SubmitHandler<TodoFormValues>;
  handleSubmit: any;
  register: any;
  errors: Partial<FieldErrorsImpl<TodoFormValues>>;
  isSubmitting: boolean;
  heading: string;
  buttonSubmit: string;
};

export const TodoForm: FC<Props> = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  isSubmitting,
  heading,
  buttonSubmit,
}) => {
  return (
    <Container maxW="md">
      <Heading py="4" textAlign="center">
        {heading}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="8">
          <FormControl isInvalid={Boolean(errors.title)}>
            <Input
              id="title"
              focusBorderColor="gray.300"
              rounded="sm"
              placeholder="Title"
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
          <FormControl mt="4" isInvalid={Boolean(errors.detail)}>
            <Input
              id="detail"
              focusBorderColor="gray.300"
              rounded="sm"
              placeholder="Detail"
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
            <Select rounded="sm" id="status" {...register("status")}>
              <option value="notStarted">未着手</option>
              <option value="inProgress">進行中</option>
              <option value="finished">完了</option>
            </Select>
            <FormErrorMessage>
              {errors.status && errors.status.message}
            </FormErrorMessage>
          </FormControl>
          <Flex justify="center">
            <Button
              w="32"
              colorScheme="pink"
              variant="outline"
              rounded="sm"
              _hover={{ bgColor: "blue.940" }}
              isLoading={isSubmitting}
              type="submit"
            >
              {buttonSubmit}
              <ArrowRightIcon ml={2} w={3} />
            </Button>
          </Flex>
        </Stack>
      </form>
    </Container>
  );
};
