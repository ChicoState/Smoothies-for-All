import React,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const NavBar = ()=> {
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const renderList = () =>{
        if(state) {
            return [
                <li key = "profile"><Link to="/profile">Profile</Link></li>,
                 <li key = "create"><Link to="/create">CreatePost</Link></li>,
                 <li key = "saved"><Link to="/saved">Saved</Link></li>,
                 <li key = "logout">
                    <button className='btn' onClick={()=>{
                    localStorage.clear() 
                    dispatch({type:"CLEAR"})
                    navigate('/login')
                    }}
                    >Logout</button>
                 </li>
            ]
        } else {
            return [
                <li key = "login"><Link to="/login">Login</Link></li>,
                <li key = "signup"><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to="/" className="brand-logo left">Smoothies For All</Link>
                <ul id="nav-mobile" className="right"> 
                   {renderList()}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar