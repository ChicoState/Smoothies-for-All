import React,{useEffect, createContext,useReducer,useContext} from 'react';
import { BrowserRouter, Route, Routes, useNavigate  } from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import CreatePost from './components/screens/CreatePost';
import Saved from './components/screens/Saved';
import Weekly from './components/screens/Weekly';
import Search from './components/screens/Search';
import NavBar from './components/Navbar'; // Navbar
import "./App.css"; // CSS
import  {intitalState, reducer} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // If user data exists, dispatch the USER action to set the user state
      dispatch({ type: "USER", payload: user });
    } else {
      // If no user data, navigate to the login page
      navigate('/login');
    }
  }, [dispatch, navigate,]);

  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/weekly" element={<Weekly />} />
      <Route path="/search" element={<Search />} />
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
