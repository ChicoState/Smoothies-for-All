import React from 'react'
import { Link } from 'react-router-dom'

const SideNavbar = ()=> {
    return (
        <nav className="side-nav">
            <div className='side-content'>
            <Link to="/" className="material-icons" style={{ fontSize: '50px' }}>home</Link>
            <Link to="/" className="material-icons" style={{ fontSize: '50px' }}>bookmark</Link>
            </div>
        </nav>
    );
}

export default SideNavbar