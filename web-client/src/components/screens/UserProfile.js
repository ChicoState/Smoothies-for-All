import React, {useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App' 
import {useParams} from 'react-router-dom'
import NavBar from '../Navbar';


const UserProfile = () => {
    const [userProfile, setProfile] = useState(null);
    const { state, dispatch } = useContext(UserContext);
    const { userid } = useParams();
    // Show
    //const [showFollow, setShowFollow] = useState(true);
    const [showFollow, setShowFollow] = useState(state?!state.following.includes(userid):true);
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            setProfile(result);
        });
    }, [])

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }
    return(
        <>
        <NavBar />
        {userProfile ? 
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
        <div style={{display:"flex", justifyContent:"space-around",margin:"18px 0px", borderBottom:"1px solid grey"}}>
            <div>
                <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                src={userProfile.user.pic}
                //src='https://images.unsplash.com/photo-1682686581220-689c34afb6ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                />
            </div>
            <div>
                <h4> {userProfile.user.name} </h4>
                <h5>{userProfile.user.email} </h5>
                <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                    <h6>{userProfile.posts.length}</h6>
                    <h6>{userProfile.user.followers.length} Followers</h6>
                    <h6>{userProfile.user.following.length} Following</h6>
                </div>
                {showFollow?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>unfollowUser()}
                    >
                        UnFollow
                    </button>
                    }
            </div>
        </div>
        

        <div className='gallery'>
            {
            userProfile.posts.map(item => {
            // Make sure `item._id` is a unique identifier for each item
            return (
                <img key={item._id} className='item' src={item.photo} alt={item.title}/>
            )
            })

            }

        </div>
    </div>
        
    : <h2>loading .. !</h2>}
    </>
)}


export default UserProfile;