import React, {useState, useContext, useEffect} from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { AuthContext, AuthContextType } from '../context/AuthContext';
import '../App.css';

interface IAuth {
  username: string,
  password: string
}

export default function LoginPage() {

  const [error, setError] = useState<boolean>(false)
  const [authData, setAuthData] = useState<IAuth>({
    username: '',
    password: ''
  }) 
  
  
  const {isAuth, setIsAuth} = useContext(AuthContext) as AuthContextType;
  
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(authData.username === 'admin' && authData.password === '1234') {
      setError(false)
      setIsAuth(true)
      localStorage.setItem('isAuth' , 'true')
    } else {
      setError(true)
    }
  }
  
  return (
    <div>
      <Form onSubmit={login} className="login-form bg-dark">
        <Container className='login-form-container'>
        <h1 className='text-light text-center mb-3'>Welcome to todo app!</h1>
          <Form.Group className="mb-3 text-light" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter username" 
              value={authData.username} 
              onChange={(e) => setAuthData({...authData, username: e.target.value})}/>
          </Form.Group>

          <Form.Group className="text-light" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={authData.password} 
              onChange={(e) => setAuthData({...authData, password: e.target.value})} />
          </Form.Group>
          {error && <div className="form-validation">Incorrect username or password</div>}
          <Button className='mt-3' variant="light" type="submit">
            Submit
          </Button>
        </Container>
      </Form>
    </div>
  )
}