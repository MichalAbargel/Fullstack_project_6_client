import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Posts() {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [post, setPost] = useState(null);

  const getPosts = async () => {
    try {
      const response = await fetch(
        //`https://jsonplaceholder.typicode.com/posts/?userId=${params.userid}`
        `http://localhost:3500/api/posts/${params.userid}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data !== []) {
        setPosts(data);
        console.log(data);
      }
    } catch (error) {
      console.log("Error posts");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    console.log("set");
    console.log(post);
    addPost();
  }, [post]);

  function handlePosts() {
    if (params && posts) {
      return (
        <div className="post-containor">
          {posts.map((post) => (
            <div key={post.id} className="card" style={{ width: "18rem" }}>
              <div class="container text-center">
                <div class="row">
                  <div class="col-6">
                    <h5 className="card-title">{post.title}</h5>
                  </div>
                  <div class="col-1">
                    <button
                      class="button button-delete"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(post.id);
                      }}
                    >
                      <span class="mdi mdi-delete mdi-24px"></span>
                      <span class="mdi mdi-delete-empty mdi-24px"></span>
                      <i class="fa fa-edit"></i>
                    </button>
                  </div>
                  <div key={post.id} class="col-1">
                    <button
                      class="button button-delete"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(post.id);
                        deletePost(post.id);
                      }}
                    >
                      <span class="mdi mdi-delete mdi-24px"></span>
                      <span class="mdi mdi-delete-empty mdi-24px"></span>
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
              <p className="post-prg">{post.body}</p>
              <div></div>
              <Link to={String(post.id)} className="btn btn-danger">
                Comments
              </Link>
            </div>
          ))}
        </div>
      );
    } else {
      return "";
    }
  }

  function handleAddPost() {
    console.log("enter add function");
    setShowForm(true);
  }

  const addPost = async () => {
    console.log(post);
    console.log("try to add post");
    console.log(JSON.stringify(post));
    if (post) {
      try {
        const response = await fetch(`http://localhost:3500/api/posts/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data !== null) {
          console.log(data);
        }
      } catch (error) {
        setError("Error adding Post");
      }
      setShowForm(false);
      // update posts on screen
      getPosts();
    }
  };

  async function deletePost(postId) {
    console.log("try to delete post");
    console.log(postId);
    try {
      const response = await fetch(
        `http://localhost:3500/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data !== null) {
        console.log(data);
      }
    } catch (error) {
      console.log("Error delete Post");
    }
    // update posts
    getPosts();
  }

  return (
    <div>
      <div className="btn-add">
        <button className="btn btn-danger" onClick={handleAddPost}>
          +
        </button>
      </div>
      {showForm && (
        <div className="card" style={{ width: "20rem" }}>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Title
            </label>
            <input
              class="form-control"
              id="postTitle"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              what's happening?
            </label>
            <textarea
              class="form-control"
              id="postBody"
              rows="3"
              onChange={(e) => {
                setBody(e.target.value);
              }}
            ></textarea>
          </div>
          <button
            onClick={(event) => {
              event.preventDefault();
              console.log("click add post");
              setPost({
                userId: params.userid,
                title: title,
                body: body,
              });
            }}
            className="btn btn-danger"
          >
            Add Post
          </button>
        </div>
      )}
      <div>{handlePosts()}</div>
    </div>
  );
}

export default Posts;
