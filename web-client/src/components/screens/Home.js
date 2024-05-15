import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../../App";
import { deletePost, likePost, makeComment, savePost, unlikePost, unsavePost } from "../../utils/postActions";
import "../../App.css";
import { useShoppingList } from "../../hooks/useShoppingList";
import NavBar from '../Navbar';

const Home = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    const { add } = useShoppingList();

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

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id,
            })
        })
        .then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result;
                } else {
                    return item;
                }
            });
            setData(newData);
        })
        .catch(err => console.log(err));
    };

    const makeCommentHandler = (text, postId) => {
        fetch('/comment', {
            method: "put",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        })
        .then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result;
                } else {
                    return item;
                }
            });
            setData(newData);
        })
        .catch(err => console.log(err));
    };

    const deletePostHandler = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(result => {
            const newData = data.filter(item => item._id !== result._id);
            setData(newData);
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <NavBar />
            <div className="home">
                {data.map(item => (
                    <div className="card home-card" key={item._id}>
                        <h5>
                            <Link to={`/profile/${item.postedBy._id}`} style={{ color: 'blue', textDecoration: 'none' }}>
                                {item.postedBy.username}
                            </Link>
                            {item.postedBy._id === state._id && (
                                <i className="material-icons" style={{ float: "right" }} onClick={() => deletePostHandler(item._id)}>delete</i>
                            )}
                        </h5>
                        <div className="card-image">
                            <img src={item.photo} alt="Post" />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{ color: item.likes.includes(state._id) ? 'red' : 'grey' }} onClick={() => { item.likes.includes(state._id) ? unlikePost(item._id) : likePost(item._id); }}>
                                favorite
                            </i>
                            <i className="material-icons" onClick={() => { state.saved.includes(item._id) ? unsavePost(item._id) : savePost(item._id); }}>
                                bookmark
                            </i>
                            <h6>{item.likes.length} Likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {item.comments.map(record => (
                                <h6 key={record._id}>
                                    <span style={{ fontWeight: "500" }}>{record.postedBy.username}</span> {record.text}
                                </h6>
                            ))}
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                makeCommentHandler(e.target[0].value, item._id);
                                e.target[0].value = ""; // clear the input after submitting
                            }}>
                                <input type="text" placeholder="Add comment" />
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
