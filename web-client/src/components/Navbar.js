import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = ()=> {
    return (
        <nav>
            <div className="nav-wrapper-white">
                <Link to="/" className="brand-logo left">Smoothies For All</Link>
                <ul id="nav-mobile" className="right">              
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Login">Login</Link></li>
                    <li><Link to="/Signup">Signup</Link></li>
                    <li><Link to="/Profile">Profile</Link></li>
                </ul>
            </div>
            
        </nav>
    )
};

export default NavBar