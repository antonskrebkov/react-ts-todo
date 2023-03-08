import {useContext} from 'react'
import { DeletedContext, DeletedListContextType } from '../context/DeletedListContext';
import { Button, ListGroup } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import trash from '../assets/images/trash.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import { ITodo } from '../interfaces/ITodo';
import { ProductivityTodosContext, ProductivityTodosContextType } from '../context/ProductivityTodosContext';
import { AssignmentTodosContext, AssignmentTodosContextType } from '../context/AssignmentTodosContext';
import { WorkTodosContext, WorkTodosContextType } from '../context/WorkTodosContext';

export default function DeletedTasks() {

  const {productivityTodos, setProductivityTodos} = useContext(ProductivityTodosContext) as ProductivityTodosContextType;
  const {assignmentTodos, setAssignmentTodos} = useContext(AssignmentTodosContext) as AssignmentTodosContextType;
  const {workTodos, setWorkTodos} = useContext(WorkTodosContext) as WorkTodosContextType;
  const {deletedTodos, setDeletedTodos} = useContext(DeletedContext) as DeletedListContextType;

  function restoreTodo(todo: ITodo) {
    switch (todo.chapter) {
      case 'Productivity' : 
        setProductivityTodos([...productivityTodos, todo])
        break;
      case 'Assignments' : 
        setAssignmentTodos([...assignmentTodos, todo])
        break;
      case 'Work' : 
        setWorkTodos([...workTodos, todo])
        break;
    }
    setDeletedTodos(deletedTodos.filter(current => current.id !== todo.id))
  }

  function deleteTodo(id: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    setDeletedTodos(deletedTodos.filter((todo) => todo.id !== id))
  }

  function cleanDeleted() {
    let confirmation: boolean = window.confirm('Are you sure you want to clear the entire list?')
    
    if (confirmation === true) {
      setDeletedTodos([])
    }
  }

  useLocalStorage('productivity', productivityTodos, setProductivityTodos)
  useLocalStorage('assignments', assignmentTodos, setAssignmentTodos)
  useLocalStorage('work', workTodos, setWorkTodos)
  useLocalStorage('deleted', deletedTodos, setDeletedTodos)

  return (
    <div className="mt-4">
      <Button variant='danger' onClick={cleanDeleted}>Clean all</Button>
      <ListGroup className='mt-4'>
          {!deletedTodos.length && <ListGroup.Item className="rounded">No tasks</ListGroup.Item>}
        <TransitionGroup>
          {deletedTodos.map(todo => {
            return (
              <CSSTransition
                key={todo.id}
                timeout={200}
                classNames="todo"
              >
                <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center rounded mb-2" variant='secondary'>
                  <div className="todoTitle">{todo.chapter}: {todo.title}</div>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <Button 
                      className="open-todo text-decoration-none text-secondary d-flex px-1 justify-content-center align-items-center border border-1 rounded border-secondary"
                      variant='none'
                      onClick={() => restoreTodo(todo)}
                    >
                      Restore
                    </Button>
                      <Button 
                        className="remove-todo" 
                        variant='none' 
                        onClick={(e) => deleteTodo(todo.id, e)}
                      >
                        <img src={trash} alt="" />
                      </Button>
                  </div>
                </ListGroup.Item>
              </CSSTransition>
          )})}
        </TransitionGroup>
      </ListGroup>
    </div>
  )
}
