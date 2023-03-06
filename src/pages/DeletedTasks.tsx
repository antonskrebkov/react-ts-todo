import React, {useContext, useEffect} from 'react'
import { DeletedContext, DeletedListContextType } from '../context/DeletedListContext';
import { Button, ListGroup } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import trash from '../assets/images/trash.svg';

export default function DeletedTasks() {
  const {deletedTodos, setDeletedTodos} = useContext(DeletedContext) as DeletedListContextType;

  function deleteTodo(id: number, e: any) {
    e.stopPropagation();
    setDeletedTodos(deletedTodos.filter((todo) => todo.id !== id))
  }

  function cleanDeleted() {
    let confirmation: boolean = window.confirm('Are you sure you want to clear the entire list?')
    
    if (confirmation === true) {
      setDeletedTodos([])
    }
  }

  useEffect(() => {
    setDeletedTodos(JSON.parse(localStorage.getItem('deleted')!))
  }, [])

  useEffect(() => {
    localStorage.setItem('deleted', JSON.stringify(deletedTodos));
  }, [deletedTodos])

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
                  <div className='todo-item-right'>
                    <Button className="remove-todo" variant='none' onClick={(e) => deleteTodo(todo.id, e)}>
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

// const dateAdded: Date = new Date(todo.id)
// const day = dateAdded.getDate().toString().padStart(2, "0");
// const month = (dateAdded.getMonth() + 1).toString().padStart(2, "0");
// const year = dateAdded.getFullYear().toString();
// const hours = dateAdded.getHours().toString().padStart(2, "0");
// const minutes = dateAdded.getMinutes().toString().padStart(2, "0");
// const seconds = dateAdded.getSeconds().toString().padStart(2, "0");

// <li className="list-item">{day}/{month}/{year} {hours}:{minutes}:{seconds}</li>