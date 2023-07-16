import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Todos from "./pages/Todos";
import Info from "./pages/Info";
import Error from "./pages/Error";
import Gallery from "./pages/Gallery";
import Comments from "./pages/Comments";
import Albums from "./pages/Albums";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/comment.css";
import "./styles/post.css";
import "./styles/todos.css";
import "./styles/gallery.css";
import "./styles/nav.css";
import "./styles/userInfo.css";
import "./styles/deleteBtn.css";

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users/:userid" element={<Users />}>
        <Route path="info" element={<Info />} />
        <Route path="todos/:id?" element={<Todos />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:id" element={<Comments />} />
        <Route path="albums" element={<Albums />} />
        <Route path="albums/:id" element={<Gallery />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
