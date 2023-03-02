import React, { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import DeletedTasks from './pages/DeletedTasks';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DeletedContext } from './context/DeletedListContext';
import { AuthContext } from './context/AuthContext';

interface Itodo {
  id: number,
  chapter: string,
  title: string,
  completed: boolean,
  priorityCode: number,
  cachedPriorityCode: number
}

export default function App() {

  const [deletedTodos, setDeletedTodos] = useState<Itodo[]>([]);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    setIsAuth(JSON.parse(localStorage.getItem('isAuth')!))
  }, [])
  

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
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
    </AuthContext.Provider>
)}