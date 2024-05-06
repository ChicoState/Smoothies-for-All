import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import Search from './components/screens/Search';
import Weekly from './components/screens/Weekly';
import NavBar from './components/Navbar'; // Navbar
import './App.css'; // CSS
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBar /> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/search' element={<Search />} />
          <Route path='/weekly' element={<Weekly />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
