import React, { useState, useEffect } from "react";
import "./Login.css";
import { json, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // const storedUser = localStorage.getItem("user");
    // if(storedUser){
    //   console.log("storedUser");
    //   const parsedUser = JSON.parse(storedUser);
    //   setLoggedInUser(parsedUser);
    //   console.log("navigate users");
    //   navigate("/users/"+parsedUser.id);
    // }
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${username}`
      );
      const data = await response.json();
      const user = data[0];
      if (user && password === user.address.geo.lat.slice(-4)) {
        setLoggedInUser(user);
        //update localStoarge
        localStorage.setItem("user", JSON.stringify(user));////////////////////?
        console.log("naviget users");
        navigate(`/users/${user.id}`);
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      setError("Error logging in.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
