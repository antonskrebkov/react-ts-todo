import { useContext } from 'react';
import '../assets/App.css'
import { Accordion } from 'react-bootstrap';
import { DeletedContext, DeletedListContextType } from '../context/DeletedListContext';
import { ProductivityTodosContext, ProductivityTodosContextType } from '../context/ProductivityTodosContext';
import { AssignmentTodosContext, AssignmentTodosContextType } from '../context/AssignmentTodosContext';
import { WorkTodosContext, WorkTodosContextType } from '../context/WorkTodosContext';
import { ITodo } from '../interfaces/ITodo';
import CreateTodo from '../components/CreateTodo';
import TodoList from '../components/TodoList';
import useLocalStorage from '../hooks/useLocalStorage';

export default function MainPage() {

  const {productivityTodos, setProductivityTodos} = useContext(ProductivityTodosContext) as ProductivityTodosContextType;
  const {assignmentTodos, setAssignmentTodos} = useContext(AssignmentTodosContext) as AssignmentTodosContextType;
  const {workTodos, setWorkTodos} = useContext(WorkTodosContext) as WorkTodosContextType;
  const {deletedTodos, setDeletedTodos} = useContext(DeletedContext) as DeletedListContextType;

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

  useLocalStorage('productivity', productivityTodos, setProductivityTodos)
  useLocalStorage('assignments', assignmentTodos, setAssignmentTodos)
  useLocalStorage('work', workTodos, setWorkTodos)
  useLocalStorage('deleted', deletedTodos, setDeletedTodos)

  return (
    <div className="App mt-4">
      <CreateTodo create={createTodo}></CreateTodo>
      <Accordion className='mt-4' alwaysOpen>
          <TodoList 
            eventKey="0"
            todoList={productivityTodos}
            setTodos={setProductivityTodos}
            deletedTodos={deletedTodos}
            setDeletedTodos={setDeletedTodos}
          >
            Productivity
          </TodoList>
          <TodoList 
            eventKey="1"
            todoList={assignmentTodos} 
            setTodos={setAssignmentTodos}
            deletedTodos={deletedTodos}
            setDeletedTodos={setDeletedTodos}
          >
            Assignment
          </TodoList>
          <TodoList 
            eventKey="2"
            todoList={workTodos} 
            setTodos={setWorkTodos}
            deletedTodos={deletedTodos}
            setDeletedTodos={setDeletedTodos}
          >
            Work
          </TodoList>
      </Accordion>
    </div>
  );
}