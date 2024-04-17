import React, {useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App' 
import {useParams} from 'react-router-dom'

// sadmin id "660da69d65a0a8b1f3382829"

const UserProfile = () => {
    const [userProfile, setProfile] = useState(null);
    const { state, dispatch } = useContext(UserContext);
    const { userid } = useParams();
    
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
    return(
        <>
        {userProfile ? 
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
        <div style={{display:"flex", justifyContent:"space-around",margin:"18px 0px", borderBottom:"1px solid grey"}}>
            <div>
                <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                src='https://images.unsplash.com/photo-1682686581220-689c34afb6ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                />
            </div>
            <div>
                <h4> {userProfile.user.name} </h4>
                <h5>{userProfile.user.email} </h5>
                <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                    <h6>{userProfile.posts.length} post</h6>
                    <h6>50 followers</h6>
                    <h6>500 following</h6>
                </div>
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