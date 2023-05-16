import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        //JSON.stringify(data);
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
        <div class="container-fluid">
          {posts.map((post) => (
            <div key={post.id} class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">{post.title}</h5>
                <p class="card-text">{post.body}</p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
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
      <h2>Posts</h2>
      <div>{handlePosts()}</div>
    </div>
  );
}

export default Posts;
