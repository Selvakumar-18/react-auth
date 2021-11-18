import React, {useRef, useState} from 'react'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import {useAuth} from '../Contexts/AuthContext'
import {Link,useNavigate} from "react-router-dom"

export default function Signup() 
{
  const nameRef=useRef()
  const emailRef=useRef();
  const passwordRef=useRef();
  const passwordConfirmRef=useRef();
  const addressRef=useRef();
  const phoneNumberRef=useRef();
  const {signup} =useAuth();
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const Navigate =useNavigate();

  async function handleSubmit(e){
    e.preventDefault()
    if(passwordRef.current.value!==passwordConfirmRef.current.value){
      return setError("Password not match")
    }
      try{
        setError("")
        setLoading(true)
        await signup(emailRef.current.value,passwordRef.current.value)
        Navigate("/")
      }
      catch{
        setError("failed to create account")
      }
    setLoading(false)
  }

return (
    <div>
     <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
        <Form.Group id="name">
            <Form.Label>Name</Form.Label>
              <Form.Control type="name" ref={nameRef} required/>
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required/>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required/>
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirm</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required/>
          </Form.Group>
          <Form.Group id="address">
            <Form.Label>Address</Form.Label>
              <Form.Control type="address" ref={addressRef} required/>
          </Form.Group>
          <Form.Group id="phone-number">
            <Form.Label>Phone Number</Form.Label>
              <Form.Control type="phone-numebr" ref={phoneNumberRef} required/>
          </Form.Group>
          <Button  disabled={loading} className="w-100" type="submit">Sign Up</Button>
        </Form>
      </Card.Body>
     </Card>
      <div className="w-100 text-center mt-2">
         Already have an account? <Link to="/login">Log In
      </Link></div>
    </div>
  )
}
