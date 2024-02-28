import React from 'react'

const Home = ()=>{
    return(
        <div className='home'>
            <div className='card home-card'>
                <h5>Username</h5>
                <div className='card-image'>
                    <img src='https://plus.unsplash.com/premium_photo-1681826664053-5f50e4a0c513?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c21vb3RoaWVzfGVufDB8fDB8fHww'/>
                </div>
                <div className='card-content'>
                <i class="material-icons">favorite_border</i>
                <i class="material-icons">bookmark_border</i>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <h6>Username</h6> 
                        <h6>MM/DD/YYYY</h6>
                        
                    </div>              
                    <p>This is the caption...</p>
                    <input type="text" placeholder='Add comment'/>
                </div>
            </div>
        </div>

    )
}


export default Home