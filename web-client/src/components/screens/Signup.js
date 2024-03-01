import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

const Signup = ()=>{
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const PostData = ()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }
            else{
                M.toast({html:data.message})
            }
        })
    }

    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2> Smoothies For All </h2>
                <input 
                    type="text" 
                    placeholder="username" 
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button class="btn waves-effect waves-light" onClick={()=>PostData()}>
                     Sign up 
                </button>
            </div>
            <div className='signup auth-card'>
                <h3>Already have any account? <Link to='/login'>Log in</Link></h3>
            </div>
        </div>
    )
}


export default Signup