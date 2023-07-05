import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Posts() {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
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
      setError("Error posts");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    console.log(post);
    addPost();
  }, [post]);

  function handlePosts() {
    if (params && posts) {
      return (
        <div className="post-containor">
          {posts.map((post) => (
            <div key={post.id} className="card" style={{ width: "18rem" }}>
              <h5 className="card-title">{post.title}</h5>
              <p className="post-prg">{post.body}</p>
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
          console.log(post);
        }
      } catch (error) {
        setError("Error adding Post");
      }
    }
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={handleAddPost}>
        +
      </button>
      {showForm && (
        <div className="inner">
          <form className="form-contianer" action="">
            <h3 className="form-title">Write Somthing</h3>
            <label class="form-group">
              <input
                type="text"
                className="form-control post-input"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <span>Title</span>
              <span className="border"></span>
            </label>
            <label className="form-group">
              <textarea
                name=""
                id=""
                className="form-control form-textarea"
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <span for="">Message</span>
              <span className="border"></span>
            </label>
            <button
              onClick={(event) => {
                event.preventDefault();
                setPost({
                  userid: params.userid,
                  title: title,
                  message: message,
                });
              }}
            >
              Add Post
              <i className="zmdi zmdi-arrow-right form-btn"></i>
            </button>
          </form>
        </div>
      )}
      <div>{handlePosts()}</div>
    </div>
  );
}

export default Posts;
