import React, { useContext, useState } from 'react'
import logo from './img/logo.png'
import './NavBar.css'
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { AuthContext, AuthContextType } from '../../context/AuthContext';


interface Ilink {
  name: string,
  to: string
}

export default function NavBar() {

  const routes: Ilink[] = [
    { name: "Main Tasks", to: "/" },
    { name: "Deleted Tasks", to: "/deleted" },
  ];

  const {isAuth, setIsAuth} = useContext(AuthContext) as AuthContextType;

  const logout = () => {
    setIsAuth(false)
    localStorage.setItem('isAuth' , 'false')
  }

  return (
    <Navbar className="navbar" bg="dark" variant='dark' expand="sm">
      <Container>
      <Navbar.Brand className="brand" href="#home">
          <NavLink
            key="Main Page"
            to="/"
          >
            <img src={logo} className="logo" alt="" />
        </NavLink>
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {routes.map((link: Ilink) => {
                return(
                  <NavLink
                    key={link.name}
                    to={link.to}
                    className="link"
                  >
                    {link.name}
                  </NavLink>
                )
              })}
          </Nav>
            <Button 
              variant='none'
              className="link ms-auto"
              onClick={logout}
            >
              Logout
            </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
