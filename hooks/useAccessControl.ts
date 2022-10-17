import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../lib/userStore";

export const useAccessControl = () => {
  const router = useRouter();
  const useUser = useRecoilValue(userState);

  useEffect(() => {
    if (/^\/todos/.test(router.asPath) && !useUser) {
      router.replace("/signin");
    }
    if (/^\/(signin|signup)$/.test(router.asPath) && useUser) {
      router.replace("/todos");
    }
  }, [router.asPath]);
};
