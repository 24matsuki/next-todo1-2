import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../lib/userStore";

export const useRequireLogin = () => {
  const useUser = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    !useUser && router.replace("/signin");
  }, []);
};
