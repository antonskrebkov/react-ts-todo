import React from 'react'
import { Button, ListGroup, Form } from 'react-bootstrap';
import trash from '../assets/images/trash.svg';
import { CSSTransition } from 'react-transition-group';
import { ITodo } from '../interfaces/ITodo';

interface TodoItemProps {
  todo: ITodo
}

export default function TodoItem( {todo}: TodoItemProps) {
  return (
    <CSSTransition
      key={todo.id}
      timeout={200}
      classNames="todo"
    >
      {/* <ListGroup.Item 
        onClick={() => toggleTodo(todo.id, todo.chapter)} 
        key={todo.id} 
        className="todo-item d-flex justify-content-between align-items-center rounded mt-1 border-0" 
        variant={todo.completed ? 'secondary' : setColorFromPriority(todo.priorityCode)}
      >
        <Form.Check className="d-none" type='checkbox'/>
        <div 
          className={todo.completed ? "text-decoration-line-through" : "text-decoration-none"}
        >
          {todo.title}
        </div>
        <Button 
          className="remove-todo" 
          variant='none' 
          onClick={(e) => deleteTodo(todo.id, todo.chapter, e)}
        >
          <img src={trash} alt="" />
        </Button>
      </ListGroup.Item> */}
    </CSSTransition>
  )
}
