import React,{useEffect, useState} from 'react'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import M from 'materialize-css'


const Signup = ()=>{
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadField()
        }
    },[url])

    const uploadField = ()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                email,
                password,
                pic:url
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error})
            }
            else{
                M.toast({html:data.message})
                navigate('/Login')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset", "smoothiesforall")
        data.append("cloud_name", "dnu53vuwj")
        fetch("https://api.cloudinary.com/v1_1/dnu53vuwj/image/upload", {
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then (data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const PostData = ()=>{
        if(image){
            uploadPic()
        } else {
        uploadField()
    }
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
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload pic</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
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