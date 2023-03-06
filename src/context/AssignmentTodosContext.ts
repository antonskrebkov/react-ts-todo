import React, {createContext} from "react";
import { ITodo } from "../interfaces/ITodo";

export type AssignmentTodosContextType = {
  assignmentTodos: ITodo[],
  setAssignmentTodos: (assignmentTodos: ITodo[]) => void,
}

export const AssignmentTodosContext = createContext<AssignmentTodosContextType>({
  assignmentTodos: [],
  setAssignmentTodos: (assignmentTodos: ITodo[]) => {}
})