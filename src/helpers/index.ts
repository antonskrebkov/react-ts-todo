import ITodo from '../interfaces/ITodo'
import IDate from '../interfaces/IDate'
import productivity from '../assets/images/productivity.png'
import assignment from '../assets/images/assignment.png'
import work from '../assets/images/work.png'

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

export const findTodo = (todos: ITodo[], id: string) => todos.find(todo => todo.id === +id)

export const formatDate = (todo: ITodo) => {
  const dateAdded: Date = new Date(todo.id)
  const date: IDate = {
    day: dateAdded.getDate().toString().padStart(2, '0'),
    month: (dateAdded.getMonth() + 1).toString().padStart(2, '0'),
    year: dateAdded.getFullYear().toString(),
    hours: dateAdded.getHours().toString().padStart(2, '0'),
    minutes: dateAdded.getMinutes().toString().padStart(2, '0'),
    seconds: dateAdded.getSeconds().toString().padStart(2, '0')
  }
  return `${date.day}/${date.month}/${date.year} ${date.hours}:${date.minutes}:${date.seconds}`
}

export const setChapterImage = (todo: ITodo, setter: (image: string) => void) => {
  switch (todo.chapter) {
    case 'Productivity' : 
      setter(productivity);
      break;
    case 'Assignments' : 
      setter(assignment);
      break;
    case 'Work' : 
      setter(work);
      break;
  }
}