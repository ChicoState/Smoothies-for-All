import { useRef, useState, useEffect, useContext } from "react";
import { likePost, makeComment, savePost, unlikePost, unsavePost } from "../../utils/postActions";
import { UserContext } from "../../App";
import { useShoppingList } from "../../hooks/useShoppingList";

function Search() {
  // ** Hooks
  const searchRef = useRef();
  const { state, dispatch } = useContext(UserContext);
  const {add} = useShoppingList();

  // ** States
  const [baseData, setBaseData] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBaseData(data.posts);
      });
  }, []);

  // ** Functions
  const handleSearch = () => {
    const search = searchRef.current.value;

    if (!search) {
      setFilteredPosts([]);

      return;
    }

    const filtered = baseData.filter(
      (post) =>
        post.body.includes(search) ||
        post.title.includes(search) ||
        post.postedBy.username.includes(search) ||
        post.ingredients?.some((ingredient) => ingredient.text?.includes(search)) ||
        post.tags?.some((tag) => tag.text?.includes(search))
    );

    setFilteredPosts(filtered);
  };

  return (
    <>
      <div className="mycard">
        <div className="card auth-card">
          <input type="text" placeholder="Enter your query." ref={searchRef} />
          <button
            className="btn waves-effect waves-light"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {baseData &&
        Array.isArray(baseData) &&
        filteredPosts.map((post) => (
            <div className="card home-card" key={post._id}>
            <h5>
            <a href={`/profile/${post.postedBy._id}`} target="_blank" rel="noopener noreferrer">{post.postedBy.username}</a>
            {" "}
            </h5>
            
            <div className="card-image">
              <img src={post.photo} alt="Post" />
            </div>
            <div className="card-content">
              {post.likes.includes(state._id) ? (
                <i
                  class="material-icons"
                  style={{ color: "red" }}
                  onClick={() => {
                    unlikePost(post._id).then(() => {
                        const newData = baseData.map((item) => {
                            if (item._id === post._id) {
                              return {
                                ...post,
                                likes: post.likes.filter((id) => id !== state._id),
                              };
                            } else {
                              return item;
                            }
                          });
                        setBaseData(newData);
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
                        const newData = baseData.map((item) => {
                            if (item._id === post._id) {
                              return {
                                ...post,
                                likes: [...post.likes, state._id],
                              };
                            } else {
                              return item;
                            }
                          });
                        setBaseData(newData);
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
                    savePost(post._id).then((result) => {
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
                    onClick={() => add(post.ingredients.map((ingredient) => ingredient.text))}
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
                    const newData = baseData.map((item) => {
                        if (post._id === result._id) {
                          return result;
                        } else {
                          return item;
                        }
                      });
                      setBaseData(newData);
                    e.target[0].value = "";
                    });
                }}
              >
                <input type="text" placeholder="Add comment" />
              </form>
            </div>
          </div>
        ))}
    </>
  );
}

export default Search;
