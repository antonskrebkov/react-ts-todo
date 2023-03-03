import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ITodo } from '../interfaces/ITodo';

interface CreateTodoProps {
  create: (newTodo: ITodo) => void
}

export default function CreateTodo({create}: CreateTodoProps) {
  
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [chapter, setChapter] = useState<string>('Productivity');
  const [priority, setPriority] = useState<string | number>('1');
  const [show, setShow] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  function addNewTodo() {
    const newTodo: ITodo = {
      id: Date.now(),
      chapter: chapter,
      title: todoTitle,
      completed: false,
      priorityCode: Number(priority),
      cachedPriorityCode: Number(priority)
    }
    if (newTodo.title.length > 2) {
      create(newTodo)
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

  return (
    <>
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
              onKeyDown={(e) => e.code === 'Enter' ? addNewTodo() : ''}
            />
            {showError && <div className="form-validation">Title is required and must be longer than 2 letters!</div>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addNewTodo}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
