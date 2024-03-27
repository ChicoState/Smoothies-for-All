import React,{useState,useEffect} from 'react'

const Home = ()=>{
    const [data, setData] = useState([])
    useEffect(()=> {
        fetch('/allposts', {
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])
    return(
        <div className='home'>
            {
                data.map(item=>{
                    return(
                        <div className='card home-card' key={item._id}>
                           <h5>{item.postedBy.username}</h5>
                           <div className='card-image'>
                               <img src={item.photo}/>
                           </div>
                           <div className='card-content'>
                           <i class="material-icons">favorite_border</i>
                           <i class="material-icons">bookmark_border</i>
                               
                               <h6>{item.title}</h6>          
                               <p>{item.body}</p>
                               <input type="text" placeholder='Add comment'/>
                           </div>
                       </div>
                   )
                })
            }
           
        </div>

    )
}


export default Home