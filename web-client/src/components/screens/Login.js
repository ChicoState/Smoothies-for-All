import React,{useState} from 'react'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Login = () =>{
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const PostData = ()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }
            else{
                M.toast({html:data.message})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="mycard">
            <div className ="card auth-card">
                <h2> Smoothies For All </h2>
                <input 
                    type="text" 
                    placeholder="username" 
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light" onClick={()=>PostData()}>
                     Login 
                </button>
            </div>
            <div className='signup auth-card'>
                <h3>Don't have an account? <Link to='/signup'>Sign Up</Link></h3>
            </div>
                
            </div>
    );
};


export default Login