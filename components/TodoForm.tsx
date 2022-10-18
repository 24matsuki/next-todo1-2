import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
const {
  handleSubmit,
  register,
  setValue,
  formState: { errors, isSubmitting },
} = useForm<TodoFormValues>();

export const TodoForm = () => {
  return (
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
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Update
      </Button>
    </form>
  );
};
