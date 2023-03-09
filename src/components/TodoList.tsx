import TodoItem from '../components/TodoItem';
import { Badge, Accordion, ListGroup } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ITodo from '../interfaces/ITodo';
import { sortTodos, toggleHandler, deleteHandler} from '../helpers';

interface TodoListProps {
  eventKey: string,
  todoList: ITodo[],
  setTodos: (todos: ITodo[]) => void,
  deletedTodos: ITodo[],
  setDeletedTodos: (todos: ITodo[]) => void,
  children: string,
}

export default function TodoList({ eventKey, todoList, setTodos, deletedTodos, setDeletedTodos, children }: TodoListProps) {

  const sortedTodoList = sortTodos(todoList)

  function toggleTodo(currentTodo: ITodo): void {
    toggleHandler(setTodos, sortedTodoList, currentTodo.id)
  }

  function deleteTodo(currentTodo: ITodo): void {
    deleteHandler(setTodos, todoList, setDeletedTodos, deletedTodos, currentTodo.id)
  }

  return (
    <Accordion.Item className="mb-3 rounded" eventKey={eventKey}>
      <Accordion.Header>
        <Badge bg="dark">{sortedTodoList.length}</Badge>
        <div className="mx-2">{children}</div>
      </Accordion.Header>
      <Accordion.Body className="p-0">
      <ListGroup>
        {!sortedTodoList.length && <ListGroup.Item>No tasks</ListGroup.Item>}
        <TransitionGroup>
          {sortedTodoList.map(todo => {
            return (
              <CSSTransition
                key={todo.id}
                timeout={200}
                classNames="todo"
              >
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  remove={deleteTodo} 
                  toggle={toggleTodo}
                />
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  )
}
