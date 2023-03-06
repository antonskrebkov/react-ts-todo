import React, {createContext} from "react";
import { ITodo } from "../interfaces/ITodo";

export type ProductivityTodosContextType = {
  productivityTodos: ITodo[],
  setProductivityTodos: (productivityTodos: ITodo[]) => void,
}

export const ProductivityTodosContext = createContext<ProductivityTodosContextType>({
  productivityTodos: [],
  setProductivityTodos: (productivityTodos: ITodo[]) => {}
})