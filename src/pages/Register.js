import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser !== null) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser !== null) {
      console.log("Navigate to users");
      navigate("/users/" + parsedUser.id);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError({
        field: "password2",
        message: "Password and Confirm Password fields do not match.",
      });
      return;
    }
    //add user
    const data = {
      name: fullName,
      email: email,
      phone: phone,
      website: website,
      username: username,
      password: password,
    };
    fetch("http://localhost:3500/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          //the insert success
          setError(null);

          return response.json();
        } else if (response.status === 409) {
          //username allredy catch
          setError({
            field: "username",
            message: "Username is already taken. Choose another name.",
          });
          throw new Error(response.status);
        } else {
          throw new Error(response.error);
        }
      })
      .then(user => {
        setLoggedInUser(user);
         //update localStoarge
         localStorage.setItem("user", JSON.stringify(user)); ////////////////////?
         console.log("naviget users");
         navigate(`/users/${user.id}`);
     })
      .catch((error) => {
        if(error.message==="409"){
          console.log("Username conflict");
        }else{
          console.log(error.message);
        }
      });
  };

  const handleNext = () => {
    if (fullName && email && phone) {
      setError("");
      setCurrentTab((prevTab) => prevTab + 1);
    } else {
      setError("Please fill in all the fields.");
    }
  };

  const showTab = (n) => {
    setCurrentTab(n);
  };

  const renderTabs = () => {
    const tabs = [
      {
        label: "Step 1",
        content: (
          <div className="tab">
            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="fullName" className="register-label red-asterisk">
                  Full Name
                </label>
              </div>
              <input
                className="register-input "
                type="text"
                id="fullName"
                value={fullName}
                autoComplete="off"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="email" className="register-label red-asterisk">
                  Mail
                </label>
              </div>
              <input
                className="register-input"
                type="email"
                id="email"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="phone" className="register-label red-asterisk">
                  Phone
                </label>
              </div>
              <input
                className="register-input"
                type="tel"
                id="phone"
                value={phone}
                autoComplete="off"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="website" className="register-label">
                  Website
                </label>
              </div>
              <input
                className="register-input"
                type="text"
                id="website"
                value={website}
                autoComplete="off"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
            <button
              type="button"
              onClick={handleNext}
              className="register-btn"
              disabled={!fullName || !email || !phone}
            >
              Next
            </button>
          </div>
        ),
      },
      {
        label: "Step 2",
        content: (
          <div className="tab">
            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="username" className="register-label red-asterisk">
                  UserName
                </label>
              </div>
              <input
                className="register-input"
                type="text"
                id="username"
                value={username}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {error && error.field === "username" && (
                <div className="error-message">{error.message}</div>
              )}
            </div>
            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="password" className="register-label red-asterisk">
                  Password
                </label>
              </div>
              <input
                disabled={!username}
                className="register-input"
                type="password"
                id="password"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && error.field === "password" && (
                <div className="error-message">{error.message}</div>
              )}
            </div>
            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="password2" className="register-label red-asterisk">
                  Confirm Password
                </label>
              </div>
              <input
                disabled={!username || !password}
                className="register-input"
                type="password"
                id="password2"
                value={password2}
                autoComplete="off"
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
              {error && error.field === "password2" && (
                <div className="error-message">{error.message}</div>
              )}
            </div>
            <button
              type="submit"
              className="register-btn"
              disabled={!username || !password || !password2}
            >
              Submit
            </button>
          </div>
        ),
      },
    ];

    return tabs.map((tab, index) => (
      <div
        key={index}
        style={{ display: currentTab === index ? "block" : "none" }}
      >
        {tab.content}
      </div>
    ));
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1 className="register-title">Sign Up</h1>
      <div className="register-container">{renderTabs()}</div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        {/* Step indicators */}
        <span className={`step${currentTab === 0 ? " active" : ""}`}></span>
        <span className={`step${currentTab === 1 ? " active" : ""}`}></span>
      </div>
    </form>
  );
}

export default Login;
