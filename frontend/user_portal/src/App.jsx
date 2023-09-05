import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from "./pages/Home";
import { useSelector } from 'react-redux'
import Profile from './pages/Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ChangePassword from './pages/ChangePassword';


const App = () => {
  const { access_token } = useSelector(state => state.auth);
  return (
    <>
    <div className='root'>
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={!access_token ? <Login/> : <Profile/>}/>
          <Route path="/login" element= {<Login/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/userProfile" element={!access_token ? <h1>404 - Page not Found..!!</h1> : <Profile/>}/>
          <Route path="/changePassword" element={!access_token ? <h1>404 - Page not Found..!!</h1> : <ChangePassword/>}/>
        </Routes>  
      </Router>
    </div>
    </>
  )
}

export default App