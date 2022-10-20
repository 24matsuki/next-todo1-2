import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "../firebase/firebase";
import { isLoadingState } from "../lib/store";
import { todoListState } from "../lib/todoStore";
import { userState } from "../lib/userStore";
import { TodoItem } from "../types";

export const DocChanges = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "todos"),
      // 変更したらインデックスを作成すること。
      where("uid", "==", user.uid),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: false },
      (snapshot) => {
        if (snapshot.empty) setIsLoading(false);
        snapshot
          // .docChanges({ includeMetadataChanges: true })
          .docChanges()
          .forEach((change) => {
            if (change.type === "added") {
              console.log("change.doc:", change.doc.data());
              setTodoList((oldTodoLIst) => [
                {
                  id: change.doc.id,
                  ...change.doc.data(),
                } as TodoItem,
                ...oldTodoLIst,
              ]);
              if (isLoading) setIsLoading(false);
            }
            if (change.type === "modified") {
              console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
              setTodoList((oldTodoList) => {
                return oldTodoList.filter((todo) => todo.id !== change.doc.id);
              });
            }
          });
      }
    );

    return () => unsubscribe();
  }, [user]);

  return null;
};
