import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "../firebase/firebase";
import { isLoadingState } from "../lib/store";
import { todoListState } from "../lib/todoStore";
import { userState } from "../lib/userStore";

export const GetDocs = () => {
  const setTodoList = useSetRecoilState(todoListState);
  const user = useRecoilValue(userState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "todos"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const setTodoListFromFirestore = async () => {
      const querySnapshot = await getDocs(q);
      const newTodoList = querySnapshot.docs.map((doc) => {
        const { id, title, detail, status, createdAt, updatedAt, uid } =
          doc.data();
        return { id, title, detail, status, createdAt, updatedAt, uid };
      });
      setTodoList(newTodoList);
    };
    setTodoListFromFirestore().then(() => setIsLoading(false));
  }, [user]);

  return null;
};
