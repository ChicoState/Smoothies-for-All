import React from 'react'
import { Link } from 'react-router-dom'

const Signup = ()=>{
    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2> Smoothies For All </h2>
                <input type="text" placeholder="name"/>
                <input type="text" placeholder="email"/>
                <input type="text" placeholder="password"/>
                <button class="btn waves-effect waves-light"> Sign up </button>
            </div>
            <div className='signup auth-card'>
                <h3>Already have any account? <Link to='/login'>Log in</Link></h3>
            </div>
        </div>
    )
}


export default Signup