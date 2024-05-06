const likePost = async (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Error response:", res);
        }
      })
      .then(() => {
        return true;
      });
  };

  const unlikePost = async (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Error response:", res);
        }
      })
      .then((result) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  const savePost = async (id) => {
    return fetch("/saved", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Error response:", res);
        }
      })
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result));
        return result;
      });
  };

  const unsavePost = async (id) => {
    return fetch("/unsave", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Error response:", res);
        }
      })
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result));
        return result;
      });
  };

  const makeComment = async (text, postId) => {
    return fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return false;
      });
  };

  const deletePost = async (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Error response:", res);
        }
      })
      .then((result) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  module.exports = {
    likePost,
    unlikePost,
    savePost,
    unsavePost,
    makeComment,
    deletePost,
  };