import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import { ProductivityTodosContext, ProductivityTodosContextType } from '../context/ProductivityTodosContext';
import { ITodo } from '../interfaces/ITodo';
import productivity from '../assets/images/productivity.png'
import assignment from '../assets/images/assignment.png'
import work from '../assets/images/work.png'
import { AssignmentTodosContext, AssignmentTodosContextType } from '../context/AssignmentTodosContext';
import { WorkTodosContext, WorkTodosContextType } from '../context/WorkTodosContext';

interface IDate {
  day: string,
  month: string,
  year: string,
  hours: string,
  minutes: string,
  seconds: string
}

export default function TodoPage() {

  const {id} = useParams()
  const navigate = useNavigate()

  const [todo, setTodo] = useState<ITodo | null>(null)
  const [date, setDate] = useState<IDate | null>(null)
  const [image, setImage] = useState<string>('')


  const {productivityTodos, setProductivityTodos} = useContext(ProductivityTodosContext) as ProductivityTodosContextType;
  const {assignmentTodos, setAssignmentTodos} = useContext(AssignmentTodosContext) as AssignmentTodosContextType;
  const {workTodos, setWorkTodos} = useContext(WorkTodosContext) as WorkTodosContextType;

  const goBack = () => navigate(-1)

  function setPriority(priorityCode: number): {name: string, color: string} {
    switch (priorityCode) {
      case 1 : return {name: 'Low', color: 'text-success'};
      case 2 : return {name: 'Medium', color: 'text-warning'};
      case 3 : return {name: 'High', color: 'text-danger'};
      default : return {name: 'Low', color: 'text-success'}
    }
  }      

  useEffect(() => {
    if (id) {
      if (productivityTodos.find(todo => todo.id === +id)) {
        setTodo(productivityTodos.find(todo => todo.id === +id)!)
      } else if (assignmentTodos.find(todo => todo.id === +id)) {
        setTodo(assignmentTodos.find(todo => todo.id === +id)!)
      } else if (workTodos.find(todo => todo.id === +id)) {
        setTodo(workTodos.find(todo => todo.id === +id)!)        
      }
    }
  }, [id])

  useEffect(() => {
    if (todo) {
      const dateAdded: Date = new Date(todo.id)
      const formattedDate = {
        day: dateAdded.getDate().toString().padStart(2, "0"),
        month: (dateAdded.getMonth() + 1).toString().padStart(2, "0"),
        year: dateAdded.getFullYear().toString(),
        hours: dateAdded.getHours().toString().padStart(2, "0"),
        minutes: dateAdded.getMinutes().toString().padStart(2, "0"),
        seconds: dateAdded.getSeconds().toString().padStart(2, "0")
      }
      setDate(formattedDate)

      switch (todo.chapter) {
        case 'Productivity' : 
          setImage(productivity);
          break;
        case 'Assignments' : 
          setImage(assignment);
          break;
        case 'Work' : 
          setImage(work);
          break;
      }
    }
  }, [todo])
  
  return (
    <>
    <Button className="mt-4" variant='light' onClick={goBack}>Back</Button>
    { todo && 
    <Card className="mt-4 mb-0 mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Img variant="top" className="my-0 mx-auto w-50" src={image} />
      <Card.Header className="fw-bold text-center">{todo.chapter}</Card.Header>
      <Card.Body >
        <Card.Title className={setPriority(todo.cachedPriorityCode).color}><span className="fw-bold">Priority: </span>{setPriority(todo.cachedPriorityCode).name}</Card.Title>
        <Card.Title className={!todo.completed ? "text-success" : "text-danger"}><span className="fw-bold">Status: </span>{!todo.completed ? "Done" : "Not done"}</Card.Title>
        <Card.Text><span className="fw-bold">Todo: </span>{todo.title}</Card.Text>
      </Card.Body>
      {date &&
        <Card.Footer><span className="fw-bold">Added at: </span>{date.day}/{date.month}/{date.year} {date.hours}:{date.minutes}:{date.seconds}</Card.Footer>
      }
    </Card>
    }
    </>
    )
}
