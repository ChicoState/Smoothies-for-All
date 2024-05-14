import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import {
  likePost,
  makeComment,
  savePost,
  unlikePost,
  unsavePost,
} from "../../utils/postActions";
import "../../App.css";
import { useShoppingList } from "../../hooks/useShoppingList";

const Weekly = () => {
  // ** Hooks
  const { state, dispatch } = useContext(UserContext);
  const { add } = useShoppingList();

  // ** States
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch("/weeklyPost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPost(result.weeklyPost);
      });
  }, []);

  return (
    <div className="home">
      {post && (
        <div className="card home-card" key={post._id}>
          <h5>{post.postedBy.username} </h5>
          <div className="card-image">
            <img src={post.photo} />
          </div>
          <div className="card-content">
            {post.likes.includes(state._id) ? (
              <i
                class="material-icons"
                style={{ color: "red" }}
                onClick={() => {
                  unlikePost(post._id).then(() => {
                    setPost({
                      ...post,
                      likes: post.likes.filter((id) => id !== state._id),
                    });
                  });
                }}
              >
                favorite
              </i>
            ) : (
              <i
                class="material-icons"
                onClick={() => {
                  likePost(post._id).then(() => {
                    setPost({
                      ...post,
                      likes: [...post.likes, state._id],
                    });
                  });
                }}
              >
                favorite_border
              </i>
            )}

            {state.saved.includes(post._id) ? (
              <i
                class="material-icons"
                onClick={() => {
                  unsavePost(post._id).then((result) => {
                    console.log(result);
                    dispatch({ type: "USER", payload: result });
                  });
                }}
              >
                bookmark
              </i>
            ) : (
              <i
                class="material-icons"
                onClick={() => {
                  savePost(post._id).then((result) => {
                    console.log(result);
                    dispatch({ type: "USER", payload: result });
                  });
                }}
              >
                bookmark_border
              </i>
            )}

            <h6>{post.likes.length} Likes</h6>
            <h6>{post.title}</h6>
            <p>{post.body}</p>

            <div className="listed_tags_container">
              {post.tags.map((tag) => {
                return <li className="listed_tags">{tag.text}</li>;
              })}
            </div>
            <details>
              <summary>Ingredients ({post.ingredients.length})</summary>
              {post.ingredients.map((record) => {
                return <li> {record.text} </li>;
              })}
              {post.ingredients.length > 0 && (
                <button
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  style={{ margin: "10px 0px" }}
                  onClick={() =>
                    add(post.ingredients.map((ingredient) => ingredient.text))
                  }
                >
                  Add to Shopping List
                </button>
              )}
            </details>
            <details>
              <summary>Comments ({post.comments.length})</summary>
              {post.comments.map((record) => {
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
                makeComment(e.target[0].value, post._id).then((result) => {
                  console.log(result);
                  setPost(result);
                  e.target[0].value = "";
                });
              }}
            >
              <input type="text" placeholder="Add comment" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weekly;
