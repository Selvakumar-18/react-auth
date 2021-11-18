import React, {useRef, useState} from 'react'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import {useAuth} from '../Contexts/AuthContext'
import {Link,useNavigate} from "react-router-dom"

export default function UpdateProfile() 
{
  const nameRef=useRef()
  const emailRef=useRef();
  const passwordRef=useRef();
  const passwordConfirmRef=useRef();
  const addressRef=useRef();
  const phoneNumberRef=useRef();
  const {currentUser,updatePassword,updateEmail}=useAuth()
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const Navigate =useNavigate();

function handleSubmit(e){
    e.preventDefault()
    if(passwordRef.current.value!==passwordConfirmRef.current.value){
      return setError("Password not match")
    }
    const promises=[]
    setLoading(true)
    setError("")
      if(emailRef.current.value!==currentUser.email)
      {
        promises.push(updateEmail(emailRef.current.value))
      }
      if(passwordRef.current.value){
        promises.push(updatePassword(passwordRef.current.value))
      }

      Promise.all(promises)
      .then(()=>{
        Navigate("/")
      })
      .catch(()=>{
        setError("failed to update account")
      })
      .finally(()=>{
        setLoading(false)
      })
    }
return (
    <div>
     <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
        <Form.Group id="name">
            <Form.Label>Name</Form.Label>
              <Form.Control type="name" ref={nameRef} required 
              defaultValue={currentUser.name}
              />
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required
              defaultValue={currentUser.email}/>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required
              placeholder="keep the same"/>
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirm</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required
              placeholder="keep the same"/>
          </Form.Group>
          <Form.Group id="address">
            <Form.Label>Address</Form.Label>
              <Form.Control type="address" ref={addressRef} required
              defaultValue={currentUser.address}/>
          </Form.Group>
          <Form.Group id="phone-number">
            <Form.Label>Phone Number</Form.Label>
              <Form.Control type="phone-numebr" ref={phoneNumberRef} required
              defaultValue={currentUser.phoneNumber}/>
          </Form.Group>
          <Button  disabled={loading} className="w-100" type="submit"> Update</Button>
        </Form>
      </Card.Body>
     </Card>
      <div className="w-100 text-center mt-2">
         <Link to="/">cancel</Link>
      </div>
    </div>
  )
}
