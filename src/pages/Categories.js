import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Categories() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const navigate = useNavigate();
    // ...
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePhoneChange = (e) => {
      setPhone(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Validate email and phone number
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;
  
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email address");
        return;
      }
  
      if (!phoneRegex.test(phone)) {
        setPhoneError("Invalid phone number");
        return;
      }
  
      // Registration logic here
  
      // If registration is successful, navigate to a new page, e.g., the home page
      navigate("/home");
    };


  return (
    <div>
      <form onSubmit={handleSubmit} className="register-form">
        {/* Other form fields */}
        <div>
          <label htmlFor="email" className="register-label">
            Email:
          </label>
          <input
            className="register-input"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>
        <div>
          <label htmlFor="phone" className="register-label">
            Phone:
          </label>
          <input
            className="register-input"
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
          {phoneError && <div className="error-message">{phoneError}</div>}
        </div>
        <button
        type="submit"
        />
      </form>
    </div>
  );

  // return (
  //   <div>
  //     <h2>Categories Page</h2>
  //     {/* Add your categories content here */}
  //   </div>
  // );
}

export default Categories;
