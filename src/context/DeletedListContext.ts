import React, {createContext} from "react";
import { ITodo } from "../interfaces/ITodo";

export type DeletedListContextType = {
  deletedTodos: ITodo[],
  setDeletedTodos: (deletedTodos: ITodo[]) => void,
}

export const DeletedContext = createContext<DeletedListContextType>({
  deletedTodos: [],
  setDeletedTodos: (deletedTodos: ITodo[]) => {}
})