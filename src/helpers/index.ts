import { ITodo } from "../interfaces/ITodo"

export const sortedTodos = (todosArray: ITodo[]) => {
  return [...todosArray].sort((todo, prevTodo) => prevTodo.priorityCode - todo.priorityCode)
}