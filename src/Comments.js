import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';



function Comments() {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});

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

  const getPost = async ()=>{
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/?userId=${params.userid}&id=${params.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data !== []) {
        setPost(data[0]);
        console.log(data[0]);
      }
    } catch (error) {
        throw error; ////////////?
    }
  }

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  function handleComments() {
    return (
      <div>
        <div className="post-containor">
          <div key={post.id} class="card" style={{ width: "18rem" }}>
              <h5 class="card-title">{post.title}</h5>
              <p>{post.body}</p>
          </div>
        </div>
        <div className="container">
          <ul>
              {comments.map((comment) => (
                <div class="row">
                  <div class="col-md-8">
                    <div class="media g-mb-30 media-comment">
                        <img class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" 
                        src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Image Description"/>
                        <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                        <div class="g-mb-15">
                            <h5 class="h5 g-color-gray-dark-v1 mb-0">{comment.name}</h5>
                            <span class="g-color-gray-dark-v4 g-font-size-12">5 days ago</span>
                        </div>
                    
                        <p>{comment.body}</p>
                    
                        <ul class="list-inline d-sm-flex my-0">
                            <li class="list-inline-item g-mr-20">
                            <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                                <i class="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                                178
                            </a>
                            </li>
                            <li class="list-inline-item g-mr-20">
                            <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                                <i class="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                                34
                            </a>
                            </li>
                            <li class="list-inline-item ml-auto">
                            <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                                <i class="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
                                Reply
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
              ))}
            </ul>
        </div>
      </div>
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
