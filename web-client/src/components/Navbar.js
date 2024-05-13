import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';
import './Sidebar.css';

const NavBar = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { coverTrigger: false });
    }, []);

    return (
        <div className="sidebar">
            <Link to="/" className="brand-logo">Smoothies For All</Link>
            <ul className="nav-links">
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/create">CreatePost</Link></li>
                <li><Link to="/saved">Saved</Link></li>
                <li><Link to="/myfollowerspost">Following Posts</Link></li>
            </ul>
            <div className="logout-section">
                <button onClick={() => {
                    localStorage.clear();
                    dispatch({type: "CLEAR"});
                    navigate('/login');
                }}>LOGOUT</button>
            </div>
        </div>
    );
}

export default NavBar;

