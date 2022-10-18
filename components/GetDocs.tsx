import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { db } from "../firebase/firebase";
import { todoListState } from "../lib/todoStore";

export const GetDocs = () => {
  const setTodoList = useSetRecoilState(todoListState);

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    const setTodoListFromFirestore = async () => {
      const querySnapshot = await getDocs(q);
      const newTodoList = querySnapshot.docs.map((doc) => {
        const { id, title, detail, status, createdAt, updatedAt, uid } =
          doc.data();
        return { id, title, detail, status, createdAt, updatedAt, uid };
      });
      setTodoList(newTodoList);
    };
    setTodoListFromFirestore();
  }, []);

  return null;
};
