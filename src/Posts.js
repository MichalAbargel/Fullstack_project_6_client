import { useParams } from "react-router-dom";

function Posts() {
  const params = useParams();
  return (
    <div>
      posts
      <div>{params.userid}</div>
      <div>{params.id}</div>
    </div>
  );
}

export default Posts;
