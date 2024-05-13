import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Routes, useNavigate , useLocation} from "react-router-dom";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import Login from "./components/screens/Login";
import CreatePost from "./components/screens/CreatePost";
import Saved from "./components/screens/Saved";
import Weekly from "./components/screens/Weekly";
import Search from "./components/screens/Search";
import NavBar from "./components/Navbar"; // Navbar
import "./App.css"; // CSS
import { initialState, reducer } from "./reducers/userReducer";
import UserProfile from "./components/screens/UserProfile";
import SubscribesUserPosts from "./components/screens/SubscribesUserPosts"
import {
  ShoppingListConsumer,
  ShoppingListProvider,
} from "./context/ShoppingList";
export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // If user data exists, dispatch the USER action to set the user state
      dispatch({ type: "USER", payload: user });
    } else {
      const noAuthRequirePaths = ['/login', '/signup'];
      if (!noAuthRequirePaths.includes(location.pathname)) {
      // If no user data, navigate to the login page
      navigate('/login');
    }
  }
  }, [dispatch, navigate, location.pathname]);

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
      <Route path="/myfollowerspost" element={<SubscribesUserPosts />} />

    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <ShoppingListProvider>
          <ShoppingListConsumer>
            {({ list, remove, open, setOpen, clear }) => (
              <>
                <NavBar />
                <Routing />
                {list && list.length > 0 && open && (
                  <div
                    className="card blue-grey darken-1"
                    style={{
                      position: "fixed",
                      bottom: "20px",
                      right: "20px",
                      width: "300px",
                      padding: "10px",
                    }}
                  >
                    <div className="card-title white-text center-align">
                      <span className="card-title">Shopping List</span>
                      <i className="material-icons right" onClick={()=>{
                        setOpen(false)
                      }}>minimize</i>
                    </div>
                    <div className="card-content white-text">
                      <ul className="collection">
                        {list.map((item, index) => (
                          <li
                            key={index}
                            className="collection-item blue-grey darken-3"
                          >
                            {item.name} - {item.quantity}
                            <button
                              onClick={() => remove(index)}
                              className="btn-floating btn-small waves-effect waves-light red right"
                            >
                              <i className="material-icons">remove</i>
                            </button>
                          </li>
                        ))}
                      </ul>
                        <button
                          className="btn waves-effect waves-light #64b5f6 blue darken-1"
                          onClick={() => clear()}
                        >
                          Clear Shopping List
                        </button>
                    </div>
                  </div>
                )}
                {list && list.length > 0 && !open && (
                  <div
                    className="card blue-grey darken-1"
                    style={{
                      position: "fixed",
                      bottom: "20px",
                      right: "20px",
                      width: "300px",
                      padding: "10px",
                    }}
                  >
                    <div className="card-title white-text center-align">
                      <span className="card-title">Shopping List</span>
                      <i className="material-icons right" onClick={()=>{
                        setOpen(true)
                      }}>maximize</i>
                    </div>
                  </div>
                )}
              </>
            )}
          </ShoppingListConsumer>
        </ShoppingListProvider>
      </BrowserRouter>
      ;
    </UserContext.Provider>
  );
}

export default App;
