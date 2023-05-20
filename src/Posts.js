import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


function Posts() {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const getPosts = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/?userId=${params.userid}`
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

  function handlePosts() {
    if (params && posts) {
      return (
        <div class="post-containor">
          {posts.map((post) => (
            <div key={post.id} class="card" style={{ width: "18rem" }}>
              <h5 class="card-title">{post.title}</h5>
              <p>{post.body}</p>
              <Link to={String(post.id)} class="btn btn-danger">Comments</Link>
            </div>
          ))}
        </div>
      );
    } else {
      return "";
    }
  }

  return (
    <div>
      <div>{handlePosts()}</div>
    </div>
  );
}

export default Posts;
