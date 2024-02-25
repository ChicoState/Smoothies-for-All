import React from 'react'

const Signup = ()=>{
    return(
        <div className='card'>
            <div className="card auth">
                <input type="text" placeholder='Email'/>
                <input type="text" placeholder='Username'/>
                <input type="text" placeholder='Password'/>
                <button>Sign Up</button>
            </div>
        </div>
    )
}


export default Signup