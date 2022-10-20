import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { FC } from "react";
import { AuthFormValues } from "../types";
import { ArrowRightIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";

type Props = {
  buttonName: string;
  onSubmit: SubmitHandler<AuthFormValues>;
};

export const AuthForm: FC<Props> = ({ buttonName, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              children={<EmailIcon color="gray.300" />}
            </InputLeftElement>
            <Input
              id="email"
              type="email"
              focusBorderColor="gray.300"
              rounded="sm"
              placeholder="Email"
              autoFocus={true}
              {...register("email", {
                required: "This is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="4" isInvalid={Boolean(errors.password)}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              children={<LockIcon color="gray.300" />}
            </InputLeftElement>
            <Input
              id="password"
              type="password"
              focusBorderColor="gray.300"
              rounded="sm"
              placeholder="Password"
              {...register("password", {
                required: "This is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt="6"
          w="full"
          colorScheme="pink"
          variant="outline"
          rounded="sm"
          _hover={{ bgColor: "blue.940" }}
          isLoading={isSubmitting}
          type="submit"
        >
          {buttonName}
          <ArrowRightIcon ml={2} w={3} />
        </Button>
      </Stack>
    </form>
  );
};
