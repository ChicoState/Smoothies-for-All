import React from 'react'
import { Link } from 'react-router-dom'

const Login = () =>{
    return(
        <div className="mycard">
            <div className ="card auth-card">
                <h2> Smoothies For All </h2>
                <input type="text" placeholder="email"/>
                <input type="text" placeholder="password"/>
                <button className="btn waves-effect waves-light"> Login </button>
            </div>
            <div className='signup auth-card'>
                <h3>Don't have an account? <Link to='/signup'>Sign Up</Link></h3>
            </div>
                
            </div>
    );
};


export default Login