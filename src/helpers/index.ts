import { ITodo } from "../interfaces/ITodo"

export const sortTodos = (todosArray: ITodo[]): ITodo[] => {
  return [...todosArray].sort((todo, prevTodo) => prevTodo.priorityCode - todo.priorityCode)
}

export const toggleHandler = (todosHandler: (todos: ITodo[]) => void, sortedTodosArray: ITodo[], id: number): void => {
  todosHandler(sortedTodosArray.map((todo: ITodo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed
      todo.completed ? todo.priorityCode = 0 : todo.priorityCode = todo.cachedPriorityCode
    }
    return todo
  }))
}

export const deleteHandler = (todosHandler: (deletedTodos: ITodo[]) => void, todosArray: ITodo[], deletedTodosHandler: (deletedTodos: ITodo[]) => void, deletedTodosArray: ITodo[], id: number): void => {
  todosHandler(todosArray.filter((todo: ITodo) => todo.id !== id));
  deletedTodosHandler([...deletedTodosArray, ...todosArray.filter((todo: ITodo) => todo.id === id)])
}