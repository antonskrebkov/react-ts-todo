import { useEffect } from "react";
import ITodo from "../interfaces/ITodo";

export default function useLocalStorage(key: string, element: ITodo[], setter: (element: ITodo[]) => void) {
  useEffect(() => {
    setter(JSON.parse(localStorage.getItem(key)!))
  }, [])
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(element));
  }, [element])
}
