import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { deletePost, likePost, makeComment, savePost, unlikePost, unsavePost } from "../../utils/postActions";
import "../../App.css";
import { useShoppingList } from "../../hooks/useShoppingList";
import { Link } from 'react-router-dom';
import NavBar from '../Navbar';
const Home = () => {
  const [data, setData] = useState([]);

  const { state, dispatch } = useContext(UserContext);
  const {add} = useShoppingList();

  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const likePost = (id)=>{
    fetch('/like', {
        method:"put",
        headers:{
            'Content-Type':"application/json",
            'Authorization':"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id,
        })
    })
    .then(res=>{
        if (res.ok) {
            return res.json();
        } else {
            console.error("Error response:", res);
        }
    })
    .then(result=>{
        //console.log(result)
        const newData = data.map(item=>{
            
<<<<<<< HEAD
            localStorage.setItem("user", JSON.stringify(result))
            dispatch({type:"USER", payload:result})

        })
    }

    const makeComment = (text,postId) => {
        fetch('/comment', {
            method:"put",
            headers:{
                'Content-Type':"application/json",
                'Authorization':"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                console.log(item)
                if(item._id==result._id) {
                    return result
                } else {
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    
const deletePost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>{
            if (res.ok) {
                return res.json();
            } else {
                console.error("Error response:", res);
            }
        })
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
    return(
        <div className='home'>
            {
                data.map(item =>{
                    return (
                        <div className='card home-card' key={item._id}>
                           <h5>{item.postedBy.username} {item.postedBy._id == state._id 
                           && 
                           <i className='material-icons' style={{
                            float: "right"
                           }}
                           onClick={()=> deletePost(item._id)}
                           > delete </i> }</h5>
                           <div className='card-image'>
                               <img src={item.photo}/>
                           </div>
                           <div className='card-content'>
                            
                            {console.log(state)}
                            {item.likes.includes(state._id)
                            ?   <i class="material-icons" style={{color:'red'}}
                                onClick={()=>{unlikePost(item._id)}}
                                >favorite</i>
                            :
                                <i class="material-icons"
                                onClick={()=>{likePost(item._id)}}
                                >favorite_border</i>
                            }
                            
                            {state.saved.includes(item._id)
                            ?   <i class="material-icons"
                                onClick={()=>{unsavePost(item._id)}}
                                >bookmark</i>
                            :
                                <i class="material-icons"
                                onClick={()=>{savePost(item._id)}}
                                >bookmark_border</i>
                            }

                            

                            <h6>{item.likes.length} Likes</h6>  
                            <h6>{item.title}</h6>          
                            <p>{item.body}</p>
                            {
                                item.comments.map(record=>{
                                    return(
                                        <h6 key={record._id}>
                                            <span style = {{fontWeight:"500"}}>{record.postedBy.username}
                                            </span> {record.text}
                                        </h6>
                                    )
                                })
                            }
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                makeComment(e.target[0].value, item._id)
                            }}>
                                <input type="text" placeholder='Add comment'/>                                
                            </form>

                           </div>
                       </div>
                   )
                   
                })
=======
            console.log(item)
            if(item._id==result._id) {
                return result
            } else {
                return item
>>>>>>> sidenav
            }
        })
        setData(newData)
    })
}


const unlikePost = (id)=>{
    fetch('/unlike', {
        method:"put",
        headers:{
            'Content-Type':"application/json",
            'Authorization':"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    })
    .then(res=>{
        if (res.ok) {
            return res.json();
        } else {
            console.error("Error response:", res);
        }
    })
    .then(result=>{
        const newData = data.map(item=>{
            if(item._id==result._id) {
                return result
            } else {
                return item
            }
        })
        setData(newData)
    }).catch(err => {console.log(err)})
}


  return (
    <div>
      <NavBar />
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>
              {/* Click on user name to view profile */}
              <Link to={`/profile/${item.postedBy._id}`} style={{ color: 'blue', textDecoration: 'none' }}>
              {item.postedBy.username}{" "}
              </Link>
              {item.postedBy._id === state._id && (
                <i
                  className="material-icons"
                  style={{
                    float: "right",
                  }}
                  onClick={() => deletePost(item._id).then(() => {
                    const newData = data.filter((post) => {
                      return post._id !== item._id;
                    });
                    setData(newData);
                    unsavePost(item._id).then((result) => {
                      console.log(result)
                      dispatch({ type: "USER", payload: result });
                  })
                  })}
                >
                  {" "}
                  delete{" "}
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} />
            </div>

            <div className="card-content">
            {item.likes.includes(state._id)
            ?   <i class="material-icons" style={{color:'red'}}
                onClick={()=>{unlikePost(item._id)}}
                >favorite</i>
            :
                <i class="material-icons"
                onClick={()=>{likePost(item._id)}}
                >favorite_border</i>
            }


              {state.saved.includes(item._id) ? (
                <i
                  class="material-icons"
                  onClick={() => {
                    unsavePost(item._id).then((result) => {
                        dispatch({ type: "USER", payload: result });
                    })
                  }}
                >
                  bookmark
                </i>
              ) : (
                <i
                  class="material-icons"
                  onClick={() => {
                    savePost(item._id).then((result) => {
                        console.log(result)
                        dispatch({ type: "USER", payload: result });
                    });
                  }}
                >
                  bookmark_border
                </i>
              )}

              <h6>{item.likes.length} Likes</h6>
              <h6>{item.title}</h6>
              <p className="body_style">{item.body}</p>

              <div className="listed_tags_container">
                {item.tags.map((tag) => {
                  return <li className="listed_tags">{tag.text}</li>;
                })}
              </div>
              <details>
                <summary>Ingredients ({item.ingredients.length})</summary>
                {item.ingredients.map((record) => {
                  return <li> {record.text} </li>;
                })}
                {item.ingredients.length > 0 && (
                  <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    style={{ margin: "10px 0px" }}
                    onClick={() => {
                      add(item.ingredients.map((ingredient) => ingredient.text));
                    }}
                  >
                    Add to Shopping List
                  </button>
                )}
              </details>
              <details>
                <summary>Comments ({item.comments.length})</summary>
                {item.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: "500" }}>
                        {record.postedBy.username}
                      </span>{" "}
                      {record.text}
                    </h6>
                  );
                })}
              </details>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id).then((result) => {
                    console.log(result);
                    const newData = data.map((post) => {
                        if (post._id === result._id) {
                          return result;
                        } else {
                          return item;
                        }
                      });
                      setData(newData);
                    });
                    e.target[0].value = "";
                }}
              >
                <input type="text" placeholder="Add comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Home;
