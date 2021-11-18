import React from "react";
import Signup from "./Signup";
import {Container} from 'react-bootstrap';
import {AuthProvider} from '../contexts/AuthContext';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile  from "./UpdateProfile";


function App(){
  return (
    <Container className="d-flex align-items-center"
    style={{minHeight:"100vh"}}>
    <div className="w-100" style={{maxwidth:"400px"}}>
      <Router>
        <AuthProvider>
           <PrivateRoute exact path="/" component={Dashboard}/>
           <PrivateRoute path="/update-profile" component={UpdateProfile}/>
           <Route path="/signup" component={Signup}/>
           <Route path="/login" component={Login}/>
           <Route path="/forgot-password" component={ForgotPassword}/>
        </AuthProvider>
      </Router>
    </div>
    </Container>
  )
}
export default App;