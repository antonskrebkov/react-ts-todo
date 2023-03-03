import React, {FC, useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import trash from '../assets/images/trash.svg';
import '../assets/App.css'
import { Badge, Button, Accordion, ListGroup, Form, Modal } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DeletedContext, DeletedListContextType } from '../context/DeletedListContext';
import { ITodo } from '../interfaces/ITodo';
import CreateTodo from '../components/CreateTodo';


function MainPage() {
  const [productivityTodos, setProductivityTodos] = useState<ITodo[]>([]);
  const [assignmentTodos, setAssignmentTodos] = useState<ITodo[]>([]);
  const [workTodos, setWorkTodos] = useState<ITodo[]>([]);

  const {deletedTodos, setDeletedTodos} = useContext(DeletedContext) as DeletedListContextType;

  function deleteTodo(id: number, chapter: string, e: any) {
    e.stopPropagation();
    switch (chapter) {
      case 'Productivity' : 
          setProductivityTodos(productivityTodos.filter((todo) => todo.id !== id));
          setDeletedTodos([...deletedTodos, ...productivityTodos.filter((todo) => todo.id === id)])
        break;
        case 'Assignments' : 
          setAssignmentTodos(assignmentTodos.filter((todo) => todo.id !== id))
          setDeletedTodos([...deletedTodos, ...assignmentTodos.filter((todo) => todo.id === id)])
        break;
        case 'Work' :
          setWorkTodos(workTodos.filter((todo) => todo.id !== id))
          setDeletedTodos([...deletedTodos, ...workTodos.filter((todo) => todo.id === id)])
        break;
    }
  }

  const sortedProductivityTodos: ITodo[] = [...productivityTodos].sort((todo, prevTodo) => prevTodo.priorityCode - todo.priorityCode)
  const sortedAssignmentTodos: ITodo[] = [...assignmentTodos].sort((todo, prevTodo) => prevTodo.priorityCode - todo.priorityCode)
  const sortedWorkTodos: ITodo[] = [...workTodos].sort((todo, prevTodo) => prevTodo.priorityCode - todo.priorityCode)

  function toggleTodo(id: number, chapter: string) {
    switch (chapter) {
      case 'Productivity' : 
      setProductivityTodos(sortedProductivityTodos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
          todo.completed ? todo.priorityCode = 0 : todo.priorityCode = todo.cachedPriorityCode
        }
        return todo
      }))
        break;
      case 'Assignments' : 
      setAssignmentTodos(sortedAssignmentTodos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
          todo.completed ? todo.priorityCode = 0 : todo.priorityCode = todo.cachedPriorityCode
        }
        return todo
      }))
        break;
      case 'Work' :
        setWorkTodos(sortedWorkTodos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed
            todo.completed ? todo.priorityCode = 0 : todo.priorityCode = todo.cachedPriorityCode
          }
          return todo
        }))
        break;
    }
  } 

  function setColorFromPriority(priorityCode: any) {
    switch (priorityCode) {
      case 1 || '1' : return 'success';
      case 2 || '2' : return 'warning';
      case 3 || '3' : return 'danger';
    }
  }

  function createTodo(newTodo: ITodo) {
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
                      <ListGroup.Item style={!todo.completed ? {cursor: 'pointer'} : {cursor: 'default'}} onClick={() => toggleTodo(todo.id, todo.chapter)} key={todo.id} className="listGroupItem rounded mt-1 border-0" variant={todo.completed ? 'secondary' : setColorFromPriority(todo.priorityCode)}>
                        <div className='listGroupItemLeft'>
                          <Form.Check style={{display: 'none'}} type='checkbox'/>
                          <div style={todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}} className="todoTitle">{todo.title}</div>
                        </div>
                        <div className='todo-item-right'>
                          <Button className="remove-todo" variant='none' onClick={(e) => deleteTodo(todo.id, todo.chapter, e)}>
                            <img src={trash} alt="" />
                          </Button>
                        </div>
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
                    <ListGroup.Item style={!todo.completed ? {cursor: 'pointer'} : {cursor: 'default'}} onClick={() => toggleTodo(todo.id, todo.chapter)} key={todo.id} className="listGroupItem rounded mt-1 border-0" variant={todo.completed ? 'secondary' : setColorFromPriority(todo.priorityCode)}>
                      <div className='listGroupItemLeft'>
                        <Form.Check style={{display: 'none'}} type='checkbox'/>
                        <div style={todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}} className="todoTitle">{todo.title}</div>
                      </div>
                      <div className='todo-item-right'>
                        <Button className="remove-todo" variant='none' onClick={(e) => deleteTodo(todo.id, todo.chapter, e)}>
                          <img src={trash} alt="" />
                        </Button>
                      </div>
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
                    <ListGroup.Item style={!todo.completed ? {cursor: 'pointer' } : {cursor: 'default'}} onClick={() => toggleTodo(todo.id, todo.chapter)} key={todo.id} className="listGroupItem rounded mt-1 border-0" variant={todo.completed ? 'secondary' : setColorFromPriority(todo.priorityCode)}>
                      <div className='listGroupItemLeft'>
                        <Form.Check style={{display: 'none'}} type='checkbox'/>
                        <div style={todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}} className="todoTitle">{todo.title}</div>
                      </div>
                      <div className='todo-item-right'>
                        <Button variant='none' className="remove-todo" onClick={(e) => deleteTodo(todo.id, todo.chapter, e)}>
                          <img src={trash} alt="" />
                        </Button>
                      </div>
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

export default MainPage;