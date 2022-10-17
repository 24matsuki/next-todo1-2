import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { auth } from "../firebase/firebase";
import { userState } from "../lib/userStore";

export const Auth: FC = () => {
  const setUser = useSetRecoilState(userState);
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

  return null;
};