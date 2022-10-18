import { atom } from "recoil";
import { User } from "../types/index";

export const userState = atom<User | undefined>({
  key: "userState",
  default: undefined,
});
