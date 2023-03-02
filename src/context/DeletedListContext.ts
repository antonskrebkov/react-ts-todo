import React, {createContext} from "react";

interface Itodo {
  id: number,
  chapter: string,
  title: string,
  completed: boolean,
  priorityCode: number,
  cachedPriorityCode: number
}

export type DeletedListContextType = {
  deletedTodos: Itodo[];
  setDeletedTodos: (deletedTodos: Itodo[]) => void;
}

export const DeletedContext = createContext<DeletedListContextType>({
  deletedTodos: [],
  setDeletedTodos: (deletedTodos) => {}
})