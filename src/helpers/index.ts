import React, {Dispatch, SetStateAction} from "react"
import { ITodo } from "../interfaces/ITodo"


export const sortTodos = (todosArray: ITodo[]): ITodo[] => {
  return [...todosArray].sort((todo, prevTodo) => prevTodo.priorityCode - todo.priorityCode)
}

export const toggleHandler = (todosHandler: Dispatch<SetStateAction<ITodo[]>>, sortedTodosArray: ITodo[], id: number): void => {
  todosHandler(sortedTodosArray.map((todo: ITodo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed
      todo.completed ? todo.priorityCode = 0 : todo.priorityCode = todo.cachedPriorityCode
    }
    return todo
  }))
}

export const deleteHandler = (todosHandler: Dispatch<SetStateAction<ITodo[]>>, todosArray: ITodo[], deletedTodosHandler: (deletedTodos: ITodo[]) => void, deletedTodosArray: ITodo[], id: number): void => {
  todosHandler(todosArray.filter((todo: ITodo) => todo.id !== id));
  deletedTodosHandler([...deletedTodosArray, ...todosArray.filter((todo: ITodo) => todo.id === id)])
}