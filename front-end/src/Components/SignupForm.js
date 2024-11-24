import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpForm() {
  const [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleChangeInput(e) {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  }

  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper function to validate password criteria
  function isValidPassword(password) {
    const errors = [];
    if (password.length < 8)
      errors.push("Password must be at least 8 characters long");
    if (!/[A-Z]/.test(password))
      errors.push("Password must contain at least one uppercase letter");
    if (!/[0-9]/.test(password))
      errors.push("Password must contain at least one number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("Password must contain at least one special character");

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValidEmail(formInputs.email)) {
      setErrorMessage("Invalid email format");
      return; // Stop form submission if email is invalid
    }

    const passwordErrors = isValidPassword(formInputs.password);
    if (passwordErrors.length > 0) {
      setErrorMessage(passwordErrors.join(". "));
      return; // Stop form submission if password is invalid
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username: formInputs.username,
        email: formInputs.email,
        password: formInputs.password,
      });

      if (response.status === 201) {
        navigate("/signin");
      }
    } catch (error) {
      setErrorMessage("Signup failed. Please try again.");
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form
        style={{
          padding: "20px",
          height: "100vh",
          width: "500px",
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "30px",
            background: "rgba(88, 59, 255, 0.8)",
            minHeight: "700px",
            marginBottom: "40px",
            borderRadius: "30px",
          }}
        >
          <h1>Sign Up Form</h1>
          <input
            type="text"
            name="username"
            value={formInputs.username}
            onChange={handleChangeInput}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={formInputs.email}
            onChange={handleChangeInput}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formInputs.password}
            onChange={handleChangeInput}
            placeholder="Password"
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
