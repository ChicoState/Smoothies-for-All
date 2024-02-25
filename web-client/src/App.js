import{useState} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import "./App.css"
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import Login from './components/screens/Login'
import NavBar from './components/Navbar';

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
