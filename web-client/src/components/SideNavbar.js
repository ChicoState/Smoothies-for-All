import React from 'react'
import { Link } from 'react-router-dom'

const SideNavbar = ()=> {
    return (
        <nav className="side-nav">
            <div className='side-content'>
            <i className="material-icons" style={{ fontSize: '50px' }}>home</i>
            <i className="material-icons" style={{ fontSize: '50px' }}>bookmark</i>
            </div>
        </nav>
    );
}

export default SideNavbar