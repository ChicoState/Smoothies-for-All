import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { deletePost, likePost, makeComment, savePost, unlikePost, unsavePost } from "../../utils/postActions";
import "../../App.css";
import { useShoppingList } from "../../hooks/useShoppingList";
import { Link } from 'react-router-dom';
const Home = () => {
  const [data, setData] = useState([]);

  const { state, dispatch } = useContext(UserContext);
  const {add} = useShoppingList();

  useEffect(() => {
    fetch("/getsubpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  return (
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
              {item.likes.includes(state._id) ? (
                <i
                  class="material-icons"
                  style={{ color: "red" }}
                  onClick={() => {
                    unlikePost(item._id).then(() => {
                        const newData = data.map((post) => {
                            if (item._id === post._id) {
                              return {
                                ...post,
                                likes: post.likes.filter((id) => id !== state._id),
                              };
                            } else {
                              return item;
                            }
                          });
                        setData(newData);
                        });
                  }}
                >
                  favorite
                </i>
              ) : (
                <i
                  class="material-icons"
                  onClick={() => {
                    likePost(item._id).then(() => {
                        const newData = data.map((post) => {
                            if (item._id === post._id) {
                              return {
                                ...post,
                                likes: [...post.likes, state._id],
                              };
                            } else {
                              return item;
                            }
                          });
                        setData(newData);
                    });
                  }}
                >
                  favorite_border
                </i>
              )}

              {state.saved.includes(item._id) ? (
                <i
                  class="material-icons"
                  onClick={() => {
                    unsavePost(item._id).then((result) => {
                        console.log(result)
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
              <p>{item.body}</p>

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
  );
};

export default Home;
