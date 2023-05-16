import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Comments() {
  const params = useParams();
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments/?userId=${params.userid}&postId=${params.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data !== []) {
        setComments(data);
        console.log(data);
      }
    } catch (error) {
      throw error; ////////////?
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  function handleComments() {
    return (
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <div>
              <strong>Name: </strong>
              {comment.name}
            </div>
            <div>
              <strong>Email: </strong>
              {comment.email}
            </div>
            <div>
              <strong>Body: </strong>
              {comment.body}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h2>Comments</h2>
      <div>{handleComments()}</div>
    </div>
  );
}

export default Comments;
