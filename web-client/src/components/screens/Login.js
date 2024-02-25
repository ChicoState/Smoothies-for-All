import React from 'react'

const Login = ()=>{
    return(
        <div className='card'>
            <div className="card auth">
                <input type="text" placeholder='Email'/>
                <input type="text" placeholder='Password'/>
                <button>Login</button>
            </div>
        </div>
    )
}


export default Login