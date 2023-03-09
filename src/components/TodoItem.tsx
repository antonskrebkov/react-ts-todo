import React from 'react';
import { Button, ListGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import trash from '../assets/images/trash.svg';
import ITodo from '../interfaces/ITodo';

interface TodoItemProps {
  todo: ITodo,
  toggle: (currentTodo: ITodo) => void,
  remove: (currentTodo: ITodo) => void,
}

export default function TodoItem( {todo, toggle, remove} : TodoItemProps) {
  function removeHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    remove(todo);
  }

  function setColorFromPriority(priorityCode: number): string {
    switch (priorityCode) {
      case 1 : return 'success';
      case 2 : return 'warning';
      case 3 : return 'danger';
      default : return 'success'
    }
  }
  
  return (
      <ListGroup.Item 
        onClick={() => toggle(todo)} 
        key={todo.id} 
        className="todo-item d-flex justify-content-between align-items-center rounded mt-1 border-0" 
        variant={todo.completed ? "secondary" : setColorFromPriority(todo.priorityCode)}
      >
        <Form.Check className="d-none" type="checkbox"/>
        <div 
          className={todo.completed ? "text-decoration-line-through" : "text-decoration-none"}
        >
          {todo.title}
        </div>
        <div className="d-flex justify-content-center align-items-center gap-1">
          <Link 
            to={`/todos/${todo.id}`}
            className="open-todo text-decoration-none text-secondary d-flex px-1 justify-content-center align-items-center border border-1 rounded border-secondary"
          >
            Open
          </Link>
          <Button 
            className="remove-todo" 
            variant="none" 
            onClick={(e) => removeHandler(e)}
          >
            <img src={trash} alt="" />
          </Button>
        </div>
      </ListGroup.Item>
  )
}
