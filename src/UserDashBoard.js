import React, { useState, useEffect } from "react";
import "./UserDashBoard.css";

const UserDashboard = ({ userId }) => {
  const [todos, setTodos] = useState([]);
  const [sortedBy, setSortedBy] = useState("serial");
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [photosPerPage, setPhotosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, [userId]);

  useEffect(() => {
    const sortedTodos = [...todos];
    switch (sortedBy) {
      case "serial":
        sortedTodos.sort((a, b) => a.id - b.id);
        break;
      case "execution":
        sortedTodos.sort((a, b) => a.completed - b.completed);
        break;
      case "alphabetical":
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "random":
        sortedTodos.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    setTodos(sortedTodos);
  }, [sortedBy, todos]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [userId]);

  useEffect(() => {
    if (selectedPostId) {
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${selectedPostId}/comments`
      )
        .then((response) => response.json())
        .then((data) => setComments(data));
    }
  }, [selectedPostId]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, [userId]);

  useEffect(() => {
    if (selectedAlbumId) {
      fetch(
        `https://jsonplaceholder.typicode.com/albums/${selectedAlbumId}/photos`
      )
        .then((response) => response.json())
        .then((data) => setPhotos(data));
    }
  }, [selectedAlbumId]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * photosPerPage;
    const endIndex = startIndex + photosPerPage;
    setDisplayedPhotos(photos.slice(startIndex, endIndex));
  }, [currentPage, photos, photosPerPage]);

  const renderTodos = () => {
    return (
      <>
        <h2>Todos</h2>
        <div>
          Sort by:
          <select
            value={sortedBy}
            onChange={(e) => setSortedBy(e.target.value)}
          >
            <option value="serial">Serial</option>
            <option value="execution">Execution</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="random">Random</option>
          </select>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    const updatedTodos = [...todos];
                    const updatedTodo = { ...todo, completed: !todo.completed };
                    const index = updatedTodos.findIndex(
                      (t) => t.id === todo.id
                    );
                    updatedTodos[index] = updatedTodo;
                    setTodos(updatedTodos);
                  }}
                />
                {todo.title}
              </label>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const renderPosts = () => {
    return (
      <>
        <h2>Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <button onClick={() => setSelectedPostId(post.id)}>
                {post.title}
              </button>
            </li>
          ))}
        </ul>
        {selectedPostId && (
          <>
            <h3>Selected Post</h3>
            <div>
              <strong>Title: </strong>
              {posts.find((post) => post.id === selectedPostId).title}
            </div>
            <div>
              <strong>Body: </strong>
              {posts.find((post) => post.id === selectedPostId).body}
            </div>
            <button onClick={() => setSelectedPostId(null)}>
              Deselect Post
            </button>
            <hr />
            <h3>Comments</h3>
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
          </>
        )}
      </>
    );
  };

  const renderAlbums = () => {
    return (
      <>
        <h2>Albums</h2>
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              <button onClick={() => setSelectedAlbumId(album.id)}>
                {album.title}
              </button>
            </li>
          ))}
        </ul>
        {selectedAlbumId && (
          <>
            <h3>Selected Album</h3>
            <div>
              <strong>Title: </strong>
              {albums.find((album) => album.id === selectedAlbumId).title}
            </div>
            <div>
              <strong>User ID: </strong>
              {albums.find((album) => album.id === selectedAlbumId).userId}
            </div>
            <button onClick={() => setSelectedAlbumId(null)}>
              Deselect Album
            </button>
            <hr />
            <h3>Photos</h3>
            {displayedPhotos.map((photo) => (
              <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
            ))}
            {displayedPhotos.length === photos.length ? (
              <p>All photos have been loaded</p>
            ) : (
              <button onClick={() => setCurrentPage(currentPage + 1)}>
                Load more photos
              </button>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      {renderTodos()}
      {renderPosts()}
      {renderAlbums()}
    </>
  );
};

export default UserDashboard;
