import React from 'react'

const Profile = ()=>{
    return(
        <div>
            <div style={{display:"flex", justifyContent:"space-around",margin:"18px 0px", borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                    src='https://images.unsplash.com/photo-1698358792121-407062f81a49?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    />
                </div>
                <div>
                    <h4> Steven Thao</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>50 post</h6>
                        <h6>50 followers</h6>
                        <h6>500 following</h6>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Profile