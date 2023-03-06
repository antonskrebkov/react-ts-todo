import React, {FC, useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import trash from '../assets/images/trash.svg';
import '../assets/App.css'
import { Badge, Button, Accordion, ListGroup, Form } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DeletedContext, DeletedListContextType } from '../context/DeletedListContext';
import { ITodo } from '../interfaces/ITodo';
import CreateTodo from '../components/CreateTodo';
import { sortTodos, toggleHandler, deleteHandler} from '../helpers';

export default function MainPage() {

  const [productivityTodos, setProductivityTodos] = useState<ITodo[]>([]);
  const [assignmentTodos, setAssignmentTodos] = useState<ITodo[]>([]);
  const [workTodos, setWorkTodos] = useState<ITodo[]>([]);

  const {deletedTodos, setDeletedTodos} = useContext(DeletedContext) as DeletedListContextType;

  const sortedProductivityTodos = sortTodos(productivityTodos)
  const sortedAssignmentTodos = sortTodos(assignmentTodos)
  const sortedWorkTodos = sortTodos(workTodos)

  function createTodo(newTodo: ITodo): void {
    switch (newTodo.chapter) {
      case 'Productivity' : 
        setProductivityTodos([...productivityTodos, newTodo]);
        break;
      case 'Assignments' : 
        setAssignmentTodos([...assignmentTodos, newTodo]);
        break;
      case 'Work' :
        setWorkTodos([...workTodos, newTodo]);
        break;
    }
  }

  function toggleTodo(id: number, chapter: string): void {
    switch (chapter) {
      case 'Productivity' : 
        toggleHandler(setProductivityTodos, sortedProductivityTodos, id)
        break;
      case 'Assignments' : 
        toggleHandler(setAssignmentTodos, sortedAssignmentTodos, id)
        break;
      case 'Work' :
        toggleHandler(setWorkTodos, sortedWorkTodos, id)
        break;
    }
  } 

  function deleteTodo(id: number, chapter: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.stopPropagation();
    switch (chapter) {
      case 'Productivity' : 
          deleteHandler(setProductivityTodos, productivityTodos, setDeletedTodos, deletedTodos, id)
          break;
      case 'Assignments' : 
        deleteHandler(setAssignmentTodos, assignmentTodos, setDeletedTodos, deletedTodos, id)
        break;
      case 'Work' :
        deleteHandler(setWorkTodos, workTodos, setDeletedTodos, deletedTodos, id)
        break;
    }
  }

  function setColorFromPriority(priorityCode: any): string {
    switch (priorityCode) {
      case 1 || '1' : return 'success';
      case 2 || '2' : return 'warning';
      case 3 || '3' : return 'danger';
      default : return 'success'
    }
  }

  useEffect(() => {
    setProductivityTodos(JSON.parse(localStorage.getItem('productivity')!))
    setAssignmentTodos(JSON.parse(localStorage.getItem('assignments')!))
    setWorkTodos(JSON.parse(localStorage.getItem('work')!))
    setDeletedTodos(JSON.parse(localStorage.getItem('deleted')!))
  }, [])

  useEffect(() => {
    localStorage.setItem('productivity', JSON.stringify(productivityTodos));
  }, [productivityTodos])
  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignmentTodos));
  }, [assignmentTodos])
  useEffect(() => {
    localStorage.setItem('work', JSON.stringify(workTodos));
  }, [workTodos])
  useEffect(() => {
    localStorage.setItem('deleted', JSON.stringify(deletedTodos));
  }, [deletedTodos])


  return (
    <div className="App mt-4">

      <CreateTodo create={createTodo}></CreateTodo>

        <Accordion className='mt-4' alwaysOpen>
          <Accordion.Item className='mb-3 rounded' eventKey="0">
            <Accordion.Header>
              <Badge bg="dark">{sortedProductivityTodos.length}</Badge>
              <div className='mx-2'>Productivity</div>
            </Accordion.Header>
            <Accordion.Body className='p-0'>
            <ListGroup>
              {!sortedProductivityTodos.length && <ListGroup.Item>No tasks</ListGroup.Item>}
              <TransitionGroup>
                {sortedProductivityTodos.map(todo => {
                  return (
                    <CSSTransition
                      key={todo.id}
                      timeout={200}
                      classNames="todo"
                    >
                      <ListGroup.Item 
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
                      </ListGroup.Item>
                    </CSSTransition>
                  )
                })}
              </TransitionGroup>
            </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className='mb-3 rounded' eventKey="1">
            <Accordion.Header>
              <Badge bg="dark">{sortedAssignmentTodos.length}</Badge>
              <div className='mx-2'>Assignments</div>
            </Accordion.Header>
            <Accordion.Body className='p-0'>
              <ListGroup>
                {!sortedAssignmentTodos.length && <ListGroup.Item>No tasks</ListGroup.Item>}
              <TransitionGroup>
                {sortedAssignmentTodos.map(todo => {
                  return (
                  <CSSTransition
                    key={todo.id}
                    timeout={200}
                    classNames="todo"
                  >
                    <ListGroup.Item 
                      style={!todo.completed ? {cursor: 'pointer'} : {cursor: 'default'}} 
                      onClick={() => toggleTodo(todo.id, todo.chapter)} 
                      key={todo.id} 
                      className="d-flex justify-content-between align-items-center rounded mt-1 border-0" 
                      variant={todo.completed ? 'secondary' : setColorFromPriority(todo.priorityCode)}
                    >
                      <Form.Check style={{display: 'none'}} type='checkbox'/>
                      <div 
                        style={todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}} 
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
                    </ListGroup.Item>
                  </CSSTransition>
                  )})}
                </TransitionGroup>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="rounded" eventKey="2">
            <Accordion.Header>
              <Badge bg="dark">{sortedWorkTodos.length}</Badge>
              <div className='mx-2'>Work</div>
            </Accordion.Header>
            <Accordion.Body className='p-0'>
            <ListGroup className="rounded">
              {!sortedWorkTodos.length && <ListGroup.Item>No tasks</ListGroup.Item>}
              <TransitionGroup>
                {sortedWorkTodos.map(todo => {
                return (
                  <CSSTransition
                    key={todo.id}
                    timeout={200}
                    classNames="todo"
                  >
                    <ListGroup.Item 
                      style={!todo.completed ? {cursor: 'pointer' } : {cursor: 'default'}} 
                      onClick={() => toggleTodo(todo.id, todo.chapter)} 
                      key={todo.id} 
                      className="d-flex justify-content-between align-items-center rounded mt-1 border-0" 
                      variant={todo.completed ? 'secondary' : setColorFromPriority(todo.priorityCode)}
                    >
                      <Form.Check style={{display: 'none'}} type='checkbox'/>
                      <div 
                        style={todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                      >
                        {todo.title}
                      </div>
                      <Button 
                        variant='none' 
                        className="remove-todo" 
                        onClick={(e) => deleteTodo(todo.id, todo.chapter, e)}
                      >
                        <img src={trash} alt="" />
                      </Button>
                    </ListGroup.Item>
                  </CSSTransition>
                  )})}
              </TransitionGroup>
            </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
    </div>
  );
}