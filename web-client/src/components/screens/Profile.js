import React, {useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App' 

const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image, setImage] = useState("")
    console.log(state)
    useEffect(() =>{
        fetch('/mypost', {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost);
        })
    },[])
    useEffect(()=>{
        if(image) {
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
                localStorage.setItem("user", JSON.stringify({...state,pic:data.url}))
                dispatch({type:"UPDATEPIC", payload:data.url})
                fetch('updatepic', {
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": "Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }, [image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
    return(
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{margin:"18px 0px", borderBottom:"1px solid grey"}}>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                    src={state?state.pic:"loading"}
                    //src='https://images.unsplash.com/photo-1682686581220-689c34afb6ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    />
                </div>
                <div>
                    <h4> {state?state.username:"loading"} </h4>
                    <h5> {state?state.email:"loading"}</h5>
                    
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>{mypics.length} Posts</h6>
                    {/* There is a bug here */}
                        <h6>{state?.followers?.length ?? "0"} Followers</h6>
                        <h6>{state?.following?.length ?? "0"} Following</h6>
                    </div>
                </div>

            </div>
                <div className="file-field input-field" style={{margin:"10px"}}>
                <div className="btn">
                    <span>Update pic</span>
                    <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
                </div>
            <div className='gallery'>
                {
                    mypics.map(item => {
                    // Make sure `item._id` is a unique identifier for each item
                    return (
                    <img key={item._id} className='item' src={item.photo} alt={item.title}/>
                    )
                    })
  
                }

            </div>
        </div>
    )
}


export default Profile