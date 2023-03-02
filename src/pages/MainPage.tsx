import React, {FC, useContext, useEffect, useState} from 'react';
import NavBar from '../components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import trash from '../trash.svg';
import '../App.css'
import { Badge, Button, Accordion, ListGroup, Form, Modal } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DeletedContext, DeletedListContextType } from '../context/DeletedListContext';

interface Itodo {
  id: number,
  chapter: string,
  title: string,
  completed: boolean,
  priorityCode: number,
  cachedPriorityCode: number
}

function MainPage() {
  const [show, setShow] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [chapter, setChapter] = useState<string>('Productivity');
  const [priority, setPriority] = useState<string | number>('1');
  const [productivityTodos, setProductivityTodos] = useState<Itodo[]>([]);
  const [assignmentTodos, setAssignmentTodos] = useState<Itodo[]>([]);
  const [workTodos, setWorkTodos] = useState<Itodo[]>([]);

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

  const sortedProductivityTodos: Itodo[] = [...productivityTodos].sort((todo, prevTodo) => prevTodo.priorityCode - todo.priorityCode)
  const sortedAssignmentTodos: Itodo[] = [...assignmentTodos].sort((todo, prevTodo) => prevTodo.priorityCode - todo.priorityCode)
  const sortedWorkTodos: Itodo[] = [...workTodos].sort((todo, prevTodo) => prevTodo.priorityCode - todo.priorityCode)

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

  function createTodo() {
    const newTodo: Itodo = {
      id: Date.now(),
      chapter: chapter,
      title: todoTitle,
      completed: false,
      priorityCode: Number(priority),
      cachedPriorityCode: Number(priority)
    }
    if(todoTitle.length > 2) {
      switch (chapter) {
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
      setTodoTitle('');
      setShow(false);
      setShowError(false);
    } else  {
      setShowError(true);
    }
  }

  function onClose() {
    setShow(false);
    setShowError(false);
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
      <Button variant='light' onClick={() => setShow(true)}>Create new task</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="select">Chapter</Form.Label>
            <Form.Select id="select" value={chapter} onChange={(e) => setChapter(e.target.value)}>
              <option value="Productivity">Productivity</option>
              <option value="Assignments">Assignments</option>
              <option value="Work">Work</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="select">Priority</Form.Label>
            <Form.Select id="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Task title</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Task title"
              value={todoTitle} 
              onChange={(e) => setTodoTitle(e.target.value)}
              onKeyDown={(e) => e.code === 'Enter' ? createTodo() : ''}
            />
            {showError && <div className="form-validation">Title is required and must be longer than 2 letters!</div>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createTodo}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      
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