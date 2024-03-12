import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import CreatePost from './components/screens/CreatePost';
import Saved from './components/screens/Saved';
import NavBar from './components/Navbar'; // Navbar
import "./App.css"; // CSS


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar /> {/* Nav bar */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
