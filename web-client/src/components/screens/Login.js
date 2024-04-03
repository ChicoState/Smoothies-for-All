import React,{useState,useContext} from 'react'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Login = () =>{
    const {state,dispatch} = useContext(UserContext)
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

                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                data.message ? M.toast({ html: data.message }) : console.error("No message received from the server");
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
                    type="password"
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