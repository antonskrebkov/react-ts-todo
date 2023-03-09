import {createContext} from "react";
import ITodo from "../interfaces/ITodo";

export type WorkTodosContextType = {
  workTodos: ITodo[],
  setWorkTodos: (workTodos: ITodo[]) => void,
}

export const WorkTodosContext = createContext<WorkTodosContextType>({
  workTodos: [],
  setWorkTodos: (workTodos: ITodo[]) => {}
})