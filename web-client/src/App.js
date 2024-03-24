import React,{useEffect, createContext,useReducer,useContext} from 'react';
import { BrowserRouter, Route, Routes, useNavigate  } from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import CreatePost from './components/screens/CreatePost';
import Saved from './components/screens/Saved';
import NavBar from './components/Navbar'; // Navbar
import "./App.css"; // CSS
import  {intitalState, reducer} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext);

  useEffect(()=>{
  // const user = JSON.parse(localStorage.getItem("user"))
  //   if(user) {
  //     dispatch({type:"USER", payload:user})
  //     navigate.push('/')
  //   } else{
  //     navigate.push('/lsogin')
  //   }
  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      //console.log(user)
      if(user) {
        dispatch({type:"USER", payload:user})
        navigate('/')
      } 
    } catch (error) {
      navigate('/login')
    }
  }

  },[])
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/saved" element={<Saved />} />
    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,intitalState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar /> {/* Nav bar */}
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
      
  );
}

export default App;
