import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <div className='nav-wrapper white'>
        <Link to='/' className='brand-logo center'>
          Smoothies For All
        </Link>
        <ul id='nav-mobile' className='right'>
          <li>
            <Link to='/search'>Search</Link>
          </li>
          <li>
            <Link to='/weekly'>Weekly</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
