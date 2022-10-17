import { atom } from "recoil";
import { User } from "../types/index";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
