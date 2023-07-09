import React, { useState, useEffect } from "react";
import "./styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser !== null) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  useEffect(() => {
    // במידה והמשתמש כבר מחובר
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser !== null) {
      console.log("ניווט למשתמשים");
      navigate("/users/" + parsedUser.id);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      fullName: fullName,
      email: email,
      phone: phone,
      website: website,
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
        localStorage.setItem("user", JSON.stringify(user));
        console.log("ניווט למשתמשים");
        navigate(`/users/${user.id}`);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1 className="login-title">הרשמה</h1>
      <div className="login-container">
        <div>
          <label htmlFor="fullName" className="login-lable">
            שם מלא:
          </label>
          <input
            className="login-input"
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="login-lable">
            דוא"ל:
          </label>
          <input
            className="login-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="login-lable">
            טלפון:
          </label>
          <input
            className="login-input"
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="website" className="login-lable">
            אתר אינטרנט:
          </label>
          <input
            className="login-input"
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username" className="login-lable">
            שם משתמש:
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
            סיסמה:
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
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" className="login-btn">
        התחבר
      </button>
    </form>
  );
}

export default Login;
