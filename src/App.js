import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Users from "./Users";
import Posts from "./Posts";
import Todos from "./Todos";
import Info from "./Info";
import Error from "./Error";
import Gallery from "./Gallery";
import Comments from "./Comments";
import Albums from "./Albums";
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
