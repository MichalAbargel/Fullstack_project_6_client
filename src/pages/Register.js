import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

function Register({handleLogin}) {
  const [name, setname] = useState({
    firstName: "",
    lastName: "",
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [address, setAddress] = useState({
    city: "",
    street: "",
    number: "",
    zipcode: "",
    geolocation: {
      lat: "",
      long: "",
    },
  });

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
      //console.log("Navigate to users");
      navigate("/users/" + parsedUser.id);
    }
  }, [navigate]);

  const showTab = (n) => {
    setCurrentTab(n);
  };
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setname((prevName) => ({
      ...prevName,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // ... (הקוד הקודם)

  const handlePrev = () => {
    setCurrentTab((prevTab) => Math.max(prevTab - 1, 0));
  };

  const handleNext = () => {
    if (currentTab === 0 && (!name || !email || !phone)) {
      setError("Please fill in all the fields.");
    } else {
      setError(null);
      setCurrentTab((prevTab) => prevTab + 1);
    }
  };

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
      name: name,
      email: email,
      phone: phone,
      address: address,
      username: username,
      password: password,
    };
    //   name: {
    //     firstname: firstName,
    //     lastname: lastName,
    //   },
    //   email: email,
    //   phone: phone,
    //   address: {
    //     city: city,
    //     street: street,
    //     number: number,
    //     zipcode: zipcode,
    //     geolocation: {
    //       lat: latitude,
    //       long: longitude,
    //     },
    //   },
    //   username: username,
    //   password: password,
    // };

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
      .then((user) => {
        setLoggedInUser(user);
        //update localStoarge
        localStorage.setItem("user", JSON.stringify(user));
        console.log("naviget users");
        navigate('/');
        handleLogin();

      })
      .catch((error) => {
        if (error.message === "409") {
          console.log("Username conflict");
        } else {
          console.log(error.message);
        }
      });
  };

  const renderTabs = () => {
    const tabs = [
      // First Step
      {
        label: "Step 1",
        content: (
          <div className="tab">
            <div className="input-unit">
              <div className="input-label">
                <label
                  htmlFor="firstName"
                  className="register-label red-asterisk"
                >
                  First Name
                </label>
              </div>
              <input
                className="register-input"
                type="text"
                id="firstName"
                name="firstName"
                value={name.firstName}
                autoComplete="off"
                onChange={handleNameChange} // Pass the event object directly
                required
              />
            </div>

            <div className="input-unit">
              <div className="input-label">
                <label
                  htmlFor="lastName"
                  className="register-label red-asterisk"
                >
                  Last Name
                </label>
              </div>
              <input
                className="register-input"
                type="text"
                id="lastName"
                name="lastName"
                value={name.lastName}
                autoComplete="off"
                onChange={handleNameChange} // Pass the event object directly
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
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button
              type="button"
              onClick={handleNext}
              className="register-btn"
              disabled={!name || !email || !phone}
            >
              Next
            </button>
          </div>
        ),
      },
      // Second Step
      {
        label: "Step 2",
        content: (
          <div className="tab">
            <h2>ADDRESS</h2>
            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="city" className="register-label red-asterisk">
                  City
                </label>
              </div>
              <input
                className="register-input"
                type="text"
                id="city"
                name="city"
                value={address.city}
                autoComplete="off"
                onChange={(e) => handleAddressChange(e)} // Pass the event object directly
                required
              />
            </div>

            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="street" className="register-label red-asterisk">
                  Street
                </label>
              </div>
              <input
                className="register-input"
                type="text"
                id="street"
                name="street"
                value={address.street}
                autoComplete="off"
                onChange={(e) => handleAddressChange(e)} // Pass the event object directly
                required
              />
            </div>

            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="number" className="register-label red-asterisk">
                  Number
                </label>
              </div>

              <input
                className="register-input"
                type="number"
                id="number"
                name="number"
                value={address.number}
                autoComplete="off"
                onChange={(e) => handleAddressChange(e)} // Pass the event object directly
                required
              />
            </div>

            <div className="input-unit">
              <div className="input-label">
                <label
                  htmlFor="zipcode"
                  className="register-label red-asterisk"
                >
                  Zip Code
                </label>
              </div>
              <input
                className="register-input"
                type="text"
                id="zipcode"
                name="zipcode"
                value={address.zipcode}
                autoComplete="off"
                onChange={(e) => handleAddressChange(e)} // Pass the event object directly
                required
              />
            </div>

            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="latitude" className="register-label">
                  Latitude
                </label>
              </div>

              <input
                className="register-input"
                type="number"
                id="latitude"
                name="latitude"
                value={address.geolocation.latitude}
                autoComplete="off"
                onChange={(e) => handleAddressChange(e)} // Pass the event object directly
              />
            </div>

            <div className="input-unit">
              <div className="input-label">
                <label htmlFor="longitude" className="register-label">
                  Longitude
                </label>
              </div>
              <input
                className="register-input"
                type="number"
                id="longitude"
                name="longitude"
                value={address.geolocation.longitude}
                autoComplete="off"
                onChange={(e) => handleAddressChange(e)} // Pass the event object directly
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  className="register-btn"
                  onClick={handlePrev}
                  disabled={currentTab === 0}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="register-btn"
                  disabled={
                    !address.city ||
                    !address.street ||
                    !address.number ||
                    !address.zipcode
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ),
      },
      // Third Step
      {
        label: "Step 3",
        content: (
          <div className="tab">
            <div className="input-unit">
              <div className="input-label">
                <label
                  htmlFor="username"
                  className="register-label red-asterisk"
                >
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
                <label
                  htmlFor="password"
                  className="register-label red-asterisk"
                >
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
                <label
                  htmlFor="password2"
                  className="register-label red-asterisk"
                >
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

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                className="register-btn"
                onClick={handlePrev}
                disabled={currentTab === 0}
              >
                Previous
              </button>
              <button
                type="submit"
                className="register-btn"
                disabled={!username || !password || !password2}
              >
                Submit
              </button>
            </div>
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

export default Register;
