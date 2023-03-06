import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import DeletedTasks from './pages/DeletedTasks';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DeletedContext } from './context/DeletedListContext';
import { AuthContext } from './context/AuthContext';
import { ITodo } from "./interfaces/ITodo";
import { ProductivityTodosContext } from './context/ProductivityTodosContext';
import { AssignmentTodosContext } from './context/AssignmentTodosContext';
import { WorkTodosContext } from './context/WorkTodosContext';

export default function App() {
  
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [productivityTodos, setProductivityTodos] = useState<ITodo[]>([]);
  const [assignmentTodos, setAssignmentTodos] = useState<ITodo[]>([]);
  const [workTodos, setWorkTodos] = useState<ITodo[]>([]);
  const [deletedTodos, setDeletedTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    setIsAuth(JSON.parse(localStorage.getItem('isAuth')!))
  }, [])
  

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <ProductivityTodosContext.Provider value={{
        productivityTodos,
        setProductivityTodos
      }}>
        <AssignmentTodosContext.Provider value={{
          assignmentTodos,
          setAssignmentTodos
        }}>
          <WorkTodosContext.Provider value={{
            workTodos,
            setWorkTodos
          }}>
            <DeletedContext.Provider value={{
              deletedTodos,
              setDeletedTodos
            }}>
              <BrowserRouter>
              {isAuth ?
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />}></Route>
                    <Route path="deleted" element={<DeletedTasks />}></Route>
                  </Route>
                  <Route path="*" element={<Navigate to="/" replace />}></Route>
                </Routes>
              :
              <Routes>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route 
                    path="*"
                    element={<Navigate to="/login" replace />}></Route>
                </Routes>
              }
              </BrowserRouter>
            </DeletedContext.Provider>
          </WorkTodosContext.Provider>
        </AssignmentTodosContext.Provider>
      </ProductivityTodosContext.Provider>
    </AuthContext.Provider>
)}