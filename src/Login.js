import React, { useState, useEffect } from "react";
import "./styles/Login.css";
import { json, useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  useEffect(() => {
    // in case user already connected
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("navigate users");
      navigate("/users/" + parsedUser.id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        // `https://jsonplaceholder.typicode.com/users?username=${username}`
        `http://localhost:3500/api/users/${username}`
      );
      const data = await response.json();
      console.log(data);
      const user = data[0];
      if (user && password === user.address.geo.lat.slice(-4)) {
        setLoggedInUser(user);
        //update localStoarge
        localStorage.setItem("user", JSON.stringify(user)); ////////////////////?
        console.log("naviget users");
        setLogin(false);
        navigate(`/users/${user.id}`);
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      setError("Error logging in.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1 className="login-title">Login</h1>
      <div className="login-container">
        <label htmlFor="username" className="login-lable">
          Username:
        </label>
        <input
          className="login-input"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="login-lable">
          Password:
        </label>
        <input
          className="login-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" className="login-btn">
        Login
      </button>
    </form>
  );
}

export default Login;
