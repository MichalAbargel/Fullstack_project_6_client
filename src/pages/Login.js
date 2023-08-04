import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { json, useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";


function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser != null) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  useEffect(() => {
    // in case user already connected
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser != null) {
      console.log("navigate users");
      navigate("/users/" + parsedUser.id);
    }
  }, [navigate]);

  const handleSingout = () => {
    console.log("Sign Up");
    navigate(`/register`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch("http://localhost:3500/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("פרטי ההתחברות שגויים");
        }
      })
      .then((user) => {
        setLoggedInUser(user);
        //update localStoarge
        localStorage.setItem("user", JSON.stringify(user)); ////////////////////?
        console.log("naviget users");        
        navigate('/');

        // setLogin(false); //DELETE IT?
        handleLogin();

      })
      .catch((error) => {
        console.log("ERROR");
      });


  };

  return (
    <div>
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
        <div className="button-container">
          <button name="login" type="submit" className="login-btn">
            Login
          </button>
          <button
            name="register"
            type="submit"
            className="login-btn"
            onClick={handleSingout}
          >
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
