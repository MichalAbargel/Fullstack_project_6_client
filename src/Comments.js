import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

function Comments() {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [addCommentFlag, setAddCommentFlag] = useState(false);
  const [commentBody, setCommentBody] = useState();
  const [newComment, setNewComment] = useState(null);

  const getComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3500/api/comments/${params.id}`
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
      throw error; ////////////
    }
  };

  const getPost = async () => {
    try {
      const response = await fetch(
        //`https://jsonplaceholder.typicode.com/posts/?userId=${params.userid}&id=${params.id}`
        `http://localhost:3500/api/posts/${params.userid}/${params.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data !== []) {
        setPost(data);
        console.log(data);
      }
    } catch (error) {
      throw error; ////////////?
    }
  };

  const addComment = async () => {
    if (newComment) {
      console.log("try add comment");
      try {
        const response = await fetch(`http://localhost:3500/api/comments/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data !== null) {
          console.log(post);
        }
      } catch (error) {
        console.log("Error adding Comment");
      }
    }
    setAddCommentFlag(false);
    getComments();
  };

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  useEffect(() => {
    console.log("useEffect add comment");
    addComment();
  }, [newComment]);

  function showComments() {
    return (
      <div>
        {comments.map((comment, i) => (
          <div className="row">
            <div className="col-md-8">
              <div className="media g-mb-30 media-comment">
                <img
                  className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Image Description"
                />
                <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                  <div className="g-mb-15">
                    <h5 className="h5 g-color-gray-dark-v1 mb-0">
                      {comment.name}
                    </h5>
                  </div>

                  <p>{comment.body}</p>

                  <ul className="list-inline d-sm-flex my-0">
                    <li className="list-inline-item g-mr-20">
                      <a
                        className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                        href="#!"
                      >
                        <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                        178
                      </a>
                    </li>
                    <li className="list-inline-item g-mr-20">
                      <a
                        className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                        href="#!"
                      >
                        <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                        34
                      </a>
                    </li>
                    <li className="list-inline-item ml-auto">
                      <a
                        className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                        href="#!"
                      >
                        <i className="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
                        Reply
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function showSingleComment() {
    return (
      <div className="row">
        <div className="col-md-8">
          <div className="media g-mb-30 media-comment">
            <img
              className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="Image Description"
            />
            <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
              <div className="g-mb-15">
                <h5 className="h5 g-color-gray-dark-v1 mb-0">Reply</h5>
                <span className="g-color-gray-dark-v4 g-font-size-12"></span>
              </div>
              <div class="mb-3">
                <textarea
                  class="form-control"
                  id="commentBody"
                  rows="3"
                  onChange={(e) => {
                    setCommentBody(e.target.value);
                  }}
                ></textarea>
              </div>
              <ul className="list-inline d-sm-flex my-0">
                <li className="list-inline-item g-mr-20">
                  <a
                    className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                    href="#!"
                  >
                    <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                    0
                  </a>
                </li>
                <li className="list-inline-item g-mr-20">
                  <a
                    className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                    href="#!"
                  >
                    <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                    0
                  </a>
                </li>
              </ul>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  const user = JSON.parse(localStorage.getItem("user"));
                  console.log(user);
                  if (user) {
                    setNewComment({
                      postId: post.id,
                      name: user.name,
                      email: user.email,
                      body: commentBody,
                    });
                  }
                  console.log("click add comment");
                }}
                className="btn btn-danger"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function showCommentsBoard() {
    return (
      <div>
        <div className="post-containor">
          <div key={post.id} className="card" style={{ width: "18rem" }}>
            <h5 className="card-title">{post.title}</h5>
            <p>{post.body}</p>
          </div>
        </div>
        <div className="btn-add">
          <button
            className="btn btn-danger"
            onClick={() => setAddCommentFlag(true)}
          >
            +
          </button>
        </div>
        <div className="text-center">
          {addCommentFlag && showSingleComment()}
        </div>
        <div className="container text-center">
          {comments !== [] && showComments()}
        </div>
      </div>
    );
  }

  return (
    <div className="background">
      <div>{showCommentsBoard()}</div>
    </div>
  );
}

export default Comments;
