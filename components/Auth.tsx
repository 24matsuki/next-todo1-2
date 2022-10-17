import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { auth } from "../firebase/firebase";
import { userState } from "../lib/userStore";

export const Auth: FC = () => {
  const [useUser, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email!,
        });
      } else {
        resetUser();
        router.push("/signin");
      }
    });
  }, []);

  useEffect(() => {
    if (/^\/todos/.test(router.asPath) && !useUser) {
      router.replace("/signin");
    }
    if (/^\/(signin|signup)/.test(router.asPath) && useUser) {
      router.replace("/todos");
    }
  }, [router.asPath]);

  return null;
};
