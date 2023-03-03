import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';

export default function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='main bg-dark'>
        <Container className='mb-5'>
          <Outlet />
        </Container>
      </main>
      <footer className='footer bg-dark'>
        <Container className=''>
          <p>Anton Skrebkov - 2023</p>
        </Container>
      </footer>
    </>
  )
}
