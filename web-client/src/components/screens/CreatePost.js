import React,{useState, useEffect} from "react";
import M from 'materialize-css';
import {useNavigate} from 'react-router-dom';


const CreatePost = ()=>{
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if (url) {
            fetch('/create',{
                method:"post",
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':"Bearer "+localStorage.getItem("jwt")
                },
    
                body:JSON.stringify({
                    title,
                    body,
                    photo:url
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    // Handle error response here
                    console.error("Error response:", res);
                }
            })
            .then(data=>{
                if(data.error){
                    M.toast({html:data.error})
                }
                else{
                    data.message ? M.toast({ html: data.message }) : console.error("No message received from the server");

                    navigate('/')
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    
    }, [url])
    
    const postDetails = ()=> {
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

        //fetching data from our backend


    }

    return(
        <div className="card input-filed"
        style={{
            margin: "10px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}
        >
            <input
                type="text"
                placeholder="title" 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            <input 
                type="text"
                placeholder="body"   
                value={body}
                onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light" 
                    onClick={()=>postDetails()}
            >
                    CreatePost
            </button>
        </div>
    )
}

export default CreatePost