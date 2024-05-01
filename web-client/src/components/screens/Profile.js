import React, {useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App' 

const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
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
    return(
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{display:"flex", justifyContent:"space-around",margin:"18px 0px", borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                    src='https://images.unsplash.com/photo-1682686581220-689c34afb6ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    />
                </div>
                <div>
                    <h4> {state?state.username:"loading"} </h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>50 post</h6>
                        <h6>50 followers</h6>
                        <h6>500 following</h6>
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