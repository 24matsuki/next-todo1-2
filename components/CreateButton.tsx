import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { FC } from "react";

export const CreateButton: FC = () => {
  const router = useRouter();

  const handleClickCreate = () => {
    router.push("/todos/new");
  };

  return (
    <Button
      variant="unstyled"
      rounded="sm"
      _hover={{ color: "white" }}
      onClick={handleClickCreate}
    >
      <AddIcon mr={2} />
      Create
    </Button>
  );
};
